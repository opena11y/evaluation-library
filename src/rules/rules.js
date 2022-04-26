/* rules.js */

/* Imports */
import {colorRules} from './colorRules.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Rules', false)

export let rules = [];

rules = rules.concat(colorRules);


