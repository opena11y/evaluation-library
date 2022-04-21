/* ariaValidation.js */

/* Imports */
import DebugLogging      from '../debug.js';
import {ariaInfo}        from '../aria/ariaInfo.js';
import {hasCheckedState} from '../utils/utils.js'

/* Debug help functions */

function debugRefs (refs) {
  let s = '';
  refs.forEach(r => {
    s += `[${r.name} -> ${r.invalidIds.join()}]\n`;
  });
  return s;
}

function debugAttrs (attrs) {
  let s = '';
  attrs.forEach(attr => {
    if (typeof attr === 'string') {
      s += attr + ' ';
    } else {
      if (attr.invalidTokens && attr.invalidTokens.length) {
        s += `[${attr.name}=${attr.invalidTokens.join(' ')}]\n`;
      } else {
        s += `[${attr.name}=${attr.value}]\n`;
      }
    }
  });
  return s;
}

/* Constants */
const debug = new DebugLogging('AriaValidation', false);

/**
 * @class TokenInfo
 *
 * @desc Information about an ARIA attribute that can include one or
 *       more tokens.  The invalidTokens array contains a list of
 *       invalid tokens.
 *
 * @param  {String}  name   - name of attribute
 * @param  {String}  value  - value of attribute
 */

class TokenInfo {
  constructor (name, value) {
    this.name = name;
    this.value = value;
    this.invalidTokens = [];
  }
}

/**
 * @class RefInfo
 *
 * @desc Information about an ARIA attributes the reference IDs.
 *       The invalidIds array is a array of the invalid ID values.
 *
 * @param  {String}  name   - name of attribute
 * @param  {String}  value  - value of attribute
 */

class RefInfo {
  constructor (name, value) {
    this.name = name;
    this.value = value;
    this.invalidIds = [];
  }
}

/**
 * @class AriaValidation
 *
 * @desc Validates aria information for a dom node
 *
 * @param  {String}  role  - ARIA role for the element
 * @param  {Object}  node  - dom element node
 */

export default class AriaValidation {
  constructor (doc, role, defaultRole, node) {
    let designPattern = ariaInfo.designPatterns[role];

    this.isValidRole          = typeof designPattern === 'object';

    // if role is not valid use default role for element for validation
    if (!this.isValidRole) {
      designPattern = ariaInfo.designPatterns[defaultRole];
    }

    this.nameRequired     = designPattern.nameRequired;
    this.nameProhibited   = designPattern.nameProbihited;

    const attrs = Array.from(node.attributes);

    this.validAttrs        = [];
    this.invalidAttrs      = [];

    attrs.forEach( attr =>  {
      if (attr.name.indexOf('aria') === 0) {
        if (typeof ariaInfo.propertyDataTypes[attr.name] === 'object') {
          this.validAttrs.push(attr);
        } else {
          this.invalidAttrs.push(attr);
        }
      }
    });

    this.invalidAttrValues  = this.checkForInalidAttributeValue(this.validAttrs);
    this.invalidRefs        = this.checkForInvalidReferences(doc, this.validAttrs);
    this.unsupportedAttrs   = this.checkForUnsupportedAttribute(this.validAttrs, designPattern);
    this.deprecatedAttrs    = this.checkForDeprecatedAttribute(this.validAttrs, designPattern);
    this.missingReqAttrs    = this.checkForMissingRequiredAttributes(this.validAttrs, designPattern, node);

    if (debug.flag) {
      node.attributes.length && debug.log(`${node.outerHTML}`, 1);
      debug.log(`[invalidAttrValues]: ${debugAttrs(this.invalidAttrValues)}`);
      debug.log(`[      invalidRefs]: ${debugRefs(this.invalidRefs)}`);
      debug.log(`[ unsupportedAttrs]: ${debugAttrs(this.unsupportedAttrs)}`);
      debug.log(`[  deprecatedAttrs]: ${debugAttrs(this.deprecatedAttrs)}`);
      debug.log(`[  missingReqAttrs]: ${debugAttrs(this.missingReqAttrs)}`);
      debug.log(`[     invalidAttrs]: ${debugAttrs(this.invalidAttrs)}`);
    }
  }

  // check if the value of the aria attribute
  // is allowed
  checkForInalidAttributeValue (attrs) {
    const booleanValues = ['true', 'false'];
    const tristateValues = ['true', 'false', 'mixed'];
    const attrsWithInvalidValues = [];

    attrs.forEach( attr => {
      const attrInfo  = ariaInfo.propertyDataTypes[attr.name];
      const value     = attr.value.toLowerCase();
      const values    = value.split(' ');
      const tokenInfo = new TokenInfo (attr.name, attr.value);

      switch (attrInfo.type) {
        case 'boolean':
          if (!booleanValues.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'integer':
          const num = Number(value);
          if (!Number.isInteger(num) || (num <= 0)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtoken':
          if (!attrInfo.values.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtokens':
          values.forEach( v => {
            if (!attrInfo.values.includes(v.trim())) {
              tokenInfo.invalidTokens.push(v);
            }
          });
          if (tokenInfo.invalidTokens.length) {
            attrsWithInvalidValues.push(tokenInfo);
          }
          break;

        case 'number':
          if (isNaN(value) || (value === '')) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'tristate':
          if (!tristateValues.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        default:
          break;

      }

    });

    return attrsWithInvalidValues;
  }

  // checks for valid IDREF and IDREFs for
  // aria attributes like aria-labelledby,
  // aria-controls, etc...
  checkForInvalidReferences (doc, attrs) {
    const invalidRefs = [];

    attrs.forEach( attr => {
      const attrInfo = ariaInfo.propertyDataTypes[attr.name];
      const idRefs = attr.value.split(' ');

      if ((attrInfo.type === 'idref') ||
          (attrInfo.type === 'idrefs')) {

        const refInfo = new RefInfo (attr.name, attr.value);

        idRefs.forEach( id => {
          if (doc && !doc.querySelector(`#${id}`)) {
            refInfo.invalidIds.push(id);
          }
        });
        if (refInfo.invalidIds.length) {
          invalidRefs.push(refInfo);
        }
      }
    });

    return invalidRefs;
  }

  // checks for the use of an aria-attribute that
  // is not defined for the specific role
  checkForUnsupportedAttribute (attrs, designPattern) {
    const unsupportedAttrs = [];

    attrs.forEach( attr => {
      const name     = attr.name.toLowerCase();
      if (!designPattern.supportedProps.includes(name) &&
        !designPattern.requiredProps.includes(name) &&
        !designPattern.inheritedProps.includes(name)) {
        unsupportedAttrs.push(attr);
      }
    });

    return unsupportedAttrs;
  }

  // checks for aria attributes that are deprecated for all roles
  // and the use of aria attributes that should no longer be used
  // on elements with a specific role
  checkForDeprecatedAttribute (attrs, designPattern) {
    const deprecatedAttrs = [];

    attrs.forEach( attr => {
      const name     = attr.name.toLowerCase();
      const attrInfo = ariaInfo.propertyDataTypes[name];
      if (designPattern.deprecatedProps.includes(name) ||
        attrInfo.deprecated) {
        deprecatedAttrs.push(attr);
      }
    });

    return deprecatedAttrs;
  }

  // checks for required aria attributes for a specific role
  // In some cased native HTML semanitics like "checked' property of
  // an input element can be used to satisfy the requirement
  checkForMissingRequiredAttributes(attrs, designPattern, node) {
    const missingReqAttrNames = [];
    let count = 0;
    designPattern.requiredProps.forEach (reqAttr => {
      const defaultValue = ariaInfo.propertyDataTypes[reqAttr].defaultValue;
      let flag = (defaultValue !== '') && (defaultValue !== 'undefined');
      attrs.forEach( attr => {
        const name  = attr.name.toLowerCase();
        flag = flag || (attr.name === reqAttr);
        flag = flag || ((reqAttr === 'aria-checked') && hasCheckedState(node));
      });
      if (!flag) {
        missingReqAttrNames.push(reqAttr);
      }
    });
    return missingReqAttrNames;
  }
}
