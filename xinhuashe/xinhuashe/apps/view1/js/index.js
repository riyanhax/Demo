
;(function(window,document,undefined){

	var fileds = ['internal','external','records','thirdParty'];

	$.get(Config.api.api1,function(res){
		if(res.code == 200){
			res = res.data;
			console.log(res);

			var bottomData = handleChartBottomData(res);
			chartBottom(bottomData.data,bottomData.xAxis);

			NumberGrow('.history-count h1',{
				time:1,
				num:res[0].totalCount.history*1
			});
			
			NumberGrow('.today-count h1',{
				time:1,
				num:res[0].totalCount.today*1
			});

			var rightData = handleChartRightData(res);
			chartRight(rightData,res);

			var leftData = handleChartLeftData(res);
			chartLeft(leftData);
		}
		
	});

	loading();

	function loading(){
		var app = new PIXI.Application(561,88,{ antialias: true,transparent:true });
		$(app.view).appendTo($('.loading'));
		
		var colors = [
			{	scale:1,
				color:0x00b8f8,
				x:0,
				y:0
			},
			{
				scale:0.93,
				color:0x02a7e1,
				x:90,
				y:3
			},
			{
				scale:0.86,
				color:0x05907b,
				x:175,
				y:6
			},
			{
				scale:0.8,
				color:0x057f70,
				x:255,
				y:8
			},
			{
				scale:0.73,
				color:0x945b0e,
				x:329,
				y:12
			},
			{
				scale:0.66,
				color:0x7f4e13,
				x:398,
				y:15
			},
			{
				scale:0.6,
				color:0x5e2351,
				x:462,
				y:15
			},
			{
				scale:0.53,
				color:0x4c1f46,
				x:522,
				y:18
			}
		];
		var loadingArr  = [];
		function drawLoading(scale,x,color,y){
			var graphics = new PIXI.Graphics();
			graphics.beginFill(color);
			graphics.drawRoundedRect(0,0,70,88,5);
			graphics.beginFill(0x000000);
			graphics.drawRect(18,22,40,8);
			graphics.drawRect(18,40,40,8);
			graphics.drawRect(18,57,30,8);
			graphics.scale.x = scale;
			graphics.scale.y = scale;
			graphics.x = x;
			graphics.y = y;
			graphics.alpha = 0;
			app.stage.addChild(graphics);
			loadingArr.push(graphics);
			
			/*var count = scale;
			var flag = true;
			app.ticker.add(function(time) {

			    if(count>=0 && flag){
			    	count -= 0.01;
			    	if(count.toFixed(2) == 0.20){
			    		flag = false;
			    	}
			    }

			    if(!flag){

			    	count+=0.01;
			    	if(count.toFixed(2) == 1.00){
			    		flag = true;
			    	}
			    }

			    graphics.clear();

			    graphics.beginFill(color);
    			graphics.drawRoundedRect(0,0,75,88,5);
    			graphics.beginFill(0x000000);
    			graphics.drawRect(18,22,40,8);
    			graphics.drawRect(18,40,40,8);
    			graphics.drawRect(18,57,30,8);
    			graphics.scale.x = count;
    			graphics.scale.y = count;
    			
			});*/
		}

		for(var i=0;i<colors.length;i++){
			//drawLoading(colors[i].scale,70*i,colors[i].color,i);
			drawLoading(colors[i].scale,colors[i].x,colors[i].color,colors[i].y);
		}

		var loadingNum = 0;
		loadingAni();

		function loadingAni(graphic){
			var count = 0;
			setInterval(function(){
				count += 1/20;
				loadingArr[loadingNum].alpha = count;
				if(count>=1){
					count = 0;
					loadingNum++;
					if(loadingNum>=7){
						loadingNum%=7;
						for(var i=0;i<loadingArr.length;i++){
							loadingArr[i].alpha = 0;
						}
					}
					
				}
			},1000/60)
			
		}
		
	}

	

	function handleChartLeftData(res){
		var data = res[1].todayCount;
		var total = res[0].totalCount.today;
		var arr = [];
		for(var i=0;i<fileds.length;i++){
			arr.push((2*data[fileds[i]]/total-0.5).toFixed(2));
		}
		return arr;
	}
	
	function handleChartRightData(res){
		var data = res[1].todayCount;
		var total = res[0].totalCount.today;
		var arr = [];
		for(var i=0;i<fileds.length;i++){
			arr.push(Math.floor(data[fileds[i]]/total*665));
		}

		return arr;
	}


	//格式化一周的数据
	function handleChartBottomData(res){
		var chartBottomData = res[3].weekTrend;
		var xAxis = [];
		var data = [];
		for(var key in chartBottomData[0].internal){
			xAxis.push(key);
		}
		xAxis = sortDate(xAxis);
		
		for(var i=0;i<chartBottomData.length;i++){
			var tmp = [];
			var week = chartBottomData[i][fileds[i]];
			for(var j=0;j<xAxis.length;j++){
				tmp.push(week[xAxis[j]]);
			}
			data.push(tmp);
		}
		return {
			xAxis:xAxis,
			data:data
		}
	}

	function sortDate(arr){
		var dateArr = [];
		for(var i=0;i<arr.length;i++){
			dateArr.push(new Date(arr[i]));
		}

		dateArr.sort(function(a, b){  
		    return a > b; 
		}); 

		for(var i=0;i<dateArr.length;i++){
			var year = dateArr[i].getFullYear();
			var month = toDub(dateArr[i].getMonth()+1);
			var date = toDub(dateArr[i].getDate());
			arr[i] = year+'-'+month+'-'+date;
		}

		return arr;

	}

	function toDub(n){
		return n>9?''+n:'0'+n
	}



	function chartRight(data,res){

		var todaySize = res[2].todaySize;
		var todayCount = res[1].todayCount;

		for(var i=0;i<fileds.length;i++){
			var oLast = $($('ol.last')[i]);
			var oFirst = $($('ol.first')[i]);
			var size = 0;
			var count = 0;

			if(i==0){
				size = todaySize[fileds[1]];
				count = todayCount[fileds[1]];
			}else if(i==1){
				size = todaySize[fileds[0]];
				count = todayCount[fileds[0]];
			}else{
				size = todaySize[fileds[i]];
				count = todayCount[fileds[i]];
			}

			flop(oFirst,{
				time:1,
				num:count,
				type:'count'
			});

			flop(oLast,{
				time:1,
				num:size,
				type:'size'
			});

		}

		var app = new PIXI.Application(700, 565, { antialias: true ,transparent:true});
		$(app.view).appendTo($('.chart-right'));
		var graphics = new PIXI.Graphics();

		graphics.beginFill(0x2b2a3a,1);
		graphics.drawRect(15,120,665,4);
		graphics.drawRect(15,254,665,4);
		graphics.drawRect(15,390,665,4);
		graphics.drawRect(15,525,665,4);

		var ticker = new PIXI.ticker.Ticker();

		var data = [
			{
				y:120,
				color:0x00b8f8,
				start:0,
				stop:data[1] || 0
			},
			{
				y:254,
				color:0x01b091,
				start:0,
				stop:data[0] || 0
			},
			{
				y:390,
				color:0xeb8b01,
				start:0,
				stop:data[2] || 0
			},
			{
				y:525,
				color:0xd23c96,
				start:0,
				stop:data[3] || 0
			}
		];
		var now = 0;
		ticker.stop();
		ticker.add(function(deltaTime){
			for(var i=0;i<data.length;i++){
				
				graphics.beginFill(data[i].color,1);
				graphics.drawRect(15,data[i].y,data[i].start,4);
				if(data[i].start>=data[i].stop){
					if(!data[i].end){
						now++;
					}
					data[i].end = true;
					data[i].start = data[i].stop;
					if(now>=data.length){
						ticker.stop();
					}
				}else{
					data[i].start+=10;
				}

			}

		});

		ticker.start();

		graphics.endFill();
		app.stage.addChild(graphics);
	}

	function chartLeft(data){
		var app = new PIXI.Application(482, 482, { antialias: true ,transparent:true});

		$(app.view).appendTo($('.chart-left'));

		drawArc(data[1],0x00b8f8,236);
		drawArc(data[0],0x01b091,223);
		drawArc(data[2],0xeb8b01,210);
		drawArc(data[3],0xd23c96,197);
		
		function drawArc(stop,color,r){

			var ticker = new PIXI.ticker.Ticker();
			var n = -0.5;

			ticker.stop();

			ticker.add(function(deltaTime){
				
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(5,color);
				graphics.arc(241, 241, r, -Math.PI/2, Math.PI*n, false);
				app.stage.addChild(graphics);
				if(n>=stop){
					ticker.stop();
				}else{
					n+=0.05;
				}

			});

			ticker.start();

		}
	}

	function chartBottom(data,xAxis){
		var chart = echarts.init($('.chart-bottom')[0]);
		var option = {
				backgroundColor:'#131126',
			    title: {
			        text: '一周稿件推荐趋势分析',
			        textStyle:{
			        	color:'#fff'
			        },
			        left:40,
			        top:40
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
			        left: '63',
			        right: '30',
			        bottom: '30',
			        top: '88',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : xAxis,
			            axisLabel:{
			            	textStyle: {
			            		color:'#fff'
			            	}
			            }  
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            axisLabel:{
			            	textStyle: {
			            		color:'#fff'
			            	}
			            },
			            splitLine:{  
                    　　　　show:false  
                    　　}
			        }
			    ],
			    series : [
			        {
			            name:'互联网数据',
			            type:'line',
			            stack: '总量',
			            smooth:true,
			            lineStyle:{
			            	normal:{
			            		color:'rgb(0, 184, 248)'
			            	}
			            },
			            areaStyle: {normal: {
			            	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    	                        offset: 0,
    	                        color: 'rgba(0, 184, 248,0.4)'
    	                    }, {
    	                        offset: 1,
    	                        color: 'rgba(0, 184, 248,0)'
    	                    }])
			            }},
			            data:data[1],
			            symbol:'none'
			        },
			        {
			            name:'社内稿件数据',
			            type:'line',
			            stack: '总量',
			            smooth:true,
			            lineStyle:{
			            	normal:{
			            		color:'rgb(235, 139, 1)'
			            	}
			            },
			            areaStyle: {normal: {
			            	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    	                        offset: 0,
    	                        color: 'rgba( 235, 139, 1,0.4)'
    	                    }, {
    	                        offset: 1,
    	                        color: 'rgba(235, 139, 1,0)'
    	                    }])
			            }},
			            data:data[0],
			            symbol:'none'
			        },
			        {
			            name:'行为交易数据',
			            type:'line',
			            stack: '总量',
			            smooth:true,
			            lineStyle:{
			            	normal:{
			            		color:'rgb(1, 176, 145)'
			            	}
			            },
			            areaStyle: {normal: {
			            	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    	                        offset: 0,
    	                        color: 'rgba(1, 176, 145,0.4)'
    	                    }, {
    	                        offset: 1,
    	                        color: 'rgba(1, 176, 145,0)'
    	                    }])
			            }},
			            data:data[2],
			            symbol:'none'
			        },
			        {
			            name:'第三方数据',
			            type:'line',
			            stack: '总量',
			            smooth:true,
			            lineStyle:{
			            	normal:{
			            		color:'rgb(210, 60, 150)'
			            	}
			            },
			            areaStyle: {normal: {
			            	color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    	                        offset: 0,
    	                        color: 'rgba(210, 60, 150,0.4)'
    	                    }, {
    	                        offset: 1,
    	                        color: 'rgba(210, 60, 150,0)'
    	                    }])
			            }},
			            data:data[3],
			            symbol:'none'
			        }
			    ]
		};

		chart.setOption(option);

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
	 
	        old = thousandBitSeparator(t);

	        $this.text(old);
	    }, 16);
	}

	function NumberGrow2(element, options) {
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

	        var txt;
	        switch(options.type){
	        	case 'size':
	        		txt = toDub(old.toFixed(2));
	        		break;
	        	case 'count':
	        		old = thousandBitSeparator(old)
	        		txt = transFiveNum(old);
	        		break;
	        }

	        for(var i=0;i<txt.length;i++){
	        	$($this.find('li')[i]).text(txt.charAt(i));
	        }

	    }, 16);
	}

	function transFiveNum(num){
		if(num.length>5){
			return num;
		}else{
			while(num.length<=5){
				num = '0'+num;
			}
			var prefix = num.substr(0,2);
			var endfix = num.substr(3);
			num = prefix+','+endfix;
			return num;
		}
	}

	function thousandBitSeparator(num) {
		num = num.toString();
	    var re=/\d{1,3}(?=(\d{3})+$)/g;
    　　var n1=num.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
    　　return n1;
	}

	function flop(ele,ops){

		var num = ops.num+'';
		var aLi = [];

		ele.children().each(function(index,ele){
			if(!$(this).hasClass('separate')){
				aLi.push($(this))
			}
		});

		for(var i=0;i<num.length;i++){

			var $li = aLi[i];
			var n = parseInt(num[i]);
			while(n>=0){
				var $topSpan = $('<span class="top"><i>'+n+'</i></span>');
				$topSpan.appendTo($li);
				var $bottomSpan = $('<span class="bottom"><i>'+n+'</i></span>');
				$bottomSpan.appendTo($li);
				n--;
			}

		}

		ele.children().each(function(){
			ani($(this));
		});

		function ani(obj){
			var aTop = obj.find('.top');
			var aBot = obj.find('.bottom');
			var index = aTop.length;
			var zIndex = 0;
			var timer = setInterval(function(){
				zIndex++;
				if(index<1){
					var num = $(aTop[index]).text();
					if(!obj.hasClass('separate')){
						obj.empty();
						obj.text(num||0);
					}
					clearInterval(timer);
				}
				$(aTop[index]).css({'zIndex':zIndex,'transform':'rotateX(-90deg)'});
				setTimeout(function(){
					$(aBot[index-1]).css({'zIndex':zIndex,'transform':'rotateX(0deg)'});
					index--;
				},100)
				
			},100)
		}

	}

})(window,document);