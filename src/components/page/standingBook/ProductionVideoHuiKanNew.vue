<template>
    <el-dialog :visible.sync="dialogHK" v-if="dialogHK" :title="item.name" :center="true" :modal-append-to-body="false" :close-on-click-modal="false" top="10px" width="1000px" @close = "closeBtn" >
        <div class="modal modal-lg is-show" style="overflow:hidden;width:1040px;height: 1000px">
            <a href="javascript:;" class="modal-close icon icon-close" title="关闭" @click="closeBtn()"></a>
            <div class="modal-hd">
                <h2 class="modal-tit"><i class="icon icon-jiankong"></i>实时监控信息</h2>
            </div>
            <div class="modal-bd">
                <!-- 公司信息 -->
                <div class="company-detail">
                    <div class="company-title"><img src="../../../../static/css/images/pic/logo01.png">{{item.name}}</div>
                </div>

                <!-- 监控 -->
                <div class="tab-video" style="">
                    <div class="tab-hd">
                        <ul class="tab-head">
                            <li class="is-active"><i class="icon icon-buju"></i></li>
                        </ul>
                    </div>
                    <div class="tab-bd">
                        <div class="video-item is-active">
                            <!-- 左侧车间 -->
                            <div class="video-big">
                                <div class="video-box" style="width: 640px;height: 425px">
                                    <iframe
                                            :src="videoUrl"
                                            width="100%"
                                            height="100%"
                                            scrolling="no" allowfullscreen webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0"
                                    >
                                    </iframe>
                                    <div class="video-state">
                                        <a>{{cameraName}}<i class="icon icon-shipin"></i></a>
                                    </div>
                                </div>
                            </div>
                            <!-- 右侧车间 -->
                            <div class="video-auto">
                                <div class="video-box" v-for="imte in videoList" style="width: 300px;height: 180px">
                                    <div class="video-image" >
                                        <iframe
                                                :src="imte.url"
                                                width="100%"
                                                height="100%"
                                                scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0"
                                        >
                                        </iframe>
                                    </div>
                                    <div class="video-state" @click="videoInfo(imte)">
                                        <a>{{imte.cameraName}}<i class="icon icon-shipin"></i></a>
                                    </div>
                                </div>
                            </div>
                            <!-- 操控台 -->
                            <div class="panel-box mt-sm" style="width:320px;position:absolute;top: 290px;right:20px;background: rgb(37, 43, 58) none repeat scroll 0% 0%;">
                                <div style="transform: translate(10px,9px);overflow: hidden;font-size: 18px;line-height: 20px;">
                                    <div class="title" style="background-color: #252b3a;width: 200px;">操控台</div>
                                </div>
                                <div class="panel-bd" style="padding: 0 10px 0px;transform: translate(0px,19px)">
                                    <div class="operate-area">
                                        <!-- 方向 -->
                                        <div class="oper-direction">
                                            <!-- 选中样式根据情况需要is-active -->
                                            <div class="direction-cont top" @click="controlVideo(0)"><i class="icon icon-shang"></i></div>
                                            <div class="direction-cont is-active right" @click="controlVideo(3)"><i class="icon icon-you"></i></div>
                                            <div class="direction-cont bottom" @click="controlVideo(1)"><i class="icon icon-xia"></i></div>
                                            <div class="direction-cont left" @click="controlVideo(2)"><i class="icon icon-zuo"></i></div>
                                        </div>
                                        <!-- 调节 -->
                                        <div class="oper-adjust">
                                            <div class="contord">
                                                <div class="slide-box" >
                                                    <div class="imgIcon" @click="chooseJiaoJu(10)">
                                                        <i class="el-icon-plus"></i>
                                                    </div>
                                                    <div class="slide-name">焦距</div>
                                                    <div class="imgIcon jian" @click="chooseJiaoJu(11)">
                                                        <i class="el-icon-minus"></i>
                                                    </div>
                                                </div>
                                                <div class="slide-box jian" >
                                                    <div class="imgIcon" @click="chooseSuoFang(8)">
                                                        <i class="el-icon-plus"></i>
                                                    </div>
                                                    <div class="slide-name">缩放</div>
                                                    <div class="imgIcon jian" @click="chooseSuoFang(9)">
                                                        <i class="el-icon-minus"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 回看 -->
                <div class="review-box">
                    <!-- 回看选择时间 -->
                    <div class="panel-box">
                        <div class="panel-hd" style="padding-left: 20px;padding-bottom: 10px">
                            <div class="title" style="color: #1b1b1b">回看选择时间</div>
                            <div style="float: left;" @click="openVideoNow()"><el-link type="primary" style="color: #35A1EC;font-size: 14px">继续播放</el-link></div>
                        </div>
                        <div class="panel-bd">
                            <div class="el-tabs01 el-tabs el-tabs--card el-tabs--top">
                                <el-calendar v-model="chooseDateTimes" style="width: 430px">
                                </el-calendar>
                            </div>
                           <!-- <div class="time-operate">
                                <a class="is-active">异常</a>
                                <a>开视频</a>
                            </div>-->
                        </div>
                    </div>
                    <!-- 实时信息 -->
                    <div class="panel-box">
                        <div class="panel-hd" style="padding-left: 20px;padding-bottom: 10px">
                            <div class="title" style="color: #1b1b1b">报警信息</div>
                            <!--<div class="panel-right">{{shitTime}}</div>-->
                        </div>
                        <div class="panel-bd" style="text-align: center">
                            <table class="table table-sm">
                                <thead>
                                <tr>
                                    <th class="text-center" style="width: 50px;">序号</th>
                                    <th style="width: 200px;">时间</th>
                                    <th style="width: 300px;">消息</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="itme in shiList" v-if="shiList.length>0">
                                    <td class="text-center" style="width: 50px;">{{itme.id}}</td>
                                    <td style="width: 200px;">{{itme.createTime}}</td>
                                    <td :title="itme.message" style="width: 300px;">{{itme.message}}</td>
                                </tr>
                                <tr v-if="shiList.length<=0">
                                    <td colspan="3">暂无数据</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "productionVideo",
        components:{
        },
        data(){
            return{
                dateArray:[],
                activeName:7,
                chooseDate:"",
                statTime:'',
                endTime:'',
                current:0,
                entAddress:"",
                legalPhone:"",
                entName:"",
                contacts:'',
                videoList:[],
                videoUrl:'',
                videoAdress:"",
                dialogHK:false,
                entId:"",
                showWH:"",
                videoType:'',
                deviceNo:'',
                shiList:[],
                shitTime:"",
                item:{},
                chooseDateTimes: null,
                type: 1,
                cameraName:'',
                path: '/api/regulatory/',
                videoListNew:[],
                videoId: '',
                jiaoju: 0,
                jiaojuCope: 0,
                suofang:0,
                suofangCope:0,
                statTime1:'',
                endTime1:'',
                speed:1,// 云台速度：0-慢，1-适中，2-快
            }
        },
        methods:{
            chooseJiaoJu(direction){
                this.controlVideo(direction);
            },
            chooseSuoFang(direction){
                this.controlVideo(direction);
            },
            chooseVideoType(){
                this.videoId = '';
            },
            chooseVideo(id){
                this.videoId = id;
            },
            closeBtn(){
                this.type = 1;
                this.entId = "";
                this.entAddress= "";
                this.legalPhone= "";
                this.entName= "";
                this.contacts= '';
                this.videoList= [];
                this.videoListNew = [];
                this.videoUrl= "";
                this.videoAdress= "";
                this.pageType= "";
                this.cffalg=false;
                this.qtfalg=false;
                this.deviceNo="";
                this.videoType="";
                this.shiList= [];
                this.shitTime= "";
                this.statTime1 = "";
                this.endTime1="";
                this.chooseDateTimes = null;
                this.item= {};
                this.dialogHK=false;

            },
            getDateList(){
                var _this = this;
                if(_this.chooseDateTimes!=null){
                    var dateTime = _this.chooseDateTimes.format("yyyyMMdd");
                    _this.statTime = dateTime+"0000";
                    _this.endTime = dateTime+"2359";
                    _this.statTime1 = _this.chooseDateTimes.format("yyyy-MM-dd")+" 00:00:00";
                    _this.endTime1 = _this.chooseDateTimes.format("yyyy-MM-dd")+" 23:59:59";
                    _this.type = 2;
                }else{
                    var date = new Date();
                    _this.type = 1;
                    _this.statTime1 = date.format("yyyy-MM-dd")+" 00:00:00";
                    _this.endTime1 = date.format("yyyy-MM-dd")+" 23:59:59";
                }

            },
            loadingData() {
                var _this = this;
                _this.$nextTick(() => {
                    var url = _this.path +'tVideocamera/queryVideoList';
                    var params = new URLSearchParams();
                    _this.getDateList();
                    params.append('starDate',  _this.statTime);
                    params.append('endDate',  _this.endTime);
                    params.append('type',_this.type);
                    params.append('entId', _this.item.entId);
                    _this.$axios.post(
                        url, params
                    ).then((response) => {
                        if(response.code == 0) {
                            _this.entAddress = response.data.entAddress;
                            _this.legalPhone = response.data.legalPhone;
                            _this.entName = response.data.entName;
                            _this.contacts = response.data.contacts;
                            _this.videoInfo(response.data.data && response.data.data.length>0?response.data.data[0]:null);
                            _this.videoList = response.data.data;
                            var num = this.videoList.length;//16*9视频个数
                            $(".video-ratio-box").width(10000);
                            this.showWH = 'width:' + num * 1040 + 'px;';
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },

            controlVideo(direction) {
                var _this = this;
                var url = _this.path +'tVideocamera/getVideoControl';
                var params = new URLSearchParams();
                params.append('direction',direction);
                params.append('speed',_this.speed);
                params.append('id', _this.videoId);
                if(_this.videoId!=null&&_this.videoId!=''){
                    _this.$axios.post(
                        url, params
                    ).then((response) => {
                        if(response.code == 0) {
                            // _this.$message.success("操控成功!")
                        }else{
                            // _this.$message.error(response.msg)
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    })
                }else{
                    _this.$message.error("请选择需要控制的摄像头!")
                }
            },
            videoInfo(item){
                if(item){
                    this.videoUrl = item.url.replace("autoplay=2",'autoplay=1');
                    this.videoAdress = item.urlAdress;
                    this.cameraName = item.cameraName;
                    this.videoId = item.id;
                }
            },
            selectInfoList(){
                var _this = this;
                _this.$nextTick(() => {
                    _this.getDateList();
                    var url =  _this.path + 'tVideocamera/queryAlarmInformationPage?entId='+_this.item.entId+"&starDate="+_this.statTime1+"&endDate="+_this.endTime1;
                    _this.$axios.get(
                        url
                    ).then((response) => {
                        if(response.code == 0) {
                            _this.shiList = [];
                            for (var i = 0; i < response.data.records.length; i++) {
                                var param = {
                                    "id": i + 1,
                                    "createTime": response.data.records[i].createTime,
                                    "message": response.data.records[i].message
                                }
                                _this.shiList.push(param);
                            }
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
            show(){
                var _this = this;
                _this.loadingData();
                _this.selectInfoList();
                _this.type = 1;
            },
            openVideo(item){
                var _this = this;
                _this.$nextTick(() => {
                    var oJs = document.createElement('script');
                    oJs.setAttribute("type", "text/javascript");
                    oJs.setAttribute("src", "static/css/js/common.js");
                    document.getElementsByTagName("head")[0].appendChild(oJs); //绑定
                    _this.item = item;
                    _this.dialogHK=true;
                    _this.show();
                })
            },
            openVideoNow(){
                var _this = this;
                _this.$nextTick(() => {
                    var url = _this.path +'tVideocamera/queryVideoList';
                    var params = new URLSearchParams();
                    _this.getDateList();
                    params.append('starDate',  _this.statTime);
                    params.append('endDate',  _this.endTime);
                    params.append('type',1);
                    params.append('entId', _this.item.entId);
                    // console.log(params.get('type'))
                    _this.$axios.post(
                        url, params
                    ).then((response) => {
                        if(response.code == 0) {
                            _this.entAddress = response.data.entAddress;
                            _this.legalPhone = response.data.legalPhone;
                            _this.entName = response.data.entName;
                            _this.contacts = response.data.contacts;
                            _this.videoInfo(response.data.data && response.data.data.length>0?response.data.data[0]:null);
                            _this.videoList = response.data.data;
                            var num = this.videoList.length;//16*9视频个数
                            $(".video-ratio-box").width(10000);
                            this.showWH = 'width:' + num * 1040 + 'px;';
                        }
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },
        },
        watch:{
            chooseDateTimes () {
                var _this = this;
                var star = _this.chooseDateTimes.format("yyyyMMdd");
                var end = new Date().format("yyyyMMdd");
                if(star>end){
                    var msg = new Date().format("yyyy年MM月dd日");
                    if(_this.chooseDateTimes != null){
                        _this.chooseDateTimes = new Date();
                    }
                    _this.$message.error("请选择"+msg+"及之前的时间!")
                }else{
                    this.show();
                }

            },

        },
        created: function () {
            var oJs = document.createElement('script');
            oJs.setAttribute("type", "text/javascript");
            oJs.setAttribute("src", "static/css/js/common.js"); //文件的地址 ,可为绝对及相对路径
            document.getElementsByTagName("head")[0].appendChild(oJs); //绑定
        },
    }
</script>

<style>
    .el-calendar .is-selected{
        color: #1989fa;
    }
    /*控制台*/
    .oper-adjust{
        width: calc(100% - 90px);
        margin-left: 10px!important;
    }
    .contord{
        width: 100%;
    }
    .contord .slide-box{
        height: 30px;
        line-height: 30px;
        background: rgba(245,245,245,.2);
        width: 90%;
        padding: 0px 10px;
        box-sizing: border-box;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
    }
    .slide-box .imgIcon{
        width: 30px;
        height: 30px;
        /*background: url("../../../../static/css/images/pic/jianIcon.svg") no-repeat center;*/
        /*background-size: 100%*/
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .slide-box.jian{
        margin-top: 10px;

    }
    .slide-box .imgIcon.jian{
        /*background: url("../../../../static/css/images/pic/jiaIcon.svg") no-repeat center;*/
        /*background-size: 100%*/
    }
    .slide-box .slide-name{
        font-size: 15px;
        font-weight: bold;
    }
</style>
