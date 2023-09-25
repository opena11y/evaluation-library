/*
*   embedded.js
*
*   To calculate the accessible name of a form element from its label, it is
*   necessary to aggregate the text nodes in the label along with the values
*   of any embedded controls that text content may contain.
*
*   isEmbeddedControl is used to determine whether or not a form control can
*   be embedded within text content.
*
*   getEmbeddedControlValue is used to get the value of an embedded control
*   based on its ARIA role.
*/

import { getAttributeValue, normalize } from '../utils';
export { isEmbeddedControl, getEmbeddedControlValue };

const rangeRoles = ['slider', 'spinbutton'];

/*
*   @function isEmbeddedControl
*
*   @desc  Determine whether element is an element or has a role
*          that could be embedded within text content of a label.
*
*   @parm {Object}  element  - DOM node of element
*
*   @returns {Boolean}  True if element has content, otherwise false
*/
function isEmbeddedControl (element) {
  return isInputWithValue(element) ||
         isSelectElement(element) ||
         rangeRoles.includes(getRole(element));
}

/*
*   @function getEmbeddedControlValue
*
*   @desc Based on the tag name or the role of element,
*         value of the embedded control.
*
*   @parm {Object}  element  - DOM node of input element
*
*   @returns {String}  Content of the value attribute if defined,
*                      else empty string
*/
function getEmbeddedControlValue (element) {
  if (isInputWithValue(element)) {
    return getAttributeValue(element, 'value') + ' ';
  }
  else {
    if (isSelectElement(element)) {
      return getSelectValue(element) + ' ';
    }
    else {
      if (rangeRoles.includes(getRole(element))) {
        return getRangeValue(element) + ' ';
      }
    }
  }

  return '';
}

// LOW-LEVEL FUNCTIONS

/*
*   @function getRangeValue
*
*   @desc Get current value of element with role 'slider'
*         or 'spinbutton' (i.e., subclass of abstract 'range' role).
*
*   @parm {Object}  element  - DOM node of select element
*
*   @returns {String}  @desc
*/
function getRangeValue (element) {
  let value;

  value = getAttributeValue(element, 'aria-valuetext');
  if (value.length) return value;

  value = getAttributeValue(element, 'aria-valuenow');
  if (value.length) return value;

  return '';
}

/*
*   @function getSelectValue
*
*   @desc Returns the content of the selected option elements
*         of a select element, if no selected options returns
*         empty string
*
*   @parm {Object}  element  - DOM node of select element
*
*   @returns {String}  @desc
*/
function getSelectValue (element) {
  let tagName = element.tagName.toLowerCase();

  if (tagName === 'select') {
    let arr = [], selectedOptions = element.selectedOptions;

    for (let i = 0; i < selectedOptions.length; i++) {
      let option = selectedOptions[i];
      let value = normalize(option.value);
      if (value.length) arr.push(value);
    }

    if (arr.length) return arr.join(' ');
  }

  return '';
}

/*   @function  getRole
*
*    @desc  If defined return attribbute role
*
*    @parm {Object}  element  - DOM node of element
*
*    @returns {String}  see @desc
*/
function getRole (element) {
  return element.hasAttribute('role') ? element.getAttribute('role').toLowerCase() : '';
}

/*   @function  isInputWithValue
*
*    @desc  Returns true if an input element can be used in accessible
*           name calculation, (e.g. not all types can be included)
*
*    @parm {Object}  element  - DOM node of element
*
*    @returns {Boolean}  see @desc
*/
function isInputWithValue (element) {
  // Included types are based on testing with Chrome browser
  const includeTypes = ['button', 'email', 'number', 'password', 'range', 'tel', 'text', 'url'];
  const tagName   = element.tagName.toLowerCase();
  const typeValue = element.hasAttribute('type') ?
                    element.getAttribute('type').toLowerCase() :
                    'text';

  return (tagName === 'input') &&
        includeTypes.includes(typeValue);
}

/*   @function  isSelectElement
*
*    @desc  Returns true if a select element, otherwise false
*
*    @parm {Object}  element  - DOM node of element
*
*    @returns {Boolean}  see @desc
*/
function isSelectElement (element) {
  const tagName = element.tagName.toLowerCase();
  return (tagName === 'select');
}


