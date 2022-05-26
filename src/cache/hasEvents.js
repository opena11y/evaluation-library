/* hasEvents.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('hasEvents', false)

/**
 * @class Events
 *
 * @desc Identifies inline HTML event handlers
 *
 * @param  {Object}  elementNode      - dom element node 
 */

export default class HasEvents {
  constructor (elementNode) {
    this.onChange = elementNode.hasAttribute('onchange');
  }
}
