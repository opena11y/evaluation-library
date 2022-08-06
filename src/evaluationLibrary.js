/* evaluatationLibrary.js */

/* Imports */
import DOMCache          from './cache/domCache.js';
import {allRules}        from './rules/allRules.js';
import RuleInformation   from './rules/ruleInformation.js';
import EvaluationResult  from './evaluationResult.js';
import {setUseCodeTags}  from './_locale/locale.js'
import DebugLogging      from './debug.js';

/* Constants */
const debug   = new DebugLogging('EvaluationLibrary', false)

export default class EvaluationLibrary {
  constructor (codeTags = false) {
    this.ruleInfo = new RuleInformation();
    setUseCodeTags(codeTags);
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title       - Title of document being analyzed
   * @param  {String}  url         - url of document being analyzed
   */

  evaluate (startingDoc, title='', url='') {
    let domCache = new DOMCache(startingDoc);
    let evaluationResult = new EvaluationResult(allRules, domCache, title, url);
    if (debug.flag) {
      debug.log(`[evaluationResult][JSON]: ${evaluationResult.toJSON()}`);
    }
    return evaluationResult;
  }

  get getRuleInfo () {
    return this.ruleInfo;
  }
}

