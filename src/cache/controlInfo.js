/* controlInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('widgetInfo', true);

/**
 * @class ControlElement
 *
 * @desc Idenifies a DOM element for native HTML controls and ARIA widgets.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class ControlElement {
  constructor (domElement, parentControlElement) {

    this.parentControlElement = parentControlElement;
    this.domElement = domElement;
    this.childControlElements = [];

    if (debug.flag) {
      debug.log('')
    }
  }

  addChildControlElement (controlElement) {
    this.childControlElements.push(controlElement);
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
};

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
    this.allFormControlElements  = [];
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
    const ce = new ControlElement(domElement, parentControlElement);
    this.allControlElements.push(ce);
    if (domElement.tagName === 'form') {
      this.allFormControlElements.push(ce);
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
    const isGroupRole = domElement.role === 'group';
    const isFormRole  = domElement.role === 'form';
    const isLabel     = domElement.tagName === 'label';
    return domElement.isInteractiveElement ||
           isFormRole ||
           isGroupRole ||
           isLabel ||
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
      this.allFormControlElements.forEach( ce => {
        debug.domElement(ce.domElement);
      });
    }
  }
};

