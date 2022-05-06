/* testsuite.js */

 var evaluator = new EvaluationLibrary();

function getCount(iframe, class_name) {

   var i;
   var item_count = 0
 
   var doc = iframe.contentDocument || iframe.document;
   
   if (!doc) return 0;

   var items = doc.getElementsByClassName(class_name);
   
   if ((typeof items         === 'object') && 
       (typeof items.length  === 'number')) { 
     
     item_count += items.length;
     
   }

   var frames = doc.getElementsByTagName('frame');
   for (i = 0; i < frames.length; i++) item_count += getCount(frames[i], class_name);

   var iframes = doc.getElementsByTagName('iframe');
   for (i = 0; i < iframes.length; i++) item_count += getCount(iframes[i], class_name);
   
   
   return item_count;

}
 
 
function executeTest(IFRAME_ID, RULE_ID) {

  var iframe = document.getElementById(IFRAME_ID);
  
  var win    = iframe.contentWindow;
  var doc    = iframe.contentDocument;
  var title  = doc.title;
  var url    = win.location.href;


  var evaluation_result = evaluator.evaluate(doc, title, url);
  var ers = evaluation_result.getRuleResult(RULE_ID).getElementResultsSummary();

  var f  = getCount(iframe, RULE_ID + '_FAIL');
  var p  = getCount(iframe, RULE_ID + '_PASS');
  var mc = getCount(iframe, RULE_ID + '_MC');
  var h  = getCount(iframe, RULE_ID + '_HIDDEN');

  equal( (ers.violations + ers.warnings),  f, "We expect failures      to be " + f);
  equal( ers.passed,         p, "We expect passed        to be " + p);
  equal( ers.manual_checks, mc, "We expect manual checks to be " + mc);
  equal( ers.hidden,         h, "We expect hidden        to be " + h); 
  
};
  
