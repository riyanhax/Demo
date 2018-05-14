;(function(window,document,undefined){
    function Radar(ops){

        this.myChart = echarts.init(ops.el)
        this.initWidth = ops.width || this.myChart.getWidth()
        this.initHeight = ops.height || this.myChart.getHeight()
        this.radarRadius = this.VHRatio(this.initWidth,this.initHeight)/2

        this.data = ops.data || [100, 600, 300, 200, 600]
        this.indicator = ops.indicator || [
            { text: '企业健康度' },
            { text: '政策' },
            { text: '人才' },
            { text: '成果' },
            { text: '金融' }
        ]

        this.option = {
            radar: [
                {
                    indicator: this.indicator,
                    center: [ops.x || '35%', ops.y || '50%'],
                    radius: this.radarRadius,
                    startAngle: 90,
                    splitNumber: 3,
                    shape: 'circle',
                    name: {
                        formatter:'{value} ',
                        textStyle: {
                            color:'#31a6c5'
                        },
                        fontSize:this.radarRadius*0.1
                    },
                    nameGap:this.radarRadius*0.11,
                    splitArea: {
                        areaStyle: {
                            color: [
                                '#b7b9ba',
                                new echarts.graphic.RadialGradient(0.5, 0.5, 0.5,  [{
                                    offset: 0.75, color: 'rgba(18,98,113,0.05)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(18,98,113,0.45)' // 100% 处的颜色
                                }], false),
                                new echarts.graphic.RadialGradient(0.5, 0.5, 0.5,  [{
                                    offset: 0.75, color: 'rgba(18,98,113,0.05)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(18,98,113,0.45)' // 100% 处的颜色
                                }], false)
                            ]
                        }
                    },
                    axisTick:{
                        show:true
                    },
                    axisLine: {
                        lineStyle: {
                            width:2,
                            color: '#125e6d',
                            type:'dasshed'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            width:2,
                            color: ['#125e6d','#b7b9ba','#125e6d']
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    symbolSize:0,
                    data: [
                        {
                            value: this.data,
                            name: '图二',
                            lineStyle:{
                                color:'#eeb033'
                            },
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5,  [{
                                        offset: 0.65, color: 'rgba(238,176,51,0.08)' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: 'rgba(238,176,51,0.45)' // 100% 处的颜色
                                    }], false),
                                }
                            }
                        }
                    ]
                },
                {
                    type: 'radar',
                    symbol:'circle',
                    symbolSize:this.radarRadius*0.061,
                    animation:false,
                    itemStyle:{
                        normal:{
                            color:'transparent',
                            borderColor:'#32a9c9',
                            borderWidth:2
                        }
                    },
                    data: [
                        {
                            value: [1000, 1000, 1000, 1000, 1000]   
                        },
                        {
                            value: [0, 0, 0, 0, 0]
                        },
                        {
                            value: [-1000, -1000, -1000, -1000, -1000]
                        }
                    ]
                }
            ]
        }

        this.myChart.setOption(this.option)
        this.drawLenged(ops)
    }

    Radar.prototype.VHRatio = function(w,h){
        return w>h?h*0.78:w
    }

    Radar.prototype.update = function(ops){
        this.option.series[0].data[0].value = ops.data;
        this.myChart.setOption(this.option)
    }

    Radar.prototype.drawLenged = function(ops){
        
        var gradient = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            offset: 0,
            color: 'rgba(27, 27, 27, 0.5)'
        }, {
            offset: 0.5,
            color: 'rgba(9, 42, 48, 0.9)'
        },
        {
            offset: 1,
            color: 'rgba(27, 27, 27, 0.5)'
        }])

        var x = (ops.lenged && ops.lenged.x) || ops.x+this.radarRadius*1.8 || this.initWidth*0.35+this.radarRadius*1.8
        var y = (ops.lenged && ops.lenged.y) || ops.y || this.initHeight/2

        var width = this.radarRadius*0.92
        var height = width*1.3
        
        this.createRect(x,y,width,height,gradient)
        this.createRect(x,y,width,width*0.076,'#1b1b1b')
        this.createRect(x,y+width*0.076,width,width*0.076/2,'#000')
        this.createRect(x,y,width,width*0.076/4,'#a67d29')
        this.createRect(x,y+height-width*0.076,width,width*0.076,'#1b1b1b')
        this.createRect(x,y+height-width*0.076,width,width*0.076/4,'#2d8ca6')
        this.createRect(x,y+height-width*0.076-width*0.076/2,width,width*0.076/2,'#000')

        this.createText(x,y+width*0.076+width*0.076/4,width,width*1.105)

    }

    Radar.prototype.createRect = function(x,y,w,h,color){
        var rect = new zrender.Rect({
            shape:{
                x:x,
                y:y,
                width:w,
                height:h
            },
            style:{
                fill:color   
            }
        })
       this.myChart._zr.add(rect)
    }

    Radar.prototype.createText = function(x,y,width,height){
        var singleHeight = height/this.indicator.length
        var _this = this
        zrender.util.map(this.indicator,function(lenged,i){
            var rect = new zrender.Rect({
                shape:{
                    x:x,
                    y:y+i*singleHeight,
                    width:width,
                    height:singleHeight
                },
                style:{
                    fill:'transparent' ,
                    text:lenged.text,
                    textFill:'#2a89a2',
                    fontSize:height*0.08,
                    fontFamily:'微软雅黑',
                    textAlign:'left',
                    textPosition:[10,singleHeight/2],
                    textVerticalAlign:'middle'
                }
            })
            var textWidth = height*0.08*lenged.text.length+height*0.08/2
            var rect2 = new zrender.Rect({
                shape:{
                    x:x,
                    y:y+i*singleHeight,
                    width:width,
                    height:singleHeight
                },
                style:{
                    fill:'transparent' ,
                    text:_this.data[i],
                    textFill:'#aa8631',
                    fontSize:height*0.08,
                    fontFamily:'微软雅黑',
                    textAlign:'left',
                    textPosition:[textWidth,singleHeight/2],
                    textVerticalAlign:'middle'
                }
            })
           _this.myChart._zr.add(rect)
           _this.myChart._zr.add(rect2)
        })
        
    }

    window.Radar = Radar
})(window,document)