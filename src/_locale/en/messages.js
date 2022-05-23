/* messages.js for English messages */

import {common}         from './common.js';
import {ruleCategories} from './ruleCategories.js';
import {rulesets}       from './rulesets.js';
import {wcag}           from './wcag.js';

import {colorRules}     from './colorRules.js';
import {headingRules}   from './headingRules.js';
import {linkRules}      from './linkRules.js';
import {landmarkRules}  from './landmarkRules.js';

export const messages = {
  common: common,
  ruleCategories: ruleCategories,
  rulesets: rulesets,
  wcag: wcag,
  rules: {}
}

messages.rules = Object.assign(messages.rules, colorRules);
messages.rules = Object.assign(messages.rules, headingRules);
messages.rules = Object.assign(messages.rules, linkRules);
messages.rules = Object.assign(messages.rules, landmarkRules);
