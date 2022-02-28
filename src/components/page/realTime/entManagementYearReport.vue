<template>
  <!-- 主体 -->
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
      <div class="panel-bd">
        <!-- 收起后样式名.filter-more-mini -->
        <div style="">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">所在地：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-cascader
                    ref="regionElCascader"
                    :disabled="isDisabled"
                    @change="searchRegionChange"
                    v-model="search.regionCode"
                    :options="regionOptions"
                    :props="{ checkStrictly: true }"
                  ></el-cascader>
                </div>
              </div>
            </li>
            <!--<li class="filter-item">
              <div class="filter-label">企业类型：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  &lt;!&ndash;<el-select v-model="search.entType" clearable>
                                        <el-option
                                                v-for="item in entTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                  </el-select>&ndash;&gt;
                  <el-select v-model="search.entKind" clearable>
                    <el-option
                      v-for="item in entKindOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>-->
            <li class="filter-item">
              <div class="filter-label">提交年份：</div>
              <div class="filter-con">
                <el-date-picker
                  style="width: 150px;"
                  :clearable="false"
                  @change="submitYearChange"
                  v-model="search.reportYear"
                  :picker-options="pickerOptions"
                  type="year"
                  value-format="yyyy"
                  placeholder="选择年"
                ></el-date-picker>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">
                  <span class="el-input__prefix">
                    <i class="el-input__icon el-icon-search"></i>
                  </span>
                  <input
                    type="text"
                    autocomplete="off"
                    placeholder="搜索企业名称"
                    v-model="search.entName"
                    class="el-input__inner"
                  />
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" @click="searchEntManagementPlanReport" class="button-type">
                  <span>查询</span>
                </button>-->
                <el-button type="button" size="medium"  @click="searchEntManagementPlanReport" class="el-button el-button--primary">
                  <span>查询</span></el-button>
              </div>
            </li>
            <!--<li class="filter-item">
                            <div class="filter-label">企业名称：</div>
                            <div class="filter-con">
                                <el-input style="width: 150px;" v-model="search.entName">

                                </el-input>
                            </div>
                        </li>
                        <li class="filter-item">
                            <el-button type="info" size="small" plain @click="searchEntManagementPlanReport">查询</el-button>
            </li>-->
          </ul>
        </div>
        <div class="total-number" style="margin-left: 3px;">
          <!-- <div class="total-name">全部企业{{count.all}}家</div> -->
          <div class="total-text">
            已提交企业
            <span class="num" style="color:green">{{count.one}}</span>家
          </div>
          <div class="total-text is-offline">
            未提交企业
            <span class="num" style="color:red">{{count.two}}</span>家
          </div>
        </div>
        <table class="table-default">
          <colgroup>
            <col style="width: 60px;" />
            <col />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 10%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
            <col style="width: 8%;" />
          </colgroup>
          <thead>
            <tr>
              <th style="text-align:center;width: 6%">序号</th>
              <th style="text-align:center;width: 10%">企业名称</th>
              <th style="text-align:center;width: 10%">企业类型</th>
              <th style="text-align:center;width: 8%">所在地</th>
              <th style="text-align:center;width: 8%">所属行业</th>
              <th style="text-align:center;width: 10%">联系人</th>
              <th style="text-align:center;width: 8%">电话</th>
              <th style="text-align:center;width: 10%">状态</th>
              <th style="text-align:center;width: 10%">提交时间</th>
              <th style="text-align:center;width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList">
              <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entName"
              >{{item.entName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entKind"
              >{{item.entKind}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.regionName"
              >{{item.regionName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.categoryName"
              >{{item.categoryName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contacts"
              >{{item.contacts}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%"
                :title="item.contactsPhone"
              >{{item.contactsPhone}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              >
                <div v-if="item.auditStatus == -1" class="text-state state-anomaly">审核拒绝</div>
                <div v-if="item.auditStatus == 0" class="text-state untreated">已提交未审核</div>
                <div v-if="item.auditStatus == 1" class="text-state">审核通过</div>
                <div v-if="item.auditStatus == null" class="text-state state-off">未提交</div>
              </td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.submitime"
              >
                <div v-if="item.submitime">{{item.submitime}}</div>
                <div v-else>--</div>
              </td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              >
                <div class="btn-opreate">
                  <a
                    v-if="item.submitime"
                    @click="lookEntMonthPeport(item.entId,item.entName)"
                    href="javascript:;"
                    class="text-primary text-underline"
                  >查看</a>
                  <a
                    v-if="item.submitime"
                    @click="adudit(item)"
                    href="javascript:;"
                    class="text-primary text-underline"
                  >审核</a>
                  <!--<a v-else href="javascript:;" class="text-lighter text-underline">查看</a>-->
                </div>
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
              :total="total"
            ></el-pagination>
          </span>

          <span class="el-pagination__total">共 {{totalPage}} 页</span>
        </div>
      </div>
    </div>
    <el-dialog
      top="9vh"
      :title="entName"
      :modal="true"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="1000px"
      height="50%"
      @close="entReportDialogClose"
    >
      <div>
        <el-tabs :tab-position="tabPosition" v-model="productionName" @tab-click="monthClick">
          <el-tab-pane
            v-for="item in yearList"
            :key="item.name"
            :label="item.name"
            :name="item.value"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>危废生产情况
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 10%">序号</th>
                <th style="text-align:center;width: 15%">废物代码</th>
                <th style="text-align:center;width: 20%">危险废物名称</th>
                <th style="text-align:center;width: 15%">生产量(吨)</th>
                <th style="text-align:center;width: 15%">处置利用方式</th>
                <th style="text-align:center;width: 15%">处置利用数量(吨)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntProductionVoList">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                  {{formatDictDetailCode(item.dictDetailCode)}}
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.harmfulName"
                >{{item.harmfulName}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.productionNumber"
                >{{(item.productionNumber?item.productionNumber:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleType"
                >{{item.handleType}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleNumber"
                >{{(item.handleNumber?item.handleNumber:0).toFixed(2)}}</td>
              </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntProductionVoList">
                <td colspan="3" align="center">合计</td>
                <td
                  align="center"
                >{{(entDialogCountInfo.productionNumber?entDialogCountInfo.productionNumber:0).toFixed(2)}}</td>
                <td align="center">/</td>
                <td
                  align="center"
                >{{(entDialogCountInfo.handleNumber?entDialogCountInfo.handleNumber:0).toFixed(2)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>危废委托利用处置情况
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 10%">序号</th>
                <th style="text-align:center;width: 10%">废物代码</th>
                <th style="text-align:center;width: 15%">危险废物名称</th>
                <th style="text-align:center;width: 15%">委托单位名称</th>
                <th style="text-align:center;width: 10%">所在地</th>
                <th style="text-align:center;width: 15%">经验许可证编号</th>
                <th style="text-align:center;width: 15%">处置利用方式</th>
                <th style="text-align:center;width: 10%">数量(吨)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntEntrusts">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                  {{formatDictDetailCode(item.dictDetailCode)}}
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.harmfulName"
                >{{item.harmfulName}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.client"
                >{{item.client}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.location"
                >{{item.location}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.license"
                >{{item.license}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 15%"
                  :title="item.handleType"
                >{{item.handleType}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                  :title="item.entrustNumber"
                >{{(item.entrustNumber?item.entrustNumber:0).toFixed(2)}}</td>
              </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntEntrusts">
                <td colspan="7" align="center">合计</td>
                <td
                  align="center"
                >{{(entDialogCountInfo.entrustNumber?entDialogCountInfo.entrustNumber:0).toFixed(2)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div style="font-size: large;color: black;padding-bottom: 12px;">
          <span style="padding-right: 3px">|</span>危废贮存情况
        </div>
        <div style="padding-bottom: 12px;height: 236px;overflow: auto;">
          <table class="mytable-default">
            <thead>
              <tr>
                <th style="text-align:center;width: 10%">序号</th>
                <th style="text-align:center;width: 20%">废物代码</th>
                <th style="text-align:center;width: 20%">危险废物名称</th>
                <th style="text-align:center;width: 20%">上年遗留贮存量(吨)</th>
                <th style="text-align:center;width: 20%">上年底贮存量(吨)</th>
                <th style="text-align:center;width: 20%">本年底贮存量(吨)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in entMonthOrYearReportInfo.reportEntStorageVos">
                <td style="text-align:center;width: 10%">{{(cur_page-1)*pageSize+index+1}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="formatDictDetailCode(item.dictDetailCode)"
                >
                  <!--<a href="javascript:;" class="text-second text-underline">-->
                  {{formatDictDetailCode(item.dictDetailCode)}}
                  <!--</a>-->
                </td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.harmfulName"
                >{{item.harmfulName}}</td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.lastMonth"
                >{{(item.lastMonth?item.lastMonth:0).toFixed(2)}}</td>
                <td
                  style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
                  :title="item.thisMonth"
                >{{(item.thisMonth?item.thisMonth:0).toFixed(2)}}</td>
              </tr>
              <tr v-if="entMonthOrYearReportInfo.reportEntStorageVos">
                <td colspan="3" align="center">合计</td>
                <td
                        align="center"
                >{{(entDialogCountInfo.legacyMonth?entDialogCountInfo.legacyMonth:0).toFixed(2)}}</td>
                <td
                  align="center"
                >{{(entDialogCountInfo.lastMonth?entDialogCountInfo.lastMonth:0).toFixed(2)}}</td>
                <td
                  align="center"
                >{{(entDialogCountInfo.thisMonth?entDialogCountInfo.thisMonth:0).toFixed(2)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-dialog>
    <!-------------------审核弹窗------------------->
    <el-dialog
      title="审核"
      :visible.sync="auditDialogVisible"
      width="50%"
      :modal-append-to-body="false"
      :before-close="handleClose"
    >
      <div>
        <el-tabs :tab-position="tabPosition" v-model="productionName" @tab-click="yearClick">
          <el-tab-pane
            v-for="item in yearList"
            :key="item.name"
            :label="item.name"
            :name="item.value"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <p>
        审核信息
        <span style="width:10px" class="wx border">&nbsp;&nbsp;&nbsp; &nbsp;</span>
      </p>

      <br />
      <el-form
        ref="form"
        :rules="rules"
        :model="yearReportAudit"
        label-width="150px"
        class="auditDetails"
        style="padding:10px;box-sizing:border-box"
      >
        <el-timeline>
          <div class="feedback_dialog">
            <el-timeline-item
              :timestamp="'审核时间：' + item.auditDate"
              placement="top"
              v-for="(item, index) in yearAuditList"
              :key="index"
            >
              <el-card>
                <el-row>
                  <el-col :span="4">
                    <h4>审核人：</h4>
                  </el-col>
                  <el-col :span="18">{{item.auditName}}</el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="4">
                    <h4>审核状态：</h4>
                  </el-col>
                  <el-col :span="18">{{item.status ==1?"通过":"拒绝"}}</el-col>
                </el-row>
                <br />

                <el-row>
                  <el-col :span="4">
                    <h4>审核内容：</h4>
                  </el-col>
                  <el-col :span="18" style="letter-spacing:1px;line-height: 22px">{{item.opinion}}</el-col>
                </el-row>
              </el-card>
            </el-timeline-item>
          </div>
        </el-timeline>
        <div v-if="auditStatus != 1">
          <el-form-item prop="status" label="审核状态：">
            <el-select v-model="yearReportAudit.status" placeholder="请选择">
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
              v-model="yearReportAudit.opinion"
              style="width: 500px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="loginUser" label="审核人：">
            <span>{{loginUser}}</span>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addYearReportAudit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "entYearReport",
  components: {
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < Date.now() - 8.64e7;   //禁用以前的日期，今天不禁用
          // return date.getTime() <= Date.now();    //禁用今天以及以前的日期
          return time.getTime() > Date.now();
        },
      },
      loginUser: window.sessionStorage.getItem("username"),
      auditDialogVisible: false,
      auditStatus: 0,
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
            message: "请填写审核意见",
            trigger: "blur",
          },
        ],
      },
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
      yearAuditList: [],
      yearReportAudit: {
        status: "",
        declareId: "",
        opinion: "",
        auditBy: window.sessionStorage.getItem("userId"),
        yearReportId: "",
      },
      isDisabled: false,
      productionName: new Date().format("yyyy"),
      tabPosition: "top",
      entName: "",
      dialogVisible: false,
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      regionCode: sessionStorage.getItem("regionCode"),
      regionLevel: this.AppConfig.appInfo.regionLevel,
      parentCode: this.AppConfig.appInfo.parentCode,
      regionName: this.AppConfig.appInfo.regionName,
      entKindOptions: [
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
          value: "3",
          label: "收集企业",
        },{
          value: 4,
          label: "运输企业",
        },
      ],
      entTypeOptions: [
        {
          value: "",
          label: "全部企业",
        },
        {
          value: "1",
          label: "重点企业",
        },
        {
          value: "2",
          label: "一般企业",
        } /*,{value: 3,label: "收集企业"},
                    {value: 4,label: "经营企业"}*/,
      ],
      reportStatusOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "已备案",
        },
        {
          value: "2",
          label: "未备案",
        },
      ],
      dialogSearch: {
        reportYear: new Date().format("yyyy"),
      },
      search: {
        reportYear: new Date().format("yyyy"),
        regionCode: sessionStorage.getItem("regionCode"),
        entType: "",
        entKind: "2",
        standardSituation: "",
        entName: "",
        regionName: this.AppConfig.appInfo.regionName,
        regionLevel: sessionStorage.getItem("regionLevel"),
        regionParentCode: "",
        reportStatus: "",
        year: new Date().format("yyyy"),
        month: new Date().format("MM"),
        sourceType: 1,
      },
      dataList: [],
      count: {
        all: 0,
        one: 0,
        two: 1,
        three: 0,
      },
      regionOptions: [],
      managementPlanFilingEntInfo: "",
      entMonthOrYearReportInfo: "",
      entDialogCountInfo: {
        productionNumber: 0,
        handleNumber: 0,
        entrustNumber: 0,
        lastMonth: 0,
        thisMonth: 0,
      },
      entId: "",
      yearList: [{}],
      monthList: [
        {
          name: "1月",
          value: "01",
        },
        {
          name: "2月",
          value: "02",
        },
        {
          name: "3月",
          value: "03",
        },
        {
          name: "4月",
          value: "04",
        },
        {
          name: "5月",
          value: "05",
        },
        {
          name: "6月",
          value: "06",
        },
        {
          name: "7月",
          value: "07",
        },
        {
          name: "8月",
          value: "08",
        },
        {
          name: "9月",
          value: "09",
        },
        {
          name: "10月",
          value: "10",
        },
        {
          name: "11月",
          value: "11",
        },
        {
          name: "12月",
          value: "12",
        },
      ],
    };
  },
  created: function () {
    if (this.search.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.searchEntManagementPlanReport();
    // 行政区域级联
    this.getRegionChildrenList();
    // 初始化弹窗年
    this.initDialogYearList();
  },
  methods: {
    formatDictDetailCode(code){
      if(code==null || !code){
        return '--';
      }else{
        return code.split('#')[0];
      }
    },
    addYearReportAudit() {
      var _this = this;
      this.$refs["form"].validate((valid) => {
        if (valid) {
          _this.$axios
            .post(
              "/api/regulatory/index/addYearReportAudit",
              _this.yearReportAudit
            )
            .then(function (res) {
              if (res.code == 0 && res.data) {
                _this.$message({
                  message: "审核成功！",
                  type: "success",
                });
                _this.searchEntManagementPlanReport();
              } else {
                _this.$message.error("审核失败！");
              }
              _this.handleClose();
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
      this.auditDialogVisible = true;
      this.yearReportAudit.yearReportId = item.declareId;
      this.entId = item.entId;
      this.getYearReportAuditByEntAndYear(item);
    },
    getYearReportAuditByEntAndYear(item) {
      var _this = this;
      _this.auditStatus = 0;
      var params = new URLSearchParams();
      params.append("year", _this.search.year);
      params.append("entId", item.entId);
      _this.$axios
        .get("/api/regulatory/index/getYearReportAuditByEntAndYear", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.yearAuditList = res.data;
            if (_this.yearAuditList != null && _this.yearAuditList.length > 0) {
              _this.auditStatus = _this.yearAuditList[0].auditStatus;
            }
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
      this.pageList();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.pageList();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            // year: _this.search.year,
            regionCode:_this.regionCode
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    searchEntManagementPlanReport() {
      this.cur_page = 1;
      this.selectEntMonthYearReportCountEnt();
      this.pageList();
    },
    selectEntMonthYearReportCountEnt() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("regionCode", _this.search.regionCode);
      params.append("year", _this.search.year);
      params.append("entType", _this.search.entType);
      params.append("entKind", _this.search.entKind);
      params.append("month", _this.search.month);
      params.append("entName", _this.search.entName);
      params.append("sourceType", _this.search.sourceType);

      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportCountEnt", {
          params,
        })
        .then(function (res) {
          if (res.code == 0) {
            let data = res.data;
            _this.count.all = data.all;
            _this.count.one = data.one;
            _this.count.two = data.two;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    pageList() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append("regionCode", _this.search.regionCode);
      params.append("entType", _this.search.entType);
      params.append("entKind", _this.search.entKind);
      params.append("year", _this.search.year);
      params.append("month", _this.search.month);
      params.append("entName", _this.search.entName);
      params.append("sourceType", _this.search.sourceType);
      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportList", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records;
            _this.totalPage = res.data.pages;
            _this.total = res.data.total;
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
        this.search.regionName = regionInfo[0].label;
        this.search.regionLevel = regionInfo[0].level + 1;
        this.search.regionCode = regionInfo[0].value;
        let parentRegionInfo = regionInfo[0].parent;
        if (parentRegionInfo != null) {
          this.search.regionParentCode = parentRegionInfo.value;
        } else {
          this.search.regionName = this.regionName;
          this.search.regionLevel = this.regionLevel;
          this.search.regionCode = this.regionCode;
          this.search.regionParentCode = this.parentCode;
        }
      } else {
        this.search.regionName = this.regionName;
        this.search.regionLevel = this.regionLevel;
        this.search.regionCode = this.regionCode;
        this.search.regionParentCode = this.parentCode;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    },
    selectManagementPlanFilingEntInfo(entId) {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/index/selectManagementPlanFilingEntInfo/" + entId)
        .then(function (res) {
          if (res.code == 0) {
            _this.managementPlanFilingEntInfo = res.data;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    selectEntMonthYearReportInfo() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("entId", _this.entId);
      params.append("year", _this.search.year);
      params.append("month", "");
      params.append("sourceType", _this.search.sourceType);
      _this.$axios
        .get("/api/regulatory/index/selectEntMonthYearReportInfo/", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.entMonthOrYearReportInfo = res.data;
            let reportEntEntrusts = res.data.reportEntEntrusts;
            let reportEntProductionVoList = res.data.reportEntProductionVoList;
            let reportEntStorageVos = res.data.reportEntStorageVos;
            if (reportEntEntrusts.length > 0) {
              for (let i = 0; i < reportEntEntrusts.length; i++) {
                _this.entDialogCountInfo.entrustNumber +=
                  res.data.reportEntEntrusts[i].entrustNumber;
              }
            }
            if (reportEntProductionVoList.length > 0) {
              for (let i = 0; i < reportEntProductionVoList.length; i++) {
                _this.entDialogCountInfo.productionNumber +=
                  res.data.reportEntProductionVoList[i].productionNumber;
                _this.entDialogCountInfo.handleNumber +=
                  res.data.reportEntProductionVoList[i].handleNumber;
              }
            }
            if (reportEntStorageVos.length > 0) {
              for (let i = 0; i < reportEntStorageVos.length; i++) {
                _this.entDialogCountInfo.lastMonth +=
                  res.data.reportEntStorageVos[i].lastMonth;
                _this.entDialogCountInfo.thisMonth +=
                  res.data.reportEntStorageVos[i].thisMonth;
              }
            }
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    lookEntMonthPeport(entId, entName) {
      this.entName = entName;
      this.entId = entId;
      this.selectEntMonthYearReportInfo();
      this.dialogVisible = true;
    },
    monthClick(tab, event) {
      this.resetEntDialogCountInfo();
      // console.log(this.productionName);
      this.search.year = this.productionName;
      /*this.search.month = (parseInt(tab.index)+1);*/
      this.selectEntMonthYearReportInfo();
    },
    yearClick(tab, event) {
      this.search.year = this.productionName;
      var item = {
        entId:this.entId
      }
      this.getYearReportAuditByEntAndYear(item);
    },
    entReportDialogClose() {
      this.resetEntDialogCountInfo();
      this.dialogVisible = false;
      this.submitYearChange();
      this.resetEntDialogCountInfo();
    },
    submitYearChange() {
      var year = this.search.reportYear;
      this.dialogSearch.reportYear = year;
      this.search.year = year;
      this.productionName = year;
    },
    dialogSearchReportYearChange() {
      this.resetEntDialogCountInfo();
      this.search.year = this.dialogSearch.reportYear;
      this.selectEntMonthYearReportInfo();
    },
    resetEntDialogCountInfo() {
      this.entDialogCountInfo.productionNumber = 0;
      this.entDialogCountInfo.handleNumber = 0;
      this.entDialogCountInfo.entrustNumber = 0;
      this.entDialogCountInfo.lastMonth = 0;
      this.entDialogCountInfo.thisMonth = 0;
    },
    initDialogYearList() {
      var yearArr = this.getYearList(3);
      this.yearList = yearArr;
    },

    getYearList(num) {
      let thisYear = new Date().format("yyyy");
      if (num == null) {
        return;
      }
      var yearArr = [];
      let thisObj = {};
      thisObj.name = thisYear + "年";
      thisObj.value = thisYear;
      yearArr.push(thisObj);
      for (let i = 1; i < num; i++) {
        let obj = {};
        obj.name = parseInt(thisYear) - i + "年";
        obj.value = parseInt(thisYear) - i + "";
        yearArr.push(obj);
      }
      return yearArr.reverse();
    },
  },
};
</script>

<style>
.breadcrumb {
  line-height: 59px;
  height: 59px;
  font-size: 18px;
  color: #172033;
}

/deep/ .el-divider--vertical {
  display: inline-block;
  width: 3px;
  height: 8em;
  margin: 24px 8px;
  vertical-align: middle;
  position: relative;
}
.dabiao {
  width: 70px;
  height: 20px;
  background: #5daf34;
  text-align: center;
}
.jbdabiao {
  width: 70px;
  height: 20px;
  background: #f3d9b3;
  text-align: center;
}
.budabiao {
  width: 70px;
  height: 20px;
  background: #f56c6c;
  text-align: center;
}

.mytable-default {
  width: 100%;
  border: 1px solid #c0c4cc;
  color: #222;
}
.mytable-default td,
.mytable-default th {
  line-height: 22px;
  font-size: 16px;
  border: 1px solid #c0c4cc;
}
.mytable-default td:first-child,
.mytable-default th:first-child {
  padding-left: 30px;
}
.mytable-default tr:nth-child(even) td {
  background-color: #fcfdff;
}
.mytable-default tr:hover td {
  background-color: rgba(15, 162, 245, 0.1);
}
.mytable-default th {
  padding: 10px 12px 11px;
  background-color: #f0f2f5;
}
.mytable-default td {
  padding: 11px 12px;
  transition: 0.3s background;
  border-bottom: 1px solid #c0c4cc;
  white-space: nowrap;
}
.total-num span {
  font-size: 30px;
  margin-right: 10px;
}
.feedback_dialog {
  overflow-y: auto;
  max-height: 400px;
}
</style>
