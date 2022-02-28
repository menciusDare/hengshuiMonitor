<template>
    <div class="" style="overflow: auto;width: 100%">
        <!--环评信息-->
        <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
            <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
            <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">环评信息</div>
        </div>
        <el-row style="top: 10px;">
          <span style="margin-left: 20px;">是否存在环评项目信息：</span>
            <el-radio v-model="projectInfo" label="1" disabled>是</el-radio>
            <el-radio v-model="projectInfo" label="0" disabled>否</el-radio>
        </el-row>
        <div v-if="projectInfo==1">
            <div style="width: 1350px;padding-left: 20px">
                <table class="tableClass">
                    <tr>
                        <th>序号 </th>
                        <th>环评名称 </th>
                        <th>审批文号 </th>
                        <th>审批单位 </th>
                        <th>审批日期 </th>
                        <th>危废总量（吨）</th>
                        <th>附件 </th>
                    </tr>
                    <tbody id = "tbodyHtml">
                    <tr v-for="(item,index) in eaList ">
                        <td class='tableClassAct'>{{index+1}}</td>
                        <td class='tableClassAct'>{{item.eaName}}</td>
                        <td class='tableClassAct'>{{item.examinationFileId}}</td>
                        <td class='tableClassAct'>{{item.examinationUnit}}</td>
                        <td class='tableClassAct'>{{item.examinationDate}}</td>
                        <td class='tableClassAct'>{{item.amount}}</td>
                        <td class='tableClassAct'>
                            <a href="javascript:;" class="text-primary text-underline" @click="view(item)">查看</a>
                        </td>
                    </tr>
                    </tbody>

                </table>
            </div>
            <el-row style="bottom: 10px;">
                <span style="margin-left: 20px">是否存在危险废物自行利用处置设施：</span>
                <el-radio v-model="useSelfFac" label="1" disabled>是</el-radio>
                <el-radio v-model="useSelfFac" label="0" disabled>否</el-radio>
            </el-row>
            <div v-if="useSelfFac==1">
                <!--设施信息-->
                <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
                    <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                    <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">设施信息</div>
                </div>
                <div style="width: 100%;padding-left: 20px">
                    <table class="tableClass"  >
                        <thead>
                        <tr>
                            <th style="text-align:center; " >序号</th>
                            <th style="text-align:center; " >环评名称</th>
                            <th style="text-align:center; " >设施名称</th>
                            <th style="text-align:center; " >设施类别</th>
                            <th style="text-align:center; " >设施地址</th>
                            <th style="text-align:center; " >总投资</th>
                            <th style="text-align:center; " >设计能力</th>
                            <th style="text-align:center; " >设计使用</br>年限</th>
                            <th style="text-align:center; " >投入运行时间</th>
                            <th style="text-align:center; " >运行费用</th>
                            <th style="text-align:center; " >主要设备</br>及数量</th>
                            <th style="text-align:center; " >利用处置效果</th>
                            <th style="text-align:center; " >定期监测污染</br>物排放情况</th>
                            <th style="text-align:center; " >污染物</br>达标情况</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index)  in voluntarilyList">
                            <td style="text-align:center">{{index+1}}</td>
                            <td style="text-align:center">{{item.eaName}}</td>
                            <td style="text-align:center">{{item.equipmentName}}</td>
                            <td style="text-align:center">{{item.equipmentType}}</td>
                            <td style="text-align:center">{{item.equipmentAddress}}</td>
                            <td style="text-align:center">{{item.totalInvestment}}</td>
                            <td style="text-align:center">{{item.designCapability}}</td>
                            <td style="text-align:center">{{item.designServiceLife}}</td>
                            <td style="text-align:center">{{item.operationTime}}</td>
                            <td style="text-align:center">{{item.operatingExpenses}}</td>
                            <td style="text-align:center">{{item.equipmentNumber}}</td>
                            <td style="text-align:center">{{item.useDisposalEffect}}</td>
                            <td style="text-align:center">{{item.isRegular==0? '是': '否'}}</td>
                            <td style="text-align:center">{{item.isStandard==0?'达标':'不达标'}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--危险废物自行利用处置情况-->
                <div style="margin-left: 20px;background-color: rgba(140, 147, 157, 0.16);height: 40px;padding-top: 10px;padding-left: 20px;margin-right: 20px;">
                    <div style="width: 7px;height: 22px;background-color: rgba(27, 27, 27, 0.38);float: left"></div>
                    <div style="float: left;margin-left: 10px;font-weight: bold; font-size: 16px;">危险废物自行利用处置情况</div>
                </div>
                <div style="width: 1350px;padding-left: 20px">
                    <table class="tableClass"  >
                        <thead>
                        <tr>
                            <th style="text-align:center; " >序号</th>
                            <th style="text-align:center; " >设施名称</th>
                            <th style="text-align:center; " >废物名称</th>
                            <th style="text-align:center; " >废物代码</th>
                            <th style="text-align:center; " >本年度计划利用处置量(吨)</th>
                            <th style="text-align:center; " >上年度实际利用处置量(吨)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index)  in managementList">
                            <td style="text-align:center">{{index+1}}</td>
                            <td style="text-align:center">{{item.equipmentName}}</td>
                            <td style="text-align:center">{{item.dictDetailName}}</td>
                            <td style="text-align:center">{{item.dictDetailCode}}</td>
                            <td style="text-align:center">{{item.thisYearNumber}}</td>
                            <td style="text-align:center">{{item.lastYearNumber}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else style="margin-top: 20px;">
            <el-form label-width="185px">
                <el-form-item label="无环评原因：">
                    <el-input type="textarea" style="width: 500px;margin-left: -7px;" v-model="noEaReason" readonly></el-input>
                </el-form-item>
            </el-form>
        </div>
        <!--环评详情弹窗-->
        <el-dialog
                title="环评信息"
                :visible.sync="dialogVisible"
                :modal-append-to-body="false"
                width="640px"
                :before-close="huanpingDialogClose">
            <el-form  :model="formInline" label-width="120px" class="demo-ruleForm" >
                <table>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="环评名称">
                                <el-input v-model="formInline.eaName" readonly></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="审批文号">
                                <el-input v-model="formInline.examinationFileId" readonly></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="审批单位">
                                <el-input v-model="formInline.examinationUnit" readonly></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="审批日期">
                                <el-input v-model="formInline.examinationDate" style="width: 160px;" readonly></el-input>
                            </el-form-item>
                        </td>
                        <td >
                            <el-form-item label="危废总量（吨）">
                                <el-input v-model="formInline.amount" style="width: 160px;" readonly></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="是否含有危险废物产生信息" label-width="180px" style="margin-left: 52px;">
                                <el-radio v-model="formInline.temp2" label="1" disabled>是</el-radio>
                                <el-radio v-model="formInline.temp2" label="2" disabled>否</el-radio>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <el-form-item label="相关附件" >
                                <span v-if="formInline.locationUrl && formInline.locationUrl!=null && formInline.locationUrl!='' && formInline.fileName && formInline.fileName!=null && formInline.fileName!=''">
                                    <el-button type="text" >{{formInline.fileName}}</el-button>
                                </span>
                                <span v-else>
                                   无
                               </span>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ToUseSelf",
        data(){
            return{
                dialogVisible:false,
                formInline:'',
                projectInfo:"0",
                useSelfFac:'0',
                entId:this.$route.params.entId,
                year:this.$route.params.year,
                eaList:[],
                voluntarilyList:[],
                managementList:[],
                rowSize:50,
                noEaReason:''
            }
        },
        mounted(){
            this.getDataself()
            var that = this;
            window.vm.$on("ToUseSelf", function (year) {
                that.year = year
                that.getDataself();
            })
        },
        methods:{
            view(item){
                this.formInline = item;
                if(this.formInline.temp2 == 1){
                    this.formInline.temp2 = "1"
                }else if(this.formInline.temp2 == 2){
                    this.formInline.temp2 = "2"
                }
                this.dialogVisible = true;
            },
            getDataself(){
                var that = this;
                var url = 'api/regulatory/tEnterpriseHazardousVoluntarilyHandle/getHazardousVoluntarilyHandleInfo';
                that.$axios.get(url,{params: {
                        recordYear: that.year,
                        entId: that.entId
                }
                }).then(
                    function (res) {
                        if(res.code == 0){
                            if(res.data != null){
                                that.noEaReason = res.data.noEaReason;
                                that.eaList = res.data.eaList;
                                that.voluntarilyList = res.data.voluntarilyList;
                                that.managementList = res.data.managementList;
                                that.projectInfo = (!that.eaList || that.eaList == null || that.eaList.length<0)?'0':'1';
                                that.useSelfFac = (!that.voluntarilyList || that.voluntarilyList == null || that.voluntarilyList.length<0)?'0':'1';
                            }
                        }
                    }
                ).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            huanpingDialogClose(){
                this.dialogVisible = false;
                this.formInline = '';
            }
        },
        destroyed: function() {
            window.vm.$off("ToUseSelf")
        },
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
