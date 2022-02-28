<template>
    <div >
        <div class="panel-bd pdtlr-0">
            <div class="filter-more">
                <ul class="filter-box">
                    <li class="filter-item">
                        <div class="filter-label">企业类型：</div>
                        <div class="filter-con">
                            <div class="el-select w160">
                                <el-select v-model="search.entKind" placeholder="请选择企业类型">
                                    <el-option
                                            v-for="item in entsKinds"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="filter-label">企业名称：</div>
                        <div class="filter-con">
                            <div class="el-input w180 el-input-group el-input--prefix">
                                <el-input v-model="search.entName" placeholder="请输入企业名称">
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="filter-label">用户账号：</div>
                        <div class="filter-con">
                            <div class="el-input w180 el-input-group el-input--prefix">
                                <el-input v-model="search.userName" placeholder="请输入用户账号">
                                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                </el-input>
                            </div>
                        </div>
                    </li>
                    <li class="filter-item">
                        <div class="filter-btn">
                            <el-button type="button" size="medium"  @click="searchEntUserInfoList" class="el-button el-button--primary">
                                <span>查询</span></el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="overflowX">
            <el-table
                    :data="entUserInfoList"
                    :span-method="objectSpanMethod"
                    height="400"
                    border
                    style="width: 100%"
            >
                <el-table-column
                        prop="entName"
                        label="企业名称">
                </el-table-column>
                <el-table-column
                        prop="entKind"
                        label="企业类型">
                </el-table-column>
                <el-table-column
                        prop="entId"
                        label="企业主键ID">
                </el-table-column>
                <el-table-column
                        prop="entUserName"
                        label="企业用户账号">
                </el-table-column>
                <el-table-column
                        prop="userStatus"
                        label="用户状态">
                </el-table-column>
                <el-table-column
                        prop="userId"
                        label="用户主键ID">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="userPhone"
                        label="用户电话">
                </el-table-column>
              <el-table-column
                  prop="roleName"
                  label="角色">
              </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button  @click="entVideoCamera(scope.row)" type="text" size="small">摄像头</el-button>
                        <el-button  @click="entEquipment(scope.row)" type="text" size="small">设备</el-button>
                        <el-button  @click="initializeTheLoggedInUser(scope.row)" :loading="initEntLoginUserLoading" type="text" size="small">初始用户</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="el-pagination is-background mt-lg">
            <span class="el-pagination__total">共 {{total}}  条，每页显示</span>
            <span class="el-pagination__total">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="cur_page"
                                        :page-sizes="pageSizes"
                                        :page-size="pageSize"
                                        layout="sizes, prev, pager, next"
                                        :total="total">
                                </el-pagination>
                            </span>
            <span class="el-pagination__total">共 {{totalPage}} 页</span>
        </div>
        <el-dialog
                title="视频链接配置"
                :visible.sync="videoCameraDialogVisible"
                :close-on-press-escape = "false"
                :close-on-click-modal = "false"
                :modal-append-to-body = "false"
                :modal = "false"
                width="80%"
                :before-close="videoCameraDialogHandleClose">
            <el-table
                    :data="entVideoCameraList"
                    border
                    highlight-current-row
                    @current-change="rowCurrentChange"
                    ref="singleTable"
                    style="width: 100%">
                <el-table-column
                        prop="deviceNo"
                        label="设备编号"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.deviceNo"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pinCode"
                        label="验证码"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.pinCode"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="serialNum"
                        label="序列号"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.serialNum"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="channelNum"
                        label="通道号"
                        width="200px"
                        >
                    <template slot-scope="scope">
                        <el-input-number
                                :min="1"
                                v-model="scope.row.channelNum"
                                :disabled="!scope.row.isEdit">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="adress"
                        label="监控安装位置"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.adress"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="cameraName"
                        label="摄像头名称"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.cameraName"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="deviceStatustr"
                        label="在线状态"
                        >
                    <!--<template slot-scope="scope">
                        <el-input
                                placeholder="在线状态"
                                v-model="scope.row.deviceStatustr"
                                disabled>
                        </el-input>
                    </template>-->
                </el-table-column>
                <el-table-column
                    prop="manufacturerType"
                    label="设备厂商类型"
                    >
                    <template slot-scope="scope">
                        <el-select 
                            v-model="scope.row.manufacturerType" 
                            placeholder="请选择设备厂商"
                            :disabled="!scope.row.isEdit">
                            <el-option
                                    v-for="item in manufacturerList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                
                <el-table-column
                        label="操作"
                        width="250">
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.isEdit" size="mini" @click="openEditVideoCamera(scope.$index, scope.row)">开启行编辑</el-button>
                        <el-button v-if="scope.row.isEdit" size="mini" @click="submitEditVideoCamera(scope.$index, scope.row)">提交行编辑</el-button>
                        <el-button size="mini" @click.native.prevent="delVideoCamera(scope.$index,scope.row,entVideoCameraList)" >删除</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <ul style="float: right;margin-right: 100px;font-size: xx-large;margin-top: -10px;">
                <i class="el-icon-plus" @click="addEntVideoCamera()"></i>
                <i class="el-icon-refresh"  @click="searchEntVideoCameraList()"></i>
            </ul>
        </el-dialog>
        <el-dialog
                title="企业设备关联关系"
                :visible.sync="equipmentDialogVisible"
                :close-on-press-escape = "false"
                :close-on-click-modal = "false"
                :modal-append-to-body = "false"
                :modal = "false"
                width="80%"
                :before-close="equipmentDialogHandleClose">
            <el-table
                    :data="entEquipmentList"
                    border
                    highlight-current-row
                    @current-change="rowCurrentChange"
                    ref="singleTable"
                    style="width: 100%">
                <el-table-column
                        prop="userId"
                        label="用户"
                        >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.userId" :disabled="!scope.row.isEdit" placeholder="请选择用户">
                            <el-option
                                    v-for="item in entUserOptions"
                                    :key="item.userId"
                                    :label="item.userName"
                                    :value="item.userId">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="terminalNo"
                        label="终端编号"
                        width="300">
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.terminalNo"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="facilitiesId"
                        label="贮存设施"
                        >
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.facilitiesId" :disabled="!scope.row.isEdit" placeholder="请选择贮存设施">
                            <el-option
                                    v-for="item in entStorageFacilitieOptions"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="edition"
                        label="版本号"
                       >
                    <template slot-scope="scope">
                        <el-input-number
                                :min="1"
                                v-model="scope.row.edition"
                                :disabled="!scope.row.isEdit">
                        </el-input-number>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="template"
                        label="打印模版"
                        >
                    <template slot-scope="scope">
                        <el-input
                                v-model="scope.row.template"
                                :disabled="!scope.row.isEdit">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                        >
                    <template slot-scope="scope">
                        <el-button v-if="!scope.row.isEdit" size="mini" @click="openEditEquipment(scope.$index, scope.row)">开启行编辑</el-button>
                        <el-button v-if="scope.row.isEdit" size="mini" @click="submitEditEquipment(scope.$index, scope.row)">提交行编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <ul style="float: right;margin-right: 100px;font-size: xx-large;margin-top: -10px;">
                <i class="el-icon-plus" @click="addEntEquipment()"></i>
                <i class="el-icon-refresh"  @click="searchEntEquipmentList()"></i>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "entUserList",
        components:{

        },
        data(){
            return{
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                total: 0,
                totalPage: 0,
                entUserInfoList:[],
                entVideoCameraList:[],
                entEquipmentList:[],
                search:{
                    entKind: '',
                    entName:'',
                    userName:''
                },
                entsKinds: [
                    { value: -1, label: "全部" },
                    { value: 1, label: "产废企业" },
                    { value: 2, label: "经营企业" },
                    { value: 3, label: "收集企业" },
                ],
                manufacturerList: [
                    { name: '海康威视', id: 0},
                    { name: '大华乐橙', id: 1},
                    { name: '大华云睿', id: 2}
                ],
                videoCameraDialogVisible: false,
                equipmentDialogVisible: false,
                currentRow: null,
                entId:null,
                entUserOptions:[],
                entStorageFacilitieOptions:[],
                initEntLoginUserLoading:false
            }
        },
        methods:{
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            handleSizeChange(val){
                // 改变每页显示的条数
                this.pageSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1;
                this.searchEntUserInfoList();
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.searchEntUserInfoList();
            },
            searchEntUserInfoList() {
                var _this = this;
                var url = "/api/regulatory/tEnterpriseInfo/searchEntUserInfoList";
                let params = new URLSearchParams();
                params.append("page", _this.cur_page);
                params.append("limit", _this.pageSize);
                params.append("entKind", _this.search.entKind);
                params.append("entName", _this.search.entName);
                params.append("userName", _this.search.userName);
                _this.$axios.get(url, { params }).then((response) => {
                    if (response.code == 0) {
                        _this.entUserInfoList = response.data.records;
                        _this.total = response.data.total;
                        _this.totalPage = response.data.pages;
                        //循环数组用于合并行
                        _this.setrowspans();
                    } else {
                        _this.$message.warning(response.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            setrowspans:function() {
                // 先给所有的数据都加一个v.rowspan = 1
                this.entUserInfoList.forEach(v => {
                    v.rowspan = 1;
                });
                // 双层循环
                for (let i = 0; i < this.entUserInfoList.length; i++) {
                    // 内层循环，上面已经给所有的行都加了v.rowspan = 1
                    // 这里进行判断
                    // 如果当前行的id和下一行的id相等
                    // 就把当前v.rowspan + 1
                    // 下一行的v.rowspan - 1
                    for (let j = i + 1; j < this.entUserInfoList.length; j++) {
                        if (this.entUserInfoList[i].entId === this.entUserInfoList[j].entId) {
                            this.entUserInfoList[i].rowspan++;
                            this.entUserInfoList[j].rowspan--;
                        }
                    }
                    // 这里跳过已经重复的数据
                    i = i + this.entUserInfoList[i].rowspan - 1
                }
            },
            objectSpanMethod:function({ row, column, rowIndex, columnIndex }) {
                //合并第一列
                if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex == 9) {
                    return {
                        rowspan: row.rowspan,
                        colspan: 1
                    };
                }
            },
            entVideoCamera(entInfo){
                this.videoCameraDialogVisible = true;
                this.entId = entInfo.entId;
                this.searchEntVideoCameraList(entInfo.entId);
            },
            entEquipment(entInfo){
                this.equipmentDialogVisible = true;
                this.entId = entInfo.entId;
                this.searchEntUserOptions(entInfo.entName);
                this.selectStorageFacilitieOptions(entInfo.entId);
                this.searchEntEquipmentList(entInfo.entId);
            },
            initializeTheLoggedInUser(entInfo){
              var _this = this;
              _this.initEntLoginUserLoading = true;
              var url = "/api/permissions/sysUser/initializeTheLoggedInUser/"+entInfo.entId;
              _this.$axios.get(url).then((response) => {
                _this.initEntLoginUserLoading = false;
                if (response.code == 0) {
                  _this.searchEntUserInfoList();
                  _this.$message.success(response.data);
                } else {
                  _this.$message.warning(response.msg);
                }
              }).catch((error) => {
                _this.initEntLoginUserLoading = false;
                _this.searchEntUserInfoList();
                _this.$message.error("操作失败,请重试!")
                // catch 指请求出错的处理
                // console.log(error);
              });
            },
            videoCameraDialogHandleClose(){
                this.entId = '';
                this.entVideoCameraList = [];
                this.currentRow = null;
                this.videoCameraDialogVisible = false;
            },
            equipmentDialogHandleClose(){
                this.entId = '';
                this.entEquipmentList = [];
                this.currentRow = null;
                this.entUserOptions = [];
                this.entStorageFacilitieOptions = [];
                this.equipmentDialogVisible = false;
            },
            searchEntVideoCameraList(entId) {
                var _this = this;
                var url = "/api/regulatory/tEnterpriseInfo/searchEntVideoCameraList/"+(entId==null||entId==''?_this.entId:entId);
                _this.$axios.get(url).then((response) => {
                    if (response.code == 0) {
                        _this.entVideoCameraList = response.data;
                    } else {
                        _this.$message.warning(response.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            searchEntEquipmentList(entId) {
                var _this = this;
                var url = "/api/regulatory/tEnterpriseInfo/searchEntEquipmentList/"+(entId==null||entId==''?_this.entId:entId);
                _this.$axios.get(url).then((response) => {
                    if (response.code == 0) {
                        _this.entEquipmentList = response.data;
                    } else {
                        _this.$message.warning(response.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            openEditVideoCamera(index,row){
                row.isEdit = true;
                this.$refs.singleTable.setCurrentRow(row);
            },
            submitEditVideoCamera(index,row){
                var _this = this;
                this.$confirm('是否确定提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    modal:false,
                    showClose:false,
                    center:true,
                    type: 'warning'
                }).then(() => {
                    if(row.entId==null|| row.entId==''|| row.entId==0){
                        row.entId = _this.entId;
                    }
                    _this.addUpdateEntVideoCameraItem(row).then(val => {
                        if(val.code==0){
                            _this.$message.success("提交成功");
                            _this.searchEntVideoCameraList();
                        }else{
                            _this.$message.warning(val.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            addEntVideoCamera(){
                let item = {};
                item.id='';
                item.entId='';
                item.deviceNo='';
                item.pinCode='';
                item.serialNum='';
                item.channelNum='';
                item.adress='';
                item.cameraName='';
                item.createdDate='';
                item.updatedDate='';
                item.deviceStatus='';
                item.deviceStatustr='';
                item.manufacturerType = ''
                item.isEdit= true;
                this.entVideoCameraList.push(item);
            },
            rowCurrentChange(val) {
                this.currentRow = val;
            },
            addUpdateEntVideoCameraItem(row){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    let url = "/api/regulatory/tEnterpriseInfo/addUpdateEntVideoCameraItem";
                    var params = JSON.stringify(row);
                    _this.$axios.post(url,params,{
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        _this.$message.error("提交异常 ,请重试!");
                        // console.log(error);
                    });
                })
            },
            delVideoCamera(index,row, rows){
                var _this = this;
                if(row.id==null|| row.id=='' || row.id==0){
                    rows.splice(index, 1);
                }else{
                    this.$confirm('是否确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        closeOnPressEscape: false,
                        modal:false,
                        showClose:false,
                        center:true,
                        type: 'warning'
                    }).then(() => {
                        if(row.entId==null|| row.entId==''|| row.entId==0){
                            row.entId = _this.entId;
                        }
                        _this.delEntVideoCameraItem(row).then(val => {
                            if(val.code==0){
                                _this.$message.success("删除成功");
                                _this.searchEntVideoCameraList();
                            }else{
                                _this.$message.warning(val.msg)
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            },
            delEntVideoCameraItem(row){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    let url = "/api/regulatory/tEnterpriseInfo/delEntVideoCameraItem";
                    var params = JSON.stringify(row);
                    _this.$axios.post(url,params,{
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        _this.$message.error("删除异常 ,请重试!");
                        // console.log(error);
                    });
                })
            },
            openEditEquipment(index,row){
                row.isEdit = true;
                this.$refs.singleTable.setCurrentRow(row);
            },
            submitEditEquipment(index,row){
                var _this = this;
                this.$confirm('是否确定提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    modal:false,
                    showClose:false,
                    center:true,
                    type: 'warning'
                }).then(() => {
                    _this.addUpdateEntEquipmentItem(row).then(val => {
                        if(val.code==0){
                            _this.$message.success("提交成功");
                            _this.searchEntEquipmentList();
                        }else{
                            _this.$message.warning(val.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交'
                    });
                });
            },
            addUpdateEntEquipmentItem(row){
                return new Promise((resolve, reject) => {
                    var _this = this;
                    let url = "/api/regulatory/tEnterpriseInfo/addUpdateEntEquipmentItem";
                    var params = JSON.stringify(row);
                    _this.$axios.post(url,params,{
                        headers:{
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    }).then((response) => {
                        resolve(response);
                    }).catch((error) => {
                        // catch 指请求出错的处理
                        _this.$message.error("提交异常 ,请重试!");
                        // console.log(error);
                    });
                })
            },
            searchEntUserOptions(entName){
                var _this = this;
                var url = "/api/regulatory/tEnterpriseInfo/searchEntUserInfoList";
                let params = new URLSearchParams();
                params.append("page", 1);
                params.append("limit", 100);
                params.append("entName", entName);
                _this.$axios.get(url, { params }).then((response) => {
                    if (response.code == 0) {
                        _this.entUserOptions = response.data.records;
                    } else {
                        _this.$message.warning(response.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            selectStorageFacilitieOptions(entId){
                var _this = this;
                var url = "/api/regulatory/tEnterpriseInfo/selectStorageFacilitieOptions/"+entId;
                _this.$axios.get(url).then((response) => {
                    if (response.code == 0) {
                        _this.entStorageFacilitieOptions = response.data;
                    } else {
                        _this.$message.warning(response.msg);
                    }
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            addEntEquipment(){
                let item = {};
                item.edition='';
                item.facilitiesId='';
                item.id='';
                item.template='';
                item.terminalNo='';
                item.userId='';
                item.isEdit= true;
                this.entEquipmentList.push(item);
            }
        },
        mounted: function () {

        },
    }
</script>

<style scoped>

</style>