<template>
    <div style="overflow: auto;">
        <el-divider content-position="left">PC端H5接入</el-divider>
        <div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="身份证号" prop="idCardNo">
                    <el-input v-model="ruleForm.idCardNo"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <img v-if="imageData" :src="imageData" style="width: 200px;height: 200px;" id="userImge" name="userImge" >
            <video v-if="videoData" ref="videoPlayer" id="video" controls="controls" autoplay="autoplay" muted :src="videoData" loop>
                <source >
            </video>
        </div>
        <!--<div>
            <ul>
                <li style="    float: left;">
                    <iframe
                            src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://AGGYZY@open.ys7.com/E61326979/1.hd.live&autoplay=1&audio=1&accessToken=at.c72kn58rd3mlq1onduh8a1ffb68ue1kq-8s1n97pt1t-1dbsepo-zftavq26t"
                            width="300px"
                            height="300px"
                            scrolling="no" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" frameborder="0"
                    >
                    </iframe>
                </li>
            </ul>
        </div>-->
        <el-divider content-position="left">API接入</el-divider>
        <el-divider content-position="left">静默活体人脸核身</el-divider>
        <el-button type="primary" @click="testPaaS">测试</el-button>
        得分<el-input v-model="Sim"></el-input>
        <img v-if="imageDatatest" :src="imageDatatest" style="width: 200px;height: 200px;"  >
    </div>
</template>

<script>
    export default {
        name: "faceTest",
        props: {},
        components: {},
        computed: {},
        data() {
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('身份证号不能为空'));
                }
                setTimeout(() => {
                    if (value.length < 18) {
                        callback(new Error('请输入18位二代身份证号'));
                    } else {
                        callback();
                    }
                }, 500);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入姓名'));
                } else {
                    callback();
                }
            };
            return {
                Sim:'',
                testVideo:'',
                imageDatatest:'',
                imageData:'',
                videoData:'',
                resultFaceInfo:'',
                ruleForm: {
                    name: '郭建鑫',
                    idCardNo: '410325199705144532',
                },
                rules: {
                    name: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    idCardNo: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.getFaceVerificationSign();
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getFaceVerificationSign(){
                var _this = this;
                _this.$axios.get('/api/regulatory/pc/face/getFaceVerificationSign', {
                    params: {
                        "idCardNo": _this.ruleForm.idCardNo,
                        "name": _this.ruleForm.name,
                    }
                }).then( (res)=> {
                        if (res.code == 0) {
                            // console.log(res.data);
                            // 合作方后台上送身份信息
                            _this.geth5faceid(res.data);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            geth5faceid(info){
                var _this = this;
                var url = "/api/regulatory/pc/face/geth5faceid";
                let params = new URLSearchParams();
                params.append("webankAppId", info.webankAppId);
                params.append("orderNo", info.nonce);
                params.append("name", info.name);
                params.append("idNo",  info.idNo);
                params.append("userId", info.userId);
                // params.append("sourcePhotoStr", '');
                params.append("sourcePhotoType", '1');
                params.append("version", info.version);
                params.append("sign", info.sign);
                _this.$axios.post(url, params).then(res => {
                    if (res.code == 0) {
                        // console.log(res.data);
                        // 启用 H5 人脸认证(生成签名)
                        _this.getH5FaceVerificationLoginSign(res.data);
                    }
                }).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getH5FaceVerificationLoginSign(info){
                var _this = this;
                _this.$axios.get('/api/regulatory/pc/face/getPCH5FaceVerificationLoginSign', {
                    params: {
                        "h5faceId": info.result.h5faceId,
                        "url": 'http://localhost:8080/#/faceTest',
                        "orderNo": info.result.orderNo,
                        "userId":_this.ruleForm.idCardNo,
                    }
                }).then( (res)=> {
                        if (res.code == 0) {
                            // console.log(res.data);
                           // 启动 H5 人脸验证
                            _this.startPCH5FaceTest(res.data);
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            startPCH5FaceTest(info){
                var _this = this;
                sessionStorage.setItem("resultFaceInfo",JSON.stringify(info));
               var url = 'https://ida.webank.com/api/pc/login';
                /*_this.$axios.get(url, {
                   params: {
                       "webankAppId": info.webankAppId,
                       "version": info.version,
                       "nonce":info.nonce,
                       "orderNo":info.orderNo,
                       "h5faceId":info.h5faceId,
                       "url":encodeURIComponent(info.url),
                       "userId":info.userId,
                       "sign":info.sign,
                   }
               }).then( (res)=> {
                       if (res.code == 0) {
                           console.log(res.data);
                           // 合作方后台上送身份信息
                       }
                   }
               ).catch((error) => {
                   // catch 指请求出错的处理
                   console.log(error);
               });*/
                window.location=url+'?webankAppId='+info.webankAppId+"&version="+info.version+"&nonce="+info.nonce+"&orderNo="+info.orderNo+"&h5faceId="+info.h5faceId+"&url="+encodeURIComponent(info.url)+"&userId="+info.userId+"&sign="+info.sign;
            },
            // 服务端验证结果
            pcFaceTestResultJump(infoArr){
                var _this = this;
                var info = _this.resultFaceInfo;
                let url = '/api/regulatory/pc/face/sync';
                _this.$axios.get(url, {
                    params: {
                        "webankAppId": info.webankAppId,
                        "version":info.version,
                        "nonce":info.nonce,
                        "orderNo":info.orderNo,
                        "sign":'',
                        "getFile":'1',
                    }
                }).then( (res)=> {
                        if (res.code == 0) {
                            // console.log(res.data);
                            // 合作方后台上送身份信息
                            if (res.data.code==0){
                                _this.$message.success(res.data.msg);
                                _this.imageData='data:image/png;base64,'+res.data.result.photo;
                                _this.videoData='data:video/mp4;base64,'+res.data.result.video;
                                _this.testVideo=res.data.result.video;
                            }
                        }
                    }
                ).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getUrlParam() {
                // 取得url中?后面的字符
                var query = window.location.search.substring(1);
                // console.log(query);
                if(query.includes("code") && query.includes("sign") && query.includes("newSign") && query.includes("orderNo") && query.includes("liveRate") && query.includes("h5faceId") ){
                    // 把参数按&拆分成数组
                    var param_arr = query.split("&");
                    var code = param_arr[0];
                    var sign = param_arr[1];
                    var newSign = param_arr[2];
                    var orderNo = param_arr[3];
                    var liveRate = param_arr[4];
                    var h5faceId = param_arr[5];
                    if(code.split("=")[1]==0 && this.resultFaceInfo){
                        // 服务端验证结果
                        this.pcFaceTestResultJump(param_arr);
                    }
                }

            },
            testPaaS(){
                var _this = this;
                var url = "/api/regulatory/pc/face/paas/easyface";
                let params = new URLSearchParams();
                params.append("action", 'LivenessRecognition');
                params.append("version", '2018-03-01');
                params.append("region", 'ap-beijing');
                params.append("idCard",  _this.ruleForm.idCardNo);
                params.append("name", _this.ruleForm.name);
                params.append("videoBase64", _this.testVideo);
                params.append("livenessType", 'SILENT');
                params.append("validateData", '');
                params.append("optional", '');
                _this.$axios.post(url, params).then(res => {
                    if (res.code == 0) {
                        // console.log(res.data);
                        _this.$message.success(res.data.description);
                        _this.imageDatatest='data:image/png;base64,'+res.data.bestFrameBase64;
                        _this.Sim = res.data.sim;
                    }
                }).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            }
        },
        mounted() {
            this.Sim = '';
            this.imageData = '';
            this.videoData = '';
            this.imageDatatest = '';
            // 服务端验证结果参数
            this.resultFaceInfo = sessionStorage.getItem("resultFaceInfo")?JSON.parse(sessionStorage.getItem("resultFaceInfo")):'';
            sessionStorage.removeItem("resultFaceInfo");
            this.getUrlParam();
        }
    }
</script>

<style scoped>

</style>