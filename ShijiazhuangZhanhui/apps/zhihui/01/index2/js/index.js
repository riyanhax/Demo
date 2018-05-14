$(function(){
	var data = {
		data1:{
			monitor:[
		        {value:335, name:'一类监控'},
		        {value:1400, name:'二类监控'},
		        {value:700, name:'双鉴探测器'},
		        {value:679, name:'红外检测器'},
		        {value:679, name:'三类监控'}
		    ],
		    list:[
		    	['88', '88', '98.9%'],
		    	['45', '45', '97.8%'],
		    	['37', '37', '94.6%'],
		    	['28', '18', '100%'],
		    	['18', '18', '100%']
		    ],
		    situation:{
		    	txt1:['8','12','87','4'],
		    	txt2:['280','83','15','12','83','87']
		    },
		    compare:{
		    	data1:[50, 55, 70, 60, 50, 45],
		    	data2:[60, 40, 85, 70, 35, 70]
		    }
		},
		data2:{
			monitor:[
		        {value:500, name:'一类监控'},
		        {value:400, name:'二类监控'},
		        {value:300, name:'双鉴探测器'},
		        {value:450, name:'红外检测器'},
		        {value:122, name:'三类监控'}
		    ],
		    list:[
		    	['75', '74', '99.9%'],
		    	['87', '78', '96.5%'],
		    	['65', '61', '98.6%'],
		    	['42', '42', '100%'],
		    	['35', '30', '90%']
		    ],
		    situation:{
		    	txt1:['10','2','107','8'],
		    	txt2:['300','95','22','14','78','79']
		    },
		    compare:{
		    	data1:[70, 65, 55, 40, 100, 25],
		    	data2:[105, 60, 55, 42, 55, 60]
		    }
		},
		data3:{
			monitor:[
		        {value:300, name:'一类监控'},
		        {value:400, name:'二类监控'},
		        {value:800, name:'双鉴探测器'},
		        {value:230, name:'红外检测器'},
		        {value:400, name:'三类监控'}
		    ],
		    list:[
		    	['50', '78', '95.4%'],
		    	['80', '75', '96.8%'],
		    	['45', '43', '99.6%'],
		    	['65', '53', '97.5%'],
		    	['45', '42', '97.8%']
		    ],
		    situation:{
		    	txt1:['12','20','75','1'],
		    	txt2:['352','85','30','22','97','95']
		    },
		    compare:{
		    	data1:[55, 45, 78, 15, 65, 75],
		    	data2:[60, 85, 45, 105, 54, 34]
		    }
		}
	}
	var myChart = echarts.init(document.getElementsByClassName('top-left')[0]);
	var myChart2 = echarts.init(document.getElementsByClassName('bottom-right')[0]);
	var monitorData = [
        {value:335, name:'一类监控'},
        {value:1400, name:'二类监控'},
        {value:700, name:'双鉴探测器'},
        {value:679, name:'红外检测器'},
        {value:679, name:'三类监控'}
    ];
	var count = 0;
	var option = {
	    backgroundColor: {},
	    color: ['#FF8A00', '#00AEFF', '#2792D6', '#2AE3FF', '#00679E'],
	    series: [
	        {
	            type:'pie',
	            selectedMode: 'single',
	            selectedOffset: 20,
	            radius: [0, '27%'],
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            itemStyle: {
	              normal:{
	                 opacity:0.5
	              }  
	            },
	            data:monitorData
	        },
	        {
	            type:'pie',
	            selectedMode: 'single',
	            selectedOffset: 20,
	            radius: ['36%', '35%'],
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            itemStyle: {
	              normal:{
	                 opacity:0.5
	              }  
	            },
	            data:monitorData
	        },
	        {
	            type:'pie',
	            selectedMode: 'single',
	            selectedOffset: 20,
	            radius: ['70%', '74%'],
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            label: {
	                normal: {
	                    show: false
	                }
	            },
	            itemStyle: {
	              normal:{
	                 opacity:0.3
	              }  
	            },
	            data:monitorData
	        },
	        {
	            type:'pie',
	            radius: ['45%', '70%'],
	            label: {
	                normal: {
	                    show: true,
	                    textStyle: {
	                      fontSize: 21,
	                      color: '#019AE8'
	                    },
	                    formatter: '{d}%\n{b}'
	                },
	                
	            },
	            labelLine:{
	            	normal: {
	                    length:10,
	                    length2:50,
		            	lineStyle:{
		            		color:'#019AE8'
		            	}
	               }
	            },
	            data:monitorData
	        }
	    ]
	};
	myChart.setOption(option);
	
	
	var option2 = {
	    legend: {
	    	top:'20px',
	    	right:'50px',
	    	itemWidth:36,
	    	itemHeight:13,
	    	itemGap:30,
	    	textStyle:{
	    		color:'#008BD0',
	    		fontSize:26
	    	},
	        data:['10月','11月']
	    },
	    grid:{
	    	show:false,
	    	left:'5%',
	    	top:'20%',
	    	right:'5%',
	    	bottom:'12%'
	    },
	    color:['#008BD0', '#F2911E'],
	    xAxis:{
	            type: 'category',
	            data: ['预警事件','区域入侵','物品遗留','违规占道','区域徘徊','其他'],
	            axisLine:{
	            	lineStyle:{
	            		color:'#055183'
	            	}
	            },
	            axisTick:{
	            	show:false
	            },
	            axisLabel:{
	            	fontSize:21,
	            	color:'#00AEFD'
	            }
	    },
	    yAxis: {
	            type: 'value',
	            axisLine:{
	            	lineStyle:{
	            		color:'#055183'
	            	}
	            },
	            axisTick:{
	            	show:false
	            },
	            axisLabel:{
	            	fontSize:21,
	            	color:'#00AEFD'
	            },
	            splitLine:{
	            	lineStyle:{
	            		color:'#055183'
	            	}
	            }
	    },
	    series: [
	        {
	            name:'10月',
	            type:'bar',
	            barCategoryGap:10,
	            barWidth:30,
	            data:[50, 55, 70, 60, 50, 45]
	        },
	        {
	            name:'11月',
	            type:'bar',
	            barCategoryGap:10,
	            barWidth:30,
	            data:[60, 40, 85, 70, 35, 70]
	        }
	    ]
	};
	myChart2.setOption(option2);
	
	var id = setInterval(box, 3000);
	var dataArr = ['data1', 'data2', 'data3'];
	var index = 1;
	function box () {
		if (index < dataArr.length) {
			switchDta(data[dataArr[index]]);
			index ++;
		}else {
			switchDta(data.data1);
			index = 1;
		}
	}
	function switchDta (data) {
		for (var i = 0; i < option.series.length; i++){
			option.series[i].data = data.monitor;
		}
		myChart.setOption(option);
		option2.series[0].data = data.compare.data1;
		option2.series[1].data = data.compare.data2;
		myChart2.setOption(option2);
		for (var i = 0; i < data.list.length; i++){
			for (var j = 0; j < data.list[i].length; j++){
				var tr = $('.top-right').find('tr').eq(i + 1);
				tr.find('td').eq(j + 2).html(data.list[i][j]);
			}
		}
		for ( var i = 0; i < data.situation.txt1.length; i++){
			$('.bottom').find('.accep .val').eq(i).html(data.situation.txt1[i]);
		}
		for ( var i = 0; i < data.situation.txt2.length; i++){
			$('.bottom').find('.handle span').eq(i).html(data.situation.txt2[i]);
		}
	}
})