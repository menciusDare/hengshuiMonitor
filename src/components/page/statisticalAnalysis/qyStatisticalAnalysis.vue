<template>
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel pandelSelected">
      <div class="panel-bd pdtlr-0">
        <div class="filter-more">
          <ul class="filter-box" style="padding-left: 20px;">
            <li class="filter-item">
              <!-- <RegionCascader
                style="width: 130px;"
                ref="regionCascader"
                @handleRegionChange="handleChange"
              ></RegionCascader> -->
              <RegionList @RegionChange="regionChange"></RegionList>
            </li>
            <li class="filter-item" style="padding-left: 20px;">
              <div>
                <el-select
                  v-model="value"
                  placeholder="请选择"
                  style="width:130px;"
                  @change="handleChangeYear"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </li>
            <li class="filter-item" style="padding-left: 20px;">
              <div>
                指定周期：
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="——"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="changeDate"
                ></el-date-picker>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 合规企业占比 重点企业占比  企业类型分布-->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-zongchanliang"></i>合规企业占比
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isHgqyzb" class="chart-item" id="chartHgqyzb" style="height: 270px"></div>
            <div v-show="!isHgqyzb" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-chuzhiliang"></i>重点企业占比
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isZdqyzb" class="chart-item" id="chartZdqyzb" style="height: 270px"></div>
            <div v-show="!isZdqyzb" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-8" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-zhuanyunliang"></i>企业行业类型分布
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isQyhylxfb" class="chart-item" id="chartQylxfb" style="height: 270px"></div>
            <div v-show="!isQyhylxfb" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企业产废排行TOP10 -->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-col el-col-24" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-xiaolv"></i>企业产废排行TOP10
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isCfph" class="chart-item" id="chartQycfph" style="height: 270px"></div>
            <div v-show="!isCfph" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 企业最高评分排行TOP5  企业最低评分排行TOP5-->
    <div class="el-row mt-lg" style="margin-left: -10px; margin-right: -10px;">
      <div class="el-col el-col-12" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-xiaolv"></i>企业最高评分排行TOP5
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isQyzgpfph" class="chart-item" id="chartQypfasc" style="height: 270px"></div>
            <div v-show="!isQyzgpfph" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="el-col el-col-12" style="padding-left: 10px; padding-right: 10px;">
        <div class="panel">
          <div class="panel-hd">
            <h2 class="panel-tit">
              <i class="icon icon-xiaolv"></i>企业最低评分排行TOP5
            </h2>
            <!-- <div class="panel-right">
              <a href="javascript:;" class="more">更多</a>
            </div>-->
          </div>
          <div class="panel-bd">
            <div v-show="isQyzdpfph" class="chart-item" id="chartQypfdesc" style="height: 270px"></div>
            <div v-show="!isQyzdpfph" style="height: 270px;text-align: center;line-height: 16;">暂无数据</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import RegionCascader from "../../common/unit/RegionCascader";
import RegionList from '../../../components/common/unit/RegionList.vue';
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
export default {
  name: "PlatformHomepage",
  components: {
    RegionCascader,
    RegionList,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      isQyhylxfb: true,
      isZdqyzb: true,
      isHgqyzb: true,
      isCfph: true,
      isQyzgpfph: true,
      isQyzdpfph: true,
      EntInfoEpitomizeCountVos: [],
      xData: [],
      zclData: [],
      zyxl: 0,
      qnzyxl: 0,
      value: "2021",
      value1: "",
      adcd: this.getAdcd(this.AppConfig.appInfo.regionCode),
      // adcd: "",
      thisYear: 2021,
      cityOptions: [],
      port: "/api/regulatory/",
      // port: "http://localhost:8006/",
      options: [
        {
          value: 2020,
          label: 2020,
        },
        {
          value: 2019,
          label: 2019,
        },
        {
          value: 2018,
          label: 2018,
        },
        {
          value: 2017,
          label: 2017,
        },
        {
          value: 2016,
          label: 2016,
        },
        {
          value: 2015,
          label: 2015,
        },
        {
          value: 2014,
          label: 2014,
        },
        {
          value: 2013,
          label: 2013,
        },
        {
          value: 2012,
          label: 2012,
        },
        {
          value: 2011,
          label: 2011,
        },
      ],
    };
  },

  methods: {
    regionChange(value) {
      this.adcd = value
      this.init();
    },
    //企业合规占比
    selectEntinfoGroupByStandard() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectEntinfoGroupByStandard", {
          /*startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),*/
          startTime: '',
          endTime: '',
          adcd: _this.adcd,
        })
        .then((response) => {
          if (response.data.length > 0) {
            
            _this.isHgqyzb = true;
            _this.$nextTick(() => {
              let legendData = ["达标", "基本达标", "不达标"];
              response.data.forEach((item) => {
                if (item.id == 1) {
                  item.name = "达标";
                } else if (item.id == 2) {
                  item.name = "基本达标";
                } else if (item.id == 3) {
                  item.name = "不达标";
                }
              });
              _this.initPie(
                legendData,
                response.data,
                "chartHgqyzb",
                "area",
                [30, 80],
                { show: false },
                [
                  "#12D1B4",
                  "#06B2EE",
                  "#00CE61",
                  "#A486F9",
                  "#F08870",
                  "#F4DB63",
                ]
              );
            });
          } else {
            _this.isHgqyzb = false;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    //企业类别占比
    selectEntinfoGroupByEnttype() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectEntinfoGroupByEnttype", {
          /*startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),*/
          startTime: '',
          endTime: '',
          adcd: _this.adcd,
        })
        .then((response) => {
          if (response.data.length > 0) {
            _this.isZdqyzb = true;
            _this.$nextTick(() => {
              let legendData = ["国家级", "省级", "市级", "小微企业","一般固废"];
              response.data.forEach((item) => {
                if (item.id == 1) {
                  item.name = "国家级";
                } else if (item.id == 2) {
                  item.name = "省级";
                } else if (item.id == 3) {
                  item.name = "市级";
                } else if (item.id == 4) {
                  item.name = "小微企业";
                } else if (item.id == 5) {
                  item.name = "一般固废";
                }
              });
              _this.initPie(
                legendData,
                response.data,
                "chartZdqyzb",
                false,
                [50, 80],
                { show: true },
                [
                  "#12D1B4",
                  "#06B2EE",
                  "#00CE61",
                  "#A486F9",
                  "#F08870",
                  "#F4DB63",
                ]
              );
            });
          } else {
            _this.isZdqyzb = false;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    //企业行业类型分布
    selectEntinfoGroupByCategory() {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectEntinfoGroupByCategory", {
          /*startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),*/
          startTime: '',
          endTime: '',
          adcd: _this.adcd,
        })
        .then((response) => {
          if (response.data.length > 0) {
            _this.isQyhylxfb = true;
            _this.$nextTick(() => {
              let legendData = [];
              response.data.forEach((item) => {
                legendData.push(item.name);
              });
              _this.initPie(
                legendData,
                response.data,
                "chartQylxfb",
                false,
                [80, 0],
                { show: false },
                [
                  "#12D1B4",
                  "#06B2EE",
                  "#00CE61",
                  "#A486F9",
                  "#F08870",
                  "#F4DB63",
                ]
              );
            });
          } else {
            _this.isQyhylxfb = false;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    //企业评分排行
    selectEntinfoOrderByStandardValue(order) {
      var _this = this;
      _this.$axios
        .post(
          _this.port + "tEnterpriseInfo/selectEntinfoOrderByStandardValue",
          {
            orderBy: order,
            limit: 5,
            startTime: _this.timestampToTime(_this.value1[0]),
            endTime: _this.timestampToTime(_this.value1[1]),
            adcd: _this.adcd,
          }
        )
        .then((response) => {
          let legendData = [];
          let data = [];
          let noArr = [];
          let no1 = 1;

          let x = response.data[0].value;
          for (let a = 0; a < response.data.length; a++) {
            if (x == response.data[a].value) {
            } else {
              x = response.data[a].value;
              no1++;
            }
            noArr.push(no1);
          }

          if (order == "desc") {
            if (response.data.length == 0) {
              _this.isQyzgpfph = false;
            }
            let maxlegend = 0;
            // for (let a = 0; a < response.data.length; a++) {
            //   if (
            //     (
            //       "NO." +
            //       noArr[response.data.length - a - 1] +
            //       " " +
            //       response.data[a].name
            //     ).length > maxlegend
            //   ) {
            //     // maxlegend = (
            //     //   "NO." +
            //     //   noArr[response.data.length - a - 1] +
            //     //   " " +
            //     //   response.data[a].name
            //     // ).length;
            //   }
            // }
            for (let a = 0; a < response.data.length; a++) {
              let legend = {};
              legend.value =
                "NO." +
                noArr[response.data.length - a - 1] +
                " " +
                response.data[response.data.length - a - 1].name;
              // legend.textStyle = {
              //   padding: [0, (maxlegend - legend.value.length) * 14, 0, 0],
              // };
              legendData.push(legend);
              data.push(response.data[response.data.length - a - 1].value);
            }
            _this.initBar(legendData, data, ["#5B8DED"], "chartQypfasc");
          } else {
            if (response.data.length == 0) {
              _this.isQyzdpfph = false;
            }
            // let maxlegend = 0;
            // for (let a = 0; a < response.data.length; a++) {
            //   if (
            //     (
            //       "NO." +
            //       noArr[response.data.length - a - 1] +
            //       " " +
            //       response.data[a].name
            //     ).length > maxlegend
            //   ) {
            //     maxlegend = (
            //       "NO." +
            //       noArr[response.data.length - a - 1] +
            //       " " +
            //       response.data[a].name
            //     ).length;
            //   }
            // }
            for (let a = 0; a < response.data.length; a++) {
              let legend = {};
              legend.value =
                "NO." +
                noArr[response.data.length - a - 1] +
                " " +
                response.data[response.data.length - a - 1].name;
              // legend.textStyle = {
              //   padding: [0, (maxlegend - legend.value.length) * 14, 0, 0],
              // };
              legendData.push(legend);
              data.push(response.data[response.data.length - a - 1].value);
            }
            //;
            _this.initBar(legendData, data, ["#5B8DED"], "chartQypfdesc");
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },

    //企业产废排行TOP10
    selectEntinfoOrderByStorage(order) {
      var _this = this;
      _this.$axios
        .post(_this.port + "tEnterpriseInfo/selectEntinfoOrderByStorage", {
          orderBy: order,
          limit: 10,
          startTime: _this.timestampToTime(_this.value1[0]),
          endTime: _this.timestampToTime(_this.value1[1]),
          adcd: _this.adcd,
        })
        .then((response) => {
          if (response.data.length > 0) {
            _this.isCfph = true;
            _this.$nextTick(() => {
              let legendData = [];
              let data = [];
              for (let a = 0; a < response.data.length; a++) {
                legendData.push(response.data[a].name);
                data.push(response.data[a].value);
              }
              _this.initChart(
                "吨",
                legendData,
                data,
                "bar",
                "chartQycfph",
                null,
                {
                  barBorderRadius: [4, 4, 0, 0],
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(56,126,232,1)",
                      },
                      {
                        offset: 1,
                        color: "rgba(175,203,245,1)",
                      },
                    ],
                    false
                  ),
                }
              );
            });
          } else {
            _this.isCfph = false;
          }
        })
        .catch((error) => {
          // catch 指请求出错的处理
          // console.log(error);
        });
    },
    selectCity() {
      //查询市列表
      var _this = this;
      _this.$nextTick(() => {
        var params = new URLSearchParams();
        params.append("regionId", _this.AppConfig.appInfo.regionCode);
        _this.$axios
          .post("/api/regulatory/regionInfo/getRegionTree", params)
          .then((response) => {
            _this.cityOptions = response.data;
          })
          .catch((error) => {
            // catch 指请求出错的处理
            // console.log(error);
          });
      });
    },
    initChart(yname, xData, Data, type, id, color, itemStyle) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: color,
        tooltip: {
          show: true,
          formatter: "{b} : {c} 吨",
        },
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: true,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            interval: 0,
            rotate: 310,
            formatter: function (value) {
              return value.length > 6 ? value.slice(0, 6) + "..." : value;
            },
            textStyle: {
              color: "#666",
              fontSize: 12,
            },
          },
          triggerEvent: true, // 设置为true后，可触发事件。实现x轴文字过长，显示省略号，hover上去显示全部的功能
        },
        grid: {
          left: "8%",
          right: "4%",
          bottom: "10%",
          top: "12%",
        },
        yAxis: {
          name: yname,
          type: "value",
          axisTick: {
            show: false,
          },
          nameTextStyle:{
            color:'#666',
            padding:[5,10,0,0]
          },
        },
        series: [
          {
            data: Data,
            type: type,
            barWidth: 20,
            itemStyle: itemStyle,
          },
        ],
      });
    },
    initPie(legendData, Data, id, roseType, radius, label, color) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: color,
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        legend: {
          top: "7%",
          orient: "vertical",
          left: "right",
          data: legendData,
          formatter: function (name) {
            if (name.length > 4) {
              return name.substring(0, 3) + " ···";
            } else {
              return name;
            }
          },
          tooltip: {
            show: true,
          },
        },

        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: Data,
            radius: radius,
            roseType: roseType,
            label: label,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    initBar(legendData, Data, color, id) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: color,
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          show: false,
          type: "value",
          splitLine: {
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },

          boundaryGap: [0, 0.01],
        },

        yAxis: {
          type: "category",
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            align: "center",
          },
          axisLine: {
            //y轴刻度线
            show: false,
          },
          axisTick: {
            //y轴刻度线
            show: false,
          },
          axisLabel: {
            show: true,
            interval: 0,
            // rotate: 310,
            formatter: function (value) {
              return value.length > 12 ? value.slice(0, 12) + "...  " : value+"  ";
            },
            textStyle: {
              color: "#666",
              fontSize: 15,
            },
          },
          data: legendData,
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "inside",
              formatter: "{c}" + "分",
              color: "black",
            },
            barWidth: 15,
            data: Data,
          },
        ],
      });
    },
    init() {
    
      this.selectEntinfoGroupByStandard();
      this.selectEntinfoGroupByEnttype();
      this.selectEntinfoGroupByCategory();
      this.selectEntinfoOrderByStandardValue("asc");
      this.selectEntinfoOrderByStandardValue("desc");
      this.selectEntinfoOrderByStorage("desc");
    },
    getAdcd(adcd) {
      while (true) {
        if (adcd.endsWith("00")) {
          adcd = adcd.substring(0, adcd.length - 2);
        } else {
          return adcd;
        }
      }
    },
    handleChange(value) {
      this.adcd = this.getAdcd(value);
      // this.adcd = "";
      this.init();
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return Y + M + D;
    },
    changeDate() {
      this.init();
    },
    getDate1(day) {
      var now = new Date();
      const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      );

      const start = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - day,
        now.getHours(),
        now.getMinutes()
      );
      this.value1 = [];
      this.value1.push(start);
      this.value1.push(end);
      this.init();
    },
    handleChangeYear(value) {
      var now = new Date();
      var end = "";
      if (value == now.getFullYear()) {
        end = new Date(value, now.getMonth(), now.getDate());
      } else {
        end = new Date(value, 11, 31);
      }
      const start = new Date(value, 0, 1);
      this.value1 = [];
      this.value1.push(start);
      this.value1.push(end);
      this.init();
    },
    //初始化时间
    initOption() {
      this.options = [];
      let year = new Date().getFullYear();
      for (let a = 0; a < 10; a++) {
        let option = {};
        option.value = year - a;
        this.options.push(option);
      }
    },
  },
  mounted() {
    this.initOption();
    this.handleChangeYear(new Date().getFullYear());
    // this.init()
  },
};
</script>
<style scoped>
</style>
