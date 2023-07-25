/* evaluatationLibrary.js */

/* Imports */
import {Constants}       from './constants.js';
import DOMCache          from './cache/domCache.js';
import {allRules}        from './rules/allRules.js';
import RuleInformation   from './rules/ruleInformation.js';
import EvaluationResult  from './evaluationResult.js';
import {setUseCodeTags}  from './_locale/locale.js'
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
    this.ruleInfo = new RuleInformation();
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

  evaluate (startingDoc, title='', url='', ruleset='WCAG21', level='AA', scopeFilter='ALL', ruleFilter = []) {

    debug.log(`[    ruleset]: ${ruleset}`);
    debug.log(`[      level]: ${level}`);
    debug.log(`[scopeFilter]: ${scopeFilter}`);
    debug.log(`[ ruleFilter]: ${ruleFilter}`);

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
   * @method getRuleInfo
   * 
   * @desc Provides information on the current rules used in the evaluation library, 
   *       including localized strings
   */

  get getRuleInfo () {
    return this.ruleInfo;
  }

  /**
   * @method CONSTANTS
   * 
   * @desc Provides access to the Constants used in the evaluation library
   */

  get CONSTANTS () {
    return this.constants;
  }

}

