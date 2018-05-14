
var oChartLeft = $('.chart-left');
var app = new PIXI.Application(oChartLeft.width(),oChartLeft.height(),{antialias:true,backgroundColor:0x131126});
$(app.view).appendTo(oChartLeft);

var basicText = new PIXI.Text('重点用户排行  TOP10',{fill:'#fff',fontSize:22,align:'left'});
basicText.x = 41;
basicText.y = 42;
app.stage.addChild(basicText);

/*var graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0x00b9f9, 1);
graphics.moveTo(226,133);
graphics.lineTo(128, 133);
graphics.lineTo(128, 295);
app.stage.addChild(graphics);*/

var bunny = PIXI.Sprite.fromImage('../view6/imgs/user.jpg');
bunny.x = 20;
bunny.y = 370;
app.stage.addChild(bunny);

var data = [{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0x00b9f9
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0x00b191
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0x3ab101
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0x3847d4
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0x4a1abc
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0xeebf00
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0xeb8b01
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0xd95701
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0xc6003d
},
{
	title:'中国网',
	value:505,
	num:'10,000',
	color:0xd23c96
}];

for(var i=0;i<data.length;i++){
	 drawChartList(data[i],i);
}

function drawChartList(data,index){
	var ticker = new PIXI.ticker.Ticker();
	var graphics = new PIXI.Graphics();
	graphics.beginFill(0x1f1e30);
	graphics.drawRect(240,96+77*index,670,68);
	graphics.beginFill(data.color);
	graphics.drawRect(243,96+77*index,165,68);

	ticker.stop();
	var tw = 0;
	ticker.add(function(){
		tw+=5;
		if(tw>=data.value){
			ticker.stop();
		}
		graphics.beginFill(data.color);
		graphics.drawRect(406,96+77*index,tw,5);
	});
	ticker.start();

	graphics.beginFill(0x000);
	graphics.fillAlpha = 0.5;
	graphics.drawRect(390,101+77*index,18,63);
	app.stage.addChild(graphics);

	var basicText = new PIXI.Text(toDub(index+1),{fill:'#fff',fontSize:42});
	basicText.x = 330;
	basicText.y = 110+77*index;
	app.stage.addChild(basicText);

	var basicText = new PIXI.Text(data.title,{fill:'#fff',fontSize:28});
	basicText.x = 440;
	basicText.y = 116+77*index;
	app.stage.addChild(basicText);

	var basicText = new PIXI.Text(data.num,{fill:'#fff',fontSize:22,align:'left'});
	basicText.x = 880-basicText.width;
	basicText.y = 120+77*index;
	app.stage.addChild(basicText);

}

function toDub(n){
	return n<=9?'0'+n:''+n;
}


chartBottom($('.chart-right .bottom .left'),{
	title:'用户浏览频度',
	data:[{
		text:'经常',
		value:5,
		color:0x3ca7df
	},{
		text:'很少',
		value:200,
		color:0x12a789
	},{
		text:'偶尔',
		value:50,
		color:0x698b2d
	}]
});

chartBottom($('.chart-right .bottom .right'),{
	title:'用户下载情况',
	data:[{
		text:'高',
		value:5,
		color:0x3ca7df
	},{
		text:'中',
		value:200,
		color:0x12a789
	},{
		text:'低',
		value:50,
		color:0x698b2d
	}]
});

var chartRTop = $('.chart-right .top');
var canvas = $('<canvas></canvas>');
canvas.attr('width',chartRTop.width());
canvas.attr('height',chartRTop.height());
canvas.appendTo(chartRTop);
var ctx = canvas.get(0).getContext('2d');

barChart(ctx,{
	x:108,
	y:97,
	title:'用户浏览时长',
	xAis:['0-1小时','1-2小时','2-3小时','3-4小时'],
	data:[10000,12563,15896,9654],
	color:'#3ca7df'
});

barChart(ctx,{
	x:108,
	y:403,
	title:'用户浏览时段',
	xAis:['0-1小时','1-2小时','2-3小时','3-4小时','1-2小时','2-3小时','3-4小时'],
	data:[10000,12563,15896,9654,5477,12698,20000],
	color:'#12a789'
});
