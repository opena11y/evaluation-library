#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

const fs = require('fs');
const path = require('path');

let aria12Info = {};
let ariaInHTMLInfo = {};

function getPropValue(prop)  {
  let propInfo = aria12Info.propertyDataTypes[prop];

  if (propInfo.defaultValue) {
    return propInfo.defaultValue;
  }

  return 'ID_MSG';
}

fs.readFile('aria12.json', 'utf-8', (err, data) => {

  if (err) {
    console.log('Error reading "aria12.json" file from disk: ${err}');
  } else {

    aria12Info = JSON.parse(data);

    fs.readFile('aria-in-html.json', 'utf-8', (err, data) => {

      if (err) {
        console.log('Error reading "aria-in-html.json" file from disk: ${err}');
      } else {

        ariaInHTMLInfo = JSON.parse(data);

        let body = '';
        var body_implicit = '';

        for (ariaRole in aria12Info.designPatterns) {
          let dp = aria12Info.designPatterns[ariaRole];
          let depProps = dp.deprecatedProps;
          let prop;
          if (depProps.length) {
            console.log('[role]: ' + ariaRole + ' (' + depProps.length + ')');

            body += `  \n<h2><code>${ariaRole}<code> role</h2>\n`;

            for (let i = 0; i < depProps.length; i += 1) {
              prop = depProps[i];
              body += `<div role="${ariaRole}" ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${ariaRole} with ${prop}: FAIL</div>\n`;
              body += `<div hidden role="${ariaRole}" ${prop}="${getPropValue(prop)}" class="WIDGET_15_HIDDEN">${ariaRole} with ${prop} is hidden: HIDDEN</div>\n`;
            }
          }
        }

        let html = `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US">
  <head>
      <title>WIDGET 15: Roles with deprecated ARIA attributes</title>
      <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
      <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=UTF-8">
  </head>
  <body>
    <h1>WIDGET 15: Roles with deprecated ARIA attributes</h1>
    ${body}
    <div id="ID_MSG">A test message</div>
  </body>
  </html>
          `
        let fname = path.join('..', 'testsuite', 'rules', 'widgets', 'widget_15_deprecated_aria_attributes.html');

        fs.writeFile(fname, html, (err) => {
          if (err) {
            console.log('Error reading file from disk: ${err}');
          } else {
            console.log('WIDGET 15 rule test file created: ' + fname);
          }
        });

      }
    });
  }
});
