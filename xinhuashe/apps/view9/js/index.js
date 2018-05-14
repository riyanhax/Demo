
chartLeft()

function chartLeft(){
	var $chart = $('.chart-left');
	var canvas = $('<canvas></canvas>');
	canvas.attr('width',$chart.width());
	canvas.attr('height',$chart.height());
	canvas.appendTo($chart);

	var ctx = canvas[0].getContext('2d');

	drawHalfCircle(321,215,125,'01 音频',0.5);
	drawHalfCircle(608,215,112,'01 音频',0);
	drawHalfCircle(870,215,100,'01 音频',0.5);

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

	for(var i=0;i<15;i++){
		drawRect(195+i*10,'#00cba3');
		drawRect(482+i*10,'#00cba3');
		drawRect(768+i*10,'#00cba3');
	}

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
	drawProcess(196,445,700,2,'#eebf00');
	drawProcess(196,491,500,2,'#eebf00');
	drawProcess(196,537,300,2,'#eebf00');
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
	drawTag(197,775,750,5,'#b63786','标签1','756');
	drawTag(197,823,780,5,'#2c2b3d','标签1','756');
	drawTag(197,823,700,5,'#b63786','标签1','756');
	drawTag(197,871,780,5,'#2c2b3d','标签1','756');
	drawTag(197,871,600,5,'#b63786','标签1','756');

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