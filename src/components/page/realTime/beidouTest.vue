<template>
    <div >
        <span>----------------------------------规则相关业务--------------------------------</span><br>
        <button @click="StandardApiAction_mergeRule">新建联动报警</button><br>
        <button @click="StandardVehicleRuleAction_loadVehicleRules">查询联动报警</button><br>
        <button @click="StandardApiAction_loadDevRuleByRuleId">查询规则设备关联关系</button><br>
    </div>
</template>

<script>
    export default {
        name: "beidouTest",
        props: {},
        components: {},
        computed: {},
        data() {

            return {

            };
        },
        methods: {
            StandardApiAction_mergeRule(){
                let _this = this;
                var name = "禁区";// 规则名称
                var begintime = "00:00:00";// 文件开始时间(12:30:30)
                var endtime = "23:59:59";// 文件结束时间(14:30:30)
                var alarmType = "27";// 报警类型
                var param = "2,100001";// 参数格式："p1,p2,p3,p4,p5,p6"
                var text = "此地禁止驶入,请马上驶离!";
                /*_this.$axios.post("/beidou/StandardApiAction_mergeRule.action",{
                    jsession:sessionStorage.getItem("jsession"),
                    name:name, // 规则名称
                    type:13,
                    text:text,
                    param:param,
                    alarmType:alarmType,
                    begintime:begintime,
                    endtime:endtime
                }).then(function (data) {
                    if (data.result==0) {
                        console.log(data);
                    };
                }).catch(function (err) {
                    console.log(err);
                });*/
                _this.$axios.get("/beidou/StandardApiAction_mergeRule.action?jsession="+sessionStorage.getItem("jsession")+"&name="+name+"&type=13&text="+text+"&param=2,100001&alarmType=27&begintime="+begintime+"&endtime="+endtime).then(function (data) {
                    if (data.result==0) {
                        // console.log(data);
                    };
                }).catch(function (err) {
                    // console.log(err);
                });
            },
            StandardApiAction_loadDevRuleByRuleId(){
                let _this = this;
                var ruleId = 7;// 	规则id
                _this.$axios.get("/beidou/StandardApiAction_loadDevRuleByRuleId.action?jsession="+sessionStorage.getItem("jsession")+"&ruleId="+ruleId+"&currentPage=1&pageRecords=10").then(function (data) {
                    if (data.result==0) {
                        // console.log(data);
                    };
                }).catch(function (err) {
                    // console.log(err);
                });
            },
            StandardVehicleRuleAction_loadVehicleRules(){
                let _this = this;
                var name = "禁区";// 规则名称
                _this.$axios.get("/beidou/StandardApiAction_loadRules.action?jsession="+sessionStorage.getItem("jsession")+"&ruleType=13&name="+name+"&alarmType=&currentPage=1&pageRecords=10").then(function (data) {
                    if (data.result==0) {
                        // console.log(data);
                    };
                }).catch(function (err) {
                    // console.log(err);
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>