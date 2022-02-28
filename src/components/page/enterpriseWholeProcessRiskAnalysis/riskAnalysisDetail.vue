<template>
  <!-- 主体 -->
  <div class="main">
    <div class="main-top">
      <div class="breadcrumb">
        <a href="javascript:;" @click="$router.push('/riskAnalysis')">
          <i class="icon icon-jianguan"></i>
          <span class="text-primary-font">企业全过程风险分析</span>
        </a>
        <span class="sep">></span>
        <span class="text-primary">分析详情</span>
      </div>
    </div>
    <div class="panel">
      <div class="panel-hd pdtlr-0">
        <span>分析详情-长春中车轨道车辆有限公司</span>
      </div>
      <div class="panel-bd pdtlr-0">
        <el-row :gutter="20">
          <el-col :span="6" :offset="0" v-for="(item,index) in cardList" :key="index">
            <div class="card-item">
              <div class="title" :style="'color:'+item.textColor">{{item.title}}</div>
              <el-card class="box-card">
                <div class="text item" :style="'color:'+item.textColor">
                  {{item.desc}}
                </div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 生产环节 -->
    <div class="panel mt-20">
      <div class="panel-hd pdtlr-0">
        <span class="hd-title">生产环节</span>
      </div>
      <div class="panel-bd ">
        <div class="desc-info">
          <div class="desc-info-item">
            <span>企业上报台账平均周期：</span>
            <span class="text-success">3.2</span>天
          </div>
          <div class="desc-info-item ml-20">
            <span>最长未更新台账时间：  </span>
            <span class="text-error">14</span>天
          </div>
        </div>
        <!-- <el-radio-group class="mt-15" v-model="productionLink" >
          <el-radio-button label="day">日</el-radio-button>
          <el-radio-button label="week" >周</el-radio-button>
          <el-radio-button label="month" >月</el-radio-button>
        </el-radio-group> -->
        <div class="production-link-chart mt-30" ref="productionLinkChart"></div>
      </div>
    </div>
    <!-- 产废量预测 -->
    <div class="panel mt-20">
      <div class="panel-hd pdtlr-0">
        <span class="hd-title">产废量预测</span>
      </div>
      <div class="panel-bd ">
        <div class="desc-info">
          <div class="desc-info-item">
            <p>
              企业年产废申报量
              <span class="text-primary mx-4">145</span>吨,
              产废量低于
              <span class="text-error mx-4">89%</span>
              同类型企业，产废量期望值为
              <span class="text-error mx-4">180</span>吨
            </p>
          </div>
        </div>
        <el-radio-group class="mt-15" v-model="predictionWasteProduction" @change="togglerPredictionWasteProduction">
          <el-radio-button :label="item" v-for="(item,index) in predictionWasteProductionList" :key="index">
            {{item}}
          </el-radio-button>
        </el-radio-group>
        <div class="prediction-waste-production mt-30" ref="predictionWasteProductionChart"></div>
      </div>
    </div>
    <!-- 贮存环节 -->
    <div class="panel mt-20">
      <div class="panel-hd pdtlr-0">
        <span class="hd-title">贮存环节</span>
      </div>
      <div class="panel-bd ">
        <div class="desc-info">
          <div class="desc-info-item">
            <span> 平均入库周期： </span>
            <span class="text-success">2.4</span>天
          </div>
          <div class="desc-info-item ml-20">
            <span>最长贮存时间：     </span>
            <span class="text-error">0</span>天
          </div>
        </div>
         <el-table
          :data="storageLinkList"
          height="400"
          border
          fit
          style="width: 100%"
          class="mt-20"
      >
        <el-table-column
            prop="dicName"
            label="危废名称">
        </el-table-column>
        <el-table-column
            prop="dicType"
            label="危废类型">
        </el-table-column>
        <el-table-column
            prop="dicCode"
            label="危废编号">

        </el-table-column>
        <el-table-column
            prop="num"
            label="在库数量(吨)">
          <template v-slot="scope">
            <span v-if="scope.row.solidWasteOutput!=null">{{scope.row.num}}</span>
            <span v-else>{{scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="dayNum"
            label="储存时长(天)">
          <template v-slot="scope">
            <span v-if="scope.row.yearOutput!=null">{{scope.row.dayNum}}</span>
            <span v-else>{{scope.row.dayNum}}</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <!-- 转移环节 -->
    <div class="panel mt-20">
      <div class="panel-hd pdtlr-0">
        <span class="hd-title">转移环节</span>
      </div>
      <div class="panel-bd ">
        <div class="desc-info">
          <div class="desc-info-item">
            <span> 企业平均转移周期：  </span>
            <span class="text-success">8.2</span>天
          </div>
          <div class="desc-info-item ml-20">
            <span>经营单位接收平均用时：</span>
            <span class="text-error">4</span>小时
          </div>
        </div>
         <el-table
          :data="transferLinkList"
          height="400"
          border
          fit
          style="width: 100%"
           class="mt-20"
      >
      <el-table-column
            prop="fiveLinked"
            label="五联单编号">
        </el-table-column>
        <el-table-column
            prop="dicName"
            label="危废名称">
        </el-table-column>
        <el-table-column
            prop="dicType"
            label="危废类型">
        </el-table-column>
        <el-table-column
            prop="dicCode"
            label="危废编号">
        </el-table-column>
        <el-table-column
            prop="num"
            label="转移数量（吨）">
        </el-table-column>
        <el-table-column
            prop="date"
            label="转移时间">
        </el-table-column>
        <el-table-column
            prop="entName"
            label="接收单位">
        </el-table-column>
        <el-table-column
            prop="jsdate"
            label="接收时间">
        </el-table-column>
        <el-table-column label="用时（小时）">
          <template v-slot="scope">
            <span :class="scope.$index==0 || scope.$index== 1 ||scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.time}}</span>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <!-- 处置利用环节 -->
     <div class="panel mt-20">
      <div class="panel-hd pdtlr-0">
        <span class="hd-title">处置利用环节</span>
      </div>
      <div class="panel-bd ">
        <div class="desc-info">
          <div class="desc-info-item">
            <span> 处置合同有效期：  </span>
            <span class="text-error">异常</span>
          </div>
          <div class="desc-info-item ml-20">
            <span>吉林省晴天环保科技处理中心有限公司 的处置合同已失效 </span>
            <span class="text-error">失效合同转移仍在继续-06-08</span>
          </div>
        </div>
         <el-table
          :data="disposalUtilizationLinkList"
          height="400"
          border
          fit
          style="width: 100%"
          class="mt-20"
      >
          <el-table-column label="合同编号">
              <template v-slot="scope">
                <span :class="scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.id}}</span>
              </template>
          </el-table-column>
          <el-table-column label="经营单位名称">
            <template v-slot="scope">
              <span :class="scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.entName}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="经营许可证编号">
            <template v-slot="scope">
              <span :class="scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.xkzbh}}</span>
            </template>
          </el-table-column>
          <el-table-column label="合同签订日期">
            <template v-slot="scope">
              <span :class="scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.day}}</span>
            </template>
          </el-table-column>
          <el-table-column label="有效期至">
            <template v-slot="scope">
              <span :class="scope.$index==3 || scope.$index==4 ?'text-error':''" >{{scope.row.day1}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "riskAnalysisDetail",
  components: {},
  data() {
    return {
      productionLink:'day',//生产环节
      predictionWasteProduction:'全部危废',//产废量
      cur_page: 1,
      pageSizes: this.AppConfig.appInfo.pageSizes,
      pageSize: this.AppConfig.appInfo.pageSize,
      tableDatas: [],
      total: 0,
      totalPage: 0,
      regionOptions: [],
      search: {
        entName: "",
        status: "",
        businessRecord: false,
        permitRecord: false,
        cityRecord: false,
        provinceRecord: false,
      },
      regionCode: [],
      totalAll: 0,
      normal: 0,
      abnormal: 0,
      productionLinkChart:null,
      predictionWasteProductionChart:null,
      cardList:[
        {title:'正常',desc:'生产环节',textColor:'#66B171'},
        {title:'异常',desc:'贮存环节',textColor:'#FF2525'},
        {title:'异常',desc:'转移环节',textColor:'#FF2525'},
        {title:'异常',desc:'处置利用环节',textColor:'#FF2525'},
      ],
      // 产废量
      predictionWasteProductionList:[
        '900-252-12',
        '900-299-12',
        '900-023-29',
        '900-041-49',
        '900-200-08',
        '900-006-09',
        '900-014-13',
        '900-052-31',
        '900-019-16',
        '900-249-08',
        '全部危废'
        ],
      storageLinkList:[
        {"dicType":"HW08","dicCode":"900-249-08","dicName":"废机油","num":16.04,"dayNum":0},
{"dicType":"HW09","dicCode":"900-006-09","dicName":"废乳化液","num":4.37,"dayNum":0},
{"dicType":"HW12","dicCode":"900-252-12","dicName":"废打砂灰","num":6.62,"dayNum":0},
{"dicType":"HW12","dicCode":"900-252-12","dicName":"废漆渣","num":1.3,"dayNum":0},
{"dicType":"HW31","dicCode":"900-052-31","dicName":"废铅酸电池","num":4.42,"dayNum":0},
      ],//贮存环节表格数据
      transferLinkList:[
        {"fiveLinked":2021220100047595,"dicCode":"900-249-08","dicType":"HW08","dicName":"废机油","num":16.04,"date":"2021-08-13 14:13:30","entName":"长春市金旺石油化工有限公司","jsdate":"2021-08-13 14:26:53","time":"0:12"},
        {"fiveLinked":2021220100057663,"dicCode":"900-006-09","dicType":"HW09","dicName":"废乳化液","num":4.37,"date":"2021-09-24 16:04:11","entName":"吉林省蓝天固废处理中心有限公司","jsdate":"2021-09-24 16:44:40","time":"0:40"},
        {"fiveLinked":2021220100055114,"dicCode":"900-252-12","dicType":"HW12","dicName":"废打砂灰","num":6.62,"date":"2021-09-13 14:25:05","entName":"吉林省蓝天固废处理中心有限公司","jsdate":"2021-09-13 16:34:37","time":"2:09"},
        {"fiveLinked":2021220100050008,"dicCode":"900-252-12","dicType":"HW12","dicName":"废漆渣","num":1.3,"date":"2021-08-23 17:08:22","entName":"吉林省蓝天固废处理中心有限公司","jsdate":"2021-08-23 17:20:26","time":"0:12"},
        {"fiveLinked":2021220100050702,"dicCode":"900-052-31","dicType":"HW31","dicName":"废铅酸电池","num":4.42,"date":"2021-08-25 16:57:07","entName":"吉林嘉德蓝天环境技术有限公司","jsdate":"2021-08-26 08:35:08","time":"15:32(+1)"},
      ],//转移环节表格数据
      disposalUtilizationLinkList:[
        {id:1,entName:"吉林省蓝天固废处理中心有限公司",xkzbh:2201050001,day:"2021/3/31",day1:"2022/3/15"},
        {id:2,entName:"吉林省厚德再生资源有限公司",xkzbh:2201830085,day:"2021/6/22",day1:"2021/9/24"},
        {id:3,entName:"长春市金旺石油化工有限公司",xkzbh:2201060068,day:"2021/8/11",day1:"2021/11/30"},
        {id:4,entName:"吉林省晴天环保科技处理中心有限公司",xkzbh:2201130128,day:"2021/1/11",day1:"2021/3/15"},
        {id:5,entName:"吉林嘉德蓝天环境技术有限公",xkzbh:2202030145,day:"2021/4/19",day1:"2022/4/30"},
      ],//处置利用环节表格数据
      lineXdata:["1月","2月","3月","4月","5月","6月","7月","8月","9月"],
      lineYdata:[31.79,0,23.071,95.936,43.483,118.137,93.137,105.8102,124.2882],
      lineYdata1:[45.32,31.873,59.932,85.635,68.349,104.883,125.381,120.532,145.364],
    };
  },
  methods: {
    drawBar() {
      this.productionLinkChart = echarts.init(this.$refs.productionLinkChart);
      let option = {
        xAxis: {
          type: 'category',
          data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [31.79,0,23.071,95.936,43.383,118.137,93.137,105.8102,124.2882],
            type: 'bar',
            itemStyle:{
              color:'#5087EC'
            }
          }
        ]
      };
      this.productionLinkChart.setOption(option)
    },
    drawLine(xdata,yData,yData1) {
      this.predictionWasteProductionChart = echarts.init(this.$refs.predictionWasteProductionChart);
      let option = {
        tooltip: {
          trigger: 'axis',
          /*axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }*/
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['实际产废量（吨）', '预测产废量（吨）']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xdata
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '预测产废量（吨）',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            itemStyle:{
              color:'#c0e8e6'
            },
            data: yData
          },
          {
            name: '实际产废量（吨）',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            itemStyle:{
              color:'#b6e576'
            },
            data: yData1
          }
        ]
      };
      this.predictionWasteProductionChart.setOption(option)
    },
    togglerPredictionWasteProduction() {
      if(this.predictionWasteProduction =='900-252-12') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [20.899,0,10.143,56.722,27.94,45.869,51.161,38.272,39.314];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-299-12') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0.018,0,0,0.141,0.029,,0.082,0.0824,0];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-023-29') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0.018,0,0,0.508,0.272,,0.84,0.3474,0.241];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-041-49') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [10.736,0,10.124,33.585,15.162,68.638,40.994,32.2804,80.2532];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-200-08') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,1.416,0,0,0,0,0.928,0];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-006-09') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,1.388,0,0,0,0,13.44,4.37];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-014-13') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,0,0.12,0.08,0.23,0,0,0];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-052-31') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,0,4.86,,3.4,0,4.42,0];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-019-16') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,0,0,0,0,0.06,0,0.11];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='900-249-08') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [0,0,0,0,0,0,0,16.04,0];
        this.lineYdata1 = [];
      }else if(this.predictionWasteProduction =='全部危废') {
        this.lineXdata = ["1月","2月","3月","4月","5月","6月","7月","8月","9月"];
        this.lineYdata = [31.79,0,23.071,95.936,43.483,118.137,93.137,105.8102,124.2882];
        this.lineYdata1 = [45.32,31.873,59.932,85.635,68.349,104.883,125.381,120.532,145.364];
      }
      this.drawLine(this.lineXdata,this.lineYdata,this.lineYdata1);
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.pageSize = val;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.cur_page = 1;
      this.showLoading = true;
      this.loadingData();
    },
    handleCurrentChange(val) {
      this.cur_page = val;
      this.showLoading = true;
      this.loadingData();
    },
    getIndex(index) {
      let curPage = this.cur_page;
      let limitPage = this.pageSize;
      return index + 1 + (curPage - 1) * limitPage;
    },
    show() {
      this.cur_page = 1;
      this.showLoading = true;
      // 全部
      this.loadingData();
      // 全部
      this.getNormalOrAbnormalTotal("")
        .then((val) => {
          this.totalAll = val.total;
        })
        .catch((error) => {
          this.totalAll = 0;
        });
      // 正常
      this.getNormalOrAbnormalTotal(0)
        .then((val) => {
          this.normal = val.total;
        })
        .catch((error) => {
          this.normal = 0;
        });
      // 异常
      this.getNormalOrAbnormalTotal(1)
        .then((val) => {
          this.abnormal = val.total;
        })
        .catch((error) => {
          this.abnormal = 0;
        });
    },
    getNormalOrAbnormalTotal(status) {
      var _this = this;
      return new Promise((resolve, reject) => {
        var url = "/api/regulatory/permit/getEntRecordAnalysisPage";
        var region =
          sessionStorage.getItem("regionCode") == null
            ? _this.AppConfig.appInfo.regionCode
            : sessionStorage.getItem("regionCode");
        if (null != _this.regionCode && _this.regionCode.length > 0) {
          region = _this.regionCode[_this.regionCode.length - 1];
        }
        let params = new URLSearchParams();
        params.append("page", _this.cur_page);
        params.append("limit", _this.pageSize);
        params.append("regionCode", region);
        params.append("entName", _this.search.entName);
        params.append("status", status);
        params.append("businessRecord", _this.search.businessRecord ? 1 : "");
        params.append("permitRecord", _this.search.permitRecord ? 1 : "");
        params.append("cityRecord", _this.search.cityRecord ? 1 : "");
        params.append("provinceRecord", _this.search.provinceRecord ? 1 : "");
        _this.$axios
          .get(url, { params })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            // catch 指请求出错的处理
            resolve(error);
            // console.log(error);
          });
      });
    },
    loadingData() {
      var _this = this;
      var url = "/api/regulatory/permit/getEntRecordAnalysisPage";
      var region =
        sessionStorage.getItem("regionCode") == null
          ? _this.AppConfig.appInfo.regionCode
          : sessionStorage.getItem("regionCode");
      if (null != _this.regionCode && _this.regionCode.length > 0) {
        region = _this.regionCode[_this.regionCode.length - 1];
      }
      let params = new URLSearchParams();
      params.append("page", _this.cur_page);
      params.append("limit", _this.pageSize);
      params.append("regionCode", region);
      params.append("entName", _this.search.entName);
      params.append("status", _this.search.status);
      params.append("businessRecord", _this.search.businessRecord ? 1 : "");
      params.append("permitRecord", _this.search.permitRecord ? 1 : "");
      params.append("cityRecord", _this.search.cityRecord ? 1 : "");
      params.append("provinceRecord", _this.search.provinceRecord ? 1 : "");
      _this.$axios
        .get(url, { params })
        .then((response) => {
          if (response.code == 0) {
            _this.showLoading = false;
            _this.tableDatas = response.data.records;
            _this.total = response.data.total;
            _this.totalPage = response.data.pages;
          } else {
            _this.showLoading = false;
            // console.log(response.msg);
          }
        })
        .catch((error) => {
          _this.showLoading = false;
          // catch 指请求出错的处理
          // console.log(error);
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
        .then(function (res) {
          if (res.code == 0) {
            _this.regionOptions = res.data;
            _this.regionCode = [res.data[0].value + ""];
            _this.show();
          }
        })
        .catch((error) => {
          // console.log(error);
        });
    },
  },
  created() {
    if (this.regionLevel == 3) {
      this.isDisabled = true;
    }
    // this.getRegionChildrenList();
  },
  mounted() {
    this.drawBar();
    this.drawLine(this.lineXdata,this.lineYdata,this.lineYdata1);
    window.addEventListener('resize',()=> {
      this.productionLinkChart && this.productionLinkChart.resize();
      this.predictionWasteProductionChart && this.predictionWasteProductionChart.resize();
    })
  },
  destroyed() {},
};
</script>

<style scoped>
.text-success {
  color: #27b148;
}
.text-error {
  color: #ff2525;
}
.text-primary {
  color: #3291f8;
}
.mx-4 {
  margin: 0 4px;
}
.mt-15 {
  margin-top: 15px;
}
.mt-20 {
  margin-top: 20px;
}
.ml-20 {
  margin-left: 20px;
}
.mt-30 {
  margin-top: 30px;
}
.panel-hd {
  padding: 0 !important;
}
.card-item .title {
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  margin-bottom: 15px;
}
.card-item >>> .el-card__body {
  text-align: center;
}
.hd-title {
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  line-height: 45px;
}
.desc-info {
  padding: 5px 0;
  display: flex;
  align-items: center;
}
.production-link-chart {
  width: 100%;
  height: 300px;
}
.prediction-waste-production {
  width: 100%;
  height: 450px;
}
</style>
