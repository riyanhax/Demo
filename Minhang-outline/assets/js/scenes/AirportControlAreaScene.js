App.AirportControlAreaScene = function(){
  const low = require('lowdb');
  const FileSync = require('lowdb/adapters/FileSync')  
  var selectAreaType = 'controlarea_height',
      selectAreas,
      defaultSection = {
        controlarea_height:[],
        controlarea_low:[]
      };
  /**
	 * switch scene button
	 */
  var body = $("#uiContainer");
	var scene = $('<div></div>');
	scene.addClass('airportSwitchControl');
  scene.css('top','590px');
	var osBt = $('<div></div>');
	osBt.addClass('operationControl');
	var miBt = $('<div></div>');
	miBt.addClass('meteorologicalControl');

	osBt.click(function(){
    controlAreaStatus('high');
    showControlAreaBtn('high');
	});

	miBt.click(function(){
		controlAreaStatus('low');
    showControlAreaBtn('low');
	});

	osBt.appendTo(scene);
	miBt.appendTo(scene);
	scene.appendTo(body);


  var rightlegend = $('<div></div>');
  rightlegend.css({
    'width':'156px',
  	'height':'278px',
  	'marginLeft': 'calc(100% - 250px)',
    'position':'absolute',
    'top':'690px',
    'background':'url(assets/img/controlAreaDesc.png) top left no-repeat'
  });
  rightlegend.addClass('airportSwitchControl');
  rightlegend.appendTo(body);

  this.timeIndex = null;
  this.flag = true;
  this.show = function(){
    $('.airportSwitchControl').show();
    $('.controlInfo').show();
    if(this.flag){
      initControlArea();
      controlAreaStatus('high');
      this.flag = false;
    }

  }
  window.sectionAndAirportShow = function(type){
    deleteControlSceneArea();
    initControlArea2();
    controlAreaStatus(type);
  }
  this.hide = function(){
    clearInterval(this.timeIndex)
    $('.airportSwitchControl').hide();
    $('.controlInfo').hide();
    deleteControlSceneArea();
    this.flag = true;
  }
  window.sectionHide = function(){
    deleteControlSceneArea();
  }

  //获取默认钩选的山区
  function getDefaultSection(){
    var adapter = new FileSync(__dirname+'/assets/database/sectionsave.json')
    var db = low(adapter)
    var data = db.get('data').value();
    for(var i=0;i<data.length;i++){
        defaultSection[data[i].type].push(data[i].name)
    }
  }

  //init Control Area Data
  function initControlArea(){
    getDefaultSection();
    var logo = $(".topLogo").eq(0);
  	logo.css("background-image","url(assets/img/controlAreaLogo.png)");

    var areaes = App.Preload.assets.sectorareaes;
    var delayareas= App.Preload.assets.delaysectorareaes;
    for(var i=0;i<areaes.length;i++){

        createSectorPolygon(areaes[i],delayareas)
    }

    if(selectAreaType == 'controlarea_height'){
      showControlAreaBtn('high');
    }else{
      showControlAreaBtn('low');
    }

  }

  function initControlArea2(){
    getDefaultSection();
    var areaes = App.Preload.assets.sectorareaes;
    var delayareas= App.Preload.assets.delaysectorareaes;
    for(var i=0;i<areaes.length;i++){

        createSectorPolygon(areaes[i],delayareas)
    }
  }

  function showControlAreaBtn(flag){

    var osBt = $(".operationControl").eq(0);
    var miBt = $(".meteorologicalControl").eq(0);
    if(flag == 'high'){
  		osBt.css("background-image","url(assets/img/highAirBtn_on.png)");
  		miBt.css("background-image","url(assets/img/lowAirBtn_off.png)");
    }else{
      osBt.css("background-image","url(assets/img/highAirBtn_off.png)");
  		miBt.css("background-image","url(assets/img/lowAirBtn_on.png)");
    }
  }

   //创建扇区区域
  function createSectorPolygon(data,delaydata){
  	for(var i=0;i<delaydata.length;i++){
  		if(data.sectorname==delaydata[i].identifier){
  			if(parseInt(delaydata[i].avgdelaytime)>30&&parseInt(delaydata[i].avgdelaytime)<=60){//15<x<=30 绿色  30<x<=45黄色  x>45红色
  				data.rgba='84,255,152,90';
  			}else if(parseInt(delaydata[i].avgdelaytime)>60&&parseInt(delaydata[i].avgdelaytime)<=120){
  				data.rgba='255,250,165,90';
  			}else if(parseInt(delaydata[i].avgdelaytime)>120){
  				data.rgba='251,103,103,90';
  			}else{
          data.rgba='111,232,254,90';
        }
  			break;
  		}
  	}
    var colors = data.rgba.split(',');
    
      App.viewer.entities.add({
        name : 'controlArea-'+data.heightLevel,
        id : data.sectorname,
        polygon : {
          hierarchy : {
            positions : Cesium.Cartesian3.fromDegreesArray (data.degrees)
          },
          material : Cesium.Color.fromBytes(colors[0],colors[1],colors[2],colors[3]),
          height : 0,
          outline : false,
          outlineWidth:0,
          show:false
        }
     });

  }

  //控制扇区单亮或多亮
  function controlsector(data){
    if(data.length>0){
      selectAreas = data;
    }else{
      selectAreas = null;
    }
  	var entities = App.viewer.entities.values;
  	for(var i=0;i<entities.length;i++){
  		var name = entities[i].id;
  		App.viewer.entities.getById(entities[i].id).polygon.show = false;
      if(data.indexOf(name) !== -1){
        App.viewer.entities.getById(entities[i].id).polygon.show = true;
      }
  	}
  }
  //关闭单亮状态，恢复到初始状态
  function closesector(level){

  }

  //控制地图区域显示
  function controlAreaStatus(flag){
    var entities = App.viewer.entities.values;
		var list = [];
		for(var i = 0; i < entities.length; i++)
		{
			var name = entities[i].name;

			if(name == 'controlArea-'+flag)
			{
				var id = entities[i].id;
        if(flag == 'high'){
          if(defaultSection['controlarea_height'].indexOf(id) !== -1){
            list.push(id);
          }
        }else{
          if(defaultSection['controlarea_low'].indexOf(id) !== -1){
            list.push(id);
          }
        }

			}else{
        if(/controlArea/.test(name)){
          App.viewer.entities.getById(entities[i].id).polygon.show = false;
        }
      }

		}
		for(var i = 0; i < list.length; i++)
		{
			var entity = App.viewer.entities.getById(list[i]);

			entity.polygon.show = true;
		}
		list = [];
  }

  //delete airport and meteinfo icon on map
	function deleteControlSceneArea()
	{
		var entities = App.viewer.entities.values;
		var list = [];
		for(var i = 0; i < entities.length; i++)
		{
			var name = entities[i].name;

			if(name == "controlArea-high" || name == "controlArea-low")
			{
				var id = entities[i].id;
				list.push(id);
			}
		}
		for(var i = 0; i < list.length; i++)
		{
			var entity = App.viewer.entities.getById(list[i]);
			App.viewer.entities.remove(entity);
		}
		list = [];
	}

  window.ctrlareashow = function(type,sectors){
    selectAreaType = type;
    if(type == 'controlarea_height'){
      $('.operationControl').trigger('click');
    }else{
      $('.meteorologicalControl').trigger('click');
    }
    if(sectors.length>0){
      controlsector(sectors);
    }else{
      selectAreas = []
    }

  }

}
