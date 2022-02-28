<template>
    <el-form :label-position="labelPosition" :rules="rules" ref="formInline" label-width="100px" :model="formInline">
        <el-form-item label="企业名称:" prop="companyName">
            <el-input @focus="selectEnterprise()" :disabled="isEdit" v-model="formInline.companyName"></el-input>
        </el-form-item>
        <el-form-item label="所在地:" prop="region">
            <el-select style="width:100%" :disabled="true" @change="clearCompany" v-model="formInline.region" placeholder="请先选择企业">
                <el-option
                    v-for="item in regionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="企业类型:" prop="companyType">
            <el-select style='width:100%' :disabled="true" v-model="formInline.companyType" @change="clearCompany" placeholder="请先选择企业">
                <el-option
                    v-for="item in enterpriseTypeList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="案件类型:" prop="caseType">
            <el-select style="width:100%" :disabled="isEdit" v-model="formInline.caseType" placeholder="请选择案件类型">
                <el-option
                    v-for="item in caseTypeList"
                    :key="item.id"
                    :label="item.detailsName"
                    :value="item.detailsCode"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="案件来源:" prop="caseSource" v-show="isEdit">
            <el-input type="text" :disabled="inputDisabled" v-model="formInline.caseSource"></el-input>
        </el-form-item>
        <el-form-item label="案件说明:" prop="caseDetail">
            <el-input style="100%" :disabled="isEdit" type="textarea" :rows="2" v-model="formInline.caseDetail" placeholder="请输入案件说明"></el-input>
        </el-form-item>
        <el-form-item v-show="!isEdit" label="现场照片">
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
        <el-form-item label="现场照片:" v-show="isEdit && imageUrl.length">
            <el-row justify="space-between" :gutter="20">
                <el-col v-for="item in imageUrl" :key='item.locationUrl' :span=7>
                    <el-image 
                        fit="contain"
                        style="width: 100%; height: 150px"
                        :src="item.imageUrl" 
                        :preview-src-list=[item.url]>
                    </el-image>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item v-show="!isEdit">
            <el-button @click="cancelCase">取 消</el-button>
            <el-button type="primary" @click="confirmDialog('formInline')" :loading="uploadLing">确 定</el-button>
        </el-form-item>
        <el-dialog title="选择企业" 
            :visible.sync="selectEnterpriseVisable"
            width="80%"
            :modal="false"
            :append-to-body="true"
            center>
            <EnterpriseDialog 
                :defaultValue= JSON.parse(JSON.stringify(defaultValue))
                :regionOptions="regionOptions" 
                :enterpriseTypeList="enterpriseTypeList"
                @enterpriseInfo="enterpriseInfo">
            </EnterpriseDialog>
        </el-dialog>
    </el-form>
</template>
<script>
    import RegionList from '././../../../common/unit/RegionList.vue'
    import EnterpriseDialog from './enterpriseDialog.vue'
    export default {
        name: 'addDialog',
        components: {
            RegionList,
            EnterpriseDialog
        },
        props: {
            currentData: Object,
            isEdit: Boolean,
            reset: Boolean
        },
        watch: {
            currentData() {
                this.companyOptions= []
                this.resetForm('formInline')
                this.getCaseDetail()
            },
            reset() {
                this.resetForm('formInline')
            }
        },
        data() {
            return {
                formInline: {
                    region: '',
                    companyType: '',
                    companyName: '',
                    caseType: '',
                    caseSource: '',
                    caseDetail: ''
                },
                rules: {
                    region: [
                        { required: true, message: '请选择所在地', trigger: 'blur' },
                    ],
                    companyType: [
                        { required: true, message: '请选择企业类型', trigger: 'change' }
                    ],
                    companyName: [
                        { required: true, message: '请填写公司名称', trigger: 'change' }
                    ],
                    caseType: [
                        { required: true, message: '请选择案件类型', trigger: 'change' }
                    ],
                    caseSource: [
                        { required: false, message: '请选择案件来源', trigger: 'change' }
                    ],
                    caseDetail: [
                        { required: false, message: '请输入案件说明', trigger: 'blur' }
                    ]
                },
                labelPosition: 'right',
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                imageUrl: [],
                regionOptions: [],
                userPermissions: sessionStorage.getItem("roleCode"),
                enterpriseTypeList: [
                    { value: -1, name: "全部" },
                    { value: 1, name: "产废企业" },
                    { value: 2, name: "经营企业" },
                    { value: 3, name: "收集企业" },
                ],
                companyOptions: [],
                loading: false,
                inputDisabled: true,
                caseTypeList: [],
                sourceList: [
                    { name: '系统', value: 1},
                    { name: '手动新增', value: 2},
                    { name: '其他', value: 1},
                ],
                uploadLing: false,
                selectEnterpriseVisable: false,
                defaultValue: {
                    name: '',
                    entKind: -1,
                    region: ''
                }
            }
        },
        created() {
            this.getRegionChildrenList()
            this.getCaseTypeList()
        },
        methods: {
            enterpriseInfo(data) {
                if (data) {
                    this.formInline.companyName = data.name
                    this.formInline.region = data.regionCode
                    this.formInline.companyType = data.entKind
                    this.formInline.entId = data.id
                }
                this.selectEnterpriseVisable = false
            },
            selectEnterprise() {
                this.selectEnterpriseVisable = true
            },
            clearCompany() {
                this.formInline.companyName = ''
                this.getRegionCompanyList('').then((res) => {
                    this.companyOptions = res
                })
            },
            getCaseDetail() {
                if (this.currentData && this.currentData.id) {
                    this.$axios.get(`/api/regulatory/case/getCase/${this.currentData.id}`)
                    .then((res) => {
                        this.formInline.region = res.data.regionName
                        this.formInline.companyType = res.data.entKind
                        this.formInline.companyName = res.data.entName
                        this.formInline.caseType = this.caseTypeList.findIndex((item) => {
                            return item.detailsCode == res.data.caseTypeId
                        }) != -1 ? res.data.caseTypeId : '其他'
                        this.formInline.caseSource = res.data.caseSource
                        this.formInline.caseDetail = res.data.caseInfo ? res.data.caseInfo : '无'
                        this.formInline.entKindNum = res.data.entKindNum
                        this.formInline.caseTypeId = res.data.caseTypeId
                        this.companyOptions.push({id: res.data.entId, name: res.data.entName})
                        this.imageUrl = res.data.tattachmentVoList.map((item) => {
                            item.url = this.IMG_URL + item.locationUrl
                            item.imageUrl = this.IMG_URL + item.thumbnailUrl
                            return item
                        })
                    })
                    .catch((error) => {
                        this.$message.error("请稍等后重试!");
                    });
                }
            },
            getCaseTypeList() {
                this.$axios.get("/api/permissions/detailsCascadeType/selectDetailsCascade?detailsCode=caseType")
                .then((res) => {
                    if (res.code == 0) {
                        this.caseTypeList = res.data
                        this.getCaseDetail()
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    this.getRegionCompanyList(query).then((res) => {
                        this.loading = false;
                        this.companyOptions = res;
                    })
                } else {
                    this.companyOptions = [];
                }
            },
            getRegionCompanyList(str) {
                return new Promise((reslove, reject) => {
                    this.$axios.get("/api/regulatory/tEnterpriseInfo/enterpriseInfos", {
                        params: {
                            "regionCode": this.formInline.region,
                            "entKind": this.formInline.companyType,
                            "entName": str
                        },
                    })
                    .then((res) => {
                        reslove(res.data)
                    })
                    .catch((error) => {
                        reject(error)
                        this.$message.error("请稍等后重试!");
                    });
                })
            },
            cancelCase() {
                this.$emit('cancelDialog')
                this.resetForm('formInline')
            },
            confirmDialog(formName) {
                this.uploadLing = true
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveCaseInfo().then((res) => {
                            this.imageUrl = []
                            this.$refs.upload.clearFiles()
                            this.resetForm('formInline')
                            this.$emit('confirmDialog', this.formInline)
                        })
                    } else {
                        this.uploadLing = false
                        this.$message.error('请填写所有必填内容！')
                        return false;
                    }
                });
            },
            saveCaseInfo() {
                return new Promise((resolve, reject) => {
                    let params = {
                        "details": this.formInline.caseDetail,
                        "entId": this.formInline.entId,
                        "tattachmentVoList": this.imageUrl,
                        "caseTypeId": this.formInline.caseType,
                        "regionCode": this.formInline.region,
                        "entKind": this.formInline.companyType,
                    }
                    this.$axios.post("/api/regulatory/case/addCase", params)
                    .then((res) => {
                        this.uploadLing = false
                        if (res.code == 0) {
                            this.$message.success('保存成功')
                            resolve(res.data)
                        }
                    })
                    .catch((error) => {
                        reject(error)
                        this.uploadLing = false
                        this.$message.error("请稍等后重试!");
                    });
                })
            },
            getRegionChildrenList(code) {
                this.$axios.get("/api/regulatory/regionInfo/getRegionChildrenList", {
                    params: {
                        "regionCode": sessionStorage.getItem('regionCode')
                    },
                })
                .then((res) => {
                    if (res.code == 0 && res.data.length > 0) {
                        let secondLevelRegin = []
                        if (this.userPermissions === 'area') {
                            secondLevelRegin = res.data
                            this.formInline.region = sessionStorage.getItem("regionCode")
                        } else {
                            secondLevelRegin = res.data[0].children
                        }
                        this.regionOptions = secondLevelRegin
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
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

<style></style>
