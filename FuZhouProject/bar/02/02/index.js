$(function(){
	$.ajax({ url: '../../../data/barData_02/data_02.json',  dataType:'json',type:"get" ,async: false, success: function(data){
		var color = ['#32AACB','#E4AA38','#CCCFD1'];
		var xAxis = data.xAxis;
		var fontSize = 20;
		var max = Math.max.apply(null, data.data);
		var myChart = echarts.init(document.getElementsByClassName('column')[0]);
		var option = {
		    grid: {
		    	top: '10%',
		        left: '2%',
		        right: '8%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [{
		        type: 'category',
		        data: xAxis,
		        axisLine:{
		        	lineStyle:{
		        		color: color[0]
		        	}
		        },
		        axisLabel:{
		        	fontSize:fontSize,
		        	margin: 10,
		        	padding:[0,0,0,40]
		        },
		        axisTick:{
		        	show: false
		        },
		        splitLine:{
		        	show: true,
		        	lineStyle:{
		        		color:'#142026'
		        	}
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        max: max * 1.8,
		        splitArea:{
		        	show: true,
		        	interval:2,
		        	areaStyle:{
		        		color:[hexToRgba(color[0], '0.05'), hexToRgba(color[0], '0')]
		        	}
		        },
		        axisLine:{
		        	lineStyle:{
		        		color: color[0]
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
		        }
		    }],
		    series: [{
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
			                    fontSize: fontSize
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
		    },
		    {
		    	type:'bar',
		    	barGap: '-50%',
		    	barMaxWidth: 1,
		    	itemStyle:{
		    		normal:{
		    			color:color[0]
		    		},
		    		emphasis:{
		    			color:color[1]
		    		}
		    	},
		    	data: data.data
		    }
		    ]
		};
		myChart.setOption(option);
		function hexToRgba(hex, opacity) { 
			return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
		}
  	}});
	
})
