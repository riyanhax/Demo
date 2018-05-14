
$.get(Config.api.api1,function(res){
	var xAxisArr = [];
	var data = [];

	res.data = res.data;
	for(var i=0;i<res.data.length;i++){
		xAxisArr.push(res.data[i].timeStamp);
		data.push(res.data[i].storage);
	}
	chartBottom({
		obj:$('.chart-left .bottom'),
		title:'一周趋势',
		color:['rgba(30,181,254,0.8)','rgba(18,62,45,1)','rgb(30,181,254)'],
		titleColor:['#14a945','#00b8ea'],
		xAxis:xAxisArr,
		data:data
	});

	chartBottom({
		obj:$('.chart-right .bottom'),
		title:'外部数据总量',
		color:['rgba(163,162,44,0.8)','rgba(69,41,27,1)','rgb(163,162,44)'],
		titleColor:['#f8d602','#905012']
	});
});


$.get(Config.api.api2,function(res){

	var data = [];
	for(var i=0;i<res.data.length;i++){
		data.push({
			type:res.data[i].sourceType,
			size:res.data[i].amount.replace(/GB|MB/,'')
		});
	}

	drawLeftChart($('.chart-left .left'),{
		colors:['#00b8f8','#01b091','#3bb001','#3849d5','#491bbc'],
		titleColor:['#14a945','#00b8ea'],
		title:'内部数据总量',
		data:data
	});
	drawLeftChart($('.chart-right .right'),{
		colors:['#ecbf00','#eb8b01','#d95701','#c6003d','#d23c96'],
		titleColor:['#f8d602','#905012'],
		title:'外部数据总量'
	});
});


$.get(Config.api.api3,function(res){

	var data = [];

	for(var i=0;i<res.data.length;i++){
		data.push({
			value:parseInt(res.data[i].persent)/100*1000,
			name:parseInt(res.data[i].persent).toFixed(0)+'%'
		});
	}
	console.log(data)
	data = data.sort(function(a,b){
		return a.value - b.value
	});
	roseChart($('.chart-left .rose-chart').get(0),['#3849d5','#01b091','#3bb001','#491bbc','#00b8f8'],data);
	roseChart($('.chart-right .rose-chart').get(0),['#d43b95','#eebf00','#eb8b01','#d95701','#c6003d']);
});

function chartBottom(ops){
	initTitle(ops.obj,ops.titleColor,ops.title);

	var chart = echarts.init(ops.obj.find('.chart').get(0));
	var option = {
			backgroundColor:'#131126',
		    title: {
		        text: ops.title,
		        textStyle:{
		        	color:'rgba(255,255,255,0.8)'
		        }
		    },
		    tooltip : {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ops.xAxis || ['周一','周二','周三','周四','周五','周六','周日'],
		            axisLine:{
		               lineStyle:{
		                  color: 'rgba(255,255,255,0.3)'
		               } 
		            }

		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitNumber: 3,
		            splitLine:{
		            	lineStyle:{
		            		type:'dashed',
		            		color:'rgba(255,255,255,0.3)'
		            	}
		            },
		            axisLine:{
		               lineStyle:{
		                  color: 'rgba(255,255,255,0.3)'
		               } 
		            }
		        }
		    ],
		    series : [
		        {
		            name:'邮件营销',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {
		            	color:{
						    type: 'linear',
						    x: 0,
						    y: 0,
						    x2: 0,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: ops.color[0] 
						    }, {
						        offset: 1, color: ops.color[1]
						    }],
						    globalCoord: false 
						}
		            }},
		            lineStyle:{
		            	normal:{
		            		color:ops.color[2]
		            	}
		            },
		            data:ops.data || [120, 132, 101, 134, 90, 230, 210],
		            showSymbol: false,
		            smooth:true
		        }
		    ]
		};

		chart.setOption(option);
}

function initTitle(obj,color,title){
	var oTitle = obj.find('.title');
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',oTitle.width());
	canvas.attr('height',oTitle.height());
	canvas.appendTo(oTitle);
	var ctx = canvas.get(0).getContext('2d');
	drawTitle(ctx,color,title);
}

function drawTitle(ctx,colors,text){
	var lGrd = ctx.createLinearGradient(13,36, 8, 60);  
	lGrd.addColorStop(0, colors[0]);   
	lGrd.addColorStop(1, colors[1]);  
	ctx.fillStyle = lGrd;  
	ctx.rect(13,36, 8,24);
	ctx.fill();  
	ctx.font = '20px Microsoft YaHei';
	ctx.fillStyle = '#fff';
	ctx.fillText(text,28,56);
}

initTitle($('.chart-left .top .right'),['#14a945','#00b8ea'],'内部数据分布情况');
initTitle($('.chart-right .top .left'),['#f8d602','#905012'],'外部数据分布情况');

function roseChart(obj,colors,data){
	var chart = echarts.init(obj);
	var option = {
			color:colors,
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },

		    visualMap: {
		        show: false,
		        min: 80,
		        max: 600,
		        inRange: {
		            colorLightness: [0, 1]
		        }
		    },
		    series : [
		        {
		            name:'访问来源',
		            type:'pie',
		            radius : '45%',
		            center: ['50%', '50%'],
		            data:data|| [
		                {value:335, name:'27%'},
		                {value:310, name:'27%'},
		                {value:274, name:'22%'},
		                {value:235, name:'20%'},
		                {value:400, name:'16%'}
		            ].sort(function (a, b) { return a.value - b.value}),
		            roseType: 'angle',
		            label: {
		                normal: {
		                    textStyle: {
		                        color: 'rgba(255, 255, 255, 0.9)',
		                        fontSize:36
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    lineStyle: {
		                        color: 'rgba(255, 255, 255, 0.9)',
		                        type:'dased'
		                    },
		                    length: 50,
		                    length2: 50
		                }
		            },
		            itemStyle: {
		                normal: {
		                	opacity:0.9,
		                    shadowBlur: 200,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            },

		            animationType: 'scale',
		            animationEasing: 'elasticOut',
		            animationDelay: function (idx) {
		                return Math.random() * 200;
		            }
		        }
		    ]
		};

		chart.setOption(option);
}

function drawLeftChart(oLeftChart,opstion){
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',oLeftChart.width());
	canvas.attr('height',oLeftChart.height());
	canvas.appendTo(oLeftChart);

	var ctx = canvas.get(0).getContext('2d');
	drawTitle(ctx,opstion.titleColor,opstion.title);
	var data = [
		{
			type:'稿件',
			size:22.09
		},
		{
			type:'采编',
			size:13.02
		},
		{
			type:'落地',
			size:10.41
		},
		{
			type:'影响力',
			size:28.23
		},
		{
			type:'数字业务',
			size:30.45
		}
	];
	data = opstion.data || data;
	for(var i=0;i<data.length;i++){
		drawProcess(data[i],i);
	}

	function drawProcess(ops,i){
		ctx.beginPath();
		ctx.fillStyle = opstion.colors[i];
		ctx.fillRect(13,118+71*i,125,40);
		ctx.fillRect(13,158+71*i,280,2);
		ctx.fillStyle = '#fff';
		ctx.textAlign = 'left';
		ctx.font = '22px Microsoft Yahei';
		ctx.fillText(ops.type,25,145+71*i);
		ctx.textAlign = 'right';
		ctx.font = '32px Microsoft Yahei';
		ctx.fillText(ops.size,263,150+71*i);
		ctx.font = '18px Microsoft Yahei';
		ctx.fillText('GB',298,145+71*i);
	}
}