<template>
    <div class="main">
        <div id="top-first"></div>
        <div class="main-top">
            <div class="breadcrumb" style="width: 95%">
                <a href="#"><i class="icon icon-zhuanyun"></i><span class="text-primary-font" @click="backPage">返回</span></a>
                <span class="sep">丨</span>
                <span class="text-primary"><img src="../../../../static/css/images/pic/logo02.png" style="height: 30px;margin-bottom: -8px;margin-right: 8px"></span><span class="text-primary-font">{{name}}</span>

                <div style="float: right">
                    <div class="filter-label" style="float: left">备案年份：</div>
                    <div class="filter-con" style="float: left;margin-top: -5px">
                        <el-date-picker style="width: 150px;"
                                        clearable
                                        v-model="year"
                                        type="year"
                                        value-format="yyyy"
                                        @change="changeYeat"
                                        placeholder="选择年">
                        </el-date-picker>
                    </div>
                </div>
            </div>
        </div>
            <div class="main-container " style="width: 100%;height: auto;background-color: #ffffff;">
                <el-tabs v-model="currentView" @tab-click="handleClick" >
                    <el-tab-pane label="基本信息" name="entBase" >
                        <EntBase ></EntBase>
                    </el-tab-pane>
                    <el-tab-pane label="产品生产情况" name="productInfo" >
                        <productInfo v-if="pathStr == 'productInfo'" :year="year"></productInfo>
                    </el-tab-pane>
                    <el-tab-pane label="危险废物生产情况" name="hazardousProductInfo">
                        <hazardousProductInfo v-if="pathStr == 'hazardousProductInfo'"></hazardousProductInfo>
                    </el-tab-pane>
                    <el-tab-pane label="危险废物减量化计划" name="hazardousReductionPlan">
                        <hazardousReductionPlan v-if="pathStr == 'hazardousReductionPlan'"></hazardousReductionPlan>
                    </el-tab-pane>
                    <el-tab-pane label="危险废物转移情况" name="transterPlan">
                        <transterPlan v-if="pathStr == 'transterPlan'"></transterPlan>
                    </el-tab-pane>
                     <el-tab-pane label="危险废物自行利用处置情况" name="ToUseSelf">
                        <ToUseSelf v-if="pathStr == 'ToUseSelf'"></ToUseSelf>
                    </el-tab-pane>
                    <el-tab-pane label="危险废物委托利用处置情况" name="otherUsed">
                        <otherUsed v-if="pathStr == 'otherUsed'"></otherUsed>
                    </el-tab-pane>
                    <el-tab-pane label="环境监测情况" name="environmental">
                        <environmental v-if="pathStr == 'environmental'"></environmental>
                    </el-tab-pane>
                    <el-tab-pane label="上年度管理计划回顾" name="lastYearReview">
                        <lastYearReview v-if="pathStr == 'lastYearReview'"></lastYearReview>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
</template>

<script>
    import productInfo from "./productInfo";
    import hazardousReductionPlan from "./hazardousReductionPlan";
    import hazardousProductInfo from "./hazardousProductInfo";
    import transterPlan from "./transterPlan";
    import ToUseSelf from "./ToUseSelf";
    import EntBase from "./EntBase";
    import otherUsed from "./otherUsed";
    import environmental from "./environmental";
     import lastYearReview from "./lastYearReview";
    export default {
        components: {
            productInfo,
            hazardousReductionPlan,
            hazardousProductInfo,
            transterPlan,
            ToUseSelf,
            EntBase,
            otherUsed,
            environmental,
            lastYearReview
        },
        name: "RegisterHome",
        data(){
            return{
                name:this.$route.params.name,
                entId:this.$route.params.entId,
                correlationId:this.$route.params.correlationId,
                activeName: '1',
                currentView: 'entBase', //当前组件
                pathStr:'',
                year:new Date().format("yyyy"),
                YearOptions:[
                    {
                        value: '',
                        label: '全部年份'
                    },
                    {
                        value: '2019',
                        label: '2019'
                    },
                    {
                        value: '2020',
                        label: '2020'
                    }
                ],
            }
        },
        mounted(){

        },
        methods:{
            handleClick(tab, event) {
                var pathStr = tab.name
                this. pathStr = pathStr
                if(tab.name == 'productInfo'){
                    this.$router.push({name:pathStr, params: {entId:  this.entId,correlationId: this.correlationId,year:this.year}});
                }else{
                    this.$router.push({name:pathStr, params: {entId: this.entId,year:this.year}});
                }
            },
            backPage(){
                this.$router.push({name:"RegisterHomeList"});
            },

            changeYeat(){
                if(this. pathStr != 'productInfo'){
                    window.vm.$emit(this. pathStr,this.year);
                }else{
                    window.vm.$emit(this. pathStr,this.year,this.correlationId);
                }

            }
        }

    }
</script>

<style scoped>

</style>
