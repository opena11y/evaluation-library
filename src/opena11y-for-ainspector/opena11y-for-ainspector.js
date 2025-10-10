/* opena11y-for-ainspector.js */

import EvaluationLibrary from '../evaluationLibrary.js';
import aiRuleResult      from '../results/aiRuleResult.js';
import {
  aiRuleResultsByCategory,
  aiRuleResultsByGuideline,
  aiAllRuleResults
} from '../results/aiRuleGroupResult.js';

// Constants
const debug = false;

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

let lastEvaluationResult = false;

const contentElem = document.body ?
                    document.body :
                    document.documentElement;

const highlightElements = [];

// Helper functions

function hideHighlightElements (option='none') {
  highlightElements.forEach( (he) => {
    if ((option === 'all') ||
        ((option === 'vw') &&
          ((he.getAttribute('data-result') === 'V') ||
           ((he.getAttribute('data-result') === 'W'))))) {
      he.setAttribute('focus', 'false');
    }
    else {
      he.setAttribute('set', '');
    }
  });
}

function removeFocusFromHighlightElements () {
  highlightElements.forEach( (he) => { he.setAttribute('focus', 'false'); });
}

function getHighlightElement(highlightId, result_abbrev) {
  let he = document.getElementById(highlightId);
  if (!he) {
    he = document.createElement('opena11y-ai-highlight');
    he.id = highlightId;
    he.setAttribute(`data-result`, result_abbrev);
    contentElem.appendChild(he);
    highlightElements.push(he);
  }
  return he;
}

function hightlightResults(evaluation_result, results, option) {
  results.forEach( (r) => {
    if ((option === 'all') ||
        ((option === 'vw') && ((r.result_abbrev === 'V') || (r.result_abbrev === 'W')))) {

      const he = getHighlightElement(r.highlightId, r.result_abbrev);

      if (r.isWebsite) {
        he.setAttribute('set', `${r.result_abbrev} website false`);
      }
      else {
        if (r.isPage) {
          he.setAttribute('set', `${r.result_abbrev} page false`);
        }
        else {
          const de = evaluation_result.getDomElementByPosition(r.position);
          if (de) {
            const rect = de.node.getBoundingClientRect();
            he.setAttribute('set', `${r.result_abbrev} element false ${Math.round(rect.left)} ${Math.round(rect.top)} ${Math.round(rect.width)} ${Math.round(rect.height)}`);
          }
        }
      }
    }
  });
}



// Listen for messages from side panel
browserRuntime.onMessage.addListener(
  function(request, sender, sendResponse) {

    let rect = {};
    let de = false;

    // Highlight result
    if(request.highlight) {
      const isWebsite   = request.highlight.position === 'website';
      const isPage      = request.highlight.position === 'page';
      const position    = parseInt(request.highlight.position);
      const result_type = request.highlight.result_type;
      const option      = request.highlight.option;
      const highlightId = request.highlight.highlightId;
      const focus       = request.highlight.focus;

      hideHighlightElements(option);

      if (!isNaN(position)) {
        de = lastEvaluationResult.getDomElementByPosition(position);
      }

      if (de && de.node) {
        rect = de.node.getBoundingClientRect();
      }

      const he = getHighlightElement(highlightId, result_type);

      if (option !== 'none' && he) {
        removeFocusFromHighlightElements();
        if (isWebsite) {
          he.setAttribute('set', `${result_type} website ${focus}`);
        }
        else {
          if (isPage) {
            he.setAttribute('set', `${result_type} page ${focus}`);
          }
          else {
            he.setAttribute('set', `${result_type} element ${focus} ${Math.round(rect.left)} ${Math.round(rect.top)} ${Math.round(rect.width)} ${Math.round(rect.height)}`);
          }
        }
      }
    }

    // Update heading, region and link information
    if(request.aiRunEvaluation) {
      openFlag = true;
      const r = request.aiRunEvaluation;

      debug && console.log(`[         ruleset]: ${r.ruleset}`);
      debug && console.log(`[           level]: ${r.level}`);
      debug && console.log(`[    scope_filter]: ${r.scope_filter}`);
      debug && console.log(`[    aria_version]: ${r.aria_version}`);
      debug && console.log(`[     result_view]: ${r.result_view}`);
      debug && console.log(`[   rule_group_id]: ${r.rule_group_id}`);
      debug && console.log(`[         rule_id]: ${r.rule_id}`);
      debug && console.log(`[highlight_option]: ${r.highlight_option}`);

      const doc = window.document;

      if (r.ruleset === 'FIRSTSTEP') {
        er  = evaluationLibrary.evaluateFirstStepRules(
                doc,
                doc.title,
                doc.location.href,
                r.aria_version,
                false);
      }
      else {
        er  = evaluationLibrary.evaluateWCAG(
                doc,
                doc.title,
                doc.location.href,
                r.ruleset,
                r.level,
                r.scope_filter,
                r.aria_version,
                false);
      }

      lastEvaluationResult = er;

      const now = new Date();

      let response = {
        title:         er.getTitle(),
        location:      er.getURL(),
        ruleset_label: er.getRulesetLabel(),
        result_view:   r.result_view,
        date:          now.toLocaleDateString(),
        time:          now.toLocaleTimeString(),
        ainspector_version: ''
      };

      debug && console.log(`[response][      title]: ${response.title}`);
      debug && console.log(`[response][   location]: ${response.location}`);
      debug && console.log(`[response][result_view]: ${response.result_view}`);

      let group_title, rule_summary, rule_results, info_rules;
      let rule_title, rule_id_nls, result_summary, website_result, page_result, element_results;

      const parts = r.rule_group_id.split('-');
      const group_id = parseInt(parts[1]);

      let results = [];

      switch (response.result_view) {
        case 'rules-all':
          hideHighlightElements();

          response.rule_summary          = er.ruleResultSummary.data;
          response.rc_rule_results_group = er.rcRuleGroupResults.data;
          response.gl_rule_results_group = er.glRuleGroupResults.data;
          response.rule_results          = aiAllRuleResults(er.allRuleResults);
          debug && console.log(`[response][rule_summary]: ${response.rule_summary}`);
          debug && console.log(`[response][      rcData]: ${response.rc_rule_results_group}`);
          debug && console.log(`[response][      glData]: ${response.gl_rule_results_group}`);
          break;

        case 'rule-group':
          hideHighlightElements();

          if (parts[0] === 'rc') {
            [group_title, rule_summary, rule_results, info_rules] = aiRuleResultsByCategory(er.allRuleResults, group_id);
          }
          else {
            [group_title, rule_summary, rule_results, info_rules] = aiRuleResultsByGuideline(er.allRuleResults, group_id);
          }

          response.group_title  = group_title;
          response.rule_summary = rule_summary.data;
          response.rule_results = rule_results;
          response.info_rules   = info_rules;

          debug && console.log(`[response][${parts[0]}][ group_title]: ${response.group_title}`);
          debug && console.log(`[response][${parts[0]}][rule_summary]: ${response.rule_summary}`);
          debug && console.log(`[response][${parts[0]}][rule_results]: ${response.rule_results}`);
          debug && console.log(`[response][${parts[0]}][  info_rules]: ${response.info_rules}`);

          break;

        case 'rule':
          hideHighlightElements();
          [rule_title, rule_id_nls, result_summary, website_result, page_result, element_results] = aiRuleResult(er.allRuleResults, r.rule_id);

          response.rule_title      = rule_title;
          response.rule_id_nls     = rule_id_nls;
          response.result_summary  = result_summary;
          response.website_result  = website_result;
          response.page_result     = page_result;
          response.element_results = element_results;

          if (website_result) {
            results.push(website_result);
          }

          if (page_result) {
            results.push(website_result);
          }

          if (element_results) {
            results = results.concat(element_results);
          }

          hightlightResults(er, results, r.highlight_option);

          debug && console.log(`[response][     rule_title]: ${response.rule_title}`);
          debug && console.log(`[response][element_summary]: ${response.element_summary.violations}`);
          debug && console.log(`[response][ website_result]: ${response.website_result}`);
          debug && console.log(`[response][    page_result]: ${response.page_result}`);
          debug && console.log(`[response][element_results]: ${response.element_results}`);

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

let openFlag = false;

setInterval(() => {
  chrome.runtime
    .sendMessage({ ['ai-sidepanel-open']: true })
    .then((result) => {
      if (openFlag && result !== true) {
//        console.log(`Sidebar closed: ${openFlag}`);
        hideHighlightElements();
      }
      openFlag = result === true;
    })
    .catch( () => {
      if (openFlag) {
//        console.log(`Sidebar closed: ${openFlag}`);
        hideHighlightElements();
        openFlag = false;
      }
  });
}, 100);
