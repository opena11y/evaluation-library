/* evaluationResult.js */

/* Imports */
import DebugLogging  from './debug.js';

/* Constants */
const debug = new DebugLogging('EvaluationResult', false)

export default class EvaluationResult {
  constructor (rules, domCache, title, url) {
    this.rules = rules;
    this.domCache = domCache;
    this.title = title;
    this.url = url;
    if (debug.flag) {
      debug.log(`[title]: ${this.title}`);
    }
  }
}
