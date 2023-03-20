/*
*   namefrom.js
*/

import {
  normalize,
  normalizeLeadingAndTrailingSpace,
  getAttributeValue
} from '../utils.js';

import {
  isEmbeddedControl,
  getEmbeddedControlValue
} from './embedded';

export {
  addCssGeneratedContent,
  isLabelableElement,
  getElementContents,
  getNodeContents,
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
debug.flag = true;

/*
*   @function isLabelableElement
*
*   @desc  Based on HTML5 specification, determine whether
*          element can be associated with a label.
*
*   @parm {Object}  element  - DOM node of element
*
*   @returns {String}  @desc
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
*   @function getElementContents
*
*   @desc  Construct the ARIA text alternative for element by
*          processing its element and text node descendants and then adding any CSS-
*          generated content if present.
*
*   @parm {Object}  element     - DOM node of element
*   @parm {Object}  forElement  - DOM node of element being labelled
*
*   @returns {String}  @desc
*/
function getElementContents (element, forElement) {
  let result = '';

  if (element.hasChildNodes()) {
    let children = element.childNodes,
        arrayOfStrings = [];

    for (let i = 0; i < children.length; i++) {
      let contents = getNodeContents(children[i], forElement);
      if (contents.length) arrayOfStrings.push(contents);
    }

    result = (arrayOfStrings.length) ? arrayOfStrings.join('') : '';
  }

  return addCssGeneratedContent(element, result);
}

// HIGHER-LEVEL FUNCTIONS THAT RETURN AN OBJECT WITH SOURCE PROPERTY

/*
*   @function nameFromAttribute
*
*   @desc
*
*   @parm {Object}  element    - DOM node of element
*   @parm {String}  attribute  - name of attribute (e.g. 'alt', 'value')
*
*   @returns {Object}  @desc
*/
function nameFromAttribute (element, attribute) {
  let name;

  name = getAttributeValue(element, attribute);
  if (name.length) return { name: normalize(name), source: attribute };

  return null;
}

/*
*   @function  nameFromAltAttribute
*
*   @desc
*
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
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
*   @function nameFromContents
*   @desc
*
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
*/
function nameFromContents (element) {
  let name;

  name = getElementContents(element);
  if (name.length) return { name: normalize(name), source: 'contents' };

  return null;
}

/*
*   @function nameFromDefault
*   @desc
*
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
*/
function nameFromDefault (name) {
  return name.length ? { name: name, source: 'default' } : null;
}

/*
*   @function nameFromDescendant
*   @desc
*
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
*/
function nameFromDescendant (element, tagName) {
  let descendant = element.querySelector(tagName);
  if (descendant) {
    let name = descendant.hasAttribute('aria-label') ?
               descendant.getAttribute('aria-label') :
               getElementContents(descendant);
    if (name.length) return { name: normalize(name), source: tagName + ' element' };
  }

  return null;
}

/*
*   @function nameFromLabelElement
*   @desc
*
*   @parm {Object}  doc     - Parent document of the element
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
*/
function nameFromLabelElement (doc, element) {
  let label, name;
  // label [for=id]
  if (element.id) {
    try {
      label = doc.querySelector('[for="' + element.id + '"]');
      if (label) {
        name = label.hasAttribute('aria-label') ?
               label.getAttribute('aria-label') :
               getElementContents(label, element);
        if (name.length) return { name: normalize(name), source: 'label reference' };
      }
    } catch (error) {
      debug.log(`[nameFromLabelElement][error]: ${error}`);
    }
  }

  // label encapsulation
  if (typeof element.closest === 'function') {
    label = element.closest('label');
    if (label) {
      name = label.hasAttribute('aria-label') ?
             label.getAttribute('aria-label') :
             getElementContents(label, element);
      if (name.length) return { name: normalize(name), source: 'label encapsulation' };
    }
  }

  return null;
}

/*
*   @function nameFromLegendElement
*
*   @desc
*
*   @parm {Object}  doc     - Parent document of the element
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
*/
function nameFromLegendElement (doc, element) {
  let name, legend;

  // legend
  if (element) {
    legend = element.querySelector('legend');
    if (legend) {
      name = legend.hasAttribute('aria-label') ?
             legend.getAttribute('aria-label') :
             getElementContents(legend, element);
    if (name.length) return { name: normalize(name), source: 'legend' };
    }
  }
  return null;
}

/*
*   @function nameFromDetailsOrSummary
*
*   @desc If element is expanded (has open attribute),
*         return the contents of the summary element followed
*         by the text contents of element and all of its non-summary
*         child elements. Otherwise, return only the contents of the
*         first summary element descendant.
*
*   @parm {Object}  element - DOM node of element
*
*   @returns {Object}  @desc
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
    if (name.length) return { name: normalize(name), source: 'contents' };
  }
  else {
    if (name.length) return { name: normalize(name), source: 'summary element' };
  }

  return null;
}

// LOW-LEVEL HELPER FUNCTIONS (NOT EXPORTED)

/*
*   @function  isDisplayNone
*
*   @desc Returns true if the element or parent element has set the CSS
*         display property to none or has the hidden attribute,
*         otherwise false
*
*   @param  {Object}  node  - a DOM node
*
*   @returns  {Boolean} see @desc
*/

function isDisplayNone (node) {

  if (!node) {
    return false;
  }

  if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {

    if (node.hasAttribute('hidden')) {
      return true;
    }

    // aria-hidden attribute with the value "true" is an same as
    // setting the hidden attribute for name calculation
    if (node.hasAttribute('aria-hidden')) {
      if (node.getAttribute('aria-hidden').toLowerCase()  === 'true') {
        return true;
      }
    }

    const style = window.getComputedStyle(node, null);

    const display = style.getPropertyValue("display");

    if (display) {
      return display === 'none';
    }
  }
  return false;
}

/*
*   @function isVisibilityHidden
*
*   @desc Returns true if the node (or it's parrent) has the CSS visibility
*         property set to "hidden" or "collapse", otherwise false
*
*   @param  {Object}   node  -  DOM node
*
*   @return  see @desc
*/

function isVisibilityHidden(node) {

  if (!node) {
    return false;
  }

  if (node.nodeType === Node.TEXT_NODE) {
    node = node.parentNode;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    const style = window.getComputedStyle(node, null);

    const visibility = style.getPropertyValue("visibility");
    if (visibility) {
      return (visibility === 'hidden') || (visibility === 'collapse');
    }
  }
  return false;
}

/*
*   @function isAriaHiddenFalse
*
*   @desc Returns true if the node has the aria-hidden property set to
*         "false", otherwise false.
*         NOTE: This function is important in the accessible name
*               calculation, since content hidden with a CSS technique
*               can be included in the accessible name calculation when
*               aria-hidden is set to false for the chrome browser
*
*   @param  {Object}   node  -  DOM node
*
*   @return  see @desc
*/

function isAriaHiddenFalse(node) {

  if (!node) {
    return false;
  }

  if (node.nodeType === Node.TEXT_NODE) {
      node = node.parentNode;
  }

  if (node.nodeType === Node.ELEMENT_NODE) {
    return (node.hasAttribute('aria-hidden') &&
        (node.getAttribute('aria-hidden').toLowerCase() === 'false'));
  }

  return false;
}

/*
*   @function includeContentInName
*
*   @desc Checks the CSS display and hidden properties, and
*         the aria-hidden property to see if the content
*         should be included in the accessible name
*        calculation.  Returns true if it should be
*         included, otherwise false
*
*   @param  {Object}   node  -  DOM node
*
*   @return  see @desc
*/

function includeContentInName(node) {
  // NOTE: Chrome is the only major browser using aria-hidden=false in
  //       accessible name computation
  const flag = isAriaHiddenFalse(node) && false;
  return flag || (!isVisibilityHidden(node) && !isDisplayNone(node));
}

/*
*   @function includeContentInName
*
*   @desc Checks the CSS display and hidden properties, and
*         the aria-hidden property to see if the content
*         should be included in the accessible name
*        calculation.  Returns true if it should be
*         included, otherwise false
*
*   @param  {Object}   node     -  DOM node
*   @param  {Object}   forElem  -  DOM node the name is being computed for
*
*   @return  see @desc
*/

function getNodeContents (node, forElem, alwaysInclude=false) {
  let contents = '';
  let nc;
  let arr = [];

  // Cannot recursively use the element
  // in computing it's accessible name
  if (node === forElem) {
    return '';
  }

  switch (node.nodeType) {

      case Node.ELEMENT_NODE:
      // If aria-label is present, node recursion stops and
      // aria-label value is returned
      if (node.hasAttribute('aria-label')) {
        if (includeContentInName(node) || alwaysInclude ) {
          contents = node.getAttribute('aria-label');
        }
      }
      else {
        if (node instanceof HTMLSlotElement) {
          // if no slotted elements, check for default slotted content
          const assignedNodes = node.assignedNodes().length ? node.assignedNodes() : node.assignedNodes({ flatten: true });
          assignedNodes.forEach( assignedNode => {
            nc = getNodeContents(assignedNode, forElem);
            if (nc.length) arr.push(nc);
          });
          contents = (arr.length) ? arr.join('') : '';
        } else {
          if (couldHaveAltText(node) && (includeContentInName(node) || alwaysInclude)) {
            contents = getAttributeValue(node, 'alt');
          }
          else {
            if (isEmbeddedControl(node) && (includeContentInName(node) || alwaysInclude)) {
              contents = getEmbeddedControlValue(node);
            }
            else {
              if (node.hasChildNodes()) {
                let children = Array.from(node.childNodes);
                children.forEach( child => {
                  nc = getNodeContents(child, forElem);
                  if (nc.length) arr.push(nc);
                });
                contents = (arr.length) ? arr.join('') : '';
              }
            }
          }
          // For all branches of the ELEMENT_NODE case...
        }
      }
      contents = addCssGeneratedContent(node, contents);
      if (contents.length) {
        contents = ' ' + contents;
      }
      break;

    case Node.TEXT_NODE:
      if (includeContentInName(node) || alwaysInclude) {
        contents = normalizeLeadingAndTrailingSpace(node.textContent);
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

 if (prefix[0] === '"') {
    result = prefix.substring(1, (prefix.length-1)) + result;
  }
 if (suffix[0] === '"') {
    result = result + suffix.substring(1, (suffix.length-1)) ;
  }

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
        content = normalizeLeadingAndTrailingSpace(node.textContent);
        if (content.length) arr.push(content);
        break;
    }
  });

  if (arr.length) return arr.join(' ');
  return '';
}
