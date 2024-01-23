 /* evaluate.js */

import EvaluationLibrary from '../evaluationLibrary.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('ContentEvalaute', false);
debug.flag = false;


export function evaluate (ruleset="WCAG21", level="AA", scopeFilter="ALL", ruleList=[]) {

  if (debug.flag) {
    debug.log(`[eveluate][    ruleset]: ${ruleset}`);
    debug.log(`[eveluate][      level]: ${level}`);
    debug.log(`[evaluate][scopeFilter]: ${scopeFilter}`);
    debug.log(`[evaluate][ ruleFilter]: ${ruleList}`);
  }

  // evaluation script
  const doc = window.document;
  const evaluationLibrary = new EvaluationLibrary();
  let evaluationResult;

  switch (ruleset) {

    case 'WCAG20':
    case 'WCAG21':
    case 'WCAG22':
      evaluationResult = evaluationLibrary.evaluateWCAG(doc, doc.title, doc.location.href, ruleset, level, scopeFilter);
      break;

    case 'FILTER':
    case 'LIST':
      evaluationResult = evaluationLibrary.evaluateRuleList(doc, doc.title, doc.location.href, ruleList);
      break;

    default:
      break;

  }

  return evaluationResult;
}
