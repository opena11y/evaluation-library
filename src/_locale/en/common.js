/* common.js */

export const common = {
  level: ['undefined', 'AAA', 'AA', 'undefined', 'A'],
  baseResult: ['undefined','P','H','MC','W','V'],
  baseResultLong: ['undefined','Pass','Hidden','Manual Check','Warning','Violation'],
  resultType: ['base','element','page','website'],
  ruleResult: ['undefined', 'N/A', 'P', 'MC', 'W', 'V'],
  ruleScopes: ['undefined', 'element', 'page', 'website'],
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
  tableType: ['undefined', 'Unknown', 'Layout', 'Data', 'Complex', 'ARIA Table', 'Grid', 'Tree Grid'],
  headerSource: ['undefined', 'none', 'headers attribute', 'row and column'],

  elementViolationLabel:   'V',
  elementWarningLabel:     'W',
  elementPassLabel:        'P',
  elementManualCheckLabel: 'MC',

  pageViolationLabel:   'Page Violation',
  pageWarningLabel:     'Page Warning',
  pagePassLabel:        'Page Pass',
  pageManualCheckLabel: 'Page Manual Check',

  websiteViolationLabel:   'Website Violation',
  websiteWarningLabel:     'Website Warning',
  websitePassLabel:        'Website Pass',
  websiteManualCheckLabel: 'Website Manual Check'

}
