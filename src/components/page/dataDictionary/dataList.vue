<template>
    <div class="title" style="width: 100%;margin: auto">
        <BreadcrumbComponent :routePath="routePath"/>
        <el-container style="border: 1px solid #eee;">
            <el-aside>
                <div style="height: 20px"></div>
                <div style="margin-bottom: 10px">
                    <el-input placeholder="请输入内容" v-model="typeName" class="input-with-select">
                        <el-button slot="append" @click="loadingTypeDate" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <el-button type="primary" @click="openProjectAdd">新建项目</el-button>
                <el-button @click="typEdit">修改</el-button>
                <el-button @click="typeDelete">删除</el-button>
                <div style="height: 10px"></div>
                <div style="height: 650px;overflow-x: hidden;" @scroll="scroll">
                    <div v-for="todo in tableTypeData" class="dhl">
                    <span class="sj"
                          @click="loadingDate(todo.id,todo.typeName,todo.dataStatus)">{{todo.typeName}}</span>
                    </div>
                </div>
            </el-aside>
            <el-container>
                <el-main>
                    <div style="margin-bottom: 20px;">
                        <el-button type="primary" @click="mingxiadd = true">新建明细</el-button>
                        <!--<el-button @click="sysDictDetailsEdit">修改</el-button>
                        <el-button @click="sysDictDetailsDelete">删除</el-button>-->
                    </div>
                    <div class="container_table">
                        <el-table
                            :data="tableData.slice()"
                            height="400"
                            border
                        >
                            <el-table-column type="index" :index="getIndex" label="序号" align="center" width="80px">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="code"
                                label="明细编号"
                            >
                            </el-table-column>
                            <el-table-column
                                align="center"
                                label="数据状态">
                                <template slot-scope="scope">
                                    <a href="javascript:;">{{scope.row.dataStatus===0?'启用':'禁用'}}</a>
                                </template>

                            </el-table-column>
                            <el-table-column
                                align="center"
                                :show-overflow-tooltip="true"
                                prop="name"
                                label="明细名称">
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="200" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small" @click="sysDictDetailsEdit(scope.row.id)">修改</el-button>
                                    <el-button type="text" size="small" @click="sysDictDetailsDelete(scope.row.id,scope.row.name)">删除</el-button>
                                </template>
                            </el-table-column>

                        </el-table>

                        <el-pagination class="fy"
                                       layout="prev, pager, next,sizes,jumper"
                                       @current-change="current_change"
                                       @size-change="handleSizeChange"
                                       :page-sizes="pageSizes"
                                       :total="total"
                                       :page-size="pagesize"
                                       background>
                        </el-pagination>
                    </div>

                    <el-dialog title="新建项目" :visible.sync="dialogadd" class="dlogBox" :modal-append-to-body='false'
                               :destroy-on-close='true' width="400px">
                        <el-form label-width="80px" :model="form" ref="addProjectForm" :rules="addProjectRules">
                            <el-form-item label="项目名称" prop="typeName">
                                <el-input v-model="form.typeName" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="数据状态" prop="dataStatus">
                                <el-select v-model="form.dataStatus" placeholder="请选择数据状态" class="fl">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogadd = false">取 消</el-button>
                            <el-button type="primary" @click="sysDictTypeAdd">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="新建明细" :visible.sync="mingxiadd" class="dlogBox" :modal-append-to-body='false'
                               :destroy-on-close='true' width="400px">
                        <el-form label-width="80px" :model="sysDictDetailsForm" ref="addDetailForm" :rules="addDetailsRules">
                            <el-form-item label="明细编号" prop="code">
                                <el-input v-model="sysDictDetailsForm.code"></el-input>
                            </el-form-item>
                            <el-form-item label="明细名称" prop="name">
                                <el-input v-model="sysDictDetailsForm.name"></el-input>
                            </el-form-item>
<!--                            <el-form-item label="排序编号" prop="sort">
                                <el-input v-model="sysDictDetailsForm.sort"></el-input>
                            </el-form-item>-->
                            <el-form-item label="数据状态" prop="dataStatus">
                                <el-select v-model="sysDictDetailsForm.dataStatus" placeholder="请选择数据状态" clearable
                                           class="fl">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="clamingxiadd">取 消</el-button>
                            <el-button type="primary" @click="sysDictDetailsAdd">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="修改字典类型" :visible.sync="typeEdit" class="dlogBox" :modal-append-to-body='false'
                               :destroy-on-close='true' width="400px">
                        <el-form label-width="80px" :model="editForm">
                            <el-form-item label="项目名称" prop="desc">
                                <el-input v-model="editForm.typeName" style="width: 190px"></el-input>
                            </el-form-item>
                            <el-form-item label="数据状态" prop="desc">
                                <el-select v-model="editForm.dataStatus" placeholder="请选择数据状态" class="fl">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="typeEdit = false">取 消</el-button>
                            <el-button type="primary" @click="editType">确 定</el-button>
                        </div>
                    </el-dialog>

                    <el-dialog title="修改明细" :visible.sync="mingxiEdit" class="dlogBox" :modal-append-to-body='false'
                               :destroy-on-close='true' width="400px">
                        <el-form label-width="80px" :model="editSysDictDetailsForm" :rules="addDetailsRules">
                            <el-form-item label="明细编号" prop="code">
                                <el-input v-model="editSysDictDetailsForm.code"></el-input>
                            </el-form-item>
                            <el-form-item label="明细名称" prop="name">
                                <el-input v-model="editSysDictDetailsForm.name"></el-input>
                            </el-form-item>
<!--                            <el-form-item label="排序编号" prop="sort">
                                <el-input v-model="editSysDictDetailsForm.sort"></el-input>
                            </el-form-item>-->
                            <el-form-item label="数据状态" prop="dataStatus">
                                <el-select v-model="editSysDictDetailsForm.dataStatus" placeholder="请选择数据状态" class="fl">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="clamingxiEdit">取 消</el-button>
                            <el-button type="primary" @click="editSys">确 定</el-button>
                        </div>
                    </el-dialog>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    // import Navigating from "../common/navigating/navigating";
    import axios from "axios"

    let typeIdVariable = "";
    let typeNameVariable = "";
    let dataStatusVariable = "";
    export default {
        name: "dataList",
        components: { BreadcrumbComponent },
        data() {
            return {
                routePath: this.$route.path,
                total: 1000,//默认数据总数
                pagesize: 10,//每页的数据条数
                currentPage: 1,//默认开始页面
                istag: true,
                dialogadd: false,
                typeEdit: false,
                mingxiadd: false,
                mingxiEdit: false,
                pageSizes: [10, 20, 50, 100],
                tableTypeData: [],
                multipleSelection: [],
                typeName: '',
                form: {
                    typeName: '',
                    dataStatus: 0
                },
                editForm: {
                    typeName: '',
                    dataStatus: 0,
                    typeId: ''
                },
                sysDictDetailsForm: {
                    code: '',
                    name: '',
                    dataStatus: 0,
                    typeId: '',
                    sort: ''
                },
                editSysDictDetailsForm: {
                    code: '',
                    name: '',
                    dataStatus: 0,
                    id: '',
                    sort: ''
                },
                options: [{
                    value: 0,
                    label: '启用'
                }, {
                    value: 1,
                    label: '禁用'
                }],
                tableData: [],
                addProjectRules: {
                    typeName: [
                        {required: true, message: '请输入项目名称', trigger: 'blur'},
                    ],
                    dataStatus: [
                        {required: true, message: '请选择数据状态', trigger: 'change'},
                    ]
                },
                addDetailsRules: {
                    code: [
                        {required: true, message: '请输入明细编号', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入明细名称', trigger: 'blur'},
                    ],
                    sort: [
                        {required: true, message: '请输入明细排序', trigger: 'blur'},
                    ],
                    dataStatus: [
                        {required: true, message: '请选择数据状态', trigger: 'change'},
                    ]
                }
            };
        },
        methods: {
            clamingxiadd() {
                var _this = this;
                _this.mingxiadd = false;
                _this.sysDictDetailsForm = {
                    code: '',
                    name: '',
                    dataStatus: 0,
                    typeId: '',
                    sort: ''
                };
            },
            clamingxiEdit() {
                var _this = this;
                _this.mingxiEdit = false;
                _this.editSysDictDetailsForm = {
                    code: '',
                    name: '',
                    dataStatus: 0,
                    id: '',
                    sort: ''
                };
            },
            scroll(event) {
                this.pos = event.target.scrollTop
                console.log('scroll', event.target.scrollTop)

            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 0) {
                    return 'th';
                }
                return '';
            },
            switchChange() {
                this.istag = !this.istag;

            },
            getIndex(index) {
                let curPage = this.currentPage;
                let limitPage = this.pagesize;
                return (index + 1) + (curPage - 1) * limitPage;
            },
            current_change: function (currentPage) {
                this.currentPage = currentPage;
                this.loadingDate(typeIdVariable, typeNameVariable, dataStatusVariable);
            },
            sysDictDetailsDelete(id, name) {
                //修改条件满足，开始给输入框赋值
                this.editSysDictDetailsForm.name = name;
                this.editSysDictDetailsForm.id = id;
                var id = this.editSysDictDetailsForm.id;
                var name = this.editSysDictDetailsForm.name
                this.sysDelete(id, name);
            },
            sysDelete(id, name) {
                this.$confirm('是否删除该明细', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete(`/api/permissions/sysDictDetails/` + id)
                        .then((response) => {
                            if (response.code == 0) {
                                this.loadingDate(typeIdVariable, typeNameVariable, dataStatusVariable);
                                this.$message({
                                    title: '成功',
                                    message: '删除成功',
                                    type: 'success'
                                });
                            }

                        }).catch((error) => {
                        console.log(error);
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            loadingTypeDate() {
                axios.get('/api/permissions/sysDicType/info', {
                    params: {
                        "typeName": this.typeName
                    }
                }).then((response) => {
                    // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                    this.tableTypeData = response.data
                    // this.loadingDate(this.tableTypeData[0].id, this.tableTypeData[0].typeName, this.tableTypeData[0].dataStatus)
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                })
            },
            loadingDate(typeId, typeName, dataStatus) {
                //把值赋给变量，便于修改操作
                typeIdVariable = typeId;
                typeNameVariable = typeName;
                dataStatusVariable = dataStatus;
                var url = '/api/permissions/sysDictDetails/page'
                axios.get(url, {
                    params: {
                        "page": this.currentPage,
                        "limit": this.pagesize,
                        "typeId": typeId
                    }
                }).then((response) => {
                    // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                    this.tableData = response.data.records;
                    this.total = response.data.total;
                }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.pagesize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
                this.loadingDate(typeIdVariable, typeNameVariable, dataStatusVariable);
            },
            sysDictTypeAdd() {
                this.$refs['addProjectForm'].validate((valid) => {
                    if (valid) {
                        axios.post(`/api/permissions/sysDicType`,
                            {
                                "typeName": this.form.typeName,
                                "dataStatus": this.form.dataStatus
                            })
                            .then((response) => {
                                console.log(response)
                                if (response.code === 0) {
                                    this.dialogadd = false;
                                    this.form.typeName = "";
                                    this.form.dataStatus = 0;
                                    this.loadingTypeDate();
                                    this.$message({
                                        title: '成功',
                                        message: '新增成功',
                                        type: 'success'
                                    });

                                    this.dialogadd = false;
                                } else {
                                    this.$message.error(response.msg);
                                }

                            }).catch((error) => {
                            console.log(error);
                            });
                    } else {
                        this.$message.error('新建失败！');
                    }
                });
            },
            typEdit() {
                if (typeIdVariable == null) {
                    this.$notify({
                        title: '提示',
                        message: '请选择一条要修改的数据',
                        type: 'warning'
                    });
                }
                if (typeIdVariable == "") {
                    this.$notify({
                        title: '提示',
                        message: '请选择一条要修改的数据',
                        type: 'warning'
                    });
                }
                if (typeIdVariable != null && typeIdVariable != "") {
                    axios.get('/api/permissions/sysDicType/' + typeIdVariable)
                        .then((response) => {
                            // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                            this.editForm.typeId = response.data.id;
                            this.editForm.typeName = response.data.typeName;
                            this.editForm.dataStatus = response.data.dataStatus;
                            this.typeEdit = true;
                        }).catch((error) => {
                        // catch 指请求出错的处理
                        console.log(error);
                    });

                }
            },
            editType() {
                axios.put(`/api/permissions/sysDicType`,
                    {
                        "typeName": this.editForm.typeName,
                        "dataStatus": this.editForm.dataStatus,
                        "id": this.editForm.typeId

                    })
                    .then((response) => {
                        console.log(response)
                        if (response.code == 0) {
                            this.typeEdit = false;
                            this.loadingTypeDate()
                            this.$notify({
                                title: '成功',
                                message: '提交成功',
                                type: 'success'
                            });
                        }

                    }).catch((error) => {
                    console.log(error);
                });
            },
            //删除操作
            typeDelete() {
                if (typeIdVariable != null && typeIdVariable != "") {
                    this.$confirm('是否删除' + typeNameVariable, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        axios.delete(`/api/permissions/sysDicType/` + typeIdVariable)
                            .then((response) => {
                                console.log(response)
                                if (response.code == 0) {
                                    this.loadingTypeDate()
                                    this.$message({
                                        title: '成功',
                                        message: '删除成功',
                                        type: 'success'
                                    });
                                }

                            }).catch((error) => {
                            console.log(error);
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                } else {
                    this.$message({
                        title: '提示',
                        message: '请选择一条要删除的数据',
                        type: 'warning'
                    });
                }
            },
            openProjectAdd() {
                this.dialogadd = true
                this.form.typeName = ""
                this.form.dataStatus = 0
            },
            sysDictDetailsAdd() {
                this.$refs['addDetailForm'].validate((valid) => {
                    if (valid) {
                        this.sysDictDetailsForm.typeId = typeIdVariable;
                        var url = `/api/permissions/sysDictDetails`;
                        axios.post(url,
                            {
                                "name": this.sysDictDetailsForm.name,
                                "code": this.sysDictDetailsForm.code,
                                "dataStatus": this.sysDictDetailsForm.dataStatus,
                                "typeId": this.sysDictDetailsForm.typeId,
                                // "sort": this.sysDictDetailsForm.sort
                            })
                            .then((response) => {
                                console.log(response)
                                if (response.code == 0) {
                                    this.loadingDate(typeIdVariable, typeNameVariable, dataStatusVariable);
                                    this.$message({
                                        title: '成功',
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.clamingxiadd();
                                } else {
                                    this.$message({
                                        title: '失败',
                                        message: response.msg,
                                        type: 'error'
                                    });
                                }

                            }).catch((error) => {
                            console.log(error);
                        });
                    }
                });
            },
            changeFun(val) {
                this.multipleSelection = val
            },
            sysDictDetailsEdit(id) {
                //修改条件满足，开始给输入框赋值
                axios.get('/api/permissions/sysDictDetails/' + id)
                    .then((response) => {
                        // then 指成功之后的回调 (注意：使用箭头函数，可以不考虑this指向)
                        this.editSysDictDetailsForm.code = response.data.code;
                        this.editSysDictDetailsForm.dataStatus = response.data.dataStatus;
                        this.editSysDictDetailsForm.name = response.data.name;
                        this.editSysDictDetailsForm.id = response.data.id;
                        // this.editSysDictDetailsForm.sort = response.data.sort;
                        this.mingxiEdit = true
                    }).catch((error) => {
                    // catch 指请求出错的处理
                    console.log(error);
                });
            },
            editSys() {
                var url = `/api/permissions/sysDictDetails`;
                axios.put(url,
                    {
                        "code": this.editSysDictDetailsForm.code,
                        "dataStatus": this.editSysDictDetailsForm.dataStatus,
                        "name": this.editSysDictDetailsForm.name,
                        "id": this.editSysDictDetailsForm.id,
                        // "sort": this.editSysDictDetailsForm.sort
                    })
                    .then((response) => {
                        console.log(response)
                        if (response.code == 0) {
                            this.loadingDate(typeIdVariable, typeNameVariable, dataStatusVariable);
                            this.$message({
                                title: '成功',
                                message: '提交成功',
                                type: 'success'
                            });
                            this.clamingxiEdit();
                        }

                    }).catch((error) => {
                    console.log(error);
                });
            },
        },
        created: function () {
            this.loadingTypeDate();
            this.total = this.tableData.length;
        },
    }
</script>

<style scoped>
    .dhl {
        background-color: #fff;
        font-size: 18px;
        padding: 10px 10px 10px 20px;;
        border-bottom: 1px #dfe4ed solid
    }

    .sj:hover {
        color: #3b99fc;
        font-weight: bold;
        cursor: pointer;
    }
</style>
