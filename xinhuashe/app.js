
var koa = require('koa');
var path = require('path');

var app = koa();

//模板配置
var views = require('koa-views');
//app.use(views(path.join(__dirname,'./','./')));
app.use(views(path.join(__dirname,'./apps/view7/','./')));

//post body 解析
var body = require('koa-body');
app.use(body({
	'jsonLimit':'50mb',
	'formLimit':'50mb',
	'textLimit':'50mb',
	'multipart': true
}));

//数据校验
var validator = require('koa-validator');
app.use(validator());

//静态文件
var serve  = require('koa-static');
app.use(serve(path.join(__dirname,'./','./') ));

//路由
var router = require('koa-router');
app.use(router(app));

//应用路由
/* app.get('/',function*(){
     yield this.render('index');
 });*/

 app.get('/view1',function*(){
     yield this.render('index');
 });

app.listen(3000);
console.log('listening on port %s',3000);

module.exports = app;

