<template>
    <!-- 头部 -->
    <div class="header">
        <h1 class="logo">
            <!--
            <img class="logo-img" src="/static/css/images/logo.png" alt="">
            <span class="logo-text">固废（危废）全过程智慧监管平台</span>  -->
            <!--  --> <img class="logo-img" src="/static/css/images/12" alt="" style="width: 65px;height: 65px;">
            <span class="logo-text">衡水市固废（危废）全过程智慧监管平台</span>
          <!--  <span class="logo-text">固废（危废）全过程智慧监管平台</span>-->
            <!--   <img class="logo-img" src="/static/css/images/pic/衡水市生态环境局.png" alt="" style="width: 65px;height: 65px;transform: translate(0px,-19px);">
               <span class="logo-text">衡水市危废全过程监管平台</span>  -->
            <!--   <img class="logo-img" src="/static/css/images/logo3.png" alt="" style="width: 100px;height: 70px;">
<span class="logo-text">融通废油处置监管平台</span>  -->

        </h1>
        <!-- 展开收起按钮 -->
        <div class="sidebar-toggle" id="btn-toggle">
            <i class="icon icon-shouqi"></i>
        </div>
        <div class="header-user">
            <div class="user-avatar"><!--<img :src="portraitUrl" alt="" class="user-avatar-img">--></div>
            <div class="user-link">
                <el-button size="small">
                    <i class="el-icon-tickets" @click="linkTo()">&nbsp;跳转至衡水大屏</i>
                </el-button>
            </div>
            <div class="user-name">{{name}}</div>
            <div class="user-logout" @click="logout"><a href="#">退出</a></div>
        </div>
        <amfListHtml ref="amfList"></amfListHtml>
    </div>
</template>

<script>
    import amfListHtml from './AmfListHtml'
    export default {
        name: "AmfHeaderHtml",
        components:{
            amfListHtml
        },
        data(){
            return{
                name: this.AppConfig.appInfo.userName,
                portraitUrl: this.AppConfig.appInfo.portraitUrl,
                orderNum: this.AppConfig.appInfo.totalOrder,
            }
        },
        methods: {
            linkTo() {
                window.open(this.AppConfig.appInfo.bigScreenUrl);
            },
            open(){
                this.$nextTick(() => {
                    this.$refs.amfList.open();
                })
            },
            logout(){
                const self = this;
                var params = new URLSearchParams();
                params.append('accesstoken',sessionStorage.getItem('token'));
                self.$axios.post("/api/auth/authentication/removeToken",params).then(function (response) {
                    // console.log(response)
                }).catch(function (err) {
                    // console.log(err);
                    self.message = "连接服务器失败！"
                });
                // 注销北斗
                self.beiDouLogOut();
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("entType")
                sessionStorage.removeItem("entId")
                sessionStorage.removeItem("regionCode")
                sessionStorage.removeItem("harzardousTypeList")
                this.$router.push('/');
            },
            beiDouLogOut(){
                let _this = this;
                _this.$axios.get("/beidou/StandardApiAction_logout.action?jsession="+sessionStorage.getItem('jsession')).then(function (data) {
                    if (data.result==0) {
                        sessionStorage.removeItem("jsession");
                    };
                }).catch(function (err) {
                    // console.log("北斗注销失败！");
                });
            },
            jumpAirMonitorFront(){
                window.open(this.AppConfig.appInfo.airMonitorFront+sessionStorage.getItem('token'), '_self');
            }
        }
    }
</script>

<style scoped>

</style>
