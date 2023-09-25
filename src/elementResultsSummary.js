/* elementResultSummary.js */

/* Imports */
import DebugLogging  from './debug.js';

const debug = new DebugLogging('ElementResultSummary', false);

/* ---------------------------------------------------------------- */
/*                             ResultSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @class ResultsSummary
 *
 * @desc Constructor for an object that contains summary of element, page, website
 *       results for rule result
 *
 * @property  {Integer}  p  - Number of element, page or website results that passed
 * @property  {Integer}  v  - Number of required element, page or website results that
 *                            failed
 * @property  {Integer}  w  - Number of recommended element, page or website results
 *                            that failed
 * @property  {Integer}  mc - Number of element, page or website results that require
 *                            a mannual check
 * @property  {Integer}  h  - Number of element, page or website results that are hidden
 */

export default class ResultsSummary {
  constructor () {
    // Element result counts
    this.p   = 0;
    this.v   = 0;
    this.w   = 0;
    this.mc  = 0;
    this.h   = 0;

    debug.flag && debug.log(`[ElementResultsSummary]: ${this.toString()}`);
  }

  get violations()     { return this.v;   }
  get warnings()       { return this.w;   }
  get manual_checks()  { return this.mc;  }
  get passed()         { return this.p;   }
  get hidden()         { return this.h;   }

  /**
   * @method hasResults
   *
   * @desc True if at least one element results is a violation, warning, manual check
   *       or passed, otherwise false (e.g no element results or all hidden)
   *
   * @return {Boolean} see description
   */

  hasResults () {
    return (this.v || this.w || this.mc || this.p);
  }

  /**
   * @method addViolations
   * @private
   *
   * @desc Adds violation element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addViolations ( n ) {
    if (n > 0) {
      this.v += n;
    }
  }

  /**
   * @method addWarnings
   *
   * @desc Adds warning element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addWarnings ( n ) {
    if (n > 0) {
      this.w += n;
    }
  }

  /**
   * @method addManualChecks
   *
   * @desc Adds manual check element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

  addManualChecks ( n ) {
    if ( n > 0) {
      this.mc += n;
    }
  }

  /**
   * @method addPassed
   *
   * @desc Adds passed element results to the summary calculation
   *
   * @param  {Integer}  n  - Number of element results that passed
   */

   addPassed ( n ) {
     if (n > 0) {
       this.p += n;
     }
   }

  /**
   * @method addHidden
   * @private
   *
   * @desc Adds hidden element results to the summary calculation
   *
   * @param  {Integer}  n  -  Number of element results that are hidden
   */

  addHidden ( n ) {
    if (n > 0) {
      this.h += n;
    }
  }

  /*
   * @method toString
   *
   * @desc output information about the summary
   *
   * @return  {String}  Information about element summary
   */

  toString () {
    return "V: " + this.v + " W: " + this.w + " MC: " + this.mc + " P: " + this.p + " H: " + this.h;
  }
}
