/* structureInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('structureInfo', false);
const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const headingRole = 'heading';
const landmarkRoles = ['banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search'];
const requireAccessibleNames = ['region', 'form'];

/**
 * @class LandmarkElement
 *
 * @desc Idenifies a DOM element as being a landmark and relationships to other landmarks and headings.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class LandmarkElement {
  constructor (domElement, parentLandmarkElement) {

    this.parentLandmarkElement = parentLandmarkElement;
    this.domElement = domElement;
    this.childLandmarkElements = [];
    this.childHeadingDomElements = [];

    if (debug.flag) {
    }
  }

  addChildLandmark (LandmarkElement) {
    this.childLandmarkElements.push(LandmarkElement);
  }

  addChildHeading (domElement) {
    this.childHeadingDomElements.push(domElement);
  }

};

/**
 * @class StructureInfo
 *
 * @desc Collects information on the landmarks or headings on a web page for use in
 *       rules
 *
 * @param  {Object}  structuralInfo   - Structural Information
 */

export default class StructureInfo {
  constructor () {

    this.allLandmarkElements = [];
    this.allHeadingDomElements = [];
    this.childLandmarkElements = [];

    if (debug.flag) {
    }
  }

  /**
   * @method addChildLandmark
   *
   * @desc
   *
   * @param  {Object}  domElement            - DOMElement object representing an element in the DOM
   * @param  {Object}  parentLandmarkElement - LandmarkElement object representing an landmark region
   */

  addChildLandmark (domElement, parentLandmarkElement) {
    const landmarkElement = new LandmarkElement(domElement, parentLandmarkElement);
    this.allLandmarkElements.push(landmarkElement);

    if (parentLandmarkElement) {
      parentLandmarkElement.addChildLandmark(landmarkElement)
    } else {
      this.childLandmarkElements.push(landmarkElement);
    }
  }

  /**
   * @method addChildHeading
   *
   * @desc
   *
   * @param  {Object}  domElement            - DOMElement object representing an element in the DOM
   * @param  {Object}  parentLandmarkElement - LandmarkElement object representing an landmark region
   */

  addChildHeading (domElement, parentLandmarkElement) {
    this.allHeadingDomElements.push(domElement);
    if (parentLandmarkElement) {
      parentLandmarkElement.addChildHeading(domElement)
    }
  }

  /**
   * @method isLandmark
   *
   * @desc Tests if a domElement is a landmark
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isLandmark(domElement) {
    let flag = false;
    const role = domElement.role || domElement.defaultRole;
    const name = domElement.accessibleName;

    if (landmarkRoles.includes(role)) {
      if (requireAccessibleNames.includes(role)) {
        flag = name && name.length;
      } else {
        flag = true;
      }
    }

    return flag;
  }

  /**
   * @method isHeading
   *
   * @desc Tests if a domElement is a heading
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isHeading(domElement) {
    const tagName = domElement.tagName;
    const role = domElement.role;
    return (role === headingRole) || (headingTags.includes(tagName));
  }

  update(parentLandmarkElement, domElement) {
    let landmarkElement = parentLandmarkElement;
    if (this.isHeading(domElement)) {
      this.addChildHeading(domElement, parentLandmarkElement);
    }

    if (this.isLandmark(domElement)) {
      const le = new LandmarkElement(domElement, parentLandmarkElement);
      this.addChildLandmark(le, parentLandmarkElement);
      landmarkElement = le;
    }
    return landmarkElement;
  }
};


