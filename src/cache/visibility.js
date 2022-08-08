/* visibility.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('visibility', false)

/**
 * @class Visibility
 *
 * @desc Identifies the properties used to determine the visibility of the element
 *       for both the graphical rendering and assistive technologies
 *
 * @param  {Object}  parentDomElement - Parent DomElement containing ancestor style information
 * @param  {Object}  elementNode      - dom element node 
 */

export default class Visibility {
  constructor (parentDomElement, elementNode) {
    let parentVisibility = parentDomElement ? parentDomElement.visibility : false;
    let style = window.getComputedStyle(elementNode, null);
    let tagName = elementNode.tagName ? elementNode.tagName : '';

    this.isHidden           = this.normalizeHidden (elementNode, parentVisibility);
    this.isAriaHidden       = this.normalizeAriaHidden (elementNode, parentVisibility);
    this.isDisplayNone      = this.normalizeDisplay (style, parentVisibility);
    this.isVisibilityHidden = this.normalizeVisibility (style, parentVisibility);
    this.isSmallHeight      = this.normalizeHeight(style, parentVisibility);
    this.isSmallFont        = this.getFontSize(style);

    // Set default values for visibility
    this.isVisibleOnScreen = true;
    this.isVisibleToAT     = true; // AT -> Assistive Technology

    if (this.isHidden ||
        this.isDisplayNone ||
        this.isVisibilityHidden) {

      if (tagName !== 'area') {
        this.isVisibleOnScreen = false;
        this.isVisibleToAT     = false;
      }
    }

    if (this.isSmallHeight ||
        this.isSmallFont) {
      this.isVisibleOnScreen = false;
    }

    if (this.isAriaHidden) {
      this.isVisibleToAT = false;
    }

    if (debug.flag) {
      debug.separator();
      debug.tag(elementNode);
      debug.log('[          isHidden]: ' + this.isHidden);
      debug.log('[      isAriaHidden]: ' + this.isAriaHidden);
      debug.log('[     isDisplayNone]: ' + this.isDisplayNone);
      debug.log('[isVisibilityHidden]: ' + this.isVisibilityHidden);
      debug.log('[     isSmallHeight]: ' + this.isSmallHeight);
      debug.log('[       isSmallFont]: ' + this.isSmallFont);
      debug.log('[ isVisibleOnScreen]: ' + this.isVisibleOnScreen);
      debug.log('[     isVisibleToAT]: ' + this.isVisibleToAT);
    }
  }

  /**
   * @method normalizeHidden
   *
   * @desc Determine if the hidden attribute is set on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node              - dom element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    hidden attribute 
   */

  normalizeHidden (node, parentVisibility) {
    let hidden = node.getAttribute('hidden');
    hidden = hidden ? true : false;
    if (parentVisibility &&
        parentVisibility.hidden)  {
      hidden = true;
    }
    return hidden;
  }

  /**
   * @method normalizeAriaHidden
   *
   * @desc Determine if the aria-hidden attribute is set to true on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node              - dom element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    aria-hidden attribute set to true 
   */

  normalizeAriaHidden (node, parentVisibility) {
    let hidden = false;
    let ariaHidden = node.getAttribute('aria-hidden');
    if (ariaHidden) {
      ariaHidden = ariaHidden.trim().toLowerCase();
      hidden = (ariaHidden === 'true') ? true : false;
    }
    if (parentVisibility &&
        parentVisibility.isAriaHidden)  {
      hidden = true;
    }
    return hidden;
  }

  /**
   * @method normalizeDisplay
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS display property
   *
   * @param {Object}  style             - Computed style object for an element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeDisplay (style, parentVisibility) {
    let display = style.getPropertyValue("display");
    let isDisplayNone = false;

    if ((display === 'none') || 
        (parentVisibility && parentVisibility.isDisplayNone)) {
      isDisplayNone = true;
    }

    return isDisplayNone;
  }

  /**
   * @method normalizeVisibility
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS visibility property
   *
   * @param {Object}  style             - Computed style object for an element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeVisibility (style, parentVisibility) {
    let visibility = style.getPropertyValue("visibility");
    let isVisibilityHidden =  parentVisibility.isVisibilityHidden; 

    if ((visibility === 'collapse') ||
        (visibility === 'hidden')) {
        isVisibilityHidden = true;
    }
    else {
      if (visibility === 'visible') {
        isVisibilityHidden = false;        
      }
    }
    return isVisibilityHidden;
  }

  /**
   * @method normalizeHeight
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on
   *       the CSS height and overflow properties
   *
   * @param {Object}  style             - Computed style object for an element node
   * @param {Object}  parentVisibility  - Computed visibility information for parent
   *                                      DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeHeight (style, parentVisibility) {
    const height   = parseFloat(style.getPropertyValue("height"));
    const overflow = style.getPropertyValue("overflow");
    return parentVisibility.isSmallHeight || ((height <= 1) && (overflow === 'hidden'));
  }

  /**
   * @method getFontSize
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on
   *       the CSS height and overflow properties
   *
   * @param {Object}  style             - Computed style object for an element node
   *
   * @return {Boolean}  Returns a true if content is small
   */

  getFontSize (style) {
    const fontSize = parseFloat(style.getPropertyValue("font-size"));
    return fontSize <= 1;
  }
}


