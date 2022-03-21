/* evaluationResult.js */

// Debug constants
const debug = false;
const moduleName = 'evaluationResult';

// Imports
import {debugMessage}  from './debug.js';

export default class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;

    if (debug) {
      debugMessage(`[title]: ${this.title}`, moduleName);
      debugMessage(`[  url]: ${this.url}`,   moduleName);
    }
  }
}
