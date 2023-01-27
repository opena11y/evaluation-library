/*
*   getaccname.js
*
*   Note: Information in this module is based on the following documents:
*   1. HTML Accessibility API Mappings 1.0 (http://rawgit.com/w3c/aria/master/html-aam/html-aam.html)
*   2. SVG Accessibility API Mappings (http://rawgit.com/w3c/aria/master/svg-aam/svg-aam.html)
*/

import {
  getAttributeValue,
  normalize
} from '../utils';

import {
  addCssGeneratedContent,
  getElementContents,
  getNodeContents,
  isLabelableElement,
  nameFromAttribute,
  nameFromAltAttribute,
  nameFromContents,
  nameFromDefault,
  nameFromDescendant,
  nameFromLabelElement,
  nameFromLegendElement,
  nameFromDetailsOrSummary
} from './namefrom';

export {
  getAccessibleName,
  getAccessibleDesc,
  getErrMessage,
  getGroupingLabels,
  nameFromNativeSemantics
};

const noAccName = {
  name: '',
  source: 'none'
};

// These roles are based on the ARAI 1.2 specification
const  rolesThatAllowNameFromContents = ['button',
'cell',
'checkbox',
'columnheader',
'gridcell',
'heading',
'link',
'menuitem',
'menuitemcheckbox',
'menuitemradio',
'option',
'radio',
'row',
'rowheader',
'sectionhead',
'switch',
'tab',
'tooltip',
'treeitem'];

/*
*   @function getAccessibleName
*
*   @desc Use the ARIA Roles Model specification for accessible
*         name calculation based on its precedence order:
*         (1) Use aria-labelledby, unless a traversal is already underway;
*         (2) Use aria-label attribute value;
*         (3) Use whatever method is specified by the native semantics of the
*             element, which includes, as last resort, use of the title attribute.
*
*   @desc (Object)  doc              -  Parent document of element
*   @desc (Object)  element          -  DOM node of element to compute name
*
*   @returns {Object} Returns a object with an 'name' and 'source' property
*/
function getAccessibleName (doc, element) {
  let accName = nameFromAttributeIdRefs(doc, element, 'aria-labelledby');
  if (accName === null) accName = nameFromAttribute(element, 'aria-label');
  if (accName === null) accName = nameFromNativeSemantics(doc, element);
  if (accName === null) accName = noAccName;
  return accName;
}

/*
*   @function getAccessibleDesc
*
*   @desc Use the ARIA Roles Model specification for accessible
*         description calculation based on its precedence order:
*         (1) Use aria-describedby, unless a traversal is already underway;
*         (2) As last resort, use the title attribute, if not used as accessible name.
*
*   @desc (Object)  doc         -  Parent document of element
*   @desc (Object)  element     -  DOM node of element to compute description
*   @desc (Boolean) allowTitle  -  Allow title as accessible description
*
*   @returns {Object} Returns a object with an 'name' and 'source' property
*/
function getAccessibleDesc (doc, element, allowTitle=true) {
  let accDesc = nameFromAttributeIdRefs(doc, element, 'aria-describedby');
  if (allowTitle && (accDesc === null)) accDesc = nameFromAttribute(element, 'title');
  if (accDesc === null) accDesc = noAccName;
  return accDesc;
}


/*
*   @function getErrMessage
*
*   @desc Use the ARIA Roles Model specification for accessible
*         error description uses aria-errormessage attribute
*
*   @desc (Object)  doc              -  Parent document of element
*   @desc (Object)  element          -  DOM node of element to compute error message
*
*   @returns {Object} Returns a object with an 'name' and 'source' property
*/
function getErrMessage (doc, element) {
  let errMessage = null;

  errMessage = nameFromAttributeIdRefs(doc, element, 'aria-errormessage');
  if (errMessage === null) errMessage = noAccName;

  return errMessage;
}

/*
*   @function getGroupingLabels
*
*   @desc Return an array of grouping label objects for
*         element, each with two properties: 'name' and 'source'.
*   @desc (Object)  element          -  DOM node of element to compute error message
*
*   @returns {Object} Returns a DOM elements related to using the legend element, or empty array
*/
function getGroupingLabels (element) {
  // We currently only handle labelable elements as defined in HTML 5.1
  if (isLabelableElement(element)) {
    return getFieldsetLegendLabels(element);
  }

  return [];
}

/*
*   @function nameFromNativeSemantics
*
*   @desc Use method appropriate to the native semantics
*         of element to find accessible name. Includes methods for all interactive
*         elements. For non-interactive elements, if the element's ARIA role allows
*         its acc. name to be derived from its text contents
*
*   @desc (Object)  doc              -  Parent document of element
*   @desc (Object)  element          -  DOM node of element to compute name
*
*   @returns {Object} Returns a object with an 'name' and 'source' property
*/
function nameFromNativeSemantics (doc, element) {
  let tagName = element.tagName.toLowerCase(),
      accName = null;

  switch (tagName) {
    // FORM ELEMENTS: INPUT
    case 'input':
      switch (element.type) {
        // HIDDEN
        case 'hidden':
            accName = '';
          break;

        // TEXT FIELDS
        case 'email':
        case 'password':
        case 'search':
        case 'tel':
        case 'text':
        case 'url':
          accName = nameFromLabelElement(doc, element);
          if (accName === null) accName = nameFromAttribute(element, 'placeholder');
          break;

        // OTHER INPUT TYPES
        case 'button':
          accName = nameFromAttribute(element, 'value');
          break;

        case 'reset':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Reset');
          break;

        case 'submit':
          accName = nameFromAttribute(element, 'value');
          if (accName === null) accName = nameFromDefault('Submit');
          break;

        case 'image':
          accName = nameFromAltAttribute(element);
          if (accName === null) accName = nameFromAttribute(element, 'value');
          break;

        default:
          accName = nameFromLabelElement(doc, element);
          break;
      }
      break;

    // FORM ELEMENTS: OTHER
    case 'button':
      accName = nameFromContents(element);
      break;

    case 'fieldset':
      accName = nameFromLegendElement(doc, element);
      break;

    case 'label':
      accName = nameFromContents(element);
      break;

    case 'keygen':
    case 'meter':
    case 'output':
    case 'progress':
    case 'select':
      accName = nameFromLabelElement(doc, element);
      break;

    case 'textarea':
      accName = nameFromLabelElement(doc, element);
      if (accName === null) accName = nameFromAttribute(element, 'placeholder');
      break;

    // EMBEDDED ELEMENTS
    case 'audio': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'embed':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'iframe':
      accName = nameFromAttribute(element, 'title');
      break;

    case 'img':
    case 'area': // added
      accName = nameFromAltAttribute(element);
      break;

    case 'object':
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    case 'svg': // added
      accName = nameFromDescendant(element, 'title');
      break;

    case 'video': // if 'controls' attribute is present
      accName = { name: 'NOT YET IMPLEMENTED', source: '' };
      break;

    // OTHER ELEMENTS
    case 'a':
      accName = nameFromContents(element);
      break;

    case 'details':
      accName = nameFromDetailsOrSummary(element);
      break;

    case 'figure':
      accName = nameFromDescendant(element, 'figcaption');
      break;

    case 'table':
      accName = nameFromDescendant(element, 'caption');
      break;

    // ELEMENTS NOT SPECIFIED ABOVE
    default:
      if (doesRoleAllowNameFromContents(element)) {
        accName = nameFromContents(element);
      }
      break;
  }

  // LAST RESORT USE TITLE
  if (accName === null) accName = nameFromAttribute(element, 'title');

  return accName;
}

// HELPER FUNCTIONS (NOT EXPORTED)

/*
*   @function nameFromAttributeIdRefs
*
*   @desc Get the value of attrName on element (a space-
*         separated list of IDREFs), visit each referenced element in the order it
*         appears in the list and obtain its accessible name, and return an object
*         with name property set to a string that is a space-separated concatenation
*         of those results if any, otherwise return null.
*
*   @desc (Object)  doc              -  Parent document of element
*   @desc (Object)  element          -  DOM node of element to compute name
*   @desc (Boolean) nameFromContent  -  If true allow element content to be used as name
*
*   @returns {Object} Returns a object with an 'name' and 'source' property
*/
function nameFromAttributeIdRefs (doc, element, attribute) {
  let value = getAttributeValue(element, attribute);
  let idRefs, i, refElement, name, names, arr = [];

  if (value.length) {
    idRefs = value.split(' ');

    for (i = 0; i < idRefs.length; i++) {
      refElement = doc.getElementById(idRefs[i]);
      if (refElement) {
        if (refElement.hasAttribute('aria-label')) {
          name = refElement.getAttribute('aria-label');
        }
        else {
          if (refElement.hasChildNodes()) {
            names = [];
            let children = Array.from(refElement.childNodes);
            children.forEach( child => {
              // Need to ignore CSS display: none and visibility: hidden for referenced
              // elements, but not their child elements
              const nc = getNodeContents(child, refElement, true);
              if (nc.length) names.push(nc);
            });
            name = (names.length) ? names.join('') : '';
          }
          else {
            name = '';
          }
        }
        name = addCssGeneratedContent(refElement, name);
        if (name.length) arr.push(name);
      }
    }
  }

  if (arr.length)
    return { name: normalize(arr.join(' ')), source: attribute };

  return null;
}

/*
*   @function getFieldsetLegendLabels
*
*   @desc Recursively collect legend contents of fieldset ancestors,
*         starting with the closest (innermost).  Return collection
*         as a possibly empty array of objects.
*
*   @desc (Object)  element  -  DOM node of element with label
*
*   @returns {Object} Returns an array of objects or an empty array
*/
function getFieldsetLegendLabels (element) {
  let arrayOfStrings = [];

  if (typeof element.closest !== 'function') {
    return arrayOfStrings;
  }

  function getLabelsRec (elem, arr) {
    let fieldset = elem.closest('fieldset');

    if (fieldset) {
      let legend = fieldset.querySelector('legend');
      if (legend) {
        let text = getElementContents(legend);
        if (text.length){
          arr.push({ name: text, source: 'fieldset/legend' });
        }
      }
      // process ancestors
      getLabelsRec(fieldset.parentNode, arr);
    }
  }

  getLabelsRec(element, arrayOfStrings);
  return arrayOfStrings;
}


/*
*   @function doesRoleAllowNameFromContents
*
*   @desc Returns true if role allows name from contents, otherwise false
*
*   @desc (Object)  element  -  DOM node of element to compute name
*
*   @return (Boolean) see @desc
*/

function doesRoleAllowNameFromContents (element) {
  const role = element.getAttribute('role');
  return role && rolesThatAllowNameFromContents.includes(role);
}

