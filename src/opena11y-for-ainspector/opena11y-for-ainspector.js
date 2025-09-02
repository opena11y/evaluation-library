/* opena11y-for-ainspector.js */

import EvaluationLibrary from '../evaluationLibrary.js';

// Constants
const debug = true;

const HIGHLIGHT_ELEMENT_NAME = 'ai-highlight';

const browserRuntime = typeof browser === 'object' ?
              browser.runtime :
              chrome.runtime;

const evaluationLibrary = new EvaluationLibrary();
let er;

debug && console.log(`[content.js]: loading...`);

// Load element highlight custom element

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.id = 'id-ai-highlight';
scriptNode.src = browserRuntime.getURL('ai-highlight.js');
document.body.appendChild(scriptNode);



// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // Highlight elements
    if(request.highlight) {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('data-attr', 'data-opena11y-id');
        he.setAttribute('highlight-position', request.highlight.position + ';' + request.highlight.info);
      }
    }

    // Removed highlight
    if(request.removeHighlight) {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('highlight-position', '');
      }
    }

    // Update Highlight configuration
    if(request.updateHighlightConfig) {
      const hc = request.updateHighlightConfig;

      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);

      if (he) {
        he.setAttribute('highlight-config', `${hc.size} ${hc.style}`);
      }
    }


    // Update heading, region and link information
    if(request.aiRunEvaluation) {
      const r = request.aiRunEvaluation;

      debug && console.log(`[       ruleset]: ${r.ruleset}`);
      debug && console.log(`[         level]: ${r.level}`);
      debug && console.log(`[  scope_filter]: ${r.scope_filter}`);
      debug && console.log(`[  aria_version]: ${r.aria_version}`);
      debug && console.log(`[   result_view]: ${r.result_view}`);
      debug && console.log(`[ rule_group_id]: ${r.rule_group_id}`);
      debug && console.log(`[       rule_id]: ${r.rule_id}`);

      const doc = window.document;
      er  = evaluationLibrary.evaluateWCAG(
              doc,
              doc.title,
              doc.location.href,
              r.ruleset,
              r.level,
              r.scope_filter,
              r.aria_version,
              true);

      let response = {
        title:         er.getTitle(),
        location:      er.getURL(),
        ruleset_label: er.getRulesetLabel(),
        result_view:   r.result_view
      };

      debug && console.log(`[response][      title]: ${response.title}`);
      debug && console.log(`[response][   location]: ${response.location}`);
      debug && console.log(`[response][result_view]: ${response.result_view}`);

      let groupTitle, summary, rule_results;

      const parts = r.rule_group_id.split('-');
      const id = parseInt(parts[1]);

      switch (response.result_view) {
        case 'rules-all':
          response.summary               = er.ruleResultSummary.data;
          response.rc_rule_results_group = er.rcRuleGroupResults.data;
          response.gl_rule_results_group = er.glRuleGroupResults.data;
          debug && console.log(`[response][    summary]: ${response.summary}`);
          debug && console.log(`[response][     rcData]: ${response.rc_rule_results_group}`);
          debug && console.log(`[response][     glData]: ${response.gl_rule_results_group}`);
          break;

        case 'rule-group':
          debug.flag && debug.log(`group: ${parts[0]} id: $${parts[1]}`);

          if (parts[0] === 'rc') {
            [groupTitle, summary, rule_results] = er.getRuleResultsByCategoryWithSummary(id);
          }
          else {
            [groupTitle, summary, rule_results] = er.getRuleResultsByGuidelineWithSummary(id);
          }

          response.groupTitle   = groupTitle;
          response.summary      = summary.data;
          response.rule_results = rule_results;

          debug && console.log(`[response][gl][     summary]: ${response.groupTitle}`);
          debug && console.log(`[response][gl][     summary]: ${response.summary}`);
          debug && console.log(`[response][gl][rule_results]: ${response.rule_results}`);

          break;

        case 'rule':
          break;

      }

      sendResponse(response);
    }
    return true;
  }
);

/*
 * Detecting side panel closing
 */

// Check if side panel is open
/*
let openFlag = true;

setInterval(() => {
  chrome.runtime
    .sendMessage({ ['ai-sidepanel-open']: true })
    .then((msgRes) => {
      if (msgRes !== true && openFlag) {
        openFlag = false;
      }
    })
    .catch( () => {
      const he = document.querySelector(HIGHLIGHT_ELEMENT_NAME);
      if (he) {
        he.setAttribute('highlight-position', '');
      }
      openFlag = true;
  });
}, 50);
*/
