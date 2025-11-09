/* axe-info.js */

/* imports */
import {
  axeInfo
} from './gen-axe-rules.js';

import {
  convertRuleTitle
} from '../utils.js';

import DebugLogging from '../debug.js';

/* Constants */
const debug = new DebugLogging('axeInfo', false);
debug.flag = false;

export function getAxeRuleInfo(refs, convert=false) {

  debug.flag && debug.log(`[axeRules]: ${refs.join(' ')}`);

  const infos = [];

  refs.forEach( (ref) => {
    const r = axeInfo.rules[ref];
    if (r) {
      const info = {};
      info.title  = convert ? convertRuleTitle(r.title) : r.title;
      info.url    = r.url
      info.type   = r.bestPractice ? 'Best Practices' : r.experimental ? 'Experimental' : 'Required';
      info.impact = r.impact
      infos.push(info);
    }
    else {
      debug.log(`[ref]: ${ref} not found`);
    }
  });

  return infos;
}
