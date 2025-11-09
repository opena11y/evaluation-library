/* wave-info.js */

/* imports */
import {
  waveInfo
} from './gen-wave-rules.js';

import DebugLogging from '../debug.js';

import {
  convertRuleTitle
} from '../utils.js';

/* Constants */
const debug = new DebugLogging('waveInfo', false);
debug.flag = false;

export function getWaveRuleInfo(refs, convert=false) {

  debug.flag && debug.log(`[waveRules]: ${refs.join(' ')}`);

  const infos = [];

  refs.forEach( (ref) => {
    const r = waveInfo.rules[ref];
    if (r) {
      const info = {};
      info.title  = convert ? convertRuleTitle(r.title) : r.title;
      info.url    = r.url
      info.type   = r.error ? 'Error' : r.contrast ? 'Contrast' : 'Alert';
      infos.push(info);
    }
    else {
      debug.log(`[ref]: ${ref} not found`);
    }
  });

  return infos;
}
