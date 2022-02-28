<template>
    <el-form :label-position="labelPosition" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="审核意见:" prop="enterprise" :rules="[{ required: true, message: '审核意见', trigger: 'blur' }]">
            <el-select style="width:100%" v-model="formInline.enterprise" placeholder="请选择审核意见">
                <el-option label="通过" value=2></el-option>
                <el-option label="驳回" value=4></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="补充说明:" prop="caseDetail" :rules="[{ required: true, message: '请输入补充说明', trigger: 'blur' }]" >
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
        name: 'caseDescription',
        props: {
            currentData: {}
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
                imageUrl: '',
                userPermissions: sessionStorage.getItem("roleCode"),
            }
        },
        methods: {
            cancelCase() {
                this.$emit('confirmDialog', this.formInline)
                this.resetForm('formInline')
            },
            confirmDialog(formName) {
                let receiveType = 4
                switch(this.formInline.radio) {
                    case 3:
                        this.userPermissions == 'city' ? receiveType = 2 : receiveType = 1
                        break
                    case 6:
                        receiveType = 3
                        break
                    case 9:
                        receiveType = 4
                        break
                }
                let params = {
                    // "regionCode": this.formInline.region,
                    "regionCode": this.currentData.regionCode,
                    "receiveType": receiveType, // 1---市，2---区，3---执法人 4---企业
                    "instructions": this.formInline.caseDetail,
                    "operationId": this.formInline.officials,
                    "region": this.currentData.regionCode,
                    "details": this.currentData.details,
                    "caseTypeId": this.currentData.warningId,
                    "caseId": this.currentData.id,
                    "entId": this.currentData.entId,
                    "warningId": this.currentData.warningId,
                    "processCode": this.formInline.enterprise,// 操作类型 1:处理 2:审核/通过 3:退回  4:驳回
                    "createType": '',
                    "id": this.currentData.id,
                }
                this.$axios.post("/api/regulatory/case/examine", params)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success("审核成功!");
                        this.$emit('confirmDialog', this.formInline)
                        this.resetForm('formInline')
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        
                    } else {
                        this.$message.error('请填写所有必填内容！')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl = ''
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
