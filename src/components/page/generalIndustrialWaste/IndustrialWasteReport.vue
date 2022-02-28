<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath" />
    <div class="panel">
      <div>
        <div class="panel-bd">
          <div style="">
            <ul class="filter-box">
              <li class="filter-item">
                <div class="filter-label">所在地：</div>
                <div class="filter-con">
                  <div class="el-select w160">
                    <el-select
                      v-model="search.regionCode"
                      placeholder="请选择所在地"
                    >
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
                <div class="filter-label">提交年份：</div>
                <div class="filter-con">
                  <el-date-picker
                    style="width: 150px"
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
                <div class="filter-label">提交月份：</div>
                <div class="filter-con">
                  <el-date-picker
                    style="width: 150px"
                    :clearable="false"
                    :picker-options="pickerOptions"
                    @change="submitMonthChange"
                    v-model="search.reportMonth"
                    type="month"
                    value-format="yyyy-MM"
                    placeholder="选择年月"
                  >
                  </el-date-picker>
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
                  <el-button
                    type="button"
                    size="medium"
                    @click="searchEntManagementPlanReport"
                    class="el-button el-button--primary"
                  >
                    <span>查询</span></el-button
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <IndustrialWasteYear
        v-show="search.sourceType == 1"
        :searchParams="params"
      ></IndustrialWasteYear>
      <IndustrialWasteMonth
        v-show="search.sourceType == 2"
        :searchParams="params"
      ></IndustrialWasteMonth>
    </div>
  </div>
</template>

<script>
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue";
import IndustrialWasteYear from "./components/IndustrialWasteYear.vue";
import IndustrialWasteMonth from "./components/IndustrialWasteMonth.vue";
export default {
  name: "IndustrialWasteReport",
  components: {
    BreadcrumbComponent,
    IndustrialWasteMonth,
    IndustrialWasteYear,
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
      regionOptions: [],
      params: null,
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
    this.getRegionChildrenList();
  },
  methods: {
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
        .then(function (res) {
          if (res.code == 0 && res.data.length > 0) {
            const secondLevelRegin = res.data[0].children;
            secondLevelRegin.unshift({
              label: res.data[0].label,
              value: sessionStorage.getItem("regionCode"),
            });
            _this.regionOptions = secondLevelRegin;
          }
        })
        .catch((error) => {});
    },
    searchEntManagementPlanReport() {
      this.params = JSON.parse(JSON.stringify(this.search));
    },
    submitMonthChange() {
      if (this.search.reportMonth) {
        this.search.sourceType = 2;
        this.search.reportYear = this.search.reportMonth.split("-")[0];
        this.search.year = this.search.reportMonth.split("-")[0];
        this.search.month = this.search.reportMonth.split("-")[1];
      }
    },
    submitYearChange() {
      this.search.reportMonth = null;
      this.search.sourceType = 1;
      this.search.year = this.search.reportYear;
      this.search.month = "01";
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

.el-divider--vertical {
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
