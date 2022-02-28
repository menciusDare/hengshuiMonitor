<template>
    <div class="main">
        <div class="main-top">
            <BreadcrumbComponent :routePath="routePath"/>
            <el-card class="box-card">
                <div>
                    <QueryForm @addCase="addCase" @queryInfo="queryInfo"></QueryForm>
                </div>
                <el-table :data="tableData" class="table-default" style="height:100%" v-loading="listLoading">
                    <el-table-column label="序号" type="index" width="100px" align="center" :index='(index)=>{return (index+1) + (this.pageIndex-1)*this.pageSize}'></el-table-column>
                    <el-table-column prop="caseCode" label="案件编号" align="center"></el-table-column>
                    <el-table-column prop="entName" label="企业名称" align="center"></el-table-column>
                    <el-table-column prop="entKind" label="企业类型" align="center"></el-table-column>
                    <el-table-column prop="regionName" label="辖区" align="center"></el-table-column>
                    <el-table-column prop="caseStatus" label="处理状态" align="center"></el-table-column>
                    <el-table-column prop="details" label="案件说明" align="center"></el-table-column>
                    <el-table-column prop="createDate" label="上报时间" align="center"></el-table-column>
                    <el-table-column prop="statusStr" label="案件状态" align="center"></el-table-column>
                    <el-table-column label="操作" align="center" width="220">
                        <template slot-scope="scope">
                            <el-button type="text" @click="checkCase(scope.row)" size="small">查看</el-button>
                            <el-button type="text" v-if="scope.row.button == '2'" @click="assignedCase(scope.row)" size="small">指派</el-button>
                            <el-button type="text" v-if="scope.row.button == '2'" @click="deleteCase(scope.row)" size="small">删除</el-button>
                            <el-button type="text" v-if="scope.row.backOff == '1'" @click="backCase(scope.row)" size="small">退回</el-button>
                            <el-button type="text" v-if="scope.row.button == '1'" @click="auditCase(scope.row)" size="small">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="el-pagination is-background mt-lg">
                    <span >
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :page-sizes="[5,10, 15, 20]"
                            :current-page="pageIndex"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="totalPageCount">
                        </el-pagination>
                    </span>
                    <span class="el-pagination__total">共 {{pages}} 页</span>
                </div>
            </el-card>
            <el-dialog title="案件指派"
                :modal-append-to-body="false"
                :visible.sync="dialogFormVisible"
                width="36%"
                center>
                <AssignedCase :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></AssignedCase>
            </el-dialog>
            <el-dialog title="案件详情"
                :modal-append-to-body="false"
                :visible.sync="dialogCheckVisible"
                width="50%"
                center>
                <CheckDialog :checkOrAudit="checkOrAudit" :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></CheckDialog>
            </el-dialog>
            <el-dialog title="案件退回"
                :modal-append-to-body="false"
                :visible.sync="dialogBackVisible"
                width="50%"
                center>
                <BackDialog :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></BackDialog>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import QueryForm from './components/queryForm.vue'
    import AssignedCase from './components/assignedDialog.vue'
    import CheckDialog from './components/checkDialog.vue'
    import BackDialog from './components/backDialog.vue'
    import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
    export default {
        name: 'caseAssigned',
        components: {
            QueryForm,
            AssignedCase,
            CheckDialog,
            BackDialog,
            BreadcrumbComponent
        },
        data() {
            return {
                routePath: this.$route.path,
                listLoading: false,
                tableData: [],
                totalPageCount: 0,
                dialogFormVisible: false,
                dialogCheckVisible: false,
                dialogBackVisible: false,
                currentData: {},
                checkOrAudit: 'check',
                userPermissions: sessionStorage.getItem('roleCode'),
                pageSize: 10,
                pageIndex: 1,
                pages: 0,
                sourceList: [
                    { name: '系统', value: 1},
                    { name: '手动新增', value: 2},
                    { name: '其他', value: 3},
                ],
                statusList: [
                    { name: '进行中', value: 1},
                    { name: '已删除', value: 2},
                    { name: '已超时', value: 3},
                    { name: '已完结', value: 4},
                ],
                queryParams: {}
            }
        },
        created() {
            this.getCaseList(this.queryParams)
        },
        methods: {
            getCaseList(params) {
                this.listLoading = true;
                if (params && params.date) {
                    params.start = params.date[0]
                    params.end = params.date[1]
                }
                this.$axios.get("/api/regulatory/case/selectCaseWarnings", {
                    params:{
                        "regionCode": params.regionCode ? params.regionCode : '',
                        "entName": params.entName ? params.entName : '',
                        "approveTime": params.approveTime ? params.approveTime : '',
                        "start":  params.start ? params.start : '',
                        "end":  params.end ? params.end : '',
                        "status": params.status ? params.status : '',
                        "caseCode": params.caseCode ? params.caseCode : '',
                        "caseType": params.caseType ? params.caseType : '',
                        "source": params.source ? params.source : '',
                        "entKind": params.entKind + '' ? params.entKind : '',
                        "createType": '',
                        "page": this.pageIndex,
                        "limit": this.pageSize,
                        "processCode": params.processCode ? params.processCode : ''
                    }
                })
                .then((res) => {
                    this.listLoading = false;
                    if (res.code == 0 && res.data.records.length > 0) {
                        this.tableData = res.data.records.map((item) => {
                            item.statusStr = this.statusList.filter((ele) => {return ele.value == item.status})[0].name
                            return item
                        })
                        this.totalPageCount = res.data.total
                        this.pages = res.data.pages
                        this.pageIndex = res.data.current
                    } else {
                        this.tableData = []
                        this.pages = 0
                        this.totalPageCount = 0
                    }
                })
                .catch((error) => {
                    this.listLoading = false;
                    this.$message.error("请稍等后重试!");
                });
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getCaseList(this.queryParams)
            },
            handleCurrentChange(val) {
                this.pageIndex = val
                this.getCaseList(this.queryParams)
            },
            queryInfo(value) {
                this.queryParams = JSON.parse(JSON.stringify(value))
                this.pageIndex = 1
                this.getCaseList(this.queryParams)
            },
            addCase() {
                this.getCaseList(this.queryParams)
            },
            checkCase(params) {
                this.checkOrAudit = 'check'
                this.currentData = JSON.parse(JSON.stringify(params))
                this.dialogCheckVisible = true
            },
            auditCase(params) {
                this.checkOrAudit = 'audit'
                this.currentData = JSON.parse(JSON.stringify(params))
                this.dialogCheckVisible = true
            },
            assignedCase(params) {
                this.dialogFormVisible = true
                this.currentData = JSON.parse(JSON.stringify(params))
            },
            deleteCase(params) {
                this.$confirm('确认删除该案件吗？', '提示', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$axios.put(`/api/regulatory/case/delete/${params.id}`)
                        .then((res) => {
                            if (res.code == 0) {
                                this.getCaseList(this.queryParams)
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '当前案件已经在流转中,不能删除!'
                                });
                            }
                        })
                        .catch((error) => {
                            this.$message.error("请稍等后重试!");
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            },
            backCase(params) {
                this.dialogBackVisible = true
                this.currentData = JSON.parse(JSON.stringify(params))
            },
            cancelDialog() {
                this.dialogFormVisible = false
                this.dialogCheckVisible = false
                this.dialogBackVisible = false
                this.getCaseList(this.queryParams)
            },
            confirmDialog() {
                this.dialogFormVisible = false
                this.dialogCheckVisible = false
                this.dialogBackVisible = false
                this.getCaseList(this.queryParams)
            }
        }
    }
</script>

<style>
    .main .el-table{
        margin-top: 1%;
    }
    .main-top {
        width: 100%;
    }
    .main .el-card{
        width: 100%;
        border: 0;
    }
    .main .el-table th{
        padding: 15px 5px;
        font-size: 16px;
        background-color: rgba(223, 234, 251, 0.3);
        color: #333;
    }
</style>
