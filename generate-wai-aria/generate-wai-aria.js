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

let aria12 = 'https://www.w3.org/TR/wai-aria-1.2/';

function getRoleType(elem) {
  let superClasses = [];
  let  refs = elem.querySelectorAll('tbody tr:nth-child(1) .role-reference');
  for (let i = 0; i < refs.length; i += 1) {
    let ref = refs[i];
    if (ref) {
      superClasses.push(ref.textContent.trim());
    }
  }
  return superClasses.join(" ");
}

function isAbstract(elem) {
  if (elem.querySelector('.role-abstract')) {
    return true;
  }
  return false;
}

function isDeprecated(node) {
  if (node.querySelector('strong')) {
    return true;
  }
  return false;
}

function getList(node) {
  let nodes = node.querySelectorAll('li');
  if (nodes && nodes.length) {
    return nodes;
  }
  return false;
}

function getListOfValues(elemNode, selector) {
  let values = [];

  let node = elemNode.querySelector(selector);
  if (node) {
    let listItems = getList(node);
    if (listItems && listItems.length) {
      for (j = 0; j < listItems.length; j += 1) {
        let value = listItems[j].textContent.toLowerCase().trim();
        value = value.split(' ')[0];
        if (!values.includes(value)) {
          values.push(value);
        }
      }
    } else {
      values.push(node.textContent.trim());
    }
  }
  return values;
}

function getRoles(dom, roles) {

  let elems = dom.querySelectorAll('section.role');
  for (let i = 0; i < elems.length; i += 1) {
    let elem = elems[i];
    let  role = elem.querySelector('h4.role-name code').textContent.trim();


    roles[role] = {};

    roles[role].allowedProps = [];
    roles[role].deprecatedProps = [];

    roles[role].props = [];

    roles[role].requiredProps = [];

    roles[role].nameRequired = false;
    roles[role].nameFrom = [];

    roles[role].childrenPresentational = false;

    roles[role].requiredContext = [];
    roles[role].onlyContain = [];
    roles[role].roleType = getRoleType(elem);
    roles[role].isAbstract = isAbstract(elem);


    console.log('[role]: ' + role + ' (' + roles[role].roleType + ')');


    let ariaAttributeNodes = dom.querySelectorAll('#' + role + ' .role-inherited li');

    for (let j = 0; j < ariaAttributeNodes.length; j += 1) {
      let ariaAttributeNode = ariaAttributeNodes[j];
      let ariaAttribute = ariaAttributeNode.querySelector('code').textContent;

      roles[role].allowedProps.push(ariaAttribute);

      if (isDeprecated(ariaAttributeNode)) {
        roles[role].deprecatedProps.push(ariaAttribute);
      }
    }

    ariaAttributeNodes = dom.querySelectorAll('#' + role + ' .role-required-properties li');

    for (let j = 0; j < ariaAttributeNodes.length; j += 1) {
      let ariaAttributeNode = ariaAttributeNodes[j];
      let ariaAttribute = ariaAttributeNode.querySelector('code').textContent;

      roles[role].requiredProps.push(ariaAttribute);
      roles[role].allowedProps.push(ariaAttribute);
    }

    ariaAttributeNodes = dom.querySelectorAll('#' + role + ' .role-properties li');

    for (let j = 0; j < ariaAttributeNodes.length; j += 1) {
      let ariaAttributeNode = ariaAttributeNodes[j];
      let ariaAttribute = ariaAttributeNode.querySelector('code').textContent;

      roles[role].props.push(ariaAttribute);
      roles[role].allowedProps.push(ariaAttribute);
    }

    let nameRequiredNode = dom.querySelector('#' + role + ' .role-namerequired');
    if (nameRequiredNode) {
      if (nameRequiredNode.textContent.trim().toLowerCase().indexOf('true') >= 0) {
        roles[role].nameRequired = true;
      }
    }

    let childrenPresentationalNode = dom.querySelector('#' + role + ' .role-childpresentational');
    if (childrenPresentationalNode) {
      if (childrenPresentationalNode.textContent.trim().toLowerCase().indexOf('true') >= 0) {
        roles[role].childrenPresentational = true;
      }
    }

    roles[role].nameFrom = getListOfValues(dom, '#' + role + ' .role-namefrom');
    roles[role].requiredContext = getListOfValues(dom, '#' + role + ' .role-scope');
    roles[role].onlyContain = getListOfValues(dom, '#' + role + ' .role-mustcontain');
  }

  // Update the roleType to abstract roles

  for (role in roles) {
    let roleTypes = [];
    let refs = roles[role].roleType.split(' ');

    for (let i = 0; i < refs.length; i++) {
      let ref = refs[i];
      while (roles[ref] && !roles[ref].isAbstract) {
       ref = roles[ref].roleType.split(' ')[0];
      }

    }

    roles[role].roleType = roleTypes.join(' ');
  }

}

function getPropValues(elemNode, selector) {
  let values = [];
  let defaultValue = '';

  let nodes = elemNode.querySelectorAll(selector);
  for (j = 0; j < nodes.length; j += 1) {
    let value = nodes[j].textContent.toLowerCase().trim();
    let parts = value.split(' ');
    let value1 = parts[0];
    values.push(value1);
    if (value.indexOf('default') >= 0) {
      defaultValue = value1;
    }
  }
  return [values, defaultValue];
}

function getPropType(elemNode, selector) {
  let node = elemNode.querySelector(selector);
  let type = node.textContent.toLowerCase().trim();

  switch (type) {
    case 'true/false':
      type = 'boolean';
      break;

    case 'id reference':
      type = 'idref';
      break;

    case 'id reference list':
      type = 'idrefs';
      break;

    case 'token':
    case 'true/false/undefined':
      type = 'nmtoken';
      break;

    case 'token list':
      type = 'nmtokens';
      break;

    case 'integer':
      type = 'number';
      break;

    default:
      break;
  }

  return type;
}

function isPropDeprecated(elemNode, selector) {
  let node = elemNode.querySelector(selector);
  let content = node.textContent.toLowerCase().trim();

  return content.indexOf('deprecated') >= 0;
}


function getProps(dom, props) {
  let elems = dom.querySelectorAll('section.property h4 code, section.state h4 code');
  for (let i = 0; i < elems.length; i += 1) {
    let elem = elems[i];
    let prop = elem.textContent.toLowerCase().trim();

    console.log('[prop]: ', prop);

    props[prop] = {};
    props[prop].propType = dom.querySelector('#' + prop + ' h4 .type-indicator').textContent.toLowerCase().trim();
    props[prop].type = getPropType(dom, '#' + prop + ' .state-value, #' + prop + ' .property-value');
    [props[prop].values, props[prop].defaultValue] = getPropValues(dom, '#' + prop + ' .value-name');
    props[prop].deprecated = isPropDeprecated(dom, ('#desc-' + prop + ' p'));

  }
}

function getAriaInformation(dom) {
  ariaInfo = {};
  ariaInfo.title = dom.querySelector('h1.title').textContent;
  ariaInfo.status = dom.querySelector('h1.title + h2').textContent.trim().replace('\n', '');
  ariaInfo.reference = aria12;
  ariaInfo.propertyDataTypes = {};
  ariaInfo.designPatterns = {};

  getRoles(dom, ariaInfo.designPatterns);
  getProps(dom, ariaInfo.propertyDataTypes);

  return ariaInfo
}

function outputAsJSON(ariaInfo) {

  fs.writeFile('aria12.json', JSON.stringify(ariaInfo, null, 4), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
}

fetch(aria12)
  .then(data => data.text())
  .then(html => HTMLParser.parse(html))
  .then(dom => getAriaInformation(dom))
  .then(ariaInfo => outputAsJSON(ariaInfo));
