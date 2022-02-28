// 废油实时储量 (吨)
var chartFysscl = echarts.init(document.getElementById('chartFysscl'), 'skinUpp');
var option = {
  //提示框
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#fff',
    padding: [5, 10, 5, 10],
    textStyle: {
      color: '#666',
    },
    formatter: '时间：{b0}<br />储量：{c0}吨'
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    boundaryGap: false,
    axisLabel: {
      show: true,
      //interval: 0,
    }
  },
  // y轴
  yAxis: {
    type: 'value',
  },
  // 数据
  series: [
    {
      type: 'line',
      data: [200, 310, 420, 430, 590, 610, 620, 630, 740, 850, 920, 890, 810, 720, 730, 490, 530, 410, 420, 430, 830, ],
      smooth: true,
      symbolSize: 0,
      itemStyle: {
        normal: {
          borderWidth: 3,
        },
      },
      lineStyle: {
        width: 3
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(56,126,232,.20)'
        }, {
          offset: 1,
          color: 'rgba(56,126,232,0.05)'
        }], false),
      },
    }
  ],
};
chartFysscl.setOption(option);

//库存危废类型占比
var chartKcwflxzb = echarts.init(document.getElementById('chartKcwflxzb'), 'skinUpp');
var data03 = [
  {
    value: 775,
    name: 'HW01'
  },
  {
    value: 610,
    name: 'HW02'
  },
  {
    value: 568,
    name: 'HW03'
  },
  {
    value: 510,
    name: 'HW04'
  },
  {
    value: 390,
    name: 'HW05'
  }, {
    value: 410,
    name: 'HW06'
  }, {
    value: 468,
    name: 'HW07'
  }, {
    value: 310,
    name: 'HW08'
  },{
    value: 210,
    name: 'HW09'
  }, {
    value: 268,
    name: '其他'
  }, 
];
var option = {
  baseOption:{
    //浮层
    tooltip: {
      trigger: 'item',
      confine: true,
      //formatter: "{a} <br/>{b}: {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
    },
    //图例
    legend: {
      textStyle: {
        color: '#666666',
      },
      orient: 'vertical',
      top: 'center',
      right: '10%',
      left: "auto",
      itemGap: 10,
      itemWidth: 8,
      itemHeight: 8,
      icon: 'circle',
      formatter:  function(name){
        var total = 0;
        var target;
        for (var i = 0, l = data03.length; i < l; i++) {
          total += data03[i].value;
          if (data03[i].name == name) {
            target = data03[i].value;
          }
        }
        var arr = [
          '{nameText|'+name+'}',
          '{numText|'+((target/total)*100).toFixed(2)+'%}'
        ]
        return arr.join('')
      },
      textStyle:{
        rich:{
          nameText:{
            align:'left',
            padding: [0, 0, 0, 0],
            width: 60,
          },
          numText:{
            align:'right',
            width: 50,
            color: '#333',
            fontWeight: 500
          },
        }
      }
    },
    series: [{
      name: '库存危废类型占比',
      type: 'pie',
      radius: ['22%', '90%'],
      center: ['32%', '50%'],
      roseType: 'radius',
      //文字标签
      label: {
        show: false,
        position: 'outside', //标签的位置。默认outside，可选inside，center
        formatter: '{d}%', //{a}：系列名。{b}：数据名。{c}：数据值。{d}：百分比。
        color: "#333"
      },
      itemStyle: {
        shadowColor: 'rgba(0,0,0,.2)',
        shadowBlur: 10,
      },
      data: data03,
      startAngle: 270, //起始角度
    }, {
      //遮罩层
      type: 'pie',
      radius: ['22%', '28%'],
      center: ['32%', '50%'],
      label: {
        show: false,
      },
      itemStyle: {
        color: 'rgba(255,255,255,.2)'
      },
      hoverOffset: 0,
      zlevel: 3,
      data: data03,
    }]
  },
  // 处理不同分辨率下位置
  media: [ 
    {
      query: {
        minWidth: 500
      },
      option: {       // 这里写此规则满足下的option。
        series: [
          {
            center: ['40%', '50%'],
          },
          {
            center: ['40%', '50%'],
          }
        ]
      },
    },
    {
      query: {
        minWidth: 800
      },
      option: {
        legend: {
          right: '20%',
        },
      },
    }
  ],
  
};
chartKcwflxzb.setOption(option);


// 库存危废储量TOP10
var chartKcwfcl = echarts.init(document.getElementById('chartKcwfcl'),'skinUpp');
var option = {
  //提示框
  tooltip : {
    trigger: 'axis',
  },
  // x轴
  xAxis: {
    type: 'category',
    data: ['1.危废有限公司', '2.危废有限公司', '3.危废有限公司', '4.危废有限公司', '5.危废有限公司', '6.危废有限公司', '7.危废有限公司', '8.危废有限公司', '9.危废有限公司', '10.危废有限公司', ''],
    boundaryGap: true,
    axisLabel: {
      show: true,
      rotate: 310,
      interval: 0,
      color:'#666'
    }
  },
  grid:{
    bottom: 15,
    top: 30,
  },
  // y轴
  yAxis: {
    type: 'value',
    name: '吨',
    nameTextStyle: {
      color: '#999'
    },
  },
  // 数据
  series : [
    {
      type: 'bar',
      data: [800, 910, 720, 680, 590, 610, 620, 630, 540, 450, ],
      barWidth: 24,
      label: {
        show: true,
        position: "top",
        formatter: '{c}',
      },
      itemStyle: {
        barBorderRadius: [4, 4, 0, 0],
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(56,126,232,1)'
        }, {
          offset: 1,
          color: 'rgba(175,203,245,1)'
        }], false),
      },
    }
  ],
};
chartKcwfcl.setOption(option);



$(window).on('resize',function(){
  chartFysscl.resize();
  chartKcwflxzb.resize();
  chartKcwfcl.resize();
})
