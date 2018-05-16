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

router.prefix('/bird');

router.get('/manger', function *(next) {
  yield this.render('birdmanger',{})
});

router.get('/button', function *(next) {
  yield this.render('birdmanger-btn',{})
});

router.get('/forecast', function *(next) {
  yield this.render('birdforecast',{})
});

router.post('/get',function*(){
  var p = wrapper(connection);
  var response = {code:0,data:''};
  response.data = yield p.query('SELECT * FROM `t_device_list`');
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/getGroup',function *(){
  var p = wrapper(connection);
  var group = yield p.query('SELECT * FROM `t_device_group` WHERE `userid` = "admin"');
  var groups = [];
  var response = {
    code:0,
    data:{},
    error:''
  };

  for(var i=0;i<group.length;i++){
    groups.push(group[i].groupid);
  }

  for(var i=0;i<groups.length;i++){

    var tmp = yield p.query('SELECT * FROM `t_device_group_relation` WHERE `userid` = "admin" AND `groupid` = "'+groups[i]+'"');
    var deviceid = [];
    for(var j=0;j<tmp.length;j++){
        deviceid.push(tmp[j].deviceId);
    }

    response.data[groups[i]] = deviceid;
  }


  this.response.status = 200;
  this.response.body = JSON.stringify(response)
});

router.post('/updateGroup',function *(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {code:200,data:'',error:''};
  var exits = yield p.query('SELECT * FROM `t_device_group` WHERE `userid` = ? AND groupid = ?', [data.userName,data.oldName]);
  var groups = JSON.parse(data.devices);
  if(exits.length){

    yield p.query('UPDATE `t_device_group` SET `groupid` = ? WHERE `userid` = ? AND groupid = ?', [data.newName, data.userName,data.oldName]);
    yield p.query('DELETE FROM `t_device_group_relation` WHERE `userid` = ? AND groupid = ?', [data.userName,data.oldName]);

    var result = yield p.query('SELECT max(id) FROM `t_device_group_relation`');
    var insertId = result[0]["max(id)"];
    for(var i=0;i<groups.length;i++){
      yield p.query('INSERT INTO `t_device_group_relation` SET ?', {groupid:data.newName,userid:data.userName,deviceid:groups[i].deviceId,id:insertId+i});
    }

    //yield p.query('UPDATE `t_device_group_relation` SET `groupid` = ? WHERE `userid` = ? AND groupid = ?', [data.newName, data.userName,data.oldName]);

  }else{

    yield p.query('INSERT INTO `t_device_group` SET ?', {groupid:data.groupid,userid:data.userName});
    var result = yield p.query('SELECT max(id) FROM `t_device_group_relation`');
    var insertId = result[0]["max(id)"];

    for(var i=0;i<groups.length;i++){
      yield p.query('INSERT INTO `t_device_group_relation` SET ?', {groupid:data.groupid,userid:data.userName,deviceid:groups[i].deviceId,id:insertId+i});
    }

  }

  this.response.stattus = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/removeGroup',function *(){
  var data = this.request.body;
  var p = wrapper(connection);
  var response = {code:200,data:'',error:''}
  yield p.query('DELETE FROM `t_device_group` WHERE `userid` = ? AND groupid = ?', [data.userName,data.groupid]);
  yield p.query('DELETE FROM `t_device_group_relation` WHERE `userid` = ? AND groupid = ?', [data.userName,data.groupid]);
  this.response.stattus = 200;
  this.response.body = JSON.stringify(response);

});

// router.post('/addGroup',function *(){
//   var data = this.request.body;
//   var p = wrapper(connection);
//   var response = {code:200,data:'',error:''}
//   yield p.query('INSERT INTO `t_device_group` SET ?', {groupid:data.groupid,userid:data.userName});
//
//   var groups = JSON.parse(data.devices);
//   var result = yield p.query('SELECT max(id) FROM `t_device_group_relation`');
//   var insertId = result[0]["max(id)"];
//   for(var i=0;i<groups.length;i++){
//
//     yield p.query('INSERT INTO `t_device_group_relation` SET ?', {groupid:data.groupid,userid:data.userName,deviceid:groups[i].deviceId,id:insertId+i});
//   }
//
//   this.response.stattus = 200;
//   this.response.body = JSON.stringify(response);
//
// });

module.exports = router;
