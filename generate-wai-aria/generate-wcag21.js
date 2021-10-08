#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

const fs = require('fs');
const url = require('url');
const fetch = require('node-fetch');
const HTMLParser = require('node-html-parser');

let wcag21 = 'https://www.w3.org/TR/WCAG21/';

function cleanString(s) {
  s = s.replace(/'/, '\\\'');
  s = s.replace(/\n|\r|§/g, '');
  s = s.replace(/\s+/g, ' ');
  return s.trim();
}

function removePrefix(s) {
  parts = s.split('.');
  s = parts[parts.length-1];
  s = s.trim();
  if (s[1] === ' ') {
    s = s.substring(2,s.length);
  }
  return s;
}

function getWCAGInformation(dom) {
  wcagInfo = {};
  wcagInfo.abbreviation = 'WCAG 2.1';
  wcagInfo.title = dom.querySelector('h1.title').textContent;
  wcagInfo.url = wcag21;
  wcagInfo.status = dom.querySelector('h1.title + h2').textContent.trim().replace('\n', '');

  wcagInfo.level = "Level ",
  wcagInfo.levels = ['Undefined', 'AAA','AA','', 'A'],
  wcagInfo.evaluation_levels = ['Undefined', 'AAA','AA','AA and AAA', 'A',  'A and AAA', 'A nd AA', 'A, AA and AAA'],

  wcagInfo.all_guidelines = {
      title       : 'All Guidelines',
      description : 'All the rules related to WCAG 2.1.',
      url_spec    : wcag21
  }

  let principles = dom.querySelectorAll('section.principle')

  wcagInfo.principles = {};

  for (let i = 0; i < principles.length; i += 1) {
    let p = i + 1;
    let principle = principles[i];

    wcagInfo.principles[p] = {};
    pInfo = wcagInfo.principles[p];
    pInfo.id          = 'OpenAjax.a11y.WCAG20_PRINCIPLE.P_' + p;
    pInfo.title       = removePrefix(cleanString(principle.querySelector('h2').textContent));
    pInfo.description = cleanString(principle.querySelector('p').textContent);
    pInfo.url_spec    = wcag21 + '#' + principle.id;

    pInfo.guidelines = {};

    let guidelines = principle.querySelectorAll('section.guideline');

    console.log(pInfo.title + ' (' + guidelines.length + ')');

    for (let j = 0; j < guidelines.length; j += 1) {
      let g = j + 1;
      let guideline = guidelines[j];

      gInfo = pInfo.guidelines[(p + '.' + g)] = {};

      gInfo.id          = 'OpenAjax.a11y.WCAG20_GUIDELINE.G_' + p + '_' + g;
      gInfo.title       = removePrefix(cleanString(guideline.querySelector('h3').textContent));
      gInfo.description = cleanString(guideline.querySelector('p').textContent);
      gInfo.url_spec    = wcag21 + '#' + guideline.id;

      gInfo.success_criteria = {};

      let success_criteria = guideline.querySelectorAll('section.sc');

      console.log(gInfo.title + ' (' + success_criteria.length + ')');

      for (let k = 0; k < success_criteria.length; k += 1) {
        let sc = k + 1;
        let success_criterion = success_criteria[k];

        scInfo = gInfo.success_criteria[(p + '.' + g + '.' + sc)] = {};

        let level = success_criterion.querySelectorAll('p')[0].textContent;
        if (level.indexOf('AAA') >= 0) {
          level = 'OpenAjax.a11y.WCAG20_LEVEL.AAA';
        } else {
          if (level.indexOf('AA') >= 0) {
            level = 'OpenAjax.a11y.WCAG20_LEVEL.AA';
          } else {
            level = 'OpenAjax.a11y.WCAG20_LEVEL.A';
          }
        }

        scInfo.id             = 'OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_' + p + '_' + g + '_' + sc;
        scInfo.level          = level;
        scInfo.title          = removePrefix(cleanString(success_criterion.querySelector('h4').textContent));
        scInfo.description    = cleanString(success_criterion.querySelectorAll('p')[1].textContent);
        scInfo.url_spec       = wcag21 + '#' + success_criterion.id;
        scInfo.url_understand = success_criterion.querySelectorAll('div.doclinks a')[0].getAttribute('href');
        scInfo.url_meet       = success_criterion.querySelectorAll('div.doclinks a')[1].getAttribute('href');
        scInfo.references     = [];

        console.log(scInfo.title);
        console.log(scInfo.url_understand);
        console.log(scInfo.url_meet);
      }
    }
  }

 return wcagInfo;
}

function convertToCode(wcagInfo) {

  code = '';

  function processString(spaces, id, s) {
    if (s.indexOf('OpenAjax') >= 0) {
      code += '\n' + spaces + id + ': ' + s;
    } else {
      code += '\n' + spaces + id + ': \'' + s + '\'';
    }
  }

  function processArray(spaces, id, a) {
      code += '\n' + spaces + id + ': [';
      a.forEach((val, key, arr) => {
        code += spaces + '\'' + val + '\'';
        if (!Object.is(arr.length - 1, key)) {
          code += ',';
        }
      });
      code += spaces + ']';
  }

  function processObject(spaces, id, o) {

      let first = true;

      if (id.indexOf('.') >= 0 || !isNaN(id)) {
        code += '\n' + spaces + '\'' + id + '\': {';
      } else {
        code += '\n' + spaces + id + ': {';
      }
      for(item in o) {

        if (!first) {
          code += ',';
        }

        switch (typeof o[item]) {
          case 'string':
            processString(spaces + '  ', item, o[item])
            break;

          case 'object':
            if (o[item].length) {
              processArray(spaces + '  ', item,  o[item])
            } else {
              processObject(spaces + '  ', item,  o[item])
            }
            break;

          default:
            break;

        }

        first = false;

      };
      code += '\n' + spaces + '}';
  }

  let first = true;

  for (const i in wcagInfo) {
    console.log(i + ' ' + typeof wcagInfo[i]);

    if (!first) {
      code += ',';
    }

    switch (typeof wcagInfo[i]) {
      case 'string':
        processString('  ', i, wcagInfo[i]);
        break;

      case 'object':
        if (wcagInfo[i].length) {
          processArray('  ', i,  wcagInfo[i]);
        } else {
          processObject('  ', i,  wcagInfo[i]);
        }
        break;

      default:
        break;

    }

    first = false;
  }

  return code;
}

function outputAsJS(code) {

  fs.writeFile('wcag.js', code, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  });
}

function outputAsJSON(wcagInfo) {

  fs.writeFile('wcag.json', JSON.stringify(wcagInfo, null, 4), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  });

  return wcagInfo;
}

fetch(wcag21)
  .then(data => data.text())
  .then(html => HTMLParser.parse(html))
  .then(dom  => getWCAGInformation(dom))
  .then(wcagInfo => outputAsJSON(wcagInfo))
  .then(wcagInfo => convertToCode(wcagInfo))
  .then(code => outputAsJS(code));
