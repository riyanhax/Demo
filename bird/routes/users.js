var router = require('koa-router')();
var mysql = require('mysql');
var mysql_db = require('../config/mysql_config');
var crypto = require('crypto');
var wrapper = require('co-mysql');
var password = require('../config/password');
var connection = mysql.createConnection({
  host:mysql_db.IP,
  user:mysql_db.USER,
  password:mysql_db.PASSWORD,
  port:mysql_db.PORT,
  database:'drivebirds'
});

function md5(str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}

function greKey(){
  var data = ['a','b','c','d','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0'];
  var key = '';
  for(var i=0;i<6;i++){
    key+=data[Math.round(Math.random()*data.length)];
  }
  return key;
}
//console.log(md5("123456"))
router.prefix('/users');

router.get('/', function *(next) {
  yield this.render('usermanger',{})
});

router.post('/add', function *(next) {
  var newUser = this.request.body;
  var response = {
    code:0,
    error:''
  }
  if(newUser.username !== '' && newUser.password !== ''){
    var p = wrapper(connection);
    var userid = yield p.query('SELECT * FROM `t_user` WHERE `userid` = "'+newUser.userid+'"');
    var username = yield p.query('SELECT * FROM `t_user` WHERE `username` = "'+newUser.username.toLowerCase()+'"');
    newUser.password = new Buffer(newUser.password,'base64').toString();
    var key = md5(greKey());

    if(!userid.length){
      var auth = yield p.query('INSERT INTO t_user SET ?', {userid:newUser.userid,username: newUser.username,userpassword:password.getEncAse192(newUser.password,key),permissions:0,key:key});
      response.code = 200;
    }else{
      response.error = 'The username is exits!'
    }
  }else{
    response.error = 'The username and password must be not empty!';
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/get', function *(next) {
  var p = wrapper(connection);
  var response = {code:0,data:''};
  if(this.request.body.auth == 1){
    response.data = yield p.query('SELECT * FROM `t_user`');
    for(var i=0;i<response.data.length;i++){
      response.data[i].userpassword = new Buffer(password.getDecAse192(response.data[i].userpassword,response.data[i].key)).toString('base64');
      delete response.data[i].key;
    }
    response.code = 200;
  }else{

    response.data = yield p.query('SELECT * FROM `t_user` WHERE `userid` = "'+this.request.body.user+'"');
    for(var i=0;i<response.data.length;i++){
      response.data[i].userpassword = new Buffer(password.getDecAse192(response.data[i].userpassword,response.data[i].key)).toString('base64');
      delete response.data[i].key;
    }
    response.code = 200;
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/remove', function *(next) {

  var p = wrapper(connection);
  var response = {code:0,data:''};
  var userid = this.request.body.userid;

  if(userid === 'admin'){
    response.error = 'The admin user is not remove';
  }else{
    yield p.query('DELETE FROM `t_user` WHERE `userid` = "'+userid+'"');
    response.code = 200;
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

router.post('/update', function *(next) {

  var p = wrapper(connection);
  var response = {code:0,data:''};
  var data = this.request.body;
  var key = md5(greKey());
  data.password = new Buffer(data.password,'base64').toString();
  var newPassword = password.getEncAse192(data.password,key);

  if(data.userid === 'admin'){
    yield p.query('UPDATE `t_user` SET `userpassword` = ?, `key` = ? WHERE `userid` = ?',[newPassword,key,'admin']);
    response.code = 200;
  }else{
    console.log(newPassword)
    yield p.query('UPDATE `t_user` SET `userid` = ?, `username` = ?, `userpassword` = ?, `key` = ? WHERE `userid` = ?', [data.userid, data.username, newPassword,key, data.oldid]);
    response.code = 200;
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

module.exports = router;
