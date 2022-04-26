/* resultSummary.js */

/* Imports */
import DebugLogging  from '../debug.js';

/* Constants */
import {
  IMPLEMENTATION_VALUE,
  RULE_RESULT_VALUE
} from './constants.js';

const debug = new DebugLogging('resultSummary', false);

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

export class ElementResultsSummary {
  constructor () {
    // Element result counts
    this.p   = 0;  // Pass result (p)
    this.v   = 0;  // Fail result (f)
    this.w   = 0;  // Fail result (f)
    this.mc  = 0;
    this.h   = 0;
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

  debug () {
    if (debug.flag) {
      debug.log(this.toString());
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


/* ---------------------------------------------------------------- */
/*                             RuleResultsSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleResultsSummary
 *
 * @desc Constructor for an object that contains summary of rule results for a
 *       set of rule result objects or a cache item result
 *
 * @property  {Number}  violations      - Number of rule results with at
 *                                        least one violation
 * @property  {Number}  warnings        - Number of rule results with at
 *                                        least one warning
 * @property  {Number}  failures        - Number of rule results with at
 *                                        least one violation or warning
 * @property  {Number}  manual_checks   - Number of rule results with at
 *                                        least one manual check
 * @property  {Number}  passed          - Number of rule results that all
 *                                        element results pass
 * @property  {Number}  not_applicable  - Number of rule results with no
 *                                        element results
 */

export class RuleResultsSummary  {

  constructor () {
    this.v   = 0;  // Number of rule results with are violations
    this.w   = 0;  // Number of rule results with are warnings
    this.mc  = 0;  // Number of rule results with are manual checks
    this.p   = 0;  // Number of rule results with are passed
    this.na  = 0;  // Number of rule results with are not applicable
    this.hmc = 0;  // True if any of the rule results includes at least one element
                  // result that is a manual check

    this.t   =  0;  // total number of rule results with results
    this.sum =  0;  // summ of the implementation scores for all rule results
    this.is  = -1;  // implementation score for group
    this.iv  = IMPLEMENTATION_VALUE.UNDEFINED; // implementation value for the group
  }

   get violations()     { return this.v;  }
   get warnings()       { return this.w;  }
   get manual_checks()  { return this.mc; }
   get passed()         { return this.p;  }
   get not_applicable() { return this.na;  }

   get implementation_score() { return this.is;  }
   get implementation_value() { return this.iv;  }

  /**
   * @method addRuleResult
   *
   * @memberOf OpenAjax.a11y.RuleResultsSummary
   * @private
   *
   * @desc Adds rule result to the summary calculation
   *
   * @param  {RuleResult}  rule_result  - Rule result object to add to summary
   */

  addRuleResult ( rule_result ) {

    var rrv = rule_result.getResultValue();

    if (rrv === RULE_RESULT_VALUE.VIOLATION        ) this.v  += 1;
    else if (rrv === RULE_RESULT_VALUE.WARNING     ) this.w  += 1;
    else if (rrv === RULE_RESULT_VALUE.MANUAL_CHECK) this.mc += 1;
    else if (rrv === RULE_RESULT_VALUE.PASS        ) this.p  += 1;
    else  this.na += 1;

    this.hmc = this.hmc || (rule_result.getElementResultsSummary().manual_checks > 0);

    const rris = rule_result.getImplementationScore();

    if (rris >= 0) {
      this.t += 1;
      this.sum = this.sum + rris;
      this.is = Math.round(this.sum/this.t);
      if ((this.is === 100) && ((this.v + this.w) > 0)) {
        this.is = 99;
      }
    }

    if (this.hmc) {
      this.iv = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;
    }
    else {
      this.iv = IMPLEMENTATION_VALUE.NOT_APPLICABLE;
    }

    if (this.is === 100) {
      if (this.hmc) {
        this.iv = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
      }
      else {
        this.iv = IMPLEMENTATION_VALUE.COMPLETE;
      }
    } else {
      if (this.is > 95) this.iv = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
      else if (this.is > 50) this.iv = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
      else if (this.is >= 0) this.iv = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;
    }

  }

  /**
   * @method hasResults
   *
   * @desc True if at least one element results is a violation, warning, manual check
   *       or passed, otherwise false (e.g no element results or all hidden)
   *
   * @return {Boolean} see description
   */

  hasResults () {
    return this.v || this.w || this.mc || this.p || this.na;
  }

  debug () {
    if (debug.flag) {
      debug.log(this.toString());
    }
  }

  /**
   * @method toString
   *
   * @memberOf OpenAjax.a11y.RuleResultsSummary
   *
   * @desc output information about the summary
   *
   * @return  {String}  Information about rule summary
   */

  toString () {
    return "V: " + this.v + " W: " + this.w + " MC: " + this.mc + " P: " + this.p + " NA: " + this.na;
  }
}
