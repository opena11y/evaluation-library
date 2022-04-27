/* locale.js */

import {enMessages} from './en/enMessages.js';
import DebugLogging  from '../debug.js';

export {
  setLocale,
  getCommonMessage,
  getRuleCategoryInfo,
  getGuidelineInfo,
  getScope,
  getRuleId
}

/* Constants */
const debug = new DebugLogging('locale', true)


export const messages = {
  en: enMessages
};

// Default language is 'en' for English
let locale = 'en';

/**
 * @method getId
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
 * @method getCommonMessage
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
 * @method getRuleCategoryInfo
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
 * @method getGuidelineInfo
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
  debug.flag && debug.log(`[getGuidelineInfo][guidelineId]: ` + guidelineId);
  const principles = messages[locale].wcag.principles;
  for (const p in principles) {
    const principle = principles[p];
    debug.flag && debug.log(`[getGuidelineInfo][principle]: ` + principle.title);
    for (const g in principle.guidelines) {
      const guideline = principle.guidelines[g];
      debug.flag && debug.log(`[getGuidelineInfo][guideline]: ` + guideline.id);
      if (guideline.id === guidelineId) {
        return {
          title: guideline.title,
          url: guideline.url_spec,
          description: guideline.description
        }
      }
    }
  }
  return null;
}

/**
 * @method getScope
 *
 * @desc Gets a localize string for the rule scope id
 *
 * @param {Integer} scopeId - Numberical id associates with the rule scope
 *
 * @returns {String} Localized name for the rule scope
 */

function getScope(scopeId) {
  return messages[locale].common.ruleScopes[scopeId];
}

/**
 * @method getRuleId
 *
 * @desc Gets a localize string for the rule id
 *
 * @param {String} ruleId - String id associates with the rule
 *
 * @returns {String} Localized name for the rule scope
 */

function getRuleId(ruleId) {
  return messages[locale].rules[ruleId].ID;
}


