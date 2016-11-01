/*
 * Gulp
 */

var gulp = require("gulp");
var sequence = require("gulp-sequence");
var rename = require("gulp-rename");
var clean = require("gulp-clean");
var uglify = require("gulp-uglify");
var spawn = require("gulp-spawn");
var ROOT_DIR = process.cwd();

/*
 * Task clean
 */
gulp.task("clean", function(){
  return gulp.src(["sociallogin.js", "sociallogin-min.js", "build/", "components/"], {read: false})
              .pipe(clean());
});

/*
 * Task duo
 */
gulp.task("duo", function(){
  var args = [
    "--standalone",
    "sociallogin",
    "src/index.js"
  ];
  return gulp.src("src/index.js")
              .pipe(spawn({
                cmd: "duo",
                args: args
              }));
});

/*
 * Task out
 */
gulp.task("out", function(){
    return gulp.src("build/src/index.js")
        .pipe(rename("sociallogin.js"))
        .pipe(gulp.dest(ROOT_DIR))
        .pipe(rename("sociallogin.min.js"))
        .pipe(uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}
        }))
        .pipe(gulp.dest(ROOT_DIR));
});

/*
 * Task out snippet
 */
gulp.task("snippet-out", function(){
    return gulp.src("src/sociallogin-snippet.js")
        .pipe(rename("sociallogin-snippet.min.js"))
        .pipe(uglify({
            mangle: {except: ['require' ,'exports' ,'module' ,'$']}
        }))
        .pipe(gulp.dest(ROOT_DIR));
});

/*
 * Dev
 */
gulp.task("dev", sequence("clean", "duo", "out", "snippet-out"));
