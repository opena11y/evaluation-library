/* testsuite.js */

import EvaluationLibrary from '../../releases/opena11y-evaluation-library.js';

var evaluator = new EvaluationLibrary();

function getCount(iframe, class_name) {

   let item_count = 0
 
   const doc = iframe.contentDocument || iframe.document;
   
   if (!doc) return 0;

   const items = doc.getElementsByClassName(class_name);
   
   if ((typeof items         === 'object') && 
       (typeof items.length  === 'number')) { 
     
     item_count += items.length;
     
   }

   const iframes = doc.getElementsByTagName('iframe');
   for (let i = 0; i < iframes.length; i++) item_count += getCount(iframes[i], class_name);
   
   
   return item_count;

}

function getData(iframe, name) {
  let item_count = 0

  const doc = iframe.contentDocument || iframe.document;

  if (!doc) return 0;

  const items = doc.querySelectorAll(`[data-${name}]`);

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const value = parseInt(item.getAttribute(`data-${name}`));
    if (Number.isInteger(value)) {
       item_count += value;
    }
  }

  const iframes = doc.getElementsByTagName('iframe');
  for (let i = 0; i < iframes.length; i++) {
    item_count += getData(iframes[i], name);
  }

  return item_count;
}
 
 
export default function executeTest(label, IFRAME_ID, RULE_ID) {

  QUnit.module(label, function() {

    const iframe = document.getElementById(IFRAME_ID);

    if (!iframe || !iframe.contentWindow) {
      return;
    }

    const win    = iframe.contentWindow;
    const doc    = iframe.contentDocument;
    const title  = doc.title;
    const url    = win.location.href;

    const evaluationResult = evaluator.evaluate(doc, title, url);
    const resultSummary = evaluationResult.getRuleResult(RULE_ID).getResultsSummary();

    const f  = getCount(iframe, RULE_ID + '_FAIL')   + getData(iframe, 'fail');
    const p  = getCount(iframe, RULE_ID + '_PASS')   + getData(iframe, 'pass');
    const mc = getCount(iframe, RULE_ID + '_MC')     + getData(iframe, 'mc');
    const h  = getCount(iframe, RULE_ID + '_HIDDEN') + getData(iframe, 'hidden');

    function getFailures(ers) {
      return ers.violations + ers.warnings;
    }

    QUnit.test(`We expect failures to be ${f}`, function(assert) {
      assert.equal(getFailures(resultSummary), f);
    });

    QUnit.test(`We expect passed to be ${p}`, function(assert) {
      assert.equal(resultSummary.passed, p);
    });
            ;
    QUnit.test(`We expect manual checks to be ${mc}`, function(assert) {
      assert.equal(resultSummary.manual_checks, mc);
    });
            ;
    QUnit.test(`We expect hidden to be ${h}`, function(assert) {
      assert.equal(resultSummary.hidden, h);
    });

  });
  
};
  
