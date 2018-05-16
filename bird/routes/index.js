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

router.get('/', function *(next) {
  yield this.render('login');
});

router.post('/login', function *(next) {
  var _this = this;
  var data = this.request.body;
  var response = {
    "code":0,
    "user":'',
    "error":'',
    "auth":0
  };

  var p = wrapper(connection);

  var auth = yield p.query('SELECT * FROM `t_user` WHERE `userid` = "'+data.username.toLowerCase()+'"');

  if(!!auth.length){

    if(auth[0].userpassword === password.getEncAse192(data.password,auth[0].key)){
      response.code = 200;
      response.user = auth[0].username;
      response.auth = auth[0].permissions;
    }else{
      response.error = 'The User password is Wrong!'
    }
  }else{
    response.error = 'The User Name is Wrong!';
  }

  this.response.status = 200;
  this.response.body = JSON.stringify(response);

});

module.exports = router;
