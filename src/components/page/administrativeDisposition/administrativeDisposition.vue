<template>
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="#">
          <i class="icon icon-zhuanyun"></i>
          <span class="text-primary-font">行政待处置</span>
        </a>
      </div>
    </div>
    <div>
        <el-form ref="form" :model="formDisposition" :rules="rules" :label-position="'right'" label-width="auto">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>转出部门</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="部门名称:" prop="departmentDatas.dpName">
                            <el-input v-model="formDisposition.departmentDatas.dpName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行政区域:" prop="departmentDatas.dpAdministration">
                            <el-input v-model="formDisposition.departmentDatas.dpRegionName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系人:" prop="departmentDatas.dpContactPerson">
                            <el-input v-model="formDisposition.departmentDatas.dpContactPerson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:" prop="departmentDatas.dpContactNumber">
                            <el-input v-model="formDisposition.departmentDatas.dpContactNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>接收单位</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单位名称:" prop="rceivesDatas.receivesUnitName">
                            <el-select
                                style="width: 100%"
                                v-model="formDisposition.rceivesDatas.receivesUnitName"
                                filterable
                                remote
                                :remote-method="remoteMethod"
                                no-data-text="无匹配数据"
                                :loading="loading"
                                @change="selectAccept"
                                placeholder="请输入企业名称">
                                <el-option 
                                    v-for="item in acceptList"
                                    :key="item.entId"
                                    :label="item.entName"
                                    :value="item.entName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="经营许可证:" prop="rceivesDatas.receivesUnitCode">
                            <el-input v-model="formDisposition.rceivesDatas.receivesUnitCode" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="行政区域:" prop="rceivesDatas.receivesUnitAdministration">
                            <el-input v-model="formDisposition.rceivesDatas.receivesUnitRegionName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位地址:" prop="rceivesDatas.receivesUnitAddress">
                            <el-input v-model="formDisposition.rceivesDatas.receivesUnitAddress" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系人:" prop="rceivesDatas.receivesUnitPerson">
                            <el-input v-model="formDisposition.rceivesDatas.receivesUnitPerson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:" prop="rceivesDatas.receivesUnitNumber">
                            <el-input v-model="formDisposition.rceivesDatas.receivesUnitNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>运输单位</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单位名称:" prop="transportDatas.transportName">
                            <!-- <el-input v-model="formDisposition.transportDatas.transportName">
                                <el-button slot="append" icon="el-icon-search" @click="searchTransportInfo(formDisposition.transportDatas.transportName)"></el-button>
                            </el-input> -->
                            <el-select 
                                style="width: 100%"
                                v-model="formDisposition.transportDatas.transportName"
                                filterable
                                remote
                                :remote-method="remoteMethodTransport"
                                no-data-text="无匹配数据"
                                :loading="loading"
                                @change="selectTransport"
                                placeholder="请输入企业名称">
                                    <el-option 
                                        v-for="item in transportList"
                                        :key="item.entId"
                                        :label="item.entName"
                                        :value="item.entName">
                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="道路运输证号:" prop="transportDatas.transportCode">
                            <el-input v-model="formDisposition.transportDatas.transportCodeame" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="单位地址:" prop="transportDatas.transportAddress">
                            <el-input v-model="formDisposition.transportDatas.transportAddress" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="联系人:" prop="transportDatas.transportPerson">
                            <el-input v-model="formDisposition.transportDatas.transportPerson" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话:" prop="transportDatas.transportNumber">
                            <el-input v-model="formDisposition.transportDatas.transportNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>转移信息</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="计划转移日期:" prop="transferDate">
                            <el-date-picker
                                v-model="formDisposition.transferDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="计划编号:">
                            <el-input v-model="formDisposition.planNo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="实际转出方:" prop="actualRollOut">
                            <el-input type="textarea" v-model="formDisposition.actualRollOut"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上传行政处置说明文件:">
                            <el-upload
                                class="upload-demo"
                                action="/api/permissions/app/imageController/uploadFile"
                                :on-remove="handleRemove"
                                :on-success="onWheelSuccess"
                                :limit="1"
                                :headers="myHeaders"
                                :file-list="allFileList"
                                :beforeUpload="beforeAvatarUpload"
                                >
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传word/excel/pdf文件</div>
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="name"
                        label="经营方式"
                        width="180">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.disposalMethodCode" placeholder="请选择">
                                <el-option
                                v-for="item in operationModeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="废物类别"
                        width="180">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.typeCode" @change="changeCode(scope.row.typeCode)" placeholder="请选择">
                                <el-option
                                v-for="item in wasteList"
                                :key="item.id"
                                :label="item.typeName"
                                :value="item.typeName">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                        <el-table-column
                        label="废物代码"
                        width="180">
                        <template slot-scope="porps">
                            <el-select v-model="porps.row.wasteCode" placeholder="请选择">
                                <el-option
                                v-for="item in porps.row.wasteList"
                                :key="item.detailsCode"
                                :label="item.detailsCode"
                                :value="item.detailsCode">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                        <el-table-column
                        label="废物名称"
                        width="280">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.wasteName" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="数量"
                        width="80">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.number" placeholder="请输入"></el-input>
                        </template>
                    </el-table-column>
                     <el-table-column
                        label="单位"
                        width="180">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.unit" placeholder="请选择">
                                <el-option
                                v-for="item in unitList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleAdd(scope.$index, scope.row)">新增</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row>
                    <el-col :span="24" style='text-align: center;margin-top:20px;'>
                        <el-button type="primary" @click="submitForm">保存</el-button>
                        <el-button type="primary" @click="resetForm">重置</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-form>
    </div>
  </div>
</template>

<script>
    import { getTypeOptionsList } from '../../../api/administrative/administrative'
    export default {
        name: "administrativeDisposition",
        components: {
            
        },
        data(){
            return {
                myHeaders: {Authorization: "Bearer "+sessionStorage.getItem("token")},
                allFileList: [],
                unitList: [
                    {name: '千克', value: 1}
                ],
                tableData: [{
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                }],
                formDisposition: {
                    dpInfoId: '',
                    departmentDatas:{
                        dpInfoId : '',
                        dpName: '',
                        dpAdministration: [],
                        dpContactPerson: '',
                        dpContactNumber: '',
                        dpContactAddress: '',
                        dpContactLicense: '',
                        dpCertificate: '',
                        dpRegionName: ''
                    },
                    rceivesDatas:{
                        rceivesInfoId : '',
                        receivesUnitName: '',
                        receivesUnitAdministration: [],
                        receivesUnitContactPerson: '',
                        receivesUnitContactNumber: '',
                        receivesUnitContactAddress: '',
                        receivesUnitContactLicense: '',
                        receivesUnitCertificate: '',
                        receivesUnitRegionName: ''
                    },
                    transportDatas:{
                        transportInfoId : '',
                        transportName: '',
                        transportAdministration: [],
                        transportContactPerson: '',
                        transportContactNumber: '',
                        transportContactAddress: '',
                        transportContactLicense: '',
                        transportCertificate: '',
                        transportRegionName: ''
                    },
                    actualRollOut: '',
                    transferDate: '',
                    planNo: '计划编号'
                },
                options: [],
                rules: {
                    'departmentDatas.dpName': [
                        { required: true, message: '请输入正确单位名称', trigger: 'change' },
                    ],
                    'departmentDatas.dpAdministration': [
                        { required: false, message: '请选择活动区域', trigger: 'change' }
                    ],
                    'departmentDatas.dpContactPerson': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'departmentDatas.dpContactNumber': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'rceivesDatas.receivesUnitName': [
                        { required: true, message: '请输入正确单位名称', trigger: 'change' }
                    ],
                    'rceivesDatas.receivesUnitCode': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'rceivesDatas.receivesUnitAdministration': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'rceivesDatas.receivesUnitAddress': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'rceivesDatas.receivesUnitPerson': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'rceivesDatas.receivesUnitNumber': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'transportDatas.transportName': [
                        { required: true, message: '请输入正确单位名称', trigger: 'change' }
                    ],
                    'transportDatas.transportCode': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'transportDatas.transportAddress': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'transportDatas.transportPerson': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    'transportDatas.transportNumber': [
                        { required: false, message: '请选择活动区域', trigger: 'blur' }
                    ],
                    transferDate: [
                        { required: true, message: '请选择转移时间', trigger: 'change' }
                    ],
                    actualRollOut: [
                        { required: true, message: '请输入实际转出方', trigger: 'blur' }
                    ]
                },
                operationModeList: [],
                wasteList: [],
                haseRceivesInfoId: null,
                hasTransportInfoId: null,
                hasDpInfoId: null,
                acceptList: [],
                transportList: [],
                loading: false
            }
        },
        created: function () {
            this.getRegionChildrenList()
            this.getOperationModeList()
            this.getWasteList()
            // 企业类型 1转出部门2接收单位4运输单位
            this.getDepartmentInfo('', 1, sessionStorage.getItem('entId'))
        },
        methods:{
            selectAccept() {
                this.acceptList.forEach((item) => {
                    if (item.entName === this.formDisposition.rceivesDatas.receivesUnitName) {
                        this.haseRceivesInfoId = item.entId
                        this.formDisposition.rceivesDatas.rceivesInfoId = item.entId
                        this.formDisposition.rceivesDatas.receivesUnitName = item.entName
                        this.formDisposition.rceivesDatas.receivesUnitCode = item.businessLicense
                        this.formDisposition.rceivesDatas.receivesUnitAdministration = item.regionCode
                        this.formDisposition.rceivesDatas.receivesUnitPerson = item.linkName
                        this.formDisposition.rceivesDatas.receivesUnitNumber = item.linkPhone
                        this.formDisposition.rceivesDatas.receivesUnitAddress = item.entAddress
                        this.formDisposition.rceivesDatas.receivesUnitCertificate = item.roadTransportCertificate
                        this.formDisposition.rceivesDatas.receivesUnitRegionName = item.regionCodeName
                    }
                })
            },
            remoteMethod(query) {
                if (query != '') {
                    this.loading = true;
                    this.getDepartmentInfo(query, 2, '')
                } else {
                    this.acceptList = []
                }
            },
            remoteMethodTransport(query) {
                if (query != '') {
                    this.loading = true;
                    this.getDepartmentInfo(query, 4, '')
                } else {
                    this.transportList = []
                }
            },
            selectTransport() {
                this.transportList.forEach((item) => {
                    if (item.entName === this.formDisposition.transportDatas.transportName) {
                        this.hasTransportInfoId = item.entId
                        this.$set(this.formDisposition.transportDatas, 'transportId', item.entId)
                        this.$set(this.formDisposition.transportDatas, 'transportName', item.entName)
                        this.$set(this.formDisposition.transportDatas, 'transportCode', item.businessLicense)
                        this.$set(this.formDisposition.transportDatas, 'transportAddress', item.entAddress)
                        this.$set(this.formDisposition.transportDatas, 'transportPerson', item.linkName)
                        this.$set(this.formDisposition.transportDatas, 'transportNumber', item.linkPhone)
                        this.$set(this.formDisposition.transportDatas, 'transportAdministration', item.regionCode)
                        this.$set(this.formDisposition.transportDatas, 'transportCertificate', item.roadTransportCertificate)
                        this.$set(this.formDisposition.transportDatas, 'transportRegionName', item.regionCodeName)
                    }
                })
            },
            changeCode(name) {
                let params = new URLSearchParams();
                params.append('types', name);
                let url = "/api/regulatory/hazardousWasteCategory/getDetailsCodeByDicType";
                this.$axios.get(url, {params}).then((response) => {
                    let index = this.tableData.findIndex(item => {return item.typeCode === name})
                    this.$set(this.tableData[index], 'wasteList', JSON.parse(JSON.stringify(response.data)))
                    this.$set(this.tableData[index], 'wasteCode', '')
                }).catch(function (err) {
                    this.message = "连接服务器失败！"
                });
            },
            getOperationModeList() {
                getTypeOptionsList().then((res) => {
                    this.operationModeList = res.data
                }).catch((err) => {
                    this.message = "连接服务器失败！"
                })
            },
            getWasteList() {
                let params = new URLSearchParams();
                params.append('type', 1);
                this.$axios.post("/api/regulatory/hazardousWasteCategory/showDicType",params).then((response) => {
                    this.wasteList = response.data
                }).catch(function (err) {
                    this.message = "连接服务器失败！"
                });
            },
            getRegionChildrenList() {
                this.$axios.get("/api/regulatory/regionInfo/getRegionChildrenList", {
                    params: {regionCode: sessionStorage.getItem("regionCode") == null ? this.AppConfig.appInfo.regionCode : sessionStorage.getItem("regionCode")}
                }).then((res) => {
                    if (res.code == 0) {
                        this.options = res.data;
                    }
                }).catch((error) => {});
            },
            getDepartmentInfo(name, type, id) {
                return new Promise((resolve, reject) => {
                    let params = new URLSearchParams();
                    params.append('entName', name);
                    params.append('entKind', type);
                    params.append('entId', id)
                    let url = "/api/regulatory/pc/administrative/searchEntInfoByName";
                    this.$axios.get(url, {params}).then((response) => {
                        if(response.code === 0) {
                            if(type === 1) {
                                this.hasDpInfoId = response.data[0].entId
                                this.formDisposition.departmentDatas.dpInfoId = response.data[0].entId
                                this.formDisposition.departmentDatas.dpName = response.data[0].entName
                                this.formDisposition.departmentDatas.dpAdministration = response.data[0].regionCode
                                this.formDisposition.departmentDatas.dpContactPerson = response.data[0].linkName
                                this.formDisposition.departmentDatas.dpContactNumber = response.data[0].linkPhone
                                this.formDisposition.departmentDatas.dpContactAddress = response.data[0].entAddress
                                this.formDisposition.departmentDatas.dpContactLicense = response.data[0].businessLicense
                                this.formDisposition.departmentDatas.dpCertificate = response.data[0].roadTransportCertificate
                                this.formDisposition.departmentDatas.dpRegionName = response.data[0].regionCodeName
                            } else if (type === 2) {
                                this.acceptList = response.data
                            } else if (type === 4) {
                                this.transportList = response.data
                            }
                            this.loading = false
                        } else {
                            this.$message(response.msg)
                            switch(type) {
                                case 1: 
                                    this.hasDpInfoId = null
                                    this.formDisposition.departmentDatas.dpName = ''
                                    this.formDisposition.departmentDatas.dpAdministration = [];
                                    this.formDisposition.departmentDatas.dpContactPerson = ''
                                    this.formDisposition.departmentDatas.dpContactNumber = ''
                                    break;
                                case 2: 
                                    this.haseRceivesInfoId = null
                                    this.formDisposition.rceivesDatas.receivesUnitName = ''
                                    this.formDisposition.rceivesDatas.receivesUnitCode = ''
                                    this.formDisposition.rceivesDatas.receivesUnitAdministration = []
                                    this.formDisposition.rceivesDatas.receivesUnitPerson = ''
                                    this.formDisposition.rceivesDatas.receivesUnitNumber = ''
                                    this.formDisposition.rceivesDatas.receivesUnitAddress = ''
                                    break;
                                case 4: 
                                    this.hasTransportInfoId = null
                                    this.formDisposition.transportDatas.transportName = ''
                                    this.formDisposition.transportDatas.transportCode = ''
                                    this.formDisposition.transportDatas.transportAddress = ''
                                    this.formDisposition.transportDatas.transportPerson = ''
                                    this.formDisposition.transportDatas.transportNumber = ''
                                    break;
                            }
                            this.loading = false
                        }
                    })
                })
            },
            submitForm(formName) {
                this.$refs['form'].validate((valid) => {
                if (valid) {
                    for(let item of this.tableData) {
                        for(var key in item){
                            if(!Boolean(item[key])){
                                this.$message('请将转移信息表格填写完整, 数量不能为0')
                                return;
                            }
                        }
                    }
                    if (!(this.hasDpInfoId && this.haseRceivesInfoId && this.hasTransportInfoId)) {
                        this.$message('请填写正确企业信息')
                        return
                    }
                    if (this.allFileList.length <= 0) {
                        this.$message('请上传行政处置说明文件')
                        return
                    }
                    let tableList = JSON.parse(JSON.stringify(this.tableData))
                    let params = {
                        companyList: [
                            {
                                entId: this.formDisposition.departmentDatas.dpInfoId,
                                entName:  this.formDisposition.departmentDatas.dpName,
                                regionCode:  this.formDisposition.departmentDatas.dpAdministration,
                                linkName:  this.formDisposition.departmentDatas.dpContactPerson,
                                linkPhone:  this.formDisposition.departmentDatas.dpContactNumber,
                                entAddress:  this.formDisposition.departmentDatas.dpContactAddress,
                                businessLicense:  this.formDisposition.departmentDatas.dpContactLicense ,
                                roadTransportCertificate : this.formDisposition.departmentDatas.dpCertificate,
                                regionCodeName: this.formDisposition.departmentDatas.dpRegionName
                            },
                            {
                                entId: this.formDisposition.rceivesDatas.rceivesInfoId,
                                entName:  this.formDisposition.rceivesDatas.receivesUnitName,
                                regionCode:  this.formDisposition.rceivesDatas.receivesUnitAdministration,
                                linkName:  this.formDisposition.rceivesDatas.receivesUnitPerson ,
                                linkPhone:  this.formDisposition.rceivesDatas.receivesUnitNumber,
                                entAddress:  this.formDisposition.rceivesDatas.receivesUnitAddress,
                                businessLicense:  this.formDisposition.rceivesDatas.receivesUnitCode ,
                                roadTransportCertificate : this.formDisposition.rceivesDatas.receivesUnitCertificate,
                                regionCodeName: this.formDisposition.departmentDatas.receivesUnitRegionName
                            },
                            {
                                entId: this.formDisposition.transportDatas.transportId,
                                entName:  this.formDisposition.transportDatas.transportName,
                                regionCode:  this.formDisposition.transportDatas.transportAdministration,
                                linkName:  this.formDisposition.transportDatas.transportPerson,
                                linkPhone:  this.formDisposition.transportDatas.transportNumber ,
                                entAddress:  this.formDisposition.transportDatas.transportAddress,
                                businessLicense:  this.formDisposition.transportDatas.transportCode ,
                                roadTransportCertificate : this.formDisposition.transportDatas.transportCertificate,
                                regionCodeName: this.formDisposition.departmentDatas.transportRegionName
                            }
                        ],
                        transferInformationDTO: {
                            actualTransferor: this.formDisposition.actualRollOut,
                            fileUrl: this.allFileList[0].fileUrl,
                            hazardousWasteDtoList: tableList,
                            planNo: "",
                            transportDateBegin: this.formDisposition.transferDate[0],
                            transportDateEnd: this.formDisposition.transferDate[1]
                        }
                    }
                    this.$axios.post("/api/regulatory/pc/administrative/save",params).then((response) => {
                        if (response.code === 0) {
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            })
                            this.resetForm()
                        }
                    }).catch(function (err) {
                        this.$message('连接服务器失败！')
                    });
                } else {
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs['form'].resetFields();
                this.allFileList = [];
                this.acceptList =[],
                this.transportList = [],
                this.tableData = [{
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                }]
                this.getDepartmentInfo('', 1, sessionStorage.getItem('entId'))
            },
            handleAdd(index, data) {
                this.tableData.push({
                    disposalMethodCode: '',
                    typeCode: '',
                    wasteCode: '',
                    wasteName: '',
                    number:  0,
                    unit: '',
                    wasteList: []
                })
            },
            handleDelete(index, data) {
                if (this.tableData.length > 1) {
                    this.tableData.splice(index, 1)
                } else {
                    this.$message('至少有一组数据');
                }
            },
            searchComponyInfo(name) {
                this.getDepartmentInfo(name, 2, '')
            },
            searchTransportInfo(name) {
                this.getDepartmentInfo(name, 4, '')
            },
            beforeAvatarUpload(file) {
                if (
                    file.name.endsWith(".doc") ||
                    file.name.endsWith(".docx") ||
                    file.name.endsWith(".xls") ||
                    file.name.endsWith(".xlsx") ||
                    file.name.endsWith(".pdf")
                ) {
                    let count = 0;
                    this.allFileList.forEach(element => {
                        if (element.fileName == file.name) {
                            count++;
                        }
                    });
                    if (count > 0) {
                        this.$message({
                            message: "上传失败,已存在同名文件，请检查!",
                            type: "warning"
                        });
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    this.$message({
                    message: "上传失败,上传文件只支持word,excel,pdf!",
                    type: "warning"
                    });
                    return false;
                }
            },
            onWheelSuccess(response, file, fileList) {
                if (response.code == 0) {
                    var imageData = {};
                    imageData.fileUrl = response.data.locationUrl;
                    imageData.thumbUrl = response.data.thumbnailUrl;
                    imageData.fileName = response.data.locationUrl;
                    this.allFileList.push(imageData);
                    this.$message({ message: "上传成功", type: "success" });
                    return true;
                } else {
                    this.$message({ message: response.msg, type: "error" });
                    return false;
                }
            },
            handleRemove(file, fileList) {
                this.allFileList = this.allFileList.filter((item) => {
                    return item.uid !== file.uid
                })
            },
        },
    }
</script>

<style scoped>

</style>
