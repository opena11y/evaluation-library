/* evaluate.js */

// Debug constants
const debug = false;
const moduleName = 'evaluationLibrary';

// Imports
import {debugMessage}  from './debug.js';
import DOMCache          from './cache/domCache.js';
import EvaluationResult  from './evaluationResult.js';

export default class EvaluationLibrary {
  constructor () {
  }

  /**
   * @class evaluate
   *
   * @desc Evaluate a document using the OpenA11y ruleset and return an evaluation object
   *
   * @param  {Object}  startingNode - Browser document object model (DOM) to be evaluated
   * @param  {String}  title        - Title of document being analyzed
   * @param  {String}  url          - url of document being analyzed
   */

  evaluate (startingNode, title='', url='') {
    debug && debugMessage(`Starting Evaluation`, moduleName);
    let domCache = new DOMCache(startingNode);
    let evaluationResult = new EvaluationResult(domCache, title, url);
    return evaluationResult;
  }

}

