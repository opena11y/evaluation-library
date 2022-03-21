/* evaluationResult.js */

// Debug constants
const debug = false;
const moduleName = 'evaluationResult';

// Imports
import {debugConsole, debugTag, debugSeparator}  from './debug.js';

export default class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;

    debugConsole(debug, moduleName, '[title]: ' + this.title);
    debugConsole(debug, moduleName, '[  url]: ' + this.url);
  }
}
