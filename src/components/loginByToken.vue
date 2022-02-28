<template v-loading.fullscreen.lock="fullscreenLoading">

</template>

<script>
    export default {
        name: "loginByToken",
        data(){
            return{
                token: this.$route.query.token,
                fullscreenLoading: true,
                loading:'',
                /*entType:this.$route.query.entType,*/
                entId:this.$route.query.entId,
                personId:this.$route.query.personId,
            }
        },
        methods: {
            getMenu(){
                //获取用户菜单
                let self = this;
                let url = "/api/auth/queryResource";
                self.$axios.post(url).then(function (response) {
                    sessionStorage.setItem('menus',JSON.stringify(response.data));
                    self.loading.close();
                    self.$router.push('/amfHomeHtml');
                })
            },
            openFullScreen() {
                var name = "";
                if(this.entType==2){
                    name = "跳转处置企业管理后台中......";
                }else if(this.entType==3){
                    name = "跳转运输企业管理后台中......";
                }
                this.loading = this.$loading({
                    lock: true,
                    text: name,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
            },
            initPage(){
                var self = this;
                self.openFullScreen();
                sessionStorage.setItem('token', self.token);
               /* sessionStorage.setItem('entType',self.entType)*/
                sessionStorage.setItem('entId', self.entId);
                sessionStorage.setItem('personId', self.personId);
                var url = "/api/permissions/sysUser/info";
                self.$axios.get(url).then(function(response) {
                    //1:产废企业2:处置企业3:运输企业
                    if(response.code == 0) {
                        localStorage.setItem('loginType', response.data.entType);
                        sessionStorage.setItem('entType', response.data.entType);
                        self.AppConfig.appInfo.loginType = response.data.entType;
                        if (null != response.data.name && response.data.name != '') {
                            localStorage.setItem('userName', response.data.name);
                            self.AppConfig.appInfo.userName = response.data.name;
                        }

                        if (null != response.data.portraitUrl && response.data.portraitUrl != '') {
                            self.AppConfig.appInfo.portraitUrl = response.data.portraitUrl;
                        }
                        if (null != response.data.lng && response.data.lng != '') {
                            localStorage.setItem('lng', response.data.lng);
                            self.AppConfig.appInfo.lng = response.data.lng;
                        } else {
                            localStorage.setItem('lng', self.AppConfig.appInfo.duLng);
                            self.AppConfig.appInfo.lng = self.AppConfig.appInfo.duLng;
                        }
                        if (null != response.data.lat && response.data.lat != '') {
                            localStorage.setItem('lat', response.data.lat);
                            self.AppConfig.appInfo.lat = response.data.lat;
                        } else {
                            localStorage.setItem('lat', self.AppConfig.appInfo.duLat);
                            self.AppConfig.appInfo.lat = self.AppConfig.appInfo.duLat;
                        }
                        var url = "/api/regulatory/tOrder/queryOrderNum?entId=" + sessionStorage.getItem("entId") + "&entType=" + response.data.entType;
                        self.$axios.get(url).then(function (response) {
                            if (response.code == 0) {
                                localStorage.setItem("totalOrder", response.data.orderNum);
                                self.AppConfig.appInfo.totalOrder = response.data.orderNum
                            }
                        });
                    }
                });
                self.loading.close();
                setTimeout(function () {
                    self.$router.push('/amfHomeHtml');
                },50)
            }
        },
        created() {
            this.initPage();
        }

    }
</script>

<style scoped>

</style>
