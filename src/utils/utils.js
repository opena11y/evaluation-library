// LOW-LEVEL FUNCTIONS

export {
  normalize,
  getAttributeValue,
  hasEmptyAltText,
}

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
