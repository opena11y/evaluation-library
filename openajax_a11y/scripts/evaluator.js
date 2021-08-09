/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* ---------------------------------------------------------------- */
/*                       EvaluatorFactory                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor EvaluatorFactory
 *
 * @memberOf OpenAjax.a11y
 *
 */

/**
 * @private
 * @constructor Internal Properties
 * NOTE: The following properties are defined when the ruleset is loaded
 *
 * @property {Object}  ruleset              - id of the ruleset
 * @property {Boolean} broken_link_testing  - If true test links for validity
 * @property {String}  event_processing     - String identifying how to detect event handlers
 *
 */

OpenAjax.a11y.EvaluatorFactory = {

  newInstance : function() {

    var ruleset             = null;
    var broken_link_testing = false;
    var event_processing    = "fae-util";
    var groups              = OpenAjax.a11y.RULE_GROUP.GROUP123;

    return {

      setParameter : function(name, value) {

        if (typeof name === 'string') {
          name = name.toLowerCase();
        }
        else {
          throw new Error("[EvaluatorFactory] parameter name is not a string");
        }

        switch (name) {

        case 'ruleset':
          if (value) {
            ruleset = value;
            return true;
          }
          else {
            throw new Error("[EvaluatorFactory] Invalid Ruleset Object");
          }

        default:
          throw new Error("[EvaluatorFactory] " + name + " is not a supported parameterå");
        } // end switch

      }, // end setParameter

      setFeature : function(name, value) {

        if (typeof name === 'string') {
          name = name.toLowerCase();
        }
        else {
          throw new Error("[EvaluatorFactory] feature name is not a string");
        }

        switch (name) {

        case 'groups':
          if ((typeof value === 'number') &&
              (value >= OpenAjax.a11y.RULE_GROUP.GROUP1) &&
              (value <= OpenAjax.a11y.RULE_GROUP.GROUP123)) {
            groups = value;
//            OpenAjax.a11y.logger.debug("[EvaluatorFactory] Groups: " + groups);
            return true;
          }
          else {
            throw new Error("[EvaluatorFactory] group is not a number or out of range");
          }


        case 'eventprocessing':

          if (typeof value === 'string') {

            value = value.toLowerCase();

            switch (value) {

            case 'fae-util':
            case 'firefox':
            case 'none':
              event_processing = value;
              OpenAjax.a11y.EVENT_HANDLER_PROCESSOR = value;
//              OpenAjax.a11y.logger.debug("[EvaluatorFactory] event processing: " + event_processing);
              return true;

            default:
              event_processing = "none";
              OpenAjax.a11y.EVENT_HANDLER_PROCESSOR = "none";
              throw new Error("[EvaluatorFactory] Invalid event processor: " + value);
            } // end switch

          }
          else {
            throw new Error("[EvaluatorFactory] Event processor value is not a string ");
          }

        case 'brokenlinktesting':

          if (typeof value !== 'boolean') {
            throw new Error("[EvaluatorFactory] Broken link testing value is not a boolean value (e.g. true, false)");
          }
          broken_link_testing = value;

          break;

        default:
          throw new Error("[EvaluatorFactory] " + name + " is not a supported feature");
        } // end switch
        return false;
      },  // end setFeature

      newEvaluator : function() {

//        OpenAjax.a11y.logger.debug("[EvaluatorFactory][newEvaluator] Ruleset: " + ruleset);
//        OpenAjax.a11y.logger.debug("[EvaluatorFactory][newEvaluator] broken link testing: " + broken_link_testing);

        var e = new OpenAjax.a11y.Evaluator(ruleset, broken_link_testing, event_processing, groups);

        return e;
      }
    };
  }
};


/* ---------------------------------------------------------------- */
/*                       Evaluator                                  */
/* ---------------------------------------------------------------- */

/**
 * @constructor Evaluator
 *
 * @memberOf OpenAjax.a11y
 *
 */

/**
 * @private
 * @constructor Internal Properties
 * NOTE: The following properties are defined when the ruleset is loaded
 *
 * @property {Object}  r    - id of the ruleset
 * @property {Boolean} blt  - If true test links for validity
 * @property {String}  ep   - String identifying how to detect event handlers
 * @property {Number}  grps - Number identifying which rules should be evaluated by rule group
 *
 */

OpenAjax.a11y.Evaluator = function (r, blt, ep, grps) {

//  OpenAjax.a11y.logger.debug("[Evaluator] Ruleset: " + r + " BLT: " + blt + " EP:" + ep );

  var ruleset             = r;
  var broken_link_testing = blt;
  var event_processing    = ep;
  var groups              = grps;

  return {

    /**
     * @method evaluate
     *
     * @memberOf OpenAjax.a11y.Evaluator.Evaluator
     *
     * @desc Evaluate a document using the OpenAjax ruleset and return an evaluation object
     *
     * @param  {Object}    doc       - Browser document object model (DOM) to be evaluated
     * @param  {String}    title     - Title of document being analyzed
     * @param  {String}    url       - url of document being analyzed
     */

    evaluate : function (doc_1, title, url_1, compat1, compat2) {

      var doc   = doc_1;
      var url   = url_1;

      if (typeof compat2 === 'boolean') {
        doc   = url_1;
        url   = doc_1;
      }

     // OpenAjax.a11y.logger.debug("Starting evaluation: " + this.ruleset_id + " " + this.default_name + " " + this.number_of_rules + " rules" );

      var dom_cache = new OpenAjax.a11y.cache.DOMCache(url, title, doc);

      dom_cache.updateDOMElementCache();
      dom_cache.updateAllCaches();

      var evaluation_result = new OpenAjax.a11y.EvaluationResult(doc, title, url, ruleset, dom_cache);

      OpenAjax.a11y.logger.info("Starting evaluation....");
      OpenAjax.a11y.logger.info("         URL: " + url);
      OpenAjax.a11y.logger.info("     RULESET: " + ruleset.getRulesetInfo().title);

      var rule_mappings = ruleset.getRuleMappingsArray();
      var rule_mappings_len = rule_mappings.length;

      for (var i = 0; i < rule_mappings_len; i++) {

        var rule_mapping = rule_mappings[i];
        var rule = rule_mapping.rule;

//        OpenAjax.a11y.logger.debug("[evaluate][rule]: " + rule.getIdNLS());

        if (rule_mapping.enabled && (rule.getGroup() & groups)) {

          var rule_result = new OpenAjax.a11y.RuleResult(rule_mapping);

          if (dom_cache.has_body_element) rule.validate(dom_cache, rule_result);

          evaluation_result.addRuleResult(rule_result);

        }

      } // end rule loop

      return evaluation_result;
    },

    /**
     * @method setEventHandlerProcessor
     *
     * @memberOf OpenAjax.a11y.Evaluator
     *
     * @desc Legacy support for FAE 2.0, remove when fae-util config scripts are updated
     */

    setEventHandlerProcessor: function() {

    },

    /**
     * @method getBrokenLinkTesting
     *
     * @memberOf OpenAjax.a11y.Evaluator
     *
     * @desc Get the state of the broken list testing
     *
     * @return  {Boolean} see description
     */

     getBrokenLinkTesting : function () {
       return broken_link_testing;
     },

    /**
     * @method getRuleset
     *
     * @memberOf OpenAjax.a11y.Evaluator
     *
     * @desc Get current ruleset
     *
     * @return  {Ruleset} see description
     */

     getRuleset : function () {
       return ruleset;
     },

    /**
     * @method getEventProcessing
     *
     * @memberOf OpenAjax.a11y.Evaluator
     *
     * @desc Get current event processing information
     *
     * @return  {String} see description
     */

     getEventProcessing : function () {
       return event_processing;
     }

  };
};

