<template>
    <el-cascader filterable placeholder="选择城市" v-model="regionValues" :options="regionTree"
                 :props="{ expandTrigger: 'hover', checkStrictly: true }" :show-all-levels="false"
                 @change="handleRegionTreeChange"></el-cascader>
</template>

<script>
    export default {
        name: "RegionCascader",
        data(){
            return{
                regionTree:[],
                // regionValues:[],
                regionValues: sessionStorage.getItem('regionCode'),
                regionCode: sessionStorage.getItem('regionCode'),
            }
        },
        methods: {
            handleRegionTreeChange(value){
                this.regionCode =  value[value.length-1];
                this.$emit('handleRegionChange',this.regionCode);
            },
            init(){
                let self = this;
                self.$axios.get(
                    '/api/regulatory/regionInfo/getRegionChildrenList?regionCode='+self.AppConfig.appInfo.regionCode
                ).then(function (res) {
                    if (res.code == 0){
                        self.regionTree = res.data;
                    }
                }).catch(function (err) {
                    // console.log(err);
                })
            },
        },
        created() {
            this.init();
        }
    }
</script>

<style scoped>

</style>
