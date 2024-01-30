/* opena11y-bookmarklet-example.js */

import EvaluationLibrary from '../evaluationLibrary.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('ContentEvalaute', false);
debug.flag = false;


function evaluate (ruleset="WCAG22", level="AA", scopeFilter="ALL", ruleList=[]) {

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

    case 'LIST':
      evaluationResult = evaluationLibrary.evaluateRuleList(doc, doc.title, doc.location.href, ruleList);
      break;

    case 'FIRSTSTEP':
      evaluationResult = evaluationLibrary.evaluateFirstStepRules(doc, doc.title, doc.location.href);
      break;

    default:
      break;

  }

  return evaluationResult;
}

window.addEventListener("load", () => {
  console.log(`[OpenA11y Example]`);

  const evalResult = evaluate();

  // Rule result summary
  let str = 'Rule Summary\n';
  str += `V: ${evalResult.results_summary.violations} `;
  str += `W: ${evalResult.results_summary.warnings} `;
  str += `MC: ${evalResult.results_summary.manual_checks} `;
  str += `P: ${evalResult.results_summary.passed} `;
  console.log(str)

  // Rule results
  evalResult.allRuleResults.forEach( rr => {
    let str = '';
    str += `${rr.rule.getIdNLS()}: ${rr.rule.getDefinition()}\n`;
    str += `V: ${rr.results_summary.violations} `;
    str += `W: ${rr.results_summary.warnings} `;
    str += `MC: ${rr.results_summary.manual_checks} `;
    str += `P: ${rr.results_summary.passed} `;
    console.log(str);
  });
});


