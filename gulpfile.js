const gulp         = require('gulp');
const exec         = require('child_process').exec;
const rollup       = require('rollup');
const {src, task}  = require('gulp');
const {parallel, series}   = require('gulp');
const eslint       = require('gulp-eslint');
const minify       = require('gulp-minify');
const bookmarklet  = require('gulp-bookmarklet');
 
task('linting', () => {
    return src(['src/*/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('build', () => {
  return rollup
    .rollup({
      input: './src/evaluationLibrary.js'
    })
    .then(bundle => {
      return bundle.write({
        file: './releases/opena11y-evaluation-library.js',
        format: 'es'
      });
    });
});

gulp.task('build-bookmarklet', () => {
  return rollup
    .rollup({
      input: './src/bookmarklets/opena11y-example.js'
    })
    .then(bundle => {
      return bundle.write({
        file: './docs/bookmarklets/opena11y-example.js',
        format: 'iife'
      });
    });
});

// The common JS version of the library is used by the documenation
// script to generate website documentation, since Gulp does not
// support modules
gulp.task('buildcjs', () => {
  return rollup
    .rollup({
      input: './src/evaluationLibrary.js',
    })
    .then(bundle => {
      return bundle.write({
        file: './releases/opena11y-evaluation-library.cjs',
        format: 'cjs',
      });
    });
});

gulp.task('ainspector', () => {
  return rollup
    .rollup({
      input: './src/ainspector-content-script/content.js'
    })
    .then(bundle => {
      return bundle.write({
	    file: '../ainspector-for-firefox/src/ainspector-content-script.js',
	    format: 'iife'
      });
    });
});

gulp.task('opena11y-for-h2l', () => {
  return rollup
    .rollup({
      input: './src/opena11y-for-h2l/opena11y-for-h2l.js'
    })
    .then(bundle => {
      return bundle.write({
      file: '../toc-sidepanel/src/js/opena11y-for-h2l.js',
      format: 'iife'
      });
    });
});

gulp.task('opena11y-for-ainspector', () => {
  return rollup
    .rollup({
      input: './src/opena11y-for-ainspector/opena11y-for-ainspector.js'
    })
    .then(bundle => {
      return bundle.write({
      file: '../ainspector/src/js/opena11y-for-ainspector.js',
      format: 'iife'
      });
    });
});


gulp.task('documentation', function (cb) {
  exec('node ./gen-documentation.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('compress', function(cb) {
  gulp.src(['./releases/*.js', './releases/*.cjs'])
    .pipe(minify({
        ignoreFiles: ['*-min.js', '*-min.mjs']
    }))
    .pipe(gulp.dest('releases'));
    cb();
});

gulp.task('compress-bookmarklets', function(cb) {
  gulp.src(['./docs/bookmarklets/*.js', './docs/bookmarklets/*.cjs'])
    .pipe(minify({
        ignoreFiles: ['*-min.js', '*-min.mjs']
    }))
    .pipe(gulp.dest('./docs/bookmarklets'));
    cb();
});


const ainspector3       = task('ainspector');
const ainspector4       = task('opena11y-for-ainspector');
const h2l              = task('opena11y-for-h2l');
const build            = task('build');
const buildcjs         = task('buildcjs');
const buildBookmarklet = task('build-bookmarklet');
const documentation    = task('documentation');
const linting          = task('linting');
const compressa        = task('compress');
const compressb        = task('compress-bookmarklets');

exports.default = series(linting, parallel( build, buildcjs, ainspector3, ainspector4, h2l, buildBookmarklet), documentation, compressa, compressb);
