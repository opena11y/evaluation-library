/* evaluate.js */

/* Imports */
import DOMCache          from './cache/domCache.js';
import {rules}           from './rules/rules.js';
import EvaluationResult  from './evaluationResult.js';
import DebugLogging      from './debug.js';

/* Constants */
const debug = new DebugLogging('evaluationLibrary', false)


export default class EvaluationLibrary {
  constructor () {
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingDoc - Browser document object model (DOM) to be evaluated
   * @param  {String}  title        - Title of document being analyzed
   * @param  {String}  url          - url of document being analyzed
   */

  evaluate (startingDoc, title='', url='') {
    let domCache = new DOMCache(startingDoc);
    let evaluationResult = new EvaluationResult(rules, domCache, title, url);
    if (debug.flag) {
      debug.log('EvaluationResult');
    }
    return evaluationResult;
  }

}

