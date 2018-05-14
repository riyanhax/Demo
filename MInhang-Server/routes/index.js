var router = require('koa-router')();
var wrapper = require('co-mysql');
var mysql = require('mysql');
var staticData = require('./requestdata.js').staticdata;
var config = require('../config/mysql_config');
var connection = mysql.createConnection({
  host: config.IP,
  user: config.USER,
  password: config.PASSWORD,
  port: config.PORT,
  database: 'minhang'
});

Array.prototype.unique = function(){
 var res = [];
 var json = {};
 for(var i = 0; i < this.length; i++){
  if(json[this[i].apName] !== 1){
   res.push(this[i]);
   json[this[i].apName] = 1;
  }
 }
 return res;
}

//获取机场动态数据
router.get('/get_airportdynamic', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  var list = queryCondition(query);
  var conditions = list.conditions;
  var condition = list.condition;

  if (conditions.length) {
    condition = condition.substr(0, condition.length - 4);
    response.data = yield p.query('SELECT * FROM `t_airportdynamic` WHERE ' + condition, conditions);
  } else {
    response.data = yield p.query('SELECT * FROM `t_airportdynamic`');
  }
  response.data.toString();
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.get('/get_airportdynamic_less',function*(next){
  var p = wrapper(connection);
  var response = {
    code:200,
    data:''
  }
  var query = this.request.query;
  if(query.apName){
    response.data = yield p.query('SELECT SDepFlights,RDepFlights,SArrFlights,RArrFlights,countStasticsResult,currencyStasticsResult,depDelayFlights FROM `t_airportdynamic` WHERE apName = ?',[query.apName]);
  }else{
    response.data = yield p.query('SELECT SDepFlights,RDepFlights,SArrFlights,RArrFlights,countStasticsResult,currencyStasticsResult,depDelayFlights FROM `t_airportdynamic`');
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);
})

//获取天气
router.get('/get_weather', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  var list = queryCondition(query);
  var conditions = list.conditions;
  var condition = list.condition;

  if (conditions.length) {
    condition = condition.substr(0, condition.length - 4);
    response.data = yield p.query('SELECT * FROM `t_weather` WHERE ' + condition, conditions);
  } else {
    response.data = yield p.query('SELECT * FROM `t_weather`');
  }
  response.data.toString();
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});


//获取正常率2
router.get('/get_regularrate', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  var list = queryCondition(query);
  var conditions = list.conditions;
  var condition = list.condition;

  if (conditions.length) {
    condition = condition.substr(0, condition.length - 4);
    response.data = yield p.query('SELECT * FROM `t_regularrate` WHERE ' + condition, conditions);
  } else {
    response.data = yield p.query('SELECT * FROM `t_regularrate`');

  }
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

//获取所有机场信息
router.get('/get_airport', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  if(query.search){
    response.data = [];
    if(/\s+/.test(query.search)){
      var search = query.search.split(/\s+/);
      for(var i=0;i<search.length;i++){
        var data;
        if(/[\u4e00-\u9fa5]/.test(search[i])){
          data = yield p.query('SELECT * FROM `t_airport` WHERE airportName LIKE "%"?"%"' , search[i]);
        }else{
          data = yield p.query('SELECT * FROM `t_airport` WHERE apName LIKE "%"?"%"' , search[i]);
        }
        response.data = response.data.concat(data);
      }
      response.data = response.data.unique();
    }else{
      var data;
      if(/[\u4e00-\u9fa5]/.test(query.search)){
        data = yield p.query('SELECT * FROM `t_airport` WHERE airportName LIKE "%"?"%"' , query.search);
      }else{
        data = yield p.query('SELECT * FROM `t_airport` WHERE apName LIKE "%" ? "%"' , query.search);
      }
      response.data = response.data.concat(data);
    }

  }else{
    var list = queryCondition(query);
    var conditions = list.conditions;
    var condition = list.condition;

    if (conditions.length) {
      condition = condition.substr(0, condition.length - 4);

      if(query.timestamp){
        response.data = yield p.query('SELECT * FROM `t_airport_sesson` WHERE timestamp = ?', query.timestamp);
      }else{
        response.data = yield p.query('SELECT * FROM `t_airport` WHERE ' + condition, conditions);
      }


    } else {
      response.data = yield p.query('SELECT * FROM `t_airport`');
    }
  }

  response.data.toString();
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

//获取机场设备信息
router.get('/get_facility', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  var list = queryCondition(query);
  var conditions = list.conditions;
  var condition = list.condition;
  if (conditions.length) {
    condition = condition.substr(0, condition.length - 4);
    response.data = yield p.query('SELECT * FROM `t_facility` WHERE ' + condition, conditions);
  } else {
    response.data = yield p.query('SELECT * FROM `t_facility`');
  }

  response.data.toString();
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

//获取管制区域信息
router.get('/get_controlarea', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var query = this.request.query;
  var list = queryCondition(query);
  var conditions = list.conditions;
  var condition = list.condition;
  if (conditions.length) {
    condition = condition.substr(0, condition.length - 4);
    response.data = yield p.query('SELECT * FROM `t_ctrlarea` WHERE ' + condition, conditions);
  } else {
    response.data = yield p.query('SELECT * FROM `t_ctrlarea`');
  }

  response.data.toString();
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

function queryCondition(query) {
  var condition = '';
  var conditions = [];
  for (var key in query) {
    var str = key + ' LIKE "%"?"%" AND ';
    condition += str;
    conditions.push(query[key])
  }
  return {
    condition: condition,
    conditions: conditions
  }
}

//获取航路信息
router.get('/get_airroutes', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  var pointData = yield p.query('SELECT id,lat,lon,pointIdentifier FROM `t_airroute_pointdata`');
  var rpData = yield p.query('SELECT pointId,routeId,sequence FROM `t_airroute_rpdata`');
  var routeData = yield p.query('SELECT id,routeType FROM `t_airroute_routedata`');
  var total = [];
  var index = -1;
  for(var i=0;i<rpData.length;i++){
    if(rpData[i].sequence == 0){
      index++;
      total[index] = [];
    }
    total[index].push(rpData[i])
  }
  var data = {
    rpData: rpData,
    routeData: routeData,
    pointData: pointData,
    total:total
  };
  response.data = data;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

//获取航段数量信息
router.get('/get_routestaticdata', function*(next) {
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  response.data = yield p.query('SELECT * FROM `t_nationwideroutestaticdata`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

//获取值班人员信息
router.get('/get_ondutypeople',function*(next){
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  response.data = yield p.query('SELECT * FROM `t_onduty`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
})

//获取欢迎词
router.get('/get_welcomewords',function*(next){
  var p = wrapper(connection);
  var response = {
    code: 200,
    data: ''
  };
  response.data = yield p.query('SELECT * FROM `t_words`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

//存储欢迎词
router.post('/save_welcomewords',function*(next){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {
    code: 0,
    data: ''
  };
  yield p.query('DELETE FROM `t_words`');
  yield p.query('INSERT INTO `t_words` SET style = ?,content = ?',[data.style,data.content]);
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

//获取航班等延误信息
router.get('/get_airportDelay',function*(next){
  var query = this.request.query;
  var p = wrapper(connection);
  var response = {
    code:200,
    data:''
  };
  if(query.type){
    var str = query.type.toUpperCase();
    response.data = yield p.query('SELECT * FROM `t_delay` WHERE `type` = ?',[str]);
  }else{
    response.data = yield p.query('SELECT * FROM `t_delay`');
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response)

})

//获取航路航班信息
router.get('/get_airrouteInfo',function*(next){
  var p = wrapper(connection);
  var response = {
    code:200,
    data:''
  };
  response.data = yield p.query('SELECT * FROM `t_nationwideroutestaticdata`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response)

})

//获取扇区信息
router.get('/get_section',function*(next){
  var p = wrapper(connection);
  var response = {
    code:200,
    data:''
  };
  response.data = yield p.query('SELECT * FROM `t_section`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response)
})

//获取扇区查询信息
router.get('/get_sectionsearch',function*(next){
  var p = wrapper(connection);
  var json = {
    high:{},
    low:{}
  };
  var response = {
    code:200,
    data:''
  };
  var data = yield p.query('SELECT * FROM `t_section`');
  for(var i=0;i<data.length;i++){
    var key = data[i].cnName.split(/\d+/)[0];
    //var cnKey = data[i].cnName.match(/\d+/)[0];
    var city = {};
    city[data[i].cnName] = data[i].enName;
    if(data[i].heightLevel == 'high'){
      if(json.high[key]){
        json.high[key].push(city);
      }else{
        json.high[key] = [];
        json.high[key].push(city);
      }
    }else{
      if(json.low[key]){
        json.low[key].push(city);
      }else{
        json.low[key] = [];
        json.low[key].push(city);
      }
    }
  }
  json.high = json2arr(json.high);
  json.low = json2arr(json.low)

  response.data = json;
  this.response.status = 200;
  this.response.body = JSON.stringify(response)
})

router.get('/get-sectionsave',function*(next){
  var p = wrapper(connection);
  var response = {
    code:200,
    data:{}
  };
  response.data = yield p.query('SELECT * FROM `t_section_save`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response)
})

router.get('/get-matrix',function*(next){
  var p = wrapper(connection);
  var response = {
    code:200,
    data:{}
  };
  response.data = yield p.query('SELECT * FROM `t_matrix`');
  this.response.status = 200;
  this.response.body = JSON.stringify(response)
});

router.post('/get-matrix',function*(next){
  var p = wrapper(connection);
  var data = this.request.body;
  var response = {
    code:200,
    data:{}
  };
  yield p.query('DELETE FROM `t_matrix`');
  yield p.query('INSERT INTO `t_matrix` SET type=?,matrix=?,output=?',['M9ZZ',data.m9zz.matrix,data.m9zz.output]);
  yield p.query('INSERT INTO `t_matrix` SET type=?,matrix=?,output=?',['M3ZZ',data.m3zz.matrix,data.m3zz.output]);
  this.response.status = 200;
  this.response.body = JSON.stringify(response)
})

function json2arr(json){
  var arr = [];
  for(var key in json){
    var sections = json[key];
    for(var i=0;i<sections.length;i++){
      for(var section in sections[i]){
        sections[i].name = section;
        sections[i].value = sections[i][section];
        delete sections[i][section];
      }
    }
    arr.push({
      name:key,
      value:json[key]
    })
  }

  return arr;
}

// 更新静态数据的接口
router.post('/update-static-data',function*(next){
    var data = this.request.body;
    switch(data.type){
      case 'airport':
        staticData.saveairport();
        break;
      case 'airroute':
        staticData.saveairroute();
        break;
      case 'section':
        staticData.savesection();
        break;
      case 'regular':
        staticData.saveregular(data.begin,data.end)
        break;
    }

  this.response.status = 200;
  this.response.body = JSON.stringify({
    code:200,
    success:''
  })
})

module.exports = router;
