<template>
    <div>
        <div style="display:flex;justify-content:center;">
            <el-form :model="entRuleForm" :rules="entRules" ref="entRuleForm" label-width="170px" >
                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="entRuleForm.name" placeholder="请输入企业名称" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="企业坐标：" prop="lngAndLat" >
                    <el-input v-model="entRuleForm.lngAndLat" style="width: 250px" placeholder="经度, 纬度" :readonly="true" ></el-input>
                    <el-button icon="el-icon-map-location" size="small" @click="showMarkerSearch"></el-button>
                </el-form-item>
                <el-form-item label="企业注册地址" prop="registeredAddress">
                    <el-input v-model="entRuleForm.registeredAddress" placeholder="请输入企业注册地址" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="生产设施地址详细地址" prop="address">
                    <el-input v-model="entRuleForm.address" placeholder="请输入生产设施地址详细地址" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="企业类型" prop="entKind">
                    <el-select v-model="entRuleForm.entKind" placeholder="请选择企业类型" class="w300">
                        <el-option
                                v-for="item in entsKinds"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属区域" prop="regionCodeArray" >
                    <el-cascader :options="regionTree" :show-all-levels="false" class="w300"  clearable
                                 placeholder="试试搜索：西城区" filterable
                                 v-model="entRuleForm.regionCodeArray"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="所属行业" prop="categoryIdArray">
                    <el-cascader :options="industryTree" :show-all-levels="false" class="w300"  clearable
                                 placeholder="试试搜索：制造" filterable
                                 v-model="entRuleForm.categoryIdArray"
                                 :props="{
                                    value:'value',
                                    label:'label'
                             }"
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="社会统一信用代码" prop="creditCode">
                    <el-input v-model="entRuleForm.creditCode" placeholder="请输入社会统一信用代码" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="mailBox">
                    <el-input v-model="entRuleForm.mailBox" placeholder="请输入电子邮箱" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="单位网址" prop="companyWebsite">
                    <el-input v-model="entRuleForm.companyWebsite" placeholder="请输入单位网址" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contacts">
                    <el-input v-model="entRuleForm.contacts" placeholder="请输入联系人" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话" prop="contactsPhone">
                    <el-input v-model="entRuleForm.contactsPhone" placeholder="请输入联系人电话" class="w300"></el-input>
                    <div v-show="isHaveAccount ==='none'">联系人电话将作为登录账号使用</div>
                </el-form-item>
                <el-form-item label="是否拥有省平台账号" change>
                  <el-radio v-model="isHaveAccount" label="have" @change="changeRadioStatus">有</el-radio>
                  <el-radio v-model="isHaveAccount" label="none" @change="changeRadioStatus">无</el-radio>
                </el-form-item>
                <el-form-item label="省平台账号" v-if="isHaveAccount ==='have'" prop="provincialAccount">
                    <el-input v-model="entRuleForm.provincialAccount" placeholder="请输入省平台登录账号" class="w300"></el-input>
                </el-form-item>
                <el-form-item label="省平台密码" v-if="isHaveAccount ==='have'" prop="provincialPwd">
                    <el-input v-model="entRuleForm.provincialPwd" placeholder="请输入省平台登录密码" class="w300"></el-input>
                </el-form-item>
                <el-form-item v-if="isHaveAccount ==='have'">
                    <el-popover
                      placement="top"
                      width="160"
                      v-model="popVisible">
                      <p>若填写了省平台账号则使用省平台账号登陆</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
                        <el-button type="primary" size="mini" @click="submitForm('entRuleForm')">确定</el-button>
                      </div>
                      <el-button el-button type="primary" :loading="createEntInfoLoading" slot="reference">立即创建</el-button>
                    </el-popover>
                    <el-button @click="resetForm('entRuleForm')">重置</el-button>
                </el-form-item>
                <el-form-item v-if="isHaveAccount ==='none'">
                    <el-button type="primary" :loading="createEntInfoLoading" @click="submitForm('entRuleForm')">立即创建</el-button>
                    <el-button @click="resetForm('entRuleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-dialog
                title="拾取坐标"
                :visible.sync="markerSearchDialogVisible"
                :close-on-press-escape = "false"
                :close-on-click-modal = "false"
                :modal-append-to-body = "false"
                :modal = "false"
                width="60%"
                :before-close="markerSearchDialogHandleClose">
            <!--添加企业-->
            <markerSearch ref="markerSearch"></markerSearch>
        </el-dialog>
    </div>
</template>

<script>
    import markerSearch from '../../common/unit/markerSearch'
    export default {
        name: "addEntInfo",
        components: {
            markerSearch
        },
        data() {
            return {
                popVisible: false,
                isHaveAccount: 'none',
                createEntInfoLoading: false,
                markerSearchDialogVisible: false,
                entsKinds: [
                    { value: 1, label: "产废企业" },
                    { value: 2, label: "经营企业" },
                    { value: 3, label: "收集企业" },
                ],
                regionTree:[],
                industryTree:[],
                entRuleForm: {
                    name: '',
                    entKind: 1,
                    regionCodeArray:'',
                    categoryIdArray:'',
                    regionCode: '',
                    categoryId: '',
                    creditCode: '',
                    registeredAddress: '',
                    address: '',
                    mailBox: '',
                    companyWebsite: '',
                    contacts: '',
                    contactsPhone: '',
                    lngAndLat: '',
                    lng: '',
                    lat: ''
                },
                entRules: {
                    name: [
                        { required: true, message: '请输入企业名称', trigger: 'blur' },
                    ],
                    regionCodeArray: [
                        { required: true, message: '请选择所属区域', trigger: 'change' }
                    ],
                    entKind: [
                        { required: true, message: '请选择企业类型', trigger: 'change' }
                    ],
                    categoryIdArray: [
                        { required: true, message: '请选择所属行业', trigger: 'change' }
                    ],
                    creditCode: [
                        { required: true, message: '请输入社会统一信用代码', trigger: 'blur' },
                    ],
                    registeredAddress: [
                        { required: true, message: '请输入企业注册地址', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入生产设施地址详细地址', trigger: 'blur' },
                    ],
                    lngAndLat : [
                        { required: true, message: '请选择企业坐标', trigger: 'blur' },
                    ],
                    contacts :[
                        { required: true, message: '请输入联系人姓名', trigger: 'blur' },
                    ],
                    contactsPhone: [
                      {required: true, message: '请输入联系人电话', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            changeRadioStatus() {
                if (this.isHaveAccount === 'have') {
                    this.$set(this.entRules, 'provincialAccount', [
                    {required: true, message: '请输入省平台登录账号', trigger: 'blur'}
                    ])
                    this.$set(this.entRules, 'provincialPwd', [
                    {required: true, message: '请输入省平台登录密码', trigger: 'blur'}
                    ])
                    this.$set(this.entRuleForm, 'provincialPwd', "")
                    this.$set(this.entRuleForm, 'provincialAccount', "")
                } else {
                    delete this.entRules['provincialAccount']
                    delete this.entRules['provincialPwd']
                    delete this.entRuleForm['provincialAccount']
                    delete this.entRuleForm['provincialPwd']
                }
            },
            markerSearchDialogHandleClose(){
                this.markerSearchDialogVisible = false;
                this.entRuleForm.lngAndLat = this.$refs.markerSearch.lng?this.$refs.markerSearch.lng +","+this.$refs.markerSearch.lat:this.entRuleForm.lngAndLat;
                this.entRuleForm.registeredAddress= this.$refs.markerSearch.addresstext;
                this.entRuleForm.address= this.$refs.markerSearch.addresstext?this.$refs.markerSearch.addresstext:this.entRuleForm.address;
                this.$refs.markerSearch.clearMarkerSearchMap();
            },
            showMarkerSearch(){
                this.markerSearchDialogVisible = true;
            },
            submitForm(formName) {
                this.createEntInfoLoading = true;
                this.popVisible = false
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.insertEntInfo().then(val => {
                            if(val.code==0){
                                this.createEntInfoLoading = false;
                                this.$message.success("企业创建成功!");
                                // console.log(val.data);
                                this.resetForm(formName);
                            }else{
                                this.createEntInfoLoading = false;
                                this.$message.error(val.msg);
                            }
                        }).catch(error => {
                          this.createEntInfoLoading = false;
                        //   console.error(error);
                        });
                    } else {
                        this.createEntInfoLoading = false;
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getRegionTree(){
                var _this = this;
                var url = "/api/regulatory/regionInfo/getRegionTree";
                let params = new URLSearchParams();
                params.append("regionId", 0);
                _this.$axios.post(url, params).then(res => {
                    if (res.code == 0) {
                        _this.regionTree = res.data?res.data[0].children:[];
                    }
                }).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            getIndustryTree(){
                var _this = this;
                var url = "/api/permissions/industry/selectTindutryTree";
                _this.$axios.get(url).then(res => {
                    if (res.code == 0) {
                        _this.industryTree = res.data;
                    }
                }).catch(error => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            insertEntInfo() {
                return new Promise((resolve, reject) => {
                    var _this = this;
                    let url = "/api/regulatory/tEnterpriseInfo/insertEntInfo";
                    _this.entRuleForm.regionCode = _this.entRuleForm.regionCodeArray[_this.entRuleForm.regionCodeArray.length-1];
                    _this.entRuleForm.categoryId = _this.entRuleForm.categoryIdArray[_this.entRuleForm.categoryIdArray.length-1];
                    let latLngArr = _this.entRuleForm.lngAndLat.split(",");
                    _this.entRuleForm.lng = latLngArr[0];
                    _this.entRuleForm.lat = latLngArr[1];
                    let params = null
                    if (this.isHaveAccount === 'none') {
                        params = JSON.parse(JSON.stringify(_this.entRuleForm))
                        delete params.provincialPwd
                        delete params.provincialAccount
                        params = JSON.stringify(params);
                    } else {
                        params = JSON.stringify(_this.entRuleForm);
                    }
                    _this.$axios.post(url,params,{
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        resolve(error);
                        // catch 指请求出错的处理
                        // console.log(error);
                    });
                })
            },

        },
        mounted: function () {

        },
        created() {
            this.changeRadioStatus();
            this.getRegionTree();
            this.getIndustryTree();

        }
    }
</script>

<style scoped>

</style>