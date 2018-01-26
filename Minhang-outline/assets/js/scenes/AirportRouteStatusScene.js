App.AirportRouteStatusScene = function(){
  var body = $("#uiContainer");
  var controlInfo = $('<div></div>');
  controlInfo.addClass('routeInfo');
  var oSpan = $('<span></span>');
  oSpan.html('全国航路航线数量');
  oSpan.css({
    'width':'280px',
    'display':'inline-block',
  });
  var routeInfo = App.Preload.assets.routeinfo;
  var oNum = $('<span>'+routeInfo.sumCount+'</span>');
  oNum.addClass('infoNum-sumcount');
  oSpan.appendTo(controlInfo);
  oNum.appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  var oSpan = $('<span></span>');
  oSpan.html('全国航路航线里程(公里)');
  oSpan.css({
    'width':'280px',
    'display':'inline-block'
  });
  var oNum = $('<span>'+routeInfo.sumDistance+'</span>');
  oNum.addClass('infoNum-sumdistance');
  oSpan.appendTo(controlInfo);
  oNum.appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  $('<br />').appendTo(controlInfo);
  var oSpan = $('<span></span>');
  oSpan.html('百公里大于十架总航段数量');
  oSpan.css({
    'width':'280px',
    'display':'inline-block'
  });
  var oNum = $('<span>'+routeInfo.routeCount+'</span>');
  oNum.addClass('infoNum-routecount');
  oSpan.appendTo(controlInfo);
  oNum.appendTo(controlInfo);
  controlInfo.appendTo(body);


	var controlpanel = $('<div></div>');
	controlpanel.addClass('routecontrol');//oper_unselected.png		oper_selected.png
	controlpanel.css({
		'position':'absolute',
	'right':'80px',
	'top':'60%',
	'background-image':'url(assets/img/routeontrol.png)',
	'background-repeat':'no-repeat',
	'width': '190px',
	'height': '203px',
	'display':'none'
	});
	var outroute = $('<span></span>');
	outroute.addClass('selected');
	var innerroute = $('<span></span>');
	innerroute.addClass('selected');

	outroute.css({'background':'url(assets/img/oper_selected.png) no-repeat',
								'width':'23px','height':'23px','position':'absolute','left':'2%','top':'0'});
	innerroute.css({'background':'url(assets/img/oper_selected.png) no-repeat',
								'width':'23px','height':'23px','position':'absolute','left':'2%','top':'15%'});
	outroute.appendTo(controlpanel);
	innerroute.appendTo(controlpanel);
	controlpanel.appendTo(body);
	outroute.on("click",function (e) {
		outroute.toggleClass('selected');
		if(outroute.attr('class')=='selected'){
			outroute.css({'background':'url(assets/img/oper_selected.png) no-repeat'});
			controlroutestatus('international',true);
		}else{
			outroute.css({'background':'url(assets/img/oper_unselected.png) no-repeat'});
			controlroutestatus('international',false);
		}
  });
	innerroute.on("click",function (e) {
		innerroute.toggleClass('selected');
		if(innerroute.attr('class')=='selected'){
			innerroute.css({'background':'url(assets/img/oper_selected.png) no-repeat'});
			controlroutestatus('inland',true);
		}else{
			innerroute.css({'background':'url(assets/img/oper_unselected.png) no-repeat'});
			controlroutestatus('inland',false);
		}
  });
  this.timeIndex = null;
  this.flag = true;
  this.show = function(){

    $('.routeInfo').show();
    $('.routecontrol').show();
    if(this.flag){
      showAirrouteStatusScene();
      
      this.flag = false;
    }

  }

  this.hide = function(){
    clearInterval(this.timeIndex)
    $('.routeInfo').hide();
    $('.routecontrol').hide();
    deleteAirrouteStatusScene();
    this.flag = true;
  }

}

function showAirrouteStatusScene(){
  var logo = $(".topLogo").eq(0);
	logo.css("background-image","url(assets/img/rotuteStatusLogo.png)");

  var routeData = App.Preload.assets.routes;
  var delayrouteData = App.Preload.assets.delayroutes;
  var routes = routeData.routedata;
	var test = [];
  for(var i=0;i<routes.length;i++){
  	var pointList = getpointlist(routes[i].idlist,routeData.pointdata);
      createRoute(pointList,delayrouteData,routes[i].idlist,routes[i].routetype);
	}
}
//获取航路名称列表
function getpointlist(list,data){
	var plist=[];
	for(var i=0;i<list.length;i++){
		for(var j=0;j<data.length;j++){
			if(list[i].pointId==data[j].id){
				plist.push(data[j].pointIdentifier);
				break;
			}
		}
	}
	return plist;
}
function deleteAirrouteStatusScene(){
  var entities = App.viewer.entities.values;
  var list = [];
  for(var i = 0; i < entities.length; i++)
  {
    var id = entities[i].id;
    list.push(id);
  }
  for(var i = 0; i < list.length; i++)
  {
    var entity = App.viewer.entities.getById(list[i]);
    App.viewer.entities.remove(entity);
  }
  list = [];
}

function createRoute(arr,arrdata,idlist,type){
  var position = [],rgba='107,217,240,80';
	var routepointname;
  var routeData = App.Preload.assets.routes;
  var flag=false;
  for(var i=0;i<arr.length;i++){
  	flag=false;
    var tmp = getcord(routeData.pointdata,idlist[i]);
    if(i<arr.length-1){
      var tmp1 = getcord(routeData.pointdata,idlist[i+1]);
    	routepointname=arr[i]+"-"+arr[i+1];
    	for(var j=0;j<arrdata.length;j++){
    		if(routepointname==arrdata[j].identifier){

    			position=[];
    			if(parseInt(arrdata[j].avgdelaytime)>30&&parseInt(arrdata[j].avgdelaytime)<=60){//15<x<=30 绿色  30<x<=45黄色  x>45红色
						rgba='255,225,45,100';
  				}else if(parseInt(arrdata[j].avgdelaytime)>60&&parseInt(arrdata[j].avgdelaytime)<=120){
						rgba='255,186,78,100';
  				}else if(parseInt(arrdata[j].avgdelaytime)>120){
						rgba='250,66,66,100';
  				}else{rgba='84,255,152,100';}

    			if(tmp[1]&&tmp1[1]){
    				position.push(paseLatLon(tmp[1]));
    				position.push(paseLatLon(tmp[0]));
    				position.push(paseLatLon(tmp1[1]));
    				position.push(paseLatLon(tmp1[0]));
  					drawRoute(position,rgba,type);
  					//drawPoint(position,type);
    			}
    			flag=true;
    			break;
    		}
    	}
    }
    if(flag){continue;}
    position.push(paseLatLon(tmp[1]));
    position.push(paseLatLon(tmp[0]));
  	rgba='84,255,152,100';
  }
  drawRoute(position,rgba,type);
  //drawPoint(position,type);
}
//获取航点经纬度
function getcord(data,id){
	var arr=[];
	for(var i=0;i<data.length;i++){
		if(id.pointId==data[i].id){
			arr=[data[i].lat,data[i].lon];
			break;
		}
	}
	return arr;
}
function paseLatLon(num){
	var deg = Math.floor(num/10000);
	var end = num.substr(-4);
	var min = +end.substr(0,2);
	var sec = +end.substr(-2);
	return deg+min/60+sec/3600;
}

function drawRoute(pos,color,txt){
  var colors = color.split(',');
  App.viewer.entities.add({
    name : 'routes-'+txt,
      polyline: {
        positions : Cesium.Cartesian3.fromDegreesArray(pos),
        width : 2,
        material : Cesium.Color.fromBytes(colors[0],colors[1],colors[2],100),
        show:true
    }
  });
}

function controlroutestatus(flag,show){
	var entities = App.viewer.entities.values;
		for(var i = 0; i < entities.length; i++){
			var name = entities[i].name;
			if(name == 'routes-'+flag&&show){
				var id = entities[i].id;
				App.viewer.entities.getById(entities[i].id).polyline.show = true;
			}else if(name == 'routes-'+flag&&!show){
				var id = entities[i].id;
				App.viewer.entities.getById(entities[i].id).polyline.show = false;
			}
			if(name == 'Point-'+flag&&show){
				var id = entities[i].id;
				App.viewer.entities.getById(entities[i].id).point.show = true;
			}else if(name == 'Point-'+flag&&!show){
				var id = entities[i].id;
				App.viewer.entities.getById(entities[i].id).point.show = false;
			}
	}
}

function computeCircle(radius) {
    var positions = [];
    for (var i = 0; i < 360; i++) {
        var radians = Cesium.Math.toRadians(i);
        positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
    }
    return positions;
}
function drawPoint(pos,txt){
	for(var i=0;i<pos.length;i+=2){
		App.viewer.entities.add({
		name:'Point-'+txt,
		position : Cesium.Cartesian3.fromDegrees(pos[i], pos[i+1]),
		point:{
    	pixelSize: 2,
    	show:true,
    	color: Cesium.Color.fromBytes(107,217,240,100)
		}
	});
	}

}
