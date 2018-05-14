var oChartLeft = $('.chart-left');
var app = new PIXI.Application(oChartLeft.width(), oChartLeft.height(), { antialias: true ,backgroundColor:0x131126});

$(app.view).appendTo(oChartLeft);

var data = [
	{
		y:210,
		text:['01 音频','02 视频','03 图片'],
		color:0x1eb4ff,
		scale:[0.5,0.7,0.8],
		title:'类别偏好'
	},
	{
		y:380,
		text:['01 音频','02 视频','03 图片'],
		color:0x00ae8f,
		scale:[0.5,0.7,0.8],
		title:'类别偏好'
	},
	{
		y:542,
		text:['01 音频','02 视频','03 图片'],
		color:0xeebf00,
		scale:[0.5,0.7,0.8],
		title:'类别偏好	'
	},
	{
		y:706,
		text:['01 音频','02 视频','03 图片'],
		color:0xd95701,
		scale:[0.5,0.7,0.8],
		title:'类别偏好'
	},
	{
		y:870,
		text:['01 音频','02 视频','03 图片'],
		color:0xd23c96,
		scale:[0.5,0.7,0.8],
		title:'类别偏好'
	}
];

for(var i=0;i<data.length;i++){
	chartLeft(data[i]);
}

function chartLeft(data){

	drawOutterCircle(322,data.y,125,0x2b2a3a,0);
	drawOutterCircle(609,data.y+3,113,0x2b2a3a,0);
	drawOutterCircle(872,data.y+6,100,0x2b2a3a,0);

	drawInnerCircle(322,data.y,125);
	drawInnerCircle(609,data.y+3,113);
	drawInnerCircle(872,data.y+6,100);

	drawHalfCircle(322,data.y,125,data.color,data.scale[0]);
	drawHalfCircle(609,data.y+3,113,data.color,data.scale[1]);
	drawHalfCircle(872,data.y+6,100,data.color,data.scale[2]);

	drawline(data.y,data.color);
	
	drawText(data.text[0],332,data.y-27);
	drawText(data.text[1],609,data.y-23);
	drawText(data.text[2],872,data.y-20);

	var basicText = new PIXI.Text(data.title,{fontSize:22,fill:data.color});
	basicText.x = 42;
	basicText.y = data.y-120;
	app.stage.addChild(basicText);

}

function drawHalfCircle(x,y,r,color,end){	
	var n = 1;
	var grapgics = new PIXI.Graphics();
	
	var ticker = new PIXI.ticker.Ticker();
	ticker.stop();
	
	ticker.add(function(deltaTime){
		var value = Tween.Circ.easeIn(n, 0, 1, 1);
		if(value.toFixed(2)<=end.toFixed(2)){
			value=end;
			ticker.stop();
			return;
		}
		n-=0.004;
		grapgics.clear();
		grapgics.lineStyle(15,color,1);
		grapgics.arc(x,y,r,-Math.PI,-Math.PI*value,false);
		app.stage.addChild(grapgics);
	  	
	});
	ticker.start();
}

function drawOutterCircle(x,y,r,color,end){
	var grapgics = new PIXI.Graphics();
	grapgics.lineStyle(15,color,1);
	grapgics.arc(x,y,r,-Math.PI,-Math.PI*end,false);
	app.stage.addChild(grapgics);
}

function drawInnerCircle(x,y,r){
	var grapgics = new PIXI.Graphics();
	grapgics.lineStyle(2,0x4e4d5b,1);
	grapgics.arc(x,y,r-30,-Math.PI,0,false);
	app.stage.addChild(grapgics);
}

function drawline(y,color){
	var grapgics3 = new PIXI.Graphics();
	grapgics3.beginFill(color,1);
	grapgics3.drawRect(190,y+15,790,2);
	app.stage.addChild(grapgics3);
}

function drawText(text,x,y){
	var basicText = new PIXI.Text(text,{fontSize:20,fill:'#fff'});
	basicText.x = x-basicText.width/2;
	basicText.y = y;
	app.stage.addChild(basicText);
}

function chartRight(obj,text){
	var option = {
		backgroundColor:'#131126',
		title:{
			text:text,
			textStyle:{
				color:'rgba(255,255,255,0.9)',
				fontSize:18
			}
		},
	    color: ['#1cb4ff'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {
	            type : 'shadow'
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
	            data : ['200元以下', '200元-300元', '300-500元', '500元-1000元', '1000以上'],

	            axisTick: {
	                alignWithLabel: true
	            },
	            axisLine:{
	               lineStyle:{
	                  color: '#fff'
	               } 
	            }

	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitLine:{
	            	lineStyle:{
	            		color:'rgba(255,255,255,0.6)',
	            		type:'dashed'
	            	}
	            }
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            stack: '广告',
	            barWidth: '36',
	            data:[200, 334, 390, 330, 220]
	        }
	    ]
	};

	var oChartRight = echarts.init(obj);
	oChartRight.setOption(option);
}

chartRight($('.chart-right .top').get(0),'年消费金额');
chartRight($('.chart-right .bottom').get(0),'累计消费金额');