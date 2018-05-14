$(function(){
	$.ajax({ url: '../../../data/barData_01/data_04.json', dataType:'json', type:"get" ,async: false, success: function(data){
		var color = ['#2FA0BF','#D59F30','#2FA0BF'];
		var legend = data.legend;
		var fontSize = 18;
		var xAxis = data.xAxis;
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var option = {
		    title: {
		        text: '扬州市创新创业政策发布状况',
		        top: '4%',
		        left: '2%',
		        textStyle:{
		        	color:'#2E9FBE',
		        	fontSize:20
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
                    var dw = ['个', '万元'];
                    for (var i = 0; i < params.length; i++) {
                        str += "<p1>" +params[i].seriesName + "</p1> <p2>" + params[i].data + "</p2><p1>"+ dw[i] +"</p1></br>";
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
                    $(dom).find('.tip span').css({"font-size": "20px"});
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
		    legend:{
		    	data: legend,
		    	top:'4%',
		    	right:'2%',
		    	itemGap: 30,
		    	itemWidth: 15,
		    	itemHeight: 15,
		    	textStyle:{
		    		color:color[0],
		    		fontSize: fontSize,
		    	}
		    },
		    grid: {
		    	top: '15%',
		        left: '6%',
		        right: '6%',
		        bottom: '9%'
		    },
		    xAxis: [{
		        type: 'category',
		        data: xAxis,
		        name: '/年',
		        nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[40, 0, 0, -15]
		        },
		        axisLine:{
		        	lineStyle:{
		        		color:'#22768E'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	margin: 10
		        },
		        axisTick:{
		        	show: false
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        splitNumber: 4,
		        name: '数量/个',
		        position: 'left',
		        nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[0, 0, -25, 110]
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
		    },
		    {
	            type: 'value',
	            name: '营收/万元',
	            splitNumber: 4,
	            min: 0,
	            max: 400,
	            position: 'right',
	            nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[0, 120, -25, 0]
		        },
	            axisLine: {
	                lineStyle:{
		        		color:'#22768E'
		        	}
	            },
	            axisTick:{
		        	inside:true,
		        	length: 10,
		        	lineStyle:{
		        		color:'#32A9C9'
		        	}
		        },
	            splitLine:{
	            	show: false
	            },
	            axisLabel: {
	            	fontSize: fontSize
	            }
	        }
		    ],
		    series: [{
		        type: 'bar',
		        barWidth: '30%',
		        name: legend[0],
		        itemStyle:{
					normal: {
						borderColor: color[0],
						borderWidth: 1,
                        color: {
                            type: 'bar',
                            colorStops: [
                            {
                                offset: 0,
                                color: hexToRgba(color[0], '0')  // 0% 处的颜色
                            }, 
                            {
                                offset: 0.5,
                                color: hexToRgba(color[0], '0.5') // 100% 处的颜色
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[0], '0') // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false

                        }
                    },
                    emphasis:{
                    	borderColor: color[1],
						borderWidth: 1,
                        color: {
                            type: 'bar',
                            colorStops: [
                            {
                                offset: 0,
                                color: hexToRgba(color[1], '0')  // 0% 处的颜色
                            }, 
                            {
                                offset: 0.5,
                                color: hexToRgba(color[1], '0.5')  // 100% 处的颜色
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[1], '0') // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false

                        }
                    }
		       },
		        data: data.data
		    },
		    {
		    	type:'line',
		    	name: legend[1],
		    	symbolSize:60,
		    	symbol:'image://../../../assets/imgs/0328-12.png',
		    	lineStyle:{
		    		normal:{
		    			type:'dashed',
		    			color:color[0]
		    		}
		    	},
		    	data:data.lineData
		    }]
		};
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
	
})
