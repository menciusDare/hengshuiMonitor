<template>
    <!-- 主体 -->
    <div class="main">
        <div class="main-top">
            <div class="breadcrumb">
                <a href="#"><i class="icon icon-wuliandan"></i>五联单查询</a><span class="sep">&gt;</span><a href="#">{{name}}</a><span class="sep">&gt;</span><span class="text-primary">详情</span>
            </div>
        </div>
        <div class="panel">
            <div class="panel-top">
                <div class="top-text"><el-link @click="returnPage"><i class="icon icon-fanhui"></i>返回</el-link><span class="line"></span>五联单编号：<span
                        class="text-default">{{linkedId}}</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<div :class="statusClass">{{statusName}}</div></span></div>
                <ul class="tab-card">
                    <li class="is-active"><a href="javascript:;"><i class="icon icon-shijianzhou"></i>时间轴</a></li>
                    <!--<li><a href="javascript:;"><i class="icon icon-danju"></i>单据</a></li>-->
                </ul>
            </div>
            <div class="panel-bd">
                <div class="step-box step04">
                    <ol class="step-list">
                        <li class="is-active">
                            <div class="step-time">
                                <span class="step-text">申请转移</span>
                                <span class="time-tit">计划转移时间</span>
                                <span class="time-text">{{data1.createTime}}</span>
                            </div>
                            <div class="step-icon">
                                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                                <div class="step-line"></div>
                            </div>
                            <div class="qiye-wf">
                                <div class="qiye-hd">
                                    <div class="qiye-logo">
                                        <img :src="headImg1" class="logo-sub">
                                    </div>
                                    <div class="qiye-title">
                                        <h2>{{data1.entName}}</h2>
                                        <div class="qiye-text"><span class="label-text label01">产废企业</span></div>
                                    </div>
                                </div>


                                <div class="qiye-bd">

                                    <table style="table-layout: fixed;width:100%;word-wrap:break-word; " >
                                        <thead>
                                        <tr>
                                            <td colspan="5">
                                                <span>经办人：{{data1.contacts}}</span>
                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span>联系电话：{{data1.contactsPhone}}</span>
                                            </td>
                                        </tr>
                                        <tr style="height: 40px;font-size: 16px;font-weight: 600">
                                            <th  style="text-align:center;width: 8%">危废名称</th>
                                            <th style="text-align:center;width: 8%">危废类别</th>
                                            <th style="text-align:center;width: 8%">危废代码</th>
                                            <th style="text-align:center;width: 8%">申请数量</th>
                                            <th style="text-align:center;width: 8%">包装方式</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr style="height: 25px;"  v-for="(ite,index)  in data1.vos">
                                            <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                                                {{ite.dictDetailName}}
                                            </td>
                                            <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                                                {{ite.dicType}}
                                            </td>
                                            <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                                                {{ite.dictDetailCode}}
                                            </td>
                                            <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                                                {{ite.weight}}
                                            </td>
                                            <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                                                {{ite.storageType}}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li class="is-active" v-if="statusName != '未开始'" >
                            <div class="step-time">
                                <span class="step-text">转移中</span>
                                <span class="time-tit">实际收集时间</span>
                                <span class="time-text">{{data2.createTime}}</span>
                            </div>
                            <div class="step-icon">
                                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                                <div class="step-line"></div>
                            </div>
                            <div class="qiye-wf">
                                <div class="qiye-hd">
                                    <div class="qiye-logo">
                                        <img :src="headImg1" class="logo-sub">
                                    </div>
                                    <div class="qiye-title">
                                        <h2>{{data2.entName}}</h2>
                                        <div class="qiye-text"><span class="label-text label01">转运企业</span></div>
                                    </div>
                                </div>
                                <div class="qiye-bd">
                                    <div class="qiye-pic">
                                        <img :src="headImg2" alt="" class="pic01">
                                        <img :src="headImg3" alt="" class="pic02">
                                    </div>
                                    <table class="table-text">
                                        <colgroup>
                                            <col style="width:0px">
                                            <col>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th>车辆型号：</th>
                                            <td>{{data2.vehicleModel}}</td>
                                            <th>有效荷载：</th>
                                            <td>{{data2.effectiveLoad}} 吨</td>
                                        </tr>
                                        <tr>
                                            <th>车牌号：</th>
                                            <td>{{data2.carNo}}</td>
                                            <th>实际收集数量：</th>
                                            <td>{{data2.amount}} kg</td>
                                        </tr>
                                        <tr>
                                            <th>准运种类：</th>
                                            <td>{{data2.transportationType}}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4">
                                                <el-button type="primary" class="mt-sm" @click="showMap(linkedId)"><span>查看转运监控</span></el-button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="line-lg"></div>
                                    <table class="table-text" style="flex: 0.5">
                                        <colgroup>
                                            <col style="width:0px">
                                            <col>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th>经办人：</th>
                                            <td>{{data2.contacts}}</td>
                                        </tr>
                                        <tr>
                                            <th>联系电话：</th>
                                            <td>{{data2.contactsPhone}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li class="is-active">
                            <div class="step-time">
                                <span class="step-text">危废接收</span>
                                <span class="time-tit" v-if="data3.createTime">实际接收时间</span>
                                <span class="time-text" >{{data3.createTime}}</span>
                            </div>
                            <div class="step-icon">
                                <span class="step-num"><i class="icon icon-wancheng"></i></span>
                                <div class="step-line"></div>
                            </div>
                            <div class="qiye-wf" v-if="data3.entName">
                                <div class="qiye-hd">
                                    <div class="qiye-logo">
                                        <img :src="headImg1" class="logo-sub">
                                    </div>
                                    <div class="qiye-title">
                                        <h2>{{data3.entName}}</h2>
                                        <div class="qiye-text"><span class="label-text label02">接收企业</span></div>
                                    </div>
                                </div>
                                <div class="qiye-bd">
                                    <table class="table-text">
                                        <colgroup>
                                            <col style="width:75px">
                                            <col>
                                        </colgroup>
                                        <tbody>
                                        <tr>
                                            <th>接收数量：</th>
                                            <td>{{data3.amount}} kg</td>
                                            <th>经办人：</th>
                                            <td>{{data3.contacts}}</td>
                                            <th>危废经营许可证编号：</th>
                                            <td>{{data3.licenceNo}}</td>
                                        </tr>
                                        <tr>
                                            <th>处理方式：</th>
                                            <td>{{data3.disposalMethod}}</td>
                                            <th>联系电话：</th>
                                            <td>{{data3.contactsPhone}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <div class="line-lg"></div>
                                    <table class="table-text" style="flex: 0.5;" >
                                        <colgroup>
                                            <col style="width: 75px">
                                            <col>
                                        </colgroup>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <el-dialog
                :title="titleVehicle"
                :visible.sync="dialogVehicle"
                width="1000px"  top="20px"
                :destroy-on-close="false" :modal-append-to-body="false" >
            <vehicleTrajectory ref="vehicleTrajectory"></vehicleTrajectory>
        </el-dialog>
    </div>
</template>

<script>
    import downloadFile from "../../common/unit/DownloadFile";
    // import vehicleTrajectory from './VehicleTrajectory';
    import vehicleTrajectory from './VehicleTrajectoryShow';
    export default {
        name: "VideoMonitor",
        components: {
            downloadFile,
            vehicleTrajectory
        },
        data(){
            return {
                linkedId: this.$route.params.linkedId,
                name: this.$route.params.name,
                pushPath: this.$route.params.pushPath,
                statusName: this.$route.params.statusName,
                statusClass: this.$route.params.statusClass,
                headImg1: '../../../../static/css/images/pic/logo01.png',
                headImg2: '../../../../static/css/images/pic/qiye01.jpg',
                headImg3: '../../../../static/css/images/pic/qiye-person.jpg',
                path: '/api/regulatory/',
                data1:{},
                data2:{},
                data3:{},
                dialogVehicle:false,
                titleVehicle:'转运回放'
            }
        },
        created: function () {
            this.loadingData();
        },
        methods:{
            returnPage(){
                this.$router.push({ name: this.pushPath})
            },
            loadingData() {
                var _this = this;
                let url = _this.path+"tFiveLinked/"+ _this.linkedId;
                _this.$axios.get(url).then((response) => {
                    if(response.code == 0) {
                        _this.data1={};
                        _this.data2={};
                        _this.data3={};
                        for(var i =0;i<response.data.length;i++){
                            var da = response.data[i];
                            if(i === 0){
                                
                                _this.data1=da;
                                debugger
                            }else if(i ===1){
                                _this.data2=da;
                                var attachments = da.attachments;
                                if(attachments !=null && attachments.length>0){
                                    for(var j = 0;j<attachments.length;j++){
                                        if(attachments[j].type===1){
                                            _this.headImg2 = _this.IMG_URL+attachments[j].locationUrl;
                                        }else if(attachments[j].type===2){
                                            _this.headImg3 = _this.IMG_URL+attachments[j].locationUrl;
                                        }
                                    }
                                }
                            }else if(i === 2){
                                _this.data3=da;
                            }
                        }
                        if(response.data.length>2){

                        }
                    }else{
                        // console.log(response.msg)
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            showMap(linkId){
                var _this = this;
                _this.dialogVehicle = true;
                /*setTimeout(function () {
                    _this.$nextTick(() => {
                        _this.titleVehicle = linkId+' 轨迹';
                        _this.$refs.vehicleTrajectory.initPage();
                    })
                },50)*/
            },
        },
    }
</script>

<style>
    .text-state.state-off1 {
        background-color: 	#FFD306;
    }
    .text-state.state-off2 {
        background-color: #ff7575;
    }
    .text-state.state-off3 {
        background-color:  	#BBFFBB;
    }
</style>
