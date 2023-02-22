/* testaccname.js */

import EvaluationLibrary from '../../releases/opena11y-evaluation-library.js';

var evaluator = new EvaluationLibrary();

export default function textAccname(label, IFRAME_ID, htmlAttr, nameProp) {

  QUnit.module(label, function() {

    const iframe = document.getElementById(IFRAME_ID);

    const win    = iframe.contentWindow;
    const doc    = iframe.contentDocument;
    const title  = doc.title;
    const url    = win.location.href;

    const evaluationResult = evaluator.evaluate(doc, title, url);

    const elems = Array.from(doc.querySelectorAll(`[id][${htmlAttr}]`));

    let passed = 0;
    let failures = 0;

    elems.forEach( elem => {
      const id = elem.id;
      const data = elem.getAttribute(htmlAttr);
      const domElem = evaluationResult.getDomElementById(id);

      if (domElem[nameProp].name === data) {
        passed += 1;
      }
      else {
        failures += 1;
        console.log(`[FAIL]: ${elem.tagName} ${elem.id}`);
        console.log(`[FAIL][name]: ${domElem[nameProp].name}`);
        console.log(`[FAIL][data]: ${data}`);
      }

    });

    QUnit.test(`We expect failures to be 0`, function(assert) {
      assert.equal(failures, 0);
    });

    QUnit.test(`We expect passed to be ${elems.length}`, function(assert) {
      assert.equal(elems.length, passed);
    });
  });
  
};
  
