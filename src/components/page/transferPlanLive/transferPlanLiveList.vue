<template>
  <!-- 主体 -->
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">计划转运时间：</div>
              <div class="filter-con">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  clearable
                ></el-date-picker>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">危废类型：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="entType" placeholder="请选择危废类型">
                    <el-option label="全部" value></el-option>
                    <el-option
                      v-for="item in entTypes"
                      :key="item.id"
                      :label="item.dicTypeExplain"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <!-- <li class="filter-item">
              <div class="filter-label">监控状态：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <el-select v-model="monitorType" placeholder="请选择监控状态">
                    <el-option
                      v-for="item in monitorTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </li>-->
            <li class="filter-item">
              <div class="filter-con">
                <div class="el-input w220 el-input-group el-input--prefix">
                  <!---->
                  <el-input v-model.trim="search" placeholder="接收公司/车辆/五联单">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" class="button-type" @click="show">
                  <span>查询</span>
                </button>-->
                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                  <span>查询</span></el-button>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
               <!-- <button type="button" class="button-type" @click="basiReportList()">
                  <span>导出</span>
                </button>-->
                <el-button type="button" size="medium"  @click="basiReportList" class="el-button el-button--primary">
                  <span>导出</span></el-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="total-number" style="margin-left: 20px">
        <div class="total-name">
          全部企业
          <span class="num">{{entTotal.total}}</span>家
        </div>
        <div class="total-text">
          正常企业
          <span class="num">{{entTotal.normal}}</span>家
        </div>
        <div class="total-text is-offline">
          离线企业
          <span class="num">{{entTotal.offLine}}</span>家
        </div>
      </div>-->
      <table class="table-default">
        <thead>
          <tr>
            <th style="text-align:center;width: 6%">序号</th>
            <th style="text-align:center;width: 14%">移出企业</th>
            <th style="text-align:center;width: 10%">转运车辆</th>
            <th style="text-align:center;width: 10%">五联单号</th>
            <th style="text-align:center;width: 10%">接收企业</th>
            <th style="text-align:center;width: 10%">重量(KG)</th>
            <th style="text-align:center;width: 10%">完成时间</th>
            <th style="text-align:center;width: 10%">运输时长</th>
            <th style="text-align:center;width: 10%">状态</th>
            <!-- <th style="text-align:center;width: 10%">异常信息</th> -->
            <th style="text-align:center;width: 10%">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i)  in tableDatas">
            <td style="text-align:center;width: 6%">{{item.rowNo}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.moveOutEntName"
            >{{item.moveOutEntName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.carNo"
            >{{item.carNo}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.fiveNo"
            >{{item.fiveNo}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.receiveEntName"
            >{{item.receiveEntName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.transportNumber"
            >{{item.transportNumber}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.completeTime"
            >{{item.completeTime}}</td>
            <!-- <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.monitorType"
            >
              <div
                :class="item.monitorType=='正常'?'text-state':'text-state state-off'"
              >{{item.monitorType}}</div>
            </td>-->
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.yssc"
            >{{item.yssc}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.status"
            >{{item.status}}</td>
            <!-- <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.exceptionMsg"
            >{{item.exceptionMsg}}</td>-->
            <td style="text-align:center;width: 10%">
              <a
                href="javascript:;"
                class="text-primary text-underline"
                @click="showDetails(item.id)"
              >转运详情</a>
              <a href="javascript:;" class="text-primary text-underline" @click="playback(item)">回放</a>
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
    <el-dialog
      :modal="true"
      :modal-append-to-body="false"
      title="转运危废详情"
      :visible.sync="dialogTableVisible"
      width="600px"
    >
      <div class="company-hd" style="padding-bottom: 14px">
        <div class="company-logo" style="float: left;">
          <img
            style="width: 100px;
    height: 60px;"
            src="http://59.110.152.155:8000/group1/M00/00/17/rBGuPF7PJ5uAHTJYAAV7fB4Ykps780.jpg"
            class="logo-sub"
          />
        </div>
        <div class="company-title">
          <!--<el-tooltip class="item" effect="dark" :content="entMapInfo.name" placement="top-start">-->
          <div style="height:21px">{{showDetailsData.carNo}}</div>
          <span style="position: absolute;right: 20px;">五联单号:{{showDetailsData.fiveNo}}</span>
          <div style="height:25px">{{showDetailsData.driverEntName}}</div>
          <!--</el-tooltip>-->
        </div>
      </div>
      <el-divider style="margin: 0px;"></el-divider>
      <div style=" padding-top: 6px;
      display: inline-flex;
    padding-bottom: 6px;">
        <div
          style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
     border-color: #0190DA;
    margin-right: 8px;height: 23px;
"
        >
          <img src="../../../../static/css/images/map/yichu@2x.png" style="height: 11px;" />
          <span style="color: #0190DA;">移出</span>
        </div>
        <div>
          <b>{{showDetailsData.moveEntName}}</b>
        </div>
        <div
          style="width: 70px; text-align: center;
    border: 1px solid;
    border-radius: 30px;
     border-color: #F7B844;
    margin-left: 40px;margin-right: 8px;height: 23px;"
        >
          <img src="../../../../static/css/images/map/jieshou@2x.png" style="height: 11px;" />
          <span style="color: #F7B844;">接收</span>
        </div>
        <div>
          <b>{{showDetailsData.acceptEntName}}</b>
        </div>
      </div>
      <el-divider style="margin: 0px;"></el-divider>
      <table class="table-default">
        <thead></thead>
        <tbody>
          <tr v-for="(item,i)  in showDetailsData.transInfoVos">
            <td style="text-align:center;width: 6%">{{item.dictCode}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.storageTime"
            >{{item.dictName}}</td>
            <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.operationType"
            >{{item.weight}}kg</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script>
import downloadFile from "../../common/unit/DownloadFile";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "VideoMonitor",
  components: { downloadFile, BreadcrumbComponent},
  data() {
    return {
      routePath: this.$route.path,
      value1: "",
      isDisabled: false,
      Transdata: {
        carVo: {
          carNo: "京A33334",
          entName: "清洁之光运输有限公司",
          carModel: "",
          driver: "张伟",
          driverPhone: "13999222233"
        }
      },
      showDetailsData: {},
      dialogTableVisible: false,
      tableDatas1: [
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" },
        { dictCode: "HW08", dictName: "矿物废油", weight: "40" }
      ],
      entTypes: [],
      monitorTypes: [
        { value: -1, label: "全部" },
        { value: 1, label: "正常" },
        { value: 2, label: "异常" }
      ],
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      regionCode: sessionStorage.getItem("regionCode"), //[],
      monitorType: -1,
      entType: "",
      search: "",
      entTotal: {},
      regionLevel: sessionStorage.getItem("regionLevel")
    };
  },
  created: function() {
    if (this.regionLevel == 3) {
      this.isDisabled = true;
    }
    this.selectwfTypeList();
    this.getRegionChildrenList();
    this.loadingData();
  },
  methods: {
    jumpAddress(adress, entId, entName, regionName) {
      if (null != adress && adress != "") {
        this.$router.push({
          path: "/" + adress,
          query: {
            entId: entId,
            entName: entName,
            regionName: regionName
          }
        });
      }
    },
    playback(item) {
      sessionStorage.setItem("winTranInfo",JSON.stringify(item));
      this.$router.push({
        path: "transferPlanLiveMap1",
        query: { showWhen: true }
      });
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.loadingData();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.loadingData();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    show() {
      this.cur_page = 1;
      this.loadingData();
    },
    showDetails(planId) {
      var _this = this;
      var url =
        "/api/regulatory/tEnterpriseTransferStandingBook/selectWfzyDetails?planId=" +
        planId;
      _this.$axios
        .get(url)
        .then(response => {
          if (response.code == 0) {
            _this.showDetailsData = response.data;
            _this.dialogTableVisible = true;
          } else {
            // console.log(response.msg);
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    loadingData() {
      var _this = this;
      let startTime = _this.value1 ? _this.value1[0] : null;
      let endTime = _this.value1 ? _this.value1[1] : null;
      var url =
        "/api/regulatory/tEnterpriseTransferStandingBook/selectZyPlanHistory";
      _this.$axios
        .post(url, {
          page: _this.cur_page,
          limit: _this.pageSize,
          key: _this.search,
          typeId: _this.entType,
          startTime: startTime,
          endTime: endTime
        })
        .then(response => {
          if (response.code == 0) {
            _this.tableDatas = [];
            _this.tableDatas = response.data.records;
            _this.total = response.data.total;
            _this.totalPage = response.data.pages;
          } else {
            // console.log(response.msg);
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    basiReportList() {
      var _this = this;
      let startTime = _this.value1 ? _this.value1[0] : null;
      let endTime = _this.value1 ? _this.value1[1] : null;
      let url =
        "/api/regulatory/tEnterpriseTransferStandingBook/exportZxgchsList";
      _this.$axios
        .post(
          url,
          {
            page: _this.cur_page,
            limit: _this.pageSize,
            key: _this.search,
            typeId: _this.entType,
            startTime: startTime,
            endTime: endTime
          },
          { responseType: "blob" } // 1.首先设置responseType对象格式为 blob:
          // {responseType: 'arraybuffer'}
        )
        .then(function(response) {
          downloadFile(response);
        })
        .catch(function() {
          _this.$message.info("导出异常,请重试!");
        });
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/regionInfo/getRegionChildrenList", {
          params: {
            regionCode: _this.regionCode
          }
        })
        .then(function(res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
            //_this.regionCode = [res.data[0].value + ""];
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    selectwfTypeList() {
      var _this = this;
      _this.$axios
        .get("/api/regulatory/tEnterpriseTransferStandingBook/selectwfTypeList")
        .then(function(res) {
          if (res.code == 0) {
           
            let harzardousTypeList= sessionStorage.getItem('harzardousTypeList')
                            let harzardousList = JSON.parse(harzardousTypeList)
                           
                           res.data.forEach((item)=>{
            harzardousList.forEach(ele=>{
                if(item.name==ele.typeName){
item.dicTypeExplain=ele.dicTypeExplain
                }
            })      
                           })     
                          
              let filteredList = res.data.filter(item=>{
              
                  if(item.dicTypeExplain!=undefined ){
                      return item
                  }
                   
                });   
                 _this.entTypes = filteredList;
                        //  _this.vfTypeList =  filteredList 
						 
						 
            //_this.regionCode = [res.data[0].value + ""];
          }
        })
        .catch(error => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    closeData() {
      var _this = this;
    },
    searchRegionChange() {
      let regionInfo = this.$refs.regionElCascader.getCheckedNodes();
      if (regionInfo.length > 0) {
        this.regionCode = regionInfo[0].value;
      }
      /*console.log(this.search.regionCode+"<<<当前省/市/区");*/
    }
  }
};
</script>

<style>
.el-divider--horizontal {
  margin: 0px;
}
</style>
