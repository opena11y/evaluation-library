/* opena11y-bookmarklet-example.js */

import EvaluationLibrary from '../evaluationLibrary.js';

import DebugLogging from '../debug.js';

const debug = new DebugLogging('OpenAlly Example', false);
debug.flag = false;

window.openA11yExample = {

  evaluate: function (ruleset="WCAG22", level="AA", scopeFilter="ALL", ruleList=[]) {

    if (debug.flag) {
      debug.log(`[evaluate][    ruleset]: ${ruleset}`);
      debug.log(`[evaluate][      level]: ${level}`);
      debug.log(`[evaluate][scopeFilter]: ${scopeFilter}`);
      debug.log(`[evaluate][   ruleList]: ${ruleList}`);
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
  },

  run: function () {
    console.log(`[OpenA11y Example]`);

    const evalResult = this.evaluate();

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
  }
};

if (window.openA11yExample) {
  window.openA11yExample.run();
}


