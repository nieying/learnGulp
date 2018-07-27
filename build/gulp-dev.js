const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const gulpConfig = require('../build/gulp-config'); // 文件路径
const html = require("gulp-htmlmin"); // html 压缩
const minifycss = require('gulp-minify-css'); // css压缩
const imagemin = require('gulp-imagemin'); //图片压缩
const jshint = require('gulp-jshint'); //js检查
const uglify = require('gulp-uglify'); //js压缩
const rename = require('gulp-rename'); //文件重命名
const concat = require('gulp-concat'); //合并文件


function dev() {
  // html处理
  gulp.task('html', function() {
    const options = {
      removeComments: true, //清除HTML注释
      collapseWhitespace: true, //压缩HTML
      collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
      minifyJS: true, //压缩页面JS
      minifyCSS: true //压缩页面CSS
    };
    return gulp.src(gulpConfig.html.src)
    .pipe(html(options))
    .pipe(gulp.dest(gulpConfig.html.dist))
    .pipe(reload({ stream: true }));
  })
  // css处理
  gulp.task('css', function() {
    return gulp.src(gulpConfig.css.src)
    .pipe(minifycss())
    .pipe(concat(gulpConfig.css.build_name))
    .pipe(gulp.dest(gulpConfig.css.dist))
    .pipe(reload({ stream: true }));
  })
  // img处理
  gulp.task('img', function() {
     return gulp.src(gulpConfig.img.src).pipe(imagemin({
       optimizationLevel: 3,
       progressive: true,
       interlaced: true
     })).pipe(gulp.dest(gulpConfig.img.dist)).pipe(reload({
       stream: true
     }));
  })
  // js处理
  gulp.task('js', function() {
    return gulp.src(gulpConfig.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(gulpConfig.js.dist))
    .pipe(reload({ stream: true }));
  })
  // 静态服务器
  // gulp.task('browser-sync', function () {
  //   browserSync.init({
  //     server: {
  //       baseDir: "./"
  //     }
  //   });
  // });

  //  代理
  // gulp.task('browser-sync', function () {
  //   browserSync.init({
  //     proxy: "你的域名或IP"
  //   });
  // });
  gulp.task('dev', ['html', 'css', 'img', 'js'], function() {
    browserSync.init({
      server: {
        baseDir: gulpConfig.dist
      }, notify: false
    });
    gulp.watch(gulpConfig.html.src, ['html'])
    gulp.watch(gulpConfig.css.src, ['css'])
    gulp.watch(gulpConfig.img.src, ['img'])
    gulp.watch(gulpConfig.js.src, ['js'])
  });
}

module.exports = dev