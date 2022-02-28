export default function entInfoLineEcharts(self,xdata,ydata,type) {
    var color = '#2198E2';
    if(type==1){
        color = '#2198E2';
    }else if(type == 2){
        color = '#42E4B7';
    }else if(type == 3){
        color = '#F8CE9B';
    }
    var symbol = 'circle';
    if(ydata && ydata.length>1){
        symbol = 'none';
    }
    let option = {
       /* grid: [
            {x: '5%', y: '5%', width: '80%', height: '80%'}
        ],*/
        color: [color],
        grid: {
            top: 10,
            left:10,
            right:15,
            bottom:5
        },
        //提示框
        tooltip: {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
                return params[0].value[1]+" kg";
            },
        },
        // x轴
        xAxis: {
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                fontSize: 10,
            },
            data:xdata,
        },
        // y轴
        yAxis: [
            {
                type: 'value',
                nameTextStyle: {
                    align: 'left'
                },
                axisLabel: {
                    fontSize: 10,
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,.3)',
                        type: 'dotted'
                    }
                },
            },
        ],
        // 数据
        series: [
            {
                type: 'line',
                label: {
                    show: false,
                },
                symbol: symbol,
                lineStyle: {
                    width: 0,
                },
                areaStyle: {
                    opacity: 1,
                },
                data: ydata,
            }
        ],
    };
    let kucunEchars = echarts.init(document.getElementById('kucunEchars'), 'skinUpp');
    kucunEchars.setOption(option,true);
    $(window).on('resize', function () {
        kucunEchars.resize();
    })
}
