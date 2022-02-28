<template>
    <el-form :label-position="labelPosition" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="指派对象:">
            <el-radio-group v-model="formInline.radio" @change="changeRadio">
                <el-radio :label="3" v-if='permissions'>地区部门</el-radio>
                <el-radio :label="6">执法人员</el-radio>
                <el-radio :label="9">企业</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="所属区域:" prop="region" :rules="[{ required: true, message: '请选择所属区域', trigger: 'blur' }]" v-if="formInline.radio === 3">
            <el-select style="width:100%" v-model="formInline.region" placeholder="请选择所属区域">
                <el-option
                    v-for="item in regionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="执法人员:" prop="officials" :rules="[{ required: true, message: '请选择执法人员', trigger: 'blur' }]"  v-if="formInline.radio === 6">
            <el-select
                style="width:100%"
                v-model="formInline.officials"
                filterable
                remote
                reserve-keyword
                placeholder="请选择执法人员"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                    v-for="item in officialsOptions"
                    :key="item.userId"
                    :label="item.userName"
                    :value="item.userId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="指派企业:" :disabled='true' prop="enterprise" :rules="[{ required: true, message: '请选择整改企业', trigger: 'blur' }]"  v-if="formInline.radio === 9">
            <el-input style="width:100%" disabled v-model="formInline.enterprise" placeholder="请选择整改企业"></el-input>
        </el-form-item>
        <el-form-item label="案件说明:" prop="caseDetail" :rules="[{ required: true, message: '请输入案件说明', trigger: 'blur' }]" >
            <el-input style="100%" type="textarea" :rows="2" v-model="formInline.caseDetail" placeholder="请输入案件说明"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click="cancelCase">取 消</el-button>
            <el-button type="primary" @click="confirmDialog('formInline')">确 定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'assignedDialog',
        props: {
            currentData: Object
        },
        computed: {
            permissions(){
                return this.userPermissions == 'city' || this.userPermissions == 'admin' || this.userPermissions == 'operate' 
            }
        },
        watch: {
            currentData() {
                this.getRegionPersonList()
            }
        },
        data() {
            return {
                formInline: {
                    officials: '',
                    region: '',
                    enterprise: '',
                    caseDetail: '',
                    radio: 3
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                regionOptions: [],
                userPermissions: sessionStorage.getItem("roleCode"),
                loading: false,
                officialsOptions: [],
            }
        },
        created() {
            this.getRegionChildrenList()
            this.getRegionPersonList('').then((res) => {
                if (res.lawUsers && res.lawUsers.length > 0) {
                    this.officialsOptions = res.lawUsers
                }
            })
        },
        mounted() {
            this.formInline.radio = this.permissions ? 3 : 6
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.getRegionPersonList(query).then((res) => {
                        this.loading = false;
                        this.officialsOptions = res.lawUsers;
                    })
                } else {
                    this.officialsOptions = [];
                }
            },
            getRegionPersonList(str) {
                return new Promise((reslove, reject) => {
                    this.$axios.get("/api/regulatory/case/allAssign", {
                        params: {
                            "regionCode": sessionStorage.getItem('regionCode'),
                            "entId": this.currentData.entId,
                            "roleId": sessionStorage.getItem('roleId'),
                            "userName": str
                        },
                    })
                    .then((res) => {
                        this.formInline.enterprise = res.data.entInfoVo.entName;
                        reslove(res.data)
                    })
                    .catch((error) => {
                        reject(error)
                        this.$message.error("请稍等后重试!");
                    });
                })
            },
            getRegionChildrenList() {
                this.$axios.get("/api/regulatory/regionInfo/getRegionChildrenList", {
                    params: {
                        "regionCode": sessionStorage.getItem('regionCode')
                    },
                })
                .then((res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        let secondLevelRegin = []
                        if (this.userPermissions === 'city') {
                            secondLevelRegin = res.data[0].children
                        } else if (this.userPermissions === 'operate') {
                            secondLevelRegin = res.data[0].children
                            secondLevelRegin.unshift({label: res.data[0].label, value: sessionStorage.getItem('regionCode'), level:res.data[0].level })
                        }
                        this.regionOptions = secondLevelRegin
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            changeRadio() {
                this.resetForm('formInline')
                if (this.formInline.radio == 9) {
                    this.formInline.enterprise = this.currentData.entName
                }
            },
            cancelCase() {
                this.$emit('cancelDialog')
                this.resetForm('formInline')
            },
            confirmDialog(formName) {
                this.$refs[formName].validate((valid) => {
                    let receiveType = 4
                    switch(this.formInline.radio) {
                        case 3:
                            let level = this.regionOptions.find((item) => { return item.value == this.formInline.region}).level
                            level == 3 ? receiveType = 2 : receiveType = 1
                            break
                        case 6:
                            receiveType = 3
                            break
                        case 9:
                            receiveType = 4
                            break
                    }
                    if (valid) {
                        let params = {
                            "regionCode": this.currentData.regionCode,
                            "receiveType": receiveType, // 1---市，2---区，3---执法人 4---企业
                            "instructions": this.formInline.caseDetail,
                            "operationId": this.formInline.officials,
                            "region": this.formInline.region,
                            "details": this.currentData.details,
                            "caseTypeId": this.currentData.warningId,
                            "entId": this.currentData.entId,
                            "warningId": this.currentData.warningId,
                            "processCode": 1,// 操作类型 1:处理 2:审核 3:退回  4:驳回
                            "createType": '',
                            "id": this.currentData.id
                        }
                        this.$axios.post("/api/regulatory/case/assign", params)
                        .then((res) => {
                            if (res.code == 0) {
                                this.$message.success("指派成功!");
                                this.$emit('confirmDialog', this.formInline)
                            }
                        })
                        .catch((error) => {
                            this.$message.error("请稍等后重试!");
                        });
                        this.$emit('confirmDialog', this.formInline)
                        this.resetForm('formInline')
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .el-form .el-form-item .el-form-item__content {
        line-height: 40px;
    }
    .el-dialog {
        border-radius: 17px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
