/* evaluationResult.js */

// Debug constants
const debug = false;
const moduleName = 'evaluationResult';

// Imports
import {debugMessage, debugTag, debugSeparator}  from './debug.js';

export default class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;

    debugMessage(debug, moduleName, '[title]: ' + this.title);
    debugMessage(debug, moduleName, '[  url]: ' + this.url);
  }
}
