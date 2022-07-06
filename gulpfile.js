const gulp         = require('gulp');
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
        format: 'es',
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

const build = task('build');
const ainspector = task('ainspector');
const linting = task('linting');

exports.default = series(linting, parallel( build, ainspector));