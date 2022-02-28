<template>
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div style="">
            <!--<button type="button" class="button-type2" @click="addOrUpRole(1,'')">
                <span>添加角色</span></button>-->
            <el-button type="button" size="medium"  @click="addOrUpRole(1,'')" class="el-button el-button--primary">
                <span>添加角色</span></el-button>
            <!--<button type="button" class="button-type2" @click="deleteRoleInfo">
                <span>批量删除</span></button>-->
            <el-button type="button" size="medium"  @click="deleteRoleInfo" class="el-button el-button--primary">
                <span>批量删除</span></el-button>
        </div>
        <div style="transform:translateY(10px);width: 80%;" >
            <div style="width: 100%;height: 600px" class="inlineDiv">
                <!--列表-->
                <table class="table-default table-full">
                    <thead>
                    <tr>
                        <th style="text-align:center;width: 80px"><!--<input type="checkbox" @click="checkboxAll" id="boxid"></input>--></th>
                        <th style="text-align:center;width: 80px">序号</th>
                        <th style="text-align:center">角色名称</th>
                        <th style="text-align:center">账号数量</th>
                        <th style="text-align:center">状态</th>
                        <th style="text-align:center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,i) in tableData">
                        <td style="text-align:center;width: 80px"><input type="checkbox" class="checkboxValue" name="checkboxValue" :value="item.id+','+item.roleName" @click="queryAll(i)"></input></td>
                        <td style="text-align:center;width: 80px">{{item.index}}</td>
                        <td style="text-align:center">{{item.roleName}}</td>
                        <td style="text-align:center">{{item.total}}</td>
                        <td style="text-align:center">{{item.deleteFlag}}</td>
                        <td style="text-align:center" ><el-link type="primary" @click="addOrUpRole(2,item.id)">编辑</el-link> &nbsp;&nbsp;
                            <el-link type="primary" v-if="item.deleteFlag=='启用'" @click="upDeleteFlag(1,item.id)">禁用</el-link>
                            <el-link type="primary" v-if="item.deleteFlag=='禁用'" @click="upDeleteFlag(0,item.id)">启用</el-link>
                        </td>
                    </tr>
                    </tbody>
                </table>


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

            <div style="transform:translate(100.5%,-85.6%);height: 700px;" >
                <div style="width: 24%;padding: 10px 12px 11px;height: 56px;background-color:#F0F2F5;display: table-cell;vertical-align: middle;text-align: center"  class="inlineDiv">
                </div>
                <div style="width: 24%;">
                    <div style="width: 100%;transform:translate(20%,-45px);">&nbsp;&nbsp;&nbsp;<span style="font-size: 16px;font-weight: 500">{{roleName}}权限设置</span></div>
                    <el-tree
                            :data="data"
                            :show-checkbox="true"
                            node-key="id"
                            ref="tree"
                            :default-checked-keys="defaultCheckedKeys"
                            :default-expanded-keys="defaultCheckedKeys"
                            :props="defaultProps"
                            :check-strictly="checkStrictly"
                            style="transform:translate(0%,-6%);height: 600px;overflow-y:auto">
                    </el-tree>
                    <el-button style="width: 100%;"  type="primary" @click="insertCheckedNodes">保存权限设置</el-button>
                </div>
            </div>

        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogRole" @close="closeDia" :modal-append-to-body="false" :close-on-click-modal="false" width="590px">
            <div>
                <el-form ref="form" label-width="180px" :model="form" :rules="rules" >
                    <el-form-item label="角色名称：" prop="name" >
                        <el-input v-model="form.roleName" style="width: 300px" placeholder="请输入污染源名称" v-bind:readonly="isReadOnly"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述：" prop="remarks" >
                        <el-input v-model="form.remarks" style="width: 300px" placeholder="请输入污染源名称" v-bind:readonly="isReadOnly"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align: center;">
                    <el-button type="primary" @click="insertRole('form')" v-if="addOrUp=='1'">确定添加</el-button>
                    <el-button type="primary" @click="upRole('form')"  v-if="addOrUp=='2'">确定修改</el-button>
                    <el-button type="primary" @click="continueRole('form')" v-if="addOrUp=='1'">创建并继续添加</el-button>
                    <el-button @click="closeDia">取 消</el-button>
                </div>
            </div>
        </el-dialog>
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
                roleId:'',
                roleName:'',
                form:{
                    'id':'',
                    'roleName':'',
                    'roleType': 1,
                    'remarks':'',
                    'deleteFlag':0
                },
                rules: {
                    roleName:[
                        {required:true,message:'请输入角色名称',trigger:'blur'},
                    ],
                    remarks:[
                        {required:true,message:'请输入角色描述',trigger:'blur'},
                    ],
                },
                dialogRole:false,
                dialogTitle:'修改',
                addOrUp:0,
                checkStrictly:false,
                isReadOnly: false
            }
        },
        mounted(){
            this.query();
            this.queryTree();
        },
        methods:{
            queryRoleInfo(id){
                var that = this;
                that.dialogRole = true;
                var url = '/api/permissions/sysRole/'+id;
                //var url = '/api2/sysRole/'+id;
                that.$axios.get(url,{})
                    .then(function (res) {
                        if(res.code == 0){
                            that.form={
                                'id':res.data.id,
                                    'roleName':res.data.roleName,
                                    'roleType':res.data.roleType,
                                    'remarks':res.data.remarks,
                                'deleteFlag':res.data.deleteFlag
                            };
                        }
                    }).catch(function (err) {
                    that.$message.error("登录失败,连接服务器失败!")
                })
            },
            deleteRoleInfo(){
                var that = this;
                var url = '/api/permissions/sysRole/'+that.roleId;
                //var url = '/api2/sysRole/'+that.roleId;
                that.$axios.delete(url,{})
                    .then(function (res) {
                        if(res.code == 0){
                            that.query();
                            that.$message.success("删除成功!");
                        }else{
                            that.$message.error("删除失败!")
                        }
                    }).catch(function (err) {
                    that.$message.error("删除失败!")
                })
            },
            continueRole(form){
                const self = this;
                var url = '/api/permissions/sysRole';
                //var url = '/api2/sysRole';
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.$axios.post(
                            url, self.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                    self.form.id = '';
                                    self.form.roleName = '';
                                    self.form.roleType = '';
                                    self.form.remarks = '';
                                    self.form.deleteFlag = 0;
                            } else {
                                self.$message.error(res.msg);
                            }
                        }).catch(function (err) {
                            self.$message.info(err.data.msg)
                        });
                    } else {
                        self.$message.error('提交失败！');
                    }
                });
            },
            insertRole(form){
                const self = this;
                var url = '/api/permissions/sysRole';
                //var url = '/api2/sysRole';
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.$axios.post(
                            url, self.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                self.closeDia();
                                self.cur_page = 1;
                                self.query();
                            } else {
                                self.$message.error(res.msg);
                            }
                        }).catch(function (err) {
                            self.$message.info(err.data.msg)
                        });
                    } else {
                        self.$message.error('提交失败！');
                    }
                });
            },
            upDeleteFlag(falg,id){
                var _this = this;
                var url = '/api/permissions/sysRole/upDeleteFlag';
                //var url = '/api2/sysRole/upDeleteFlag';
                var params = new URLSearchParams();
                params.append('id', id);
                params.append('deleteFlag',falg);
                _this.$axios.post(url, params).then(function (res) {
                        if(res.code == 0){
                            _this.cur_page=1;
                            _this.query();
                        }
                    }).catch(function (err) {
                });
            },
            upRole(form){
                const self = this;
                var url = '/api/permissions/sysRole';
                //var url = '/api2/sysRole';
                self.$refs[form].validate((valid) => {
                    if (valid) {
                        self.$axios.put(
                            url , self.form
                        ).then(function (res) {
                            if (res.code == 0) {
                                self.$message.success('修改成功！');
                                self.closeDia();
                                self.cur_page = 1;
                                self.query();
                            } else {
                                self.$message.error(res.msg);
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
                if(type==1){
                    _this.dialogTitle = '新增'
                    _this.dialogRole = true;
                }else if(type==2){
                    _this.dialogTitle = '修改'
                    _this.queryRoleInfo(id);
                }
            },
            closeDia(){
                this.dialogRole = false
                this.form ={
                    'id':'',
                    'roleName':'',
                    'roleType':'',
                    'remarks':'',
                    'deleteFlag':0
                };
                this.query();
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
                this.query();
            },
            getIndex(index){
                let curPage = this.cur_page;
                let limitPage = this.pageSize;
                return (index+1) + (curPage - 1) * limitPage;
            },

            query() {
                var that = this;
                var url = '/api/permissions/sysRole/page';
                //var url = '/api2/sysRole/page';
                var params = new URLSearchParams();
                params.append('page', that.cur_page);
                params.append('limit', that.pageSize);
                params.append('roleType', '');
                that.$axios.get(url,{params})
                    .then(function (res) {
                        if(res.code == 0){
                            that.tableData = [];
                            for(var i =0;i<res.data.records.length;i++){
                                var da = res.data.records[i];
                                   var obj = {
                                       index: that.getIndex(i),
                                       id: da.id,
                                       total:da.total,
                                       roleName:da.roleName,
                                       total:da.total,
                                       deleteFlag:da.deleteFlag==0?'启用':'禁用'
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
            queryTree() {
                var that = this;
                var url = '/api/permissions/sysMenu/getTree/1';
                //var url = '/api2/sysMenu/getTree/1';
                that.$axios.get(url,{
                }).then(function (res) {
                    if(res.code == 0){
                        if(null != res.data){
                            that.data = res.data;
                        }
                    }
                }).catch(function (err) {
                    // console.log(err);
                    that.$message.error("查询失败!")
                })
            },
            queryRoleTree(id) {
                var that = this;
                var url = '/api/permissions/sysMenu/roleTree/'+id;
                //var url = '/api2/sysMenu/roleTree/'+id;
                that.$axios.get(url,{
                }).then(function (res) {
                    if(res.code == 0){
                        that.queryTree();
                        that.defaultCheckedKeys = [];
                        if(res.data!=null&&res.data.length>0){
                            for(var i = 0;i<res.data.length;i++){
                                that.findAllChildren(that.data, res.data[i])
                            }
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
            queryAll(ID){
                var loves = document.getElementsByName("checkboxValue");
                for (var j = 0; j < loves.length; j++) {
                    loves[j].checked = false;
                    if (j == ID) {
                        loves[j].checked = true;
                    }
                }
                var obj = document.getElementsByName("checkboxValue");
                var check_val = [];
                for (var k in obj) {
                    if (obj[k].checked)
                        check_val.push(obj[k].value);
                }
                var value = check_val[0].split(",");
                this.roleId=value[0]
                this.roleName=value[1]
                this.queryRoleTree(this.roleId)
            },
            insertCheckedNodes() {
                var that = this;
                let res = that.$refs.tree.getCheckedNodes().concat(that.$refs.tree.getHalfCheckedNodes());
                var list = [];
                for(var j = 0;j<res.length;j++){
                    list.push(res[j].id);
                }
                if(that.roleId!=null&&that.roleId!=''){
                    var params = new URLSearchParams();
                    params.append('roleId',that.roleId);
                    params.append( 'menuIds', list);
                    var url = '/api/permissions/sysRole/roleMenuUpd';
                    //var url = '/api2/sysRole/roleMenuUpd';
                    that.$axios.post(url,params).then(function (res) {
                        if(res.code == 0){
                            that.queryTree();
                            that.queryRoleTree(that.roleId)
                            that.$message.success("保存成功!")
                        }
                    }).catch(function (err) {
                        // console.log(err);
                        that.$message.error("保存失败!")
                    })
                }else{
                    that.$message.success("请选择角色!")
                }
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
            }
        }
    }
</script>

<style scoped>
    .inlineDiv{
        display:inline;
        float:left;
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
</style>