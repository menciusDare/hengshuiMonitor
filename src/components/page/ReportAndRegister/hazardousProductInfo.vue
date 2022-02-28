<template>
    <!--危险废物生产状况-->
    <div class=""  style="overflow: auto">

        <!-- <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;"></div>
        </div> -->
        <div style="width: 1350px;padding-left: 20px">
            <table class="tableClass"  >
                <thead>
                <tr>
                    <th style="text-align:center; " >序号</th>
                    <th style="text-align:center; " >危废名称</th>
                    <th style="text-align:center; " >危废代码</th>
                    <th style="text-align:center; " >危废类别</th>
                    <th style="text-align:center; " >有害物质名称</th>
                    <th style="text-align:center; " >物理性状</th>
                    <th style="text-align:center; " >危险特性</th>
                    <th style="text-align:center; " >来源及产生工序</th>
                    <!--<th style="text-align:center; " >单位</th>-->
                    <th style="text-align:center; " >本年度计划产生量(吨)</th>
                    <th style="text-align:center; " >上年度实际产生量(吨)</th>
                </tr>
                </thead>
                <tbody>

                <!--<tr v-for="item  in tableData">
                    <td style="text-align:center">{{item.rownum}}</td>
                    <td style="text-align:center">{{item.name}}</td>
                    <td style="text-align:center">{{item.code}}</td>
                    <td style="text-align:center">{{item.typeName}}</td>

                    <td style="text-align:center">{{item.harmfulName}}</td>
                    <td style="text-align:center">{{item.physicalProperties}}</td>
                    <td style="text-align:center">{{item.hazardCharacteristics}}</td>
                    <td style="text-align:center">{{item.thisYearNumber/1000}}</td>
                    <td style="text-align:center">{{item.lastYearNumber/1000}}</td>
                    <td style="text-align:center">{{item.productionProcess}}</td>
                </tr>-->
                <tr v-for="(item,index)  in tableData">
                    <td style="text-align:center">{{index+1}}</td>
                    <td style="text-align:center">{{item.wasteName}}</td>
                    <td style="text-align:center">{{formatDictDetailCode(item.wasteCode)}}</td>
                    <td style="text-align:center">{{item.wasteType}}</td>

                    <td style="text-align:center">{{item.harmfulComponents}}</td>
                    <td style="text-align:center">{{item.pattern}}</td>
                    <td style="text-align:center">{{item.features}}</td>
                    <td style="text-align:center">{{item.process}}</td>
                    <!--<td style="text-align:center">{{item.unitName}}</td>-->
                    <td style="text-align:center">{{item.thisYear}}</td>
                    <td style="text-align:center">{{item.lastYear}}</td>
                </tr>
                <!--<tr>
                    <td colspan="9">合计</td>
                    <td>{{thisNumSum}}</td>
                    <td>{{lastNumSum}}</td>
                </tr>-->
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hazardousProductInfo",
        data(){
            return{
                tableData:[],
                entId:this.$route.params.entId,
                year:this.$route.params.year,
                thisNumSum:0,
                lastNumSum:0,
            }
        },
        mounted(){
            this.queryList();
            var that = this;
            window.vm.$on("hazardousProductInfo", function (year) {
                that.year = year
                // that.queryInfo();
                that.queryList();
            })
        },
        methods:{
            formatDictDetailCode(code){
                if(code==null || !code){
                    return '--';
                }else{
                    return code.split('#')[0];
                }
            },
            queryList() {
                /*alert("hazardousProductInfo______"+this.entId)*/
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/selhazardousInfoList';
                that.$axios.get(url, {params:{
                        year:that.year,
                        entId:that.entId
                    }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data;
                            that.thisNumSum = 0 ;
                            that.lastNumSum = 0 ;
                            for (var i = 0 ; i< res.data.length ; i++){
                                that.thisNumSum += Number( res.data[i].thisYear)
                                that.lastNumSum += Number( res.data[i].lastYear)
                                /*var ii = res.data[i].code ;
                                if(ii.substring(ii.length - 2) == '#1' || ii.substring(ii.length - 2) == '#2'){
                                    res.data[i].code = ii.substring(0,ii.length - 2)
                                }*/
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            queryInfo() {
                /*alert("hazardousProductInfo______"+this.entId)*/
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/hazardousInfo';
                that.$axios.get(url, {params:{
                    year:that.year,
                    id:that.entId
                }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data
                            /*
                            <td style="text-align:center">{{item.thisYearNumber}}</td>
                            <td style="text-align:center">{{item.lastYearNumber}}</td>
                            * */
                            that.thisNumSum = 0 ;
                            that.lastNumSum = 0 ;
                            for (var i = 0 ; i< res.data.length ; i++){
                                that.thisNumSum += Number( res.data[i].thisYearNumber)
                                that.lastNumSum += Number( res.data[i].lastYearNumber)
                                var ii = res.data[i].code ;
                                if(ii.substring(ii.length - 2) == '#1' || ii.substring(ii.length - 2) == '#2'){
                                    res.data[i].code = ii.substring(0,ii.length - 2)
                                }
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
        },
        destroyed: function() {
            window.vm.$off("hazardousProductInfo")
        }
    }
</script>

<style scoped>
    .title{
        margin-top: 30px;
        font-size: 18px;
        width: 100%;
        height: 40px;
        background-color: #F7F7F7;
        line-height: 40px;
        margin-bottom: 20px;
    }

    .tableClass{
        width: 1250px;
        border: 2px solid #8C939D;
        border-collapse:collapse;
        margin-bottom: 20px;
        margin-top: 20px;
        margin-right: 20px;
    }
    .tableClass tr td{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #8C939D;
        font-size: 16px;
    }
    .tableClass tr th{
        height: auto;
        min-height: 44px;
        line-height: 24px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: center;
        border:1px solid #8C939D;
        font-size: 16px;
        font-weight: bolder;
    }
</style>