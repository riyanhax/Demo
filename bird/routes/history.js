var router = require('koa-router')();
var mysql = require('mysql');
var mysql_db = require('../config/mysql_config');
var crypto = require('crypto');
var wrapper = require('co-mysql');
var connection = mysql.createConnection({
  host:mysql_db.IP,
  user:mysql_db.USER,
  password:mysql_db.PASSWORD,
  port:mysql_db.PORT,
  database:'drivebirds'
});

router.prefix('/history');

router.get('/', function *(next) {
  yield this.render('history',{})
});

router.post('/init',function *(){
  var response = {
    code:200,
    data:'',
    error:''
  }
  var p = wrapper(connection);
  response.data = yield p.query('SELECT `username` FROM `t_user` ');

  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/getDeviceByType',function *(){
  var response = {
    code:200,
    data:'',
    error:''
  }
  var p = wrapper(connection);
  response.data = yield p.query('SELECT * FROM `t_device_list` WHERE `deviceType` = "'+this.request.body.type+'"');

  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/query',function *(){
  var response = {
    code:200,
    data:'',
    error:''
  };

  var p = wrapper(connection);
  response.data = yield p.query('SELECT `t_operate_log`.*,`t_device_list`.* FROM `t_operate_log`,`t_device_list` WHERE `t_operate_log`.deviceId  = `t_device_list`.deviceId');

  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/queryGas',function *(){
    var data = this.request.body;
    var response = {
      code:200,
      data:'',
      error:''
    }
    var p = wrapper(connection);
    response.data = yield p.query('SELECT * FROM `t_device_state_history`,`t_device_list` WHERE `t_device_list`.deviceType = "'+data.deviceType+'" AND `t_device_state_history`.deviceId = "'+data.deviceId+'" AND `t_device_list`.deviceId = "'+data.deviceId+'"  AND `t_device_state_history`.write_dt between "'+data.startTime+'" and "'+data.endTime+'"');
    this.response.status = 200;
    this.response.body = JSON.stringify(response);
});

router.post('/queryAlarm',function *(){
    var response = {
      code:200,
      data:'',
      error:''
    }
    var p = wrapper(connection);
    response.data = yield p.query('SELECT `t_device_alert_log`.*,`t_device_list`.* FROM `t_device_alert_log`,`t_device_list` WHERE `t_device_alert_log`.deviceId  = `t_device_list`.deviceId');

    this.response.status = 200;
    this.response.body = JSON.stringify(response);
});

router.post('/delete',function *(){
    var response = {
      code:200,
      data:'',
      error:''
    };
   var data = JSON.parse(this.request.body.data)
   console.log(data)
    var p = wrapper(connection);
    for(var i=0;i<data.length;i++){
      yield p.query('DELETE FROM `t_operate_log` WHERE `deviceId` = "'+data[i].deviceid+'" AND `operate_dt` = "'+data[i].id+'"');
    }
    response.data = yield p.query('SELECT `t_operate_log`.*,`t_device_list`.* FROM `t_operate_log`,`t_device_list` WHERE `t_operate_log`.deviceId  = `t_device_list`.deviceId');
    this.response.status = 200;
    this.response.body = JSON.stringify(response);
});

router.post('/deleteAlarm',function *(){
    var response = {
      code:200,
      data:'',
      error:''
    };
   var data = JSON.parse(this.request.body.data)
   console.log(data)
    var p = wrapper(connection);
    for(var i=0;i<data.length;i++){
      yield p.query('DELETE FROM `t_device_alert_log` WHERE `deviceId` = "'+data[i].deviceid+'" AND `write_dt` = "'+data[i].id+'"');
    }
    response.data = yield p.query('SELECT `t_device_alert_log`.*,`t_device_list`.* FROM `t_device_alert_log`,`t_device_list` WHERE `t_device_alert_log`.deviceId  = `t_device_list`.deviceId');
    this.response.status = 200;
    this.response.body = JSON.stringify(response);
});

module.exports = router;
