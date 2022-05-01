/* resultSummary.js */

/* Imports */
import DebugLogging  from '../debug.js';

const debug = new DebugLogging('elementResultSummary', false);

/* ---------------------------------------------------------------- */
/*                             ElementResultSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @constructor ElementResultsSummary
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains summary of element results for rule
 *       result, cache item result, rule result group result or evaluation result
 *       objects
 *
 * @property  {Number}  passed        - Number of element results that passed the
 *                                      rule (value >= 0)
 * @property  {Number}  page          - Number of element results that contribute to
 *                                      a page level manual check
 * @property  {Number}  violations    - Number of element results that failed the
 *                                      rule as a violation (value >= 0)
 * @property  {Number}  warnings      - Number of element results that failed the
 *                                      rule as a warning (value >= 0)
 * @property  {Number}  manual_checks - Number of element results that require a
 *                                      manual check (value >= 0)
 * @property  {Number}  hidden        - Number of element results that are hidden
 *                                      (value >= 0)
 */

export default class ElementResultsSummary {
  constructor () {
    // Element result counts
    this.p   = 0;  // Pass result (p)
    this.v   = 0;  // Fail result (f)
    this.w   = 0;  // Fail result (f)
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
   * @memberOf OpenAjax.a11y.ElementResultSummary
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
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc Adds violation element results to the summary calculation
   *
   * @param  {Number}  n  - Number of element results that passed
   */

  addViolations ( n ) {
    if (n > 0) {
      this.v += n;
    }
  }

  /**
   * @method addWarnings
   *
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc Adds warning element results to the summary calculation
   *
   * @param  {Number}  n  - Number of element results that passed
   */

  addWarnings ( n ) {
    if (n > 0) {
      this.w += n;
    }
  }

  /**
   * @method addManualChecks
   *
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc Adds manual check element results to the summary calculation
   *
   * @param  {Number}  n  - Number of element results that passed
   */

  addManualChecks ( n ) {
    if ( n > 0) {
      this.mc += n;
    }
  }

  /**
   * @method addPassed
   *
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc Adds passed element results to the summary calculation
   *
   * @param  {Number}  n  - Number of element results that passed
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
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc Adds hidden element results to the summary calculation
   *
   * @param  {Number}  n  -  Number of element results that are hidden
   */

  addHidden ( n ) {
    if (n > 0) {
      this.h += n;
    }
  }

  /*
   * @method toString
   *
   * @memberOf OpenAjax.a11y.ElementResultSummary
   *
   * @desc output information about the summary
   *
   * @return  {String}  Information about element summary
   */

  toString () {
    return "V: " + this.v + " W: " + this.w + " MC: " + this.mc + " P: " + this.p + " H: " + this.h;
  }
}
