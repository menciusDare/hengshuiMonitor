<template >
    <!--危险废物转移情况-->
    <div class="" style="margin-right: 20px;overflow: auto " >

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">储存措施</div>
        </div>


        <table class = "tablePlanTrsH">
            <tr>
                <td style="width: 200px;text-align: center;border:1px solid #333;vertical-align: center;" :rowspan="rospan1">
                    <strong><br>储<br>存<br>措<br>施<br><br></strong>
                </td>
                <td colspan="6">
                    <h2 style="float: left">1、贮存场所是否符合《危险废物贮存污染源控制标准》有关要求&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList0" disabled  >
                        <el-checkbox label=0 class="checkbox-rt">是</el-checkbox>
                        <el-checkbox label=1 class="checkbox-rt">否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <h2 style="float: left">2、是否按危险废物特性分类收集、贮存&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList1" disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <h2 style="float: left">3、是否混合贮存未经安全性处置且性质不相容的危险废物&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList2" disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>
            <tr>
                <td colspan="6">
                    <h2 style="float: left">4、是否将危险废物混入非危险废物中贮存&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList3"  disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>
            <tr>
                <td colspan="6" style="border-bottom: 1px solid #333">
                    <h2 style="float: left">5、是否通过建设项目环境影响评价审批及竣工环境保护验收&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList4" disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>

            <tr>
                <td colspan="6">
                    <h2 style=" line-height: 44px" ><strong>危险废物贮存设施现状</strong></h2>
                </td>
            </tr>
            <tr>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" colspan="2"><strong>设施名称</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>数量</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>类型</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>面积</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>贮存能力</strong></td>
            </tr>

            <tr v-for="item  in tableData">
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" colspan="2">{{item.name}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.number}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.type}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.size}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.storageCapacity}}</td>
            </tr>

            <tr>
                <td colspan="6">
                    <h2 style=" line-height: 44px" ><strong>贮存危险废物情况</strong></h2>
                </td>
            </tr>



            <tr>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>名称</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>类别</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>拟存储量（吨）</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>上年度贮存储量（吨）</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>截至上年度年底累计贮存量（吨）</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px" ><strong>贮存原因</strong></td>
            </tr>

            <tr v-for="item  in tableData2">
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.name}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.type}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.number}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.size}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.storageCapacity}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item.storageReason}}</td>
            </tr>

            <tr>
                <td colspan="6" id="htmlTextOne" style="border-bottom: 1px solid #333">

                </td>
            </tr>

        </table>



        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">运输措施</div>
        </div>


        <table class="tablePlanTrs">
            <tr>
                <td style="width: 200px;text-align: center;border:1px solid #333;padding-left: 20px" rowspan="5">
                    <strong><br>运<br>输<br>措<br>施<br><br></strong>
                </td>
                <td   colspan="6" style=" padding-left: 20px;" >

                    <h2 style="float: left">1、运输过程中是否遵守危险废物运输管理的规则:&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList5" disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>

                </td>
            </tr>

            <tr>
                <td  colspan="6" style=" padding-left: 20px;">
                    <h2 style="float: left">2、是否按危险物特性分类运输:&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList6"  disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>

            <tr>
                <td   colspan="6" style=" padding-left: 20px;">
                    <h2 style="float: left">3、是否委托运输:&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                    <el-checkbox-group v-model="checkList7"  disabled>
                        <el-checkbox label=0>是</el-checkbox>
                        <el-checkbox label=1>否</el-checkbox>
                    </el-checkbox-group>
                </td>
            </tr>

            <!-- <tr>
                <td  style="width: 150px;padding-left: 20px">
                    4、单位名称:
                </td>
                <td  style="width: 200px;">
                    {{transportUnit}}
                </td>
                <td  style="width: 200px;">
                    运输资质:
                </td>
                <td  >
                    {{transportQualifications}}
                </td>
                <td  >
                </td>
                <td  >
                </td>
            </tr> -->

            <tr>
                <td colspan="6" style="border:1px solid #333;padding-left: 20px;" id="htmlText2">

                </td>
            </tr>
        </table>

        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">运输单位</div>
        </div>

        <table class="tablePlanTrsH">
            <tr>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px; width: 200px"><strong>序号</strong></td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px"><strong>运输单位名称</strong></td>
            </tr>
             <tr v-for="(item,index)  in tableData3">
                <td style="text-align:center;border: 1px solid #333;line-height: 44px; width:200px">{{index+1}}</td>
                <td style="text-align:center;border: 1px solid #333;line-height: 44px">{{item}}</td>
            </tr>

            
        </table>


        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">转移计划</div>
        </div>



        <table class="tablePlanFoot">
            <tr>
                <td style="width: 200px;text-align: center;" >
                    <strong><br>转<br>移<br>计<br>划<br><br></strong>
                </td>
                <td style="width: 1050px;vertical-align: top;" >
                    <div id = "htmlText3"  >

                    </div>
                </td>
            </tr>
        </table>

    </div>

</template>

<script>
    export default {
        name: "transterPlan",
        data(){
            return{
                entId:this.$route.params.entId,
                year:this.$route.params.year,
                checkList0: [],
                checkList1: [],
                checkList2: [],
                checkList3: [],
                checkList4: [],
                checkList5: [],
                checkList6: [],
                checkList7: [],

                tableData:'',
                tableData2:'',
                tableData3:'',

                storageMeasures:'',
                transportUnit:'',
                transportQualifications:'',
                rospan1:100,

            }
        },
        mounted(){
            this.queryPlan();
            var that = this;
            window.vm.$on("transterPlan", function (year) {
                that.year = year
                that.queryPlan();
            })
        },
        destroyed: function() {
            window.vm.$off("transterPlan")
        },
        methods:{

            queryPlan() {
               /* alert('transterPlan____'+this.entId)*/
                var that = this;
                var url = 'api/regulatory/ReportAndRegister/transferPlan';
                that.$axios.get(url,{params: {
                    year:that.year,
                    id:that.entId
                }
                }).then(
                    function (res) {
                        if (res.code == 0) {
                            if (res.data != null) {
                                that.tableData = res.data.facilities
                                that.tableData2 = res.data.storage
                                that.tableData3 = res.data.transferEntList
                                that.rospan1 = 10 + res.data.facilities.length + res.data.storage.length
                                if (res.data.plan.storageMeasures) {
                                    $('#htmlTextOne').html('<br><strong>贮存过程中采取的污染防治和事故预防措施:</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + res.data.plan.storageMeasures+'<br><br>');
                                }
                                that.transportUnit = res.data.plan.transportUnit
                                that.transportQualifications = res.data.plan.transportQualifications
                                $('#htmlText2').html('<br><strong>运输过程中采取的污染防治措施（如自行运输危险废物的。还包括工具种类、载重量、使用年限等）:' +
                                    '</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + res.data.plan.transportMeasures+'<br><br>');
                                $('#htmlText3').html('<br><strong>包括拟转移危险废物种类、数量，拟接收危险废物的单位等:</strong><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + res.data.plan.transferPlan+'<br><br>');

                                that.checkList0 = []
                                that.checkList0.push((res.data.plan.isStandard != null ? res.data.plan.isStandard : '') + '');

                                that.checkList1 = []
                                that.checkList1.push((res.data.plan.isClassification != null ? res.data.plan.isClassification : '') + '');

                                that.checkList2 = []
                                that.checkList2.push((res.data.plan.isNature != null ? res.data.plan.isNature : '') + '');

                                that.checkList3 = []
                                that.checkList3.push((res.data.plan.isBlend != null ? res.data.plan.isBlend : '') + '');

                                that.checkList4 = []
                                that.checkList4.push((res.data.plan.isCheck != null ? res.data.plan.isCheck : '') + '');

                                that.checkList5 = []
                                that.checkList5.push((res.data.plan.isRule != null ? res.data.plan.isRule : '') + '');

                                that.checkList6 = []
                                that.checkList6.push((res.data.plan.isCharacteristic != null ? res.data.plan.isCharacteristic : '') + '');

                                that.checkList7 = []
                                that.checkList7.push((res.data.plan.isEntrust != null ? res.data.plan.isEntrust : '') + '');

                            } else {
                                $('#htmlTextOne').html()
                                $('#htmlText2').html()
                                $('#htmlText3').html()
                                $('#htmlTextOne').html('<br><strong>贮存过程中采取的污染防治和事故预防措施:</strong><br>');
                                $('#htmlText2').html('<br><strong>运输过程中采取的污染防治措施（如自行运输危险废物的。还包括工具种类、载重量、使用年限等）: </strong><br>');
                                $('#htmlText3').html('<br><strong>包括拟转移危险废物种类、数量，拟接收危险废物的单位等:</strong><br>');

                                that.checkList0= []
                                that.checkList1= []
                                that.checkList2= []
                                that.checkList3= []
                                that.checkList4= []
                                that.checkList5= []
                                that.checkList6= []
                                that.checkList7= []

                                that.tableData = ''
                                that.tableData2 = ''

                                that.storageMeasures = ''
                                that.transportUnit = ''
                                that.transportQualifications = ''
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },

        },
    }
</script>

<style scoped>



    .tablePlanTrs{
        border:1px solid #333;
        width: 1250px;
        border-collapse:collapse;
        font-size: 16px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;

    }
    .tablePlanTrs tr td{
        border:0px solid #333;
        text-align:left;
        line-height: 30px;
    }



    .tablePlanTrsH{
        border:1px solid #333;
        width: 1250px;
        border-collapse:collapse;
        font-size: 16px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;

    }
    .tablePlanTrsH tr td{
        border:0px solid #333;
        line-height: 30px;
        padding-left: 20px;
    }

    .tablePlanFoot{
        border:1px solid #333;
        width: 1250px;
        border-collapse:collapse;
        font-size: 16px;
        margin-left: 20px;
        margin-top: 20px;
        margin-bottom: 20px;

    }
    .tablePlanFoot tr td{
        border:1px solid #333;
        line-height: 30px;
        padding-left: 20px;

    }



/*

    !*!/ 多选*!
   /deep/ .el-checkbox__inner{
       border: 2px solid #DCDFE6;
   }
    /deep/ .cell .el-checkbox__input .el-checkbox__inner {
        background-color: #fff;
        color: #ededed;
        border-color: #ededed;
        width: 16px;
        height: 16px;
    }
    /deep/ .el-checkbox {
        color: #a8a8a8;
    }
    /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #6c7c92;
    }
    /deep/ .el-checkbox__input .el-checkbox__inner::after {
    !*!/ 对号*!
    border: 2px solid #ededed;
   !* // 不覆盖下面的 会 导致对号变形*!
    box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 4px;
        position: absolute;
        top: 1px;
        width: 3px;
    //
    transform: rotate(45deg) scaleY(1);
    }
   !* // 选中后*!
       /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
           background-color: #fff;
           border-color: #6c7c92;
       }
    /deep/ .el-checkbox__input.is-checked .el-checkbox__inner::after {
        border: 2px solid #6c7c92;
        -webkit-box-sizing: content-box;
        box-sizing: content-box;
        content: "";
        border-left: 0;
        border-top: 0;
        height: 7px;
        left: 3px;
        position: absolute;
        top: -1px;
        width: 3px;
        -webkit-transform: rotate(45deg) scaleY(1);
        transform: rotate(45deg) scaleY(1);
    }

*/

</style>