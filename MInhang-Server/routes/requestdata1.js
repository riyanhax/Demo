
var router = require('koa-router')();
var anc = require('async');
var db = require('./db');

var request = require('request');

//var DATASERVER = 'http://127.0.0.1:8081'
var DATASERVER = 'http://172.30.8.31:8080'

db.getConnection(function(connection){
  connection.beginTransaction(function(err){
    if(err){
      console.log(err)
      return
    }

    request.post({
      url:
    });
  })
})
//保存正常率
function saveRegularrate(path) {
  var path = '/GeneralMonitor/rest/monitor/regularRateData/'
  var p = wrapper(connection);

  var oDate = new Date();
  var timestamp = oDate.getTime();
  request.post({
    url: DATASERVER + path,
    form: {
      missionDate: getNow(oDate)
    }
  }, function(err, res, body) {
    var geted = true;
    try{
      var data = JSON.parse(res.body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){
      p.query('DELETE FROM `t_regularrate`').then(function() {

        for (var i = 0; i < data.length; i++) {
          var query = formatData(data[i], timestamp);
          p.query('INSERT INTO `t_regularrate` SET ' + query.str, query.arr);
        }
        console.log('数据已更新')
      });
    }

  });
}

//保存机场名字
function saveAirportantdynamic() {
  var path = '/GeneralMonitor/rest/monitor/dynamicData/'
  var p = wrapper(connection);

  var oDate = new Date;
  var timestamp = oDate.getTime();
  request.post({
    url: DATASERVER + path,
    form: {
      missionDate: getNow(oDate),
      apName: 'null'
    }
  }, function(err, httpResponse, body) {
    var geted = true;
    try{
      var arr = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){
      p.query('DELETE FROM `t_airportdynamic`').then(function() {

        for (var key in arr) {
          var query = formatData(arr[key].stasticsResult, timestamp);
          p.query('INSERT INTO `t_airportdynamic` SET ' + query.str, query.arr);
        }
        console.log('数据已更新')
      });
    }

  })
}

//保存机场从控制区域
function saveAirportContrilArea() {
  var p = wrapper(connection);
  var path = '/GeneralMonitor/rest/monitor/accStaticData/';

  var timestamp = new Date().getTime();
  request.post({
    url: DATASERVER + path,
    form: {}
  }, function(err, res, body) {
    var geted = true;
    try{
      var arr = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){
      p.query('DELETE FROM `t_ctrlarea`').then(function() {

        for (var i = 0; i < arr.length; i++) {
          var query = formatData(arr[i], timestamp);
          p.query('INSERT INTO `t_ctrlarea` SET ' + query.str, query.arr);
        }
      });
    }

    console.log('数据已更新')
  });
}

//保存机场天气数据
function saveAirportWeather() {
  var p = wrapper(connection);
  var path = '/GeneralMonitor/rest/monitor/airportWeatherData/'

  var oDate = new Date();
  var timestamp = oDate.getTime();
  request.post({
    url: DATASERVER + path,
    from: {}
  }, function(err, res, body) {
    var geted = true;
    try{
      var json = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){
      p.query('DELETE FROM `t_weather`').then(function() {
        for (var key in json) {
          var query = formatData(json[key], timestamp);
          p.query('INSERT INTO `t_weather` SET ' + query.str, query.arr);
        }
        console.log('数据已更新')
      })
    }

  });
}

//保存扇区的数据
function saveAirportSelection() {
  var path = '/GeneralMonitor/rest/monitor/sectorStaticData/';
  var p = wrapper(connection);


  var timestamp = new Date().getTime();
  request.post({
    url: DATASERVER + path,
    form: {}
  }, function(err, res, body) {
    var geted = true;
    try{
      var arr = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){
      p.query('DELETE FROM `t_section`').then(function() {

        for (var i = 0; i < arr.length; i++) {
          var query = formatData(arr[i], timestamp);
          p.query('INSERT INTO `t_section` SET ' + query.str, query.arr);
        }
        console.log('数据已更新')
      })
    }


  });
}

//保存航路的数据
function saveAirroute() {
  var p = wrapper(connection);
  var path = '/GeneralMonitor/rest/monitor/routeAndPointStaticData/';
  request.post({
    url: DATASERVER + path,
    from: {}
  }, function(err, res, body) {


    var geted = true;
    try{
      var json = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){

      p.query('DELETE FROM `t_nationwideroutestaticdata`').then(function() {
        saveInfo()
        console.log('数据已更新')
      });

      p.query('DELETE FROM `t_airroute_rpdata`').then(function() {
        saveRpData()
        console.log('数据已更新')
      });

      p.query('DELETE FROM `t_airroute_routedata`').then(function() {
        saveRouteData();
        console.log('数据已更新')
      });


      p.query('DELETE FROM `t_airroute_pointdata`').then(function() {
        savePointdata()
        console.log('数据已更新')
      });
    }

    function saveInfo() {
      var timestamp = new Date().getTime();
      var data = json.nationwideRouteStaticData;
      var query = formatData(data, timestamp);
      p.query('INSERT INTO `t_nationwideroutestaticdata` SET ' + query.str, query.arr);
    }

    function saveRpData() {
      var timestamp = new Date().getTime();
      var data = json.rpData;
      for (var i = 0; i < data.length; i++) {
        var query = formatData(data[i], timestamp);
        p.query('INSERT INTO `t_airroute_rpdata` SET ' + query.str, query.arr)
      }
    }

    function saveRouteData() {
      var timestamp = new Date().getTime();
      var data = json.routeData;

      for (var i = 0; i < data.length; i++) {
        var query = formatData(data[i], timestamp);
        p.query('INSERT INTO `t_airroute_routedata` SET ' + query.str, query.arr)
      }
    }

    function savePointdata() {
      var timestamp = new Date().getTime();
      var data = json.pointData;
      for (var i = 0; i < data.length; i++) {
        var query = formatData(data[i], timestamp);
        p.query('INSERT INTO `t_airroute_pointdata` SET ' + query.str, query.arr)
      }
    }
  });
}

//保存值班人员信息
function saveOndutypeople() {
  var oDate = new Date();
  var path = '/GeneralMonitor/rest/monitor/onDutyPerson/'
  var p = wrapper(connection);

  var timestamp = new Date().getTime();
  request.post({
    url: DATASERVER + path,
    form: {
      missionDate: getNow(oDate)
    }
  }, function(err, res, body) {
    var geted = true;
    try{
      var json = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){

      p.query('DELETE FROM `t_onduty`').then(function() {
        var query = formatData(json, timestamp);
        p.query('INSERT INTO `t_onduty` SET ' + query.str, query.arr);
        console.log('数据已更新')
      })
    }
  })
}

//保存扇区、管制区以及航路的延误情况
function saveDelay() {
  var path = '/GeneralMonitor/rest/monitor/delayStatusData'
  var p = wrapper(connection);

  var oDate = new Date();
  var timestamp = oDate.getTime();
  request.post({
    url: DATASERVER + path,
    form: {
      missionDate: getNow(oDate)
    }
  }, function(err, res, body) {
    var geted = true;
    try{
      var json = JSON.parse(body);
    }catch(e){
      console.log('读取数据错误...')
       geted = false;
    }
    if(geted){

      p.query('DELETE FROM `t_delay`').then(function() {

        for (var key in json) {
          var data = json[key];
          for (var d in data) {
            var query = formatData(data[d], timestamp);
            p.query('INSERT INTO `t_delay` SET ' + query.str, query.arr);
          }
        }
        console.log('数据已更新')
      })
    }
  });

}


//格式化数据格存储式
function formatData(data, timestamp) {
  var insertStr = [];
  var insertList = [];

  if (typeof data == 'object') {
    for (var key in data) {
      if (key === 'timeStamp') {
        insertStr.push('timestamp = ?');
        insertList.push(timestamp);
      } else {
        insertStr.push(key + ' = ?');
        if (typeof data[key] == 'object') {
          insertList.push(JSON.stringify(data[key]));
        } else {
          insertList.push(data[key]);
        }
      }

    }
  } else {
    return;
  }

  if (data.timestamp == undefined && data.timeStamp == undefined) {
    insertStr.push('timestamp = ?');
    insertList.push(timestamp);
  }

  return {
    str: insertStr.join(','),
    arr: insertList
  }
}


function toDub(n) {
  return n < 10 ? '0' + n : '' + n;
}

function getNow(date) {
  return date.getFullYear() + '' + toDub(date.getMonth() + 1) + '' + toDub(date.getDate())
}

function saveData() {
  saveAirportantdynamic();
  saveAirportContrilArea();
  saveAirportWeather();
  saveAirportSelection();
  saveAirroute();
  saveOndutypeople();
  saveDelay();
  saveRegularrate()
}

module.exports.start = function(time) {
  saveData()
  setInterval(function() {
    console.log('重新加载数据...')
    saveData()
  }, time);
}
