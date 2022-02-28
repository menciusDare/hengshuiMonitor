<template>
  <!-- 主体 -->
  <div class="main">
    <div class="modal modal-lg is-show" >
  <a href="javascript:;" class="modal-close icon icon-close" title="关闭"></a>
  <div class="modal-hd">
    <h2 class="modal-tit">企业名称某线监测点位1</h2>
  </div>
  <div class="modal-bd" style="overflow:hidden;">
    <!-- 企业监控信息 -->
    <div class="box-cont" style="height: 110px">
      <div class="qy-info">
        <div class="qy-state">正常</div>
        <ul class="qy-cont">
          <li>
            <div class="item-name">用电量:</div>
            <div class="item-num"><strong>330</strong>kg</div>
          </li>
          <li>
            <div class="item-name">产废量:</div>
            <div class="item-num"><strong>330</strong>kg</div>
          </li>
          <li>
            <div class="item-name">产废类型：</div>
            <div class="item-num"><strong>废矿物油(202-344-34)</strong></div>
          </li>
        </ul>
      </div>
      <div class="latest-info">
        <div class="info-text">最近入库：</div>
        <div class="info-cont"><span>2020.05.05</span><span>废矿物油 (202-123-08)</span><span>120kg</span></div>
      </div>
    </div>
    <div class="box-cont mt">
      <div class="panel-box panel-lg">
        <div class="panel-hd">
          <div class="title">总量监控</div>
        </div>
        <div class="panel-bd">
          <ul class="tab-card card-right">
            <li class="is-active"><a href="javascript:;"></i>今日</a></li>
            <li><a href="javascript:;">近7天</a></li>
            <li><a href="javascript:;">近1个月</a></li>
          </ul>
          <div class="chart-item" id="chartZljk" style="height: 340px"></div>
        </div>
      </div>
      <div class="panel-box panel-lg">
        <div class="panel-hd">
          <div class="title">监控视频</div>
        </div>
        <div class="panel-bd">
          <div class="video-area">
            <img src="images/pic/video02.jpg" style="width: 340px;height: 285px;">
            <div class="video-icon"></div>
            <div class="video-full"><i class="icon icon-full"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
  </div>
</template>

<script>
import echarts from "echarts";
import Swiper from "../../../../static/css/js/swiper.min.js";
//   import swiperanimate1 from './swiper.animate1.0.3.min.js'
export default {
  name: "wasteProductionMonitor",
  components: {
    Swiper
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
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
      centeredSlides: true,
      on: {
        // 点击事件
        click: function() {
          //alert(this.clickedIndex)
        }
      }
    });
    this.initChart();
  },
  methods: {
    initChart() {
      var chart = echarts.init(document.getElementById("chartZljk"), "skinUpp");
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
            "时间：{b0}<br />用电量: {c0}kg<br />产废量: {c1}kg<br />预测量: {c2}kg"
        },
        grid: {
          bottom: 40,
          top: 40,
          left: 20
        },
        //图例
        legend: {
          data: ["用电量", "产废量", "预测量"],
          right: "center",
          bottom: "0",
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10
        },
        // x轴
        xAxis: {
          type: "category",
          data: [
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
            "23",
            "20"
          ],
          boundaryGap: false,
          axisLabel: {
            show: true
          }
        },
        // y轴
        yAxis: {
          type: "value",
          name: "单位kg",
          nameTextStyle: {
            color: "#666",
            align: "right",
            lineHeight: 30
          }
        },
        // 数据
        series: [
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
              530,
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
              430,
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
              410,
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
        ]
      });
    },
    openMonitor(){
        
    }

  }
};
</script>

<style>
</style>
