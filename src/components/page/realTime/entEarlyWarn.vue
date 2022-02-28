<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
      <div class="panel-bd">
        <div style="padding: 20px 0px 0 2px;">
          <ul class="filter-box">
              <li class="filter-item">
                <div class="filter-label">所在地：</div>
                <div class="filter-con">
                  <div class="el-select w160">
                    <RegionList @RegionChange="regionChange"></RegionList>
                  </div>
                </div>
              </li>
              <li class="filter-item">
                <div class="filter-label">企业类型：</div>
                <div class="filter-con">
                  <div class="el-select w124">
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
              </li>
              <li class="filter-item">
                <div class="filter-label">异常类型：</div>
                <div class="filter-con">
                  <div class="el-select w200">
                    <el-select v-model="search.warningType" clearable>
                      <el-option
                        v-for="item in warningOptions"
                        :key="item.value"
                        :label="item.detailsName"
                        :value="item.detailsCode"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </li>
              <li class="filter-item">
                <div class="filter-label">预警时间：</div>
                <div class="filter-con">
                  <div class="el-select w200">
                    <el-date-picker
                      @change="timeChange"
                      v-model="search.timeValue"
                      type="datetimerange"
                      range-separator="-"
                      :editable="false"
                      :clearable="true"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      format="yyyy-MM-dd HH:mm"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </div>
                </div>
              </li>
              <li class="filter-item">
                <div class="filter-con">
                  <div class="el-input w180 el-input-group el-input--prefix">
                    <span class="el-input__prefix">
                      <i class="el-input__icon el-icon-search"></i>
                    </span>
                    <el-input
                      type="text"
                      autocomplete="off"
                      placeholder="搜索企业名称"
                      v-model.trim="search.entName"
                    ></el-input>
                  </div>
                </div>
              </li>
              <li class="filter-item">
                <div class="filter-btn">
                  <!--<button type="button" @click="searchEntEarlyWarn" class="button-type">
                    <span>查询</span>
                  </button>-->
                  <el-button type="button" size="medium"  @click="searchEntEarlyWarn" class="el-button el-button--primary">
                    <span>查询</span></el-button>
                </div>
              </li>
          </ul>
        </div>
        <div class="total-number" style="margin-left: 3px;">
          <!-- <div class="total-name">总预警{{count.all}}次</div> -->
          <div class="total-text is-offline">
            当前异常企业
            <span class="num" style="color:red">{{count.one}}</span>家
          </div>
        </div>
        <table class="table-default">
          <thead>
            <tr>
              <th style="text-align:center;width: 6%">序号</th>
              <th style="text-align:center;width: 14%">企业名称</th>
              <th style="text-align:center;width: 10%">预警时间</th>
              <th style="text-align:center;width: 10%">区域</th>
              <th style="text-align:center;width: 10%">所属行业</th>
              <th style="text-align:center;width: 10%">企业类型</th>
              <th style="text-align:center;width: 10%">联系人</th>
              <th style="text-align:center;width: 10%">电话</th>
              <th style="text-align:center;width: 10%">异常类型</th>
              <th style="text-align:center;width: 10%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td style="text-align:center;width: 6%">{{(cur_page-1)*pageSize+index+1}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
                :title="item.entName"
              >{{item.entName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.warningTime"
              >{{item.warningTime}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.regionName"
              >{{item.regionName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.categoryName"
              >{{item.categoryName}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.entKind"
              >{{item.entKind}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contacts"
              >{{item.contacts}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.contactsPhone"
              >{{item.contactsPhone}}</td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
                :title="item.details"
              >
                <span>{{item.details}}</span>
              </td>
              <td
                style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              >
                <span class="text-primary text-underline" style="cursor: pointer;" v-if="!item.warningCase && (userPermissions == 'operate' || userPermissions == 'admin')" @click="assignedCase(item)">指派</span>
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
        <el-dialog title="案件指派" 
          :modal-append-to-body="false" 
          :visible.sync="dialogFormVisible"
          width="36%"
          center>
          <AssignedCase :currentData="currentData" @cancelDialog="cancelDialog" @confirmDialog="confirmDialog"></AssignedCase>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import RegionList from '../../common/unit/RegionList.vue'
import AssignedCase from '../riskCaseManagement/components/assignedDialog.vue'
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "entEarlyWarn",
  components: {
    RegionList,
    AssignedCase,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      userPermissions: sessionStorage.getItem("roleCode"),
      currentData: null,
      dialogFormVisible: false,
      isDisabled: false,
      total: 0,
      totalPage: 0,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      regionCode: [],
      regionLevel: this.AppConfig.appInfo.regionLevel,
      parentCode: this.AppConfig.appInfo.parentCode,
      regionName: this.AppConfig.appInfo.regionName,
      entKindOptions: [
        {
          value: -1,
          label: "全部",
        },
        {
          value: 1,
          label: "产废企业",
        },
        {
          value: 2,
          label: "经营企业",
        },
        {
          value: 3,
          label: "收集企业",
        },
      ],
      warningOptions: [],
      standardSituationOptions: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "1",
          label: "达标",
        },
        {
          value: "2",
          label: "基本达标",
        },
        {
          value: "3",
          label: "不达标",
        },
      ],
      search: {
        regionCode: sessionStorage.getItem("regionCode"),
        entType: "",
        entKind: -1,
        standardSituation: "",
        entName: "",
        regionName: this.AppConfig.appInfo.regionName,
        regionLevel: sessionStorage.getItem("regionLevel"),
        regionParentCode: "",
        endTime: "",
        startime: "",
        warningType: "",
        timeValue: "",
      },
      dataList: [],
      count: {
        all: 0,
        one: 0,
        two: 1,
        three: 0,
      },
      regionOptions: []
    };
  },
  created: function () {
    if (this.search.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.searchEntEarlyWarn();
    // 行政区域级联
    this.getRegionChildrenList();
    this.getByLevelDetailsCode();
  },
  methods: {
    getByLevelDetailsCode() {
      this.$axios.get("/api/permissions/detailsCascadeType/getByLevelDetailsCascade?level=3")
      .then((res) => {
          if (res.code == 0) {
              this.warningOptions = res.data
          }
      })
      .catch((error) => {
          this.$message.error("请稍等后重试!");
      });
    },
    assignedCase(params) {
      this.currentData = params
      this.dialogFormVisible = true
    },
    cancelDialog() {
      this.dialogFormVisible = false
    },
    confirmDialog() {
      this.dialogFormVisible = false
      this.pageList();
    },
    statusChanges(value, index) {
      console.log(value, index)
      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('p', null, [
          h('span', null, '确认将此企业的预警信息计入'),
          h('b', { style: 'color: red' }, '风险案件'),
          h('span', null, '吗？')
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then((action) => {
        this.pageList();
      }).catch((err) => {
        console.log(err)
        this.dataList[index].isRisk = false
      })
    },
    regionChange(value) {
      this.regionCode = value
    },
    formatWarningType(warningType) {
      if (warningType == 1) {
        return "企业台账10天未更新";
      } else if (warningType == 2) {
        return "企业储藏设施变动异常";
      } else if (warningType == 3) {
        return "危废贮存超时";
      } else if (warningType == 4) {
        return "危废贮存间储存率预警";
      } else if (warningType == 5) {
        return "生产线危废未入库";
      } else if (warningType == 6) {
        return "生产线危废产量异常";
      } else if (warningType == 7) {
        return "生产线设备离线";
      } else if (warningType == 8) {
        return "危废贮存间非法入侵";
      } else if (warningType == 9) {
        return "危废贮存间储量异常变化";
      } else if (warningType == 10) {
        return "危废贮存间烟气报警";
      } else if (warningType == 11) {
        return "危废贮存间人员姿态异常";
      } else if (warningType == 12) {
        return "转移车辆运输超时";
      } else if (warningType == 13) {
        return "转移车辆载重异常";
      } else if (warningType == 14) {
        return "转移车辆偏离路线";
      } else if (warningType == 15) {
        return "转移车辆载货驶出管控区";
      } else if (warningType == 16) {
        return "危废处置合同即将到期";
      } else if (warningType == 17) {
        return "危废管理台账未提交";
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
    timeChange() {
      var timeValueArr = this.search.timeValue;
      if (timeValueArr != null) {
        this.search.startime = timeValueArr[0];
        this.search.endTime = timeValueArr[1];
      } else {
        this.search.startime = "";
        this.search.endTime = "";
      }
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode: sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode')
          },
        })
        .then(function (res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
            _this.regionCode = [res.data[0].value+''];
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    searchEntEarlyWarn() {
      var _this = this;
      this.cur_page = 1;
      _this.selectWarningCountEnt();
      _this.pageList();
    },
    selectWarningCountEnt() {
      var _this = this;
      var params = new URLSearchParams();
      params.append("regionCode", _this.regionCode);
      params.append("entKind", _this.search.entKind);
      params.append("warningType", _this.search.warningType);
      params.append("startime", _this.search.startime);
      params.append("endTime", _this.search.endTime);
      params.append("entName", _this.search.entName);
      _this.$axios
        .get("/api/regulatory/index/selectWarningCountEnt", { params })
        .then(function (res) {
          if (res.code == 0) {
            let data = res.data;
            _this.count.all = data.all;
            _this.count.one = data.one;
            //_this.count.two = data.two;
            //_this.count.three = data.three;
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
      params.append("regionCode", _this.regionCode);
      params.append("entKind", _this.search.entKind);
      params.append("warningType", _this.search.warningType);
      params.append("startime", _this.search.startime);
      params.append("endTime", _this.search.endTime);
      params.append("entName", _this.search.entName);
      _this.$axios
        .get("/api/regulatory/index/selectWarningCountEntPage", { params })
        .then(function (res) {
          if (res.code == 0) {
            _this.dataList = res.data.records.map((item) => {
              item.isRisk = false;
              return item;
            });
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
</style>
