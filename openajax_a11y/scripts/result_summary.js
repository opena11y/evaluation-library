/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

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

OpenAjax.a11y.info.ElementResultsSummary = function () {

  // Element result counts
  var p   = 0;  // Pass result (p)
  var v   = 0;  // Fail result (f)
  var w   = 0;  // Fail result (f)
  var mc  = 0;
  var h   = 0;


  return {

     get violations()     { return v;   },
     get warnings()       { return w;   },
     get manual_checks()  { return mc;  },
     get passed()         { return p;   },
     get hidden()         { return h;   },

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

    hasResults : function() {

      if (v | w | mc | p) return true;

      return false;
    },

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

    addViolations : function(n) {
      if (n > 0) {
        v += n;
      }
    },

    /**
     * @method addWarnings
     *
     * @memberOf OpenAjax.a11y.ElementResultSummary
     *
     * @desc Adds warning element results to the summary calculation
     *
     * @param  {Number}  n  - Number of element results that passed
     */

    addWarnings : function(n) {
      if (n > 0) {
        w += n;
      }
    },


    /**
     * @method addManualChecks
     *
     * @memberOf OpenAjax.a11y.ElementResultSummary
     *
     * @desc Adds manual check element results to the summary calculation
     *
     * @param  {Number}  n  - Number of element results that passed
     */

    addManualChecks : function(n) {
      if ( n > 0) {
        mc += n;
      }
    },

    /**
     * @method addPassed
     *
     * @memberOf OpenAjax.a11y.ElementResultSummary
     *
     * @desc Adds passed element results to the summary calculation
     *
     * @param  {Number}  n  - Number of element results that passed
     */

     addPassed : function(n) {
       if (n > 0) {
         p   += n;
       }
     },

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

    addHidden : function(n) {
      if (n > 0) {
        h += n;
      }
    },

    /*
     * @method toString
     *
     * @memberOf OpenAjax.a11y.ElementResultSummary
     *
     * @desc output information about the summary
     *
     * @return  {String}  Information about element summary
     */

    toString : function() {
      return "V: " + v + " W: " + w + " MC: " + mc + " P: " + p + " H: " + h;
    }
  };
};


/* ---------------------------------------------------------------- */
/*                             RuleResultsSummary                        */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleResultsSummary
 *
 * @memberOf OpenAjax.a11y.info
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

OpenAjax.a11y.info.RuleResultsSummary = function () {

  var v   = 0;  // Number of rule results with are violations
  var w   = 0;  // Number of rule results with are warnings
  var mc  = 0;  // Number of rule results with are manual checks
  var p   = 0;  // Number of rule results with are passed
  var na  = 0;  // Number of rule results with are not applicable
  var hmc = 0;  // True if any of the rule results includes at least one element
                // result that is a manual check

  var t   =  0;  // total number of rule results with results
  var sum =  0;  // summ of the implementation scores for all rule results
  var is  = -1;  // implementation score for group
  var iv  = OpenAjax.a11y.IMPLEMENTATION_VALUE.UNDEFINED; // implementation value for the group

  return {
     get violations()     { return v;  },
     get warnings()       { return w;  },
     get manual_checks()  { return mc; },
     get passed()         { return p;  },
     get not_applicable() { return na;  },

     get implementation_score() { return is;  },
     get implementation_value() { return iv;  },

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

     addRuleResult : function(rule_result) {

       var IMPLEMENTATION_VALUE = OpenAjax.a11y.IMPLEMENTATION_VALUE;
       var RULE_RESULT_VALUE    = OpenAjax.a11y.RULE_RESULT_VALUE;

       var rrv = rule_result.getResultValue();

       if (rrv === RULE_RESULT_VALUE.VIOLATION        ) v  += 1;
       else if (rrv === RULE_RESULT_VALUE.WARNING     ) w  += 1;
       else if (rrv === RULE_RESULT_VALUE.MANUAL_CHECK) mc += 1;
       else if (rrv === RULE_RESULT_VALUE.PASS        ) p  += 1;
       else  na += 1;

       hmc = hmc || (rule_result.getElementResultsSummary().manual_checks > 0);

       var rris = rule_result.getImplementationScore();

       if (rris >= 0) {
         t += 1;
         sum = sum + rris;
         is = Math.round(sum/t);
         if ((is === 100) && ((v+w) > 0)) is = 99;
       }

       if (hmc) iv = IMPLEMENTATION_VALUE.MANUAL_CHECKS_ONLY;
       else iv = IMPLEMENTATION_VALUE.NOT_APPLICABLE;

       if (is === 100) {
         if (hmc) iv = IMPLEMENTATION_VALUE.COMPLETE_WITH_MANUAL_CHECKS;
         else iv = IMPLEMENTATION_VALUE.COMPLETE;
       } else if (is > 95) iv = IMPLEMENTATION_VALUE.ALMOST_COMPLETE;
       else if (is > 50)   iv = IMPLEMENTATION_VALUE.PARTIAL_IMPLEMENTATION;
       else if (is >= 0)   iv = IMPLEMENTATION_VALUE.NOT_IMPLEMENTED;

     },

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

    hasResults : function() {

      if (v | w | mc | p | na) return true;

      return false;
    },

    /**
     * @method toString
     *
     * @memberOf OpenAjax.a11y.RuleResultsSummary
     *
     * @desc output information about the summary
     *
     * @return  {String}  Information about rule summary
     */

    toString : function() {
      return "V: " + v + " W: " + w + " MC: " + mc + " P: " + p + " NA: " + na;
    }

  };
};

