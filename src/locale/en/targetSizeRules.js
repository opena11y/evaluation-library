/* targetSizeRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const targetSizeRules = {

 TARGET_SIZE_1: {
      ID:                    'Target Size 1',
      DEFINITION:            'Author sizing of links have at least the dimensions of 24 by 24 CSS pixels, unless it meets one of the four exceptions.',
      SUMMARY:               'Author sizing of links (Minimum)',
      TARGET_RESOURCES_DESC: 'links',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Remove or increase the author sizing of the area to activate the undersized link to at least 24 by 24 CSS pixels.',
        FAIL_P:  'Remove or increase the author sizing of the area to activate the %N_F undersized links to at least 24 by 24 CSS pixel.',
        HIDDEN_S:  'One undersized link was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized links were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized links found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions are %1 by %2 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions are %1 by %2, so either remove author sizing of the link dimensions or increase the authoring sizing dimensions to at least 24 x 24 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The author sized link is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.',
        'EXCEPTION (common) Inline: When links are in sentences (e.g. part of a paragraph), the target size requirement does not apply, unless the author has specifically defined the width or height using CSS.',
        'EXCEPTION (common) User Agent Control: If the size of the target is not modified by the author through CSS or other size properties, then the target does not need to meet the target size of 44 by 44 CSS pixels.',
        'EXCEPTION (uncommon) Equivalent Target Exception: If there is more than one target on a screen that performs the same action, only one of the targets need to meet the target size of 44 by 44 CSS pixels.',
        'EXCEPTION (uncommon) Essential Exception: If the target is required to be a particular target size and cannot be provided in another way.'
      ],
      TECHNIQUES: [
        'Remove author styling of the rendered size of the link, allowing the browser to render the link using the preferences of the user.',
        'If the link does not meet one of the exceptions, increase the author defined dimensions to at least 24 by 24 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Minimum)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  },


 TARGET_SIZE_2: {
      ID:                    'Target Size 2',
      DEFINITION:            'Author sizing of links have at least the dimensions of 44 by 44 CSS pixels, unless it meets one of the four exceptions.',
      SUMMARY:               'Author sizing of links (Enhanced)',
      TARGET_RESOURCES_DESC: 'links',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Remove or increase the author sizing of the area to activate the undersized link to at least 44 by 44 CSS pixels.',
        FAIL_P:  'Remove or increase the author sizing of the area to activate the %N_F undersized links to at least 44 by 44 CSS pixel.',
        HIDDEN_S:  'One undersized link was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized links were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized links found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions are %1 by %2 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions are %1 by %2, so either remove author sizing of the link dimensions or increase the authoring sizing dimensions to at least 44 x 44 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The author sized link is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.',
        'EXCEPTION (common) Inline: When links are in sentences (e.g. part of a paragraph), the target size requirement does not apply, unless the author has specifically defined the width or height using CSS.',
        'EXCEPTION (common) User Agent Control: If the size of the target is not modified by the author through CSS or other size properties, then the target does not need to meet the target size of 44 by 44 CSS pixels.',
        'EXCEPTION (uncommon) Equivalent Target Exception: If there is more than one target on a screen that performs the same action, only one of the targets need to meet the target size of 44 by 44 CSS pixels.',
        'EXCEPTION (uncommon) Essential Exception: If the target is required to be a particular target size and cannot be provided in another way.'
      ],
      TECHNIQUES: [
        'Remove author styling of the rendered size of the link, allowing the browser to render the link using the preferences of the user.',
        'If the link does not meet one of the exceptions, increase the author defined dimensions to at least 44 by 44 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Enhanced)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  },

  TARGET_SIZE_3: {
      ID:                    'Target Size 3',
      DEFINITION:            'Button dimensions are at least 24 by 24 CSS pixels.',
      SUMMARY:               'Button target size (Minimum)',
      TARGET_RESOURCES_DESC: 'buttons',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Use CSS to increase the size of the area to activate the undersized button to at least 24 by 24 CSS pixels.',
        FAIL_P:  'Use CSS to increase the size of the area to activate the %N_F undersized buttons to at least 24 by 24 CSS pixel.',
        HIDDEN_S:  'One undersized button was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized buttons were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized buttons found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions of the @%1@ element is %2 by %3 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions of the @%1@ element is %2 by %3, use CSS to increase the button dimensions to at least 24 x 24 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.'
      ],
      TECHNIQUES: [
        'Use CSS to increase the dimensions of the button to at least 24 by 24 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Minimum)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  },

 TARGET_SIZE_4: {
      ID:                    'Target Size 4',
      DEFINITION:            'Button dimensions are at least 44 by 44 CSS pixels.',
      SUMMARY:               'Button target size (Enhanced)',
      TARGET_RESOURCES_DESC: 'buttons',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Use CSS to increase the size of the area to activate the undersized button to at least 44 by 44 CSS pixels.',
        FAIL_P:  'Use CSS to increase the size of the area to activate the %N_F undersized buttons to at least 44 by 44 CSS pixel.',
        HIDDEN_S:  'One undersized button was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized buttons were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized buttons found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions of the @%1@ element is %2 by %3 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions of the @%1@ element is %2 by %3, use CSS to increase the button dimensions to at least 44 x 44 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.'
      ],
      TECHNIQUES: [
        'Use CSS to increase the dimensions of the button to at least 44 by 44 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Enhanced)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  },

  TARGET_SIZE_5: {
      ID:                    'Target Size 5',
      DEFINITION:            'Radio button and checkbox activation areas are at least 24 by 24 CSS pixels.',
      SUMMARY:               'Radio button and checkbox target size (Minimum)',
      TARGET_RESOURCES_DESC: 'radio buttons and checkboxes',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Use CSS to increase the size of the area to activate the undersized radio button or checkbox to at least 24 by 24 CSS pixels.',
        FAIL_P:  'Use CSS to increase the size of the area to activate the %N_F undersized radio buttons and checkboxes to at least 24 by 24 CSS pixel.',
        HIDDEN_S:  'One undersized radio button or checkbox was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized radio buttons or checkboxes were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized radio buttons or checkboxes found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions of the @%1@ element is %2 by %3 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions of the @%1@ element is %2 by %3, use CSS to increase the button dimensions to at least 24 x 24 CSS pixels.',
        ELEMENT_PASS_2:   'The current dimensions of the associated @label@ element is %1 by %2 and meet the target size requirement',
        ELEMENT_FAIL_2:   'The current dimensions of the associated @label@ element is %1 by %2, use CSS to increase the button dimensions to at least 24 x 24 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.'
      ],
      TECHNIQUES: [
        'Use CSS to increase the dimensions of the radio buttons and/or checkbox or the associated label elements to at least 24 by 24 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Minimum)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  },

  TARGET_SIZE_6: {
      ID:                    'Target Size 6',
      DEFINITION:            'Radio button and checkbox activation areas are at least 44 by 44 CSS pixels.',
      SUMMARY:               'Radio button and checkbox target size (Enhanced)',
      TARGET_RESOURCES_DESC: 'radio buttons and checkboxes',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Use CSS to increase the size of the area to activate the undersized radio button or checkbox to at least 44 by 44 CSS pixels.',
        FAIL_P:  'Use CSS to increase the size of the area to activate the %N_F undersized radio buttons and checkboxes to at least 44 by 44 CSS pixel.',
        HIDDEN_S:  'One undersized radio button or checkbox was not evaluated because it is not visible.',
        HIDDEN_P:  '%N_H undersized radio buttons or checkboxes were not evaluated because they are not visible.',
        NOT_APPLICABLE:  'No undersized radio buttons or checkboxes found on the page'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The current dimensions of the @%1@ element is %2 by %3 and meet the target size requirement',
        ELEMENT_FAIL_1:   'The current dimensions of the @%1@ element is %2 by %3, use CSS to increase the button dimensions to at least 44 x 44 CSS pixels.',
        ELEMENT_PASS_2:   'The current dimensions of the associated @label@ element is %1 by %2 and meet the target size requirement',
        ELEMENT_FAIL_2:   'The current dimensions of the associated @label@ element is %1 by %2, use CSS to increase the button dimensions to at least 44 x 44 CSS pixels.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is visually hidden and is not tested for target size.'
      },
      PURPOSES: [
        'The intent of this success criterion is to help users who may have trouble activating a small target because of hand tremors, limited dexterity or other reasons. If the target is too small, it may be difficult to aim at the target.',
        'Mice and similar pointing devices can be hard to use for these users, and a larger target will help them greatly in having positive outcomes on the web page.'
      ],
      TECHNIQUES: [
        'Use CSS to increase the dimensions of the radio buttons and/or checkbox or the associated label elements to at least 44 by 44 pixels.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type: REFERENCES.WCAG_SPECIFICATION,
          title: 'WCAG Understanding Target Size (Minimum)',
          url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Windows UWP Guidelines for touch targets',
          url:   'https://docs.microsoft.com/en-us/windows/uwp/design/input/guidelines-for-targeting'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Google Material Design Touch targets',
          url:   'https://material.io/design/layout/spacing-methods.html#touch-targets'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'web.dev Accessible tap targets',
          url:   'https://web.dev/accessible-tap-targets/'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Human Fingertips to Investigate the Mechanics of Tactile Sense (PDF)',
          url:   'http://touchlab.mit.edu/publications/2003_009.pdf'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'One-Handed Thumb Use on Small Touchscreen Devices',
          url:   'http://www.cs.umd.edu/hcil/trs/2006-11/2006-11.htm'
        },
        { type:  REFERENCES.REFERENCE,
          title: 'Microsoft Guidelines for Building Touch Friendly Sites',
          url:   'https://learn.microsoft.com/en-us/windows/apps/design/input/guidelines-for-targeting'
        }
      ]
  }
}

