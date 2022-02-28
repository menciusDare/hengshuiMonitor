<template>
  <!-- 内容区域 -->
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div>
          <ul class="filter-box">
            <li class="filter-item" style="margin-right: 10px;">
              <div class="filter-label" style="line-height: 35px">计划状态：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <el-select v-model="status" clearable placeholder="全部" style="width: 120px;height: 35px">
                    <el-option style="height: 35px" v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
            </li>
            <li class="filter-item" style="width: 430px;margin-right: 0px">
              <div class="filter-label" style="line-height: 35px">计划转移日期：</div>
              <div class="filter-con">
                <div class="el-select w124">
                  <div class="el-input el-input--suffix">
                    <el-date-picker style="width: 300px;height: 35px" v-model="tiem" value-format="yyyy-MM-dd" type="daterange" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                </div>
              </div>
            </li>
            <li class="filter-item" style="height: 35px;margin-right: 0px">
              <div class="filter-label" style="line-height: 35px">企业名称：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">

                  <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                  </span>
                  <!--                                    <input type="text" autocomplete="off" placeholder="搜索企业名称"-->
                  <!--                                  class="el-input__inner">-->
                  <el-input style="height: 35px;width: 160px" autocomplete="off" v-model.trim="entName" placeholder="搜索企业名称"></el-input>

                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label" style="line-height: 35px">五联单编号：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input--prefix">

                  <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i>
                  </span>
                  <!--                                    <input type="text" autocomplete="off" placeholder="搜索企业名称"-->
                  <!--                                  class="el-input__inner">-->
                  <el-input style="height: 35px;width: 160px" autocomplete="off" v-model.trim="fiveNo" placeholder="搜索五联单编号"></el-input>

                </div>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!-- <button type="button" class="button-type" @click="show">
                                    <span>查询</span></button>-->
                <el-button type="button" size="medium" @click="show" class="el-button el-button--primary">
                  <span>查询</span>
                </el-button>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-btn">
                <!--<button type="button" class="button-type" @click="basiReportList">
                                    <span>导出</span></button>-->
                <el-button type="button" size="medium" @click="basiReportList" class="el-button el-button--primary">
                  <span>导出</span>
                </el-button>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div class="total-number" style="margin-left: 0px">
                    <div class="total-name">已找到 {{total}} 条计划</div>
                    <div style="margin-left: 20px">
                        <el-button type="primary" size="mini"  @click="basiReportList">
                            <i class="el-icon-upload2"></i>导出</el-button></div>
                </div> -->
        <table class="table-default">
          <thead>
            <tr>
              <th style="text-align:center;width: 6%">序号</th>
              <th style="text-align:center;width: 10%">申请编号</th>
              <th style="text-align:center;width: 9%">计划转移日期</th>
              <!--    <th style="text-align:center;width: 8%">废物代码</th>
                        <th style="text-align:center;width: 8%">废物名称</th>-->
              <th style="text-align:center;width: 10%">转移数量(KG)</th>
              <th style="text-align:center;width: 8%">产废企业</th>
              <!--   <th style="text-align:center;width: 8%">转运企业</th>-->
              <th style="text-align:center;width: 8%">接收企业</th>
              <th style="text-align:center;width: 8%">当前状态</th>
              <th style="text-align:center;width: 8%">完成时间</th>
              <th style="text-align:center;width: 10%">五联单号</th>
              <th style="text-align:center;width: 7%">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index)  in tableData">

              <td style="text-align:center;width: 5%">{{getIndex(index)}}</td>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.applicationNo">{{item.applicationNo}}</td>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 9%" :title="formatterDate(item.transportDate,'yyyy-MM-dd')">{{formatterDate(item.transportDate,"yyyy-MM-dd")}}</td>
              <!--    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.dictDetailCode">{{item.dictDetailCode}}</td>
                        <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.dictDetailName">{{item.dictDetailName}}</td>-->
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.transportNumber">{{item.transportNumber}}</td>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.productionEnterprise">{{item.productionEnterprise}}</td>
              <!--  <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.transportEnterprise">{{item.transportEnterprise}}</td>-->
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.acceptEnterprise">{{item.acceptEnterprise}}</td>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="statusType(item.status)">
                <div v-if="item.status==0" class="text-state state-off">{{statusType(item.status)}}</div>
                <div v-if="item.status==1" class="text-state">{{statusType(item.status)}}</div>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="formatterDate(item.completeTime,'yyyy-MM-dd hh:mm:ss')">
                {{formatterDate(item.completeTime,"yyyy-MM-dd hh:mm:ss")}}
              </td>
              <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%" :title="item.fiveNo">{{item.fiveNo}}</td>
              <td style="text-align:center;width: 7%">
                <div class="btn-opreate">
                  <a href="javascript:;" class="text-primary text-underline" @click="openDialog(item)">详情</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="el-pagination is-background mt-lg">
          <span class="el-pagination__total">共 {{total}} 条，每页显示</span>

          <span class="el-pagination__sizes">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="cur_page" :page-sizes="pageSizes" :page-size="pageSize" layout="sizes, prev, pager, next" :total="total">
            </el-pagination>
          </span>

          <span class="el-pagination__total">共 {{totalPage}} 页</span>
        </div>
      </div>
    </div>
    <!--详情弹框-->
    <div>
      <el-dialog :modal-append-to-body="false" custom-class="openCla" :title="'编号'+formDate.applicationNo" :visible.sync="centerDialogVisibleOpen" width="50%" @close="closeData">
        <div style="font-size: 14px;color: #222;">
          <div style="border-bottom:1px dashed #adadad;padding-bottom: 25px">
            <div>
              产废企业名称：{{formDate.productionEnterprise}}
            </div>
            <div>
              <table style="table-layout: fixed;width:74%;word-wrap:break-word;">
                <thead>
                  <tr style="height: 40px;">
                    <th style="text-align:center;width: 8%">危废名称</th>
                    <th style="text-align:center;width: 8%">危废类别</th>
                    <th style="text-align:center;width: 8%">危废代码</th>
                    <th style="text-align:center;width: 8%">申请数量</th>
                    <th style="text-align:center;width: 8%">包装方式</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="height: 25px;" v-for="(ite,index)  in formDate.vos">
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                      {{ite.dictDetailName}}
                    </td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                      {{ite.dicType}}
                    </td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                      {{ite.dictDetailCode}}
                    </td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                      {{ite.weight}}
                    </td>
                    <td style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 8%">
                      {{ite.storageType}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style="margin-top: 10px">
              计划转移时间：{{formatterDate(formDate.transportDate,"yyyy-MM-dd")}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{formDate.handledBy}}：{{formDate.contactsPhone}}
            </div>
          </div>
          <div style="border-bottom:1px dashed #adadad;padding-bottom: 25px;margin-top: 10px">
            <div>
              转运企业名称：{{formDate.transportEnterprise}}
            </div>
            <div>
              <table style="table-layout: fixed;width:74%;word-wrap:break-word;">
                <colgroup>
                  <col style="width: 180px">

                  </col>
                  <col style="width: 105px">

                  </col>
                  <col style="width: 200px">

                  </col>
                  <col style="width: 60px">

                  </col>
                  <col style="width: 120px">

                  </col>
                </colgroup>
                <tr style="height: 40px;">
                  <td rowspan="4">
                    <div style="padding-top: 10px;">
                      <img :src="carImg" style="width: 160px;height: 150px;float: left" />
                      <img :src="carUserImg" style="width: 60px;height: 60px;position:relative;float: left;margin-left: -60px;margin-top: 90px" />
                    </div>
                  </td>
                  <th style="text-align: right">
                    车辆型号：
                  </th>
                  <td>
                    {{formDate.carModel}}
                  </td>
                  <th style="text-align: right">
                    驾驶员：
                  </th>
                  <td>
                    {{formDate.driver}}
                  </td>
                </tr>
                <tr style="height: 40px;">

                  <th style="text-align: right">
                    车 牌 号：
                  </th>
                  <td>
                    {{formDate.carNo}}
                  </td>
                  <th style="text-align: right">
                    手机号：
                  </th>
                  <td>
                    {{formDate.driverPhone}}
                  </td>
                </tr>
                <tr style="height: 40px;">

                  <th style="text-align: right">
                    准运种类：
                  </th>
                  <td>
                    {{formDate.transportClass}}
                  </td>
                </tr>
                <tr style="height: 40px;">

                  <th style="text-align: right">
                    有效载荷：
                  </th>
                  <td>
                    {{formDate.payload}}
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <!------------------->
          <div style="margin-top: 10px">
            <div>
              接收企业名称： {{formDate.acceptEnterprise}}
            </div>
            <div>
              <table style="width:74%;">
                <colgroup>
                  <col style="width: 45px;">

                  </col>
                  <col style="width: 35px">

                  </col>
                  <col style="width: 35px">

                  </col>
                  <col style="width: 98px">

                  </col>
                </colgroup>
                <tr style="height: 40px;">
                  <th style="text-align: right">
                    负责人：
                  </th>
                  <td>
                    {{formDate.receiveUser}}
                  </td>
                  <th style="text-align: right">
                    联系方式：
                  </th>
                  <td>
                    {{formDate.receivePhone}}
                  </td>
                </tr>
                <tr style="height: 40px;">

                  <th style="text-align: right">
                    许可经营类别：
                  </th>
                  <td colspan="3">
                    {{formDate.businessType}}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div style="text-align: center;margin-top: 10px">
          <el-button type="primary" @click="updateByStatus(formDate.id)" v-show="formDate.status==0">通 过</el-button>
          <el-button type="primary" plain @click="centerDialogVisibleOpen = false" v-show="formDate.status==0">拒 绝</el-button>
          <el-button type="primary" plain @click="centerDialogVisibleOpen = false" v-show="formDate.status==1">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import downloadFile from "../../common/unit/DownloadFile";
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "TransferCityProvince",
  components: {
    downloadFile,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      entName: '',
      time: '',
      options: [
        { label: '未开始', value: '0' },
        { label: '已完成', value: '1' }
      ],
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableData: [],
      total: 0,
      totalPage: 0,
      tiem: ['', ''],
      status: "",
      fiveNo: "",
      centerDialogVisibleOpen: false,
      titleNo: '',
      formDate: {
        id: null,
        productionEnterprise: '',
        transportEnterprise: '',
        acceptEnterprise: '',
        dictDetailName: '',
        dictType: '',
        dictDetailCode: '',
        transportNumber: '',
        packingType: '',
        transportDate: '',
        handledBy: '',
        contactsPhone: '',
        carModel: '',
        driver: '',
        driverPhone: '',
        transportClass: '',
        payload: '',
        receiveUser: '',
        receivePhone: '',
        businessType: '',
        applicationNo: '',
        locationUrl: '',
        thumbnailUrl: '',
        driverCorrelationId: '',
        vos: []
      },
      imgUrl: 'http://59.110.152.155:8000/',
      carImg: '../../../../static/css/images/pic/qiye01.jpg',
      carUserImg: '../../../../static/css/images/pic/qiye-person.jpg',
      regionCode: sessionStorage.getItem('regionCode'),
    }
  },
  created: function () {
    this.loadingData();
  },
  methods: {
    //KG转换吨
    getDun: function (str) {
      if (null == str || str == '') {
        return 0;
      } else {
        let number = str / 1000;
        return number.toFixed(2);
      }
    },
    //导出
    basiReportList() {
      var _this = this;
      var params = new URLSearchParams();
      params.append('page', _this.cur_page);
      params.append('size', _this.pageSize);
      params.append('type', 2);
      params.append('entName', _this.entName);
      params.append('status', _this.status);
      if (null != _this.tiem) {
        params.append('startTime', _this.tiem[0]);
        params.append('endTime', _this.tiem[1]);
      }
      params.append('fiveNo', _this.fiveNo);
      params.append('regionCode', _this.regionCode);
      // let url = "http://localhost:8006/tEnterpriseTransportPlan/export";
      let url = "/api/regulatory/tEnterpriseTransportPlan/export";
      _this.$axios.post(url, params,
        { responseType: "blob" }// 1.首先设置responseType对象格式为 blob:
        // {responseType: 'arraybuffer'}
      ).then(function (response) {
        downloadFile(response);
      }).catch(function () {
        _this.$message.info("导出异常,请重试!");
      })
    },
    openDialog: function (item) {
    //   this.formDate = item;
      let url = "/api/regulatory/tEnterpriseTransportPlan/getPlanInfo/" + item.id
      this.$axios.get(url).then(res => {
        // console.log(res);
        this.formDate = res.data
        // this.getImgList();
        this.centerDialogVisibleOpen = true;
      })
    },
    //查询企业图片信息
    getImgList() {
      var _this = this;
      // let url = "http://localhost:8006/tEnterpriseTransportPlan/getImgList/"+_this.formDate.driverCorrelationId;
      let url = "/api/regulatory/tEnterpriseTransportPlan/getImgList/" + _this.formDate.driverCorrelationId;
      _this.$nextTick(() => {
        _this.$axios.post(url).then((response) => {
          if (response.code == 0) {
            for (let i = 0; i < response.data.length; i++) {
              if (response.data[i].type == 3) {
                _this.carImg = response.data[i].locationUrl;
              }
              if (response.data[i].type == 4) {
                _this.carUserImg = response.data[i].locationUrl;
              }
            }
            // _this.imgList = response.data;
          }
        }).catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
      })
    },
    formatterDate(value, str) {
      if (value != null) {
        let val = new Date(value).format(str);
        return val;
      } else {
        return '--';
      }
    },
    statusType: function (sta) {
      if (0 == sta) {
        return "未开始"
      }
      if (1 == sta) {
        return "已完成"
      }
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
      return (index + 1) + (curPage - 1) * limitPage;
    },

    show() {
      this.cur_page = 1;
      this.tableData = [];
      this.loadingData();
    },
    loadingData() {
      var _this = this;
      // let url = "http://localhost:8006/tEnterpriseTransportPlan/getTranByParams";
      let url = "/api/regulatory/tEnterpriseTransportPlan/getTranByParams";
      let params = new URLSearchParams();
      params.append('page', _this.cur_page);
      params.append('size', _this.pageSize);
      params.append('type', 2);
      params.append('entName', _this.entName);
      params.append('status', _this.status);
      if (null != _this.tiem) {
        params.append('startTime', _this.tiem[0]);
        params.append('endTime', _this.tiem[1]);
      }
      params.append('fiveNo', _this.fiveNo);
      params.append('regionCode', _this.regionCode);
      _this.$nextTick(() => {
        _this.$axios.post(url, params).then((response) => {
          if (response.code == 0) {
            _this.total = response.data.total;
            _this.tableData = response.data.records;
            _this.totalPage = response.data.pages;
          }
        }).catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
      })
    },
    //修改通过状态
    updateByStatus: function (id) {
      let _this = this;
      // let url = "http://localhost:8006/tEnterpriseTransportPlan/updateByStatus/";
      let url = "/api/regulatory/tEnterpriseTransportPlan/updateByStatus/";
      _this.$axios.post(url + id).then(function (res) {
        if (res.code == 0) {
          _this.$message.success('通过成功！');
          _this.centerDialogVisibleOpen = false;
          _this.cur_page = 1;
          _this.loadingData();
        } else {
          _this.$message.error(res.msg);
        }
      }).catch((error) => {
        // catch 指请求出错的处理
        // console.log(error);
      })
    },
    closeData() {
      var _this = this;
      _this.centerDialogVisibleOpen = false;
      // _this.carImg = '';
      // _this.carUserImg = '';
      _this.formDate = {
        id: null,
        productionEnterprise: '',
        transportEnterprise: '',
        acceptEnterprise: '',
        dictDetailName: '',
        dictType: '',
        dictDetailCode: '',
        transportNumber: '',
        packingType: '',
        transportDate: '',
        handledBy: '',
        contactsPhone: '',
        carModel: '',
        driver: '',
        driverPhone: '',
        transportClass: '',
        payload: '',
        receiveUser: '',
        receivePhone: '',
        businessType: '',
        applicationNo: '',
        locationUrl: '',
        thumbnailUrl: '',
        driverCorrelationId: '',
        vos: []
      };
    }
  },
}
</script>

<style>
.tdOolor {
  width: 70px;
  height: 20px;
  background: rgba(96, 96, 96, 0.65);
  text-align: center;
}
.tdOolorAs {
  width: 70px;
  height: 20px;
  background: #67c23aa6;
  text-align: center;
}
.el-select .te input {
  height: 40px;
}
</style>
