/* generate-attribute-deprecated-test-page.js */

var require = require || {};

const fs = require('fs');
const path = require('path');

const filenameAriaInfo       = path.join('.', 'aria-info', 'gen-aria-info.json');
const filenameAriaInHtmlInfo = path.join('.', 'aria-info', 'gen-aria-in-html-info.json');
const filenameTestCase       = path.join('.', 'testsuite', 'rules', 'widgets', 'widget_15_deprecated_aria_attributes.html');

var ariaInfo;
var ariaInHTMLInfo;

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

        console.log(ariaInHTMLInfo);

        let body = '';

        for (let ariaRole in ariaInfo.designPatterns) {
          let dp = ariaInfo.designPatterns[ariaRole];
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
        fs.writeFile(filenameTestCase, html, (err) => {
          if (err) {
            console.log(`Error reading ${filenameTestCase} file from disk: ${err}`);
          } else {
            console.log('WIDGET 15 rule test file created: ' + filenameTestCase);
          }
        });

      }
    });
  }
});
