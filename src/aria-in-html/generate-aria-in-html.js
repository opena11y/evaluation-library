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
const outputFilename = './src/aria-in-html/ariaInHtmlInfo.js';
const exportPrefix = '/* generated file, use npm run aria-in-html */\nexport const ariaInHTMLInfo = ';

let ariaInHTML = 'https://www.w3.org/TR/html-aria/';
let elementInfoSelector = '#document-conformance-requirements-for-use-of-aria-attributes-in-html table.simple';

function getElementInfo(dom, ariaInfo) {

  let table = dom.querySelector(elementInfoSelector);
  let elements = table.querySelectorAll('tbody tr');
  console.log(elements.length);

  for (let i = 0; i < elements.length; i += 1) {
    let hasAttr = false;
    let parts;
    let elem = elements[i];

    let firstCell = elem.querySelector("th:nth-child(1)");
    if (firstCell && firstCell.textContent) {
       hasAttr = (firstCell.textContent.indexOf('with') >= 0) && (firstCell.textContent.indexOf('without') < 0);
    }

    let tagName = elem.querySelector("th:nth-child(1) code:nth-child(1)");
    if (tagName) {
      tagName = tagName.textContent;
      parts = tagName.split(' ');
      if (parts.length === 2) {
        tagName = parts[0];
      }
    } else {
      continue;
    }

    console.log('[tag]: ' + tagName);

    let refName = tagName;
    let newInfo = {};
    newInfo.tagName = tagName;

    let defaultRole = elem.querySelector("td:nth-child(2) code");
    if (defaultRole && defaultRole.textContent) {
      defaultRole = defaultRole.textContent.replace('role=', '');
    } else {
      defaultRole = 'generic';
    }

    newInfo.defaultRole = defaultRole;

    newInfo.noRoleAllowed = elem.querySelector("td:nth-child(3) p strong.nosupport") ? true : false;
    newInfo.anyRoleAllowed = elem.querySelector("td:nth-child(3) a[href=#dfn-any-role]") ? true : false;

    // Elements with role restrictions
    if (!newInfo.noRoleAllowed && !newInfo.anyRoleAllowed) {
      allowedRoles = [];

      let roles = elem.querySelector("td:nth-child(3) p");
      if (roles && roles.textContent) {
        if ((roles.textContent.indexOf('Roles:') >= 0) ||
            (roles.textContent.indexOf('Role:') >= 0)) {
          roles = roles.querySelectorAll('code');
          for (let j = 0; j < roles.length; j += 1) {
            let role = roles[j].textContent.toLowerCase().trim();
            if (role.indexOf('aria-') < 0) {
              allowedRoles.push(role);
            }
          }
        }
      }

      newInfo.allowedRoles = allowedRoles;
    }


    // a and area element special case

    if (tagName === 'a' || tagName === 'area') {
      attr = elem.querySelector("th:nth-child(1) code:nth-child(2)");
      if (attr && hasAttr) {
        refName += '[href]';
        newInfo.attr1 = 'href';
      }
    }

    // img element special case

    if (tagName === 'img' && firstCell.textContent) {
      if (firstCell.textContent.indexOf('some text') >= 0) {

        refName += '[alt]';

        let imgAccnameInfo = {};
        Object.assign(imgAccnameInfo, newInfo);

        newInfo.attr1 = 'alt';

        let refAccname = 'img[accname]';
        ariaInfo[refAccname] = imgAccnameInfo;
        ariaInfo[refAccname].hasAccname = true;
        ariaInfo[refAccname].id = refAccname;

      } else {

        if (firstCell.textContent.indexOf('""') >= 0) {
          refName += '[emptyalt]';
          newInfo.attr1 = 'alt=""';
          newInfo.noRoleAllowed = true;
          newInfo.anyRoleAllowed = false;
          delete newInfo.allowedRoles;
        } else {
          newInfo.defaultRole = 'img';
        }

      }
    }

    // header and footer element special case

    if (tagName === 'header') {

      newInfo.defaultRole = 'generic';

      let bannerInfo = {};
      Object.assign(bannerInfo, newInfo);
      bannerInfo.defaultRole = 'banner';

      let refHeader = 'header[banner]';
      ariaInfo[refHeader] = bannerInfo;
      ariaInfo[refHeader].isLandmark = true;
      ariaInfo[refHeader].id = refHeader;
    }

    if (tagName === 'footer') {

      newInfo.defaultRole = 'generic';

      let footerInfo = {};
      Object.assign(footerInfo, newInfo);
      footerInfo.defaultRole = 'contentinfo';

      let refContentinfo = 'footer[contentinfo]';
      ariaInfo[refContentinfo] = footerInfo;
      ariaInfo[refContentinfo].isLandmark = true;
      ariaInfo[refContentinfo].id = refContentinfo;
    }

    // figure element special case

    if (tagName === 'figure') {
      newInfo.defaultRole = 'figure';
      newInfo.noRoleAllowed = false;
      newInfo.anyRoleAllowed = true;

      let captionInfo = {};
      captionInfo.tagName = 'figure';
      captionInfo.defaultRole = 'figure';
      captionInfo.noRoleAllowed = true;
      captionInfo.anyRoleAllowed = false;
      captionInfo.hasFigcaption = true;
      ariaInfo['figure[figcaption]'] = captionInfo;
      ariaInfo['figure[figcaption]'].id = 'figure[figcaption]';
    }

    // row, th and td element special case

    if (tagName === 'td') {
      newInfo.defaultRole = 'generic';
      newInfo.noRoleAllowed = false;
      newInfo.anyRoleAllowed = true;

      let cellInfo = {};
      cellInfo.tagName = 'td';
      cellInfo.defaultRole = 'cell';
      cellInfo.noRoleAllowed = true;
      cellInfo.anyRoleAllowed = false;
      cellInfo.ownedbyTable = true;
      ariaInfo['td[cell]'] = cellInfo;
      ariaInfo['td[cell]'].id = 'td[cell]';

      let gridInfo = {};
      gridInfo.tagName = 'td';
      gridInfo.defaultRole = 'gridcell';
      gridInfo.noRoleAllowed = true;
      gridInfo.anyRoleAllowed = false;
      gridInfo.ownedbyGrid = true;
      gridInfo.ownedbyTreegrid = true;
      ariaInfo['td[gridcell]'] = gridInfo;
      ariaInfo['td[gridcell]'].id = 'td[gridcell]';

    }

    if (tagName === 'th') {
      newInfo.defaultRole = 'generic';
      newInfo.noRoleAllowed = false;
      newInfo.anyRoleAllowed = true;

      let cellInfo = {};
      cellInfo.tagName = 'th';
      cellInfo.defaultRole = 'cell';
      cellInfo.noRoleAllowed = true;
      cellInfo.anyRoleAllowed = false;
      cellInfo.ownedbyTable = true;
      ariaInfo['th[cell]'] = cellInfo;
      ariaInfo['th[cell]'].id = 'th[cell]';

      let gridInfo = {};
      gridInfo.tagName = 'th';
      gridInfo.defaultRole = 'gridcell';
      gridInfo.noRoleAllowed = true;
      gridInfo.anyRoleAllowed = false;
      gridInfo.ownedbyGrid = true;
      gridInfo.ownedbyTreegrid = true;
      ariaInfo['th[gridcell]'] = gridInfo;
      ariaInfo['th[gridcell]'].id = 'th[gridcell]';

      let colInfo = {};
      colInfo.tagName = 'th';
      colInfo.defaultRole = 'colheader';
      colInfo.noRoleAllowed = true;
      colInfo.anyRoleAllowed = false;
      colInfo.ownedbyTable = true;
      colInfo.ownedbyGrid = true;
      colInfo.ownedbyTreegrid = true;
      ariaInfo['th[colheder]'] = colInfo;
      ariaInfo['th[colheder]'].id = 'th[colheder]';

      let rowInfo = {};
      rowInfo.tagName = 'th';
      rowInfo.defaultRole = 'rowheader';
      rowInfo.noRoleAllowed = true;
      rowInfo.anyRoleAllowed = false;
      rowInfo.ownedbyTable = true;
      rowInfo.ownedbyGrid = true;
      rowInfo.ownedbyTreegrid = true;
      rowInfo['th[rowheder]'] = rowInfo;
      rowInfo['th[rowheder]'].id = 'th[rowheder]';

    }

    if (tagName === 'tr') {
      newInfo.defaultRole = 'generic';
      newInfo.noRoleAllowed = false;
      newInfo.anyRoleAllowed = true;

      let tableInfo = {};
      tableInfo.tagName = 'tr';
      tableInfo.defaultRole = 'row';
      tableInfo.noRoleAllowed = true;
      tableInfo.anyRoleAllowed = false;
      tableInfo.ownedbyTable = true;
      tableInfo.ownedbyGrid = true;
      tableInfo.ownedbyTreegrid = true;
      ariaInfo['tr[table]'] = tableInfo;
      ariaInfo['tr[table]'].id = 'tr[table]';
    }

    // section element special case

    if (tagName === 'section') {
      newInfo.defaultRole = 'generic';

      let regionInfo = {};
      Object.assign(regionInfo, newInfo);
      regionInfo.hasAccname = true;
      regionInfo.defaultRole = 'region';

      let refRegion = 'section[accname]'
      ariaInfo[refRegion] = regionInfo;
      ariaInfo[refRegion].id = refRegion;
    }

    // input element special cases

    if (tagName === 'input') {
      let type = parts[1].split('=');
      if (type.length === 2) {
        refName += '[type=' + type[1] + ']';
        newInfo.attr1 = 'type=' + type[1];
      }

      if ('text search tel url email'.indexOf(type[1]) >= 0) {
        let comboboxInfo = {};
        Object.assign(comboboxInfo, newInfo);
        comboboxInfo.defaultRole = 'combobox';
        let refNameList = refName + '[list]';
        ariaInfo[refNameList] = comboboxInfo;
        ariaInfo[refNameList].tagName = tagName;
        ariaInfo[refNameList].attr2 = 'list';
        ariaInfo[refNameList].id = refNameList;
      }
    }

    if (tagName === 'select' && ariaInfo['select']) {
      refName += '[size-or-multiple]';
      newInfo.hasSizeOrMultiple = true;
    }

    // Heading exception since the rolw using h1-h6

    if (tagName.indexOf('h6') > 0) {
      ariaInfo['h1'] = newInfo;
      ariaInfo['h1'].tagName ='h1';
      ariaInfo['h1'].id ='h1';

      let h2Info = {};
      Object.assign(h2Info, newInfo);
      h2Info.tagName = 'h2';
      ariaInfo['h2'] = h2Info;
      ariaInfo['h2'].id ='h2';

      let h3Info = {};
      Object.assign(h3Info, newInfo);
      h3Info.tagName = 'h3';
      ariaInfo['h3'] = h3Info;
      ariaInfo['h3'].id ='h3';

      let h4Info = {};
      Object.assign(h4Info, newInfo);
      h4Info.tagName = 'h4';
      ariaInfo['h4'] = h4Info;
      ariaInfo['h4'].id ='h4';

      let h5Info = {};
      Object.assign(h5Info, newInfo);
      h5Info.tagName = 'h5';
      ariaInfo['h5'] = h5Info;
      ariaInfo['h5'].id ='h5';

      let h6Info = {};
      Object.assign(h6Info, newInfo);
      h6Info.tagName = 'h6';
      ariaInfo['h6'] = h6Info;
      ariaInfo['h6'].id ='h6';

    } else {
      if (!ariaInfo[refName]) {
        ariaInfo[refName] = newInfo;
        ariaInfo[refName].id = refName;
      } else {
        console.log('Duplicate Reference: ' + refName);
      }
    }

  }

}


function getAriaInformation(dom) {
  ariaInfo = {};
  ariaInfo.title = dom.querySelector('h1.title').textContent;
  ariaInfo.status = dom.querySelector('h1.title + p').textContent.trim().replace('\n', '');
  ariaInfo.reference = ariaInHTML;
  ariaInfo.anyRoleAllowed = false;
  ariaInfo.noRoleAllowed = false;
  ariaInfo.elementInfo = {};

  getElementInfo(dom, ariaInfo.elementInfo);

  return ariaInfo
}

function outputAsJSON(ariaInfo) {

  fs.writeFile(outputFilename, exportPrefix + JSON.stringify(ariaInfo, null, 4), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
}

fetch(ariaInHTML)
  .then(data => data.text())
  .then(html => HTMLParser.parse(html))
  .then(dom => getAriaInformation(dom))
  .then(ariaInfo => outputAsJSON(ariaInfo));
