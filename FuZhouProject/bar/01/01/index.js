$(function(){
	$.ajax({ url: '../../../data/barData_01/data_01.json',  dataType:'json',type:"get" ,async: false, success: function(data){
		var color = ['#2FA0BF','#32ADCC','#CCCFD1'];
		var legend = data.legend;
		var xAxis = data.xAxis;
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var fontSize = 18;
		var option = {
		    title: {
		        text: '扬州市各种科技获奖统计趋势分析',
		        top: '4%',
		        left: '2%',
		        textStyle:{
		        	color:'#2E9FBE',
		        	fontSize: fontSize
		        }
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
		    legend: {
		        data: legend,
		        align: 'left',
		        top: '4%',
		        right: '2%',
		        textStyle:{
		        	color:'#22768E',
		        	fontSize: fontSize
		        },
		        itemWidth: 15,
		        itemHeight: 15,
		        itemGap: 30
		    },
		    grid: {
		    	top: '15%',
		        left: '2%',
		        right: '2%',
		        bottom: '5%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        data: xAxis,
		        name: '/年',
		        nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[60, 0, 0, -45]
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:'#22768E'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	margin: 20
		        },
		        axisTick:{
		        	show: false
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        splitNumber: 4,
		        splitArea:{
		        	show: true,
		        	interval:2,
		        	areaStyle:{
		        		color:[hexToRgba(color[0], '0.05'), hexToRgba(color[0], '0')]
		        	}
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:'#22768E'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize
		        },
		        axisTick:{
		        	inside:true,
		        	length: 10,
		        	lineStyle:{
		        		color:'#32A9C9'
		        	}
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        }
		    }],
		    series: [{
		        name: legend[0],
		        type: 'bar',
		        stack: 1,
		        barWidth: '8%',
		        barGap:'100%',
		        itemStyle:{
					normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0, color: 'rgba(233, 173, 51, 1)'
	                    }, {
	                        offset: 1, color: 'rgba(233, 173, 51, 0.5)'
	                    }], false)
	                }
		        },
		        data: data.data1
		    }, {
		        name: legend[1],
		        type: 'bar',
		        stack: 2,
		        barWidth: '8%',
		        itemStyle:{
					normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0, color: 'rgba(51, 173, 206, 1)'
	                    }, {
	                        offset: 1, color: 'rgba(51, 173, 206, 0.5)'
	                    }], false)
	                }
		        },
		        data: data.data2
		    }, {
		        name: legend[2],
		        type: 'bar',
		        stack: 3,
		        barWidth: '8%',
		        itemStyle:{
					normal: {
	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                        offset: 0, color: 'rgba(251, 251, 251, 1)'
	                    }, {
	                        offset: 1, color: 'rgba(251, 251, 251, 0.5)'
	                    }], false)
	                }
		        },
		        data: data.data3
		   	}]
		};
//		for ( var i = 0; i < legend.length; i++){
//			var rect1 = {
//	            name: legend[i],
//	            type: 'bar',
//	            stack: i + 1,
//	            itemStyle: {
//	                normal: {
//	                    // color: '#fff',
//	                    color: 'transparent',
//	                    barBorderColor: 'white',
//	                    barBorderWidth: 0,
//	                    barBorderRadius: 0,
//	                    label: {
//	                        show: false,
//	                        position: 'top',
//	                        textStyle: {
//	                            color: 'tomato'
//	                        }
//	                    }
//	                }
//	            },
//	            data: [0.2,0.2,0.2],
//	            tooltip: {
//	                show: false
//	            }
//	       	};
//	        var rect2 = {
//		        name: legend[i],
//		        type: 'bar',
//		        stack: i + 1,
//		        itemStyle: {
//		            normal: {
//		                color: color[i],
//		                barBorderColor: 'white',
//		                barBorderWidth: 0,
//		                barBorderRadius: 0,
//		                label: {
//		                    show: false,
//		                    position: 'top',
//		                    textStyle: {
//		                        color: 'tomato'
//		                    }
//		                }
//		            }
//		        },
//		        data: [0.3,0.3,0.3],
//		        tooltip: {
//		            show: false
//		        }
//		    }
//	        option.series.push(rect1);
//	        option.series.push(rect2);
//		}
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
	
})
