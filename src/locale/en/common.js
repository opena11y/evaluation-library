/* common.js */

export const common = {
  aria13: ' (ARIA 1.3)',
  level: ['undefined', 'AAA', 'AA', 'undefined', 'A'],
  baseResult: ['undefined','P','H','MC','W','V'],
  baseResultLong: ['undefined','Pass','Hidden','Manual Check','Warning','Violation'],
  resultType: ['base','element','page','website'],
  ruleResult: ['undefined', 'N/A', 'P', 'MC', 'W', 'V'],
  ruleScopes: ['undefined', 'Element', 'Page', 'undefined', 'Website'],
  allRuleResults: 'All Rule Results',
  allRules: 'All Rules',
  implementationValue: [
    'undefined',
    'Not Applicable',
    'Not Implemented',
    'Partial Implementation',
    'Almost Complete',
    'Complete',
    'Complete with Manual Checks',
    'Manual Checks Only'
    ],
  ruleResultMessages: {
    'ACTION_NONE': 'No action needed',
    'NOT_APPLICABLE': 'Not applicable'
  },
  required: 'Required',
  recommended: 'Recommended',
  tableType: ['undefined', 'Unknown', 'Layout', 'Simple Data', 'Complex Data', 'ARIA Table', 'Grid', 'Tree Grid'],

  elementViolationLabel:     'V',
  elementWarningLabel:       'W',
  elementPassLabel:          'P',
  elementManualCheckLabel:   'MC',
  elementHiddenLabel:        'H',
  elementInertLabel:         'I',
  elementNotApplicableLabel: 'NA',

  pageViolationLabel:   'Page Violation',
  pageWarningLabel:     'Page Warning',
  pagePassLabel:        'Page Pass',
  pageManualCheckLabel: 'Page Manual Check',

  websiteViolationLabel:   'Website Violation',
  websiteWarningLabel:     'Website Warning',
  websitePassLabel:        'Website Pass',
  websiteManualCheckLabel: 'Website Manual Check',

  rulesetLevelA:   'Level A only',
  rulesetLevelAA:  'Levels A and AA',
  rulesetLevelAAA: 'Levels A, AA and enhanced CCR',

  rulesetFirstStep: 'First Step Rules',
  rulesetWCAG22:    'WCAG 2.2, ',
  rulesetWCAG21:    'WCAG 2.1, ',
  rulesetWCAG20:    'WCAG 2.0, ',

  scopeFilterElement: ', Element scope only',
  scopeFilterPage:    ', Page scope only',
  scopeFilterWebsite: ', Website scope only',

  headerSource: ['none', 'none', 'Headers Attribute', 'Row/Column Headers']

}
