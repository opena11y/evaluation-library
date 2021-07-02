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
  if (refs.length === 0) {
    refs = elem.querySelectorAll('tbody tr:nth-child(2) .role-reference');
  }
  if (refs.length) {
    for (let i = 0; i < refs.length; i += 1) {
      let ref = refs[i];
      if (ref) {
        superClasses.push(ref.textContent.trim());
      }
    }
  } else {
    superClasses.push('unknown');
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


function hasValue(value, elemNode, selector) {

  let node = elemNode.querySelector(selector);
  if (node) {
    return node.textContent.toLowerCase().indexOf(value) >= 0;
  }
  return false;
}

function getRoles(dom, roles) {

  let elems = dom.querySelectorAll('section.role');
  for (let i = 0; i < elems.length; i += 1) {
    let elem = elems[i];
    let  role = elem.querySelector('h4.role-name code').textContent.trim();

    if (role === 'none' || role === 'roletype') {
      continue;
    }

    roles[role] = {};

    roles[role].allowedProps = [];
    roles[role].deprecatedProps = [];

    roles[role].props = [];

    roles[role].requiredProps = [];

    roles[role].nameRequired = false;
    roles[role].nameFromContent = false;
    roles[role].nameProhibited = false;

    roles[role].childrenPresentational = false;

    roles[role].requiredContext = [];
    roles[role].requiredChildren = [];
    roles[role].roleType = getRoleType(elem);
    roles[role].isAbstract = isAbstract(elem);


    console.log('[role]: ' + role + ' (' + roles[role].roleType + ') ' + (roles[role].isAbstract ? 'ABSTRACT' : ''));


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
    // Fix for tab role
    if (role === 'tab') {
        roles[role].nameRequired = true;
    }

    let childrenPresentationalNode = dom.querySelector('#' + role + ' .role-childpresentational');
    if (childrenPresentationalNode) {
      if (childrenPresentationalNode.textContent.trim().toLowerCase().indexOf('true') >= 0) {
        roles[role].childrenPresentational = true;
      }
    }

    roles[role].requiredContext = getListOfValues(dom, '#' + role + ' .role-scope');
    roles[role].requiredChildren = getListOfValues(dom, '#' + role + ' .role-mustcontain');

    roles[role].nameFromContent = hasValue ('content', dom, '#' + role + ' .role-namefrom');
    roles[role].nameProhibited = hasValue ('prohibited', dom, '#' + role + ' .role-namefrom');

  }

  roles['none'] = roles['presentation'];

  // Update the roleType to abstract roles

  function getAbstractRoles(role) {

    if (role === 'live') {
      return '';
    }

    let roleTypes = '';

    if (' structure widget window landmark abstact'.indexOf(role) > 0) {
      roleTypes = role + ' ';
    } else {
      if (role.length) {
        let refs = roles[role].roleType.split(' ');

        for (let i = 0; i < refs.length; i++) {
          let ref = refs[i];
          roleTypes += getAbstractRoles(ref);
        }
      }
    }

    return roleTypes;

  }

  function removeDuplicates(roles) {
    let newItems = [];
    items = roles.split(' ');

    for (let i = 0; i < items.length; i += 1) {
      let item = items[i].trim();
      if (newItems.indexOf(item) < 0) {
        newItems.push(item);
      }
    }

    return newItems.join(' ').trim();
  }

  for (role in roles) {
    // fix roles that do not have widget as a base class
    if ('application log marquee tabpanel timer tooltip'.indexOf(role) >= 0) {
      roles[role].roleType += ' widget';
    }

    console.log('\n[' + role + '][roleType]: ' + roles[role].roleType);

    let abstractRoles = getAbstractRoles(role);
    if ('alert log marquee status timer'.indexOf(role) >= 0) {
      abstractRoles += 'live';
    }

    if ('article cell'.indexOf(role) >= 0) {
      abstractRoles += 'section';
    }

    roles[role].roleType = removeDuplicates(abstractRoles);

    console.log('[' + role + '][roleType]: ' + roles[role].roleType);
  }

  for (role in roles) {
    if (roles[role].isAbstract) {
      roles[role].roleType = 'abstract';
      console.log('[' + role + '][roleType]: ' + roles[role].roleType);
    }
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
    if (props[prop].type === 'integer') {
      let codeElems = dom.querySelectorAll('#' + prop + ' .property-description code');
      let flag = false;
      for (let i = 0; i < codeElems.length && !flag; i += 1) {
        if (codeElems[i].textContent === "-1") {
          flag = true;
        }
      }
      props[prop].allowUndeterminedValue = flag;
    }
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
