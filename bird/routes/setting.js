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

router.prefix('/setting');

router.get('/', function *(next) {
  yield this.render('setting',{})
});

router.post('/get',function *(){

  var response = {
    code:0,
    data:'',
    error:''
  };

  var p = wrapper(connection);

  var setting = yield p.query('SELECT * FROM `t_threshold_level`');
  response.code = 200;
  response.data = setting;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);
});

router.post('/update',function *(){
  var response = {
    code:0,
    error:''
  };

  var p = wrapper(connection);
  var data = this.request.body;
  console.log(data)
  yield p.query(
    'UPDATE `t_threshold_level` SET `pressure` = ?, `voltage` = ?, `scope_meiqipao` = ?, `scope_yidongshengbo` = ?, `scope_quanxiangshengbo` = ?,`scope_dingxiangshengbo` = ?, `scope_dingxiangshengbo_banjiao`=?, `scope_dingxiangshengbo_fangweijiao`=?, `scope_shengyin` = ?, `grid_interval` = ? WHERE `id` = ?',
    [data.pressure, data.voltage, data.scope_meiqipao, data.scope_yidongshengbo, data.scope_quanxiangshengbo,data.scope_dingxiangshengbo,data.scope_dingxiangshengbo_banjiao,data.scope_dingxiangshengbo_fangweijiao,data.scope_shengyin,data.grid_interval,1]);
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/setViews',function *(){
  var response = {
    code:0,
    error:''
  };

  var p = wrapper(connection);
  var data = this.request.body;

  var isInsert = yield p.query('SELECT * FROM `t_views` WHERE `userid` =  "admin"');

  if(isInsert.length>0){
    yield p.query('UPDATE `t_views` SET data = ? WHERE `userid` = ?',[JSON.stringify(data),'admin']);
  }else{
    yield p.query('INSERT INTO `t_views` SET ?',{userid:'admin',data:JSON.stringify(data)});
  }

  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/getViews',function *(){
  var response = {
    code:0,
    data:'',
    error:''
  };

  var p = wrapper(connection);
  var data = this.request.body;
  response.data =  yield p.query('SELECT * FROM `t_views`');
  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/setTransform',function *(){

  var response = {
    code:0,
    error:''
  };

  var p = wrapper(connection);
  var data = this.request.body;

  var isInsert = yield p.query('SELECT * FROM `t_views` WHERE `userid` =  "admin"');

  if(isInsert.length>0){
    yield p.query('UPDATE `t_views` SET Transform = ? WHERE `userid` = ?',[JSON.stringify(data),'admin']);
  }else{
    yield p.query('INSERT INTO `t_views` SET ?',{userid:'admin',Transform:JSON.stringify(data)});
  }

  response.code = 200;
  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

module.exports = router;
