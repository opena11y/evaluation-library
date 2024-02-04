/*  generate-attribute-deprecated-test-page-implied-role.js */

var require = require || {};

const fs = require('fs');
const path = require('path');

const filenameAriaInfo       = path.join('.', 'aria-info', 'gen-aria-info-1.2.json');
const filenameAriaInHtmlInfo = path.join('.', 'aria-info', 'gen-aria-in-html-info.json');
const filenameTestCase       = path.join('.', 'testsuite', 'rules', 'widgets', 'widget_15_deprecated_aria_attributes_implicit_roles.html');

let ariaInfo = {};
let ariaInHTMLInfo = {};

let allowedElements = " a article b blockquote code div dd dl dt em i ol span strong table td th tr ul li "

function getPropValue(prop)  {
  let propInfo = ariaInfo.propertyDataTypes[prop];

  if (propInfo.defaultValue) {
    return propInfo.defaultValue;
  }

  return 'ID_MSG';
}

fs.readFile(filenameAriaInfo, 'utf-8', (err, data) => {

  if (err) {
    console.log(`Error reading ${filenameAriaInfo} file from disk: ${err}`);
  } else {

    ariaInfo = JSON.parse(data);

    fs.readFile(filenameAriaInHtmlInfo, 'utf-8', (err, data) => {

      if (err) {
        console.log(`Error reading ${filenameAriaInHtmlInfo} file from disk: ${err}`);
      } else {

        ariaInHTMLInfo = JSON.parse(data);

        let body = '';

        for (let ariaRole in ariaInfo.designPatterns) {
          let dp = ariaInfo.designPatterns[ariaRole];
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
        fs.writeFile(filenameTestCase, html, (err) => {
          if (err) {
            console.log(`Error reading file ${filenameTestCase}from disk: ${err}`);
          } else {
            console.log('WIDGET 15 rule test file created: ' + filenameTestCase);
          }
        });

      }
    });
  }
});
