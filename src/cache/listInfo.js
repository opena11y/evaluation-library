/* listInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('ListInfo', true);
const allListitemRoles = ['list', 'listitem', 'menu', 'menuitem', 'menuitemcheckbox', 'menuitemradio'];
const listRoles = ['list', 'menu'];

/**
 * @class ListElement
 *
 * @desc Idenifies a DOM element as being a container for a list of items.
 *
 * @param  {Object}  domElement   - Structural Information
 */

class ListElement {
  constructor (domElement, parentListElement) {

    this.parentListElement = parentListElement;
    this.domElement = domElement;
    this.childListElements = [];
    this.isListRole = this.isList(domElement);
    this.linkCount = 0;  // Used in determining if a list is for navigation

    if (debug.flag) {
      debug.log('')
    }
  }

  /**
   * @method isList
   *
   * @desc Tests if a domElement is a list
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isList (domElement) {
    const role = domElement.role;
    return listRoles.includes(role);
  }

  addChildListitem (listElement) {
    this.childListElements.push(listElement);
  }

  showListInfo (prefix) {
    if (typeof prefix !== 'string') {
      prefix = '';
    }
    debug.log(`${prefix}[List Count]: ${this.childListElements.length} [Link Count]: ${this.linkCount}`);
    this.childListElements.forEach( le => {
      debug.domElement(le.domElement, prefix);
      le.showListInfo(prefix + '  ');
    });
  }
};

/**
 * @class ListInfo
 *
 * @desc Collects information on the list elements on a web page for use in
 *       rules
 *
 * @param  {Object}  ListInfo   - Structural Information
 */

export default class ListInfo {
  constructor () {

    this.allListElements = [];
    this.childListElements = [];
    this.linkCount = 0;
  }

  /**
   * @method addChildListitem
   *
   * @desc Creates a new ListElement and to the array of
   *       ListElements
   *
   * @param  {Object}  domElement        - New ListElement object being added to ListInfo
   * @param  {Object}  parentListElement - ListElement object representing that parent ListElement
   *
   */

  addChildListitem (domElement, parentListElement) {
    const le = new ListElement(domElement, parentListElement);
    this.allListElements.push(le);

    if (parentListElement) {
      parentListElement.addChildListitem(le)
    } else {
      this.childListElements.push(le);
    }
    return le;
  }

  /**
   * @method isListitem
   *
   * @desc Tests if a domElement is a listitem
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isListitem (domElement) {
    const role = domElement.role;
    return allListitemRoles.includes(role);
  }

  /**
   * @method isLink
   *
   * @desc Tests if a domElement is a link
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   */

  isLink (domElement) {
    return domElement.role === 'link';
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement is a list item and if so adds the
   *       domElement to the List Info object and current ListElement
   *
   * @param  {Object}  domElement - DOMElement object representing an element in the DOM
   *
   * @return  {Object}  ListElement - ListElement object for use as the parent ListElement
   *                                  for descendant domElements
   */

  update (parentListElement, domElement) {
    let listElement = parentListElement;
    if (this.isListitem(domElement)) {
      listElement = this.addChildListitem(domElement, parentListElement);
    }
    if (this.isLink(domElement)) {
      this.linkCount += 1;
      while (parentListElement) {
        if (parentListElement.isListRole) {
          parentListElement.linkCount += 1;
          break;
        }
        parentListElement = parentListElement.parentListElement;
      }
    }
    return listElement;
  }

  /**
   * @method showListInfo
   *
   * @desc showListInfo is used for debugging the ListInfo and ListElement objects
   */

  showListInfo () {
    if (debug.flag) {
      debug.log('== All ListElements ==', 1);
      debug.log(`[linkCount]: ${this.linkCount}`)
      this.allListElements.forEach( le => {
        debug.domElement(le.domElement);
      });
      debug.log('== List Tree ==', 1);
      debug.log(`[linkCount]: ${this.linkCount}`)
      this.childListElements.forEach( le => {
        debug.domElement(le.domElement);
        le.showListInfo('  ');
      });
    }
  }
};


