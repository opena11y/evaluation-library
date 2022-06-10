const gulp = require('gulp');
const rollup = require('rollup');
const { task } = require('gulp');
const { parallel } = require('gulp');

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

gulp.task('ai', () => {
  return rollup
    .rollup({
      input: './src/ainspector-content-script/content.js'
    })
    .then(bundle => {
      return bundle.write({
	    file: './releases/ainspector-content-script.js',
	    format: 'iife'
      });
    });
});

const build = task('build');
const ai = task('ai');

exports.default = parallel( build, ai);