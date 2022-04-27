// LOW-LEVEL FUNCTIONS

export {
  normalize,
  filterTextContent,
  replaceAll,
  getAttributeValue,
  hasEmptyAltText,
  hasInvalidState,
  hasCheckedState,
  transformElementMarkup
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

/**
 * @function transformElementMarkup
 *
 * @desc Converts element markup in strings to capitalized text
 *
 * @param {String}  elemStr - Element result message to convert content inside '@' to caps
 *
 * @return  String
 */

function transformElementMarkup (elemResultStr) {
  let newStr = "";
  let transform_flag = false;

  if (typeof elemResultStr === 'string') {
    const len = elemResultStr.length;
    for (let i = 0; i < len; i++) {
      let c = elemResultStr[i];
      if (c == '@') {
        transform_flag = !transform_flag;
        continue;
      }
      if (transform_flag)
        newStr += c.toUpperCase();
      else
        newStr += c;
    }
  }
  return newStr;
}

/**
 * @function filterTextContent
 *
 * @desc Normalizes spaces in a string and removes any non-printable characters
 *
 * @param {String} s - string to be normalized
 *
 * @return  String
 */

function filterTextContent  (s) {
  // Replace repeated spaces, newlines and tabs with a single space

  if (typeof s !== 'string') return "";

// **** NOTE *****
// This function was changed to support fae-util based on HTMLUnit, which does not seem to
// handle character entities the same as a browser DOM
// This resulted in special characters being generated triggering false positives in some
/// rules, usually Landmark rules related to content being outside a landmark

//  if (s.replace) return s.replace(/^\s*|\s(?=\s)|\s*$/g, "");

  const len = s.length;
  let s1 = "";
  let last_c = 32;

  for (let i = 0; i < len; i++) {

    var c = s.charCodeAt(i);

    // only include printable characters less than '~' character
    if (c < 32 || c > 126) continue;

    if ((c !== 32) || (last_c !== 32)) {
      s1 += s[i];
      last_c = c;
    }

  }
  return s1.trim();
}

/**
 * @function replaceAll
 *
 * @desc Normalizes spaces in a string
 *
 * @param {String}  s       - String to have replacements
 * @param {String}  str1    - String to replace
 * @param {String}  str2    - The replacement string
 *
 * @return  String
 */

function replaceAll (s, str1, str2) {
  let len = s.length;
  let pos = s.indexOf(str1);
  let s1  = "";

  while (pos >= 0) {
    s1 += s.slice(0,pos);
    s1 += str2;
    s   = s.slice((pos+str1.length), len);

    pos = s.indexOf(str1);
    len = s.length;
  }
  s1 += s.slice(0, len);
  return s1;
}
