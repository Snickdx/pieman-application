const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const swPrecache = require('sw-precache');

const paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('generate-service-worker', function(callback) {
  const path = require('path');
  const swPrecache = require('sw-precache');
  const rootDir = 'public';
  
  swPrecache.write(
    path.join(rootDir, 'service-worker.js'),
    {
      staticFileGlobs: [
        'public/**/*.{html,png,jpg,gif,svg,eot,ttf,woff}',
        'public/fonts/roboto/css/fonts.css',
        'public/lib/ionic/js/ionic.bundle.js',
        'public/css/ionic.app.css',
        'public/lib/moment/min/moment.min.js',
        'public/lib/firebase/firebase.js',
        'public/lib/firebase/firebase-messaging.js',
        'public/lib/angularfire/dist/angularfire.min.js',
        'public/lib/ionic-toast/dist/ionic-toast.bundle.min.js',
        'public/lib/ngstorage/ngStorage.min.js',
        'public/lib/ionic-timepicker/dist/ionic-timepicker.bundle.min.js',
        'public/lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
        'public/node_modules/moment-duration-format/lib/moment-duration-format.js',
        'public/lib/localforage/dist/localforage.js',
        'public/js/app.js',
        'public/js/controllers.js',
        'public/js/routes.js',
        'public/js/directives.js',
        'public/js/services.js'
      ],
      stripPrefix: rootDir,
      importScripts: [
        // 'js/caching.js',
        'lib/firebase/firebase.js',
        'js/messaging.js',
        'lib/localforage/dist/localforage.js',
        'js/sync.js'
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/pieman-d47da\.firebaseio\.com\/pietime.json/,
          handler: 'fastest',
          options: {
            cache: {
              name: 'pietime'
            }
          }
        },
        {
          urlPattern: /https:\/\/www\.reddit\.com\/r\/\w{1,255}\.json/,
          handler: 'networkFirst',
          options: {
            cache: {
              name: 'titles'
            }
          }
        },
      ]
    },
    callback
  );
});

gulp.task('generate-sw',
  
  function(callback) {
    const rootDir = 'public';
    swPrecache.write('app/service-worker.js',
      {
        //1
        staticFileGlobs: [
          'public/**/*.{html,png,jpg,gif,svg,eot,ttf,woff}',
          'public/fonts/roboto/css/fonts.css',
          'public/lib/ionic/js/ionic.bundle.js',
          'public/css/ionic.app.css',
          'public/lib/moment/min/moment.min.js',
          'public/lib/firebase/firebase.js',
          'public/lib/firebase/firebase-messaging.js',
          'public/lib/angularfire/dist/angularfire.min.js',
          'public/lib/ionic-toast/dist/ionic-toast.bundle.min.js',
          'public/lib/ngstorage/ngStorage.min.js',
          'public/lib/ionic-timepicker/dist/ionic-timepicker.bundle.min.js',
          'public/lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
          'public/node_modules/moment-duration-format/lib/moment-duration-format.js',
          'public/lib/localforage/dist/localforage.js',
          'public/js/app.js',
          'public/js/controllers.js',
          'public/js/routes.js',
          'public/js/directives.js',
          'public/js/services.js'
        ],
        // 2
        importScripts: [
          'app/node_modules/sw-toolbox/sw-toolbox.js',
          'app/js/toolbox-script.js',
          'lib/firebase/firebase.js',
          'js/FCMScript.js',
          'lib/localforage/dist/localforage.js',
          'js/sync.js'
        ],
        // 3
        stripPrefix: rootDir
      },
      callback
    );
  });

gulp.task('deploy', ['generate-service-worker'], function(){
  sh.exec('firebase deploy');
});


