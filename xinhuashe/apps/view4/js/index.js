chartLeftBottom();

function chartLeftBottom(){
	var chart = echarts.init($('.chart-left .bottom').get(0));
	var option = {
			backgroundColor:'#131126',
		    title: {
		        text: '一周稿件推荐趋势分析',
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
		            data : ['周一','周二','周三','周四','周五','周六','周日'],
		            axisLine:{
		               lineStyle:{
		                  color: 'rgba(255,255,255,0.7)'
		               } 
		            }

		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{
		            	lineStyle:{
		            		type:'dashed'
		            	}
		            },
		            axisLine:{
		               lineStyle:{
		                  color: 'rgba(255,255,255,0.7)'
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
		            	type: 'default',
		            	color:{
						    type: 'linear',
						    x: 0,
						    y: 0,
						    x2: 0,
						    y2: 1,
						    colorStops: [{
						        offset: 0, color: 'rgba(236,191,2,0.8)' 
						    }, {
						        offset: 1, color: 'rgba(236,191,2,0)'
						    }],
						    globalCoord: false 
						}
		            }},
		            lineStyle:{
		            	normal:{
		            		color:'rgb(236,191,2)'
		            	}
		            },
		            data:[120, 132, 101, 134, 90, 230, 210],
		            showSymbol: false,
		            smooth:true
		        },
		        {
		            name:'联盟广告',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {
		            			type: 'default',
		    	            	color:{
		    					    type: 'linear',
		    					    x: 0,
		    					    y: 0,
		    					    x2: 0,
		    					    y2: 1,
		    					    colorStops: [{
		    					        offset: 0, color: 'rgba(71,193,31,0.8)' 
		    					    }, {
		    					        offset: 1, color: 'rgba(71,193,31,0)'
		    					    }],
		    					    globalCoord: false 
		    					}
		            }},
		            lineStyle:{
		            	normal:{
		            		color:'rgb(71,193,31)'
		            	}
		            },
		            data:[220, 182, 191, 234, 290, 330, 310],
		            showSymbol: false,
		            smooth:true
		        },
		        {
		            name:'视频广告',
		            type:'line',
		            stack: '总量',
		            areaStyle: {normal: {
		            			type: 'default',
		    	            	color:{
		    					    type: 'linear',
		    					    x: 0,
		    					    y: 0,
		    					    x2: 0,
		    					    y2: 1,
		    					    colorStops: [{
		    					        offset: 0, color: 'rgba(210,60,147,0.8)' 
		    					    }, {
		    					        offset: 1, color: 'rgba(210,60,147,0)'
		    					    }],
		    					    globalCoord: false 
		    					}
		            }},
		            lineStyle:{
		            	normal:{
		            		color:'rgb(210,60,147)'
		            	}
		            },
		            data:[150, 232, 201, 154, 190, 330, 410],
		            showSymbol: false,
		            smooth:true
		        }
		    ]
		};

	chart.setOption(option);
}

chartRight();
function chartRight(){
	var oChartRight = $('.chart-right');
	var app = new PIXI.Application(oChartRight.width(),oChartRight.height(),{antialias:true,backgroundColor:0x131126});
	var ticker = new PIXI.ticker.Ticker();
	$(app.view).appendTo(oChartRight);
	 drawTitle();

	 for(var i=0;i<10;i++){
	 	drawProcess(i);
	 }

	 function drawProcess(i){

	 	var color = '';

	 		color = 0x1cb4ff;

	 	
	 	var grapgics = new PIXI.Graphics();
	 	grapgics.beginFill(color,1);
	 	

	 	var grapgics2 = new PIXI.Graphics();
	 	grapgics2.beginFill(0x25263a,1);
	 	grapgics2.drawRect(70,204+i*75,440,6);
	 	app.stage.addChild(grapgics2);

	 	var n = 0;

	 	var text = new PIXI.Text(i+1,{fontSize:32,fill:'#fff'});
	 	text.x = 28-text.width/2;
	 	text.y = 170+i*75;
	 	app.stage.addChild(text);

	 	var text2 = new PIXI.Text(i+1+'次',{fontSize:32,fill:'#fff',align:'right'});
	 	text2.x = 510-text2.width;
	 	text2.y = 170+i*75;
	 	

	 	var text3 = new PIXI.Text('xxxx',{fontSize:32,fill:'#fff',align:'right'});
	 	text3.x = 80;
	 	text3.y = 170+i*75;
	 	app.stage.addChild(text2);
	 	app.stage.addChild(text3);

	 	ticker.stop();
	 	ticker.add(function(deltaTime){
	 		if(n>=200){
	 			n=420;
	 			ticker.stop();
	 			return;
	 		}
	 	   grapgics.drawRect(70,204+i*75,n,6);
	 	   app.stage.addChild(grapgics);
	 	   
	 	   n+=5;
	 	});
	 	ticker.start();

	 }

	 function drawTitle(){

	 	var text = new PIXI.Text('一周热门稿件',{fontSize:20,fill:'#fff'});
	 	text.x = 20;
	 	text.y = 35;
	 	app.stage.addChild(text);
	 	
	 	var text = new PIXI.Text('TOP 10',{fontSize:42,fill:'#1ba7f3'});
	 	text.x = 20;
	 	text.y = 80;
	 	app.stage.addChild(text);
	 }

}

chartLeftTop();

function chartLeftTop(){


	NumberGrow($('.chart-left .num'),{
		num:5689,
		time:1
	});

	$('.user-action li').each(function(){
		NumberGrow($(this).find('h3'),{
			num:1200,
			time:1
		});
	});

	NumberGrow2($('.user-view-total ul'),{
		num:5689,
		time:1
	});

	NumberGrow2($('.user-download-total ul'),{
		num:5689,
		time:1
	});

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
 
        old = thousandBitSeparator(t);
        for(var i=0;i<old.length;i++){
        	$($this.find('li')[i]).text(old[i]);
        }
    }, 16);
}

function thousandBitSeparator(num) {
	num = num.toString();
    var re=/\d{1,3}(?=(\d{3})+$)/g;
　　var n1=num.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
　　return n1;
}

