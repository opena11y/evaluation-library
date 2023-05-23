const gulp         = require('gulp');
const exec         = require('child_process').exec;
const rollup       = require('rollup');
const {src, task}  = require('gulp');
const {parallel, series}   = require('gulp');
const eslint = require('gulp-eslint');
 
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

gulp.task('documentation', function (cb) {
  exec('node ./gen-documentation.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

const ainspector    = task('ainspector');
const build         = task('build');
const buildcjs      = task('buildcjs');
const documentation = task('documentation');
const linting       = task('linting');

exports.default = series(linting, parallel( build, buildcjs, ainspector), documentation);
