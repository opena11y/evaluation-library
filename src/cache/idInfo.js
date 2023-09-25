/* linkInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('idInfo', false);

/**
 * @class idInfo
 *
 * @desc Collects information on the ids in a web page
 */

export default class IdInfo {
  constructor () {
    this.idCountsByDoc = [];
  }

  /**
   * @method update
   *
   * @desc Checks to see if the domElement has a role of "link"
   *
   * @param  {Object}  domElement        - DOMElement object representing an element in the DOM
   */

  update (documentIndex, domElement) {
    const id = domElement.node.id;
    if (id) {
      if (!this.idCountsByDoc[documentIndex]) {
        this.idCountsByDoc[documentIndex] = {};
      }
      if (this.idCountsByDoc[documentIndex][id]) {
        this.idCountsByDoc[documentIndex][id] += 1;       
      }
      else {
        this.idCountsByDoc[documentIndex][id] = 1;       
      }
    }
  }

  /**
   * @method showIdInfo
   *
   * @desc showIdInfo is used for debugging the IdInfo object
   */

  showIdInfo () {
    if (debug.flag) {
      debug.log('== All Links ==', 1);
      this.idCounts.for( id => {
        debug.log(`[${id}]: ${this.idCounts[id]}`);
      });
    }
  }
}


