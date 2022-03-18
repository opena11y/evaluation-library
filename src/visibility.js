/* colorContrast.js */

// Debug resources
const debug = true;
function debugConsole(s) {
  if (debug) {
    console.log('[Visibility]' + s);
  } 
}

// Constants

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
    let parentComputedStyle = parentDomElement ? parentDomElement.computedStyle : false;
    let style = window.getComputedStyle(elementNode, null);
    let tagName = elementNode.tagName ? elementNode.tagName : '';

    this.isHidden           = this.normalizeHidden (elementNode, parentComputedStyle);
    this.isAriaHidden       = this.normalizeAriaHidden (elementNode, parentComputedStyle);
    this.isDisplayNone      = this.normalizeDisplay (style, parentComputedStyle);
    this.isVisibilityHidden = this.normalizeVisibility (style, parentComputedStyle);

    // Set default values for visibility
    this.isVisibleOnScreen = true;
    this.isVisibleToAT     = true; // AT -> Assistive Technology

    if (this.isHidden ||
        this.isDisplayNone ||
        this.isVisibilityHidden) {

      if (this.isHidden && (tagName !== 'area')) {
        this.isVisibleOnScreen = false;
        this.isVisibleToAt     = false;
      }
    }

    if (this.isAriaHidden) {
        this.isVisibleToAt = false;
    }

    debugConsole('-------------------');
    debugConsole('[               tag]: ' + elementNode.tagName);
    debugConsole('[          isHidden]: ' + this.isHidden);
    debugConsole('[      isAriaHidden]: ' + this.isAriaHidden);
    debugConsole('[     isDisplayNone]: ' + this.isDisplayNone);
    debugConsole('[isVisibilityHidden]: ' + this.isVisibilityHidden);
    debugConsole('[ isVisibleOnScreen]: ' + this.isVisibleOnScreen);
    debugConsole('[     isVisibleToAT]: ' + this.isVisibleToAT);
  }

  /**
   * @method normalizeHidden
   *
   * @desc Determine if the hidden attribute is set on this element
   *       or one of its ancestors 
   *
   * @param {Object}  node                 - dom element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    hidden attribute 
   */

  normalizeHidden (node, parentComputedStyle) {
    let hidden = node.getAttribute('hidden');
    hidden = hidden ? true : false;
    if (parentComputedStyle && 
        parentComputedStyle.hidden)  {
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
   * @param {Object}  node                 - dom element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns true if element or one of its ancestors has the 
   *                    aria-hidden attribute set to true 
   */

  normalizeAriaHidden (node, parentComputedStyle) {
    let ariaHidden = node.getAttribute('aria-hidden');
    if (ariaHidden) {
      ariaHidden = ariaHidden.toLowerCase();
    }
    ariaHidden = (ariaHidden === 'true') ? true : false;

    if (parentComputedStyle && 
        parentComputedStyle.ariaHidden)  {
      ariaHidden = true;
    }
    return ariaHidden;
  }

  /**
   * @method normalizeDisplay
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS display property
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeDisplay (style, parentComputedStyle) {
    let display = style.getPropertyValue("display");
    let isDisplayNone = false;

    if ((display === 'none') || 
        (parentComputedStyle && parentComputedStyle.isDisplayNone)) {
      isDisplayNone = true;
    }

    return isDisplayNone;
  }

  /**
   * @method normalizeVisiibility
   *
   * @desc Computes a boolean value to indicate whether the content or its
   *       ancestor that results in content not being displayed based on 
   *       the CSS visibility property
   *
   * @param {Object}  style                - Computed style object for an element node 
   * @param {Object}  parentComputedStyle  - Computed style information for parent 
   *                                         DomElement
   *
   * @return {Boolean}  Returns a true if content is visible
   */

  normalizeVisibility (style, parentComputedStyle) {
    let visibility = style.getPropertyValue("visibility");
    let isVisibilityHidden = false; 

    if ((visibility === 'collapse') ||
        (visibility === 'hidden')) {
        isVisibilityHidden = true;
    }
    return isVisibilityHidden;
  }

};


