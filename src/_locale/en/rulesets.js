/* ruleCategories.js */

import {RULESET} from '../../constants.js';

export const rulesets = [
  {
    id           : RULESET.TRIAGE,
    title        : 'Triage',
    description  : 'First set of rules to focus on for people new to accessibility or to get an initial view of accessibility of a resource, primarily rules that result in pass/fail results.'
  },
  {
    id           : RULESET.LEVEL,
    title        : 'WCAG A + Triage rules',
    description  : 'All WCAG Single-A rules and all WCAG Double-A rules in the Triage ruleset.'
  },
  {
    id           : RULESET.ALL,
    title        : 'WCAG A and AA rules',
    description  : 'WCAG Single-A and Double-A rules.'
  }
];
