
chartLeft();
chartRightTop();
chartRightBottom2();

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
			text:'稿件偏好',
			color:'#fff300',

		},
		{
			text:'主题偏好',
			color:'#ff6a00',

		},
		{
			text:'标签偏好',
			color:'#f845af',

		}
	];

	for(var i=0;i<5;i++){
		ctx.fillStyle = title[i].color;
		ctx.textBaseline = 'top';
		ctx.font = '24px Microsoft Yahei';
		ctx.fillText(title[i].text,70,88+i*165);
	}

	
	
	circleAni(321,215,125,'01 音频',0.5);
	circleAni(608,215,112,'01 音频',0);
	circleAni(870,215,100,'01 音频',0.5);
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
	var rectIndex = 0;
	var rectTotal = [{data:15},{data:16},{data:10}];
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


	function drawRect(x,color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,324,5,26);
	}

	drawTitleAndNum('1.经济','756',195);
	drawTitleAndNum('1.经济','756',482);
	drawTitleAndNum('1.经济','756',768);

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

	drawProcess(196,417,777,30,'#2b2a3c');
	drawProcess(196,463,777,30,'#2b2a3c');
	drawProcess(196,509,777,30,'#2b2a3c');
	drawProcess(196,417,128,30,'#eebf00');
	drawProcess(196,463,128,30,'#eebf00');
	drawProcess(196,509,128,30,'#eebf00');
	drawProcess(308,417,16,27,'#816913');
	drawProcess(308,463,16,27,'#816913');
	drawProcess(308,509,16,27,'#816913');

	processAni(196,445,700,2,'#eebf00');
	processAni(196,491,500,2,'#eebf00');
	processAni(196,537,300,2,'#eebf00');

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

	drawProcessText('1.稿件',260,432);
	drawProcessText('1.稿件',260,478);
	drawProcessText('1.稿件',260,524);
	drawProcessText('1.稿件',926,432);
	drawProcessText('1.稿件',926,478);
	drawProcessText('1.稿件',926,524);

	function drawProcess(x,y,w,h,color){
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.fillRect(x,y,w,h);
	}

	function drawProcessText(text,x,y){
		ctx.fillStyle = '#fff';
		ctx.font = '20px Microsoft Yahei';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(text,x,y);
	}

	drawArrow(692,135);
	drawArrow(445,164);
	drawArrow(197,193);
	ctx.fillStyle = '#fff';
	ctx.font = '22px Microsoft Yahei';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText('1.主题A',260,607);
	ctx.fillText('1.主题A',503,607);
	ctx.fillText('1.主题A',750,607);
	ctx.font = '38px Microsoft Yahei';
	ctx.fillText('756',326,646);
	ctx.fillText('593',575,646);
	ctx.fillText('348',816,646);

	function drawArrow(x,w){
		ctx.beginPath();
		ctx.fillStyle = '#753512';
		ctx.fillRect(x+60,583,165,120);
		ctx.moveTo(x+225,583);
		ctx.lineTo(x+285,643);
		ctx.lineTo(x+225,703);
		ctx.fill();
		ctx.fillStyle = '#d95701';
		ctx.save();
		ctx.beginPath();
		ctx.fillRect(x,583,w,120);
		ctx.globalCompositeOperation="destination-out";
		ctx.moveTo(x,583);
		ctx.lineTo(x+60,643);
		ctx.lineTo(x,703);
		ctx.fill();
		ctx.restore();
		ctx.beginPath()
		ctx.moveTo(x+w,583);
		ctx.lineTo(x+w+60,643);
		ctx.lineTo(x+w,703);
		ctx.fill();
	}
	drawTag(197,775,780,5,'#2c2b3d','标签1','756');
	drawTag(197,823,780,5,'#2c2b3d','标签1','756');
	drawTag(197,871,780,5,'#2c2b3d','标签1','756');
	tagAni(197,775,750,5,'#b63786','标签1','756');
	tagAni(197,823,700,5,'#b63786','标签1','756');
	tagAni(197,871,600,5,'#b63786','标签1','756');

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
	ctx.fillText('年消费金额',38,38);
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
		drawTriangle(73+i*128,370,Math.random());
	}
	
	function drawTriangle(x,y,scale){
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
		ctx.fillText('200元以下',x+30,y+5);
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
	ctx.fillText('累计消费金额',38,38);

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

function chartRightBottom2(){
	var chart = echarts.init($('.chart-right .bottom')[0]);
	var option = {
					backgroundColor:'#131126',
				    title : {
				        text: '累计消费金额',
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