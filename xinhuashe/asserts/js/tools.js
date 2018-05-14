function chartBottom(obj,ops){
	var app = new PIXI.Application(obj.width(),obj.height(),{antialias:true,backgroundColor:0x131126});
	$(app.view).appendTo(obj);

	var basicText = new PIXI.Text(ops.title,{fill:'#fff',fontSize:22,align:'left'});
	basicText.x = 43;
	basicText.y = 43;
	app.stage.addChild(basicText);

	var graphics = new PIXI.Graphics();
	
	for(var i=0;i<ops.data.length;i++){
		drawRectChart(ops.data[i].color,ops.data[i].value,ops.data[i].text,i);
	}
	
	app.stage.addChild(graphics);

	function drawRectChart(color,width,text,i){
		graphics.beginFill(0x2b2a3c);
		graphics.drawRect(95,100+i*34,266,13);
		

		var basicText = new PIXI.Text(text,{fill:color,fontSize:20});
		basicText.x = 40;
		basicText.y = 95+i*34
		app.stage.addChild(basicText);
		var ticker = new PIXI.ticker.Ticker();
		ticker.stop();
		var w = 0;
		ticker.add(function(){
			w+=5;
			if(w>=width){
				ticker.stop();
			}
			graphics.beginFill(color);
			graphics.drawRect(95,100+i*34,w,13);
		});
		ticker.start();
	}
}

function barChart(ctx,ops){
	var initW = 685;
	var initH = 200;
	var spaceX = 15;
	var barW = (685-spaceX*(ops.data.length-1))/ops.data.length;
	var initX = ops.x || 108;
	var initY = ops.y || 97;
	var newArr = [];
	
	for(var i=0;i<ops.data.length;i++){
		ctx.beginPath();
		ctx.fillStyle = '#1f1e30';
		ctx.fillRect(initX+i*(barW+spaceX),initY,barW,160);
		ctx.fillRect(initX+i*(barW+spaceX),initY+164,barW,36);
		ctx.font = '20px Microsoft YaHei';
		ctx.textAlign = 'center';
		ctx.textBaseline="middle";
		ctx.fillStyle = '#fff';
		ctx.fillText(ops.xAis[i],initX+barW/2+i*(barW+spaceX),initY+182);
		newArr.push(ops.data[i]);
	}

	ctx.canvas.addEventListener('click',function(e){
		ctx.clearRect(initX,initY-10,initW,initH+10);
		
		for(var i=0;i<ops.data.length;i++){
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = '#1f1e30';
			ctx.rect(initX+i*(barW+spaceX),initY,barW,160);
			ctx.rect(initX+i*(barW+spaceX),initY+164,barW,36);
			ctx.fill();
			if(ctx.isPointInPath(e.layerX,e.layerY)){

				ctx.save();
				ctx.fillStyle = ops.color;
				ctx.fillRect(initX+i*(barW+spaceX),initY+196,barW,4);
				

			}
			ctx.font = '20px Microsoft YaHei';
			ctx.textAlign = 'center';
			ctx.textBaseline="middle";
			ctx.fillStyle = '#fff';
			ctx.fillText(ops.xAis[i],initX+barW/2+i*(barW+spaceX),initY+182);
			ctx.restore();

		}

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = '#fff';
		
		ctx.moveTo(initX+barW/2,initY+(160-ops.data[0]/yAis*160));

		for(var i=0;i<ops.data.length;i++){
			
			if(i){
				ctx.lineTo(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160));
			}
		}

		ctx.stroke();

		for(var i=0;i<ops.data.length;i++){
			ctx.beginPath();
			ctx.fillStyle = '#fff';
			ctx.arc(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160),4,0,Math.PI*2,false);
			ctx.fill();
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = ops.color;
			ctx.arc(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160),18,0,Math.PI*2,false);
			ctx.stroke();
			ctx.rect(initX+i*(barW+spaceX),initY,barW,160);
			ctx.rect(initX+i*(barW+spaceX),initY+164,barW,36);
			if(ctx.isPointInPath(e.layerX,e.layerY)){
				
				var scale = 0;
				(function(i){
					var timer = setInterval(function(){
						var value = Tween.Elastic.easeOut(scale,18,18,100);
						ctx.save();
						ctx.beginPath();
						ctx.fillStyle = ops.color;

						ctx.arc(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160),value,0,Math.PI*2,false);
						ctx.fill();
						
						ctx.restore();
						if(scale >= 36){
							ctx.font='18px Microsoft YaHei';
							ctx.fillStyle = '#fff';
							ctx.textAlign = 'center';
							ctx.textBaseline="middle";
							ctx.fillText(ops.data[i]+'人',initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160));
							clearInterval(timer);
						}
						scale+=4;
					},1000/60);
				})(i);

			}
		}

	});

	newArr.sort(function(a,b){return a<b});
	var strNum = ''+newArr[0];
	var fillLength = strNum.length;
	var numFirst = parseInt(strNum[0])+1;
	var fillNum = '';
	
	for(var i=0;i<fillLength-1;i++){
		fillNum+='0';
	}

	var yAis = parseInt(numFirst+fillNum);

	ctx.fillStyle = ops.color;
	ctx.textAlign = 'right';
	ctx.textBaseline="top";
	ctx.fillText(yAis,initX-10,initY);
	ctx.textBaseline="middle";
	ctx.fillText(yAis/2,initX-10,initY+80);
	ctx.textBaseline="bottom";
	ctx.fillText('0',initX-10,initY+160);

	ctx.textAlign = 'left';
	ctx.fillStyle = '#fff';
	ctx.font = '24px Microsoft YaHei';
	ctx.fillText(ops.title,initX-ctx.measureText(yAis).width,initY-30);

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#fff';
	
	

	ctx.stroke();
	for(var i=0;i<ops.data.length;i++){
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		ctx.arc(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160),4,0,Math.PI*2,false);
		//ctx.scale(0,0);
		ctx.fill();
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = ops.color;
		ctx.arc(initX+barW/2+i*(barW+spaceX),initY+(160-ops.data[i]/yAis*160),18,0,Math.PI*2,false);
		ctx.stroke();

	}

	 

	var t = 1;

	var vertices = [];
	
	for(var i=0;i<ops.data.length;i++){
		vertices.push({
		    x: initX+barW/2+i*(barW+spaceX),
		    y: initY+(160-ops.data[i]/yAis*160)
		});
		
	}

	ctx.lineWidth = 1;
	ctx.strokeStyle = '#fff';
	var points = calcWaypoints(vertices);
	animate(points);


	function calcWaypoints(vertices) {
	    var waypoints = [];
	    for (var i = 1; i < vertices.length; i++) {
	        var pt0 = vertices[i - 1];
	        var pt1 = vertices[i];
	        var dx = pt1.x - pt0.x;
	        var dy = pt1.y - pt0.y;
	        for (var j = 0; j < 20; j++) {
	            var x = pt0.x + dx * j / 20;
	            var y = pt0.y + dy * j / 20;
	            waypoints.push({
	                x: x,
	                y: y
	            });
	        }
	    }
	    return (waypoints);
	}


	function animate() {
	    if (t < points.length - 1) {
	        requestAnimationFrame(animate);
	    }
	    ctx.beginPath();
	    ctx.moveTo(points[t - 1].x, points[t - 1].y);
	    ctx.lineTo(points[t].x, points[t].y);
	    ctx.stroke();
	    t++;
	}
	
}