var gulp = require('gulp');
var del = require('del');
var connect = require('gulp-connect');

function build() {
    gulp.src("src/**", {base: 'src/'})
        .pipe(gulp.dest("build"));
}


gulp.task('watch', function () {
  gulp.watch(["src/**"], ['build', 'reload']);
});

gulp.task("reload", function() {
    gulp.src("gulpfile.js").pipe(connect.reload());
});

gulp.task("clean", function(cb){
    del(["build"], cb);
});

gulp.task("build", build);
gulp.task('connect', function() {
  var port = 8000;
  console.log("Booting up the dev server! : http://localhost:" + port + "/#/");
  connect.server({
    port: port,
    root: "./build/",
    livereload: true
  });
});

gulp.task('default', ['build', 'connect', 'watch']);