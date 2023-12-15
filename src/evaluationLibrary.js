/* evaluatationLibrary.js */

/* Imports */
import {Constants}       from './constants.js';
import DOMCache          from './cache/domCache.js';
import {allRules}        from './rules/allRules.js';
import EvaluationResult  from './evaluationResult.js';
import {
  getCommonMessage,
  getGuidelineInfo,
  getInformationLinks,
  getPurposes,
  getRuleCategories,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleSummary,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTechniques,
  getWCAG,
  getWCAGVersion,
  setUseCodeTags
}  from './locale/locale.js'

import DebugLogging      from './debug.js';

/* Constants */
const debug   = new DebugLogging('EvaluationLibrary', false)
debug.flag = false;
debug.json = false;

/**
 * @class EvaluateLibrary
 *
 * @desc Base class for APIs for using the evaluation library to evaluate a DOM 
 *       for WCAG requirements and provides access to descriptive rule information
 */

export default class EvaluationLibrary {
  constructor (codeTags = false) {
    this.constants = new Constants();
    // setUseCodeTags sets if localized strings using the @ character to identify 
    // code items in the string return <code> tags or capitalization  
    setUseCodeTags(codeTags);
  }

  /**
   * @method evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   * @param  {String}  ruleset     - Set of rules to evaluate (values: "FIRST-STEP" | "A" | "AA" | "AAA")
   * @param  {String}  scopeFilter - Filter rules by scope (values: "ALL" | "PAGE" | "WEBSITE")
   */

  evaluate (startingDoc, title='', url='', ruleset='WCAG22', level='AAA', scopeFilter='ALL', ruleFilter = []) {

    let domCache = new DOMCache(startingDoc);
    let evaluationResult = new EvaluationResult(allRules, domCache, title, url, ruleset, level, scopeFilter, ruleFilter);

    // Debug features
    if (debug.flag) {
      domCache.showDomElementTree();
      domCache.controlInfo.showControlInfo();
      domCache.iframeInfo.showIFrameInfo();
      domCache.idInfo.showIdInfo();
      domCache.imageInfo.showImageInfo();
      domCache.linkInfo.showLinkInfo();
      domCache.listInfo.showListInfo();
      domCache.tableInfo.showTableInfo();
      domCache.structureInfo.showStructureInfo();

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

    ruleInfo.rule_scope       = rule.rule_scope;
    ruleInfo.rule_category    = getRuleCategoryInfo(rule.rule_category_id);
    ruleInfo.rule_category_id = rule.rule_category_id;
    ruleInfo.conformance      = rule.rule_required ? getCommonMessage('required') : getCommonMessage('recommended');

    ruleInfo.wcag_primary_id = rule.wcag_primary_id;
    ruleInfo.wcag_primary    = getSuccessCriterionInfo(rule.wcag_primary_id);
    ruleInfo.wcag_related    = getSuccessCriteriaInfo(rule.wcag_related_ids);

    ruleInfo.target_resources = rule.target_resources;

    ruleInfo.definition = getRuleDefinition(id);
    ruleInfo.summary    = getRuleSummary(id);
    ruleInfo.purposes   = getPurposes(id);

    ruleInfo.techniques = getTechniques(id);
    ruleInfo.information_links = getInformationLinks(id);

    return ruleInfo;
  }


}

