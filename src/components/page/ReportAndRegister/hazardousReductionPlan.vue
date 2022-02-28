<template>
    <!--减少危险废物生产的计划-->
    <div class=""  style="overflow: auto">

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">减少危险废物产生量的计划</div>
        </div>

       <!-- /***********************重写部分一  start************************************/-->
        <table class="tablePlan">
            <tr>
                <td style="width: 200px;text-align: center;" :rowspan="rowspan1">
                    <strong> <br>减<br>少<br>危<br>险<br>废<br>物<br>产<br>生<br>量<br>的<br>计<br>划<br><br></strong>
                </td>
                <td><strong> 序号</strong></td>
                <td><strong> 危险废物名称</strong></td>
                <td><strong> 本年度计划产生量（吨）</strong></td>
                <td><strong> 备注</strong></td>
            </tr>

            <tr v-for="item  in tableData">
                <td style="text-align:center">{{item.rownum}}</td>
                <td style="text-align:center">{{item.name}}</td>
                <td style="text-align:center">{{item.thisYearNumber}}</td>
                <td style="text-align:center">{{item.remarks}}</td>
            </tr>
            <tr >
                <td colspan="2">合计</td>
                <td> {{sum}}</td>
                <td> </td>
            </tr>

        </table>
       <!-- /***********************重写部分一  end  ************************************/-->

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">减少危险废物危害性的计划</div>
        </div>


        <table class="tablePlan">
            <tr>
                <td style="width: 200px;text-align: center;" >
                    <strong> <br>减<br>少<br>危<br>险<br>废<br>物<br>危<br>害<br>性<br>的<br>计<br>划<br><br></strong>
                </td>
                <td style="width: 1050px;text-align: left;vertical-align: top;" >
                    <div id = "htmlOne" style="padding-left: 25px">

                    </div>
                </td>
            </tr>
        </table>



        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">减少危险废物产生量和危害性的计划</div>
        </div>



        <table class="tablePlan">
            <!-- <tr>
                <td style="width: 200px;text-align: center;" >
                    <strong> <br>减<br>少<br>危<br>险<br>废<br>物<br>危<br>害<br>性<br>的<br>计<br>划<br><br></strong>
                </td>
                <td style="width: 1050px;text-align: left;vertical-align: top;" >
                    <h2 style="margin-left: 20px"><strong><br>可以包括几个方面：改进设计、采用先进的工艺设计和设备、使用清洁的能源和原料、改善管理、危险废物综合利用、提高污染防治水平。   </strong></h2>
                    <div id = "htmlTwo" style="padding-left: 25px;font-size: 16px">

                    </div>
                    
                </td>
                
            </tr> -->
              <tr>
                <td style="width: 100px;text-align: center;" :rowspan="rowspan1">
                    <strong> <br>减<br>少<br>危<br>险<br>废<br>物<br>危<br>害<br>性<br>的<br>计<br>划<br><br></strong>
                </td>
                <td><strong> 相关方面</strong></td>
                <td><strong> 具体措施</strong></td>

            </tr>

            <tr>
                <td style="text-align:center">改进设计</td>
                <td style="text-align:center">{{wasteHazardPlanning.improvedDesign}}</td>
            </tr>
            <tr >  
                <td style="text-align:center">采用先进的工艺技术和设备</td>
                <td style="text-align:center">{{wasteHazardPlanning.advancedTechnology}}</td>
            </tr>
             <tr >  
                <td style="text-align:center">使用清洁的能源和原料</td>
                <td style="text-align:center">{{wasteHazardPlanning.cleanEnergy}}</td>
            </tr>
             <tr >  
                <td style="text-align:center">改善管理</td>
                <td style="text-align:center">{{wasteHazardPlanning.improveManagement}}</td>
            </tr>
             <tr >  
                <td style="text-align:center">危险废物综合利用</td>
                <td style="text-align:center">{{wasteHazardPlanning.comprehensiveUtilization}}</td>
            </tr>
             <tr >  
                <td style="text-align:center">提高污染防治水平</td>
                <td style="text-align:center">{{wasteHazardPlanning.pollutionPrevention}}</td>
            </tr>
             <tr >  
                <td style="text-align:center">其他</td>
                <td style="text-align:center">{{wasteHazardPlanning.other}}</td>
            </tr>
        </table>


    </div>
</template>

<script>
    export default {
        name: "hazardousReductionPlan",
        data(){
            return{
                entId:this.$route.params.entId,
                tableData:"",
                countData:'',
                year:this.$route.params.year,
                planA:'',
                planB:'',
                sum:'',
                rowspan1:100,
                wasteHazardPlanning:"",
            }
        },
        mounted(){
            this.queryHa();
            var that = this;
            window.vm.$on("hazardousReductionPlan", function (year) {
                that.year = year
                that.queryHa();
            })
        },
        methods:{

            queryHa() {
                /*alert('hazardousReductionPlan____'+this.entId)*/
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/hazardousReductionPlan';
                that.$axios.get(url,{params: {
                    year:that.year,
                    id:that.entId
                }}).then(
                    function (res) {
                        if(res.code == 0){
                            that.tableData = res.data.dataList
                            that.rowspan1 = res.data.dataList.length +2
                            if(res.data.dataList.length==0){
                                that.sum=0
                                $('#htmlOne').html( '<br><br>');
                                $('#htmlTwo').html( '<br><br>' );
                            }
                            that.sum = res.data.planMap.sum
                            $('#htmlOne').html( '<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+res.data.wasteHazardPlanning.wasteDecrementPlan +'<br><br>');
                            // $('#htmlTwo').html( '<div style="height: 5px"></div><span style="font-size: 18px;font-weight: 500">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+  res.data.wasteHazardPlanning.yield.replaceAll('#*#','<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')+'</span>');
                            that.wasteHazardPlanning = res.data.wasteHazardPlanning;
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
        },
        destroyed: function() {
            window.vm.$off("hazardousReductionPlan")
        }

    }
</script>

<style scoped>

    /*重写样式*/
.tablePlan{
    border:1px solid #333;
    width: 1250px;
    border-collapse:collapse;
    font-size: 16px;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;

}
.tablePlan tr td{
    border:1px solid #333;
    text-align:center
}
</style>