<template>
  <!-- 主体 -->
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box">
            <li class="filter-item">
              <div class="filter-label">所在地：</div>
              <div class="filter-con">
                <div class="el-select w160">
                  <RegionList @RegionChange="regionChange"></RegionList>
                </div>
              </div>
            </li>
<!--            <li class="filter-item">
              <div class="filter-label">企业名称：</div>
              <div class="filter-con">
                <div class="el-input w180 el-input-group el-input&#45;&#45;prefix">
                  &lt;!&ndash;&ndash;&gt;
                  <el-input v-model="search.entName" placeholder="请输入企业名称">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                  </el-input>
                </div>
              </div>
            </li>-->
            <li class="filter-item">
              <div class="filter-label">备案/登记：</div>
              <div class="filter-con" style="padding-top: 8px;">
                <el-checkbox @change="show" v-model="search.businessRecord">工商备案</el-checkbox>
                <el-checkbox @change="show" v-model="search.permitRecord">排污许可证登记</el-checkbox>
                <el-checkbox @change="show" v-model="search.cityRecord">市平台备案</el-checkbox>
                <el-checkbox @change="show" v-model="search.provinceRecord">省平台备案</el-checkbox>
              </div>
            </li>
            <li class="filter-item">
              <div class="filter-label">状态：</div>
              <div class="filter-con" style="padding-top: 8px;">
                <el-radio @change="show" v-model="search.status" label="">全部</el-radio>
                <el-radio @change="show" v-model="search.status" label="0">正常</el-radio>
                <el-radio @change="show" v-model="search.status" label="1">异常</el-radio>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="total-number" style="margin-left: 3px;">
          <div class="total-name">共{{totalAll}}家企业</div>
          <div class="total-text " style="margin-left: 15px;">正常<span class="num" style="color:green">{{normal}}</span></div>
          <div class="total-text is-offline">异常<span class="num" style="color:red">{{abnormal}}</span></div>
      </div>
      <table class="table-default" v-loading="showLoading">
        <thead>
        <tr>
          <th style="text-align:center;width: 6%">序号</th>
          <th style="text-align:center;width: 24%">企业名称</th>
          <th style="text-align:center;width: 10%">市</th>
          <th style="text-align:center;width: 20%">区县</th>
          <th style="text-align:center;width: 10%">工商备案</th>
          <th style="text-align:center;width: 10%">排污许可证登记</th>
          <th style="text-align:center;width: 10%">市平台备案</th>
          <th style="text-align:center;width: 10%">省平台备案</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i)  in tableDatas">
          <td style="text-align:center;width: 6%">{{getIndex(i)}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 24%"
              :title="item.entName"
          >{{item.entName}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.city"
          >{{item.city}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 20%"
              :title="item.area"
          >{{item.area}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.businessRecord"
          >
            <span v-if="item.businessRecord==1" style="color: green">已备案</span>
            <span v-else style="color:red">未备案</span>
          </td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.permitRecord"
          >
            <span v-if="item.permitRecord==1" style="color: green">已登记</span>
            <span v-else style="color:red">未登记</span>
          </td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.cityRecord"
          >
            <span v-if="item.cityRecord==1" style="color: green">已备案</span>
            <span v-else style="color:red">未备案</span>
          </td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.provinceRecord"
          >
            <span v-if="item.provinceRecord==1" style="color: green">已备案</span>
            <span v-else style="color:red">未备案</span>
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
</template>

<script>
import RegionList from '../../../components/common/unit/RegionList.vue'
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "entRecord",
  components: {
    RegionList,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      search:{
        entName:"",
        status:"",
        businessRecord:false,
        permitRecord:false,
        cityRecord:false,
        provinceRecord:false
      },
      regionCode:[],
      totalAll:0,
      normal:0,
      abnormal:0,
      showLoading: false
    }
  },
  methods: {
    regionChange(value) {
      this.regionCode = value
      this.show()
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.showLoading=true;
      this.loadingData();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.showLoading=true;
      this.loadingData();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    show() {
      this.cur_page = 1;
      this.showLoading=true;
      // 全部
      this.loadingData();
      // 全部
      this.getNormalOrAbnormalTotal("").then(val=>{
        this.totalAll = val.total;
      }).catch(error => {
        this.totalAll = 0;
      });
      // 正常
      this.getNormalOrAbnormalTotal(0).then(val=>{
          this.normal = val.total;
      }).catch(error => {
          this.normal = 0;
      });
      // 异常
      this.getNormalOrAbnormalTotal(1).then(val=>{
        this.abnormal = val.total;
      }).catch(error => {
        this.abnormal = 0;
      });
    },
    getNormalOrAbnormalTotal(status){
      var _this = this;
      return new Promise((resolve, reject) => {
      var url = "/api/regulatory/permit/getEntRecordAnalysisPage";
      let params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append('regionCode',this.regionCode);
      params.append('entName',_this.search.entName);
      params.append('status',status);
      params.append('businessRecord',_this.search.businessRecord?1:"");
      params.append('permitRecord',_this.search.permitRecord?1:"");
      params.append('cityRecord',_this.search.cityRecord?1:"");
      params.append('provinceRecord',_this.search.provinceRecord?1:"");
      _this.$axios
          .get(url, { params })
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            // catch 指请求出错的处理
            resolve(error);
            // console.log(error);
          });
      })
    },
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/permit/getEntRecordAnalysisPage";
      let params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append('regionCode',_this.regionCode);
      params.append('entName',_this.search.entName);
      params.append('status',_this.search.status);
      params.append('businessRecord',_this.search.businessRecord?1:"");
      params.append('permitRecord',_this.search.permitRecord?1:"");
      params.append('cityRecord',_this.search.cityRecord?1:"");
      params.append('provinceRecord',_this.search.provinceRecord?1:"");
      _this.$axios
          .get(url, { params })
          .then(response => {
            if (response.code == 0) {
              _this.showLoading=false;
              _this.tableDatas = response.data.records;
              _this.total = response.data.total;
              _this.totalPage = response.data.pages;
            } else {
              _this.showLoading=false;
              // console.log(response.msg);
            }
          })
          .catch(error => {
            _this.showLoading=false;
            // catch 指请求出错的处理
            // console.log(error);
          });
    },
    getRegionChildrenList() {
      var _this = this;
      _this.$axios
          .get("/api/regulatory/regionInfo/getRegionChildrenList", {
            params: {
              regionCode: sessionStorage.getItem('regionCode')==null?_this.AppConfig.appInfo.regionCode:sessionStorage.getItem('regionCode')
            }
          })
          .then(function(res) {
            if (res.code == 0) {
              _this.regionOptions = res.data;
              _this.regionCode = [res.data[0].value+''];
              _this.show();
            }
          })
          .catch(error => {
            // console.log(error);
          });
    },
  },
  mounted: function () {

  },
  created() {
    if(this.regionLevel==3){
      this.isDisabled = true;
    }
    this.getRegionChildrenList();
  },
  destroyed() {

  }
}
</script>

<style scoped>

</style>