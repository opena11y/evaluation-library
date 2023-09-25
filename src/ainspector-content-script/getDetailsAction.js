 /* getDetailsAction.js */

// ----------------------
// getDetailsAction
//
// Returns information related to a rule result
// ----------------------

export function getDetailsAction(ruleResult) {

  function getInformationalInfoArray(infoItems) {

    function getItem(title, url) {
      let item = {};
      item.title = title;
      item.url = url;
      return item;
    }

    let items = [];

    if (!infoItems || !infoItems.length) {
      return [];
    }

    for (let i = 0; i < infoItems.length; i++) {
      let item = infoItems[i];
      if (item.url_spec) {
        items.push(getItem(item.title, item.url_spec));
      } else {
        items.push(getItem(item.title, item.url));
      }
    }

    return items;
  }

  let rule       = ruleResult.getRule();
  let required   = ruleResult.isRuleRequired()

  let primarySC = {};
  let wcag = [];
  primarySC.title    = rule.getPrimarySuccessCriterionInfo().title + ' (Primary)';
  primarySC.url_spec = rule.getPrimarySuccessCriterionInfo().url_spec;
  wcag.push(primarySC);
  wcag = wcag.concat(rule.getRelatedSuccessCriteriaInfo());

  let detailsAction = {
    'ruleId'          : rule.getId(),
    'scope'           : rule.getScopeNLS(),
    'summary'         : rule.getSummary(required),
    'definition'      : rule.getDefinition(required),
    'action'          : ruleResult.getResultMessagesArray(),
    'purpose'         : rule.getPurposes(),
    'techniques'      : rule.getTechniques(),
    'targets'         : rule.getTargetResources(),
    'compliance'      : 'WCAG Level ' + rule.getWCAGLevel() + ', ' + (required ? 'Required' : 'Recommended'),
    'sc'              : getInformationalInfoArray(wcag),
    'additionalLinks' : getInformationalInfoArray(rule.getInformationalLinks())
  }
  return detailsAction;
}

