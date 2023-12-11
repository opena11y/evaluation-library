/* bypassRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const bypassRules = {
  BYPASS_1: {
        ID:                    'Bypass 1',
        DEFINITION:            'Provide a keyboard-supported means of bypassing blocks of content, such as navigation menus and page headers, to get to the main content of the page.',
        SUMMARY:               'Skip to main content link',
        TARGET_RESOURCES_DESC: '@a@ and @a[button]@',
        RULE_RESULT_MESSAGES: {
          FAIL_S :         'Provide a valid target for the "skip to main content" link.',
          FAIL_P :         'Provide a valid target for the "skip to main content" link.',
          MANUAL_CHECK_S:  'Verify that the first link on the page is a "skip to main content" link and that the target of the skip link is a focusable element and is at the start of the main content.',
          MANUAL_CHECK_P:  'Verify that the first link on the page is a "skip to main content" link and that the target of the skip link is a focusable element and is at the start of the main content.',
          HIDDEN_S:        'One link that is hidden was not evaluated.',
          HIDDEN_P:        '%N_H links that are hidden were not evaluated.'
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_PASS_1:   '"SkipTo" menu button provides navigation to main and navigation landmarks and headings on the page.',
          ELEMENT_PASS_2:   'Link references a target on the page; verify that the target is the first focusable element on the page.',
          ELEMENT_MC_1:     'Target of link; verify that it is at the start of the main content of the page and is focusable.',
          ELEMENT_FAIL_1:   'Link does not reference a valid target on the page.',
          PAGE_PASS_1:      'Page includes "SkipTo" page script that provides a means of skipping to the structural landmarks and headings of the page.',
          PAGE_PASS_2:      'Page includes "SkipTo" link that provides a means of skipping to the main content of the page.',
          PAGE_FAIL_1:      'Link does not reference a valid target on the page.',
          PAGE_MC_1:        'Verify that that the target of the "skip to main content" link is focusable.',
          PAGE_MC_2:        'Verify that the page provides a link or other means of skipping to the main content of the page.'
        },
        PURPOSES: [
          'Most pages of websites typically have navigation menus, page headers and other repeated content before the main content of the page.',
          'For keyboard-only and screen reader users, a link or other means of skipping these types of content blocks makes it easy to go directly to the main content of the page, without first having to tab through the repeated content.'
        ],
        TECHNIQUES: [
          'Make the first link on the page an internal link that references a valid target element at the beginning of the main content of the page.',
          'The @id@ attribute is preferred method to identify the target element for the "Skip to main content" link.',
          'To make any target element focusable, add @tabindex="-1"@ to the element. If the target is an @a@ element, adding @tabindex="-1"@ will remove it from the tab order.',
          'If you use an @h1[id="main"]@ element as the target of the "Skip to main content" link, most screen readers will read the heading level and content when the user activates the skip to link.',
          'The "SkipTo" script automates the skip feature by providing a dynamically generated landmark regions and headings (H1-H2) based on the structural content of the page.'
        ],
        MANUAL_CHECKS: [
          'Using only the keyboard, use the link or "SkipTo" menu to move focus to the main content of the page.',
          'After moving focus to the main content, the next tab should move you to the first link, form control or other interactive element after the main content.'
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'WAI-ARIA Authoring Practices: Developing a Keyboard Interface',
            url:   'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'SkipTo Page Script',
            url:   'https://github.com/skipto-landmarks-headings/page-script-5/blob/main/README.md'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'WebAIM: Skip Navigation Links',
            url:   'https://webaim.org/techniques/skipnav/'
          }

        ]
  }
}

