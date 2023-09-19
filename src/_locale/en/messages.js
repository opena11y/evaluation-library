/* messages.js for English messages */

import {common}             from './common.js';
import {ruleCategories}     from './ruleCategories.js';
import {ruleScopes}         from './ruleScopes.js';
import {rulesets}           from './rulesets.js';
import {wcag}               from './wcag.js';

import {audioRules}         from './audioRules.js';
import {bypassRules}        from './bypassRules.js';
import {colorRules}         from './colorRules.js';
import {errorRules}         from './errorRules.js';
import {frameRules}         from './frameRules.js';
import {controlRules}       from './controlRules.js';
import {headingRules}       from './headingRules.js';
import {htmlRules}          from './htmlRules.js';
import {imageRules}         from './imageRules.js';
import {keyboardRules}      from './keyboardRules.js';
import {landmarkRules}      from './landmarkRules.js';
import {languageRules}      from './languageRules.js';
import {layoutRules}        from './layoutRules.js';
import {linkRules}          from './linkRules.js';
import {listRules}          from './listRules.js';
import {navigationRules}    from './navigationRules.js';
import {readingOrderRules}  from './readingOrderRules.js';
import {resizeRules}        from './resizeRules.js';
import {sensoryRules}       from './sensoryRules.js';
import {tableRules}         from './tableRules.js';
import {timingRules}        from './timingRules.js';
import {titleRules}         from './titleRules.js';
import {videoRules}         from './videoRules.js';
import {widgetRules}        from './widgetRules.js';

export const messages = {
  common: common,
  ruleCategories: ruleCategories,
  ruleScopes: ruleScopes,
  rulesets: rulesets,
  wcag: wcag,
  rules: {}
}

messages.rules = Object.assign(messages.rules, audioRules);
messages.rules = Object.assign(messages.rules, bypassRules);
messages.rules = Object.assign(messages.rules, colorRules);
messages.rules = Object.assign(messages.rules, errorRules);
messages.rules = Object.assign(messages.rules, frameRules);
messages.rules = Object.assign(messages.rules, controlRules);
messages.rules = Object.assign(messages.rules, headingRules);
messages.rules = Object.assign(messages.rules, htmlRules);
messages.rules = Object.assign(messages.rules, imageRules);
messages.rules = Object.assign(messages.rules, keyboardRules);
messages.rules = Object.assign(messages.rules, landmarkRules);
messages.rules = Object.assign(messages.rules, languageRules);
messages.rules = Object.assign(messages.rules, layoutRules);
messages.rules = Object.assign(messages.rules, linkRules);
messages.rules = Object.assign(messages.rules, listRules);
messages.rules = Object.assign(messages.rules, navigationRules);
messages.rules = Object.assign(messages.rules, readingOrderRules);
messages.rules = Object.assign(messages.rules, resizeRules);
messages.rules = Object.assign(messages.rules, sensoryRules);
messages.rules = Object.assign(messages.rules, tableRules);
messages.rules = Object.assign(messages.rules, timingRules);
messages.rules = Object.assign(messages.rules, titleRules);
messages.rules = Object.assign(messages.rules, videoRules);
messages.rules = Object.assign(messages.rules, widgetRules);

