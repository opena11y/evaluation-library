/* ariaInHtml.js */

/* Imports */
import DebugLogging     from '../debug.js';
import {ariaInHTMLInfo} from '../ariaInfo/gen-aria-in-html-info.js';

/* Constants */
const debug = new DebugLogging('ariaInHtml', false);
const higherLevelElements = [
  'article',
  'aside',
  'footer',
  'header',
  'main',
  'nav',
  'region',
  'section'
  ];

const landmarkRoles = [
  'banner',
  'complementary',
  'contentinfo',
  'form',
  'main',
  'navigation',
  'region',
  'search'
  ];

/**
* @function getAriaInHTMLInfo
*
* @desc Uses the ARIA in HTML specification to identify a default role and provide
*       role restriction information
*
* @param  {Object}  node        - Element node from a browser DOM
*/

export default function getAriaInHTMLInfo (node) {
  let elemInfo, type, selector;

  let tagName = node.tagName.toLowerCase();
  const elementInfo = ariaInHTMLInfo.elementInfo;

  switch (tagName) {
    case 'a':
      if (node.href) {
        elemInfo = elementInfo['a[href]'];
      } else {
        elemInfo = elementInfo['a'];
      }
      break;

    case 'area':
      if (node.href) {
        elemInfo = elementInfo['area[href]'];
      } else {
        elemInfo = elementInfo['area'];
      }
      break;

    case 'header':
      if (isTopLevel(node)) {
        elemInfo = elementInfo['header[banner]'];
      } else {
        elemInfo = elementInfo['header'];
      }
      break;

    case 'figure':
      if (node.querySelector('figcaption')) {
        elemInfo = elementInfo['figure[figcaption]'];
      } else {
        elemInfo = elementInfo['figure'];
      }
      break;

    case 'footer':
      if (isTopLevel(node)) {
        elemInfo = elementInfo['footer[contentinfo]'];
      } else {
        elemInfo = elementInfo['footer'];
      }
      break;

    // This is a fix since you don't always want an accessible name on a form
    case 'form':
      if (node.hasAttribute('aria-label') ||
        node.hasAttribute('aria-labelledby')||
        node.hasAttribute('title')) {
        elemInfo = elementInfo['form'];
      } else {
        elemInfo = elementInfo['form'];
        elemInfo.defaultRole = 'generic';
      }
      break;

    case 'img':
      if (node.hasAttribute('aria-label') ||
          node.hasAttribute('aria-labelledby')) {
          elemInfo = elementInfo['img[accname]'];
      } else {
        if (node.hasAttribute('alt')) {
          if (node.alt.trim().length) {
            elemInfo = elementInfo['img[alt]'];
          } else {
            elemInfo = elementInfo['img[emptyalt]'];
          }
        } else {
          elemInfo = elementInfo['img'];
        }
      }
      break;

    case 'input':
      type = node.getAttribute('type');
      if (!type) {
        type = 'text';
      }
      selector = tagName + '[type=' + type + ']';
      if (node.hasAttribute('list')) {
        selector += '[list]';
      }

      elemInfo = elementInfo[selector];

      switch (type) {
        case 'color':
        case 'date':
        case 'datetime-local':
        case 'month':
        case 'password':
        case 'time':
        case 'week':
          elemInfo.defaultRole = 'textbox';
          break;

        case 'file':
          elemInfo.defaultRole = 'button';
          break;

        default:
          break;  
      }

      break;

    case 'li':
      if (isListitemInList(node)) {
        elemInfo = elementInfo[`${tagName}[listitem]`];
      } else {
        elemInfo = elementInfo[`${tagName}`];
      }
      break;


    case 'section':
      if (node.hasAttribute('aria-label') ||
        node.hasAttribute('aria-labelledby')||
        node.hasAttribute('title')) {
        elemInfo = elementInfo['section[accname]'];
      } else {
        elemInfo = elementInfo['section'];
      }
      break;

    case 'select':
      if (node.multiple || (node.size > 1)) {
        elemInfo = elementInfo['select[size-or-multiple]'];
      } else {
        elemInfo = elementInfo['select'];
      }
      break;

    case 'td':
    case 'th':
      if (isCellInGrid(node)) {
          elemInfo = elementInfo[`${tagName}[gridcell]`];
      } else {
        if (isCellInLayoutTable(node)) {
          elemInfo = elementInfo[tagName];
        } else {
          elemInfo = elementInfo[`${tagName}[cell]`];
        }
      }
      break;

    case 'tr':
      if (isCellInLayoutTable(node)) {
        elemInfo = elementInfo['tr'];
      } else {
        elemInfo = elementInfo[`tr[table]`];
      }
      break;

    default:
      elemInfo = elementInfo[tagName];

  }

  if (!elemInfo) {
      elemInfo = {
      "tagName": node.tagName,
      "defaultRole": "generic",
      "noRoleAllowed": false,
      "anyRoleAllowed": true,
      "id": "custom"
    }
  }

  if (debug.flag) {
    if (tagName === 'h2') {
      debug.tag(node);
    }
    debug.log(`[elemInfo][id]: ${elemInfo.id} (${tagName})`);
  }

  return elemInfo;
}


/**
* @function getString
*
* @desc Checks if a value is a string, if it is a string convert it to lowercase.
*       If not a string, return an empty string
*
* @param  {String}  value        - value to be checked
*/

function getString (value) {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return '';
}

/**
* @function isTopLevel
*
* @desc Tests the node to see if it is in the content of any other
*       elements with default landmark roles or is the descendant
*       of an element with a defined landmark role
*
* @param  {Object}  node        - Element node from a browser DOM
*/

function isTopLevel (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (higherLevelElements.includes(tagName) ||
        landmarkRoles.includes(role)) {
      return false;
    }
    node = node.parentNode;
  }
  return true;
}


/**
* @function isListiemInList
*
* @desc Returns true if the listitem is a descendant of OL, UL or MENU element
*
* @param  {Object}  node - Element node from a browser DOM
*
* @return {Boolean} see @desc
*/

function isListitemInList  (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    if (['menu', 'ol', 'ul'].includes(tagName)) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

/**
* @function isCellInGrid
*
* @desc Tests the table cell is part of a grid widget
*
* @param  {Object}  node - Element node from a browser DOM
*/

function isCellInGrid  (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (tagName === 'table') {
      return role === 'grid' || role === 'treegrid';
    }

    node = node.parentNode;
  }
  return false;
}

/**
* @function isCellInLayoutTable
*
* @desc Tests the table cell is part of a table that
*       has been identified as being used for layout
*
* @param  {Object}  node - Element node from a browser DOM
*/

function isCellInLayoutTable  (node) {
  node = node && node.parentNode;
  while (node && (node.nodeType === Node.ELEMENT_NODE)) {
    const tagName = getString(node.tagName);
    const role = getString(node.getAttribute('role'));

    if (tagName === 'table') {
      return role === 'none' || role === 'presentation';
    }
    node = node.parentNode;
  }
  return false;
}
