// 转运量
var chartZhuanyun = echarts.init(document.getElementById('chartZhuanyun'),'skinUpp');
var option = {
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    boundaryGap:true,
  },
  // y轴
  yAxis: {
    type: 'value',
    name:'kg',
  },
  // 数据
  series : [
    {
      type: 'line',
      data: [400, 320, 300, 330, 490, 530, 620,790, 890, 1030, 1220,1490],
      smooth: false,
      symbolSize:14,
      symbol: 'emptyCircle',
       itemStyle: {
        normal: {
          borderWidth: 2,
        },
      },
      areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(255,137,0,.16)'
            },{
                offset: 1,
                color: 'rgba(255,137,0,0.04)'
            }], false),
            shadowColor: 'rgba(87,44,19, 0.16)',
            shadowBlur: 10
          }
      },
    }
  ],
};
chartZhuanyun.setOption(option);

//转移危废种类
var chartZywfzl = echarts.init(document.getElementById('chartZywfzl'),'skinUpp');
var option = {
  //浮层
  tooltip: {
    trigger: 'item',
    confine:true,
    //formatter: "{a} <br/>{b}: {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  //图例
  legend: {
    data:[
      {
        name: 'HW12',
      },
      {
        name: 'HW22',
      },
      {
        name: 'HW32',
      },
      {
        name: 'HW52',
      },
      {
        name: 'HW62',
      },
    ],
    textStyle: {
      color:'#666666',
    },
    orient: 'vertical',
    top: 'center',
    right: '30px',
    left:"auto",
    itemGap: 15, 
    itemWidth: 10,
    itemHeight: 10,
  },
  series : [
    {
      name: '转移危废种类',
      type: 'pie',
      radius: ['32%', '85%'],
      center: ['40%', '50%'],
      roseType : 'radius',
      //文字标签
      label: {
        show: true,
        position: 'outside',//标签的位置。默认outside，可选inside，center
        formatter:'{d}%', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
        color:"#475066"
      },
      data:[
        {
          value:375, 
          name:'HW12'
        },
        {
          value:310, 
          name:'HW22'
        },
        {
          value:368, 
          name:'HW32'
        },
        {
          value:310, 
          name:'HW52'
        },
        {
          value:210, 
          name:'HW62'
        },
      ],
      startAngle: 0,//起始角度
    }
  ]
};
chartZywfzl.setOption(option);

// 重点企业
var chartZdqy = echarts.init(document.getElementById('chartZdqy'),'skinUpp');
var option = {
  color:['#7DBCF8'],
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['快狗运输', '快狗运输2', '快狗运输3', '快狗运输4', '快狗运输5', '快狗运输6', '快狗运输7'],
    boundaryGap:true,
  },
  // y轴
  yAxis: {
    type: 'value',
    name:'kg',
  },
  // 数据
  series : [
    {
      type: 'bar',
      data: [4000, 3200, 3000, 3300, 4900, 5300, 6200],
      barWidth:32,
      itemStyle: {
        normal: {
          barBorderRadius: [4, 4, 0, 0],
        },
      },
    }
  ],
};
chartZdqy.setOption(option);

// 超期订单
var chartCqdd = echarts.init(document.getElementById('chartCqdd'),'skinUpp');
var option = {
  color:['#FFC760','#FE6B6A'],
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  legend:{
    itemWidth:12,
    itemHeight:10,
    data:['进行中订单','超期订单']
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['沈阳', '大连', '抚顺', '盘锦', '葫芦岛'],
    boundaryGap:true,
  },
  // y轴
  yAxis: {
    type: 'value',
    name:'订单',
  },
  // 数据
  series : [
    {
      type: 'bar',
      data: [4000, 3200, 3000, 3300, 4900, 5300, 6200],
      barWidth:32,
      name:'进行中订单',
      stack: "累加", 
    },
    {
      type: 'bar',
      data: [1000, 1200, 2000, 1300, 2100, 2000, 1200],
      barWidth:32,
      name:'超期订单',
      stack: "累加",
      itemStyle: {
        normal: {
          barBorderRadius: [4, 4, 0, 0],
        },
      },
    },
    //总数目
    {
      type: 'bar',
      data: [5000, 4400, 5000, 4600, 7000, 7300, 7400],
      barWidth:32,
      name:'总计',
      barGap: '-100%',
      label: {
        show: true,
        position: 'outside',//标签的位置。默认outside，可选inside，center
        formatter:'{c}', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
        color:"#475066",
        fontSize:16
      }, 
      itemStyle: {
        normal: {
          color: 'transparent'
        },
      },
    }
  ],
};
chartCqdd.setOption(option);

//订单转运偏差
var chartDdzypc = echarts.init(document.getElementById('chartDdzypc'),'skinUpp');
var option = {
  //浮层
  tooltip: {
    trigger: 'item',
    confine:true,
    //formatter: "{a} <br/>{b}: {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  //图例
  legend: {
    data:[
      {
        name: '-5%~0.1%',
      },
      {
        name: '0.1~5%以上',
      },
      {
        name: '5.1%~10%',
      },
      {
        name: '-10%~5.1%',
      },
      {
        name: '0%',
      },
      {
        name:'10%以上'
      },
      {
        name:'-10%以上'
      }
    ],
    textStyle: {
      color:'#666666',
    },
    orient: 'vertical',
    top: 'center',
    right: '30px',
    left:"auto",
    itemGap: 25, 
    itemWidth: 12,
    itemHeight: 10,
  },
  series : [
    {
      name: '订单转运偏差',
      type: 'pie',
      radius: ['32%', '85%'],
      center: ['40%', '50%'],
      //roseType : 'radius',
      label: {
        show: true,
        position: 'outside',//标签的位置。默认outside，可选inside，center
        formatter:'{b}', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
        color:"#475066"
      },
      data:[
        {
          value:375, 
          name:'-5%~0.1%'
        },
        {
          value:310, 
          name:'0.1~5%以上'
        },
        {
          value:368, 
          name:'5.1%~10%'
        },
        {
          value:310, 
          name:'-10%~5.1%'
        },
        {
          value:210, 
          name:'0%'
        },
        {
          value:210, 
          name:'10%以上'
        },
        {
          value:210, 
          name:'-10%以上'
        },
      ],
      startAngle: 0,//起始角度
    },
    // 边框的设置
    {
        radius: ['80%', '85%'],
        center: ['40%', '50%'],
        type: 'pie',
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        labelLine: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        animation: false,
        tooltip: {
            show: false
        },
        itemStyle: {
            normal: {
                color:'rgba(250,250,250,0.5)'
            }
        },
        data: [{
            value: 1,
        }],
    }
  ]
};
chartDdzypc.setOption(option);

//订单转运效率
var chartDdzyxl = echarts.init(document.getElementById('chartDdzyxl'),'skinUpp');
var  category= [
    {
        name: "5日以上",
        value: 2000
    },
    {
        name: "5日内",
        value: 3000
    },
    {
        name: "3日内",
        value: 3800
    },
    {
        name: "2日内",
        value: 5000
    },
    {
        name: "24小时内",
        value: 7000
    },
    {
        name: "12小时内",
        value: 9000
    },
]; 
// 类别
var total = 10000; // 数据总数
var  totalData = [];
var  datas = [];
var  names = [];
category.forEach(value => {
    datas.push(value.value);
    names.push(value.name);
    totalData.push(total);
});
option = {

  //提示框
  tooltip : {
    trigger: 'axis',
    show:false,
    axisPointer: {
        type: 'shadow',
        show: false
    },
  },
    xAxis: {
      max: total,
      axisLabel: {
          show: false
      },
      splitLine:{
        show:false
      }
    },
    grid: {
        left: 0,
        top: 0, // 设置条形图的边距
        right: 0,
        bottom: 0
    },
    yAxis: [{
      type: "category",
      inverse: false,
      data: names,
    }],
    series: [
        { // 背景色
          type: 'pictorialBar',
          stack: '总量',
          barWidth: 24,
          symbol: 'image://images/bg.png',
          symbolSize: [848, 24],
          //symbolMargin: -6,
          symbolClip:true,
          zlevel: 10,
          //symbolRepeat: 'repeat',
          data: datas,
          itemStyle: {
            normal: {
              barBorderRadius: [0, 4, 4, 0],
              color: '#007d87'
            }
          },
        },
        {
            data: totalData,
            type: 'bar',
            name: '柱状图',
            stack:'总量',
            barWidth: 24,
            zlevel: 1,
            itemStyle: {
                normal: {
                    color: '#F7F8FA',
                },
                emphasis: {
                    color: '#F7F8FA',
                }
            }
        },
        {
            data: datas,
            type: 'bar',
            name: '柱状图',
            barWidth: 24,
            zlevel: 8,
            barGap: "-100%",
            //文字标签
            label: {
              show: true,
              position: 'insideRight',//标签的位置。默认outside，可选inside，center
              formatter:'{c}%', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
              formatter: function(param) {     
                  return param.data*100/total+'%';
              },
              color:"#fff",
              fontWeight:700,
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 4, 4, 0],
                color: '#36CABB'
              }
            }
        },
    ]
};
chartDdzyxl.setOption(option);

$(window).on('resize',function(){
  chartZhuanyun.resize();
  chartZywfzl.resize();
  chartZdqy.resize();
  chartCqdd.resize();
  chartDdzypc.resize();
  chartDdzyxl.resize();
})
