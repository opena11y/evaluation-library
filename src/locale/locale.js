/* locale.js */

import {messages as enMessages} from './en/messages.js';

import DebugLogging        from '../debug.js';
import {filterTextContent} from '../utils.js';

import {
  WCAG21_SC,
  WCAG22_SC
} from '../constants.js';

export {
  getBaseResultMessages,
  getBaseResultMessage,
  getCommonMessage,
  getGuidelineInfo,
  getHasFailures,
  getHasHidden,
  getHasManualChecks,
  getHasPass,
  getInformationLinks,
  getImplementationValue,
  getManualChecks,
  getManualCheckMessage,
  getPurposes,
  getRuleCategories,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleResultMessages,
  getRuleSummary,
  getRulesetInfo,
  getRulesetLabel,
  getScope,
  getRuleScopeLabel,
  getRuleScopes,
  getRuleScopeInfo,
  getSuccessCriteriaInfo,
  getSuccessCriterionInfo,
  getTargetResourcesDesc,
  getTechniques,
  getWCAG,
  getWCAGLevel,
  getWCAGVersion,
  setLocale
}

/* Constants */
const debug = new DebugLogging('locale', false);

// const globalUseCodeTags = true;

export const messages = {
  en: enMessages
};

// Default language is 'en' for English
var locale = 'en';

/**
 * @function getWCAG
 *
 * @desc Get reference to localized version of WCAG requirements object
 *
 * @param {Object} @desc
 */

function getWCAG() {
  return messages[locale].wcag;
}

/**
 * @function getWCAGLevel
 *
 * @desc Get string representing the WCAG Level
 *
 * @param {Object} @desc
 */

function getWCAGLevel(primaryId) {
  const csInfo = getSuccessCriterionInfo(primaryId);
  return messages[locale].common.level[csInfo.level];
}

/**
 * @function setLocale
 *
 * @desc Set the language for message strings, default is English
 *
 * @param {String} lang - identifies the locale language to use for messages,
 *                    default is English
 */

function setLocale(lang='en') {
  if (messages[lang]) {
    locale = lang;
  } else {
    locale = 'en';
  }
}

/**
 * @function getCommonMessage
 *
 * @desc Gets a string associated with strings in the common messages
 *
 * @param {String} id     - id is used as the key into the common messages
 * @param {integer} value - If the key identifies an array the value is used to
 *                          select a value from the array
 */

function getCommonMessage(id, value=0) {
  let message = messages[locale].common[id];
  if (Array.isArray(message) ||
      (typeof message === 'object')) {
    message = message[value];
  }

  if (!message) {
    message = `[common][error]: id="${id}"`;
  }
  debug.flag && debug.log(`[${id}][${value}]: ${message}`);
  return message;
}

/**
 * @function getImplementationValue
 *
 * @desc Gets a localized string description for a implementation level
 *
 * @param {integer} implementationId - If the id is an index into an array
 *                                     of strings
 */

function getImplementationValue(implementationId) {
  let message = messages[locale].common.implementationValues[implementationId];
  return message;
}


/**
 * @function getRuleCategories
 *
 * @desc Gets localized rule categories object
 *
 * @return {Object}  see @desc
 */

function getRuleCategories() {
  return messages[locale].ruleCategories;
}

/**
 * @function getRuleCategoryInfo
 *
 * @desc Gets a object with keys into strings with rule category information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} categoryId - Used to identify the rule category
 * 
 * @return {Object}  see @desc
 */

function getRuleCategoryInfo(categoryId) {
  const ruleCategories = messages[locale].ruleCategories;
  for (let i = 0; i < ruleCategories.length; i +=1) {
    let rc = ruleCategories[i];
    if (rc.id === categoryId) {
      return rc;
    }
  }
  return null;
}

/**
 * @function getRuleScopes
 *
 * @desc Gets localized rule scope object
 *
 * @return {Object}  see @desc
 */

function getRuleScopes() {
  return messages[locale].ruleScopes;
}

/**
 * @function getRuleScopeInfo
 *
 * @desc Gets a object with keys into strings with scope information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} categoryId - Used to identify the rule scope
 *
 * @return {Object}  see @desc
 */

function getRuleScopeInfo(scopeId) {
  const ruleScopes = messages[locale].ruleScopes;
  for (let i = 0; i < ruleScopes.length; i +=1) {
    let rs = ruleScopes[i];
    if (rs.id === scopeId) {
      return rs;
    }
  }
  return null;
}

/**
 * @function getRulesetInfo
 *
 * @desc Gets a object with keys into strings with ruleset information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} rulesetId - Used to idenitify the ruleset
 * 
 * @return {Object}  see @desc
 */

function getRulesetInfo (rulesetId) {
  const rulesets = messages[locale].rulesets;
  for (let i = 0; i < rulesets.length; i +=1) {
    let rs = rulesets[i];
    if (rs.id === rulesetId) {
      return rs;
    }
  }
  return null;
}

/**
 * @function getRulesetLabel
 *
 * @desc Returns a localize string describing the options
 *       used in the evaluation
 *
 * @param {String} rulesetId      - Used to identify the ruleset
 * @param {String} level          - Used to identify the WCAG level
 * @param {String} ariaVersionId  - Used to identify the ARIA version
 *
 * @return {String}  see @desc
 */

function getRulesetLabel(rulesetId, level, ariaVersionId) {

    function addAria () {
      switch (ariaVersionId) {
        case 'ARIA13':
          return messages[locale].common.aria13;
      }
      return '';
    }

    function addLevel () {
      switch (level) {
        case 'A':
          return messages[locale].common.rulesetLevelA;

        case 'AA':
          return messages[locale].common.rulesetLevelAA;

        case 'AAA':
          return messages[locale].common.rulesetLevelAAA;
      }
      return '';
    }

    let label = '';

    switch (rulesetId) {

      case 'FIRSTSTEP':
        label = messages[locale].common.rulesetFirstStep + addAria();
        break;

      case 'WCAG22':
        label = messages[locale].common.rulesetWCAG22 + addLevel() + addAria();
        break;

      case 'WCAG21':
        label = messages[locale].common.rulesetWCAG21 + addLevel() + addAria();
        break;

      default:
        label = messages[locale].common.rulesetWCAG20 + addLevel() + addAria();
        break;
    }

  return label;
}

/**
 * @function getRuleScopeLabel
 *
 * @desc Returns a localize string describing the scope filter option
 *
 * @param {String} rulesetId      - Used to identify the ruleset
 * @param {String} level          - Used to identify the WCAG level
 * @param {String} ariaVersionId  - Used to identify the ARIA version
 *
 * @return {String}  see @desc
 */

function getRuleScopeLabel(scopeFilter) {

    let label = '';

    switch (scopeFilter) {

      case 'ALL':
        label = messages[locale].common.ruleScopeAll;
        break;

      case 'PAGE':
        label = messages[locale].common.ruleScopePage;
        break;

      case 'WEBSITE':
        label = messages[locale].common.ruleScopeWebsite;
        break;

      default:
        label = 'undefined';
        break;
    }

  return label;
}

/**
 * @function getGuidelineInfo
 *
 * @desc Gets a object with keys into strings with WCAG Guideline information,
 *       keys are:
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Integer} categoryId - Used to identify the WCAG guideline
 */

function getGuidelineInfo(guidelineId) {
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      if (guideline.id === guidelineId) {
        debug.flag && debug.log(`[getGuidelineInfo][${guidelineId}]: ${guideline.title}`);
        return {
          num: g,
          title: guideline.title,
          url: guideline.url_spec,
          description: guideline.description
        };
      }
    }
  }
  debug.flag && debug.log(`[getGuidelineInfo][${guidelineId}][ERROR]: `);
  // Assume all rules
  return {
    title: messages[locale].common.allRules,
    url: '',
    description: ''
  };
}

/**
 * @function getSuccessCriterionInfo
 *
 * @desc Gets a object with keys into strings with WCAG Success Criteria information,
 *       keys are:
 *       'level'
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {String} successCriteriaIds - Used to idenitify the rule category (e.g. P.G.SC)
 *
 * @return {Object} see @desc
 */

function getSuccessCriterionInfo(successCriterionId) {
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      for (const sc in guideline.success_criteria) {
        const success_criterion = guideline.success_criteria[sc];
        if (sc === successCriterionId) {
          debug.flag && debug.log(`[getSuccessCriterionInfo][${successCriterionId}]: ${success_criterion.title}`);
          return {
            id: successCriterionId,
            level: success_criterion.level,
            title: success_criterion.title,
            url: success_criterion.url_spec,
            description: success_criterion.description
          };
        }
      }
    }
  }
  debug.flag && debug.log(`[getSuccessCriterionInfo][${successCriterionId}]: ERROR`);
  return null;
}

/**
 * @function getSuccessCriteriaInfo
 *
 * @desc Gets an array of objects, each object has a keys to a string with WCAG Success Criteria information,
 *       keys are:
 *       'level'
 *       'title'
 *       'url'
 *       'description'
 *
 * @param {Array of String} successCriteriaIds - An array of success criterion reference (e.g. P.G.SC)
 *
 * @return {Array od Objects} see @desc
 */

function getSuccessCriteriaInfo(successCriteriaIds) {
  debug.flag && debug.log(`[getSuccessCriteriaInfo]: ${successCriteriaIds.length}`);
  const scInfoArray = []
  successCriteriaIds.forEach( sc => {
    scInfoArray.push(getSuccessCriterionInfo(sc));
  })
  return scInfoArray;
}

/**
 * @function getScope
 *
 * @desc Gets a localize string for the rule scope id
 *
 * @param {Integer} scopeId - Numberical id associates with the rule scope
 *
 * @returns {String} see @desc
 */

function getScope (scopeId) {
  return messages[locale].common.ruleScopes[scopeId];
}

/**
 * @function getRuleId
 *
 * @desc Gets a localize string for the rule id
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getRuleId (ruleId) {
  return messages[locale].rules[ruleId].ID;
}

/**
 * @function getRuleDefinition
 *
 * @desc Gets a localize string for a rule definition
 *
 * @param {String} ruleId - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {String} see @desc
 */

function getRuleDefinition (ruleId, transform=false) {
  debug.flag && debug.log(`[getRuleDefinition][${ruleId}]: ${messages[locale].rules[ruleId].DEFINITION}`);
  let m = messages[locale].rules[ruleId].DEFINITION;
  if (transform) m = transformToCode(m);
  return m;
}

/**
 * @function getRuleSummary
 *
 * @desc Gets a localize string for a rule summary
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {String} see @desc
 */

function getRuleSummary (ruleId, transform=false) {
  debug.flag && debug.log(`[getRuleSummary][${ruleId}]: ${messages[locale].rules[ruleId].SUMMARY}`);
  let m = messages[locale].rules[ruleId].SUMMARY;
  if (transform) m = transformToCode(m);
  return m;
}

/**
 * @function getTargetResourcesDesc
 *
 * @desc Gets a description of the target resources
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {String} see @desc
 */

function getTargetResourcesDesc (ruleId, transform=false) {
  debug.flag && debug.log(`[getTargetResourcesDesc][${ruleId}]: ${messages[locale].rules[ruleId].TARGET_RESOURCES_DESC}`);
  let m = messages[locale].rules[ruleId].TARGET_RESOURCES_DESC;
  if (transform) m = transformToCode(m);
  return m;
}

/**
 * @function getPurposes
 *
 * @desc Gets an array of localized strings describing the purpose of the rule
 *
 * @param {String} ruleId     - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array of Strings} see @desc
 */

function getPurposes (ruleId, transform=false) {
  const purposes = [];
  messages[locale].rules[ruleId].PURPOSES.forEach ( p => {
    if (transform) p = transformToCode(p);
    purposes.push(p);
  })
  debug.flag && debug.log(`[getPurposes][${ruleId}]: ${purposes.join('; ')}`);
  return purposes;
}

/**
 * @function getTechniques
 *
 * @desc Gets an array of localized strings describing the techniques to implement the rule requirements
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array of Strings} see @desc
 */

function getTechniques (ruleId, transform=false) {
  const techniques = [];
  messages[locale].rules[ruleId].TECHNIQUES.forEach ( t => {
    if (transform) t = transformToCode(t);
    techniques.push(t);
  })
  debug.flag && debug.log(`[getTechniques][${ruleId}]: ${techniques.join('; ')}`);
  return techniques;
}

/**
 * @function getInformationLinks
 *
 * @desc Gets an array of objects with keys to localized strings to more information about the rule,
 *       the keys include:
 *       'type': Integer
 *       'title' : String
 *       'url' : String
 *
 * @param {String} ruleId - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array} see @desc
 */

function getInformationLinks (ruleId, transform=false) {
  const infoLinks = [];
  messages[locale].rules[ruleId].INFORMATIONAL_LINKS.forEach( infoLink => {
    infoLinks.push(
      {
        type: infoLink.type,
        title: transform ? transformToCode(infoLink.title) : infoLink.title,
        url: infoLink.url
      }
    );
    debug.flag && debug.log(`[infoLink][title]: ${infoLink.title}`);
    debug.flag && debug.log(`[infoLink][  url]: ${infoLink.url}`);
  })
  return infoLinks;
}

/**
 * @function getManualChecks
 *
 * @desc Gets an array of localized strings describing manual checks for verifying rule requirements
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array of Strings} see @desc
 */

function getManualChecks (ruleId, transform=false) {
  const manualChecks = [];
  messages[locale].rules[ruleId].MANUAL_CHECKS.forEach ( mc => {
    if (transform) mc = transformToCode(mc);
    manualChecks.push(mc);
  })
  debug.flag && debug.log(`[getManualChecks][${ruleId}]: ${manualChecks.join('; ')}`);
  return manualChecks;
}

/**
 * @function getRuleResultMessages
 *
 * @desc Gets an array of localized strings for rule results
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array of Strings} see @desc
 */

function getRuleResultMessages (ruleId, transform=false) {
  const resultMessages = {};
  const msgs = messages[locale].rules[ruleId].RULE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    resultMessages[key] = transform ? transformToCode(msgs[key]) : msgs[key];
    debug.flag && debug.log(`[getRuleResultMessages][${ruleId}][${key}]: ${resultMessages[key]}`);
  }
  return resultMessages;
}

/**
 * @function getBaseResultMessages
 *
 * @desc Gets an array of localized strings for element results
 *
 * @param {String}  ruleId    - String id associated with the rule
 * @param {Boolean} transform - Transform @ to <code> tags
 *
 * @returns {Array of Strings} see @desc
 */

function getBaseResultMessages (ruleId, transform=false) {
  const resultMessages = {};
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    resultMessages[key] = transform ? transformToCode(msgs[key]) : msgs[key];
    debug.flag && debug.log(`[getBaseResultMessages][${ruleId}][${key}]: ${resultMessages[key]}`);
  }
  return resultMessages;
}

/**
 * @method getBaseResultMessage
 *
 * @desc Returns an localized element result message
 *
 * @return {String} String with element result message
 */

function getBaseResultMessage (msg, msgArgs) {
  let message = msg;
  msgArgs.forEach( (arg, index) => {
    const argId = "%" + (index + 1);

    if (typeof arg === 'string') {
      arg = filterTextContent(arg);
    }
    else {
      if (typeof arg === 'number') {
        arg = arg.toString();
      }
      else {
        arg = "";
      }
    }
    message = message.replace(argId, arg);
  });
  return message;
}

function getHasManualChecks (ruleId) {
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    if (key.includes('_MC')) {
      return true;
    }
  }
  return false;
}

function getHasFailures (ruleId) {
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    if (key.includes('_FAIL')) {
      return true;
    }
  }
  return false;
}

function getHasPass (ruleId) {
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    if (key.includes('_PASS')) {
      return true;
    }
  }
  return false;
}

function getHasHidden (ruleId) {
  const msgs = messages[locale].rules[ruleId].BASE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    if (key.includes('_HIDDEN')) {
      return true;
    }
  }
  return false;
}

function getManualCheckMessage (ruleId) {
  const msgs = messages[locale].rules[ruleId].RULE_RESULT_MESSAGES;
  for ( const key in msgs ) {
    if (key.includes('MANUAL_CHECK')) {
      return messages[locale].rules[ruleId].RULE_RESULT_MESSAGES[key];
    }
  }
  return 'not found';
}

/* helper functions */

function getWCAGVersion (primaryId) {
  if (WCAG21_SC.includes(primaryId)) {
    return 'WCAG21';
  }
  if (WCAG22_SC.includes(primaryId)) {
    return 'WCAG22';
  }
  return 'WCAG20';
}

function transformToCode (content) {

  let c = '';
  let i = content.indexOf('@');
  let k = content.indexOf('^');
  let j = 0;

  while ((i >= 0) || (k >= 0)) {
    if (i > k) {
      c += content.substring(j, i);

      j = content.indexOf('@', (i+1));
      if (j < 0) {
        j = content.length - 1;
      }
      c += '<code>';
      c += content.substring(i+1, j);
      c += '</code>';
      j += 1;

      i = content.indexOf('@', j);
    }
    else {
      c += content.substring(j, k);

      j = content.indexOf('^', (k+1));
      if (j < 0) {
        j = content.length - 1;
      }
      c += '<b>';
      c += content.substring(k+1, j);
      c += '</b>';
      j += 1;

      k = content.indexOf('^', j);
    }
  }

  if (j < content.length) {
    c += content.substring(j);
  }

  return c;
}

