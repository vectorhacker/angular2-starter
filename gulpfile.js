var gulp = require('gulp');
var gulp_jspm = require('gulp-jspm');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var inject = require('gulp-inject');
var liveServer = require('live-server');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var concatCss = require('gulp-concat-css');
var del = require('delete');


var params = {
  port: 8181, // Set the server port. Defaults to 8080. 
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0. 
  root: "./", // Set root directory that's being server. Defaults to cwd. 
  open: true, // When false, it won't load your browser by default. 
  ignore: './**/*.ts', // comma-separated string for paths to ignore 
  file: "index.html", // When set, serve this file for every 404 (useful for single-page applications) 
  wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec. 
};

gulp.task('default', ['build.prod'], function () {

});

gulp.task('compile.typescript', function () {
  var tsProject = ts.createProject('tsconfig.json');
  var tsResult = tsProject.src() // instead of gulp.src(...) 
    .pipe(ts(tsProject));

  var stream = tsResult.js.pipe(gulp.dest('./'));
  return stream;
});

gulp.task('systemjs.prod', function () {
  gulp.src('./jspm_packages/system.js')
    .pipe(gulp.dest('./build/js/lib'))
});

gulp.task('jspm.prod', ['compile.typescript', 'systemjs.prod'], function () {

  var stream = gulp.src('./main.js')
    .pipe(gulp_jspm())
    .pipe(jsmin())
    .pipe(rename({
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/js/'));
  return stream;
});

// production tasks
gulp.task('index.prod', function () {
  gulp.src('./index.html')
    .pipe(gulp.dest('./build'));
});

gulp.task('inject.prod', ['index.prod', 'jsmin.prod', 'css.prod', 'jspm.prod'], function () {
  var target = gulp.src('./build/index.html');

  var sources = gulp.src(['./build/js/lib/system.js',
    './build/js/**/*.js',
    './build/css/**/*.css'],
    { read: false });

  var stream = target.pipe(inject(sources, { relative: true }))
    .pipe(gulp.dest('./build'))

  return stream;
});

gulp.task('css.prod', function () {
  return gulp.src('css/**/*.css')
    .pipe(concatCss("css/app.css"))
    .pipe(gulp.dest('build/'));
})

gulp.task('images.prod', function () {
  return gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
})

gulp.task('jsmin.prod', function () {
  gulp.src('js/**/*.js')
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('build/js'));
});

gulp.task('clean.prod', function () {
  del.sync('./build', { force: true });
});

gulp.task('move-components.prod',
  function () {
    gulp.src(['./components/**/*.html', '!./components/**/*.ts'])
      .pipe(gulp.dest('./build/components'));
    gulp.src('./templates/**/*.html')
      .pipe(gulp.dest('./build/templates'));
  });

gulp.task('build.prod', ['clean.prod',
  'index.prod',
  'compile.typescript',
  'jspm.prod',
  'jsmin.prod',
  'images.prod',
  'inject.prod',
  'move-components.prod']);

// development tasks

gulp.task('jspm.dev', ['compile.typescript'], function () {

  var stream = gulp.src('main.js')
    .pipe(sourcemaps.init())
    .pipe(gulp_jspm())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'));

  return stream;
});

gulp.task('inject.dev', ['jspm.dev'], function () {
  var target = gulp.src('./index.html');

  var sources = gulp.src(['./jspm_packages/system.js',
    './jspm-bundle.js',
    './js/**/*.js',
    './css/**/*.css'],
    { read: false });

  var stream = target.pipe(inject(sources))
    .pipe(gulp.dest('./'))

  return stream;
});

gulp.task('build.dev', ['compile.typescript', 'jspm.dev', 'inject.dev']);

gulp.task('watch.dev', ['build.dev'], function () {
  liveServer.start(params);
  gulp.watch(['./**/*.ts', './templates/**/*.html', './components/**/*.html'], ['build.dev'])
});

// end development tasks