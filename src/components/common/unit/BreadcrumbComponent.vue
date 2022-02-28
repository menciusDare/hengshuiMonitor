<template>
    <div class="breadcrumb">
        <a href="#">
          <i :class="iconName"></i>{{firstLevel}}
        </a>
        <span v-if="secondLevel" class="sep">&gt;</span>
        <span v-if="secondLevel" class="text-primary">{{secondLevel}}</span>
    </div>
</template>

<script>

    export default {
        name: "breadcrumb-component",
        data(){
            return{
                menuList: this.$store.state.menuListData,
                firstLevel: '',
                secondLevel: '',
                iconName: ''
            }
        },
        props: {
            routePath: String
        },
        mounted(){
            this.init()
        },
        methods: {
            init() {
                // 截取路由的斜杠
                const pathName = this.routePath.slice(1)
                if (pathName && this.menuList) {
                    const menuInfo = this.menuList.find((element) => {
                        return element.path == pathName
                    });
                    if (menuInfo) {
                        this.firstLevel = menuInfo.name
                        this.iconName = menuInfo.icon
                    }
                     else {
                        this.menuList.forEach(element => {
                            if (element.children) {
                                let secondLevelInfo = element.children.find((children) => {
                                    return children.path == pathName
                                })
                                if (secondLevelInfo) {
                                    this.firstLevel = element.name
                                    this.iconName = element.icon
                                    this.secondLevel = secondLevelInfo.name
                                }
                            }
                        });
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
