<template>
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">搜索：</div>
                            <div class="filter-con">
                                <div class="el-input w300"><!---->
                                    <el-input
                                            placeholder="请输入关键字"
                                            v-model="dhName"  @change="show()">
                                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                    </el-input>
                                    <!----><!----><!----><!----></div>
                            </div>
                        </li>
                        <li  class="filter-item">
                            <div class="filter-btn">
                               <!-- <button type="button" class="button-type" @click="show">
                                    <span>查询</span></button>-->
                                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                                    <span>查询</span></el-button>
                                <!--<button type="button" class="button-type" @click="fuadd">
                                    <span>新增</span></button>-->
                                <el-button type="button" size="medium"  @click="fuadd" class="el-button el-button--primary">
                                    <span>新增</span></el-button>
                            </div>
                        </li>
                    </ul>

                </div>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%;margin-bottom: 20px;"
                    row-key="id"
                    border
                    default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <el-table-column
                        align="center"
                        prop="name"
                        label="导航名称">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        label="类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type== 0">菜单</span>
                        <span v-if="scope.row.type== 1">按钮</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="icon"
                        label="图标">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="url"
                        label="资源路径">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="path"
                        label="请求链接">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="path"
                        label="前端url">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="remarks"
                        label="描述">
                </el-table-column>
                <el-table-column label="操作" align="center" width="300px" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="hnadd(scope.row.id)">增加</el-button>
                        <el-button @click="hnEdit(scope.row)">修改</el-button>
                        <el-button @click="menuDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
            <el-pagination class="fy"
                           layout="prev, pager, next,sizes,jumper"
                           @current-change="current_change"
                           :page-sizes="[10, 20, 50, 100]"
                           @size-change="handleSizeChange"
                           :total="total"
                           :page-size="pagesize"
                           background>
            </el-pagination>
        </div>

        <div style="transform:translateY(10px);width: 100%;" >
            <div style="width: 100%;height: 600px" class="inlineDiv">
                <!--列表-->

            </div>
        </div>
        <el-dialog title="新建Menu" :visible.sync="dialogadd" class="dlogBox" :before-close="handleClose" :modal-append-to-body='false' width="400px">
            <el-form label-width="80px" :model="form">
                <el-form-item label="图标">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="导航名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="请求方式">
                    <el-input v-model="form.method"></el-input>
                </el-form-item>
                <el-form-item label="资源路径">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="前端地址">
                    <el-input v-model="form.path"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                <el-input v-model="form.sort"></el-input>
            </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="form.type" placeholder="请选择menu类型" clearable class="fl">
                        <el-option
                                v-for="item in typeXl"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="menuAdd">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改Menu" :visible.sync="dialogedit" class="dlogBox"  :before-close="handleClose"  :modal-append-to-body='false' width="400px">
            <el-form label-width="80px" :model="editform">
                <el-form-item label="图标">
                    <el-input v-model="editform.icon"></el-input>
                </el-form-item>
                <el-form-item label="导航名称">
                    <el-input v-model="editform.name"></el-input>
                </el-form-item>
                <el-form-item label="请求方式">
                    <el-input v-model="editform.method"></el-input>
                </el-form-item>
                <el-form-item label="资源路径" prop="desc">
                    <el-input v-model="editform.url"></el-input>
                </el-form-item>
                <el-form-item label="前端地址">
                    <el-input v-model="editform.path"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="editform.sort"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="editform.remarks"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="editform.type" placeholder="请选择menu类型" class="fl">
                        <el-option
                                v-for="item in typeXl"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="editmenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    import axios from "axios"
    let fuId;
    export default {
        components: {
            BreadcrumbComponent
        },
        data() {
            return {
                routePath: this.$route.path,
                total: 0,//默认数据总数
                pagesize: 10,//每页的数据条数
                currentPage: 1,//默认开始页面
                dialogadd:false,
                dialogedit:false,
                tableData: [],
                dhName:'',
                form :{
                    icon:"",
                    method:"",
                    url:"",
                    path:"",
                    remarks:"",
                    name:"",
                    type:"",
                    sort:"",
                },
                editform :{
                    icon:"",
                    method:"",
                    url:"",
                    path:"",
                    remarks:"",
                    name:"",
                    type:"",
                    sort:"",
                    id:""

                },
                typeXl: [{
                    value: "1",
                    label: '按钮'
                }, {
                    value: "0",
                    label: '菜单'
                }],

            }
        },
        methods: {
            show(){
                var _this = this;
                _this.currentPage = 1;
                _this.loadingData();
            },
            handleClose(){
                this.form = {
                    icon:"",
                        method:"",
                        url:"",
                        path:"",
                        remarks:"",
                        name:"",
                        type:"",
                    sort:"",
                };
                this.editform ={
                    icon:"",
                        method:"",
                        url:"",
                        path:"",
                        remarks:"",
                        name:"",
                        type:"",
                    sort:"",
                        id:""
                };
                this.dialogadd = false;
                this.dialogedit =false;
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.loadingData();
            },
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pagesize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
                this.loadingData();
            },
            loadingData(){
                axios.get('/api/permissions/sysMenu/page', {
                    params: {
                        "page": this.currentPage,
                        "limit": this.pagesize,
                        "name": this.dhName
                    }
                }).then((response) => {
                    // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            menuAdd(parentId) {
                parentId = fuId;
                axios.post(`/api/permissions/sysMenu`,
                    {
                        "icon":this.form.icon,
                        "method":this.form.method,
                        "url":this.form.url,
                        "path":this.form.path,
                        "remarks":this.form.remarks,
                        "name":this.form.name,
                        "type":this.form.type,
                        "sort":this.form.sort,
                        "parentId":parentId
                    })
                    .then((response) => {
                        // console.log(response)
                        if (response.code == 0) {
                            this.dialogadd = false;
                            this.form = {
                                icon:"",
                                    method:"",
                                    url:"",
                                    path:"",
                                    remarks:"",
                                    name:"",
                                    type:"",
                                    sort:"",
                            };
                            this.loadingData();
                            this.$message({
                                title: '成功',
                                message: '菜单列表添加成功',
                                type: 'success'
                            });
                        }

                    }).catch((error) => {
                    // console.log(error);
                });
            },
            fuadd(){
                this.dialogadd=true;
                fuId = -1;
            },
            hnadd(val){
                this.dialogadd=true;
                fuId=val;
            },
            hnEdit(val){
                axios.get('/api/permissions/sysMenu/'+val.id)
                    .then((response) => {
                        // console.log(response)
                        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                        this.editform.icon = response.data.icon;
                        this.editform.method=response.data.method;
                        this.editform.name = response.data.name;
                        this.editform.path = response.data.path;
                        this.editform.remarks = response.data.remarks;
                        this.editform.type = response.data.type+'';
                        this.editform.url = response.data.url;
                        this.editform.sort = response.data.sort,
                        this.editform.id = response.data.id;
                        this.dialogedit = true
                    }).catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
            },
            editmenu() {
                axios.put(`/api/permissions/sysMenu`,
                    {
                        "icon":this.editform.icon,
                        "method":this.editform.method,
                        "url":this.editform.url,
                        "path":this.editform.path,
                        "remarks":this.editform.remarks,
                        "name":this.editform.name,
                        "type":this.editform.type,
                        "sort":this.editform.sort,
                        "id":this.editform.id
                    })
                    .then((response) => {
                        // console.log(response)
                        if (response.code == 0) {
                            this.dialogedit = false;
                            this.loadingData();
                            this.$message({
                                title: '成功',
                                message: 'menu信息修改成功',
                                type: 'success'
                            });
                        }

                    }).catch((error) => {
                    // console.log(error);
                });
            },
            menuDelete(value) {
                this.$confirm('是否删除' + value.name , '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                }).then(() => {
                    axios.delete(`/api/permissions/sysMenu/` + value.id)
                        .then((response) => {
                            if (response.code == 0) {
                                this.loadingData();
                                this.$message({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }

                        }).catch((error) => {
                        // console.log(error);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
        },
        created() {
            this.loadingData();
        }
    }
</script>

<style scoped>

</style>
