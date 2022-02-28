<template>
    <el-form :label-position="labelPosition" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="退回说明:" prop="caseDetail" :rules="[{ required: true, message: '请输入补充说明', trigger: 'blur' }]" >
            <el-input style="100%" type="textarea" :rows="2" v-model="formInline.caseDetail" placeholder="请输入案件说明"></el-input>
        </el-form-item>
        <el-form-item label="照片">
            <el-upload
                action="/api/permissions/imageController/uploadImage"
                list-type="picture"
                :on-success="onWheelSuccess"
                :headers="myHeaders"
                :beforeUpload="beforeAvatarUpload"
                :on-remove="handleRemove"
                ref='upload'
                >
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button @click="cancelCase">取 消</el-button>
            <el-button type="primary" @click="confirmDialog('formInline')" :loading="uploadLing">确 定</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: 'caseBack',
        props: {
            currentData: {}
        },
        data() {
            return {
                formInline: {
                    caseDetail: ''
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                imageUrl: [],
                uploadLing: false
            }
        },
        methods: {
            cancelCase() {
                this.$emit('confirmDialog', this.formInline)
                this.resetForm('formInline')
            },
            confirmDialog() {
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        let payload = {
                            "regionCode": this.currentData.regionCode,
                            "details": this.currentData.details,
                            "caseTypeId": this.currentData.caseTypeId,
                            "entId": this.currentData.entId,
                            "warningId": this.currentData.warningId,
                            "processCode": 3,// 操作类型 1:处理 2:审核 3:退回  4:驳回
                            "createType": '',
                            "id": this.currentData.id,
                            "instructions": this.formInline.caseDetail,
                            "tattachmentVoList": this.imageUrl
                        }
                        this.$axios.post("/api/regulatory/case/assign", payload)
                        .then((res) => {
                            if (res.code == 0) {
                                this.$message.success("退回成功!");
                                this.$emit('confirmDialog', this.formInline)
                                this.resetForm('formInline')
                            }
                        })
                        .catch((error) => {
                            this.$message.error("请稍等后重试!");
                        });
                    } else {
                        this.$message.error('请填写所有必填内容！')
                        return false;
                    }
                });

            },
            beforeAvatarUpload(file) {
                this.uploadLing = true
                const isLt20M = file.size / 1024 / 1024 < 20;
                if (!isLt20M) {
                    this.$message.error('上传头像图片大小不能超过 20MB!');
                    this.uploadLing = false
                }
                return isLt20M;
            },
            onWheelSuccess(response, file, fileList) {
                if (response.code == 0) {
                    const imageData = {};
                    imageData.locationUrl = response.data.locationUrl;
                    imageData.thumbnailUrl = response.data.thumbnailUrl;
                    imageData.fileName = response.data.locationUrl;
                    this.imageUrl.push(imageData);
                    this.$message({ message: "上传成功", type: "success" });
                    this.uploadLing = false
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    this.uploadLing = false
                    return false;
                }
            },
            handleRemove(file, fileList) {
                if (file && file.response.data) {
                    let fileMark = file.response.data.locationUrl
                    let deleteIndex = this.imageUrl.findIndex(item => {return item.fileName = fileMark})
                    this.imageUrl.splice(deleteIndex, 1)
                    const formData = {
                        correlationId: '',
                        createdBy: '',
                        createdTime: '',
                        id: 0,
                        locationUrl: file.response.data.locationUrl,
                        thumbnailUrl: file.response.data.thumbnailUrl,
                        type: '',
                        updatedBy: '',
                        updatedTime: '',
                    }
                    this.$axios.delete("/api/permissions/imageController/batchDeleteImageByUrl", {data: formData})
                    .then((res) => {
                        if (res.code == 0) {
                            this.$message.success("删除成功!");
                        }
                    })
                    .catch((error) => {
                        this.$message.error("删除失败!");
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.imageUrl = []
                this.$refs.upload.clearFiles()
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
</style>
