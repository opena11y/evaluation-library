/* landmarkRegionResults.js */

/* Imports */
import DebugLogging from '../debug.js';
import {
  cleanName
} from '../utils.js';

/* constants */
const debug = new DebugLogging('landmarkRegionResults', false);
debug.flag = false;

/**
 * @class landmarkRegionResults
 *
 * @desc Constructor for an object that contains information on landmark regions
 */

export default class LandmarkRegionResults {
  constructor () {
    this.regionData = [];
  }

  get data () {
    return this.regionData;
  }

  update(domCache) {

    debug.flag && debug.log(`[        structureInfo]: ${domCache.structureInfo}`);
    debug.flag && debug.log(`[allLandmarkDomElements]: ${domCache.structureInfo.allLandmarkElements.length}`);

    this.regionData = [];

    domCache.structureInfo.allLandmarkElements.forEach( le => {
      const de = le.domElement;
      debug.flag && debug.log(`[role]: ${de.role}`);

      const dataItem = {
        role:              de.role.toLowerCase(),
        name:              cleanName(de.accName.name),
        ordinalPosition:   de.ordinalPosition,
        isVisibleOnScreen: de.visibility.isVisibleOnScreen,
        isVisibleToAT:     de.visibility.isVisibleToAT
      };

      this.regionData.push(dataItem);
    });

  }

  /**
   * @method toJSON
   *
   * @desc Returns a JSON object describing the document landmark regions
   *
   * @return {String} see @desc
   */

  toJSON () {
    return JSON.stringify(this.regionData);
  }
}
