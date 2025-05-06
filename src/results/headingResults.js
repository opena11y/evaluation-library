/* headingResults.js */

/* Imports */
import DebugLogging from '../debug.js';
import {
  cleanName
} from '../utils.js';

/* constants */
const debug = new DebugLogging('headingResults', false);
debug.flag = false;

/**
 * @class headingResults
 *
 * @desc Constructor for an object that contains information on headers
 */

export default class HeadingResults {
  constructor () {
    this.headingData = [];
  }

  get data () {
    return this.headingData;
  }

  update(domCache) {

    this.headingData = [];

    debug.flag && debug.log(`[        structureInfo]: ${domCache.structureInfo}`);
    debug.flag && debug.log(`[allHeadingDomElements]: ${domCache.structureInfo.allHeadingDomElements.length}`);

    domCache.structureInfo.allHeadingDomElements.forEach( de => {
      debug.flag && debug.log(`[tagName]: ${de.tagName}`);

      const dataItem = {
        level:             de.ariaInfo.ariaLevel,
        name:              cleanName(de.accName.name),
        ordinalPosition:   de.ordinalPosition,
        isVisibleOnScreen: de.visibility.isVisibleOnScreen,
        isVisibleToAT:     de.visibility.isVisibleToAT
      };

      this.headingData.push(dataItem);
    });

  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON object describing the document headings
   *
   * @return {String} see @desc
   */

  toJSON () {
    return JSON.stringify(this.headingData);
  }
}
