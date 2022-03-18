/* evaluationResult.js */

// Debug tools
const debug = false;
function debugConsole(s) {
  if (debug) {
    console.log('[EvaluationResult]' + s);
  } 
}

export default class EvaluationResult {
  constructor (domCache, title, url) {
    this.domCache = domCache;
    this.title = title;
    this.url = url;

    debugConsole('[title]: ' + this.title);
    debugConsole('[  url]: ' + this.url);
  }
}
