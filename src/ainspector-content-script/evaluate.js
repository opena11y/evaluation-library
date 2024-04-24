 /* evaluate.js */

import EvaluationLibrary from '../evaluationLibrary.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('ContentEvalaute', false);
debug.flag = false;


export function evaluate (ruleset="WCAG21", level="AA", scopeFilter="ALL", ariaVersion="ARIA12") {

  if (debug.flag) {
    debug.log(`[eveluate][    ruleset]: ${ruleset}`);
    debug.log(`[eveluate][      level]: ${level}`);
    debug.log(`[evaluate][scopeFilter]: ${scopeFilter}`);
    debug.log(`[evaluate][ariaVersion]: ${ariaVersion}`);
  }

  // evaluation script
  const doc = window.document;
  const evaluationLibrary = new EvaluationLibrary();
  let evaluationResult;

  switch (ruleset) {

    case 'WCAG20':
    case 'WCAG21':
    case 'WCAG22':
      evaluationResult = evaluationLibrary.evaluateWCAG(doc, doc.title, doc.location.href, ruleset, level, scopeFilter, ariaVersion);
      break;

    case 'FIRSTSTEP':
      evaluationResult = evaluationLibrary.evaluateFirstStepRules(doc, doc.title, doc.location.href, ariaVersion);
      break;

    default:
      break;

  }

  return evaluationResult;
}
