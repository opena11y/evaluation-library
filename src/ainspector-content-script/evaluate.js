 /* evaluate.js */

import EvaluationLibrary from '../evaluationLibrary.js';

export function evaluate () {

  // evaluation script
  let doc = window.document;
  let evaluationLibrary = new EvaluationLibrary();
  let evaluationResult  = evaluationLibrary.evaluate(doc, doc.title, doc.location.href);
  return evaluationResult;
}
