// gulp版本 4.0.2   请使用cnpm安装依赖  
const gulp = require("gulp");
const minifyCss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const spritesmith = require("gulp.spritesmith");
const watch = require("gulp-watch");
const revOutdated = require("gulp-rev-outdated");
const rev = require("gulp-rev");
const gutil = require("gulp-util");
const rimraf = require("rimraf");
const path = require("path");
const through = require("through2");
const browserSync = require("browser-sync");
const usemin = require("gulp-usemin");
const babel = require("gulp-babel"); // babel转es5
const uglify = require("gulp-uglify"); // js压缩
const contact = require("gulp-concat"); // 合并
const postcss = require("gulp-postcss");
const htmlmin = require("gulp-htmlmin");
const autoprefixer = require("autoprefixer");
/**
 * 图片处理
 */
//图片压缩
gulp.task("images", gulp.series( () => {
  return gulp.src(["./src/img/*", "./src/img/**/*"]).pipe(imagemin()).pipe(gulp.dest("./dist/img/"));
}));

//图片合并
gulp.task("sprite", gulp.series('images',() => {
  var spriteData = gulp.src("./src/img/common/*.png").pipe(
    spritesmith({
      imgName: "./img/common/sprite.png",
      cssName: "./css/common/sprite.css"
    })
  );
  return spriteData.pipe(gulp.dest("./src/")).pipe(gulp.dest("./dist/"));
}));
/**
 * es6转es5
 */
gulp.task("es6", gulp.series( done => {
  gulp
    .src(["./src/*.js"]) // 需要转的js
    .pipe(
      babel({
        presets: ["es2015"],
        plugins: ["transform-remove-strict-mode"] // 去除严格模式
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("./lib"));
  done(console.log("es6 to es5 complete！"));
}));
/**
 * 添加css前缀
 */
gulp.task("autoprefixer", gulp.series( () => {
  return gulp
    .src(["./src/css/*", "./src/css/**/*"])
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ["last 5 versions"] })]))
    .pipe(gulp.dest("./src/css"));
}));
// // 监视js文件变化，自动执行任务
gulp.task("watch", gulp.series( () => {
  gulp.watch("./src/js/*.js", function () {
    gulp.run("es6");
  });
}));
// 移动js和css公共部分至dist
gulp.task("moveCommon2dist", gulp.series( async() => {
  await gulp.src(["./src/js/common/*"]).pipe(gulp.dest("./dist/js/common"));
  await gulp.src(["./src/css/common/*"]).pipe(gulp.dest("./dist/css/common"));
  await gulp.src(["./src/favicon.ico"]).pipe(gulp.dest("./dist"));
}));

gulp.task("html", gulp.series( () => {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true //删除<style>和<link>的type="text/css"
  };
  return gulp
    .src("./src/*.html")
    .pipe(
      usemin({
        html: [
          function () {
            return htmlmin(options);
          }
        ],
        js: [uglify, rev],
        inlinejs: [uglify],
        css: [minifyCss, rev]
      })
    )
    .pipe(gulp.dest("dist/"))
}));
gulp.task("cssClean", gulp.series( () => {
  return gulp.src(["./dist/css/*.css", "./dist/css/**/*.css"], { read: false }).pipe(cleaner());
}));
gulp.task("jsClean", gulp.series( () => {
  return gulp.src(["./dist/js/*.js", "./dist/js/**/*.js"], { read: false }).pipe(cleaner());
}));
gulp.task("htmlClean", gulp.series(
   () => {
    return gulp.src(["./dist/*.html"], { read: false }).pipe(cleaner());
  }
));
//执行文件清除，并将公共文件迁移至dist
gulp.task("clean", gulp.series(() => {
    return gulp.src(["./dist/*"], { read: false }).pipe(cleaner());
  }
));
//打包编译
//更改html css引用路径 css压缩 合并 重命名 js压缩 合并 重命名
gulp.task("build", gulp.series('clean',"es6", "autoprefixer", "clean", "moveCommon2dist", "images","html", done => {
  done(console.log("Compilation complete ！"));
}));
// //----------------------------------------------------------------------------------------------------------------------------------------------//

//清除文件
function cleaner() {
  return through.obj(function (file, enc, cb) {
    rimraf(
      path.resolve(file.cwd || process.cwd(), file.path),
      function (err) {
        if (err) {
          this.emit("error", new gutil.PluginError("Cleanup old files", err));
        }
        this.push(file);
        cb();
      }.bind(this)
    );
  });
}
//----------------------------------------------------------------------------------------------------------------------------------------------//

/**
 * 监听文件
 */

//监听文件自动刷新浏览器

gulp.task("run", gulp.series(() => {
    var files = ["./src/*.html", "./src/css/*.css", "./src/js/*.js"];
    browserSync.init(files, {
      server: {
        baseDir: "./", // 设置服务器的根目录
        index: "index.html" // 指定默认打开的文件
      },
      port:9999  // 指定访问服务器的端口号
    });
  }
));