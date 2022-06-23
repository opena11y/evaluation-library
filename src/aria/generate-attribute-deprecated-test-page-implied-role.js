#!/usr/bin/env node
/*
 *   This content is licensed according to the W3C Software License at
 *   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 *   File:   reference-tables.js
 */

var require = require || {};

const fs = require('fs');
const path = require('path');

let aria12Info = {};
let ariaInHTMLInfo = {};

let allowedElements = " a article b blockquote code div dd dl dt em i ol span strong table td th tr ul li "

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

        for (let ariaRole in aria12Info.designPatterns) {
          let dp = aria12Info.designPatterns[ariaRole];
          let depProps = dp.deprecatedProps;
          if (depProps.length) {
            console.log('[role]: ' + ariaRole + ' (' + depProps.length + ')');

            for (let item in ariaInHTMLInfo.elementInfo) {

              let itemInfo = ariaInHTMLInfo.elementInfo[item];

              if (itemInfo.defaultRole === ariaRole && !itemInfo.attr1 && (allowedElements.indexOf(' ' + itemInfo.tagName + ' ') >= 0 )) {

                body += `  \n<h2><code>${itemInfo.tagName}<code> element with ${ariaRole} implicit role</h2>\n`;

                for (let i = 0; i < depProps.length; i += 1) {
                  let prop = depProps[i];

                  switch (itemInfo.tagName) {

                    case 'dd':
                    case 'dt':
                      body += `<dl>\n`;
                      body += `  <${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</${itemInfo.tagName}>\n`;
                      body += `</dl>\n`;
                      break;

                    case 'dl':
                      body += `<${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">\n  <dt>${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</dt>\n</${itemInfo.tagName}>\n`;
                      break;

                    case 'li':
                      body += `<ul>\n`;
                      body += `  <${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</${itemInfo.tagName}>\n`;
                      body += `</ul>\n`;
                      break;

                    case 'ol':
                    case 'ul':
                      body += `<${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">\n  <li>${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</li>\n</${itemInfo.tagName}>\n`;
                      break;

                    case 'td':
                    case 'th':
                      body += `<table>\n`;
                      body += `  <thead>\n`;
                      body += `    <tr>\n`;
                      body += `      <th>Test Heading</th>\n`;
                      body += `    </tr>\n`;
                      body += `  </thead>\n`;
                      body += `  <body>\n`;
                      body += `    <tr>\n`;
                      body += `      <${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</${itemInfo.tagName}>\n`;
                      body += `    </tr>\n`;
                      body += `  </tbody>\n`;
                      body += `</table>\n`;

                      body += `<table>\n`;
                      body += `  <tr>\n`;
                      body += `    <${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</${itemInfo.tagName}>\n`;
                      body += `  </tr>\n`;
                      body += `</table>\n`;

                      break;

                    case 'table':
                      body += `<${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">`;
                      body += `  <tr>\n    <td>${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</td>\n  </tr>\n`;
                      body += `</${itemInfo.tagName}>\n`;
                      break;

                    default:
                      body += `<${itemInfo.tagName}  ${prop}="${getPropValue(prop)}" class="WIDGET_15_FAIL">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop}: FAIL</${itemInfo.tagName}>\n`;
                      body += `<${itemInfo.tagName} hidden  ${prop}="${getPropValue(prop)}" class="WIDGET_15_HIDDEN">${itemInfo.tagName} (implicit ${ariaRole} role) with ${prop} is hidden: HIDDEN</${itemInfo.tagName}>\n`;

                      break;
                  }
                }
              }
            }
          }
        }

        let html = `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US">
  <head>
      <title>WIDGET 15: Elements with implicit roles with deprecated ARIA attributes</title>
      <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
      <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=UTF-8">
  </head>
  <body>
    <h1>WIDGET 15: Elements with implicit roles with deprecated ARIA attributes</h1>
    ${body}
    <div id="ID_MSG">A test message</div>
  </body>
  </html>
          `
        let fname = path.join('..', 'testsuite', 'rules', 'widgets', 'widget_15_deprecated_aria_attributes_implicit_roles.html');

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
