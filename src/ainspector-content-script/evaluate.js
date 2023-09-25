 /* evaluate.js */

import EvaluationLibrary from '../evaluationLibrary.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('ContentEvalaute', false);
debug.flag = false;


export function evaluate (ruleset="WCAG21", level="AA", scopeFilter="ALL", ruleFilter=[]) {

  if (debug.flag) {
    debug.log(`[eveluate][    ruleset]: ${ruleset}`);
    debug.log(`[eveluate][      level]: ${level}`);
    debug.log(`[evaluate][scopeFilter]: ${scopeFilter}`);
    debug.log(`[evaluate][ ruleFilter]: ${ruleFilter}`);
  }

  // evaluation script
  let doc = window.document;
  let evaluationLibrary = new EvaluationLibrary();
  let evaluationResult  = evaluationLibrary.evaluate(doc, doc.title, doc.location.href, ruleset, level, scopeFilter, ruleFilter);
  return evaluationResult;
}
