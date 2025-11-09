/* evaluatationLibrary.js */

/* Imports */
import {Constants}       from './constants.js';
import EvaluationResult  from './evaluationResult.js';
import {allRules}        from './rules/allRules.js';
import {
  getCommonMessage,
  getHasFailures,
  getHasHidden,
  getHasManualChecks,
  getHasPass,
  getInformationLinks,
  getManualCheckMessage,
  getPurposes,
  getRuleCategories,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleScopes,
  getRuleSummary,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTechniques,
  getWCAG,
  getWCAGLevel,
  getWCAGVersion
}  from './locale/locale.js'

import {
  getAxeRuleInfo
} from './axeInfo/axeInfo.js';

import {
  getWaveRuleInfo
} from './waveInfo/waveInfo.js';

import {
  axeInfo
} from './axeInfo/gen-axe-rules.js';

import {
  waveInfo
} from './waveInfo/gen-wave-rules.js';

import DebugLogging from './debug.js';

/* Constants */
const debug   = new DebugLogging('EvaluationLibrary', false)
debug.flag = false;
debug.json = false;

/**
 * @class EvaluateLibrary
 *
 * @desc Base class for APIs for using the evaluation library to evaluate a DOM 
 *       for WCAG requirements and provides access to descriptive rule information
 *
 */

export default class EvaluationLibrary {
  constructor () {
    this.constants = new Constants();
  }

  /**
   * @method evaluateRuleList
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - URL of document being analyzed
   * @param  {Array}   ruleList    - Array of rule id to include in the evaluation
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 Values: 'ARIA12' | 'ARIA13'
   * @param  {Boolean} addDataId   - If true, add an data-opena11y-id attribute based on
   *                                 the elements ordinal position for use in
   *                                 navigation and highlighting
   */

  evaluateRuleList (startingDoc, title='', url='',
                    ruleList = [],
                    ariaVersion='ARIA12',
                    addDataId=false) {

    const evaluationResult = new EvaluationResult(startingDoc, title, url);
    evaluationResult.runRuleListRules(ruleList, ariaVersion, addDataId);

    // Debug features
    if (debug.flag) {
      debug.json && debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON(true)}`);
    }
    return evaluationResult;
  }

 /**
   * @method evaluateWCAG
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   * @param  {String}  ruleset     - Set of rules to evaluate (values: A" | "AA" | "AAA")
   * @param  {String}  level       - WCAG Level (values: 'A', 'AA', 'AAA')
   * @param  {String}  scopeFilter - Filter rules by scope (values: "ALL" | "PAGE" | "WEBSITE")
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 Values: 'ARIA12' | 'ARIA13'
   * @param  {Boolean} addDataId   - If true, add an data-opena11y-id attribute based on
   *                                 the elements ordinal position for use in
   *                                 navigation and highlighting
 */

  evaluateWCAG (startingDoc, title='', url='',
                ruleset='WCAG22',
                level='AAA',
                scopeFilter='ALL',
                ariaVersion="ARIA12",
                addDataId=false) {

    const evaluationResult = new EvaluationResult(startingDoc, title, url);
    evaluationResult.runWCAGRules(ruleset, level, scopeFilter, ariaVersion, addDataId);

    // Debug features
    if (debug.flag) {
      debug.json && debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON(true)}`);
    }
    return evaluationResult;
  }

 /**
   * @method evaluateFirstStepRules
   *
   * @desc Returns an EvaluationResult object using first step rules
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 Values: 'ARIA12' | 'ARIA13'
   * @param  {Boolean} addDataId   - If true, add an data-opena11y-id attribute based on
   *                                 the elements ordinal position for use in
   *                                 navigation and highlighting
   *
   * @returns {Object}  see @desc
  */

  evaluateFirstStepRules (startingDoc, title='', url='',
                          ariaVersion="ARIA12",
                          addDataId=false) {

    const evaluationResult = new EvaluationResult(startingDoc, title, url);
    evaluationResult.runFirstStepRules(ariaVersion, addDataId);

    // Debug features
    if (debug.flag) {
      debug.json && debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON(true)}`);
    }
    return evaluationResult;
  }

 /**
   * @method evaluateAxeRules
   *
   * @desc Returns an EvaluationResult object using rule with aXe references
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 Values: 'ARIA12' | 'ARIA13'
   * @param  {Boolean} addDataId   - If true, add an data-opena11y-id attribute based on
   *                                 the elements ordinal position for use in
   *                                 navigation and highlighting
   *
   * @returns {Object}  see @desc
  */

  evaluateAxeRules (startingDoc, title='', url='', ariaVersion="ARIA12") {

    const evaluationResult = new EvaluationResult(startingDoc, title, url);
    evaluationResult.runAxeRules(ariaVersion);

    // Debug features
    if (debug.flag) {
      debug.json && debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON(true)}`);
    }
    return evaluationResult;
  }


 /**
   * @method evaluateWaveRules
   *
   * @desc Returns an EvaluationResult object using rule with WAVE references
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   * @param  {String}  ariaVersion - Version of ARIA used for validation rules
   *                                 Values: 'ARIA12' | 'ARIA13'
   * @param  {Boolean} addDataId   - If true, add an data-opena11y-id attribute based on
   *                                 the elements ordinal position for use in
   *                                 navigation and highlighting
   *
   * @returns {Object}  see @desc
  */

  evaluateWaveRules (startingDoc, title='', url='', ariaVersion="ARIA12") {

    const evaluationResult = new EvaluationResult(startingDoc, title, url);
    evaluationResult.runWaveRules(ariaVersion);

    // Debug features
    if (debug.flag) {
      debug.json && debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON(true)}`);
    }
    return evaluationResult;
  }

  /**
   * @method CONSTANTS
   * 
   * @desc Provides access to the Constants used in the evaluation library
   */

  get CONSTANTS () {
    return this.constants;
  }

  /**
   * @method getRuleCategories
   *
   * @desc Provides access to the localized Rule Categories object from evaluation library
   */

  get getRuleCategories () {
    return getRuleCategories();
  }

  /**
   * @method getWCAG
   *
   * @desc Provides access to the localized WCAG object from evaluation library
   */

  get getWCAG () {
    return getWCAG();
  }

  /**
   * @method getRuleScopes
   *
   * @desc Provides access to the localized Rule Scopes object from evaluation library
   */

  get getRuleScopes () {
    return getRuleScopes();
  }


  /**
   * @method getAllRules
   *
   * @desc Provides access to the rules in evaluation library
   */

  get getAllRules () {
    return allRules;
  }

  /**
   * @method getWCAGVersion
   *
   * @desc Get version of WCAG a success criteria first appeared
   *
   * @param {String}  csID  - Id of the success criteria (e.g. 1.4.5)
   *
   * @returns {String}  WCAG20 | WCAG21 | WCAG22
   */

  getWCAGVersion (scID) {
    return getWCAGVersion(scID);
  }

  /**
   * @method getRuleInfo
   *
   * @desc Provides access to localized rule information
   */

  getRuleInfo(rule) {
    const ruleInfo = {};
    const id = rule.rule_id;

    ruleInfo.id            = getRuleId(id);
    ruleInfo.htmlId        = rule.rule_id.toLowerCase().replace('_', '-');
    ruleInfo.filename      = 'rule-' + rule.rule_id.toLowerCase().replace('_', '-') + '.html';
    ruleInfo.last_updated  = rule.last_updated;

    ruleInfo.rule_required    = rule.rule_required;
    ruleInfo.first_step       = rule.first_step;

    ruleInfo.rule_scope       = rule.rule_scope;
    ruleInfo.rule_category    = getRuleCategoryInfo(rule.rule_category_id);
    ruleInfo.rule_category_id = rule.rule_category_id;
    ruleInfo.conformance      = rule.rule_required ? getCommonMessage('required') : getCommonMessage('recommended');

    ruleInfo.wcag_primary_id  = rule.wcag_primary_id;
    ruleInfo.wcag_level       = getWCAGLevel(rule.wcag_primary_id);
    ruleInfo.wcag_primary     = getSuccessCriterionInfo(rule.wcag_primary_id);
    ruleInfo.wcag_related     = getSuccessCriteriaInfo(rule.wcag_related_ids);
    ruleInfo.wcag_version     = getWCAGVersion(ruleInfo.wcag_primary_id);
    ruleInfo.has_failures       = getHasFailures(id);
    ruleInfo.has_hidden         = getHasHidden(id);
    ruleInfo.has_manual_checks  = getHasManualChecks(id);
    ruleInfo.has_pass           = getHasPass(id);
    ruleInfo.mc_message         = getManualCheckMessage(id);

    ruleInfo.has_axe            = rule.axe_refs.length !== 0;
    ruleInfo.axe_rules          = getAxeRuleInfo(rule.axe_refs);

    ruleInfo.has_wave           = rule.wave_refs.length !== 0;
    ruleInfo.wave_rules         = getWaveRuleInfo(rule.wave_refs);

    ruleInfo.target_resources = rule.target_resources;

    ruleInfo.definition = getRuleDefinition(id, true);
    ruleInfo.summary    = getRuleSummary(id, true);
    ruleInfo.purposes   = getPurposes(id, true);

    ruleInfo.techniques = getTechniques(id, true);
    ruleInfo.information_links = getInformationLinks(id);

    return ruleInfo;
  }


  /**
   * @method getAllAxeRules
   *
   * @desc Provides an array of aXe rule information
   *
   * @return see @desc
   */

  getAllAxeRules() {

    const rules = [];
    for (const id in axeInfo.rules) {
      const r = axeInfo.rules[id];
      const info = {};
      info.title  = r.title;
      info.url    = r.url
      info.type   = r.bestPractice ? 'Best Practices' : r.experimental ? 'Experimental' : 'Required';
      info.impact = r.impact
      rules.push(info);
    }
    return rules;
  }

  /**
   * @method getUnmappedAxeRules
   *
   * @desc Provides an array of aXe rule information
   *
   * @return see @desc
   */

  getUnmappedAxeRules() {

    const rules = [];
    for (const id in axeInfo.rules) {
      let flag = true;
      for (let i = 0; i < allRules.length && flag; i += 1) {
        const refs = allRules[i].axe_refs;
        if (refs) {
          if (refs.includes(id)) {
            flag = false;
          }
        }
      }
      if (flag) {
        const r = axeInfo.rules[id];
        const info = {};
        info.title  = r.title;
        info.url    = r.url
        info.type   = r.bestPractice ? 'Best Practices' : r.experimental ? 'Experimental' : 'Required';
        info.impact = r.impact
        rules.push(info);
      }
    }
    return rules;
  }

  /**
   * @method getAllWaveRules
   *
   * @desc Provides an array of WAVE rule information
   *
   * @return see @desc
   */

  getAllWaveRules() {

    const rules = [];

    for (const rule in waveInfo.rules) {
      const info = {};
      info.title  = rule.title;
      info.url    = rule.url;
      info.type   = rule.error ? 'Error' : rule.contrast ? 'Contrast' : 'Alert';
      rules.push(info);
    }

    return rules;
  }

  /**
   * @method getUnmappedWaveRules
   *
   * @desc Provides an array of WAVE rule information
   *
   * @return see @desc
   */

  getUnmappedWaveRules() {

    const rules = [];
    for (const id in waveInfo.rules) {
      let flag = true;
      for (let i = 0; i < allRules.length && flag; i += 1) {
        const refs = allRules[i].wave_refs;
        if (refs) {
          if (refs.includes(id)) {
            flag = false;
          }
        }
      }
      if (flag) {
        const r = waveInfo.rules[id];
        const info = {};
        info.title  = r.title;
        info.url    = r.url
        info.type   = r.error ? 'Error' : r.contrast ? 'Contrast' : 'Alert';
        rules.push(info);
      }
    }
    return rules;
  }

}

