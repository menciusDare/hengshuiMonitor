<template>
    <!-- 主体 -->
    <div class="main">
        <BreadcrumbComponent :routePath="routePath"/>
        <div class="panel">
            <div class="panel-bd pdtlr-0">
                <!-- 收起后样式名.filter-more-mini -->
                <div class="filter-more">
                    <ul class="filter-box">
                        <li class="filter-item">
                            <div class="filter-label">所在地：</div>
                            <div class="filter-con">
                                <div class="el-select w160">
                                    <el-select v-model="regionCode" placeholder="请选择所在地" >
                                        <el-option
                                            v-for="item in regionOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        ></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">企业类型：</div>
                            <div class="filter-con">
                                <el-select
                                    v-model="entType"
                                    placeholder="请选择"
                                    style="width: 150px;"
                                >
                                    <el-option
                                        v-for="item in entTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">申请年份：</div>
                            <div class="filter-con">
                                <el-date-picker
                                    style="width: 150px;"
                                    :clearable="false"
                                    v-model="year"
                                    type="year"
                                    :picker-options="pickerOptions"
                                    value-format="yyyy"
                                    placeholder="选择年"
                                ></el-date-picker>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">申请状态：</div>
                            <div class="filter-con">
                                <el-select
                                    v-model="registerStatus"
                                    placeholder="请选择"
                                    style="width: 150px;"
                                >
                                    <el-option
                                        v-for="item in RegisOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    ></el-option>
                                </el-select>
                            </div>
                        </li>

                        <li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <el-input
                                        type="text"
                                        autocomplete="off"
                                        placeholder="企业名称"
                                        v-model.trim="entName"
                                        style="width: 150px;"
                                    ></el-input>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-label">产废类型：</div>
                            <div class="filter-con">
                                <div class="el-input">
                                    <!---->
                                    <el-select
                                        v-model="business1"
                                        placeholder="请选择"
                                    >
                                        <el-option
                                            v-for="item in businessList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                </div>
                            </div>
                        </li>
                        <li class="filter-item">
                            <div class="filter-btn">
                                <!--<button type="button" class="button-type" @click="getRegionCountData(1)">
                  &lt;!&ndash;&ndash;&gt;
                  &lt;!&ndash;&ndash;&gt;
                  <span>查询</span>
                </button>-->
                                <el-button
                                    type="button"
                                    size="medium"
                                    @click="getRegionCountData(1)"
                                    class="el-button el-button--primary"
                                >
                                    <span>查询</span></el-button
                                >
                              <el-button
                                  type="button"
                                  size="medium"
                                  :loading="openEntReportWriterLoading"
                                  @click="openEntReportWriter()"
                                  class="el-button el-button--primary"
                              >
                                <span>开启企业下一年度申报</span></el-button
                              >

                            </div>
                        </li>
                    </ul>
                </div>

                <div class="total-number">
                    <!-- <div class="total-name">
            全部企业
            <span class="num">{{count}}</span>家
          </div> -->
                    <div class="total-text" style="color:green">
                        已申报企业
                        <span class="num">{{ ok }}</span
                        >家
                    </div>
                    <div class="total-text is-offline">
                        未申报企业
                        <span class="num" style="color:red">{{ noOk }}</span
                        >家
                    </div>
                </div>

                <div class="overflowX">
                    <table class="table-default" v-loading="showLoading">
                        <thead>
                            <tr>
                                <th class="text_center">序号</th>
                                <th class="text_center">企业名称</th>
                                <th class="text_center">企业类型</th>
                                <th class="text_center">所在地</th>

                                <th class="text_center">所属行业</th>
                                <th class="text_center">联系人</th>
                                <th class="text_center">电话</th>
                                <th class="text_center">申报状态</th>
                                <th class="text_center">审核状态</th>
                                <th class="text_center">申报时间</th>
                                <th class="text_center">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in dataTable">
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 6%"
                                    :title="getIndex(i)"
                                >
                                    {{ getIndex(i) }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                                    :title="item.name"
                                >
                                    {{ item.name }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.typeNameStr"
                                >
                                    {{ item.typeNameStr }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;max-width:400px"
                                    :title="item.address"
                                >
                                    {{ item.address }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.caName"
                                >
                                    {{ item.caName }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.contacts"
                                >
                                    {{ item.contacts }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.contactsPhone"
                                >
                                    {{ item.contactsPhone }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.declareStatus"
                                >
                                    <div
                                        :class="
                                            item.declareStatus == '已申报'
                                                ? 'text-state'
                                                : 'text-state state-off'
                                        "
                                    >
                                        {{ item.declareStatus }}
                                    </div>
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.auditStatus"
                                >
                                    {{ returnStatus(item.auditStatus) }}
                                </td>
                                <td
                                    style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                                    :title="item.declareTime"
                                >
                                    {{ item.declareTime }}
                                </td>
                                <td style="text-align:center;width: 10%">
                                    <a
                                        v-if="item.declareStatus == '已申报'"
                                        href="javascript:;"
                                        class="text-primary text-underline"
                                        @click="
                                            infoFun(
                                                item.id,
                                                item.correlationId,
                                                item.name
                                            )
                                        "
                                        >查看</a
                                    >
                                    <a
                                        v-if="
                                            item.declareStatus == '已申报' &&
                                                item.auditStatus != 1
                                        "
                                        href="javascript:;"
                                        class="text-primary text-underline"
                                        @click="adudit(item)"
                                        >审核</a
                                    >

                                    <a
                                        v-if="item.declareStatus == '未申报'"
                                        href="javascript:;"
                                        class="text-primary"
                                        >暂无申报</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="el-pagination is-background mt-lg">
                    <span class="el-pagination__total"
                        >共 {{ total }} 条，每页显示</span
                    >
                    <span class="el-pagination__total">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="cur_page"
                            :page-sizes="pageSizes"
                            :page-size="pageSize"
                            layout="sizes, prev, pager, next"
                            :total="total"
                        ></el-pagination>
                    </span>

                    <span class="el-pagination__total"
                        >共 {{ totalPage }} 页</span
                    >
                </div>
            </div>
        </div>
        <div>
            <el-dialog
                title="审核"
                :visible.sync="auditDialogVisible"
                width="50%"
                :modal-append-to-body="false"
                :before-close="handleClose"
            >
                <p>
                    审核信息
                    <span style="width:10px" class="wx border"
                        >&nbsp;&nbsp;&nbsp; &nbsp;</span
                    >
                </p>

                <br />
                <el-form
                    ref="form"
                    :rules="rules"
                    :model="declareAudit"
                    label-width="150px"
                    class="auditDetails"
                    style="padding:10px;box-sizing:border-box"
                >
                    <el-timeline>
                        <div class="feedback_dialog">
                            <el-timeline-item
                                :timestamp="'审核时间：' + item.auditDate"
                                placement="top"
                                v-for="(item, index) in auditList"
                                :key="index"
                            >
                                <el-card>
                                    <el-row>
                                        <el-col :span="4">
                                            <h4>审核人：</h4>
                                        </el-col>
                                        <el-col :span="18">{{
                                            item.auditName
                                        }}</el-col>
                                    </el-row>
                                    <br />
                                    <el-row>
                                        <el-col :span="4">
                                            <h4>审核状态：</h4>
                                        </el-col>
                                        <el-col :span="18">{{
                                            item.status == 1 ? "通过" : "拒绝"
                                        }}</el-col>
                                    </el-row>
                                    <br />

                                    <el-row>
                                        <el-col :span="4">
                                            <h4>审核内容：</h4>
                                        </el-col>
                                        <el-col
                                            :span="18"
                                            style="letter-spacing:1px;line-height: 22px"
                                            >{{ item.opinion }}</el-col
                                        >
                                    </el-row>
                                </el-card>
                            </el-timeline-item>
                        </div>
                    </el-timeline>
                    <div v-if="auditStatus != 1">
                        <el-form-item prop="status" label="审核状态：">
                            <el-select
                                v-model="declareAudit.status"
                                placeholder="请选择"
                            >
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="opinion" label="请填写审核意见：">
                            <el-input
                                type="textarea"
                                :rows="6"
                                maxlength="200"
                                show-word-limit
                                v-model="declareAudit.opinion"
                                style="width: 500px"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="loginUser" label="审核人：">
                            <span>{{ loginUser }}</span>
                        </el-form-item>
                    </div>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="addAudit"
                        >确 定</el-button
                    >
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import aaa from "../../../../static/css/images/map/sanjiao.png";
import loadBMap from "../../../components/common/unit/loadBMapApi";
/*import mapFunction from '../../common/unit/mapFunction'*/
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
    name: "RegisterHomeList",
    components: {
        BreadcrumbComponent
    },
    data() {
        return {
            routePath: this.$route.path,
            showLoading: false,
            openEntReportWriterLoading:false,
            pickerOptions: {
                disabledDate(time) {
                    // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
                    // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
                    return time.getTime() > Date.now();
                },
            },
            auditStatus: -1,
            auditList: [],
            loginUser: window.sessionStorage.getItem("username"),
            declareAudit: {
                status: "",
                declareId: "",
                opinion: "",
                auditBy: window.sessionStorage.getItem("userId"),
            },
            auditDialogVisible: false,
            isDisabled: false,
            total: 0,
            totalPage: 0,
            cur_page: 1,
            pageSizes: this.AppConfig.appInfo.pageSizes,
            pageSize: this.AppConfig.appInfo.pageSize,
            regionCode: sessionStorage.getItem("regionCode"),
            /*370000*/
            business1: "",
            //产废企业
            businessList: [
                {
                    value: "",
                    label: "全部",
                },
                {
                    value: "1001",
                    label: "工业废物",
                },
                {
                    value: "1002",
                    label: "危险废物",
                },
                {
                    value: "1003",
                    label: "医疗废物",
                },
                {
                    value: "1004",
                    label: "机动车维修",
                },
            ],
            count: "",
            ok: "",
            noOk: "",
            entName: "",
            year: new Date().format("yyyy"),
            entType: "",
            registerStatus: "",
            dataTable: "",
            regionOptions: [],
            entTypeOptions: [
                {
                    value: "",
                    label: "全部企业",
                },
                {
                    value: "1",
                    label: "产废企业",
                },
                {
                    value: "2",
                    label: "经营企业",
                },
                {
                    value: 3,
                    label: "收集企业",
                },
                // {
                //   value: 4,
                //   label: "运输企业",
                // },
            ],
            YearOptions: [
                {
                    value: "",
                    label: "全部年份",
                },
                {
                    value: "2019",
                    label: "2019",
                },
                {
                    value: "2020",
                    label: "2020",
                },
            ],
            RegisOptions: [
                {
                    value: "",
                    label: "全部状态",
                },
                {
                    value: "1",
                    label: "已申报",
                },
                {
                    value: "2",
                    label: "未申报",
                },
            ],
            options: [
                {
                    label: "通过",
                    value: 1,
                },
                {
                    label: "拒绝",
                    value: -1,
                },
            ],
            search: {
                entType: "",
                regionLevel: sessionStorage.getItem("regionLevel"),
            },
            rules: {
                status: [
                    {
                        required: true,
                        message: "请选择审核状态",
                        trigger: "blur",
                    },
                ],
                opinion: [
                    {
                        required: true,
                        message: "请填写审核内容",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    created: function() {
        if (this.$route.path == '/IndustrialWasteManagement') {
            this.business1 = '1001'
        } else if (this.$route.path == '/HazardousWasteManagementPlan') {
            this.business1 = '1002'
        }
        if (this.search.regionLevel == 3) {
            this.isDisabled = true;
        }
        this.getRegionChildrenList();
    },
    activated() {        
        if(!this.$route.meta.isUseCache){     
            this.reset();
            if (this.$route.path == '/IndustrialWasteManagement') {
                this.business1 = '1001'
            } else if (this.$route.path == '/HazardousWasteManagementPlan') {
                this.business1 = '1002'
            }
            this.getRegionCountData(0);
        }
        this.$route.meta.isUseCache = false;
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == 'RegisterHome') {
            from.meta.isUseCache = true;    
        }        
        next();
    },
    methods: {
        reset() {
            this.dataTable = [];
            this.entType = '';
            this.year = '';
            this.registerStatus = '';
            this.entName = '';
            this.business1 = '';
            this.cur_page = 1;
            this.regionCode = sessionStorage.getItem('regionCode');
        },
      openEntReportWriter() {
        this.$confirm('开启企业下一年度申报将关闭当前年度申报, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var _this = this;
          _this.openEntReportWriterLoading = true;
          _this.$axios.get("/api/regulatory/ReportAndRegister/openEntReportWriter").then(function(res) {
            _this.openEntReportWriterLoading = false;
            if (res.code === 0) {
              _this.$message.success(res.data);
            }else {
              _this.$message.warning(res.msg)
            }
          }).catch((error) => {
            _this.openEntReportWriterLoading = false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
        returnStatus(item) {
            if (item === -1) {
                return "审核拒绝";
            } else if (item === 0) {
                return "未审核";
            } else if (item === 1) {
                return "审核通过";
            }
        },
        addAudit() {
            var _this = this;
            _this.$refs["form"].validate((valid) => {
                if (valid) {
                    _this.$axios
                        .post(
                            "/api/regulatory/ReportAndRegister/addDeclareAudit",
                            _this.declareAudit
                        )
                        .then(function(res) {
                            if (res.data) {
                                _this.$message({
                                    message: "审核成功！",
                                    type: "success",
                                });
                            }
                            _this.handleClose();
                            _this.getRegionCountData(0);
                        })
                        .catch((error) => {
                            // catch 指请求出错的处理
                            // console.log(error);
                        });
                } else {
                    // console.log("error submit!!");
                    return false;
                }
            });
        },
        adudit(item) {
            var _this = this;
            _this.auditStatus = item.auditStatus;
            _this.declareAudit.declareId = item.declareId;
            _this.auditDialogVisible = true;
            _this.$axios
                .get(
                    "/api/regulatory/ReportAndRegister/getAuditListByDeclareId",
                    {
                        params: {
                            declareId: item.declareId,
                        },
                    }
                )
                .then(function(res) {
                    if (res.code == 0) {
                        _this.auditList = res.data;
                    }
                })
                .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
        },
        handleClose() {
            this.auditDialogVisible = false;
            this.$refs["form"].resetFields();
        },
        handleSizeChange(val) {
            // 改变每页显示的条数
            this.pageSize = val;
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.cur_page = 1;
            this.getRegionCountData(0);
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getRegionCountData(0);
        },
        getIndex(index) {
            let curPage = this.cur_page;
            let limitPage = this.pageSize;
            return index + 1 + (curPage - 1) * limitPage;
        },

        getRegionCountData(num) {
            this.showLoading = true;
            var that = this;
            if (num == 1) {
                this.cur_page = 1;
            }
            var region =
                sessionStorage.getItem("regionCode") == null
                    ? that.AppConfig.appInfo.regionCode
                    : sessionStorage.getItem("regionCode");
            if (null != that.regionCode && that.regionCode.length > 0) {
                region = that.regionCode[that.regionCode.length - 1];
            }
            var url = "/api/regulatory/ReportAndRegister/tEntRegisterPlantList";
            that.$axios
                .get(url, {
                    params: {
                        year: that.year,
                        entType: that.entType,
                        regionCode: this.regionCode,
                        registerStatus: that.registerStatus,
                        entName: that.entName,
                        pageSize: that.pageSize,
                        pageNum: that.cur_page,
                        entSubClass: that.business1,
                    },
                })
                .then(function(res) {
                    that.showLoading = false
                    if (res.code == 0) {
                        that.dataTable = res.data.pageUtil.list;
                        that.totalPage = res.data.pageUtil.totalPage;
                        that.total = res.data.pageUtil.totalCount;
                        var num = that.pageSize * (that.cur_page - 1);
                        that.ok = res.data.ok;
                        that.noOk = res.data.noOk;
                        that.count = res.data.count;
                        for (
                            var i = 0;
                            i < res.data.pageUtil.list.length;
                            i++
                        ) {
                            res.data.pageUtil.list[i].rownum =
                                Number(num) +
                                Number(res.data.pageUtil.list[i].rownum);
                        }
                    } else {
                        that.ok = 0;
                        that.noOk = 0;
                        that.count = 0;
                        that.dataTable = [];
                        that.totalPage = 0;
                        that.total = 0;
                    }
                })
                .catch((error) => {
                    that.showLoading = false
                    // catch 指请求出错的处理
                    // console.log(error);
                });
        },

        infoFun(entId, correlationId, name) {
            this.$router.push({
                name: "RegisterHome",
                params: {
                    entId: entId,
                    correlationId: correlationId,
                    name: name,
                },
            });
        },

        getRegionChildrenList() {
            var _this = this;
            _this.$axios
                .get("/api/regulatory/regionInfo/getRegionChildrenList", {
                    params: {
                        regionCode:
                            sessionStorage.getItem("regionCode") == null
                                ? _this.AppConfig.appInfo.regionCode
                                : sessionStorage.getItem("regionCode"),
                    },
                })
                .then(function(res) {
                    if (res.code == 0 && res.data.length > 0) {
                        const secondLevelRegin = res.data[0].children
                        secondLevelRegin.unshift({label: res.data[0].label, value: sessionStorage.getItem('regionCode')})
                        _this.regionOptions = secondLevelRegin
                    }
                })
                .catch((error) => {
                    // catch 指请求出错的处理
                    // console.log(error);
                });
        },
        searchRegionChange() {
            let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
            if (regionInfo.length > 0) {
                this.regionCode = regionInfo[0].value;
            }
            /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
        },
    },
};
</script>

<style>
.text_center {
    text-align: center;
}
.feedback_dialog {
    overflow-y: auto;
    max-height: 600px;
}
</style>
