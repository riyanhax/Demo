$(function(){
	$.ajax({ url: '../../../data/barData_01/data_05.json',  dataType:'json',type:"get" ,async: false, success: function(data){
		var color = ['#2FA0BF','#D59F30','#2FA0BF'];
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
		    grid: {
		    	top: '15%',
		        left: '5%',
		        right: '2%',
		        bottom: '10%'
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
		        	margin: 20,
		        	padding:[0,0,0,40]
		        },
		        axisTick:{
		        	show: false
		        }
		    }],
		    yAxis: [{
		        type: 'value',
		        splitNumber: 4,
		        name: '/个',
		        splitArea:{
		        	show: true,
		        	interval:2,
		        	areaStyle:{
		        		color:[hexToRgba(color[0], '0.05'), hexToRgba(color[0], '0')]
		        	}
		        },
		        nameTextStyle:{
		        	fontSize: fontSize,
		        	padding:[0, 0, -25, 100]
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
		        type: 'bar',
		        barWidth: '30%',
		        markPoint:{
		        	symbol:'image://../../../assets/imgs/0328-07.png',
		        	symbolSize: [72, 68],
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
