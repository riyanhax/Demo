var router = require('koa-router')();

router.prefix('/loading');

router.get('/print', function *(next) {
  yield this.render('print',{})
});

router.get('/', function *(next) {
  yield this.render('loading',{})
});

router.get('/info', function *(next) {
  yield this.render('info',{})
});


module.exports = router;
