var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror');

var index = require('./routes/index');
var users = require('./routes/users');
var setting = require('./routes/setting');
var birdmanger = require('./routes/birdmanger');
var device = require('./routes/device');
var history = require('./routes/history');
var loading = require('./routes/loading');

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(setting.routes(), setting.allowedMethods());
app.use(birdmanger.routes(), birdmanger.allowedMethods());
app.use(device.routes(), device.allowedMethods());
app.use(history.routes(), history.allowedMethods());
app.use(loading.routes(),loading.allowedMethods());


module.exports = app;
