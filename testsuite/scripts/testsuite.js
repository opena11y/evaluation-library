/* testsuite.js */

import EvaluationLibrary from '../../releases/opena11y-evaluation-library.js';

var evaluator = new EvaluationLibrary();

function getCount(iframe, class_name) {

   let i;
   let item_count = 0
 
   const doc = iframe.contentDocument || iframe.document;
   
   if (!doc) return 0;

   const items = doc.getElementsByClassName(class_name);
   
   if ((typeof items         === 'object') && 
       (typeof items.length  === 'number')) { 
     
     item_count += items.length;
     
   }

   const frames = doc.getElementsByTagName('frame');
   for (i = 0; i < frames.length; i++) item_count += getCount(frames[i], class_name);

   const iframes = doc.getElementsByTagName('iframe');
   for (i = 0; i < iframes.length; i++) item_count += getCount(iframes[i], class_name);
   
   
   return item_count;

}
 
 
export default function executeTest(label, IFRAME_ID, RULE_ID) {

  const iframe = document.getElementById(IFRAME_ID);
  
  const win    = iframe.contentWindow;
  const doc    = iframe.contentDocument;
  const title  = doc.title;
  const url    = win.location.href;


  const evaluationResult = evaluator.evaluate(doc, title, url);
  const resultSummary = evaluationResult.getRuleResult(RULE_ID).getResultsSummary();

  const f  = getCount(iframe, RULE_ID + '_FAIL');
  const p  = getCount(iframe, RULE_ID + '_PASS');
  const mc = getCount(iframe, RULE_ID + '_MC');
  const h  = getCount(iframe, RULE_ID + '_HIDDEN');

  function getFailures(ers) {
    return ers.violations + ers.warnings;
  }

  QUnit.module(label, function() {
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
  
