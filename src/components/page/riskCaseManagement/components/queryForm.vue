<template>
    <div class="queryForm">
        <el-form :label-position="labelPosition" :inline="true" label-width="80px" :model="formInline">
            <el-form-item label="所在地:" v-if="userPermissions === 'operate' || userPermissions === 'admin' || userPermissions === 'city'">
                <RegionList @RegionChange="RegionChange"></RegionList>
            </el-form-item>
            <el-form-item label="企业类型:">
                <el-select v-model="formInline.entKind" clearable placeholder="请选择企业类型">
                    <el-option
                        v-for="item in enterpriseTypeList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="事件类型:">
                <el-select v-model="formInline.caseType" clearable placeholder="请选择事件类型">
                    <el-option
                        v-for="item in caseTypeList"
                        :key="item.id"
                        :label="item.detailsName"
                        :value="item.detailsCode"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件状态:">
                <el-select v-model="formInline.status" clearable placeholder="请选择案件状态">
                    <el-option
                        v-for="item in statusList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件来源:">
                <el-select v-model="formInline.source" clearable placeholder="请选择案件来源">
                    <el-option
                        v-for="item in sourceList"
                        :key="item.name"
                        :label="item.name"
                        :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="案件编号:">
                <el-input type="text" clearable v-model="formInline.caseCode" placeholder="请输入案件编号"></el-input>
            </el-form-item>
            <el-form-item label="上报时间:">
                <el-date-picker
                clearable
                v-model="formInline.date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input style="width:100%" clearable v-model="formInline.entName" placeholder="搜索企业名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="queryInfo">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="addCase">新增</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="新增案件"
            :modal-append-to-body="false"
            :visible.sync="dialogFormVisible"
            width="36%"
            @closed="closed"
            center>
            <AddDialog :isEdit='isEdit' :reset="reset" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></AddDialog>
        </el-dialog>
    </div>
</template>
<script>
    import RegionList from '././../../../common/unit/RegionList.vue'
    import AddDialog from './addDialog.vue'
    export default {
        name: 'queryForm',
        components: {
            RegionList,
            AddDialog
        },
        data() {
            return {
                formInline: {
                    "regionCode": '',
                    "entName":'',
                    "start": '',
                    "end": '',
                    "status": '',
                    "caseCode": '',
                    "caseType": '',
                    "source": '',
                    "entKind": '',
                    "createType": ''
                },
                labelPosition: 'left',
                dialogFormVisible: false,
                statusList: [
                    { name: '进行中', value: 1},
                    { name: '已删除', value: 2},
                    { name: '已超时', value: 3},
                    { name: '已完结', value: 4},
                ],
                sourceList: [
                    { name: '系统', value: 1},
                    { name: '手动新增', value: 2},
                    { name: '其他', value: 3},
                ],
                caseTypeList: [],
                enterpriseTypeList: [
                    { name: '运营企业', value: 0},
                    { name: '产废企业', value: 1},
                    { name: '经营企业', value: 2},
                    { name: '收集企业', value: 3},
                    { name: '运输企业', value: 4},
                ],
                userPermissions: sessionStorage.getItem('roleCode'),
                isEdit: false,
                reset: false
            }
        },
        created() {
            this.getCaseTypeList()
        },
        mounted() {},
        methods: {
            getCaseTypeList() {
                this.$axios.get("/api/permissions/detailsCascadeType/selectDetailsCascade?detailsCode=caseType")
                .then((res) => {
                    if (res.code == 0) {
                        this.caseTypeList = res.data
                    }
                })
                .catch((error) => {
                    this.$message.error("请稍等后重试!");
                });
            },
            cancelDialog(value) {
                this.dialogFormVisible = false
            },
            confirmDialog(value) {
                this.dialogFormVisible = false
                this.queryInfo()
            },
            queryInfo() {
                this.$emit('queryInfo', this.formInline)
            },
            addCase() {
                this.dialogFormVisible = true
            },
            RegionChange(value) {
                this.formInline.regionCode = value
            },
            closed() {
                this.reset = !this.reset
            }
        }
    }
</script>

<style>
    /* .el-form .el-form-item .el-form-item__content {
        line-height: 0px !important;
    } */
    .queryForm .el-date-editor {
        margin-top: 3px;
    }
</style>
