/* messages.js for English messages */

import {common}         from './common.js';
import {ruleCategories} from './ruleCategories.js';
import {wcag}           from './wcag.js';
import {colorRules}     from './colorRules.js';

export const messages = {
  common: common,
  ruleCategories: ruleCategories,
  wcag: wcag,
  rules: {}
}

messages.rules = Object.assign(messages.rules, colorRules);
