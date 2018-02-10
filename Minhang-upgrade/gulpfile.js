var gulp = require('gulp')
var coffee = require('gulp-coffee')
var pug = require('gulp-pug')
var sass = require('gulp-sass')
var env = process.env.NODE_ENV && process.env.NODE_ENV.trim()
var tasks = [
    'copyStatic',
    'copyOldJs',
    'coffee',
    'sass',
    'pug',
    'package'
]
var fs = require('fs');

// electron 静态信息
gulp.task('copyStatic', () => {
    gulp.src('src/assets/**/*')
        .pipe(gulp.dest('./build/assets'))
    
    gulp.src('src/old_minhang_ui/**/*')
        .pipe(gulp.dest('./build/old_minhang_ui'))
})

gulp.task('copyJs', () => {
    gulp.src('src/assets/js/**/*')
        .pipe(gulp.dest('./build/assets/js/'))
})

gulp.task('copyOldJs',() => {
    gulp.src('src/old_minhang_ui')
        .pipe(gulp.dest('./build/old_minhang_ui/'))
})

// electron package.json 信息
gulp.task('package', () => {

    var path = './build/package.json';
    var package = require('./package.json')

    delete package.devDependencies

    package.scripts = {
        start: 'electron .'
    }
    
    writeFile(path,JSON.stringify(package))

})

// sass任务
gulp.task('sass', () => {
    gulp.src('src/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/assets/css/'))
})

// coffee任务
gulp.task('coffee', () => {
    gulp.src('src/coffee/*.coffee')
        .pipe(coffee({
            coffee: require('coffeescript'),
            bare: true
        }))
        .pipe(
            gulp.dest('./build/')
        )
})

// pug任务
gulp.task('pug', () => {
    gulp.src('src/template/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(
            gulp.dest('./build/')
        )
})

// 监听任务
gulp.task('watch', () => {
    gulp.watch('src/coffee/*.coffee', ['coffee'])
    gulp.watch('src/template/*.pug', ['pug'])
    gulp.watch('src/assets/css/*.scss', ['sass'])
    gulp.watch('src/assets/js/**/*.js', ['copyJs'])
    gulp.watch('src/old_minhang_ui/', ['copyOldJs'])
})

// 默认任务
gulp.task('default', tasks, () => {
    // 生产环境
    if (env == undefined || env == 'production') {
        var ipconfig = require('./ipconfig.json')
        ipconfig.ip = '172.30.8.80'
        writeFile('./build/ipconfig.json',JSON.stringify(ipconfig))
    }

    // 开发环境
    if (env == 'development') {
        var ipconfig = require('./ipconfig.json')
        ipconfig.ip = '127.0.0.1'
        writeFile('./build/ipconfig.json',JSON.stringify(ipconfig))
    }

})

// ===============================================================

/**
 * 1、写入文件
 */ 
function writeFile(path,content){
    var dirPath = path.substr(0,path.lastIndexOf('/'));
    var dirPathExits = fs.existsSync(dirPath)
    var filePath = fs.existsSync(path)
    if(!dirPathExits){
        fs.mkdirSync(dirPath);
    }
    if(filePath)
    {
        // 存在这个文件 则写入
        fs.writeFileSync(path,content)

    }else
    {
        // 不存在这个文件则创建并写入
        fs.createWriteStream(path,{flag:'w'}).write(content)
    }

}