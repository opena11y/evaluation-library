/* controlInfo.js */

/* Imports */
import {isLabelable, usesARIALabeling} from '../utils.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('ControlInfo', false);

/**
 * @class ControlElement
 *
 * @desc Idenifies a DOM element for native HTML controls and ARIA widgets.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class ControlElement {
  constructor (domElement, parentControlElement) {

    const node = domElement.node;

    this.parentControlElement = parentControlElement;
    this.domElement = domElement;
    this.isGroup = domElement.role === 'group';
    this.isInputTypeImage  = this.isInputType(node, 'image');
    this.isInputTypeRadio  = this.isInputType(node, 'radio');
    this.typeAttr = node.type ? node.type : '';
    this.childControlElements = [];
    this.nameForComparision = this.getNameForComparison(domElement, parentControlElement);
  }

  get isButton () {
    return false;
  }

  get isFieldset () {
    return false;
  }

  get isLabel () {
    return false;
  }

  get isLegend () {
    return false;
  }


  addChildControlElement (controlElement) {
    this.childControlElements.push(controlElement);
  }

  isInputType (node, type) {
    if (node.tagName.toLowerCase() === 'input') {
      return node.type === type;
    }
    return false;
  }

  getGroupControlElement () {
    let ce = this.parentControlElement;
    while (ce) {
      if (ce.isGroup) {
        return ce;
      }
      ce = ce.parentControlElement;
    }
    return null;
  }

  getGroupingNames (controlElement) {
    let names = '';
    let pce = controlElement;

    while (pce) {
      if (pce.domElement.role === 'group') {
        names += ' [g]: ' + pce.domElement.accName.name.trim().toLowerCase();
      }
      pce = pce.parentControlElement;
    }
    return names;
  }

  getRequiredParentControlName (roles, controlElement) {
    let pce = controlElement;
    while (pce) {
      if (roles.indexOf(pce.domElement.role) >= 0) {
        return ' [p]: ' + pce.domElement.accName.name.trim().toLowerCase();
      }
      pce = pce.parentControlElement;
    }
    return '';
  }

  getNameForComparison (domElement, parentControlElement) {
    let name = domElement.accName.name.trim().toLowerCase();

    // If it has a required parent, include required parent control name
    if (domElement.ariaInfo.requiredParents.length > 0) {
      name += this.getRequiredParentControlName(domElement.ariaInfo.requiredParents, parentControlElement);
    }
    else {
      // Include all grouping names
      name += this.getGroupingNames(parentControlElement);
    }

    return name;
  }

  getButtonControl (type) {
    function findButton(controlElements) {
      for (let i = 0; i < controlElements.length; i++) {
        const ce = controlElements[i];
        const de = ce.domElement; 
        if (((de.tagName === 'input') || (de.tagName === 'button')) &&
            de.typeAttr === type) {
          return ce;
        } 
        if (ce.childControlElements.length) {
          const buttonControl = findButton(ce.childControlElements);
          if (buttonControl) {
            return buttonControl;
          }
        }        
      }
      return null;
    }
    return findButton(this.childControlElements);
  }

  updateLegendInfo (legendElement) {
    let pce = this.parentControlElement;
    while (pce) {
      if (pce.isFieldset) {
        pce.legendElements.push(legendElement);
        break;
      }
      pce = pce.parentControlElement;
    }
  }

  showControlInfo (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    this.childControlElements.forEach( ce => {
      debug.domElement(ce.domElement, prefix);
      ce.showControlInfo(prefix + '  ');
    });
  }
}

class ButtonElement extends ControlElement {

  constructor (domElement, parentControlElement) {
    super(domElement, parentControlElement);
    
    const node = domElement.node;

    this.hasTextContent = node.textContent.trim().length > 0; 
    this.hasSVGContent = this.checkForSVGContent(node);

  }

  get isButton () {
    return true;
  }

  checkForSVGContent (node) {
    return node.querySelector('svg') ? true : false;
  }  
}


class FieldsetElement extends ControlElement {

  constructor (domElement, parentControlElement) {
    super(domElement, parentControlElement);
    this.legendElements = [];
  }

  get isFieldset () {
    return true;
  }

}

class LabelElement extends ButtonElement {

  constructor (domElement, parentControlElement) {
    super(domElement, parentControlElement);

    const doc = domElement.parentInfo.document;
    const node = domElement.node;

    this.labelForAttr = this.getLabelForAttribute(node);
    const refControlNode = this.getReferenceControl(doc, this.labelForAttr);
    this.isLabelForAttrValid = refControlNode ? isLabelable(refControlNode) : false;
    this.labelforTargetUsesAriaLabeling = refControlNode ? usesARIALabeling(refControlNode) : false;
  }

  get isLabel () {
    return true;
  }

  getLabelForAttribute (node) {
    const tagName = node.tagName.toLowerCase();
    if ((tagName === 'label') && node.hasAttribute('for')) {
      return node.getAttribute('for');
    }
    return '';
  }

  getReferenceControl(doc, id) {
    if (doc && id) {
      const node = doc.getElementById(id);
      if (node) {
        return node;
      }
    }
    return false;
  }  
}

class LegendElement extends ButtonElement {

  constructor (domElement, parentControlElement) {
    super(domElement, parentControlElement);
    
  }

  get isLegend () {
    return true;
  }
}


/**
 * @class ControlInfo
 *
 * @desc Collects information on the HTML control elements and ARIA widget roles
 *       on a web page for use in rules
 *
 * @param  {Object}  ControlInfo   - Structural Information
 */

export default class ControlInfo {
  constructor () {
    this.allControlElements      = [];
    this.childControlElements    = [];
    this.allFormElements  = [];
  }

  /**
   * @method addChildControlElement
   *
   * @desc Creates a new ControlElement and adds it to the array of
   *       ControlElements
   *
   * @param  {Object}  domElement           - domElement object being added to ControlInfo
   * @param  {Object}  parentControlElement - ControlElement object representing that parent ControlElement
   *
   */

  addChildControlElement (domElement, parentControlElement) {
    const tagName = domElement.tagName;
    const role = domElement.role; 
    let ce;

    switch (tagName) {
      case 'button':
        ce = new ButtonElement(domElement, parentControlElement);
        break;

      case 'fieldset':
        ce = new FieldsetElement(domElement, parentControlElement);
        break;

      case 'label':
        ce = new LabelElement(domElement, parentControlElement);
        break;

      case 'legend':
        ce = new LegendElement(domElement, parentControlElement);
        ce.updateLegendInfo(ce);
        break;

      default:
        if ((tagName !== 'input') && (role === 'button')) {
          ce = new ButtonElement(domElement, parentControlElement);
        }
        else {
          ce = new ControlElement(domElement, parentControlElement);
        }
        break;
    }

    this.allControlElements.push(ce);
    if (domElement.tagName === 'form') {
      this.allFormElements.push(ce);
    }

    if (parentControlElement) {
      parentControlElement.addChildControlElement(ce)
    } else {
      this.childControlElements.push(ce);
    }
    return ce;
  }

  /**
   * @method isControl
   *
   * @desc Tests if a domElement is a HTML control element, a grouping item or ARIA widget role
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isControl (domElement) {
    if (domElement.role === 'link') {
      return false;
    }
    const isGroupRole = domElement.role    === 'group';
    const isFormTag   = domElement.tagName === 'form';
    const isLabel     = domElement.tagName === 'label';
    const isLegend    = domElement.tagName === 'legend';
    const isMeter     = domElement.tagName === 'meter';
    return domElement.isInteractiveElement ||
           isFormTag   ||
           isGroupRole ||
           isLabel     ||
           isLegend    ||
           isMeter     ||
           domElement.ariaInfo.isWidget;
  }


  /**
   * @method update
   *
   * @desc Checks to see if the domElement is a HTML control element or has an ARIA
   *       widget role
   *
   * @param  {Object}  parentControlElement - ControlElement object representing the current
   *                                          ancestor controls in the DOM
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   *
   * @return  {Object}  ControlElement - ControlElement object for use as the parent ControlElement
   *                                     for descendant domElements
   */

  update (parentControlElement, domElement) {
    let controlElement = parentControlElement;
    if (this.isControl(domElement)) {
      controlElement = this.addChildControlElement(domElement, parentControlElement);
    }
    return controlElement;
  }

  /**
   * @method showControlInfo
   *
   * @desc showControlInfo is used for debugging the ControlInfo and ControlElement objects
   */

  showControlInfo () {
    if (debug.flag) {
      debug.log('== Control Tree ==', 1);
      this.childControlElements.forEach( ce => {
        debug.domElement(ce.domElement);
        ce.showControlInfo('  ');
      });
      debug.log('== Forms ==', 1);
      this.allFormElements.forEach( ce => {
        debug.domElement(ce.domElement);
      });
    }
  }
}


