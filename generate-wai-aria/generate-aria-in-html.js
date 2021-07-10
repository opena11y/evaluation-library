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
    if (firstCell) {
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
    if (!ariaInfo[tagName]) {
      ariaInfo[tagName] = [];
    }

    let newInfo = {};

    newInfo.attr = '';
    newInfo.attr_value = '';

    if (parts.length === 2) {
      parts  = parts[1].split('=');
      newInfo.attr = parts[0];
      if (parts.length === 2) {
        newInfo.attr_value = parts[1];
      }
    } else {
      attr = elem.querySelector("th:nth-child(1) code:nth-child(2)");
      if (attr && hasAttr) {
        newInfo.attr = attr.textContent;
      }
    }

    let defaultRole = elem.querySelector("td:nth-child(2) code");
    if (defaultRole) {
      defaultRole = defaultRole.textContent.replace('role=', '');
    } else {
      defaultRole = 'generic';
    }

    newInfo.defaultRole = defaultRole;

    allowedRoles = [];

    let roles = elem.querySelector("td:nth-child(3) p");
    if (roles) {
      if (roles.textContent.indexOf('Roles:') >= 0) {
        roles = roles.querySelectorAll('code');
        for (let j = 0; j < roles.length; j += 1) {
          allowedRoles.push(roles[j].textContent.toLowerCase().trim());
        }
      }
    }

    newInfo.allowedRoles = allowedRoles;

    ariaInfo[tagName].push(newInfo);
  }

}


function getAriaInformation(dom) {
  ariaInfo = {};
  ariaInfo.title = dom.querySelector('h1.title').textContent;
  ariaInfo.status = dom.querySelector('h1.title + h2').textContent.trim().replace('\n', '');
  ariaInfo.reference = ariaInHTML;
  ariaInfo.elementDefaultRoles = {};

  getElementInfo(dom, ariaInfo.elementDefaultRoles);

  return ariaInfo
}

function outputAsJSON(ariaInfo) {

  fs.writeFile('aria-in-html.json', JSON.stringify(ariaInfo, null, 4), err => {
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
