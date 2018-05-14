var xAxisData = []
var seriesData = [];
var seriesData2 = [];
for(var i=0;i<24;i++){
    var H = i>9?i:'0'+i
    xAxisData.push(H+':00')
    var data = i>0?Math.random()*500:0;
    seriesData.push(data.toFixed(0))
    seriesData2.push(600)
}
var option = {
    title: {
        text: '温度曲线',
        textStyle:{
            color:'#298aff',
            fontSize:24
        },
        top:0,
        left:30
    },
    tooltip : {
        show:false
        
    },
    grid: {
        top:0,
        left: 0,
        right: 10,
        bottom: 90,
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
            splitNumber: 50,
            data : xAxisData,
            axisLine:{
                show:false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#1c5eac',
                    fontSize:16
                }
            },
            splitLine:{
                show:false
                
            },
            axisTick: {
                show:false
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
                show:false
            },
            axisLabel: {
                show: false
            },
            axisTick: {
                show:false
            }
        }
    ],
    series : [
        {
            name:'图例一',
            type:'line',
            stack: '总量',
            smooth:false,
            label:{
                normal:{
                    show:true,
                    color:'#2272d2'
                }
            },
            itemStyle:{
                normal:{
                  color:'#fff' 
                }
            },
            symbol:'image://./img/symbol.png',
            symbolSize: 20,
            areaStyle: {},
            lineStyle:{
                normal:{
                    color:'#298aff'
                }
            },
            data:seriesData,
        },
        {
            name:'柱形图',
            type:'bar',
            itemStyle:{
                normal:{
                    color:'#0a1421'
                }
            },
            data:seriesData2
        }
        
    ]
};

var chartsOne = echarts.init($('.charts-box').get(0));
var chartsTwo = echarts.init($('.charts-box').get(1));

chartsOne.setOption(option)
resetData()
chartsTwo.setOption(option)

function resetData(){
    option.series[0].data = []
    for(var i=0;i<24;i++){
        var data = i>0?Math.random()*500:0;
        option.series[0].data.push(data.toFixed(0))
    }
}

chartsOne.dispatchAction({
    type: 'highlight',
    dataIndex: 6

})

setInterval(function(){
    resetData()
    chartsOne.setOption(option)
    resetData()
    chartsTwo.setOption(option)
},3000)
