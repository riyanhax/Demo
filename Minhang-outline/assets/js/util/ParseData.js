App.ParseData = function()
{
	const low = require('lowdb');
	const FileSync = require('lowdb/adapters/FileSync')

	//加载机场所有信息
	this.loadAirport = function()
	{
		var airportList = [];
		var airport = require(__dirname+'/assets/database/airport.json');
		var data = airport.data;
		for(var i = 0; i < data.length; i++)
		{
			airportList.push(data[i]);
		}
		App.Preload.assets.airport = airportList;
		airportList = [];

	}

	//加载天气信息
	this.loadWeather = function()
	{
		var weatherList = [];
		var weather = require(__dirname+'/assets/database/weather.json');
		var data = weather.data;
		for(var i = 1; i < data.length; i++)
		{
			weatherList.push(data[i]);
		}
		App.Preload.assets.weather = weatherList;
		weatherList = [];
	}

	//加载机场运行状态信息

	this.loadFacility = function(){
		var airportdynamic = require(__dirname+'/assets/database/facility.json');
		var data = airportdynamic.data;
		var arr = [];
		for(var i=0;i<data.length;i++){
			if(data[i].facilityType !== 'DME'){
				var json = {};
				json.type = data[i].facilityType;
				json.lat = time2degree(data[i].LATITUDE);
				json.lon = time2degree(data[i].LONGITUDE);
				json.state = data[i].STATE;
				json.dataid = data[i].dataId;
				arr.push(json);
			}

		}
		App.Preload.assets.facility = arr;
	}

	//度分秒转度
	function time2degree(str){
		str = str.substr(1);
		var degrees = str.split(',');
		return +degrees[0]+degrees[1]/60+degrees[2]/3600;
	}

//加载值班人员信息
this.loadOndutyPeople = function(){
	var ondutypeople = require(__dirname+'/assets/database/ondutypeople.json');
	App.Preload.assets.ondutypeople = ondutypeople.data;
}

//加载扇区区域数据
this.loadSectorArea = function(){
	var res = require(__dirname+'/assets/database/section.json');
	var data = res.data;
	var arr = [];
	for(var i=0;i<data.length;i++){
		var geo = JSON.parse(data[i].geographic);
		var degrees = parseGeoGraphic(geo,data[i].heightLevel);
		arr.push({
			degrees:degrees,
			rgba:'107,217,240,80',//84,255,152,80
			heightLevel:data[i].heightLevel,
			sectorname:data[i].enName,
			name:data[i].cnName
		})
	}
	App.Preload.assets.sectorareaes = arr;
}
//加载扇区区域延迟数据
this.loadDelaySectorArea = function(){
	var adapter = new FileSync(__dirname+'/assets/database/airportDelay.json')
	var db = low(adapter)
	var data = db.get('data')
	  .filter({type:"SECTOR"})
	  .value();	
	var delayarr = [];
	for(var i=0;i<data.length;i++){
		delayarr.push({
			avgdelaytime:data[i].avgDelayTime,
			identifier:data[i].identifier,
			type:data[i].type
		})
	}
	App.Preload.assets.delaysectorareaes = delayarr;
}

//加载航路数据
this.loadRoutes = function(){
	var res = require(__dirname+'/assets/database/airroutes.json')
	var data={routedata:[],pointdata:null};
	var pointdata=res.data.pointData,
		routedata=res.data.routeData,
		rpdata=res.data.rpData;
	if(routedata){
		for(var i=0;i<routedata.length;i++){
			var routeinfo={
				routeid:routedata[i].id,
				routetype:routedata[i].routeType,
				idlist:getidlist(routedata[i].id,rpdata)
			};
			data.routedata.push(routeinfo);
		}
	}
	data.pointdata=pointdata;
	App.Preload.assets.routes = data;
}
//获取航路列表
function getidlist(id,data){
	var list=[];
	for(var i=0;i<data.length;i++){
		if(id==data[i].routeId){
			list.push(data[i]);
		}
	}
	list.sort(function(a,b){return parseInt(a.sequence)-parseInt(b.sequence)});
	return list;
}
//获取航路界面信息
this.loadrouteinfo = function(){
	var res = require(__dirname+'/assets/database/routestaticdata.json');
	App.Preload.assets.routeinfo = res.data[0];
}

//加载航路延误数据
this.loadDelayRoutes = function(){
	var adapter = new FileSync(__dirname+'/assets/database/airportDelay.json')
	var db = low(adapter)
	var data = db.get('data')
	  .filter({type:"ROUTE"})
	  .value();
	var arr=[];
	for(var i=0;i<data.length;i++){
		arr.push({
			avgdelaytime:data[i].avgDelayTime,
			identifier:data[i].identifier,
			type:data[i].type
		})
	}

	App.Preload.assets.delayroutes = arr;	

}

//管制区域数据转换
function parseGeoGraphic(data,flag){
	var geo = [];
	var newArr = [];
	if(flag=='high'){var height=200000.0;}else if(flag=='low'){var height=150000.0;}
	for(var i=0;i<data.length;i++){
		geo = geo.concat(data[i]);
	}
	for(var i=0;i<geo.length;i++){
		var splitArr = geo[i].split(',');
		splitArr = splitArr.reverse();
		for(var j=0;j<splitArr.length;j++){
			var deg = Math.floor(splitArr[j]/10000);
			var end = splitArr[j].substr(-4);
			var min = +end.substr(0,2);
			var sec = +end.substr(-2);
			splitArr[j] = deg+min/60+sec/3600;
		}
		newArr = newArr.concat(splitArr)
//		newArr = newArr.concat(height)
	}
//	console.log(newArr)
	return newArr;
}

//加载机场界面信息
this.loadAirportinfo = function(){
	var res = require(__dirname+'/assets/database/airportdynamic.json');
	var data = res.data;
	var arr=[];
	for(var i=0;i<data.length;i++){
		if(data[i].apName=='ALL'){
			var countstasticsresult = JSON.parse(data[i].countStasticsResult);
			arr.push({
				scheduleFlightsCount:countstasticsresult.scheduleFlightsCount,//全国计划飞行班次
				nnsFlightsCount:countstasticsresult.nnsFlightsCount,//国内航空公司国内航班计划起降总数
				nfsFlightsCount:countstasticsresult.nfsFlightsCount,//国内航空公司国际航班计划起降总数
				fasFlightsCount:countstasticsresult.fasFlightsCount,//国外航空公司国内计划落地航班总数
				fosFlightsCount:countstasticsresult.fosFlightsCount,//国外航空公司计划飞越航班总数
				specialFlightsCount:countstasticsresult.specialFlightsCount,//专机计划班次
				vipFlightsCount:countstasticsresult.vipFlightsCount,//要客计划班次
				executeDepFlihgtsCount:countstasticsresult.executeDepFlihgtsCount,//离港计划已执行*****
				executeArrFlihgtsCount:countstasticsresult.executeArrFlihgtsCount,//到港计划已执行*****
				cld120FlightsCount:countstasticsresult.cld120FlightsCount,//关舱门后等待班次（2小时以上）
				cld60FlightsCount:countstasticsresult.cld60FlightsCount,
				cld30FlightsCount:countstasticsresult.cld30FlightsCount,
				delayFlightsCount:countstasticsresult.delayFlightsCount,//起飞延误班次
				scheduleOnTimeRate:Math.round(countstasticsresult.scheduleOnTimeRate*100)+'%',//计划航班正常率*****
				delayAvgTime:countstasticsresult.delayAvgTime,//平均航班延误时间
			});
			break;
		}
	}
	App.Preload.assets.airportinfo = arr;
}

//根据机场名称获得该机场的运行正常率
this.getStaMasterLevel = function(apName)
{
	var adapter = new FileSync(__dirname+'/assets/database/airportdynamic.json')
	var db = low(adapter)
	var data = db.get('data')
	  .find({ apName:apName })
	  .value();	
	var rate = 0;
	var level = 1;
	if(data){
		var countStasticsResult = JSON.parse(data.countStasticsResult);
		rate = parseFloat(countStasticsResult.scheduleOnTimeRate).toFixed(3);
		if(rate < 0.25)
		{
			level = 4;
		}else if(rate < 0.5)
		{
			level = 3;
		}else if(rate < 0.75)
		{
			level = 2;
		}
	}

	return level;
}

	//获得机场的天气情况
	this.getWeather = function(apName)
	{
		var len = App.Preload.assets.weather.length;

		var status = undefined;
		for(var i = 0; i < len; i++)
		{
			var name = App.Preload.assets.weather[i].apName;
			if(apName == name)
			{
				status = App.Preload.assets.weather[i].weatherStatus;
				break;
			}
		}
		return status;
	}

	//获取机场运行状态信息
	this.getFacility = function(apName){

	}

}

App.lonLatToPixel=function(lng,lat)
{
	var cartographic = Cesium.Cartographic.fromDegrees(lng,lat);
	console.log(cartographic)
	var cartesian = App.viewer.scene.globe.ellipsoid.cartographicToCartesian(cartographic);
    var pos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(App.viewer.scene, cartesian);
    return [pos.x, pos.y];
}
