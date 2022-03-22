/* evaluationResult.js */

/* Imports */
import DebugLogging      from './debug.js';

/* Constants */
const debug = new DebugLogging('EvaluationResult', false)

export default class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;
    if (debug.flag) {
      debug.log(`[title]: ${this.title}`);
    }
  }
}
