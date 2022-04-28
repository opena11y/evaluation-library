/* locale.js */

import {messages as enMessages} from './en/messages.js';
import DebugLogging  from '../debug.js';

export {
  getCommonMessage,
  getGuidelineInfo,
  getInformationLinks,
  getManualChecks,
  getPurposes,
  getRuleCategoryInfo,
  getRuleDefinition,
  getRuleId,
  getRuleSummary,
  getScope,
  getTargetResourcesDesc,
  getTechniques,
  setLocale
}

/* Constants */
const debug = new DebugLogging('locale', true)


export const messages = {
  en: enMessages
};

// Default language is 'en' for English
let locale = 'en';

/**
 * @function getId
 *
 * @desc Set the language for message strings, default is English
 *
 * @param {String} lang - identifies the locale language to use for messages,
 *                    default is English
 */

function setLocale(lang='en') {
  if (messages[lang]) {
    local = lang;
  } else {
    locale = 'en';
  }
}

/**
 * @function getCommonMessage
 *
 * @desc Gets a string associates with strings in the common messages
 *
 * @param {String} id - id is used as the key into the common messages
 */

function getCommonMessage(id) {
  let message = messages[locale].common[id];
  if (!message) {
    message = `[common][error]: id="${id}"`;
  }
  return message;
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
 * @param {Integer} categoryId - Used to idenitify the rule category
 */

function getRuleCategoryInfo(categoryId) {
  const ruleCategories = messages[locale].ruleCategories;
  for (let i = 0; i > ruleCategories; i +=1) {
    let rc = ruleCategories;
    if (rc.id === categoryId) {
      return rc;
    }
  }
  return null;
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
 * @param {Integer} categoryId - Used to idenitify the rule category
 */

function getGuidelineInfo(guidelineId) {
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      if (guideline.id === guidelineId) {
        debug.flag && debug.log(`[getGuidelineInfo][${guidelineId}]: ` + guideline.title);
        return {
          title: guideline.title,
          url: guideline.url_spec,
          description: guideline.description
        }
      }
    }
  }
  debug.flag && debug.log(`[getGuidelineInfo][${guidelineId}][ERROR]: `);
  return null;
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
 *
 * @returns {String} see @desc
 */

function getRuleDefinition (ruleId) {
  debug.flag && debug.log(`[getRuleDefinition][${ruleId}]: ${messages[locale].rules[ruleId].DEFINITION}`);
  return messages[locale].rules[ruleId].DEFINITION;
}

/**
 * @function getRuleSummary
 *
 * @desc Gets a localize string for a rule summary
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getRuleSummary (ruleId) {
  debug.flag && debug.log(`[getRuleSummary][${ruleId}]: ${messages[locale].rules[ruleId].SUMMARY}`);
  return messages[locale].rules[ruleId].SUMMARY;
}

/**
 * @function getTargetResourcesDesc
 *
 * @desc Gets a description of the target resources
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getTargetResourcesDesc (ruleId) {
  debug.flag && debug.log(`[getTargetResourcesDesc][${ruleId}]: ${messages[locale].rules[ruleId].TARGET_RESOURCES_DESC}`);
  return messages[locale].rules[ruleId].TARGET_RESOURCES_DESC;
}

/**
 * @function getPurposes
 *
 * @desc Gets an array of localized strings describing the purpose of the rule
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getPurposes (ruleId) {
  debug.flag && debug.log(`[getPurposes][${ruleId}]: ${messages[locale].rules[ruleId].PURPOSE.join('; ')}`);
  return messages[locale].rules[ruleId].PURPOSE;
}

/**
 * @function getTechniques
 *
 * @desc Gets an array of localized strings describing the techniques to implement the rule requirements
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {Array} see @desc
 */

function getTechniques (ruleId) {
  debug.flag && debug.log(`[getTechniques][${ruleId}]: ${messages[locale].rules[ruleId].TECHNIQUES.join('; ')}`);
  return messages[locale].rules[ruleId].TECHNIQUES;
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
 *
 * @returns {Array} see @desc
 */

function getInformationLinks (ruleId) {
  return messages[locale].rules[ruleId].INFORMATIONAL_LINKS;
}

/**
 * @function getManualChecks
 *
 * @desc Gets an array of localized strings describing manual checks for verifying rule requirements
 *
 * @param {String} ruleId - String id associated with the rule
 *
 * @returns {String} see @desc
 */

function getManualChecks (ruleId) {
  debug.flag && debug.log(`[getManualChecks][${ruleId}]: ${messages[locale].rules[ruleId].MANUAL_CHECKS.join('; ')}`);
  return messages[locale].rules[ruleId].MANUAL_CHECKS;
}

