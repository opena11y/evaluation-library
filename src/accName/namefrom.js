/*
*   namefrom.js
*/

import {
  normalize,
  getAttributeValue
} from '../utils.js';

import {
  isEmbeddedControl,
  getEmbeddedControlValue
} from './embedded';


export {
  isLabelableElement,
  getElementContents,
  nameFromAttribute,
  nameFromAltAttribute,
  nameFromContents,
  nameFromDefault,
  nameFromDescendant,
  nameFromLabelElement,
  nameFromLegendElement,
  nameFromDetailsOrSummary
};

import DebugLogging        from '../debug.js';
const debug = new DebugLogging('nameFrom', false);

/*
*   isLabelableElement: Based on HTML5 specification, determine whether
*   element can be associated with a label.
*/
function isLabelableElement (element) {
  let tagName = element.tagName.toLowerCase(),
      type    = element.type;

  switch (tagName) {
    case 'input':
      return (type !== 'hidden');
    case 'button':
    case 'keygen':
    case 'meter':
    case 'output':
    case 'progress':
    case 'select':
    case 'textarea':
      return true;
    default:
      return false;
  }
}

/*
*   getElementContents: Construct the ARIA text alternative for element by
*   processing its element and text node descendants and then adding any CSS-
*   generated content if present.
*/
function getElementContents (element, forElement) {
  let result = '';

  if (isVisible(element)) {
    if (element.hasChildNodes()) {
      let children = element.childNodes,
          arrayOfStrings = [];

      for (let i = 0; i < children.length; i++) {
        let contents = getNodeContents(children[i], forElement);
        if (contents.length) arrayOfStrings.push(contents);
      }

      result = (arrayOfStrings.length) ? arrayOfStrings.join(' ') : '';
    }

    return addCssGeneratedContent(element, result);
  }
  return '';
}

// HIGHER-LEVEL FUNCTIONS THAT RETURN AN OBJECT WITH SOURCE PROPERTY

/*
*   nameFromAttribute
*/
function nameFromAttribute (element, attribute) {
  let name;

  name = getAttributeValue(element, attribute);
  if (name.length) return { name: name, source: attribute };

  return null;
}

/*
*   nameFromAltAttribute
*/
function nameFromAltAttribute (element) {
  let name = element.getAttribute('alt');

  // Attribute is present
  if (name !== null) {
    name = normalize(name);
    return { name: name, source: 'alt' };
  }

  // Attribute not present
  return null;
}

/*
*   nameFromContents
*/
function nameFromContents (element) {
  let name;

  name = getElementContents(element);
  if (name.length) return { name: name, source: 'contents' };

  return null;
}

/*
*   nameFromDefault
*/
function nameFromDefault (name) {
  return name.length ? { name: name, source: 'default' } : null;
}

/*
*   nameFromDescendant
*/
function nameFromDescendant (element, tagName) {
  let descendant = element.querySelector(tagName);
  if (descendant) {
    let name = getElementContents(descendant);
    if (name.length) return { name: name, source: tagName + ' element' };
  }

  return null;
}

/*
*   nameFromLabelElement
*/
function nameFromLabelElement (doc, element) {
  let name, label;

  // label [for=id]
  if (element.id) {
    try {
      label = doc.querySelector('[for="' + element.id + '"]');
      if (label) {
        name = getElementContents(label, element);
        if (name.length) return { name: name, source: 'label reference' };
      }
    } catch (error) {
      debug.log(`[nameFromLabelElement][error]: ${error}`);
    }
  }

  // label encapsulation
  if (typeof element.closest === 'function') {
    label = element.closest('label');
    if (label) {
      name = getElementContents(label, element);
      if (name.length) return { name: name, source: 'label encapsulation' };
    }
  }

  return null;
}

/*
*   nameFromLegendElement
*/
function nameFromLegendElement (doc, element) {
  let name, legend;

  // legend
  if (element) {
    legend = element.querySelector('legend');
    if (legend) {
      name = getElementContents(legend, element);
    if (name.length) return { name: name, source: 'legend' };
    }
  }
  return null;
}


/*
*   nameFromDetailsOrSummary: If element is expanded (has open attribute),
*   return the contents of the summary element followed by the text contents
*   of element and all of its non-summary child elements. Otherwise, return
*   only the contents of the first summary element descendant.
*/
function nameFromDetailsOrSummary (element) {
  let name, summary;

  function isExpanded (elem) { return elem.hasAttribute('open'); }

  // At minimum, always use summary contents
  summary = element.querySelector('summary');
  if (summary) name = getElementContents(summary);

  // Return either summary + details (non-summary) or summary only
  if (isExpanded(element)) {
    name += getContentsOfChildNodes(element, function (elem) {
      return elem.tagName.toLowerCase() !== 'summary';
    });
    if (name.length) return { name: name, source: 'contents' };
  }
  else {
    if (name.length) return { name: name, source: 'summary element' };
  }

  return null;
}

// LOW-LEVEL HELPER FUNCTIONS (NOT EXPORTED)

/*
*   isHidden: Checks to see if the node or any of it's ancestor
*   are hidden for the purpose of accessible name calculation
*/

function isHidden (node) {

  if (!node) {
    return false;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    if ((node.nodeType === Node.TEXT_NODE) &&
        (node.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      node = node.parentNode;
    }
    return false;
  }

  if (node.hasAttribute('hidden')) {
    return true;
  }

  if (node.hasAttribute('aria-hidden')) {
    return node.getAttribute('aria-hidden').toLowerCase() === 'true';
  }

  const style = window.getComputedStyle(node, null);

  const display = style.getPropertyValue("display");
  if (display === 'none') { 
    return true;
  }

  if (node.parentNode) {
    return isHidden(node.parentNode);
  }

  return false;
}

/*
*   isVisible: Checks to see if the node or any of it's ancestor
*   are visible for the purpose of accessible name calculation
*/

function isVisible (node) {
  return !isHidden(node);
}

/*
*   isHiddenCSSVisibilityProp: Checks to see if the node or any of it's ancestor
*   are visible based on CSS visibility property for the purpose of accessible name calculation
*/

function isHiddenCSSVisibilityProp(node) {

  if (!node) {
    return false;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    if ((node.nodeType === Node.TEXT_NODE) &&
        (node.parentNode.nodeType !== Node.ELEMENT_NODE)) {
      node = node.parentNode;
    }
    return false;
  }
  const style = window.getComputedStyle(node, null);

  const visibility = style.getPropertyValue("visibility");
  if (visibility) {
    return (visibility === 'hidden') || (visibility === 'collapse');
  }

  if (node.parentNode) {
    return isHidden(node.parentNode);
  }

  return false;
}

/*
*   getNodeContents: Recursively process element and text nodes by aggregating
*   their text values for an ARIA text equivalent calculation.
*   1. This includes special handling of elements with 'alt' text and embedded
*      controls.
*   2. The forElem parameter is needed for label processing to avoid inclusion
*      of an embedded control's value when the label is for the control itself.
*/
function getNodeContents (node, forElem) {
  let contents = '';
  let nc;
  let arr = [];

  if (isHidden(node) || 
      (node === forElem)) {
    return '';
  } 

  switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      if (node instanceof HTMLSlotElement) {
        // if no slotted elements, check for default slotted content
        const assignedNodes = node.assignedNodes().length ? node.assignedNodes() : node.assignedNodes({ flatten: true });
        assignedNodes.forEach( assignedNode => {
          nc = getNodeContents(assignedNode, forElem);
          if (nc.length) arr.push(nc);
        });
        contents = (arr.length) ? arr.join(' ') : '';
      } else {
        if (couldHaveAltText(node)) {
          contents = getAttributeValue(node, 'alt');
        }
        else {
          if (isEmbeddedControl(node)) {
            contents = getEmbeddedControlValue(node);
          }
          else {
            if (node.hasChildNodes()) {
              let children = Array.from(node.childNodes);
              children.forEach( child => {
                nc = getNodeContents(child, forElem);
                if (nc.length) arr.push(nc);
              });
              contents = (arr.length) ? arr.join(' ') : '';
            }
          }
        }
        // For all branches of the ELEMENT_NODE case...
      }
      contents = addCssGeneratedContent(node, contents);
      break;

    case Node.TEXT_NODE:
      if (!isHiddenCSSVisibilityProp(node.parentNode)) {
        contents = normalize(node.textContent);
      }
      break;

    default:
      break;  
  }

  return contents;
}

/*
*   couldHaveAltText: Based on HTML5 specification, determine whether
*   element could have an 'alt' attribute.
*/
function couldHaveAltText (element) {
  let tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case 'img':
    case 'area':
      return true;
    case 'input':
      return (element.type && element.type === 'image');
  }

  return false;
}

/*
*   addCssGeneratedContent: Add CSS-generated content for pseudo-elements
*   :before and :after. According to the CSS spec, test that content value
*   is other than the default computed value of 'none'.
*
*   Note: Even if an author specifies content: 'none', because browsers add
*   the double-quote character to the beginning and end of computed string
*   values, the result cannot and will not be equal to 'none'.
*/
function addCssGeneratedContent (element, contents) {
  let result = contents,
      prefix = getComputedStyle(element, ':before').content,
      suffix = getComputedStyle(element, ':after').content;

  if (prefix !== 'none') result = prefix + result;
  if (suffix !== 'none') result = result + suffix;

  return result;
}

/*
*   getContentsOfChildNodes: Using predicate function for filtering element
*   nodes, collect text content from all child nodes of element.
*/
function getContentsOfChildNodes (element, predicate) {
  let arr = [], content;

  Array.prototype.forEach.call(element.childNodes, function (node) {
    switch (node.nodeType) {
      case (Node.ELEMENT_NODE):
        if (predicate(node)) {
          content = getElementContents(node);
          if (content.length) arr.push(content);
        }
        break;
      case (Node.TEXT_NODE):
        content = normalize(node.textContent);
        if (content.length) arr.push(content);
        break;
    }
  });

  if (arr.length) return arr.join(' ');
  return '';
}
