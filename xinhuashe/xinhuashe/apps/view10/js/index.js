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

chartBottom($('.chart-right .bottom .bar-left'),{
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

chartBottom($('.chart-right .bottom .bar-right'),{
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

userChartLeft();
function userChartLeft(){
	var canvas = document.createElement("canvas");
	canvas.className = "scene";
	$(".chart-left").append(canvas);

	var app = new PIXI.Application(936, 907, {
	    view: canvas,
	    transparent: true,
	    antialias: false,
	    preserveDrawingBuffer: false,
	    resolution: 1
	});

	var sp = new PIXI.Graphics();
	app.stage.addChild(sp);

	var paint = new PIXI.Graphics();
	app.stage.addChild(paint);

	app.ticker.add(function () {
	    animate();
	});

	var center = {x: 352, y: 369};
	var radiis = [218, 147, 132, 118];
	var angles = [18, 54, 90, 126, 162, 197, 234, 270, 306, 342];
	var list = [
	    {
	        name: "项目A",
	        color: 0x3748D4,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    },
	    {
	        name: "项目B",
	        color: 0x4A1ABC,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目C",
	        color: 0xEEBF00,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目D",
	        color: 0xEB8B00,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目E",
	        color: 0xD85801,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目F",
	        color: 0xC6003D,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目G",
	        color: 0xD23C95,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目H",
	        color: 0x00B9F9,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目I",
	        color: 0x00B290,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	    ,
	    {
	        name: "项目J",
	        color: 0x3AB300,
	        value: random(radiis[2] * 0.4, radiis[0] * 0.8),
	        current: 0,
	    }
	]

	var init = 0;

	static();
	function static() {
	    var r1 = new PIXI.Sprite.fromImage('/apps/view7/imgs/r1.png');
	    r1.anchor.set(0.5, 0.5);
	    r1.x = center.x;
	    r1.y = center.y;
	    r1.scale.set(0.95, 0.95);
	    app.stage.addChild(r1);

	    var r2 = new PIXI.Sprite.fromImage('/apps/view7/imgs/r2.png');
	    r2.anchor.set(0.5, 0.5);
	    r2.x = center.x;
	    r2.y = center.y;
	    r2.scale.set(0.95, 0.95);
	    app.stage.addChild(r2);


	    //line
	    sp.lineStyle(1, 0xffffff, 0.3);


	    for (var i = 0; i < angles.length; i++) {
	        var p = arcAxis(center, radiis[0], angles[i]);
	        sp.moveTo(center.x, center.y);
	        sp.lineTo(p.x, p.y);
	    }

	    for (var i = 0; i < radiis.length; i++) {

	        var r = radiis[i];
	        var lastP = null;


	        for (var j = 0; j < angles.length; j++) {

	            var p = arcAxis(center, r, angles[j]);

	            if (j == 0) {

	                sp.moveTo(p.x, p.y);
	                lastP = p;
	            }
	            else {

	                sp.lineTo(p.x, p.y);
	            }

	        }

	        if (lastP) {
	            sp.lineTo(lastP.x, lastP.y);
	        }

	    }

	    var style = new PIXI.TextStyle({
	        fontFamily: 'Arial',
	        fontSize: 20,
	        fill: 0xffffff,
	    });

	    for(var i=0;i<list.length;i++){
	    	var d = list[i];
	    	
	    	var rect = new PIXI.Graphics();
	    	rect.beginFill(d.color);
	    	rect.drawRect(710,125+i*50,192,30);
	    	rect.endFill();
	    	var content = new PIXI.Text(d.name,style);
	    	content.anchor.set(0.5,0.5);
	    	content.x = 800;
	    	content.y = 141+i*50;
	    	app.stage.addChild(rect);
	    	app.stage.addChild(content);
	    }

	    var title = new PIXI.Text('用户地域分布',{fontFamily: 'Arial',fontSize: 24,fill: 0xffffff});
	    title.x = 42,
	    title.y = 40;
	    app.stage.addChild(title);

	}

	function random(min, max) {
	    return min + Math.floor(Math.random() * (max - min + 1));
	}

	function arcAxis(center, r, angle) {
	    angle = angle * Math.PI / 180;
	    var result = {x: 0, y: 0};
	    result.x = center.x + r * Math.cos(angle);
	    result.y = center.y + r * Math.sin(angle);

	    return result;
	}

	function animate() {

	    if (init == 0) {
	        paint.clear();
	        bars();
	    }
	    else if (init == 1) {

	        for (var i = 0; i < angles.length; i++) {
	            var d = list[i];

	            var r = radiis[0] + 42;
	            if (i == 2 || i == 7) {
	                r = radiis[0] + 32;
	            }
	            var p = arcAxis(center, r, angles[i]);
	           /* paint.beginFill(d.color, 1);
	            paint.drawRect(p.x - 40, p.y - 15, 80, 30);
	            paint.endFill();*/

	            var style = new PIXI.TextStyle({
	                fontFamily: 'Arial',
	                fontSize: 20,
	                fill: 0xffffff,
	            });


	            //var text = new PIXI.Text(d.name, style);
	            var text = new PIXI.Text(Math.round(d.value * 13),style);
	            text.anchor.set(0.5, 0.5);
	            text.x = p.x;
	            text.y = p.y;

	            app.stage.addChild(text);

	            var p2 = arcAxis(center, d.current + 10, angles[i]);

	           /* var text2 = new PIXI.Text(Math.round(d.value * 13), new PIXI.TextStyle({
	                    fontFamily: 'Arial',
	                    fontSize: 14,
	                    fill: 0xffffff,
	                })
	            );
	            text2.anchor.set(0.5, 0.5);
	            text2.x = p2.x;
	            text2.y = p2.y;

	            app.stage.addChild(text2);*/


	        }

	        init = 2;
	    }

	}


	function bars() {

	    var readyCount = 0;
	    for (var i = 0; i < list.length; i++) {
	        var data = list[i];
	        var angle = angles[i];

	        if (data.ready) {
	            readyCount++;
	        }
	        bar(data, angle);
	    }

	    if (readyCount == list.length - 1) {
	        init = 1;
	    }
	}

	function bar(data, angle) {
	    var a1 = angle - 2;
	    var a2 = angle + 2;
	    var t1 = arcAxis(center, data.current, a1);
	    var t2 = arcAxis(center, data.current, a2);
	    var c = {
	        x: (t1.x + t2.x) / 2,
	        y: (t1.y + t2.y) / 2
	    }

	    var dis = Math.pow(((t2.x - t1.x) * (t2.x - t1.x) + (t2.y - t1.y) * (t2.y - t1.y)), 0.5);
	    var r = dis / 2;

	    paint.lineStyle(0);
	    paint.beginFill(data.color, 0.6);
	    paint.moveTo(center.x, center.y);
	    paint.lineTo(t1.x, t1.y);
	    paint.lineTo(t2.x, t2.y);
	    paint.lineTo(center.x, center.y);
	    paint.endFill();

	    paint.beginFill(data.color, 0.6);
	    paint.drawCircle(c.x, c.y, r);
	    paint.endFill();

	    if (data.ready) {

	    }
	    else {
	        data.current += 8;


	        if (data.current >= data.value) {
	            data.ready = true;
	            data.current = data.value;
	        }
	    }


	}

	typeclass();

	function typeclass(){
		var title = new PIXI.Text('分类',{fontFamily: 'Arial',fontSize: 24,fill: 0xffffff});
		title.x = 42,
		title.y = 678;
		app.stage.addChild(title);

		var dataList = [
			{
				name:'企业',
				value:0.75
			},
			{
				name:'政府',
				value:0.5
			},
			{
				name:'事业单位',
				value:0.35
			},
			{
				name:'军队',
				value:0.95
			},
			{
				name:'纸媒',
				value:0.15
			},
			{
				name:'电视台',
				value:0.25
			},
			{
				name:'电台',
				value:0.65
			},
			{
				name:'网站',
				value:0.05
			}
		];

		for(var i=0;i<dataList.length;i++){
			var rect = new PIXI.Graphics();
			rect.beginFill(0x2c2e3a);
			rect.drawRect(40+220*(i%4),780+63*Math.floor(i/4),200,10);
			rect.endFill();
			app.stage.addChild(rect);
			var text = new PIXI.Text(dataList[i].name,{fontFamily: 'Arial',fontSize: 20,fill: 0xffffff});
			text.x = 40+220*(i%4);
			text.y = 745+63*Math.floor(i/4);
			app.stage.addChild(text);
			typeclassAni(i)
			
		}

		function typeclassAni(i){
			var rect2 = new PIXI.Graphics();
			rect2.beginFill(0x1cb4ff);
			rect2.drawRect(40+220*(i%4),780+63*Math.floor(i/4),0,10);
			rect2.endFill();
			app.stage.addChild(rect2);
			var n = 0;
			var speed = 200*dataList[i].value/60;
			var timer = setInterval(function(){
				n+=speed;
				if(n>=200*dataList[i].value){
					n = 200*dataList[i].value;
					clearInterval(timer);
					
				}
				rect2.beginFill(0x1cb4ff);
				rect2.drawRect(40+220*(i%4),780+63*Math.floor(i/4),n,10);
			},10);
		}
	}

	


}