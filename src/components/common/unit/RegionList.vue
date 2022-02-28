<template>
    <el-select style="width:100%" v-model="regionCode" @change="selectRegion()" placeholder="请选择所在地">
        <el-option
            v-for="item in regionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
    </el-select>
</template>

<script>

    export default {
        name: "RegionList",
        data(){
            return{
                username: sessionStorage.getItem("username"),
                regionCode: "",
                regionOptions: [],
                userPermissions: sessionStorage.getItem("roleCode")
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            init() {
                this.userPermissions === 'operate' || this.userPermissions === 'city' || this.userPermissions === 'admin'? this.getRegionChildrenList() : null
            },
            getRegionChildrenList() {
                this.$axios.get("/api/regulatory/regionInfo/getRegionChildrenList", {
                    params: {
                        "regionCode": sessionStorage.getItem('regionCode')==null ? this.AppConfig.appInfo.regionCode : sessionStorage.getItem('regionCode')
                    },
                })
                .then((res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        const secondLevelRegin = res.data[0].children
                        secondLevelRegin.unshift({label: res.data[0].label, value: sessionStorage.getItem('regionCode')})
                        this.regionOptions = secondLevelRegin
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            selectRegion() {
                this.$emit("RegionChange", this.regionCode);
            }
        }
    }
</script>

<style scoped>

</style>
