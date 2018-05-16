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

router.prefix('/device');

router.get('/manger', function *(next) {
  yield this.render('devicemanger',{})
});

router.get('/status', function *(next) {
  yield this.render('devicestatus',{})
});

router.get('/warn', function *(next) {
  yield this.render('devicewarning',{})
});

router.post('/getStatus', function *(){
  var p = wrapper(connection);
  var response = {
    code:200,
    error:'',
    data:''
  };
  response.data = yield p.query('SELECT `t_device_state_realtime`.*,`t_device_list`.* FROM `t_device_state_realtime`,`t_device_list` WHERE `t_device_state_realtime`.deviceId  = `t_device_list`.deviceId');
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/updateState', function *(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {
    code:200,
    error:'',
    data:''
  };
  response.data = yield p.query('UPDATE `t_device_state_realtime` SET `alert` = ? WHERE deviceId  = "'+data.deviceId+'"',[data.alert]);
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/get',function*(){
  var p = wrapper(connection);
  var response = {code:0,data:''};
  response.data = yield p.query('SELECT * FROM `t_device_list`');
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/update',function*(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {code:0,data:''};
  response.data = yield p.query('UPDATE `t_device_list` SET `deviceId` = ?, `devicename` = ? WHERE `deviceId` = ?',[data.deviceId,data.devicename,data.oldId] );
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/updateTime',function*(){
  var data = JSON.parse(this.request.body.data);
  var p = wrapper(connection);
  var response = {code:0,data:''};
  console.log(data)
  for(var i=0;i<data.length;i++){
    yield p.query('UPDATE `t_device_list` SET `time_interval` = ? WHERE `deviceId` = ?',[data[i].interTime,data[i].deviceId] );
  }
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/add',function*(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {code:0,data:''};
  var device = yield p.query('SELECT * FROM `t_device_list` WHERE `deviceId` = ?',[data.deviceId]);
  if(device.length){
    yield p.query('UPDATE `t_device_list` SET `deviceId` = ?, `devicename` = ? WHERE `deviceId` = ?',[data.deviceId,data.devicename,data.oldId] );
  }else{
    var result = yield p.query('SELECT max(id) FROM `t_device_list`');
    var insertId = result[0]["max(id)"];
    yield p.query('INSERT INTO `t_device_list` SET ?',{devicename:data.devicename,deviceId:data.deviceId,id:insertId+1,deviceType:data.deviceType});
  }
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/updateByTransform',function*(){
  var data = this.request.body.data;
  var p = wrapper(connection);
  var response = {code:0,data:''};
  for(var i=0;i<data.length;i++){
    yield p.query('UPDATE `t_device_list` SET `Transform` = ? WHERE `deviceId` = ?',[JSON.stringify(data[i].Transform),data[i].deviceId]);
  }

  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/remove',function*(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {code:0,data:''};
  yield p.query('DELETE FROM `t_device_list` WHERE `deviceId` = "'+data.deviceId+'"');
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

module.exports = router;
