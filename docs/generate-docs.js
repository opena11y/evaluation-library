#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

import fs    from 'fs';
import os    from 'os';
import util  from 'util';
import url   from 'url';

import  nunjucks from 'nunjucks';

import {allRules} from '../src/rules/allRules.js';

const outputDirectory = './docs/html/';

let html = nunjucks.render('./templates/index.njk', {title: 'Rules', allRules: allRules});

fs.writeFile('./html/index.html', html, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
 })
