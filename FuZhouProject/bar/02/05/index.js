$(function(){
	$.ajax({ url: '../../../data/barData_02/data_05.json', dataType:'json', type:"get" ,async: false, success: function(data){
		var color = ['#22768E','#D59F30','#A46436','#1F817B', '#979033', '#1E6777', '#B2802A'];
		var x = data.x;
		var val = data.val;
		var Ymax = Math.floor(Math.max.apply(null, data.data) * 1.5);
		var fontSize = 18;
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var option = {
		    grid: {
		    	top: '15%',
		        left: '15%',
		        right: '5%',
		        bottom: '11%'
		    },
		    xAxis: [{
		        type: 'category',
		        textStyle:{
		        	color: color[0]
		        },
		        data:x,
		        axisLine:{
		        	show:false
		        },
		        splitLine:{
		        	show: true,
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        },
		        axisTick:{
		        	show: false
		        },
		        axisLabel:{
		        	fontSize: fontSize,
		        	color: color[0],
		        	padding:[10, 15],
		        	borderWidth: 1
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        max: Ymax,
		        axisLine:{
		        	lineStyle:{
		        		color: color[0],
		        		width:'3',
		        		opacity:'0.5'
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize
		        },
		        axisTick:{
		        	show: false
		        },
		        splitLine:{
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        },
		        splitArea:{
		        	show: true,
		        	interval:2,
		        	areaStyle:{
		        		color:[hexToRgba(color[0], '0.05'), hexToRgba(color[0], '0')]
		        	}
		        }
		    }],
		    series: []
		};
		var index1 = 0;
		var index2 = 0;
		var indexf = false;
		for ( var i = 0; i < 5; i++) {
			var opt1 = {
		        type: 'bar',
		        barWidth: '10%',
		        name: name[i],
		        barGap: '150%',
		        stack:1,
//		        label:{
//      			normal:{
//      				show:true,
//      				color: color[0],
//      				padding: 5,
//			        	position: 'left',
//			        	fontSize: fontSize - 2,
//			        	formatter: function(params, ticket, callback) {
//			        		if (index2 >= 2) {
//			        			index1 ++;
//			        			index2 = 0;
//			        		}else if (indexf){
//			        			index2 ++;
//			        		}
//							indexf = true;
//							return val[index1][index2];
//							
//			        	}
//      			}
//		        },
		        markPoint:{
		        	itemStyle:{
		        		color:'#fff'
		        	}
		        },
		        itemStyle:{
					normal: {
						borderColor: color[2 + i],
						borderWidth: 1,
                        color: {
                            type: 'bar',
                            colorStops: [
                            {
                                offset: 0,
                                color: hexToRgba(color[2 + i],'0')  // 0% 处的颜色
                            }, 
                            {
                                offset: 0.5,
                                color: hexToRgba(color[2 + i],'0.5') // 100% 处的颜色
                            },
                            {
                                offset: 1,
                                color: hexToRgba(color[2 + i],'0') // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false

                        }
                    }
		       	},
		        data: [Ymax * 0.18, Ymax * 0.18, Ymax * 0.18]
		    }
			var opt2 = {
		        type: 'bar',
		        barWidth: '5%',
		        stack:1,
		        itemStyle:{
					normal: {
						color: hexToRgba(color[2],'0')
                    }
		       },
		        data: [Ymax * 0.02, Ymax * 0.02, Ymax * 0.02]
		    }
			option.series.push(opt1);
			option.series.push(opt2);
		}
		var opt3 = {
	        type: 'bar',
	        barWidth: '40%',
	        markPoint:{
	        	symbol:'image://../../../assets/imgs/0328-07.png',
	        	symbolSize: [60, 60],
	        	symbolOffset: [0, '-90%'],
	        	itemStyle:{
	        		normal:{
						label:{
		                    color:'#CA9933',
		                    fontSize: 24
		                }
	        		}
	        	},
	        	data : [
                    {type : 'max'},
                    {type : 'min'},
                    {type : 'average'}
                ]
	        },
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
	    }
		option.series.push(opt3);
		
//		var opt4 = {
//	    	type:'bar',
//	    	barGap: '-50%',
//	    	barMaxWidth: 3,
//	    	itemStyle:{
//	    		normal:{
//	    			color:color[0]
//	    		},
//	    		emphasis:{
//	    			color:color[1]
//	    		}
//	    	},
//	    	data: data.data
//	    }
//		option.series.push(opt4);
		
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
  	
})
