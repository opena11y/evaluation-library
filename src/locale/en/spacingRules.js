/* spacingRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const spacingRules = {
  SPACING_1: {
        ID:                    'Spacing 1',
        DEFINITION:            'No loss of content or functionality occurs by users adjusting any of the following text styling properties within a limited range: line height (line spacing), paragraph spacing, letter spacing and word spacing.  There are some exceptions for some languages and scripts.',
        SUMMARY:               'Text Spacing',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if the page supports text spacing requirements.  Use a browser add-on or assistive technology that supports changes in text spacing to verify support for this requirements.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1:  'The evaluation can not automatically determine if the page supports text spacing requirements.  Use a browser add-on or assistive technology that supports changes in text spacing to verify support for this requirements.'
        },
        PURPOSES: [
          'People with low vision who require increased space between lines, words, and letters are able to read text.',
          'People with dyslexia may increase space between lines, words, and letters to increase reading speed.',
          'White space between blocks of text can help people with cognitive disabilities discern sections and call out boxes.'
        ],
        TECHNIQUES: [
          'This requirement does not require authors to set any of their content to a specified metric, nor does it intend to imply that all users will adjust the specified metrics. Rather, it specifies that should a user choose to set any of these metrics they can do so without any loss of content or functionality. The author requirement is both to not interfere with a user\'s ability to override the author settings, and to ensure that modified content is not visually distorted within the adjustment ranges of the requirement.',
          'Range: Line height (line spacing) to at least 1.5 times the font size.',
          'Range: Spacing following paragraphs to at least 2 times the font size.',
          'Range: Letter spacing (tracking) to at least 0.12 times the font size.',
          'Range: Word spacing to at least 0.16 times the font size.',
          'Test: Use a browser extension or bookmrklet to test your content.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Text Spacing',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'Chrome Extension: Text Spacing Editor',
            url:   'https://chromewebstore.google.com/detail/text-spacing-editor/amnelgbfbdlfjeaobejkfmjjnmeddaoj'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'Firefox Extension: Text Spacing Editor',
            url:   'https://addons.mozilla.org/en-US/firefox/addon/text-spacing-editor-actum/'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'HOLISTICA11Y: Text Spacing Bookmarklet',
            url:   'https://holistica11y.com/text-spacing-bookmarklet-for-accessibility-testing/'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C36:Allowing for text spacing override',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C36'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C35: Allowing for text spacing without wrapping',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C35'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C8: Using CSS letter-spacing to control spacing within a word ',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C8'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C21: Specifying line spacing in CSS',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C21'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'C28:Specifying the size of text containers using em units',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/css/C21'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F104: Failure of Success Criterion 1.4.12 due to clipped or overlapped content when text spacing is adjusted',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F104'
          }
        ]
  }
}

