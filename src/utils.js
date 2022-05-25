/* utils.js */

export {
  accNamesTheSame,
  checkIsTabStop,
  cleanForUTF8,
  filterTextContent,
  getAttributeValue,
  getFormattedDate,
  hasEmptyAltText,
  hasInvalidState,
  hasCheckedState,
  normalize,
  replaceAll
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

/**
 * @function getFormattedDate
 *
 * @desc Returns a fomratted string (YYYY-MM-DD) represeting the current date
 *       with leading zeros
 *
 * @return {String}  Formatted date string
 */

function getFormattedDate() {

  function leadingZero(n) {
    let n1 = n.toString();
    if (n < 10) n1 = "0" + n;
    return n1;
  }

  const date = new Date();

  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const hours = date.getHours() + 1;
  const minutes = date.getMinutes() + 1;

  return y + "-" +
        leadingZero(m) + "-" +
        leadingZero(d) + ":" +
        leadingZero(hours)+ ":" +
        leadingZero(minutes);
}

/**
 * @function cleanForUTF8
 *
 * @desc Returns an string with only UTF8 characters
 *
 * @param  {String}  str - string to clean
 *
 * @return {String}  String with only ASCII characters
 */

function cleanForUTF8 (str) {
  let nstr = '';
  str.split().forEach( c => {
    if (c >= ' ' && c < '~') nstr += c;
  });
  return nstr;
}

/**
 * @function accNamesTheSame
 *
 * @desc Returns true if the names a equivalent, otherwise false
 *
 * @param  {accName}  str - string to clean
 *
 * @return {Object} ref1 - Name object 1
 * @return {Object} ref2 - Name object 1
 */

function accNamesTheSame (ref1, ref2) {
  return ref1.name.toLowerCase() === ref2.name.toLowerCase();
}

/**
 * @function checkIsTabStop
 *
 * @desc Returns true if the element is a tab stop
 *
 * @param  {Object}  node - DOM node
 *
 * @return Returns true if the elements is a tab stop, otherwise false
 */

function checkIsTabStop (node) {
  const tagName  = node.tagName.toLowerCase();
  const href     = node.hasAttribute('href');
  const controls = node.hasAttribute('controls');
  const type     = node.hasAttribute('type') ? node.getAttribute('type') : '';

  if (node.tabIndex >= 0) {
    return true;
  }

  switch (tagName ) {
    case 'a':
      return href;

    case 'audio':
      return controls;

    case 'input':
      return type !== 'hidden';

    case 'select':
      return true;

    case 'textarea':
      return true;

    case 'video':
      return controls;

    default:
      break;

  }

  return false;
}
