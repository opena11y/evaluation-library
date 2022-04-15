/* aria.js */

/* Imports */
import DebugLogging     from '../debug.js';
import {ariaInfo} from '../aria/ariaInfo.js';

/* Constants */
const debug = new DebugLogging('AriaValidation', true);


class ariaAttribute {
  constructor (attr, value) {
    this.attr  = attr;
    this.value = value;
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
  constructor (role, defaultRole, node) {
    let designPattern = ariaInfo.designPatterns[role];

    this.isValidRole          = typeof designPattern === 'object';

    // if role is not valid use default role for element for validation
    if (!this.isValidRole) {
      designPattern = ariaInfo.designPatterns[defaultRole];
    }

    this.nameRequired       = designPattern.nameRequired;
    this.nameProhibited     = designPattern.nameProbihited;

    const attrs = Array.from(node.attributes);

    this.validAttrs        = [];
    this.invalidAttrs      = [];

    debug && debug.log(`[${node.tagName}][${role}]: ${attrs.length} attributes`, 1);
    attrs.forEach( attr =>  {
      if (attr.name.indexOf('aria') === 0) {
        debug && debug.log(`[${attr.name}]: ${attr.value}  (${typeof ariaInfo.propertyDataTypes[attr.name]})`);
        if (typeof ariaInfo.propertyDataTypes[attr.name] === 'object') {
          this.validAttrs.push(attr);
        } else {
          this.invalidAttrs.push(attr);
        }
      }
    });

    this.invalidAttrValues = this.checkForInalidAttributeValue(this.validAttrs);
    this.invalidRefs       = this.checkForInvalidReferences(this.validAttrs);
    this.unsupportedAttrs  = this.checkForUnsupportedAttribute(this.validAttrs, designPattern);
    this.deprecatedAttrs   = this.checkForDeprecatedAttribute(this.validAttrs, designPattern);
    this.missingReqAttrs   = this.checkForMissingRequiredAttributes(this.validAttrs, designPattern, node);

  }

  // check if the value of the aria attribute
  // is allowed
  checkForInalidAttributeValue (attrs) {
    const booleanValues = ['true', 'false'];
    const tristateValues = ['true', 'false', 'mixed'];
    const valueTypes = ['boolean', 'integer', 'nmtoken', 'number', 'tristate'];
    const attrsWithInvalidValues = [];

    attrs.forEach( attr => {
      const attrInfo = ariaInfo.propertyDataTypes[attr.name];
      const value = attr.value.toLowerCase();

      switch (attrInfo.type) {
        case 'boolean':
          if (!booleanValues.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'integer':
          const num = Number(value);
          if (!Number.isInteger(num) || (num < 0)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtoken':
          if (!attrInfo.values.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'number':
          if (!isNaN(value)) {
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
  checkForInvalidReferences (attrs) {
    const invalidRefs = [];

    attrs.forEach( attr => {
      const attrInfo = ariaInfo.propertyDataTypes[attr.name];
      const idRefs = attr.value.split(' ');

      if ((attrInfo.type === 'idref') ||
          (attrInfo.type === 'idrefs')) {
        const invalidRef = Object.assign({}, attr);
        invalidRef.invalidIds = [];
        idRefs.forEach( id => {
          if (!document.querySelector(`#${id}`)) {
            invalidRef.invalidIds.push(id);
          }
        });
        if (invalidRef.invalidIds.length) {
          invalidRefs.push(invalidRef);
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
      if (!designPattern.requiredProps.includes(name) &&
        !designPattern.allowedProps.includes(name)) {
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
  // In some cased native HTML semanitics like the 'invalid' property
  // or 'checked' property can be used to satisfy the requirement
  checkForMissingRequiredAttributes(attrs, designPattern, node) {
    const missingReqAttrs = [];
    let count = 0;
    designPattern.requiredProps.forEach (reqAttr => {
      let flag = false;
      attrs.forEach( attr => {
        const name     = attr.name.toLowerCase();
        flag = flag || (attr.name === reqAttr);
        flag = flag || ((reqAttr === 'aria-invalid') && node.hasAttribute('invalid'));
        flag = flag || ((reqAttr === 'aria-checked') && node.hasAttribute('checked'));
      });
      if (!flag) {
        missingReqAttrs.push(reqAttr);
      }
    });
    return missingReqAttrs;
  }
}
