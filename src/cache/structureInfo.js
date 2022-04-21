/* structureInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('structureInfo', true);
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
   * @desc Creates a new LandmarkElement and to the array of
   *       LandmarkElements
   *
   * @param  {Object}  domElement       - New LandmarkElement object being added to StrutureInfo
   * @param  {Object}  parentLandmarkElement - LandmarkElement object representing that parent
   *                                           LandmarkElement
   */

  addChildLandmark (domElement, parentLandmarkElement) {
    const le = new LandmarkElement(domElement, parentLandmarkElement);
    this.allLandmarkElements.push(le);

    if (parentLandmarkElement) {
      parentLandmarkElement.addChildLandmark(le)
    } else {
      this.childLandmarkElements.push(le);
    }

    return le;
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

  isLandmark (domElement) {
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

  isHeading (domElement) {
    const tagName = domElement.tagName;
    const role = domElement.role;
    return (role === headingRole) || (headingTags.includes(tagName));
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement is a heading or landmark and if so adds the
   *       domElement to the StrutureInfo object and current LandmarkElement
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   *
   * @return  {Object}  LandmarkElement - Landmarklement object for use as the parent landmark
   *                                      element for descendant domElements
   */

  update (parentLandmarkElement, domElement) {
    let landmarkElement = parentLandmarkElement;
    if (this.isHeading(domElement)) {
      this.addChildHeading(domElement, parentLandmarkElement);
    }

    if (this.isLandmark(domElement)) {
      landmarkElement = this.addChildLandmark(domElement, parentLandmarkElement);
    }
    return landmarkElement;
  }

  /**
   * @method showStructureInfo
   *
   * @desc showSructureInfo is used for debugging the StructureInfo and LandmarkElement objects
   */

  showStructureInfo () {
    if (debug.flag) {
      debug.log('== Headings ==');
      this.allHeadingDomElements.forEach( h => {
        debug.domElement(h);
      });
      debug.log('== Landmarks ==', 1);
      this.allLandmarkElements.forEach( le => {
        debug.domElement(le.domElement);
        le.childHeadingDomElements.forEach( h => {
          debug.domElement(h, '  ');
        });
      });
    }
  }
};


