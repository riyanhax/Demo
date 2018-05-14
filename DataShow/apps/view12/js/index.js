
chartLeft();
chartRightTop();

function chartLeft(){
	var $chart = $('.chart-left');
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',$chart.width());
	canvas.attr('height',$chart.height());
	canvas.appendTo($chart);

	var ctx = canvas[0].getContext('2d');

	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'top';
	ctx.font = '24px Microsoft Yahei';
	ctx.fillText('内容偏好 TOP',38,38);

	var title = [
		{
			text:'类别偏好',
			color:'#1ed1ff',

		},
		{
			text:'栏目偏好',
			color:'#00e5b5',

		},
		{
			text:'线路偏好',
			color:'#ff6a00',

		},
		{
			text:'稿件偏好',
			color:'#fff300',

		},
		{
			text:'下载偏好',
			color:'#fff300',

		}
	];

	for(var i=0;i<5;i++){
		ctx.fillStyle = title[i].color;
		ctx.textBaseline = 'top';
		ctx.font = '24px Microsoft Yahei';
		if(i<=3){
			ctx.fillText(title[i].text,70,88+i*162);
		}else{
			ctx.fillText(title[i].text,557,88+(i-1)*160);
		}

	}

	$.get(Config.api.api1).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		var data = res.data;
		var total = 0;
		for(var i=0;i<3;i++){
			total+=data[i].number;
		}
		circleAni(321,215,125,data[0].mediaTypeName,1-data[0].number/total);
		circleAni(608,215,112,data[1].mediaTypeName,1-data[1].number/total);
		circleAni(870,215,100,data[2].mediaTypeName,1-data[2].number/total);
	});



	function circleAni(x,y,r,text,stop){
		var step = 1;
		var interval = stop>0?stop/60:1/60;
		clearInterval(circleTimer);
		var circleTimer = setInterval(function(){
			ctx.clearRect(x-r,58,2*r,175);
			if(step<=stop){
				clearInterval(circleTimer);
				drawHalfCircle(x,y,r,text,stop);
				return;
			}
			step-=interval;
			drawHalfCircle(x,y,r,text,step);
		},16);
	}

	function drawHalfCircle(x,y,r,text,scale){
		ctx.beginPath();
		ctx.lineWidth = 15;
		ctx.strokeStyle = '#2b2a3c';
		ctx.arc(x,y,r,0,Math.PI,true);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = '#666572';
		ctx.arc(x,y,r-35,0,Math.PI,true);
		ctx.stroke();

		ctx.beginPath();
		var gr = ctx.createLinearGradient(x-123,215,x+r,215);
		gr.addColorStop(0,'#2f5774');
	    gr.addColorStop(1,'#43c5ff');
		ctx.lineWidth = 15;
		ctx.strokeStyle = gr;
		ctx.arc(x,y,r,-Math.PI,-Math.PI*scale,false);
		ctx.stroke();
		ctx.closePath();

		ctx.fillStyle = '#fff';
		ctx.textAlign = 'center';
		ctx.font = '24px Microsoft Yahei';
		ctx.fillText(text,x,y-15);
	}

	for(var i=0;i<22;i++){
		drawRect(195+i*10,'#2d2c3e');
		drawRect(482+i*10,'#2d2c3e');
		drawRect(768+i*10,'#2d2c3e');
	}

	function rectAni(data){
		var rectIndex = 0;
		var rectTotal = data;
		var rectTimer = setInterval(function(){
			if(rectIndex<=rectTotal[0].data){
				drawRect(195+rectIndex*10,'#00cba3');
			}else{
				rectTotal[0].rectEnd = true;
			}

			if(rectIndex<=rectTotal[1].data){
				drawRect(482+rectIndex*10,'#00cba3');
			}else{
				rectTotal[1].rectEnd = true;
			}

			if(rectIndex<=rectTotal[2].data){
				drawRect(768+rectIndex*10,'#00cba3');
			}else{
				rectTotal[2].rectEnd = true;
			}

			if(rectTotal[0].rectEnd && rectTotal[1].rectEnd && rectTotal[2].rectEnd){
				clearInterval(rectTimer);
			}
			rectIndex++;
		},30);

	}

	function drawRect(x,color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,324,5,26);
	}

	$.get(Config.api.api2).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		var data = res.data;
		data.reverse();
		var total = 0;
		var scale = [{data:0},{data:0},{data:0}];

		for(var i=0;i<3;i++){
			total+=data[i].number;
		}

		for(var i=0;i<scale.length;i++){
			scale[i].data = Math.round(data[i].number/total*22)
		}

		drawTitleAndNum(data[0].columnCategoryName,data[0].number,195);
		drawTitleAndNum(data[1].columnCategoryName,data[1].number,482);
		drawTitleAndNum(data[2].columnCategoryName,data[2].number,768);
		rectAni(scale);
	});


	function drawTitleAndNum(title,num,x){
		ctx.fillStyle = '#fff';
		ctx.font = '22px Microsoft Yahei';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(title,x,254);
		ctx.font = '36px Microsoft Yahei';
		ctx.textAlign = 'right';
		ctx.fillText(num,x+212,254);
	}


	$.get(Config.api.api4).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		var data = res.data;
		var Manuscript = data.Manuscript;
		var download = data.download;
		for(var i=0;i<Manuscript.length;i++){
			processGroup(70,182,92,495,i,Manuscript[i].iid,Manuscript[i].number);
		}
		for(var i=0;i<download.length;i++){
			processGroup(557,670,583,992,i,download[i].iid,download[i].number);
		}
	});

	function processGroup(x1,x2,x3,x4,i,name,txt){
		drawProcess(x1,620+46*i,448,30,'#2b2a3c');
		drawProcess(x1,620+46*i,128,30,'#eebf00');
		processAni(x1,648+46*i,436,2,'#eebf00');
		drawProcess(x2,620+46*i,16,27,'#816913');
		drawProcessText(name,x3,635+46*i);
		drawProcessText(txt,x4,635+46*i,true);
	}

	function processAni(x,y,w,h,color){
		var step = 0;
		clearInterval(timer);
		var timer = setInterval(function(){
			if(step>=w){
				clearInterval(timer);
				drawProcess(x,y,w,h,color);
				return;
			}
			step+=15;
			drawProcess(x,y,step,h,color);
		},16)
	}

	function drawProcess(x,y,w,h,	color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,w,h);
	}

	function drawProcessText(text,x,y,pos){
		ctx.fillStyle = '#fff';
		ctx.font = '20px Microsoft Yahei';
		if(pos){
			ctx.textAlign = 'right';
		}else {
			ctx.textAlign = 'left';
		}

		ctx.textBaseline = 'middle';
		ctx.fillText(text,x,y);
	}

	drawArrow(692,135);
	drawArrow(445,164);
	drawArrow(197,193);

	$.get(Config.api.api3).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		var data = res.data;
		ctx.fillStyle = '#fff';
		ctx.font = '22px Microsoft Yahei';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillText(data[0].productCategoryName,260,439);
		ctx.fillText(data[1].productCategoryName,503,439);
		ctx.fillText(data[2].productCategoryName,750,439);
		ctx.font = '38px Microsoft Yahei';
		ctx.fillText(data[0].number,326,478);
		ctx.fillText(data[1].number,575,478);
		ctx.fillText(data[2].number,816,478);
	});


	function drawArrow(x,w){
		ctx.beginPath();
		ctx.fillStyle = '#753512';
		ctx.fillRect(x+60,415,165,120);
		ctx.moveTo(x+225,415);
		ctx.lineTo(x+285,475);
		ctx.lineTo(x+225,535);
		ctx.fill();
		ctx.fillStyle = '#d95701';
		ctx.save();
		ctx.beginPath();
		ctx.fillRect(x,415,w,120);
		ctx.globalCompositeOperation="destination-out";
		ctx.moveTo(x,415);
		ctx.lineTo(x+60,475);
		ctx.lineTo(x,535);
		ctx.fill();
		ctx.restore();
		ctx.beginPath()
		ctx.moveTo(x+w,415);
		ctx.lineTo(x+w+60,475);
		ctx.lineTo(x+w,535);
		ctx.fill();
	}
	// drawTag(197,775,780,5,'#2c2b3d','标签1','756');
	// drawTag(197,823,780,5,'#2c2b3d','标签1','756');
	// drawTag(197,871,780,5,'#2c2b3d','标签1','756');
	// tagAni(197,775,750,5,'#b63786','标签1','756');
	// tagAni(197,823,700,5,'#b63786','标签1','756');
	// tagAni(197,871,600,5,'#b63786','标签1','756');

	function tagAni(x,y,w,h,color,text,num){
		var step = 0;
		clearInterval(tagTimer);
		var tagTimer = setInterval(function(){
			//ctx.clearRect(x,y-60,w+60,h+60);
			if(step>=w){
				clearInterval(tagTimer);
				//drawTag(x,y,780,h,'#2c2b3d',text,num);
				drawTag(x,y,w,h,color,text,num);
				return;
			}
			step+=15;
			//drawTag(x,y,780,h,'#2c2b3d',text,num);
			drawTag(x,y,step,h,color,text,num);
		},16);
	}

	function drawTag(x,y,w,h,color,text,num){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,w,h);
		ctx.fillStyle = '#fff';
		ctx.font = '20px Microsoft Yahei';
		ctx.textAlign = 'left';
		ctx.fillText(text,x,y-40);
		ctx.textAlign = 'right';
		ctx.fillText(num,977,y-40);
	}

}

function chartRightTop(){
	var $chart = $('.chart-right .top');
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',$chart.width());
	canvas.attr('height',$chart.height());
	$(canvas).appendTo($chart);
	var ctx = canvas[0].getContext('2d');
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'top';
	ctx.font = '24px Microsoft Yahei';
	ctx.fillText('浏览量',38,38);
	for(var i=0;i<4;i++){
		drawDashedLine(ctx,38,113+i*64,678,113+i*64,'#666',1,5);
	}

	ctx.beginPath();
	ctx.strokeStyle = '#666';
	ctx.lineWidth = 2;
	ctx.moveTo(38,369);
	ctx.lineTo(678,369);
	ctx.stroke();
	$.get(Config.api.api5).success(function(res){
		if(typeof res !== 'object'){
			res = JSON.parse(res);
		}
		var data = res.data;
		var total = 0;
		for(var i=0;i<data.length;i++){
			total+=data[i].number;
		}
		for(var i=0;i<data.length;i++){
			drawTriangle(73+i*128,370,data[i].number/total,data[i].key);
		}
	});

	function drawTriangle(x,y,scale,text){
		var endPos = 260*scale;
		var step = 0;
		var speed = endPos/60;
		var timer = setInterval(function(){
			step+=speed;

			if(step>=endPos){
				step = endPos;
				clearInterval(timer);
			}
			startDraw(step);
		},1);


		function startDraw(h){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = '#1cb4ff';
			ctx.moveTo(x,y);
			ctx.lineTo(x+30,y-h);
			ctx.lineTo(x+60,y);
			ctx.fill();
			ctx.closePath();
			ctx.beginPath();
			ctx.fillStyle = 'rgba(0,0,0,0.1)';
			ctx.moveTo(x+30, y);
			ctx.lineTo(x+30, y-h);
			ctx.lineTo(x+60, y);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}

		ctx.fillStyle = '#eee';
		ctx.textAlign = 'center';
		ctx.font = '20px Microsoft Yahei';
		ctx.fillText(text,x+30,y+5);
	}

}

function chartRightBottom(){
	var $chart = $('.chart-right .bottom');
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',$chart.width());
	canvas.attr('height',$chart.height());
	canvas.appendTo($chart);
	var ctx = canvas[0].getContext('2d');
	ctx.beginPath();

	ctx.fillStyle = '#fff';
	ctx.textBaseline = 'top';
	ctx.font = '24px Microsoft Yahei';
	ctx.fillText('下载量',38,38);

	for(var i=0;i<5;i++){
		ctx.fillStyle = '#eee';
		ctx.textAlign = 'center';
		ctx.font = '20px Microsoft Yahei';
		ctx.fillText('200元以下',103+i*128,375);
	}
	drawLine();
	function drawLine(){
		var random = [];
		var steps = [];
		var lastPos = {x:38,y:370};

		for(var i=0;i<5;i++){
			var data = Math.random();
			random.push(data);
			clacPos(100+i*128,370-260*data);
		}
		clacPos(678,369);
		var index = 0;

		ctx.beginPath();
		var gr = ctx.createLinearGradient(678,140,678,369);
		gr.addColorStop(0,'rgba(27,152,145,0.8)');
	    gr.addColorStop(1,'rgba(15,48,57,0.6)');
		ctx.strokeStyle = '#00bb99';
		ctx.fillStyle = gr;
		ctx.lineWidth = 4;
		ctx.moveTo(38,369);

		var timer = setInterval(function(){

			if(index>=steps.length){
				clearInterval(timer);
				for(var i=0;i<4;i++){
					drawDashedLine(ctx,38,113+i*64,678,113+i*64,'#666',1,5);
				}
				ctx.beginPath();
				ctx.strokeStyle = '#666';
				ctx.lineWidth = 2;
				ctx.moveTo(38,369);
				ctx.lineTo(678,369);
				ctx.stroke();
				for(var i=0;i<5;i++){
					ctx.beginPath();
					ctx.fillStyle = '#fff';
					ctx.strokeStyle = '#00bb99';
					ctx.lineWidth = 4;
					ctx.arc(100+i*128,370-260*random[i],4,0,Math.PI*2,true);
					ctx.stroke();
					ctx.fill();
				}
				return;
			}
			ctx.clearRect(38,112,648,269);

			ctx.lineTo(steps[index].x,steps[index].y);
			ctx.stroke();
			ctx.fill();
			index++;
		},1);
		function clacPos(x,y){
			var step = 20;
			var xStep = (x-lastPos.x)/step;
			var yStep = (y-lastPos.y)/step;
			for(var i=0;i<step;i++){
				steps.push({
					x:lastPos.x+xStep*i,
					y:lastPos.y+yStep*i
				});
			}
			lastPos.x = x;
			lastPos.y = y;
		}

	}

}

var option = {
					backgroundColor:'#131126',
				    title : {
				        text: '下载量',
				        left:38,
				        top:38,
				        textStyle: {
				        	fontSize:24,
				        	color:'#fff',
				        	fontWeight:'normal'
				        }
				    },
				    tooltip : {
				        trigger: 'axis'
				    },
				    grid:{
				    	left:42,
				    	top:112,
				    	right:42
				    },
				    calculable : true,
				    xAxis : [
				        {
				            type : 'category',
				            boundaryGap : false,
				            data : ['200元以下','200元以下','200元以下','200元以下','200元以下'],
				            axisLabel: {
				            	textStyle:{
				            		color:'#fff',
				            		fontSize:20
				            	}
				            }

				        }
				    ],
				    yAxis : [
				        {
				            type : 'value',
				            splitNumber:4,
				            splitLine: {
				            	lineStyle:{
				            		type:'dashed',
				            		 color: ['#ddd']
				            	}
				            },
				            axisTick: {
				            	show:false
				            },
				            axisLabel: {
				            	show:false
				            }
				        }
				    ],
				    series : [
				        {
				        	color:['#00b292'],
				            name:'意向',
				            type:'line',
				            lineStyle:{
				            	normal:{
				            		color:'#00b292'
				            	}
				            },
				            smooth:false,
				            itemStyle: {normal: {areaStyle: {type: 'default',color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: '#136861'
		                    }, {
		                        offset: 1,
		                        color: '#1f333e'
		                    }])}}},
				            data:[1320, 1132, 601, 234, 120]
				        }
				    ]
				};

$.get(Config.api.api6).success(function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	var data = res.data;
	var xAxis = [];
	var value = [];

	for(var i=0;i<data.length;i++){
		xAxis.push(data[i].key);
		value.push(data[i].number);
	}

	option.xAxis[0].data = xAxis;
	option.series[0].data = value;
	chartRightBottom2();
});

function chartRightBottom2(){
	var chart = echarts.init($('.chart-right .bottom')[0]);

	chart.setOption(option);

}

function drawDashedLine(ctx,sx,sy,tx,ty,color,lineWidth,dashLen){
    var len = cacuDis(sx,sy,tx,ty),
        lineWidth = lineWidth || 1,
        dashLen = dashLen || 5,
        num = ~~(len / dashLen);
    ctx.beginPath();
    for(var i=0;i<num;i++){
        var x = sx + (tx - sx) / num * i,
            y = sy + (ty - sy) / num * i;
        ctx[i & 1 ? "lineTo" : "moveTo"](x,y);
    }
    ctx.closePath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function cacuDis(sx,sy,tx,ty){
    return Math.sqrt(Math.pow(tx-sx,2)+Math.pow(ty-sy,2));
}
