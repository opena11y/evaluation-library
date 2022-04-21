// LOW-LEVEL FUNCTIONS

export {
  normalize,
  getAttributeValue,
  hasEmptyAltText,
  hasInvalidState,
  hasCheckedState
}
/* constants */
const elementsWithInvalid = ['form', 'fieldset', 'input', 'legend'];
const inputsWithChecked   = ['checkbox', 'radio'];

/* helper functions */

/*
*   normalize: Trim leading and trailing whitespace and condense all
*   internal sequences of whitespace to a single space. Adapted from
*   Mozilla documentation on String.prototype.trim polyfill. Handles
*   BOM and NBSP characters.
*/
function normalize (s) {
  let rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  return s.replace(rtrim, '').replace(/\s+/g, ' ');
}

/*
*   getAttributeValue: Return attribute value if present on element,
*   otherwise return empty string.
*/
function getAttributeValue (element, attribute) {
  let value = element.getAttribute(attribute);
  return (value === null) ? '' : normalize(value);
}

/*
*   hasEmptyAltText: Determine whether the alt attribute is present
*   and its value is the empty string.
*/
function hasEmptyAltText (element) {
  let value = element.getAttribute('alt');

   // Attribute is present
  if (value !== null)
    return (normalize(value).length === 0);

  return false;
}

/**
 * @function hasInvalidState
 *
 * @desc Identifies elements with the invalid state, that would overide
 *       or replace the use of aria-invalid attribute
 *
 * @param  {Object}  node   - DOM element node
 *
 * @returns {Boolean} true it element has a invalid state, otherwise false
 */

function hasInvalidState (node) {
  return elementsWithInvalid.includes(node.tagName.toLowerCase());
}

/**
 * @function hasCheckedState
 *
 * @desc Identifies elements with the checked state, that would overide
 *       or replace the use of aria-checked attribute
 *
 * @param  {Object}  node   - DOM element node
 *
 * @returns {Boolean} true it element has a checked state, otherwise false
 */

function hasCheckedState (node) {
  let flag = node.tagName.toLowerCase() === 'input';
  flag = flag && inputsWithChecked.includes(node.type.toLowerCase());
  return flag;
}
