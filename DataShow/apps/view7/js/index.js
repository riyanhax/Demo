var chartRTop = $('.right-chart .top');
var canvas = $('<canvas></canvas>');
canvas.attr('width',chartRTop.width());
canvas.attr('height',chartRTop.height());
canvas.appendTo(chartRTop);
var ctx = canvas.get(0).getContext('2d');


$.get(Config.api.api4).success(function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	res = res.data.averageStayLength;
	var xAis = [];
	var data = [];
	for(var i=0;i<res.length;i++){
		xAis.push(res[i].label_value);
		data.push(res[i].cover_num)
	}

	barChart(ctx,{
		x:108,
		y:97,
		title:'用户浏览时长',
		xAis:xAis,
		data:data,
		color:'#3ca7df'
	});

});

$.get(Config.api.api3).success(function(res){
	res = JSON.parse(res).data.accessTime;
	var xAis = [];
	var data = [];
	for(var i=0;i<res.length;i++){
		xAis.push(res[i].label_value);
		data.push(res[i].cover_num)
	}
	barChart(ctx,{
		x:108,
		y:403,
		title:'用户浏览时段',
		xAis:xAis,
		data:data,
		color:'#12a789'
	});
});


var colors = [0x3ca7df,0x12a789,0x698b2d];

$.get(Config.api.api2).success(function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	res = res.data.accessFrequent;

	var data = [];
	for(var i=0;i<3;i++){
		data.push({
			text:res[i].label_value,
			value:res[i].cover_num,
			color:colors[i]
		})
	}

	chartBottom($('.right-chart .bottom .bar-left'),{
		title:'用户浏览频度',
		data:data
	});

});


chartBottom($('.right-chart .bottom .bar-right'),{
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

$.get(Config.api.api1).success(function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	res = res.data;
	var gender = initUserInfo(res.gender);
	var marital = initUserInfo(res.marital);
	var generatoin = initUserInfo(res.generatoin);
	chartTop({
		x:40,
		y:130,
		title:'性别',
		text:gender.text,
		value:gender.scale
	});

	chartTop({
		x:674,
		y:100,
		title:'婚姻状况',
		text:marital.text,
		value:marital.scale
	});

	chartTop({
		x:674,
		y:285,
		title:'年龄',
		text:generatoin.text,
		value:generatoin.scale
	});
});

function initUserInfo(data){
	var num = 0;
	var text = [];
	var scale = [];
	for(var i=0;i<3;i++){
		num+=data[i].cover_num;
		text.push(data[i].label_value)
	}

	scale.push((data[0].cover_num/num).toFixed(2));
	scale.push((data[0].cover_num/num+data[1].cover_num/num).toFixed(2))
	scale.push(1);
	return {
		scale:scale,
		text:text
	}
}

var chartTopObj = $('.left-chart .top');
var chartTopApp = new PIXI.Application(chartTopObj.width(),chartTopObj.height(),{backgroundColor:0x141623});
$(chartTopApp.view).appendTo(chartTopObj);

var graphics = new PIXI.Graphics();
graphics.beginFill(0x1cb4ff);
graphics.drawRoundedRect(326,221,288,50,10);
chartTopApp.stage.addChild(graphics);

var text = new PIXI.Text('个人用户群体画像',{align:'center',fontSize:24,fill:'#fff'});
text.x = 470-text.width/2;
text.y = 246-text.height/2;
chartTopApp.stage.addChild(text);

var users = new PIXI.Sprite.fromImage('../view7/imgs/users.jpg');
users.x = 329;
users.y = 95;
chartTopApp.stage.addChild(users);




// chartTop({
// 	x:40,
// 	y:250,
// 	title:'国籍',
// 	text:['男性','中性','女性'],
// 	value:[0.7,0.8,1]
// });
//
//
//
// chartTop({
// 	x:674,
// 	y:192,
// 	title:'国籍',
// 	text:['男性','中性','女性'],
// 	value:[0.7,0.8,1]
// });



function chartTop(ops){
	var colors = [0x1cb4ff,0x00b191,0xb69508];
	var num = ops.value.length-1;
	var graphics = new PIXI.Graphics();
	var textPos = [];
	if(ops.value.length==2){
		textPos=[ops.x,ops.x+228];
	}else{
		textPos=[ops.x,ops.x+228/2,ops.x+228];
	}
	while(num>-1){
		graphics.beginFill(colors[num]);
		graphics.drawRect(ops.x,ops.y,228*ops.value[num],5);
		var text = new PIXI.Text(ops.text[num],{fontFamily : 'Micorsoft YaHei', fontSize: 20, fill : colors[num]});
		if(num){
			text.x = textPos[num]-text.width;
		}else{
			text.x = textPos[num];
		}
		if(num==1 && ops.value.length==3){

			text.x = textPos[num] - text.width/2;
		}
		text.y = ops.y-35;
		chartTopApp.stage.addChild(text);
		num--;
	}

	var title = new PIXI.Text(ops.title,{fontFamily : 'Micorsoft YaHei', fontSize: 20, fill : 0xffffff});
	title.x = ops.x;
	title.y = ops.y-70;
	chartTopApp.stage.addChild(title);
	chartTopApp.stage.addChild(graphics);
}

usersChart();

function usersChart(){
	var chart = $('.left-chart .bottom');
	var app = new PIXI.Application(385,chart.height(),{backgroundColor:0x141623});
	$(app.view).appendTo(chart);
	for(var i=0;i<13;i++){
		drawChart(i)
	}

	function drawChart(i){
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0x2c2e3a);
		graphics.drawRect(0+Math.floor(i/7)*181,67+(i%7)*75,165,6);
		graphics.beginFill(0x1eb4ff);
		graphics.drawRect(0+Math.floor(i/7)*181,67+(i%7)*75,105,6);
		app.stage.addChild(graphics);

		var text = new PIXI.Text('会计/金融/保险/银行',{fontFamily : 'Micorsoft YaHei', fontSize: 14, fill : 0xffffff});
		text.x = 0+Math.floor(i/7)*181;
		text.y = 35+(i%7)*75;
		app.stage.addChild(text);
	}
}

userChartLeft();
function userChartLeft(){
	var canvas = document.createElement("canvas");
	canvas.className = "scene";
	$(".left-chart .bottom").append(canvas);

	var app = new PIXI.Application(936, 560, {
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

	var center = {x: 277, y: 294};
	var radiis = [173, 123, 108, 93];
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
	for(var i=0;i<list.length;i++){
		list[i].name = '';
		list[i].value = 0;
	}
	$.get(Config.api.api5).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		for(var i=0;i<res.length;i++){
			list[i].name = res[i].province;
			list[i].value = res[i].number;
		}
		static();
	});

	function static() {
	    var r1 = new PIXI.Sprite.fromImage('../view7/imgs/r1.png');
	    r1.anchor.set(0.5, 0.5);
	    r1.x = center.x;
	    r1.y = center.y;
	    r1.scale.set(0.75, 0.75);
	    app.stage.addChild(r1);

	    var r2 = new PIXI.Sprite.fromImage('../view7/imgs/r2.png');
	    r2.anchor.set(0.5, 0.5);
	    r2.x = center.x;
	    r2.y = center.y;
	    r2.scale.set(0.75, 0.75);
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
	            paint.beginFill(d.color, 1);
	            paint.drawRect(p.x - 40, p.y - 15, 80, 30);
	            paint.endFill();

	            var style = new PIXI.TextStyle({
	                fontFamily: 'Arial',
	                fontSize: 20,
	                fill: 0xffffff,
	            });


	            var text = new PIXI.Text(d.name, style);
	            text.anchor.set(0.5, 0.5);
	            text.x = p.x;
	            text.y = p.y;

	            app.stage.addChild(text);

	            var p2 = arcAxis(center, d.current + 10, angles[i]);

	            var text2 = new PIXI.Text(Math.round(d.value * 13), new PIXI.TextStyle({
	                    fontFamily: 'Arial',
	                    fontSize: 14,
	                    fill: 0xffffff,
	                })
	            );
	            text2.anchor.set(0.5, 0.5);
	            text2.x = p2.x;
	            text2.y = p2.y;

	            app.stage.addChild(text2);


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


}
