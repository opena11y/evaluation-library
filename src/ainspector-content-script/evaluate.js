 /* evaluate.js */

import EvaluationLibrary from '../evaluationLibrary.js';

export function evaluate (ruleset="WCAG21", level="AA", scopeFilter="ALL", ruleFilter=[]) {

  console.log(`[eveluate][    ruleset]: ${ruleset}`);
  console.log(`[eveluate][      level]: ${level}`);
  console.log(`[evaluate][scopeFilter]: ${scopeFilter}`);
  console.log(`[evaluate][ ruleFilter]: ${ruleFilter}`);

  // evaluation script
  let doc = window.document;
  let evaluationLibrary = new EvaluationLibrary();
  let evaluationResult  = evaluationLibrary.evaluate(doc, doc.title, doc.location.href, ruleset, level, scopeFilter, ruleFilter);
  return evaluationResult;
}
