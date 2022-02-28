<template>
  <!-- 主体 -->
  <div>
    <div class="monthReport">
      <div class="panel-bd">
        <div class="total-number" style="margin-left: 3px">
          <div class="total-text">
            已提交企业<span class="num" style="color: green">{{
              count.one
            }}</span
            >家
          </div>
          <div class="total-text is-offline">
            未提交企业<span class="num" style="color: red">{{ count.two }}</span
            >家
          </div>
        </div>
        <table class="table-default">
          <colgroup>
            <col style="width: 60px" />
            <col />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 10%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
            <col style="width: 8%" />
          </colgroup>
          <thead>
            <tr>
              <th style="text-align: center; width: 6%">序号</th>
              <th style="text-align: center; width: 10%">企业名称</th>
              <th style="text-align: center; width: 10%">企业类型</th>
              <th style="text-align: center; width: 8%">所在地</th>
              <th style="text-align: center; width: 8%">所属行业</th>
              <th style="text-align: center; width: 10%">联系人</th>
              <th style="text-align: center; width: 8%">电话</th>
              <th style="text-align: center; width: 10%">提交状态</th>
              <th style="text-align: center; width: 10%">提交时间</th>
              <th style="text-align: center; width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataList">
              <td style="text-align: center; width: 6%">
                {{ (cur_page - 1) * pageSize + index + 1 }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
                :title="item.entName"
              >
                {{ item.entName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
                :title="item.entKind"
              >
                {{ item.entKind }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.regionName"
              >
                {{ item.regionName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.categoryName"
              >
                {{ item.categoryName }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
                :title="item.contacts"
              >
                {{ item.contacts }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 8%;
                "
                :title="item.contactsPhone"
              >
                {{ item.contactsPhone }}
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
              >
                <div v-if="item.submitime" class="text-state">已提交</div>
                <div v-else class="text-state state-off">未提交</div>
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
                :title="item.submitime"
              >
                <div v-if="item.submitime">{{ item.submitime }}</div>
                <div v-else>--</div>
              </td>
              <td
                style="
                  text-align: center;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  width: 10%;
                "
              >
                <div class="btn-opreate">
                  <a
                    v-if="item.submitime"
                    @click="lookEntMonthPeport(item.entId, item.entName)"
                    href="javascript:;"
                    class="text-primary text-underline"
                    >查看</a
                  >
                  <!--<a v-else href="javascript:;" class="text-lighter text-underline">查看</a>-->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="el-pagination is-background mt-lg">
          <span class="el-pagination__total">共 {{ total }} 条，每页显示</span>
          <span class="el-pagination__total">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </span>

          <span class="el-pagination__total">共 {{ totalPage }} 页</span>
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
          <el-date-picker
            style="width: 150px"
            clearable
            :readonly="true"
            :picker-options="pickerOptions"
            v-model="dialogSearch.reportYear"
            @change="dialogSearchReportYearChange"
            type="year"
            value-format="yyyy"
            placeholder="选择年"
          >
          </el-date-picker>
        </div>

        <div>
          <el-tabs
            :tab-position="tabPosition"
            :stretch="true"
            v-model="productionName"
            @tab-click="monthClick"
          >
            <el-tab-pane
              v-for="item in monthList"
              :key="item.name"
              :label="item.name"
              :name="item.value"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div>
          <div style="font-size: large; color: black; padding-bottom: 12px">
            <span style="padding-right: 3px">|</span>危废生产情况
          </div>
          <div style="padding-bottom: 12px; height: 236px; overflow: auto">
            <table class="mytable-default">
              <thead>
                <tr>
                  <th style="text-align: center; width: 10%">序号</th>
                  <th style="text-align: center; width: 15%">废物代码</th>
                  <th style="text-align: center; width: 20%">危险废物名称</th>
                  <th style="text-align: center; width: 15%">生产量(吨)</th>
                  <th style="text-align: center; width: 15%">处置利用方式</th>
                  <th style="text-align: center; width: 15%">
                    处置利用数量(吨)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    item, index
                  ) in entMonthOrYearReportInfo.reportEntProductionVoList"
                >
                  <td style="text-align: center; width: 10%">
                    {{ (cur_page - 1) * pageSize + index + 1 }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="formatDictDetailCode(item.dictDetailCode)"
                  >
                    <!--<a href="javascript:;" class="text-second text-underline">-->
                    {{ formatDictDetailCode(item.dictDetailCode) }}
                    <!--</a>-->
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="item.harmfulName"
                  >
                    {{ item.harmfulName }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.productionNumber"
                  >
                    {{
                      (item.productionNumber
                        ? item.productionNumber
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.handleType"
                  >
                    {{ item.handleType }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.handleNumber"
                  >
                    {{ (item.handleNumber ? item.handleNumber : 0).toFixed(2) }}
                  </td>
                </tr>
                <tr v-if="entMonthOrYearReportInfo.reportEntProductionVoList">
                  <td colspan="3" align="center">合计</td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.productionNumber
                        ? entDialogCountInfo.productionNumber
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                  <td align="center">/</td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.handleNumber
                        ? entDialogCountInfo.handleNumber
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div style="font-size: large; color: black; padding-bottom: 12px">
            <span style="padding-right: 3px">|</span>危废委托利用处置情况
          </div>
          <div style="padding-bottom: 12px; height: 236px; overflow: auto">
            <table class="mytable-default">
              <thead>
                <tr>
                  <th style="text-align: center; width: 10%">序号</th>
                  <th style="text-align: center; width: 10%">废物代码</th>
                  <th style="text-align: center; width: 15%">危险废物名称</th>
                  <th style="text-align: center; width: 15%">委托单位名称</th>
                  <th style="text-align: center; width: 10%">所在地</th>
                  <th style="text-align: center; width: 15%">经验许可证编号</th>
                  <th style="text-align: center; width: 15%">处置利用方式</th>
                  <th style="text-align: center; width: 10%">数量(吨)</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    item, index
                  ) in entMonthOrYearReportInfo.reportEntEntrusts"
                >
                  <td style="text-align: center; width: 10%">
                    {{ (cur_page - 1) * pageSize + index + 1 }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 10%;
                    "
                    :title="formatDictDetailCode(item.dictDetailCode)"
                  >
                    <!--<a href="javascript:;" class="text-second text-underline">-->
                    {{ formatDictDetailCode(item.dictDetailCode) }}
                    <!--</a>-->
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.harmfulName"
                  >
                    {{ item.harmfulName }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.client"
                  >
                    {{ item.client }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 10%;
                    "
                    :title="item.location"
                  >
                    {{ item.location }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.license"
                  >
                    {{ item.license }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 15%;
                    "
                    :title="item.handleType"
                  >
                    {{ item.handleType }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 10%;
                    "
                    :title="item.entrustNumber"
                  >
                    {{
                      (item.entrustNumber ? item.entrustNumber : 0).toFixed(2)
                    }}
                  </td>
                </tr>
                <tr v-if="entMonthOrYearReportInfo.reportEntEntrusts">
                  <td colspan="7" align="center">合计</td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.entrustNumber
                        ? entDialogCountInfo.entrustNumber
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div style="font-size: large; color: black; padding-bottom: 12px">
            <span style="padding-right: 3px">|</span>危废贮存情况
          </div>
          <div style="padding-bottom: 12px; height: 236px; overflow: auto">
            <table class="mytable-default">
              <thead>
                <tr>
                  <th style="text-align: center; width: 10%">序号</th>
                  <th style="text-align: center; width: 20%">废物代码</th>
                  <th style="text-align: center; width: 20%">危险废物名称</th>
                  <th style="text-align: center; width: 20%">
                    上月遗留贮存量(吨)
                  </th>
                  <th style="text-align: center; width: 20%">
                    上月底贮存量(吨)
                  </th>
                  <th style="text-align: center; width: 20%">
                    本月底贮存量(吨)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(
                    item, index
                  ) in entMonthOrYearReportInfo.reportEntStorageVos"
                >
                  <td style="text-align: center; width: 10%">
                    {{ (cur_page - 1) * pageSize + index + 1 }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="formatDictDetailCode(item.dictDetailCode)"
                  >
                    <!--<a href="javascript:;" class="text-second text-underline">-->
                    {{ formatDictDetailCode(item.dictDetailCode) }}
                    <!--</a>-->
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="item.harmfulName"
                  >
                    {{ item.harmfulName }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="item.legacyMonth"
                  >
                    {{ (item.legacyMonth ? item.legacyMonth : 0).toFixed(2) }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="item.lastMonth"
                  >
                    {{ (item.lastMonth ? item.lastMonth : 0).toFixed(2) }}
                  </td>
                  <td
                    style="
                      text-align: center;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      overflow: hidden;
                      width: 20%;
                    "
                    :title="item.thisMonth"
                  >
                    {{ (item.thisMonth ? item.thisMonth : 0).toFixed(2) }}
                  </td>
                </tr>
                <tr v-if="entMonthOrYearReportInfo.reportEntStorageVos">
                  <td colspan="3" align="center">合计</td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.legacyMonth
                        ? entDialogCountInfo.legacyMonth
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.lastMonth
                        ? entDialogCountInfo.lastMonth
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                  <td align="center">
                    {{
                      (entDialogCountInfo.thisMonth
                        ? entDialogCountInfo.thisMonth
                        : 0
                      ).toFixed(2)
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import BreadcrumbComponent from "../../../common/unit/BreadcrumbComponent.vue";
export default {
  name: "IndustrialWasteMonth",
  components: {
    BreadcrumbComponent,
  },
  props: {
    searchParams: Object,
  },
  watch: {
    searchParams(val) {
      this.search = JSON.parse(JSON.stringify(this.searchParams));
      this.searchEntManagementPlanReport();
    },
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
      isDisabled: false,
      productionName: new Date().format("MM"),
      tabPosition: "top",
      entName: "",
      dialogVisible: false,
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      regionCode: sessionStorage.getItem("regionCode"),
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
        },
        {
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
      dataList: [],
      count: {
        all: 0,
        one: 0,
        two: 0,
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
      search: {
        reportYear: new Date().format("yyyy"),
        reportMonth: null,
        regionCode: sessionStorage.getItem("regionCode"),
        entType: "",
        entKind: "",
        standardSituation: "",
        entName: "",
        regionName: this.AppConfig.appInfo.regionName,
        regionParentCode: "",
        reportStatus: "",
        year: new Date().format("yyyy"),
        month: new Date().format("MM"),
        sourceType: 1,
        entSubClass: '1001'
      },
    };
  },
  created: function () {
    this.initMonthList();
    this.searchEntManagementPlanReport();
  },
  methods: {
    formatDictDetailCode(code) {
      if (code == null || !code) {
        return "--";
      } else {
        return code.split("#")[0];
      }
    },
    initCountData() {
      this.count.all = 0;
      this.count.one = 0;
      this.count.two = 0;
      this.count.three = 0;
    },
    initMonthList() {
      this.monthList = [];
      var year = this.search.reportYear.split("-")[0];
      var timeArr = new Date().format("yyyy-MM").split("-");
      var thisLength = null;
      if (year == timeArr[0]) {
        // 当前月之前
        thisLength = timeArr[1];
      } else {
        thisLength = 12;
      }
      for (let i = 1; i <= thisLength; i++) {
        var obj = {};
        obj.name = i + "月";
        if (i < 10) {
          obj.value = "0" + i;
        } else {
          obj.value = i + "";
        }
        this.monthList.push(obj);
      }
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
    searchEntManagementPlanReport() {
      this.initCountData();
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
      params.append("entSubClass", _this.search.entSubClass);
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
      params.append("entSubClass", _this.search.entSubClass);
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
      params.append("month", _this.search.month);
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
      // console.log(this.dialogSearch.reportYear+"年"+(parseInt(tab.index)+1)+"月");
      this.search.year = this.dialogSearch.reportYear;
      this.search.month = parseInt(tab.index) + 1;
      this.selectEntMonthYearReportInfo();
    },
    entReportDialogClose() {
      this.resetEntDialogCountInfo();
      this.dialogVisible = false;
      this.submitMonthChange();
      this.resetEntDialogCountInfo();
    },
    submitMonthChange() {
      var timeArr = this.search.reportYear.split("-");
      this.dialogSearch.reportYear = timeArr[0];
      this.search.year = timeArr[0];
      this.search.month = timeArr[1];
      this.productionName = timeArr[1];
      this.initMonthList();
    },
    dialogSearchReportYearChange() {
      this.initMonthList();
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
</style>
