/* ariaInHtml.js */

/* Imports */
import DebugLogging     from '../debug.js';
import {ariaInHTMLInfo} from '../aria-in-html/ariaInHtmlInfo.js';

/* Constants */
const debug = new DebugLogging('ariaInHtml', false);


export default function getAriaInHTMLInfo (parentInfo, node) {
    let elemInfo, type;

    const tagName = node.tagName.toLowerCase();
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


            tagName += '[type=' + type + ']';

            if (node.hasAttribute('list')) {
                tagName += '[list]';
            }

            elemInfo = elementInfo[tagName];
            break;

        case 'section':
            if (node.hasAttribute('aria-label') ||
                node.hasAttribute('aria-labelledby')) {
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

        case 'figure':

            if (node.querySelector('figcaption')) {
                elemInfo = elementInfo['figure[figcaption]'];
            } else {
                elemInfo = elementInfo['figure'];
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

    debug.flag && debug.log(`[elemInfo][id]: ${elemInfo.id} (${tagName})`);

    return elemInfo;
  }

