#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

const fs = require('fs');
const readline = require('readline');
const path = require('path');

let file = path.join(__dirname, process.argv[process.argv.length-1]);

console.log('[file]: ' + file.toString());

let lines1 = require('fs').readFileSync(file, 'utf8').split('\n');

let lines2 = [];

lines1.forEach(line => {
  if (line.indexOf('import {OpenAjax}') < 0) {
    lines2.push(line);
  }
})

fs.writeFileSync(file, lines2.join('\n'), function(err, writtenbytes) {
  if (err) {
    console.log('Can\'t write to: ' + file);
  } else {
    console.log(wrtittenbytes + 'characters added to file')
  }
});



