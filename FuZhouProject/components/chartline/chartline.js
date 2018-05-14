;(function(window,document,undefined){
    function Chartline(ops){

        var blueSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA3lBMVEX///8zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc4zrc7///+xxXthAAAASHRSTlMAIi8BE49phT1nTSCLCSaIBmBUAn01A77f3SUQjhc+dmazSGwKH+pGBSsaCyr8cm5FW1mXBw2NFe9PgDFEcDBDcYIbLGRaVWiOMnmnAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+IDHRAeFk44zEUAAACfSURBVAjXLY/XAoJADARXEM+CXRHEXil2BTt25f+/yGvzcEnmHrIBKAlFoEKQ1FIckpYikxU1p+d5LRRL8qdcYW+1VofRME2rCbvVpqLTVdGLKX1gMARG+hj2hIl4Coe48DQfszkXC2C5AtYbYMtmaweXOEAQetgfqDjCOJ3ZmsuVRogiBbjd+XbjoYgYQfgUzYuIU94fGRBfccvPp/0fEYkSPlK77+8AAAAASUVORK5CYII='
        var yellowSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAMAAAAR8Wy4AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA6lBMVEX////usDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDPusDP///+DuKlwAAAATHRSTlMAByYTUoNzdoIDFI8QcUNpSxqNDSiGBT6/fllbAjQE0vwtC4wcQHQBaEFnTqrxDpEKF44l+XVuR1Vfi9oGLAkgDD8vPXdEcHwpGSRKctb04AAAAAFiS0dEAIgFHUgAAAAHdElNRQfiAx0QICG3QHI3AAAApElEQVQI1y2P5RaCQBSExwBRMTAXA1vswEAxEDv2/Z/HXZbvz9yZc88NAAiFBREERCWZE1PiwieSqihSaaGZbNCp5fJcCsUSyoQQHahUma/pdRgNSmmzhXanC/T6JgaUQ4ChDIzGwMQPpjNo8wWWlorVmgcbYGuzIbs94DB/OOIkGSw4Oy4unue5MJSrv/52N8Udj6dQ82X7r7ytT3DhVxb8uPkDe4IT6n/KNScAAAAASUVORK5CYII='
        var whiteSymbol = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAANCAQAAAAKsiavAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiAx0QIRjxXst+AAAA7UlEQVQY01XRPyuFARiG8d97HCGRTbajfAQZjkRKlGREWX0DRUaDktJRdrNSZzFYxECyGqwMBjYlg6LbcA5e1z0+PX+6niLarBlVpukMpJWR7KYrfjOY/QxEVEBhSdNHqf/FjUWogrovt5gzC47cObWt5lGkO3sZjvTnOS2uU0QmspGignn3HrBlsL2gbgVXOo1JRw5Si1Tzmj+uozWj4suFGXw6LB3ZQMW0c5Gu7GYk0pundv9lRKaynqKKD01LdrxbNQmO0WtB40dLkc2MlzSJLGc18mtyOHvpKZWHsp++SFsUD+41/v3ixBt8A6SUmUOwK8RLAAAAAElFTkSuQmCC'
        var symbolSize = 30

        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight()

        this.option = option = {
            title: {
                text: '折线图堆叠',
                textStyle:{
                    color:'#33adce',
                    fontSize:32
                }
            },
            legend: {
                type:'plain',
                right:0,
                top:10,
                itemWidth:18,
                itemHeight:18,
                itemGap: 40,
                show:true,
                textStyle: {
                    color:'#33adce',
                    fontSize:16
                },
                data: [{
                    name: '技改券',
                    icon: 'rect'
                },
                {
                    name: '创新券',
                    icon: 'rect'
                },
                {
                    name: '服务券',
                    icon: 'rect'
                }]
            },
            grid: {
                top:'9%',
                left: '3%',
                right: '5%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['2013','2014','2015','2016','2017'],
                axisTick: {
                    alignWithLabel: true
                },
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                }
            },
            yAxis: {
                type: 'value',
                axisLine:{
                    lineStyle:{
                        color:'#236e82'
                    }
                },
                splitNumber:4,
                axisTick: {
                    show:true
                },
                splitLine: {
                    show:true,
                    lineStyle:{
                        color:'#122025',
                        width:2
                    }
                },
                axisLabel: {
                    fontSize:20
                },
                splitArea: {
                    show: true,
                    interval: '1',
                    areaStyle:{
                        color:[
                            new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(8, 23, 29, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(8, 23, 29, 0.2)'
                            }]),
                            'transparent'
                        ]
                    }
                }
            },
            series: [
                {
                    symbol:'image://'+blueSymbol,
                    symbolSize:symbolSize,
                    name: '技改券',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210],
                    itemStyle: {
                        color:'#33adce'
                    }
                },
                {
                    symbol:'image://'+whiteSymbol,
                    symbolSize:symbolSize,
                    name: '创新券',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310],
                    itemStyle: {
                        color:'#fff'
                    }
                },
                {
                    symbol:'image://'+yellowSymbol,
                    symbolSize:symbolSize,
                    name: '服务券',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410],
                    itemStyle:{
                        color:'#eeb033'
                    }
                }
            ]
        }
        
        this.myChart.setOption(this.option)
    }

    window.Chartline = Chartline
})(window,document)