/* ruleCategories.js */

import {RULESET} from '../../constants.js';

export const rulesets = [
  {
    id           : RULESET.TRIAGE,
    title        : 'Triage',
    description  : 'First set of rules to focus on for people new to accessibility or to get an initial view of accessibility of a resource, primarily rules that result in pass/fail results.'
  },
  {
    id           : RULESET.MORE,
    title        : 'More',
    description  : 'First and second set of rules and includes more rules requiring manual checks.'
  },
  {
    id           : RULESET.ALL,
    title        : 'All Rules',
    url          : '',
    description  : 'Set of all rules in the evaluation library.'
  }
];
