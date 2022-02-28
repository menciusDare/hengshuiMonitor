<template>
    <div>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="添加企业" name="first">
                <addEntInfo ref="addEntInfo"></addEntInfo>
            </el-tab-pane>
            <el-tab-pane label="企业详情" name="second">
                <entUserList ref="entUserList"></entUserList>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import entUserList from './entUserList'
    import addEntInfo from './addEntInfo'
    export default {
        name: "entInfoOperation",
        components:{
            entUserList,
            addEntInfo
        },
        data(){
            return{
                activeName: 'first'
            }
        },
        methods:{
            handleClick(tab, event) {
                if(tab.label=="企业详情"){
                    this.$refs.entUserList.searchEntUserInfoList();
                }
                // console.log(tab, event);
            }
        },
        mounted: function () {

        },
        created() {

        }
    }
</script>

<style scoped>

</style>