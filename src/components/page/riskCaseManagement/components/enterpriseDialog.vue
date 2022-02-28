<template>
    <div >
        <div class="panel-bd pdtlr-0">
            <el-form :label-position="labelPosition" :inline="true" ref="search" label-width="100px" :model="search">
                <el-form-item label="所在地:" prop="region">
                    <el-select style="width:100%" v-model="search.region" placeholder="请选择所属区域">
                        <el-option
                            v-for="item in regionOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业类型:" prop="entKind">
                    <el-select style='width:100%' v-model="search.entKind" placeholder="请选择企业类型">
                        <el-option
                            v-for="item in enterpriseTypeList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称:" prop="entName">
                    <el-input v-model="search.entName" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryInfo()">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="overflowX">
            <el-table
                v-loading = "isLoading"
                :data="entUserInfoList"
                :row-class-name="tableRowClassName"
                height="400"
                border
                ref="tb" 
                style="width: 100%"
            >
                <el-table-column prop="check" label="选择" width="100px" align="center">
                    <template slot-scope="scope">
                        <el-checkbox v-model="scope.row.check" @change="selectEnterprise(scope.row, scope.$index)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" type="index" width="100px" align="center" :index='(index)=>{return (index+1) + (this.pageIndex-1)*this.pageSize}'></el-table-column>
                <el-table-column prop="name" label="企业名称"> </el-table-column>
                <el-table-column prop="entKind" label="企业类型"> </el-table-column>
                <el-table-column prop="managerName" label="联系人"> </el-table-column>
                <el-table-column prop="managerPhone" label="联系人手机号"></el-table-column>
                <el-table-column prop="supplierName" label="设备厂商"> </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button  @click="selectEnterprise(scope.row, scope.$index)" :loading="initEntLoginUserLoading" type="text" size="small">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="el-pagination is-background mt-lg">
            <span >
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[5,10, 15, 20]"
                    :current-page="pageIndex"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="total">
                </el-pagination>
            </span>
            <span class="el-pagination__total">共 {{totalPage}} 页</span>
        </div>
        <el-row>
            <el-col :span="4" :offset="20" class="buttons">
                <el-button @click="cancelCase">取 消</el-button>
                <el-button type="primary" @click="confirmDialog()">确 定</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "enterpriseDialog",
        data(){
            return{
                pageIndex: 1,
                pageSize: this.AppConfig.appInfo.pageSize,
                total: 0,
                totalPage: 0,
                entUserInfoList:[],
                search:{
                    entKind: '',
                    entName:'',
                    region:''
                },
                initEntLoginUserLoading:false,
                labelPosition: 'right',
                currentDataIndex: 0,
                currentData: null,
                isLoading: false
            }
        },
        props: {
            defaultValue: Object,
            regionOptions: Array,
            enterpriseTypeList: Array
        },
        watch: {
            defaultValue() {
                this.search.entKind = ''
                this.search.region = ''
                this.search.entName = ''
                return this.searchEntUserInfoList()
            }
        },
        created() {
            this.search.entKind = this.defaultValue.entKind
            this.search.region = this.defaultValue.region
            this.searchEntUserInfoList()
        },
        methods:{
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === this.currentDataIndex) {
                    return 'success-row';
                }
                return '';
            },
            handleSizeChange(val){
                this.pageSize=val;
                this.pageIndex=1;
                this.currentData = null
                this.searchEntUserInfoList();
            },
            handleCurrentChange(val){
                this.pageIndex = val;
                this.currentData = null
                this.searchEntUserInfoList();
            },
            queryInfo() {
                this.pageIndex=1;
                this.currentData = null
                this.searchEntUserInfoList();
            },
            searchEntUserInfoList() {
                this.isLoading = true;
                let url = "/api/regulatory/tEnterpriseManagement/selectEnterpriseDetails";
                let params = {
                    pageNo: this.pageIndex,
                    pageSize: this.pageSize,
                    entKind: this.search.entKind,
                    name: this.search.entName,
                    supplierCode: [],
                    entTypes: [],
                    regionCode: this.search.region ? this.search.region : sessionStorage.getItem('regionCode')
                };
                this.$axios.post(url, params)
                    .then((response) => {
                        if (response.code == 0) {
                            this.entUserInfoList = response.data.records.map(item => {item.check = false; return item})
                            this.total = response.data.total;
                            this.totalPage = response.data.pages;
                        } else {
                            this.$message.error(response.msg)
                        }
                        this.isLoading = false;
                    })
                    .catch((error) => {
                        this.isLoading = false;
                    });
            },
            selectEnterprise(data, location) {
                this.currentDataIndex = location
                this.currentData = data
                this.entUserInfoList = this.entUserInfoList.map((item, index) => {
                    index === location ? item.check = true : item.check = false
                    return item
                })
            },
            confirmDialog() {
                if (this.currentData) {
                    this.$emit('enterpriseInfo', this.currentData)
                } else {
                    this.$message.error('请选择一个企业')
                }
            },
            cancelCase() {
                this.$emit('enterpriseInfo', null)
            }
        }
    }
</script>

<style>
    .el-table .success-row {
        background: #f6f9fd !important;
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
    }
</style>