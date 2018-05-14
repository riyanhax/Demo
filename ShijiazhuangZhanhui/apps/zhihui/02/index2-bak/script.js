var xAxisData = []
var seriesData = [];
for(var i=0;i<12;i++){
    xAxisData.push(i)
    seriesData.push(i>0?Math.random()*500:0)
}
var option = {
    title: {
        text: '摄氏度',
        textStyle:{
            color:'#4ad2ee'
        },
        top:62
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        type:'plain',
        itemWidth: 15,
        itemHeight: 15,
        top:62,
        right:0,
        data:[{
            icon:'rect',
            name:'图例一'
        },
        {
            icon:'rect',
            name:'图例二'
        }],
        textStyle:{
            color:'#00adfe'
        }
    },
    grid: {
        top:106,
        left: '0',
        right: 10,
        bottom: 83,
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : xAxisData,
            axisLine:{
                lineStyle:{
                    color:'#163055'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#00adfe'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#1e2648'
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value',
            max:700,
            axisLine:{
                show:false
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:'#1e2648'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#00adfe'
                }
            }
        }
    ],
    series : [
        {
            name:'图例一',
            type:'line',
            stack: '总量',
            smooth:true,
            label:{
                show:true
            },
            itemStyle:{
                normal:{
                    color:'#4ad2ee',
                    borderColor:'#81205e',
                    borderWidth:5,
                    opacity:0.7,
                    label:{
                        show:true,
                        formatter:function(data){
                            return data.value.toFixed(0)
                        },
                        textStyle:{
                            fontSize:20
                        }
                    }
                }
            },
            symbolSize: 10,
            symbolOffset: [0, -30],
            areaStyle: {normal: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#2b7590' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#0a153b' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                }
            }},
            lineStyle:{
                normal:{
                    color:'#4ad2ee'
                }
            },
            data:seriesData
        },
        {
            name:'图例二',
            type:'line',
            itemStyle:{
                normal:{
                    color:'#e61e79'
                }
            },
            data:[]
        }
    ]
};

var chartsOne = echarts.init($('.charts-box').get(0));
var chartsTwo = echarts.init($('.charts-box').get(1));

$('<div class="title-info"><span>温度曲线</span></div>').appendTo($('.charts-box').eq(0))
$('<div class="title-info"><span>湿度曲线</span></div>').appendTo($('.charts-box').eq(1))

chartsOne.setOption(option)
resetData()
chartsTwo.setOption(option)

function resetData(){
    option.series[0].data = []
    for(var i=0;i<12;i++){
        option.series[0].data.push(i>0?Math.random()*500:0)
    }
}

setInterval(function(){
    resetData()
    chartsOne.setOption(option)
    resetData()
    chartsTwo.setOption(option)
},3000)
