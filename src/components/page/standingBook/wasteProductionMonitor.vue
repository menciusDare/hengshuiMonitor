<template>
  <!-- 主体 -->
  <div class="main">
    <BreadcrumbComponent :routePath="routePath"/>
    <div class="panel mt">
      <div class="panel-hd">
        <h2 class="panel-tit">
          <i class="icon icon-qiyezhuangtai"></i>
          <span>企业状态</span>
          <!-- <div class="text-state ml-sm">正常</div> -->
          <div class="text-state state-anomaly ml-sm">异常</div>
        </h2>
      </div>
      <div class="panel-bd">
        <div class="box-count box-sm row row-gap">
          <div class="col-6">
            <div class="count-item is-anomaly">
              <div class="count-icon">
                <i class="icon icon-yichang"></i>
              </div>
              <div class="count-sub">
                <div class="count-num">
                  <strong>{{itemData.yc}}</strong>
                </div>
                <div class="count-name">异常点位</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="count-item">
              <div class="count-icon">
                <i class="icon icon-shengchanliang"></i>
              </div>
              <div class="count-sub">
                <div class="count-num">
                  <strong>{{itemData.jrscl}}</strong>kg
                </div>
                <div class="count-name">今日生产量</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="count-item">
              <div class="count-icon">
                <i class="icon icon-rukuliang"></i>
              </div>
              <div class="count-sub">
                <div class="count-num">
                  <strong>{{itemData.jrrkl}}</strong>kg
                </div>
                <div class="count-name">今日入库量</div>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div class="count-item">
              <div class="count-icon">
                <i class="icon icon-zaixianliang"></i>
              </div>
              <div class="count-sub">
                <div class="count-num">
                  <strong>{{itemData.jrzxl}}</strong>kg
                </div>
                <div class="count-name">今日在线量</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="panel mt">
      <div class="panel-bd">
        <div class="tab-box">
          <div class="swiper-horizontal is-mask">
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="list-item">生产线1</div>
                </div>
                <div class="swiper-slide">
                  <div class="list-item">生产线2</div>
                </div>
                <div class="swiper-slide">
                  <div class="list-item">生产线3</div>
                </div>
                <div class="swiper-slide">
                  <div class="list-item">生产线4</div>
                </div>
                <div class="swiper-slide">
                  <div class="list-item">生产线5</div>
                </div>
              </div>
            </div>
            <div class="swiper-button-next">
              <i class="icon icon-right"></i>
            </div>
            <div class="swiper-button-prev">
              <i class="icon icon-left"></i>
            </div>
          </div>
          <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="生产线1" name="first"></el-tab-pane>
    <el-tab-pane label="生产线2" name="second"></el-tab-pane>
    <el-tab-pane label="生产线3" name="third"></el-tab-pane>
    <el-tab-pane label="生产线4" name="fourth"></el-tab-pane>
          </el-tabs>-->
          <div class="tab-bd">
            <div class="tab-item">
              <div class="item-hd">
                <div class="item-title">生产过程产废监控</div>
              </div>
              <div class="item-cont">
                <div class="product-box">
                  <img
                    src="../../../../static/css/images/pic/product-pic1.jpg"
                    alt
                    style="width: 1708px;height: 484px"
                  />
                  <div class="dot-box">
                    <div class="dot-item" style="left: 155px;top: 263px;">
                      <div class="item-cont" @click="openMonitor">
                        <i class="icon icon-dianwei"></i>
                        <div class="item-num">2</div>
                        <div class="item-name">产废点位2</div>
                      </div>
                      <div class="item-tip">
                        <div class="tip-tit">正常运行</div>
                        <div class="tip-text">
                          用电量:100kwh
                          <br />
                          产废量:{{itemData.cfl1}}kg
                        </div>
                      </div>
                    </div>
                    <div class="dot-item is-anomaly" style="left: 1025px;top: 97px;">
                      <div class="item-cont" @click="openMonitor">
                        <i class="icon icon-dianwei"></i>
                        <div class="item-num">1</div>
                        <div class="item-name">产废点位</div>
                      </div>
                      <div class="item-tip">
                        <div class="tip-tit">异常运行</div>
                        <div class="tip-text">
                          用电量:100kwh
                          <br />
                          产废量:{{itemData.cfl2}}kg
                        </div>
                      </div>
                    </div>
                    <div class="dot-item is-stop" style="left: 943px;top: 321px;">
                      <div class="item-cont" @click="openMonitor">
                        <i class="icon icon-dianwei"></i>
                        <div class="item-num">3</div>
                        <div class="item-name">产废点位3</div>
                      </div>
                      <div class="item-tip">
                        <div class="tip-tit">停止运行</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item-hd">
                <div class="item-title">总量监控</div>
                <div class="item-right">
                  <!-- <a href="javascript:;" class="text-primary">查看详情</a> -->
                </div>
              </div>
              <div class="item-bd">
                <ul class="tab-card">
                  <li :class="isActive==1?'is-active':''" @click="changeActive(1)">
                    <a href="javascript:;">今日</a>
                  </li>
                  <li :class="isActive==2?'is-active':''" @click="changeActive(2)">
                    <a href="javascript:;">近7天</a>
                  </li>
                  <li :class="isActive==3?'is-active':''" @click="changeActive(3)">
                    <a href="javascript:;">近1个月</a>
                  </li>
                </ul>
                <div class="chart-item" id="chartZljk" style="height: 244px"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="企业名称某线监测点位1"
      :visible.sync="dialogVisible"
      width="60%"
      :modal-append-to-body="false"
    >
      <div class="modal-bd" style="overflow:hidden;">
        <!-- 企业监控信息 -->
        <div class="box-cont" style="height: 110px">
          <div class="qy-info">
            <div class="qy-state">正常</div>
            <ul class="qy-cont">
              <li>
                <div class="item-name">用电量:</div>
                <div class="item-num">
                  <strong>330</strong>kg
                </div>
              </li>
              <li>
                <div class="item-name">产废量:</div>
                <div class="item-num">
                  <strong>330</strong>kg
                </div>
              </li>
              <li>
                <div class="item-name">产废类型：</div>
                <div class="item-num">
                  <strong>废矿物油(202-344-34)</strong>
                </div>
              </li>
            </ul>
          </div>
          <div class="latest-info">
            <div class="info-text">最近入库：</div>
            <div class="info-cont">
              <span>2020.05.05</span>
              <span>废矿物油 (202-123-08)</span>
              <span>120kg</span>
            </div>
          </div>
        </div>
        <div class="box-cont mt">
          <div class="panel-box panel-lg">
            <div class="panel-hd">
              <div class="title" style="color:black;">总量监控</div>
            </div>
            <div class="panel-bd">
              <ul class="tab-card card-right">
                <li :class="isActive1==1?'is-active':''" @click="changeActive1(1)">
                  <a href="javascript:;">今日</a>
                </li>
                <li :class="isActive1==2?'is-active':''" @click="changeActive1(2)">
                  <a href="javascript:;">近7天</a>
                </li>
                <li :class="isActive1==3?'is-active':''" @click="changeActive1(3)">
                  <a href="javascript:;">近1个月</a>
                </li>
              </ul>
              <div  id="chartZljk1" style="height: 340px"></div>
            </div>
          </div>
          <div class="panel-box panel-lg">
            <div class="panel-hd">
              <div class="title" style="color:black;">监控视频</div>
            </div>
            <div class="panel-bd">
              <div class="video-area">
                <realTimeVideo ref="closeMouleHK"></realTimeVideo>
                <!-- <div class="video-icon"></div>
                <div class="video-full"><i class="icon icon-full"></i></div>-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BreadcrumbComponent from "../../common/unit/BreadcrumbComponent.vue"
import realTimeVideo from "./realTimeVideo";
import echarts from "echarts";
import Swiper from "../../../../static/css/js/swiper.min.js";
//   import swiperanimate1 from './swiper.animate1.0.3.min.js'
export default {
  name: "wasteProductionMonitor",
  components: {
    Swiper,
    realTimeVideo,
    BreadcrumbComponent
  },
  data() {
    return {
      routePath: this.$route.path,
      dialogVisible: false,
      isActive: 1,
      itemData:{yc:1,
      jrscl:"",
      jrrkl:"",
      jrzxl:"",
      cfl1:"",
      cfl2:""
      },
      isActive1: 1,
      xData1: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23"
      ],
      seriesData1: [
        {
          name: "用电量",
          type: "line",
          data: [
            200,
            310,
            420,
            430,
            590,
            610,
            620,
            630,
            740,
            850,
            920,
            890,
            810,
            720,
            730,
            490,
            530,
            410,
            730,
            490,
            410,
            420,
            430,
            830
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "产废量",
          type: "line",
          data: [
            180,
            210,
            220,
            330,
            490,
            510,
            520,
            700,
            800,
            820,
            790,
            710,
            620,
            630,
            410,
            500,
            330,
            630,
            590,
            500,
            310,
            320,
            330,
            730
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "预测量",
          type: "line",
          data: [
            100,
            110,
            120,
            230,
            400,
            420,
            330,
            640,
            750,
            720,
            590,
            510,
            520,
            530,
            390,
            430,
            310,
            330,
            390,
            330,
            310,
            300,
            430,
            630
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        }
      ],
      xData3: [
        "2020-06-01",
        "2020-06-02",
        "2020-06-03",
        "2020-06-04",
        "2020-06-05",
        "2020-06-06",
        "2020-06-07",
        "2020-06-08",
        "2020-06-09",
        "2020-06-10",
        "2020-06-11",
        "2020-06-12",
        "2020-06-13",
        "2020-06-14",
        "2020-06-15",
        "2020-06-16",
        "2020-06-17",
        "2020-06-18",
        "2020-06-19",
        "2020-06-20",
        "2020-06-21",
        "2020-06-22",
        "2020-06-23",
        "2020-06-24",
        "2020-06-25",
        "2020-06-26",
        "2020-06-27",
        "2020-06-28",
        "2020-06-29",
        "2020-06-30"
      ],
      seriesData3: [
        {
          name: "用电量",
          type: "line",
          data: [
            200,
            310,
            420,
            430,
            590,
            610,
            620,
            630,
            740,
            850,
            920,
            200,
            310,
            420,
            590,
            610,
            620,
            890,
            810,
            720,
            730,
            490,
            530,
            410,
            730,
            490,
            410,
            420,
            430,
            830
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "产废量",
          type: "line",
          data: [
            180,
            210,
            220,
            330,
            490,
            510,
            520,
            700,
            200,
            310,
            420,
            430,
            590,
            610,
            620,
            800,
            820,
            790,
            710,
            620,
            410,
            500,
            330,
            630,
            590,
            500,
            310,
            320,
            330,
            730
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "预测量",
          type: "line",
          data: [
            100,
            110,
            120,
            230,
            400,
            200,
            310,
            420,
            430,
            590,
            610,
            620,
            420,
            330,
            640,
            750,
            590,
            510,
            520,
            530,
            390,
            430,
            310,
            330,
            390,
            330,
            310,
            300,
            430,
            630
          ],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        }
      ],
      xData2: [
        "2020-07-01",
        "2020-07-02",
        "2020-07-03",
        "2020-07-04",
        "2020-07-05",
        "2020-07-06",
        "2020-07-06"
      ],
      seriesData2: [
        {
          name: "用电量",
          type: "line",
          data: [410, 730, 490, 410, 420, 430, 830],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "产废量",
          type: "line",
          data: [330, 630, 590, 500, 310, 320, 330],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        },
        {
          name: "预测量",
          type: "line",
          data: [310, 330, 390, 330, 310, 300, 430],
          smooth: true,
          symbolSize: 1,
          lineStyle: {
            width: 3
          }
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.initData();
     setInterval(this.initData1, 3000);
    var swiperHorizontal = new Swiper(".swiper-horizontal .swiper-container", {
      slidesPerView: 5,
      spaceBetween: 20,
      loop: true, //循环显示
      //切换效果
      effect: "slide",
      //自动播放
      autoplay: false,
      //前进后退按钮
      navigation: {
        nextEl: ".swiper-horizontal .swiper-button-next",
        prevEl: ".swiper-horizontal .swiper-button-prev"
      },
      slideToClickedSlide: true,
      centeredSlides: false,
      on: {
        // 点击事件
        click: function() {
          //alert(this.clickedIndex)
        }
      }
    });
    this.initChart("chartZljk", this.xData1, this.seriesData1);
  },
  methods: {
    initChart(id, xData, seriesData) {
      var chart = echarts.init(document.getElementById(id), "skinUpp");
      chart.setOption({
        color: ["#387EE8", "#EC7472", "#63C1B0"],
        //提示框
        tooltip: {
          trigger: "axis",
          backgroundColor: "#fff",
          extraCssText: "box-shadow: 0 0 20px 3px rgba(0, 0, 0, 0.1);",
          padding: [5, 10, 5, 10],
          textStyle: {
            color: "#666"
          },
          formatter:
            "时间：{b0}<br />用电量: {c0}kws<br />产废量: {c1}kg<br />预测量: {c2}kg"
        },
        grid: {
          bottom: 60,
          top: 40,
          left: 20
        },
        //图例
        legend: {
          data: ["用电量", "产废量", "预测量"],
          left: "35%",
          bottom: "0",
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10
        },
        // x轴
        xAxis: {
          type: "category",
          data: xData,
          boundaryGap: false,
          axisLabel: {
            show: true
          }
        },
        // y轴
        yAxis: {
          type: "value",
            nameTextStyle: {
            color: "#666",
            align: "right",
            lineHeight: 30
          }
        },
        // 数据
        series: seriesData
      });
    },
    initData() {
      this.itemData.yc = 1;
      this.itemData.jrscl = (Math.random() * 200 + 100).toFixed(0);
      this.itemData.jrrkl = (Math.random() * 200 + 50).toFixed(0);
      this.itemData.jrzxl = (Math.random() * 200 + 50).toFixed(0);
      this.itemData.cfl1 = (Math.random() * 50 + 50).toFixed(0);
      this.itemData.cfl2 = this.itemData.jrscl - this.itemData.cfl1;
    },
     initData1() {
      this.itemData.yc = 1;
      this.itemData.jrscl =Number(this.itemData.jrscl) + Number((Math.random()*5  ).toFixed(0));
      this.itemData.jrrkl =Number(this.itemData.jrrkl) + Number((Math.random()*5 ).toFixed(0));
      this.itemData.jrzxl =Number(this.itemData.jrzxl) + Number((Math.random()*5 ).toFixed(0));
      this.itemData.cfl1 = this.itemData.jrscl - this.itemData.cfl2;
    },
    changeActive(index) {
      this.isActive = index;
      this.initChart(
        "chartZljk",
        this["xData" + index],
        this["seriesData" + index]
      );
    },
    changeActive1(index) {
      this.isActive1 = index;
      this.initChart(
        "chartZljk1",
        this["xData" + index],
        this["seriesData" + index]
      );
    },
    openMonitor() {
      var that = this;
      this.dialogVisible = true;
      this.$nextTick(() => {
        this.initChart("chartZljk1", this.xData1, this.seriesData1);
        this.$refs.closeMouleHK.openVideo({ carNo: "京A888881" });
      });
    }
  }
};
</script>

<style>
.product-box .dot-item .item-cont .item-name {
  color: white;
}
.box-count .count-num {
    height: 27px;
    line-height: 26px;
}
.box-count .count-item {
    height: 65px;
}
</style>
