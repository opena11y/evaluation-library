/* messages.js for English messages */

import {common}         from './common.js';
import {ruleCategories} from './ruleCategories.js';
import {wcag}           from './wcag.js';
import {colorRules}     from './colorRules.js';

export const enMessages = {
  common: common,
  ruleCategories: ruleCategories,
  wcag: wcag,
  rules: {}
}

enMessages.rules  = Object.assign(enMessages.rules, colorRules);
