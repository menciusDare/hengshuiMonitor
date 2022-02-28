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
              <div class="filter-btn">
                <el-button type="button" size="medium"  :loading="showLoading" @click="goShow" class="el-button el-button--primary">
                  <span>开始计算</span></el-button>
                <el-button type="button" size="medium"  :loading="showLoading" @click="goShow" class="el-button el-button--primary">
                  <span>重新计算</span></el-button>
                <el-button type="button" size="medium"  @click="show" class="el-button el-button--primary">
                  <span>停止</span></el-button>

              </div>
            </li>
            <li class="filter-item">
              <el-input v-model="number" style="font-weight: bolder;font-size: 23px;color: black !important;" :disabled="true"></el-input>
            </li>
          </ul>
        </div>
      </div>

      <table class="table-default" v-loading="showLoading">
        <thead>
        <tr>
          <th style="text-align:center;width: 6%">序号</th>
          <th style="text-align:center;width: 14%">企业名称</th>
          <th style="text-align:center;width: 10%">企业类型</th>
          <th style="text-align:center;width: 10%">市</th>
          <th style="text-align:center;width: 10%">区县</th>
          <th style="text-align:center;width: 10%">排污许可证数量(吨)</th>
          <th style="text-align:center;width: 10%">年产废数量(吨)</th>
          <th style="text-align:center;width: 10%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,i)  in tableDatas">
          <td style="text-align:center;width: 6%">{{getIndex(i)}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 14%"
              :title="item.entName"
          >{{item.entName}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.entType"
          >{{item.entType}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.city"
          >{{item.city}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.area"
          >{{item.area}}</td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.solidWasteOutput"
          >
            <span v-if="item.solidWasteOutput!=null" >{{item.solidWasteOutput}}</span>
            <span v-else style="color:red">未申报</span>
          </td>
          <td
              style="text-align:center;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;width: 10%"
              :title="item.yearOutput"
          >
            <span v-if="item.yearOutput!=null" :style="item.yearOutput!=null && item.yearOutput> item.solidWasteOutput?'color:red;':'' ">{{item.yearOutput}}</span>
            <span v-else style="color:red">未上报数据</span>
          </td>
          <td style="text-align:center;width: 10%">
            <a
                href="javascript:;"
                class="text-primary text-underline"
                @click="lookInfo(item)"
            >查看</a>
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
      <el-dialog
          :title="entName"
          :visible.sync="entInfoSolidDialogVisible"
          :close-on-press-escape = "false"
          :close-on-click-modal = "false"
          :modal-append-to-body = "false"
          width="60%"
          :before-close="handleClose">
        <!--添加企业-->
        <!-- <entInfoSolid ref="entInfoSolid"></entInfoSolid> -->
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import entInfoSolid from './entInfoSolid'
import RegionList from '../../../components/common/unit/RegionList.vue'
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "pageList",
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
        entName:""
      },
      regionCode:[],
      entInfoSolidDialogVisible:false,
      entName:"",
      showLoading:false,
      number:"已计算:0个",
      nowNumber:0,
      timer: '',
    }
  },
  methods: {
    regionChange(value) {
      this.regionCode = value
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
    goShow(){
      clearInterval(this.timer)
      this.nowNumber = 0;
      this.total = 0;
      this.tableDatas = [];
      this.cur_page = 1;
      this.showLoading=true;
      this.timer = setInterval(this.getNumber, 1000);
    },
    getNumber() {
      this.nowNumber ++;
      this.number = "已计算:"+this.nowNumber+"个"
      // console.log(this.nowNumber)
    },
    show() {
      clearInterval(this.timer)
      this.cur_page = 1;
      this.loadingData();
    },
    handleClose(){
      this.$refs.entInfoSolid.dataList=[];
      this.entInfoSolidDialogVisible=false
    },
    lookInfo(item){
      this.entName = item.entName;
      this.entInfoSolidDialogVisible = true;
      this.$nextTick(()=>{
        // 操作
        this.$refs.entInfoSolid.loadingData(item);
      });
    },
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/permit/getPermitEntPage";
      let params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append('regionCode',this.regionCode);
      params.append('total',_this.nowNumber);
      params.append('entName',_this.search.entName);
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
    clearInterval(this.timer)
  }
}
</script>

<style scoped>

</style>