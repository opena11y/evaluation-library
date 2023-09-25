/* eventInfo.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('EventInfo', false);

/**
 * @class EventInfo
 *
 * @desc Collects information on the links in a web page
 */

export default class EventInfo {
  constructor (node) {
    this.hasClick  = node.hasAttribute('onclick');
    this.hasChange = node.hasAttribute('onchange');

    if (debug.flag) {
      console.log(`[hasClick ]: ${this.hasClick}`);
      console.log(`[hasChange]: ${this.hasChange}`);
    }
  }
}


