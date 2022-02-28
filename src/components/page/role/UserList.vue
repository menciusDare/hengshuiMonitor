<template>
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">角色类型：</div>
                            <div class="filter-con">
                                <el-select v-model="roleId" placeholder="请选择角色" style="width: 150px" @change="show()">
                                    <el-option
                                            v-for="item in roleList"
                                            :key="item.id"
                                            :label="item.roleName"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">用户姓名/手机号：</div>
                            <div class="filter-con">
                                <div class="el-input w160"><!---->
                                    <el-input
                                            placeholder="请输入关键字"
                                            v-model="sreach"  @change="show()">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                    <!----><!----><!----><!----></div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                               <!-- <button type="button" class="button-type2" @click="addOrUpRole(1,'')">
                                    <span>添加用户</span></button>-->
                                <el-button type="button" size="medium"  @click="addOrUpRole(1,'')" class="el-button el-button--primary">
                                    <span>添加用户</span></el-button>
                                <!--<button type="button" class="button-type2" @click="deleteRoleInfo">
                                    <span>批量删除</span></button>-->
                                <el-button type="button" size="medium"  @click="deleteRoleInfo" class="el-button el-button--primary">
                                    <span>批量删除</span></el-button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div style="width: 100%;" >
                <div style="width: 100%; height: 600px; position: relative;" class="">
                    <div style="height: 31px; position: absolute; right: 0; top: 0; line-height: 31px;">
                        <el-row>
                            <span><el-link style="font-size: 16px;font-weight: 600" @click="clickPinYin('')">全部</el-link>&nbsp;</span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('A')">A</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('B')">B</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('C')">C</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('D')">D</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('E')">E</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('F')">F</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('G')">G</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('H')">H</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('I')">I</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('J')">J</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('K')">K</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('L')">L</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('M')">M</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('N')">N</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('O')">O</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('P')">P</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('Q')">Q</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('I')">I</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('S')">S</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('T')">T</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('U')">U</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('V')">V</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('W')">W</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('X')">X</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('Y')">Y</el-link></span>
                            <span class="letter">&nbsp;<el-link @click="clickPinYin('Z')">Z</el-link></span>
                            <span class="letter">&nbsp; </span>
                        </el-row>
                    </div>
                    <!--列表-->
                   <div class="overflowX" style="padding-top: 35px;">
                        <table class="table-default table-full">
                            <thead>
                            <tr>
                                <th style="text-align:center;width: 80px"></th>
                                <th style="text-align:center;width: 80px">序号</th>
                                <th style="text-align:center">用户名称</th>
                                <th style="text-align:center">账户名称</th>
                                <th style="text-align:center">所属区域</th>
                                <th style="text-align:center">手机号</th>
                                <th style="text-align:center">角色类型</th>
                                <th style="text-align:center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item) in tableData" :key="item.id">
                                <td style="text-align:center;width: 80px"><input type="checkbox" class="checkboxValue" name="checkboxValue" :value="item.id" @click="queryAll()" /></td>
                                <td style="text-align:center;width: 80px">{{item.index}}</td>
                                <td style="text-align:center">{{item.name}}</td>
                                <td style="text-align:center">{{item.userName}}</td>
                                <td style="text-align:center">{{item.regionName}}</td>
                                <td style="text-align:center">{{item.phone}}</td>
                                <td style="text-align:center">{{item.roleName}}</td>
                                <td style="text-align:center" >
                                    <el-link type="primary" @click="addOrUpRole(2,item.id)">编辑</el-link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                   </div>


                    <div class="el-pagination is-background mt-lg">
                        <span class="el-pagination__total">共 {{total}} 条，每页显示</span>
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
                </div>
            </div>
            <el-dialog :title="dialogTitle" :visible.sync="dialogRole" @close="closeDia" :modal-append-to-body="false" :close-on-click-modal="false" width="590px">
                <div>
                    <el-form ref="form" label-width="180px" :model="form" :rules="rules" >
                        <el-form-item label="姓名：" prop="name" >
                            <el-input v-model="form.name" style="width: 300px" placeholder="请输入姓名" v-bind:readonly="isReadOnly"></el-input>
                        </el-form-item>
                        <el-form-item label="账户名称：" prop="userName" >
                            <el-input v-model="form.userName" style="width: 300px" placeholder="请输入账户名称" v-bind:readonly="isReadOnly"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号：" prop="idNo" >
                            <el-input v-model="form.idNo" style="width: 300px" placeholder="请输入身份证号" v-bind:readonly="isReadOnly"></el-input>
                        </el-form-item>
                        <el-form-item label="角色类型：" prop="roleId" >
                            <el-select v-model="form.roleId" placeholder="请选择角色" style="width: 300px" @change="show()">
                                <el-option
                                        v-for="item in roleNewList"
                                        :key="item.id"
                                        :label="item.roleName"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号：" prop="phone" >
                            <el-input v-model="form.phone" style="width: 300px" placeholder="请输入手机号" v-bind:readonly="isReadOnly"></el-input>
                        </el-form-item>
                        <el-form-item label="所属区域：" prop="regionCode" >
                            <el-cascader filterable placeholder="选择城市" v-model="form.regionCode" :options="regionTree"
                                         :props="{ expandTrigger: 'hover', checkStrictly: true }" :show-all-levels="false"
                                         @change="handleRegionTreeChange" style="width: 300px"></el-cascader>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" style="text-align: center;">
                        <el-button type="primary" @click="insertRole('form')" v-if="addOrUp=='1'">确定添加</el-button>
                        <el-button type="primary" @click="upRole('form')"  v-if="addOrUp=='2'">确定修改</el-button>
                        <el-button @click="closeDia">取 消</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>

    </div>
</template>

<script>
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: "RoleList",
        components: {
            BreadcrumbComponent
        },
        data(){
            var checkPhone = (rule, value, callback) => {
                if (value==""||value==null){
                    callback();
                }else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    // console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            var checkIdNo = (rule, value, callback) => {
                if (value==""||value==null){
                    callback();
                }else {
                    const reg = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
                    // console.log(reg.test(value));
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的身份证号'));
                    }
                }
            };
            return{
                routePath: this.$route.path,
                total:0,
                totalPage:0,
                cur_page: 1,
                pageSizes: this.AppConfig.appInfo.pageSizes,
                pageSize: this.AppConfig.appInfo.pageSize,
                tableData:[],
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                defaultCheckedKeys:[],
                roleName:'',
                form:{
                    'id':'',
                    'name':'',
                    'userName': '',
                    'idNo':'',
                    'phone':'',
                    'roleId':'',
                    'regionCode':''
                },
                rules: {
                    name:[
                        {required:true,message:'请输入用户名称',trigger:'blur'},
                    ],
                    idNo:[
                        {required:true,message:'请输入身份号',trigger:'blur'},
                        {validator: checkIdNo, trigger: 'blur'}
                    ],
                    phone:[
                        {required:true,message:'请输入手机号',trigger:'blur'},
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    roleId:[
                        {required:true,message:'请选择角色',trigger:'change'},
                    ],
                    regionCode:[
                        {required:true,message:'请选择所属区域',trigger:'change'},
                    ],
                },
                dialogRole:false,
                dialogTitle:'修改',
                addOrUp:0,
                checkStrictly:false,
                isReadOnly: false,
                roleList:[],
                roleNewList:[],
                userIds:'',
                sreach:'',
                roleId:'',
                onePinyin:'',
                regionTree:[],
                regionCode: this.AppConfig.appInfo.regionCode,
            }
        },
        mounted(){
            this.showUser();
            this.query();
        },
        methods:{
            show(){
               var _this =  this;
                _this.cur_page = 1;
                _this.showUser();
            },
            clickPinYin(str){
                var _this =  this;
                _this.onePinyin = str;
                _this.cur_page = 1;
                _this.showUser();
            },
            queryRoleInfo(id){
                var that = this;
                that.dialogRole = true;
                var url = '/api/permissions/sysUser/'+id;
                //var url = '/api2/sysUser/'+id;
                that.$axios.get(url,{})
                    .then(function (res) {
                        if(res.code == 0){
                            that.form={
                                'id':res.data.id,
                                'name':res.data.name,
                                'userName':res.data.userName,
                                'idNo':res.data.idNo,
                                'roleId': parseInt(res.data.roleId),
                                'phone':res.data.phone,
                                'regionCode': res.data.regionCode,
                            };
                        }else{

                        }
                    }).catch(function (err) {
                    that.$message.error("登录失败,连接服务器失败!")
                })
            },
            deleteRoleInfo(){
                var that = this;
                var url = '/api/permissions/sysUser/'+that.userIds;
                //var url = '/api2/sysUser/'+that.userIds;
                that.$axios.delete(url,{})
                    .then(function (res) {
                        if(res.code == 0){
                            if(res.data){
                                that.showUser();
                                that.clsChecked();
                                that.$message.success("删除成功!");
                            }else{
                                that.$message.error("删除失败!")
                            }
                        }else{
                            that.$message.error("删除失败!")
                        }
                    }).catch(function (err) {
                    that.$message.error("删除失败!")
                })
            },
            insertRole(form){
                const self = this;
                var url = '/api/permissions/sysUser';
                //var url = '/api2/sysUser';
                self.form.regionCode= self.regionCode;
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.$axios.post(
                            url, self.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                if(res.data){
                                    self.closeDia();
                                    self.cur_page = 1;
                                    self.showUser();
                                    self.$message.success("添加成功!");
                                }else{
                                    self.closeDia();
                                    self.$message.error("添加失败!")
                                }
                            } else {
                                self.closeDia();
                                self.$message.error("添加失败!")
                            }
                        }).catch(function (err) {
                            self.$message.info(err.data.msg)
                        });
                    } else {
                        self.$message.error('提交失败！');
                    }
                });
            },
            upRole(form){
                const self = this;
                var url = '/api/permissions/sysUser';
                //var url = '/api2/sysUser';
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.$axios.put(
                            url , self.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                if(res.data){
                                    self.$message.success('修改成功！');
                                    self.closeDia();
                                    self.cur_page = 1;
                                    self.showUser();
                                }else{
                                    self.$message.success('修改失败！');
                                    self.closeDia();
                                }

                            } else {
                                self.closeDia();
                                self.$message.success('修改失败！');
                            }
                        }).catch(function (err) {
                            self.$message.success(err.msg);
                        });
                    } else {
                        self.$message.error('修改失败！');
                    }
                });
            },
            addOrUpRole(type,id){
                var _this = this;
                _this.addOrUp = type;
                _this.init();
                if(type==1){
                    _this.dialogTitle = '新增'
                    _this.dialogRole = true;
                }else if(type==2){
                    _this.dialogTitle = '修改'
                    _this.queryRoleInfo(id);
                }
            },
            closeDia(){
                this.dialogRole = false;
                this.$refs['form'].resetFields();
                this.form ={
                    'id':'',
                    'name':'',
                    'userName': '',
                    'idNo':'',
                    'phone':'',
                    'roleId':'',
                    'regionCode':''
                };
                this.showUser();
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pageSize=val;
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.cur_page=1;
                this.query();
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.showUser();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },
            showUser(){
                var that = this;
                var url = '/api/permissions/sysUser/page';
                //var url = '/api2/sysUser/page';
                var params = new URLSearchParams();
                params.append('page', that.cur_page);
                params.append('limit', that.pageSize);
                params.append('name', that.sreach);
                params.append('roleId', that.roleId);
                params.append('onePinyin', that.onePinyin);
                that.$axios.get(url,{params})
                    .then(function (res) {
                        if(res.code == 0){
                            that.tableData = [];
                            for(var i =0;i<res.data.records.length;i++){
                                var da = res.data.records[i];
                                var obj = {
                                    index: that.getIndex(i),
                                    id: da.id,
                                    roleName:da.roleName,
                                    name:da.name,
                                    userName:da.userName,
                                    idNo:da.idNo,
                                    phone:da.phone,
                                    regionName:da.regionName,
                                }
                                that.tableData.push(obj);
                            }
                            that.totalPage = res.data.pages;
                            that.total = res.data.total;
                        }
                    }).catch(function (err) {
                    // console.log(err);
                    that.$message.error("查询失败!")
                })
            },
            query() {
                var that = this;
                var url = '/api/permissions/sysRole/page';
                //var url = '/api2/sysRole/page';
                var params = new URLSearchParams();
                params.append('page', 1);
                params.append('limit', 10000);
                params.append('roleType', '');
                that.$axios.get(url,{params})
                    .then(function (res) {
                        if(res.code == 0){
                            that.roleList = [{id:'',roleName:'全部'}];
                            that.roleNewList = [];
                            for(var i =0;i<res.data.records.length;i++){
                                var da = res.data.records[i];
                                   var obj = {
                                       index: that.getIndex(i),
                                       id: da.id,
                                       roleName:da.roleName,
                                   }
                                that.roleList.push(obj);
                                that.roleNewList.push(obj);
                            }
                        }
                    }).catch(function (err) {
                    // console.log(err);
                    that.$message.error("查询失败!")
                })
            },
            checkboxAll(){
                var loves = document.getElementsByName("checkboxValue");
                var box = document.getElementById("boxid");
                if(box.checked == false){
                    for (var i = 0; i < loves.length; i++) {
                        loves[i].checked = false;
                    }
                }else{
                    for (var i = 0; i < loves.length; i++) {
                        loves[i].checked = true;
                    }
                }
            },
            clsChecked(){
                var loves = document.getElementsByName("checkboxValue");
                for (var j = 0; j < loves.length; j++) {
                    loves[j].checked = false;
                }
            },
            queryAll(){
                var _this = this;
                var obj = document.getElementsByName("checkboxValue");
                _this.userIds = "";
                for (var k in obj) {
                    if (obj[k].checked)
                       if(_this.userIds == ""){
                           _this.userIds = obj[k].value;
                       }else{
                           _this.userIds = _this.userIds+","+obj[k].value;
                       }
                }
                // console.log(_this.userIds)
            },
            // 遍历找出所有子节点
            findAllChildren(data, arr) {
                // console.log(data)
                data.forEach((item, index) => {
                    if(item.children!=null && item.children.length !== 0) {
                        this.findAllChildren(item.children, arr);
                    }else if(item.id == arr){
                        this.defaultCheckedKeys.push(item.id);
                    }
                })
            },
            handleRegionTreeChange(value){
                this.form.regionCode = value.length > 1 ? value[value.length-1] : value[0]
                this.$emit('handleRegionChange',this.form.regionCode);
            },
            init(){
                let self = this;

                let params = new URLSearchParams();
                params.append('regionId', self.AppConfig.appInfo.regionCode);
                self.$axios.post(
                    '/api/regulatory/regionInfo/getRegionTree',
                    params
                ).then(function (res) {
                    if (res.code == 0){
                        self.regionTree = res.data;
                    }
                }).catch(function (err) {
                    // console.log(err);
                })
            },
        }
    }
</script>

<style scoped>
    .inlineDiv{
        display:inline;
    }
    .table-default {
        width: 100%;
        border: 1px solid #EAECEF;
    }
    .table-default td, .table-default th {
        line-height: 22px;
        font-size: 16px;
    }
    .table-default td:first-child, .table-default th:first-child {
        padding-left: 30px;
    }
    .table-default tr:nth-child(even) td {
        background-color: #FCFDFF;
    }
    .table-default tr:hover td {
        background-color: rgba(15, 162, 245, 0.1);
    }
    .table-default th {
        padding: 10px 12px 11px;
        background-color: #F0F2F5;
    }
    .table-default td {
        padding: 11px 12px;
        transition: .3s background;
        border-bottom: 1px solid #EAECEF;
        white-space: nowrap;
    }
     .total-num span {
        font-size: 30px;
        margin-right: 10px;
    }
    .letter{
        font-size: 18px;
        font-weight: 500
    }
</style>
