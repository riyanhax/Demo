var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var del = require('del');

gulp.task('copy',  function() {
    gulp.src('apps/**/*')
    .pipe(gulp.dest('min'))
});


var apps = ['view1','view2','view3','view4','view5','view6','view7','view8'];

gulp.task('minifyCss',function(){
	for(var i=0;i<apps.length;i++){
		 gulp.src('min/'+apps[i]+'/css/*.css')
		       .pipe(minifyCss())
		       .pipe(gulp.dest('min/'+apps[i]+'/css/'));
	}
});

gulp.task('minifyJs',function(){
	for(var i=0;i<apps.length;i++){
		 gulp.src('min/'+apps[i]+'/js/*.js')
		       .pipe(uglify())
		       .pipe(gulp.dest('min/'+apps[i]+'/js/'));
	}
});

gulp.task('htmlmin',function(){
	var options = {
	   removeComments: true,
       collapseWhitespace: true,
       collapseBooleanAttributes: true,
       removeEmptyAttributes: true,
       removeScriptTypeAttributes: true,
       removeStyleLinkTypeAttributes: true,
       minifyJS: true,
       minifyCSS: true
   };

   for(var i=0;i<apps.length;i++){
	   gulp.src('min/'+apps[i]+'/*.html')
	       .pipe(htmlmin(options))
	       .pipe(gulp.dest('min/'+apps[i]+'/'));
   }
});

gulp.task('clean', function (cb) {
  del(['min/**/*'], cb);
});

gulp.task('default',[/*'clean','copy',*/'htmlmin','minifyCss','minifyJs']);
