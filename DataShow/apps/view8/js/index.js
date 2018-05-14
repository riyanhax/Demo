
$.get(Config.api.api1,function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	if(res.code == 200){
		var data  = [];
		var colors = [0x01b9f9,0x00b191,0x3ab100,0xeebf00,0xeb8b00,0xd85801,0xe83928];
		for(var i=0;i<res.data.length;i++){
			var tmp = [];
			for(var j=0;j<res.data[i].apiList.length;j++){
				tmp.push({
					name:res.data[i].apiList[j].api_name,
					data:res.data[i].apiList[j].access_count
				});
			}
			
			data.push({
				title:res.data[i].app_name,
				color:colors[i],
				types:tmp
			});
		}
		chartBottom(data);
	}
});

$.get(Config.api.api2,function(res){
	if(typeof res !== 'object'){
		res = JSON.parse(res);
	}
	if(res.code == 200){
		chartTop(res.data[0]);
	}
});




function chartTop(ops){
	var $chart = $('.chart-top');
	var app = new PIXI.Application($chart.width(),$chart.height());
	$(app.view).appendTo($chart);

	var data = [
		{
			data:ops.totalCount,
			unit:'次',
			desc:'被调用',
			color:0x00b9f9
		},
		{
			data:ops.successCount,
			unit:'次',
			desc:'成功',
			color:0x00b191
		},
		{
			data:ops.present,
			unit:'%',
			desc:'成功率',
			color:0xeebf00
		},
		{
			data:ops.useTime,
			unit:'s',
			desc:'即使服务时间',
			color:0xd95701
		}
	];


	for(var i=0;i<4;i++){
		drawData(i,data[i]);
	}

	//var filePath = ['/imgs/file.jpg','/imgs/success.jpg','/imgs/chart.jpg','/imgs/time.jpg'];
	var filePath = ['../../apps/view8/imgs/file.jpg','../../apps/view8/imgs/success.jpg','../../apps/view8/imgs/chart.jpg','../../apps/view8/imgs/time.jpg'];

	for(var i=0;i<4;i++){
		displayIcon (i);
	}

	function displayIcon(i) {
		var bunny = PIXI.Sprite.fromImage(filePath[i]);
		bunny.x = 50+i*454;
		bunny.y = i%2?50:30;
		app.stage.addChild(bunny);
	}
	

	function drawData(i,ops){
		var graphics = new PIXI.Graphics();
		graphics.beginFill(0x131126);
		graphics.drawRect(455*i,0,435,250);
		graphics.endFill();
		app.stage.addChild(graphics);

		var process = new PIXI.Graphics();
		process.beginFill(ops.color);
		process.drawRect(40+i*455,192,358,8);
		process.endFill();
		app.stage.addChild(process);

		var descText = new PIXI.Text(ops.desc,{fontFamily:'Microsoft YaHei',fontSize:20,fill:ops.color});
		descText.x = 176+i*455;
		descText.y = 136;
		app.stage.addChild(descText);

		var dataNum = new PIXI.Text(0,{fontFamily:'Microsoft YaHei',fontSize:50,fill:'#fff'});
		dataNum.x = 176+i*455;
		dataNum.y = 60;
		app.stage.addChild(dataNum);

		var unitText = new PIXI.Text(ops.unit,{fontFamily:'Microsoft YaHei',fontSize:25,fill:'#fff'});
		unitText.x = 176+i*455+dataNum.width;
		unitText.y = 80;
		app.stage.addChild(unitText);

		NumberGrow(dataNum,unitText,{
			time:1,
			num:ops.data,
			index:i
		});
	}

	function NumberGrow(text,unitText,options) {
	    options = options || {};
	 
	    var time = options.time,
	        num = options.num,
	        step = num * 16 / (time * 1000),
	        start = 0,
	        interval,
	        old = 0,
	        isFloat = !(options.num - parseInt(options.num)==0);
	 
	    var interval = setInterval(function () {
	        start = start + step;
	        if (start >= num) {
	            clearInterval(interval);
	            interval = undefined;
	            start = num;
	        }
	 
	        var t = isFloat?start:Math.floor(start);

	        if (t == old) {
	            return;
	        }
	 
	        old = t;

	        text.text = old;
	        unitText.x = 176+options.index*455+text.width;
	    }, 16);
	}
}

function chartBottom(data){
	var $chart = $('.chart-bottom');
	var app = new PIXI.Application($chart.width(),$chart.height(),{backgroundColor:0x131126});
	$(app.view).appendTo($chart);

	var maskRect = [];

	var bg = new PIXI.Graphics();
	bg.beginFill(0x131126);
	bg.drawRect(0,0,$chart.width(),$chart.height());
	bg.interactive = true;
	bg.on('pointertap',function(){
		mask.alpha = 0;
		for(var i=0;i<maskRect.length;i++){
			maskRect[i].alpha = 0;
		}
	});
	app.stage.addChild(bg);

	for(var i=0;i<7;i++){
		drawList(i,data[i]);
	}

	var mask = new PIXI.Graphics();
	mask.beginFill(0x2b2a3c);
	mask.drawRect(40,0,235,625);
	mask.alpha = 0;
	app.stage.addChild(mask);

	for(var i = 0;i<7;i++){
		drawMaskProcess(i);
	}

	for(var i=0;i<7;i++){
		drawContent(i,data[i]);
	}
	var start = 0;
	var step = 0;
	function drawList(i,ops){

		var graphics = new PIXI.Graphics();
		
		graphics.interactive = true;
		graphics.beginFill(0x1f1e30);
		graphics.drawRect(40+i*247,42,235,535);
		graphics.endFill();

		(function(i){
			graphics.on('pointertap',function(e){
				mask.alpha = 1;
				if(i==start){
					maskRect[start].alpha = 1;
				}else{
					maskRect[start].alpha = 0;
				}
				
				step = 247*start;
				clearInterval(timer);
				var timer = setInterval(function(){
					
					if(i<start){
						step-=8;
						if(step<=i*247){
							start = i;
							mask.x = i*247;
							maskRect[i].alpha = 1;
							clearInterval(timer)
						}
					}

					if(i>=start){
						if(start!=i){
							step+=8;
						}
						
						if(step>=i*247){
							start = i;
							maskRect[i].alpha = 1;
							clearInterval(timer)
						}
					}
					
					mask.x = step;

				},1);

				
			});
		})(i);

		app.stage.addChild(graphics);

	}

	function drawMaskProcess(i){
		var graphics = new PIXI.Graphics();
		graphics.beginFill(data[i].color,1);
		graphics.drawRect(40+247*i,619,235,6);
		graphics.endFill();
		graphics.alpha = 0;
		app.stage.addChild(graphics);
		maskRect.push(graphics);
	}

	function drawContent(i,ops){

		var graphics = new PIXI.Graphics();
		graphics.beginFill(ops.color);
		graphics.drawRect(58+i*247,55,5,28);
		graphics.endFill();
		app.stage.addChild(graphics);

		var title = new PIXI.Text(ops.title,{fontFamily:'Microsoft YaHei',fill:'#fff',fontSize:20});
		title.x = 73+i*247;
		title.y = 55;
		app.stage.addChild(title);

		var xIndex  = i;
		for(var i=0;i<ops.types.length;i++){
			drawData(i,xIndex,ops.types[i].name,ops.types[i].data,ops.color);
		}
	}
	function drawData(i,index,title,num,color){
		var text = new PIXI.Text(title,{fontFamily:'Microsoft YaHei',fill:color,fontSize:18});
		text.x = 65+index*247;
		text.y = 133+i*163;
		app.stage.addChild(text);

		var num = new PIXI.Text(num,{fontFamily:'Microsoft YaHei',fill:'#fff',fontSize:36});
		num.x = 65+index*247;
		num.y = 173+i*163;
		app.stage.addChild(num);

		var unit = new PIXI.Text('次',{fontFamily:'Microsoft YaHei',fill:'#fff',fontSize:20});
		unit.x = 70+num.width+index*247;
		unit.y = 185+i*163;
		app.stage.addChild(unit);
	}
}