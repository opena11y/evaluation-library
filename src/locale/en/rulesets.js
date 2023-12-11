/* ruleCategories.js */

import {RULESET} from '../../constants.js';

export const rulesets = [
  {
    id           : RULESET.TRIAGE,
    abbrev       : 'FS',
    title        : 'First Step',
    description  : 'First step rules to focus on for people new to accessibility or to get an initial view of accessibility of a resource, primarily rules that result in pass/fail results.'
  },
  {
    id           : RULESET.LEVEL,
    abbrev       : 'Level A + FS',
    title        : 'All WCAG Level A + First Step Level AA rules',
    description  : 'All WCAG Single-A rules and all WCAG AA rules in the First Step ruleset.'
  },
  {
    id           : RULESET.ALL,
    abbrev       : 'Level A and AA',
    title        : 'ALL WCAG A and AA rules',
    description  : 'All WCAG A and AA rules.'
  }
];
