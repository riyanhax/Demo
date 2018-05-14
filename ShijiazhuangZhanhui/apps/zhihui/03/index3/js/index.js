$(function () {
	var data = {
		monthNow: [
			['01', '02', '03', '04', '05', '06', '07', "08", '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', "23", '24', '25', '26', '27', '28', '29', '30'],
			[20, 80, 30, 50, 60, 40, 100, 20, 60, 90, 20, 80, 30, 50, 60, 40, 100, 20, 60, 90, 20, 80, 30, 50, 60, 40, 100, 20, 60, 90]
		],
		monthPrev: [
			['01', '02', '03', '04', '05', '06', '07', "08", '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', "23", '24', '25', '26', '27', '28', '29', '30'],
			[60, 40, 100, 20, 80, 30, 50, 20, 60, 90, 40, 100, 20, 60, 90, 20, 20, 80, 30, 50, 60, 80, 100, 20, 60, 30, 50, 60, 40, 90]
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
	// 获取最大值，最小值
	var max = Math.max.apply(Math, data.monthNow[1]);
	var min = Math.min.apply(Math, data.monthNow[1]);
	var dataArr = [];
	var myCharts = echarts.init(document.getElementById("contentBot"));
	for (var i = 0; i < data.monthNow[1].length; i++) {
		dataArr.push({
			name: "告警次数(次)",
			value: data.monthNow[1][i],
			symbol: data.monthNow[1][i] == max ? 'image://img/redCircle.png' : data.monthNow[1][i] == min ? 'image://img/greenCircle.png' : 'image://img/yellowCircle.png',
			symbolSize: 20,
			label: {
				show: (data.monthNow[1][i] == max || data.monthNow[1][i] == min)?true:false,
				formatter: '{c}',
				position: 'top',
				color: data.monthNow[1][i] == max?'#cb2e27':data.monthNow[1][i] == min?'#22ac38':null
			},
		})
	}
	option = {
		tooltip: {
			trigger: 'axis',
			formatter: '本月 </br>{b0}日: {c0}次'
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
			name: "告警次数(次)",
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
			type: 'line',
			data: dataArr,
			lineStyle: {
				normal: {
					color: '#ffc800',
					width: 2,
					type: 'solid'
				}
			},
			itemStyle: {
				normal: {
					borderWidth: 2,
					borderColor: '#fff',
					color: 'rgba(255,255,255,0)',
				},

			}
		}]
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
		tooltip:{
			trigger:'axis',
			formatter:'{a0}&nbsp;{b}:{c}<br/>{a1}&nbsp;{b1}:{c1}'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize: 16
				}
			},
		},
		yAxis: {
			name: "告警次数(次)",
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			type: 'category',
			data: ['蓝色', '黄色', '橙色', '红色'],
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize: 16
				}
			},
		},
		series: [
			{
				name: '上月',
				type: 'bar',
				data: [18203, 23489, 29034, 104970],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 1,
							color: "#ffc801" // 100% 处的颜色
						}], false)
					}
				},
				label:{
					show:true,
					formatter: '{c}',
					position:'right',
					color:'ffc801',
					fontSize:14
				},
				barWidth:22

			},
			{
				name: '本月',
				type: 'bar',
				data: [19325, 23438, 31000, 121594],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 1,
							color: "#21a336" // 100% 处的颜色
						}], false)
					}
				},
				label:{
					show:true,
					formatter: '{c}',
					position:'right',
					color:'21a336',
					fontSize:14
				},
				barWidth:22

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
		tooltip:{
			trigger:'axis',
			formatter:'{a0}&nbsp;{b}:{c}<br/>{a1}&nbsp;{b1}:{c1}'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: {
			type: 'value',
			boundaryGap: [0, 0.01],
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize: 16
				}
			},
		},
		yAxis: {
			name: "告警次数(次)",
			nameTextStyle: { "color": "#fff", "fontSize": "16" },
			type: 'category',
			data: ['未结束', '升级', '未处置', '结束'],
			axisLabel: {
				textStyle: {
					color: "#fff",
					fontSize: 16
				}
			},
			// splitArea:{
			// 	show:true,
			// 	areaStyle:{
			// 		color:'red'
			// 	}
			// }
		},
		// legend: {
		// 	show:true,
		// 	data: ['上月', '本月'],
		// 	right:0,
		// 	top:-15
		// },
		series: [
			{
				name: '上月',
				type: 'bar',
				data: [18203, 23489, 29034, 104970],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 1,
							color: "#ffc801" // 100% 处的颜色
						}], false),
					
					},
				},
				label:{
					show:true,
					formatter: '{c}',
					position:'right',
					color:'ffc801',
					fontSize:14
				},
				barWidth:22
			},
			{
				name: '本月',
				type: 'bar',
				data: [19325, 23438, 31000, 121594],
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
							offset: 0,
							color: "#000" // 0% 处的颜色
						}, {
							offset: 1,
							color: "#21a336" // 100% 处的颜色
						}], false)
					}
				},
				label:{
					show:true,
					formatter: '{c}',
					position:'right',
					color:'21a336',
					fontSize:14
				},
				barWidth:22
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
