(function(window,document,undefined){
	
	chartBotom();
	var chartTitle = [];
	var chartTopData = {};
	var descData = [];
	$.get(Config.api.api1,function(res){
		if(res.code == 200){
			var data = res.data;

			NumberGrow($('.chart-title span'),{
				num:data.totalcount,
				time:1,
				hadStr:false
			});

			var circleType = ['semantic','retrieval','recommend','tag','subscription','thirdparty'];
			var circleData = [];
			var processData = [];

			for(var i=0;i<circleType.length;i++){

				NumberGrow($('.chart-text li')[i],{
					num:data.count[0][circleType[i]+'Count'],
					time:1,
					hadStr:true
				});

				circleData.push((data.count[0][circleType[i]+'Count']/data.totalcount).toFixed(2));
				var tmp = [];
				var descTmp = [];
				for(var j=0;j<3;j++){

					var bar = data.count[0][circleType[i]][j];
					if(bar){
						tmp.push(Math.floor(28*bar.accessCount/data.count[0][circleType[i]+'Count']));
						descTmp.push({
							left:bar.accessCount,
							right:bar.apiName
						});
					}else{
						tmp.push(0);
						descTmp.push({});
					}
				}
				processData.push(tmp);
				descData.push(descTmp);
			}
			chartTop(circleData,processData,descData);
		}else{
			console.error('接口数据有误！');
		}
		
	});

	function checkTitle(data){
		for(var i=0;i<chartTitle.length;i++){
			if(chartTitle[i]==data){
				return false;
			}
		}
		return true;
	}

	function chartTop(chartTopData,processData,descData){
		var canvas = $('<canvas></canvas>');
		var chartTop = $('.chart-top');
		canvas.attr({
			width:chartTop.width(),
			height:chartTop.height()
		});
		canvas.appendTo(chartTop);


		var chartTopColors = ['#0092f9','#00b191','#3bb001','#edbe00','#d95700','#d23c96'];
		var chartTitle = ['语义分析','检索','推荐','富标签','数据订阅','第三方'];
		//var processData = [[20,23,18],[20,23,18],[20,23,18],[20,23,18],[20,23,18],[20,23,18],[20,23,18]];
		var ctx = canvas[0].getContext('2d');

		for(var i=0;i<6;i++){

			ctx.beginPath();
			ctx.fillStyle = '#131126';
			ctx.fillRect(310*i,0,290,565);
			ctx.strokeStyle = '#2c2b3b';
			ctx.lineWidth = 15;
			ctx.arc(138+i*310,181,108,0,Math.PI*2,true);
			ctx.stroke();
			ctx.fillStyle = chartTopColors[i];
			ctx.fillRect(16+310*i,18,8,24);
			animateCircle(i);
			ctx.font = '20px Micrisoft Yahei';
			ctx.fillStyle = '#fff';
			ctx.fillText(chartTitle[i],36+310*i,36);
			ctx.fillText('TOP3',18+310*i,335);

			renderChartTopProcess(i,chartTopColors[i],processData[i],descData[i]);

		}

		function animateCircle(i){
			var timer  = null;
			var end = 360*chartTopData[i];
			var speed = end / 60;
			var n = 0;

			timer = setInterval(function(){

				if(n>=end){
					n = end;
					clearInterval(timer);
				}else{
					n+=speed;
				}
				
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = chartTopColors[i];
				ctx.lineCap = 'round';
				ctx.arc(138+i*310,181,108,-Math.PI/2,(n - 90) * Math.PI / 180,false);
				ctx.stroke();
				ctx.restore();
				
			},1000/60)
		}

		function renderChartTopProcess(index,color,data,desc){
			for(var i=0;i<3;i++){
				renderProcessBg(index*310+18,376+71*i,5,22);
				renderProcess(index*310+18,376+71*i,5,22,color,data[i]);
				ctx.fillStyle = '#fff';
				if(desc[i].right){
					ctx.save();
					ctx.textAlign = 'left';
					ctx.fillText(desc[i].right,18+310*index,370+71*i);
					ctx.textAlign = 'right';
					ctx.fillText(desc[i].left,265+310*index,370+71*i);
					ctx.restore();
				}
				
			}
		}

		function renderProcessBg(x,y,w,h){
			for(var i=0;i<28;i++){
				ctx.beginPath();
				ctx.fillStyle = '#2b2a3a';
				ctx.fillRect(x+(w+4)*i,y,w,h);
			}
		}

		function renderProcess(x,y,w,h,color,len){
			var timer = null;
			var n = 0;
			timer = setInterval(function(){
				if(n>=len){
					clearInterval(timer);
					n=len;
					return;
				}
				ctx.save();
				ctx.beginPath();
				ctx.fillStyle = color|| '#2b2a3a';
				ctx.fillRect(x+(w+4)*n,y,w,h);
				ctx.restore();
				n++;
			},1000/20)
		}

	}

	function chartBotom(data) {

	    var data = data || [];
	    var labels = [];
	    for (var i = 0; i <= 24; i++) {
	        data.push([i, Math.random() * 100]);
	        labels.push(i);
	    }

	    var myChart = echarts.init($(".chart-bottom").get(0));
	    var dataStyle = {
	        normal: {
	            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
	                offset: 0,
	                color: 'rgb(22,128,62)'
	            }, {
	                offset: 1,
	                color: 'rgb(8,67,133)'
	            }]),
	            label: {
	                show: false
	            }
	        }
	    };

	    var option = {
	        backgroundColor: "rgba(0,0,0,0)",
	        title: {
	            show: true,
	            text: "24小时服务请求总量趋势",
	            textStyle: {
	                color: "rgba(255,255,255,0.8)"
	            },
	            padding: [10, 20]

	        },

	        grid: {
	            show: false,
	            borderWidth: 0,
	            x: 40,
	            y: 60,
	            x2: 10,
	            y2: 25
	        },
	        calculable: false,
	        xAxis: [
	            {
	                type: 'value',
	                max: 24,
	                min: 0,
	                interval: 1,
	                data: labels,
	                axisLine: {
	                    show: true
	                },
	                splitLine: {
	                    show: false
	                }
	            }
	        ],
	        yAxis: [
	            {
	                show: true,
	                type: 'value',
	                splitLine: {
	                    show: true,
	                    lineStyle: {
	                        type: "dashed",
	                        color: "rgba(255,255,255,0.2)"
	                    }
	                },
	                axisLine: {
	                    show: false
	                }
	            }
	        ],
	        series: [
	            {

	                type: 'line',
	                smooth: true,
	                areaStyle: {normal: {}},
	                itemStyle: dataStyle,
	                data: data,
	                showSymbol: false
	            }
	        ]
	    };
	    myChart.setOption(option);

	}

	function NumberGrow(element, options) {
	    options = options || {};
	 
	    var $this = $(element),
	        time = options.time,
	        num = options.num,
	        step = num * 16 / (time * 1000),
	        start = 0,
	        interval,
	        old = 0;
	    interval = setInterval(function () {
	        start = start + step;
	        if (start >= num) {
	            clearInterval(interval);
	            interval = undefined;
	            start = num;
	        }
	 
	        var t = Math.floor(start);

	        if (t == old) {
	            return;
	        }
	 
	        old = t;

	        str = options.hadStr?'<span>次</span>':'';
	        $this.html(old+str);
	    }, 16);
	}


})(window,document);