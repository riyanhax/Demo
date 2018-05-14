;(function(window,document,undefined){
    function Chartline1(ops){  	
    	var color = ['#32AACB','#143F4C','#CCCFD1'];
		var data={
			"legend":["产业01", "产业02", "产业03","产业04"],
			"yAxis":["地区1", "地区2", "地区3", "地区4", "地区5"]
		}
		var fontSize = 18;
		var legend = data.legend;
		var yAxis = data.yAxis;
		this.myChart = echarts.init(ops.el)
		

		this.option = {
		    legend: {
		    	right:20,
		    	textStyle:{
            		color:"#33adce",
            		fontSize:20
            	},
		        data: legend
		    },
		    grid: {
		    	top: '10%',
		        left: '2%',
		        right: '5%',
		        bottom: '3%',
		        containLabel: true
		    },
		    tooltip: {
		        "show": true,
                "trigger": "axis",
                "axisPointer":{
                	"lineStyle":{
                		"color":'rgba(0,0,0,0)'
                	}
                },
                "position": function (point, params, dom, rect, size) {
                    var str = '';
                    for (var i = 0; i < params.length; i++) {
                        str += "<p1>" +params[i].seriesName + "</p1> <p2>" + params[i].data + '</p2></br>';
                    }
                    $(dom).html("<div class='tip'><span>" + str + "</span><div class='tip_top block'></div><div class='tip_bottom block'></div><div class='tip_left block'></div><div class='tip_right block'></div></div>");
                    $(dom).find('.tip').css({
                        'border-top': '3px solid #765D25',
                        'border-bottom': '3px solid #2F9CBA',
                        'background-color': 'rgba(0,0,0,0.5)',
                        "padding": "20px 20px",
                        "position": "relative",
                        'background': 'url(../../../assets/imgs/0328-06.png) no-repeat',
                        'background-size':'100% 100%'
                    });
                    $(dom).find('.tip p1').css({'color':'#2D98B6'});
                    $(dom).find('.tip p2').css({'color':'#AD862E'});
                    $(dom).find('.tip span').css({"font-size": fontSize+"px"});
                    $(dom).find('.block').css({
                        "position": "absolute",
                        "width": "100%"
                    });
                    $(dom).find('.tip_top').css({"top": "0px", "left": "0px", 'background-color':'#1B1B1B', "height": "3px"});
                    $(dom).find('.tip_bottom').css({"bottom": "0px", "right": "0px", 'background-color':'#1B1B1B', "height": "3px"});
                },
                "padding": 0,
                "borderRadius": 0
		    },
		    xAxis:  {
		        type: 'value',
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        splitLine:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	color:color[0]
		        }
		    },
		    yAxis: {
		        type: 'category',
		        axisLine:{
		        	show:false
		        },
		        axisTick:{
		        	show:false
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	color:color[0]
		        },
		        data: yAxis
		    },
		    series: [
		        {
		            name: legend[0],
		            barWidth:20,
		            type: 'bar',
		            stack: '总量',
		            itemStyle:{
		            	borderColor:"rgb(157,108,36)",
		            	color:new echarts.graphic.LinearGradient(0, 0, 1,0, [
		            			{
	                                offset: 0,
	                                color: 'rgba(157,108,36,0.1)'
	                            }, {
	                                offset: 0.5,
	                                color: 'rgba(157,108,36,0.5)'
	                            },
	                            {
	                                offset: 1,
	                                color: 'rgba(157,108,36,0.1)'
	                            }
		            	],false)
		            },
		            data: [320, 302, 301, 334, 390]
		        },
		        {
		            name: legend[1],
		            itemStyle:{
		            	borderColor:"rgb(158,158,159)",
		            	color:new echarts.graphic.LinearGradient(0, 0, 1,0, [
		            			{
	                                offset: 0,
	                                color: 'rgba(158,158,159,0.1)'
	                            }, {
	                                offset: 0.5,
	                                color: 'rgba(158,158,159,0.5)'
	                            },
	                            {
	                                offset: 1,
	                                color: 'rgba(158,158,159,0.1)'
	                            }
		            	],false)
		            },
		            type: 'bar',
		            stack: '总量',
		            data: [120, 132, 101, 134, 90]
		        },
		        {
		            name: legend[2],
		            itemStyle:{
		            	borderColor:"rgb(169,160,57)",
		            	color:new echarts.graphic.LinearGradient(0, 0, 1,0, [
		            			{
	                                offset: 0,
	                                color: 'rgba(169,160,57,0.1)'
	                            }, {
	                                offset: 0.5,
	                                color: 'rgba(169,160,57,0.5)'
	                            },
	                            {
	                                offset: 1,
	                                color: 'rgba(169,160,57,0.1)'
	                            }
		            	],false)
		            },
		            type: 'bar',
		            stack: '总量',
		            data: [220, 182, 191, 234, 290]
		        },
		        {
		            name: legend[3],
		            itemStyle:{
		            	borderColor:"rgb(12,88,107)",
		            	color:new echarts.graphic.LinearGradient(0, 0, 1,0, [
		            			{
	                                offset: 0,
	                                color: 'rgba(12,88,107,0.1)'
	                            }, {
	                                offset: 0.5,
	                                color: 'rgba(12,88,107,0.5)'
	                            },
	                            {
	                                offset: 1,
	                                color: 'rgba(12,88,107,0.1)'
	                            }
		            	],false)
		            },
		            type: 'bar',
		            stack: '总量',
		            data: [150, 212, 201, 154, 190]
		        }
		    ]
		};
		this.myChart.setOption(this.option);
    }
    window.Chartline1 = Chartline1
})(window,document)