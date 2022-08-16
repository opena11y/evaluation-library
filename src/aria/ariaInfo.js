/* ariaInfo.js */

/* Imports */
import DebugLogging        from '../debug.js';
import {propertyDataTypes} from './ariaSpecPropertyDataTypes.js';
import {designPatterns}    from './ariaSpecDesignPatterns.js';
import {hasCheckedState}   from '../utils.js'

/* Constants */
const debug = new DebugLogging('AriaInfo', false);

/* Debug helper functions */

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
 * @class AriaInfo
 *
 * @desc Aria information for a dom node
 *
 * @param  {String}  role  - ARIA role for the element
 * @param  {Object}  node  - dom element node
 */

export default class AriaInfo {
  constructor (doc, role, defaultRole, node) {
    const tagName = node.tagName.toLowerCase();
    const level = parseInt(node.getAttribute('aria-level'));

    let designPattern = designPatterns[role];
    this.isValidRole  = typeof designPattern === 'object';

    this.isAbstractRole = false;

    // if role is not valid use default role for element for validation
    if (!this.isValidRole) {
      designPattern = designPatterns[defaultRole];
    } else {
      this.isAbstractRole  = designPattern.roleType.indexOf('abstract') >= 0;     
    }

    this.isNameRequired     = designPattern.nameRequired;
    this.isNameProhibited   = designPattern.nameProhibited;
    this.requiredParents  = designPattern.requiredParents;

    this.isWidget   = (designPattern.roleType.indexOf('range') >= 0) || 
                      (designPattern.roleType.indexOf('widget') >= 0)  ||
                      (designPattern.roleType.indexOf('window') >= 0);

    this.isLandark  = designPattern.roleType.indexOf('landmark') >= 0;     
    this.isLive     = designPattern.roleType.indexOf('live') >= 0;     
    this.isSection  = designPattern.roleType.indexOf('section') >= 0;     
    this.isAbstractRole  = designPattern.roleType.indexOf('abstract') >= 0;     

    this.hasRequiredParents = designPattern.requiredParents.length > 0;

    // Used for heading
    this.headingLevel = this.getHeadingLevel(role, node);

    const attrs = Array.from(node.attributes);

    this.validAttrs        = [];
    this.invalidAttrs      = [];

    attrs.forEach( attr =>  {
      if (attr.name.indexOf('aria') === 0) {
        if (typeof propertyDataTypes[attr.name] === 'object') {
          const a = {
            name: attr.name,
            value: attr.value,
            type: propertyDataTypes[attr.name].type,
            values: propertyDataTypes[attr.name].values,
            allowUndeterminedValue: propertyDataTypes[attr.name].allowUndeterminedValue
          }
          this.validAttrs.push(a);
        } else {
          this.invalidAttrs.push(attr);
        }
      }
    });

    this.invalidAttrValues  = this.checkForInvalidAttributeValue(this.validAttrs);
    this.invalidRefs        = this.checkForInvalidReferences(doc, this.validAttrs);
    this.unsupportedAttrs   = this.checkForUnsupportedAttribute(this.validAttrs, designPattern);
    this.deprecatedAttrs    = this.checkForDeprecatedAttribute(this.validAttrs, designPattern);
    this.missingReqAttrs    = this.checkForMissingRequiredAttributes(this.validAttrs, designPattern, node);

    switch (tagName) {
      case 'h1':
        this.ariaLevel = 1;
        break;

      case 'h2':
        this.ariaLevel = 2;
        break;

      case 'h3':
        this.ariaLevel = 3;
        break;

      case 'h4':
        this.ariaLevel = 4;
        break;

      case 'h5':
        this.ariaLevel = 5;
        break;

      case 'h6':
        this.ariaLevel = 6;
        break;

      default:
        this.ariaLevel = (typeof level === 'number') && (level > 0) ? level : 0;
        break;
    }

    if (debug.flag) {
      node.attributes.length && debug.log(`${node.outerHTML}`, 1);
      debug.log(`[         isWidget]: ${this.isWidget}`);
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
  checkForInvalidAttributeValue (attrs) {
    const attrsWithInvalidValues = [];
    let count;

    attrs.forEach( attr => {
      const value     = attr.value.trim().toLowerCase();
      const values    = value.split(' ');
      const num       = Number(value);

      switch (attr.type) {
        case 'boolean':
          if (!attr.values.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'integer':
          if (attr.allowUndeterminedValue) {
            if (!Number.isInteger(num) || (num < -1) || (value === ''))  {
              attrsWithInvalidValues.push(attr);
            }            
          }
          else {
            if (!Number.isInteger(num) || (num < 1) || (value === ''))  {
              attrsWithInvalidValues.push(attr);
            }            
          }
          break;

        case 'nmtoken':
          if (!attr.values.includes(value)) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'nmtokens':
          count = 0;
          values.forEach( v => {
            if (!attr.values.includes(v.trim())) {
              count += 1;
            }
          });
          if (count) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'number':
          if (isNaN(value) || (value === '')) {
            attrsWithInvalidValues.push(attr);
          }
          break;

        case 'tristate':
          if (!attr.values.includes(value)) {
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
      const attrInfo = propertyDataTypes[attr.name];
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
      const attrInfo = propertyDataTypes[name];
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
    designPattern.requiredProps.forEach (reqAttr => {
      const defaultValue = propertyDataTypes[reqAttr].defaultValue;
      let flag = (defaultValue !== '') && (defaultValue !== 'undefined');
      attrs.forEach( attr => {
        const name  = attr.name.toLowerCase();
        flag = flag || (name === reqAttr);
        flag = flag || ((reqAttr === 'aria-checked') && hasCheckedState(node));
      });
      if (!flag) {
        missingReqAttrNames.push(reqAttr);
      }
    });
    return missingReqAttrNames;
  }

  getHeadingLevel (role, node) {
    switch (node.tagName.toLowerCase()) {
      case 'h1':
        return 1;

      case 'h2':
        return 2;

      case 'h3':
        return 3;

      case 'h4':
        return 4;

      case 'h5':
        return 5;

      case 'h6':
        return 6;

      default:
        if (role === 'heading') {
          const level = parseInt(node.getAttribute('aria-level'));
          if (Number.isInteger(level)) {
            return level;
          }
        }
        break;
    }
    return 0;
  }
}
