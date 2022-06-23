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
let notAllowedTagNames = ' bdo body br datalist details head iframe math optgroup rp ruby rt summary track ';

function getResult (infoItem, role) {

  let result = 'NORESULT';

  if (infoItem.noRoleAllowed) {
    result = 'FAIL';
  }

  if ((!infoItem.anyRoleAllowed &&
       infoItem.allowedRoles &&
      (infoItem.allowedRoles.indexOf(role) < 0))
     ) {
    result = 'FAIL';
  }

  if ((infoItem.defaultRole !== 'generic') &&
      (infoItem.defaultRole === role)) {
    result = 'MC';
  }

  if ((infoItem.defaultRole === 'presentation') &&
      (role === 'none')) {
    result = 'MC';
  }
  return result;
}

function generateTestItems(testId, infoItem, spaces, childContent) {

  if (typeof spaces !== 'string') {
    spaces = '  ';
  }

  let html = '';
  let parts;

  let roleCount = 1;

  let id;

  for (let ariaRole in aria12Info.designPatterns) {

    id = 'id="test-' + testId + '-' + roleCount + '"';

    let result = getResult(infoItem, ariaRole);

    let tagName = infoItem.tagName;
    let accName = '';
    let sizeOrMultiple = '';

    let attr1 = infoItem.attr1 ? infoItem.attr1  : '';
    if (attr1.length) {
      if (attr1.indexOf('=') < 0) {
        attr1 = ' ' + attr1 + '="content"';
      } else {
        parts = attr1.split('=');
        if (parts[1] !== '""') {
          attr1 = ' ' + parts[0] + '="' + parts[1] + '"';
        } else {
          attr1 = ' ' + parts[0] + '=""';
        }
      }
    }

    let attr2 = infoItem.attr2 ? infoItem.attr2  : '';
    if (attr2.length) {
      if (attr2.indexOf('=') < 0) {
        attr2 = ' ' + attr2 + '="data-list"';
      } else {
        parts = attr2.split('=');
        if (parts[1] !== '""') {
          attr1 = ' ' + parts[0] + '="' + parts[1] + '"';
        } else {
          attr1 = ' ' + parts[0] + '=""';
        }
      }
    }

    if (infoItem.hasAccname) {
      accName = ` aria-label="Accessible name for ${tagName}"`;
    }

    if (infoItem.hasSizeOrMultiple) {
      if (roleCount % 2) {
        sizeOrMultiple = ` multiple=""`;
      } else {
        sizeOrMultiple = ` size="2"`;
      }
    }

    switch (tagName) {

      case 'audio':
        html += spaces + '<div>\n';
        html += spaces + `  <code>audio</code> with role=${ariaRole} (${result})\n`;
        html += spaces + `  <audio ${id} role="${ariaRole}" class="HTML_3_${result}" controls>\n`;
        html += spaces + '    <source src="../audio/audio-test.mp3" type="audio/mp3"/>\n';
        html += spaces + '  </audio>\n';
        html += spaces + '</div>\n';

        break;

      case 'img':
        html += spaces + '<div>\n';
        html += spaces + '  ' + `<${tagName} src="../images/blue.png" ${id} role="${ariaRole}" class="HTML_3_${result}"${attr1} ${attr2}${accName}/>\n`;
        html += spaces + '  ' + `<code>${tagName}${attr1 ? '[' + attr1 + ']' : ''}${attr2 ? '[' + attr2 + ']' : ''}${infoItem.hasAccname ? ' has accessible name' : ''}</code> with role=${ariaRole} (${result})\n`;
        html += spaces + '</div>\n';

        break;

      case 'video':
        html += spaces + '<div>\n';
        html += spaces + `  <code>video</code> with role=${ariaRole} (${result})\n`;
        html += spaces + `  <video ${id} role="${ariaRole}" class="HTML_3_${result}" controls>\n`;
        html += spaces + '    <source src="../audio/audio-test.mp3" type="audio/mp3"/>\n';
        html += spaces + '  </video>\n';
        html += spaces + '</div>\n';

        break;

      default:
        html += spaces + `<${tagName} ${id} role="${ariaRole}" class="HTML_3_${result}"${attr1} ${attr2}${accName}${sizeOrMultiple}>\n`;
        html += spaces + '  ' + `<code>${tagName}${attr1 ? '[' + attr1 + ']' : ''}${attr2 ? '[' + attr2 + ']' : ''}${infoItem.hasAccname ? ' has accessible name' : ''}</code> with role=${ariaRole} (${result})\n`;
        childContent ? html += spaces + '  ' + childContent + '\n' : '';
        html += spaces + `</${tagName}>\n`;
        break;

    }
    roleCount += 1;
  }
  return html;
}

function generateTableTestItems(testId, infoItem, spaces) {

  if (typeof spaces !== 'string') {
    spaces = '  ';
  }

  let html = '';

  for (let ariaRole in aria12Info.designPatterns) {

    let result = getResult(infoItem, ariaRole);

    html += spaces + `<table role="${ariaRole}" class="HTML_3_${result}">\n`;
    html += spaces + `  <caption><code>table</code> with role=${ariaRole} (${result})</caption>\n`;
    html += spaces + '  <tr>\n';
    html += spaces + '    <th>cell 11</td>\n';
    html += spaces + '    <td>cell 12</td>\n';
    html += spaces + '  </tr>\n';
    html += spaces + '</table>\n';

  }

  return html;

}

function generateListTestItems(testId, infoItem) {

  let html = '';
  html += '<ul>\n';
  html += generateTestItems(testId, infoItem);
  html += '</ul>\n';

  return html;

}

function generateTableRowTestItems(testId, infoItem, role) {
  let html = '';
  html += role ? `<table role="${role}">\n` : '<table>\n';
  html += generateTestItems(testId, infoItem, '  ');
  html += '</table>\n';

  return html;

}

function generateTableCellTestItems(testId, infoItem, role) {

  let html = '';
  html += role ? `<table role="${role}">\n` : '<table>\n';
  html += '  <tbody>\n';
  html += '    <tr>\n';
  html += generateTestItems(testId, infoItem, '      ');
  html += '    </tr>\n';
  html += '  </tbody>\n';
  html += '</table>\n';

  return html;

}

/*
function generateTableHeaderCellTestItems(testId, infoItem, role) {

  let html = '';
  html += role ? `<table role="${role}">\n` : '<table>\n';
  html += '  <thead>\n';
  html += '    <tr>\n';
  html += generateTestItems(testId, infoItem, '      ');
  html += '    </tr>\n';
  html += '  </thead>\n';
  html += '</table>\n';

  return html;

}
*/

function generateTestItemsInElementRole(testId, infoItem, elem, role) {

  let html = '';
  html += role ? `<${elem} role="${role}">\n` : `<${elem}>\n`;
  html += '  ' + generateTestItems(testId, infoItem, '  ');
  html += `</${elem}>\n`;

  return html;

}


function generateSectionHeading(infoItem) {

  let attr1 = infoItem.attr1 ? '[' + infoItem.attr1 + ']' : '';

  let attr2 = infoItem.attr2 ? '[' + infoItem.attr2 + ']' : '';

  let context = infoItem.hasAccname ? ` with accessible name` : '';

  context = infoItem.ownedbyGrid ? ` ownedby <code>role=grid</code> or <code>role=treegrid</code>` : context;
  context = infoItem.ownedbyTable ? ` ownedby <code>role=table</code>` : context;
  context = infoItem.hasFigcaption ? ` has descendant <code>figcaption</code>` : context;
  context = infoItem.hasSizeOrMultiple ? ` has <code>size=2</code> or <code>multiple</code> attribute` : context;

  let html = `\n\n  <h2><code>${infoItem.tagName}${attr1}${attr2}</code> element ${context}</h2>\n\n`;
  return html;
}

function createTestCases(name, testItems) {

  let body = ``;

  let itemCount = 1;

  for (let item in ariaInHTMLInfo.elementInfo) {

    let infoItem = ariaInHTMLInfo.elementInfo[item];

    if (testItems.indexOf(item) < 0 || (notAllowedTagNames.indexOf(' ' + infoItem.tagName + ' ') >= 0)) {
      continue;
    }

    if (infoItem.attr1 === 'type=hidden') {
      continue;
    }

    console.log('\n[itemInfo]: ' + item);
    console.log('[itemInfo][       tagName]: ' + infoItem.tagName);
    console.log('[itemInfo][   defaultRole]: ' + infoItem.defaultRole);
    console.log('[itemInfo][         attr1]: ' + (infoItem.attr1 ? infoItem.attr1 : '-'));
    console.log('[itemInfo][         attr2]: ' + (infoItem.attr2 ? infoItem.attr2 : '-'));
    console.log('[itemInfo][ noRoleAllowed]: ' + infoItem.noRoleAllowed);
    console.log('[itemInfo][anyRoleAllowed]: ' + infoItem.anyRoleAllowed);
    console.log('[itemInfo][    hasAccname]: ' + infoItem.hasAccname);
    console.log('[itemInfo][  allowedRoles]: ' + (infoItem.allowedRoles ? infoItem.allowedRoles.toString() : '-'));

    body += generateSectionHeading(infoItem);

    switch (item) {

      case 'figure[figcaption]':
        body += generateTestItems(itemCount, infoItem, '  ', '<figcaption>Text content for <code>figcaption</code></figcaption>');
        break;

      case 'figcaption':
        body += generateTestItemsInElementRole(itemCount, infoItem, 'figure');
        break;

      case 'header[banner]':
      case 'footer[contentinfo]':
        body += generateTestItemsInElementRole(itemCount+'a', infoItem, 'div');
        break;

      case 'header':
      case 'footer':
        body += generateTestItemsInElementRole(itemCount+'a', infoItem, 'main');
        body += generateTestItemsInElementRole(itemCount+'b', infoItem, 'div', 'main');
        body += generateTestItemsInElementRole(itemCount+'c', infoItem, 'aside');
        body += generateTestItemsInElementRole(itemCount+'d', infoItem, 'div', 'complementary');
        body += generateTestItemsInElementRole(itemCount+'e', infoItem, 'div', 'region');
        body += generateTestItemsInElementRole(itemCount+'b', infoItem, 'section');
        break;

      case 'li':
        body += generateListTestItems(itemCount, infoItem);
        break;

      case 'tr':
      case 'tbody':
      case 'thead':
        body += generateTableRowTestItems(itemCount, infoItem, 'none');
        break;

      case 'tr[grid]':
        body += generateTableRowTestItems(itemCount+'a', infoItem, 'grid');
        body += generateTableRowTestItems(itemCount+'b', infoItem, 'treegrid');
        break;

      case 'tr[table]':
        body += generateTableRowTestItems(itemCount, infoItem);
        break;

      case 'td':
      case 'th':
        body += generateTableCellTestItems(itemCount, infoItem, 'none');
        break;

      case 'td[cell]':
      case 'th[cell]':
        body += generateTableCellTestItems(itemCount, infoItem);
        break;

      case 'td[gridcell]':
      case 'th[gridcell]':
        body += generateTableCellTestItems(itemCount+'a', infoItem, 'grid');
        body += generateTableCellTestItems(itemCount+'b', infoItem, 'treegrid');
        break;

      case 'table':
        body += generateTableTestItems(itemCount, infoItem);
        break;

      default:
        body += generateTestItems(itemCount, infoItem, '  ');
        break;

    }

    itemCount += 1;
  }

        let html = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US" xml:lang="en-US">
<head>
    <title>HTML 3: ARIA in HTML role restrictions</title>
    <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE">
    <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=UTF-8">
</head>
<body>
  <h1>HTML 3: ARIA in HTML role restrictions</h1>
  ${body}
</body>
</html>
        `

  let fname = path.join('..', 'testsuite', 'rules', 'html', 'html_3_aria_in_html_' + name + '.html');

  console.log('[fanme]: ' + fname);

  fs.writeFile(fname, html, (err) => {
    if (err) {
      console.log('Error reading file from disk: ${err}');
    } else {
      console.log('HTML 3 rule test file created: ' + name);
    }
  });
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

        let completedItems = [];

        let  linkItems = ['a', 'a[href]', 'area', 'area[href]'];
        createTestCases('a_area', linkItems);
        completedItems = completedItems.concat(linkItems);

        let figureItems = ['figure', 'figure[figcaption]', 'figcaption'];
        createTestCases('figure', figureItems);
        completedItems = completedItems.concat(figureItems);

        let imgItems = ['img', 'img[alt]', 'img[emptyalt]', 'img[accname]'];
        createTestCases('img', imgItems);
        completedItems = completedItems.concat(imgItems);

        let inputItems = [];
        let inputListItems = [];
        for(let item in ariaInHTMLInfo.elementInfo) {
          if (ariaInHTMLInfo.elementInfo[item].tagName === 'input') {
            if (item.indexOf('list') < 0) {
              inputItems.push(item)
              completedItems.push(item);
            } else {
              inputListItems.push(item)
              completedItems.push(item);
            }
          }
        }
        createTestCases('input', inputItems);
        createTestCases('input_list', inputListItems);

        let selectItems = ['select', 'select[size-or-multiple]']
        createTestCases('select', selectItems);
        completedItems = completedItems.concat(selectItems);

        let sectionItems = ['section', 'section[accname]'];
        createTestCases('section', sectionItems);
        completedItems = completedItems.concat(sectionItems);

        let tableItems = ['table', 'tr', 'tr[table]', 'thead', 'tbody', 'td', 'th', 'td[cell]', 'th[cell]', 'td[gridcell]', 'th[gridcell]'];
        createTestCases('table_row_th_td', tableItems);
        completedItems = completedItems.concat(tableItems);

        let mediaItems = ['audio', 'video'];
        createTestCases('media', mediaItems);
        completedItems = completedItems.concat(mediaItems);

        let landmarkItems = ['header', 'header[banner]', 'footer', 'footer[contentinfo]'];
        createTestCases('header_footer', landmarkItems);
        completedItems = completedItems.concat(landmarkItems);


        let noRoleItems = [];
        for(let item in ariaInHTMLInfo.elementInfo) {
          if (ariaInHTMLInfo.elementInfo[item].noRoleAllowed && (completedItems.indexOf(item) < 0)) {
            noRoleItems.push(item)
            completedItems.push(item);
          }
        }
        createTestCases('no_role_allowed', noRoleItems);

        let anyRoleItems = [];
        for(let item in ariaInHTMLInfo.elementInfo && (completedItems.indexOf(item) < 0)) {
          if (ariaInHTMLInfo.elementInfo[item].anyRoleAllowed) {
            anyRoleItems.push(item)
            completedItems.push(item);
          }
        }
        createTestCases('any_role_allowed', anyRoleItems);

      }

    });
  }
});
