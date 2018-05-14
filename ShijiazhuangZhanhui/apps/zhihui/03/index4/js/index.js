$(function () {
	var data = {
		monthNow: [
			['甲烷', '一氧化碳', '风速', '温度', '管道负压', '二氧化碳', '水位停止', "风门超时", '风扇开停', '传输异常', '系统断线'],
			[20, 80, 30, 50, 60, 40, 100, 20, 60,70,80]
		],
		monthPrev: [
			['甲烷', '一氧化碳', '风速', '温度', '管道负压', '二氧化碳', '水位停止', "风门超时", '风扇开停', '传输异常', '系统断线'],
			[60, 40, 100, 20, 80, 30, 50, 20, 60, 90,110]
		],
		warn: {
			name: "按告警级别区分",
			data: [
				['蓝色', '黄色', '橙色', '红色'],
				[60, 100, 80, 40],
				[50, 90, 70, 30],
				["#ffc801", "#ffc801", "#e12921", "#ffc801"]
			]
		},
		warns: {
			name: "按处置情况区分",
			data: [
				['未结束', '升级未处理', '未处置', '结束未处置'],
				[30, 80, 120, 70],
				[20, 70, 110, 60],
				["#ffc801", "#ffc801", "#e12921", "#ffc801"]
			]
		}
	}
	var myCharts = echarts.init(document.getElementById("contentBot"));
	option = {
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLine: {
				lineStyle: {
					color: "#3a3a3a"
				}
			},
			axisLabel: {
				textStyle: {
					fontSize: "16",
					color: "#fff"
				}
			},
			splitLine: {
				lineStyle: {
					color: ["#3a3a3a"]
				}
			},
			type: 'category',
			data: data.monthNow[0]
		},
		yAxis: {
			name: "警告次数(次)",
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLine: {
				lineStyle: {
					color: "#3a3a3a"
				}
			},
			axisLabel: {
				textStyle: {
					fontSize: "16",
					color: "#fff"
				}
			},
			splitLine: {
				lineStyle: {
					color: ["#3a3a3a"]
				}
			},
			color: "#3a3a3a",
			type: 'value'
		},
		series: [{
			name: "上月",
			data: data.monthNow[1],
			type: 'line',
			symbol: 'circle',
			symbolSize: 16,
			lineStyle: {
				normal: {
					color: '#ffc801',
					width: 2,
					type: 'solid'
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 2,
					borderColor: '#ffc801',
					color: '#fff'
				}
			}
		},{
			name: "本月",
			data: data.monthPrev[1],
			type: 'line',
			symbol: 'none',
			symbolSize: 16,
			lineStyle: {
				normal: {
					color: '#22ac38',
					width: 2,
					type: 'solid'
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 2,
					borderColor: '#22ac38',
					color: 'rgba(255,255,255,0)'
				}
			}
		},]
	};
	myCharts.setOption(option);
	// $(".contentBoxMonth p:eq(1) span").on("click", function () {
	// 	//$(this).toggleClass("selected");
	// 	option.xAxis.data = data.monthNow[0];
	// 	option.series[0].data = data.monthNow[1];
	// 	myCharts.setOption(option, true);
	// });
	// $(".contentBoxMonth p:eq(0) span").on("click", function () {
	// 	//$(this).toggleClass("selected");
	// 	option.xAxis.data = data.monthPrev[0];
	// 	option.series[0].data = data.monthPrev[1];
	// 	myCharts.setOption(option, true);
	// });
	var switchs = false;
	// setInterval(function(){
	// 	if(!switchs){
	// 		option.xAxis.data=data.monthPrev[0];
	// 		option.series[0].data=data.monthPrev[1];
	// 		myCharts.setOption(option,true);
	// 		switchs=true;
	// 	}else{
	// 		option.xAxis.data=data.monthNow[0];
	// 		option.series[0].data=data.monthNow[1];
	// 		myCharts.setOption(option,true);
	// 		switchs=false;
	// 	}
	// },3000)


	var myChartBot = echarts.init(document.getElementById("contentLeftBot"));
	optionBot = {
		tooltip: {
			trigger: 'axis',
		},
		title:{
			text:'上月告警原因',
			textStyle:{
				color: "#fff",
				fontSize:22,
				fontWeight:'normal'
			},
			left:'center',
			top:10
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			// type: 'category',
			// boundaryGap: [0, 0.01],
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize:16
				}
			},
			data: ['事故警告', '生产作业', '软件故障', '硬件故障','通信故障','外界因素','其他'],
		},
		yAxis: {
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			type: 'value',
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize:16
				}
			},
		},
		series: [
			{
				name: '上月',
				type: 'pictorialBar',
				symbol: 'rect',
				
				itemStyle: {
					normal: {
						color:'#22ac38'
					}
				},
				symbolRepeat: true,
				symbolMargin: 2,
				symbolSize:[56,12],
				z: -10,
				data: [70, 60, 30, 92,100,25,30]
			},{
				type:'bar',
				itemStyle:{
					normal:{
						color:new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 0.8,
							color: "transparent" // 100% 处的颜色
						}], false)
					}
				},
				data:[30,30,30,30,30,30,30]
			}
		]
	}
	
	var seriesPrev = {
		data: [
			{
				value: data.warn.data[1][0],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warn.data[3][0]
					}
				}
			},
			{
				value: data.warn.data[1][1],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warn.data[3][1]
					}
				}
			},
			{
				value: data.warn.data[1][2],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warn.data[3][2]
					}
				}
			},
			{
				value: data.warn.data[1][3],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warn.data[3][3]
					}
				}
			}
		],
		barWidth: "54"
	}
	var seriesNow = {
		name: '本月',
		type: 'bar',
		data: data.warn.data[2],
		barWidth: "54",
		barGap: "-100%",
		itemStyle: {
			normal: {
				color: function (params) {
					var colorList = data.warn.data[3];
					return colorList[params.dataIndex]
				}
			}
		}

	}
	// optionBot.series.push(seriesPrev);
	// optionBot.series.push(seriesNow);
	myChartBot.setOption(optionBot);

	// $(".contentBoxLeft .contentLeftTop p:eq(0) span").on("click", function () {
	// 	optionBot.series = [];
	// 	myChartBot.setOption(optionBot, true);
	// 	$(this).toggleClass("selected");
	// 	if (!$(this).hasClass("selected")) {
	// 		optionBot.series.push(seriesPrev);
	// 	};
	// 	if (!$(".contentBoxLeft .contentLeftTop p:eq(1) span").hasClass("selected")) {
	// 		optionBot.series.push(seriesNow);
	// 	}
	// 	myChartBot.setOption(optionBot, true);
	// });
	// $(".contentBoxLeft .contentLeftTop p:eq(1) span").on("click", function () {
	// 	optionBot.series = [];
	// 	myChartBot.setOption(optionBot, true);
	// 	if (!$(".contentBoxLeft .contentLeftTop p:eq(0) span").hasClass("selected")) {
	// 		optionBot.series.push(seriesPrev);
	// 	}
	// 	$(this).toggleClass("selected");
	// 	if (!$(this).hasClass("selected")) {
	// 		optionBot.series.push(seriesNow);
	// 	}
	// 	myChartBot.setOption(optionBot, true);
	// });


	var myChartRight = echarts.init(document.getElementById("contentRightBot"));
	optionRight = {
		tooltip: {
			trigger: 'axis',
		},
		title:{
			text:'本月告警原因',
			textStyle:{
				color: "#fff",
				fontSize:22,
				fontWeight:'normal'
			},
			left:'center',
			top:10
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			// type: 'category',
			// boundaryGap: [0, 0.01],
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize:16
				}
			},
			data: ['事故警告', '生产作业', '软件故障', '硬件故障','通信故障','外界因素','其他'],
		},
		yAxis: {
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			type: 'value',
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize:16
				}
			},
		},
		series: [
			{
				name: '本月',
				type: 'pictorialBar',
				symbol: 'rect',
				
				itemStyle: {
					normal: {
						color:'#ffc801'
					}
				},
				symbolRepeat: true,
				symbolMargin: 2,
				symbolSize:[56,12],
				z: -10,
				data: [70, 60, 30, 92,100,25,30]
			},{
				type:'bar',
				itemStyle:{
					normal:{
						color:new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 0.8,
							color: "transparent" // 100% 处的颜色
						}], false)
					}
				},
				data:[30,30,30,30,30,30,30]
			}
		]
	}
	

	var seriesPrevs = {
		name: '上月',
		type: 'bar',
		data: [
			{
				value: data.warns.data[1][0],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warns.data[3][0]
					}
				}
			},
			{
				value: data.warns.data[1][1],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warns.data[3][1]
					}
				}
			},
			{
				value: data.warns.data[1][2],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warns.data[3][2]
					}
				}
			},
			{
				value: data.warns.data[1][3],
				itemStyle: {
					normal: {
						color: '#000',
						borderWidth: 1,
						borderColor: data.warns.data[3][3]
					}
				}
			}
		],
		barWidth: "54"
	}
	var seriesNows = {
		name: '本月',
		type: 'bar',
		data: data.warns.data[2],
		barWidth: "54",
		barGap: "-100%",
		itemStyle: {
			normal: {
				color: function (params) {
					var colorList = data.warns.data[3];
					return colorList[params.dataIndex]
				}
			}
		}

	}
	// optionRight.series.push(seriesPrevs);
	// optionRight.series.push(seriesNows);
	myChartRight.setOption(optionRight);
	// $(".contentBoxRight .contentLeftTop p:eq(0) span").on("click", function () {
	// 	optionRight.series = [];
	// 	myChartRight.setOption(optionRight, true);
	// 	$(this).toggleClass("selected");
	// 	if (!$(this).hasClass("selected")) {
	// 		optionRight.series.push(seriesPrevs);
	// 	};
	// 	if (!$(".contentBoxRight .contentLeftTop p:eq(1) span").hasClass("selected")) {
	// 		optionRight.series.push(seriesNow);
	// 	}
	// 	myChartRight.setOption(optionRight, true);
	// });
	// $(".contentBoxRight .contentLeftTop p:eq(1) span").on("click", function () {
	// 	optionRight.series = [];
	// 	myChartRight.setOption(optionRight, true);
	// 	if (!$(".contentBoxRight .contentLeftTop p:eq(0) span").hasClass("selected")) {
	// 		optionRight.series.push(seriesPrevs);
	// 	}
	// 	$(this).toggleClass("selected");
	// 	if (!$(this).hasClass("selected")) {
	// 		optionRight.series.push(seriesNows);
	// 	}
	// 	myChartRight.setOption(optionRight, true);
	// });

})
