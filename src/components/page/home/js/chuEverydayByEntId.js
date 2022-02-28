const echarts = require('echarts');
const axios = require('axios');
export default function getzhuanyun(self) {
    let params = new URLSearchParams();
    params.append('entId',self.entId);
    params.append('startTime',new Date(self.startTime));
    params.append('endTime',new Date(self.endTime));
    axios.post(
        '/api/enterprise/homeDeal/queryChuOrderByEntId', params
    ).then(function (res) {
        if(res.code==0){
            if(res.data!=null){
                initChartQsjk(self,res.data.addList);
            }

        }
    }).catch(function (err) {
        // console.log(err);
    });
}

const initChartQsjk = function(self,data) {
    let sericeData=[];
    let  legendData= [];
    var chartQsjc = echarts.init(document.getElementById('chartZhuanyunHa'),'skinUpp');
    if(data!=null){
        for (let i = 0; i < data.length; i++) {
            let arr=new Array();
            arr.push(data[i].time);
            legendData.push(data[i].time);
            arr.push(data[i].data);
            sericeData.push(arr);
        }
    }

    var option = {
        color:['#7DBCF8'],
        //提示框
        tooltip : {
            trigger: 'axis',
        },
        legend: {
            data: ['进行中']
        },
        // x轴
        xAxis: {
            type: 'category',
            data: legendData,
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
                name:'进行中',
                type: 'bar',
                data: sericeData,
                barWidth:30,
                // itemStyle: {
                //     normal: {
                //         barBorderRadius: [4, 4, 0, 0],
                //     },
                // },
            }
        ],
    };
    chartQsjc.setOption(option);
    $(window).on('resize',function(){
        chartQsjc.resize();
    })
};
