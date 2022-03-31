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

  addchildLandmark (LandmarkElement) {
    this.childLandmarkElements.push(LandmarkElement);
  }


  addchildHeading (domElement) {
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
    this.allHeadingDomELements = [];
    this.childLandmarkElements = [];

    if (debug.flag) {
    }
  }

  addchildLandmark (domElement, parentLandmarkElement) {
    const landmarkElement = new LandmarkElement(domElement, parentLandmarkElement);
    this.allLandmarkElements.push(landmarkElement);

    if (parentLandmarkElement) {
      parentLandmarkElement.childLandmarkElements(landmarkElement)
    } else {
      this.childLandmarkElements(landmarkElement);
    }
  }


  addchildHeading (domElement, parentLandmarkElement) {
    this.allHeadingDomElements.push(domElement);
    if (parentLandmarkElement) {
      parentLandmarkElement.addChildHeading(domElement)
    }
  }

  isLandmark(domElement) {
    const flag = false;
    const role = domElement.role || domElement.defaultRole;
    const name = domElement.accessibleName;

    if (landmarkRoles.indexOf(role) >= 0) {

      if (requireAccessibleNames.indexOf(role) >= 0) {
        flag = name && name.length;
      } else {
        flag = true;
      }
    }

    return flag;
  }

  isHeading(domElement) {
    const tagName = domElement.tagName;
    const role = domElement.role;
    return (role === headingRole) || (headingTags.indexOf(tagName) >= 0);
  }

};


