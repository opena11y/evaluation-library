/* languageRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const languageRules = {

    TITLE_1: {
        ID:            'Title 1',
        DEFINITION:    '@title@ element must identify both the website and page content.',
        SUMMARY:       '@title@ must identify website and page',
        TARGET_RESOURCES_DESC: '@title@',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S: 'Verify that the @title@ element identifies both the website (if applicable) and the page content.',
          FAIL_S: 'Add a @title@ element to the @head@ element section with text content that identifies both the website (if applicable) and the page content.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1:   'Verify that the @title@ element identifies both the website (if applicable) and the page content.',
          PAGE_FAIL_1: 'Add content to the @title@ element that identifies both the website (if applicable) and the page content.',
          PAGE_FAIL_2: 'Add a @title@ element to the page that identifies both the website (if applicable) and the page content.'
        },
        PURPOSES: [
          'The @title@ element content can be accessed by assistive technologies to orient the user to the website and page content.'
        ],
        TECHNIQUES: [
          'Use a @title@ element to identify the website and page content.',
          'If the page is part of a sequence of web pages, include the sequence number and total number of steps in the @title@ element.'
        ],
        MANUAL_CHECKS: [
          'If applicable, verify that the title of the page identifies the website to which it belongs.',
          'Verify that the title of the page also identifies the page content.',
          'If the page is part of a sequence of web pages, verify that the title describes which step it is in the sequence.'
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML TITLE Element Specification',
            url:   'https://www.w3.org/TR/html4/struct/global.html#edef-TITLE'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'G88: Providing descriptive titles for Web pages',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G88'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'H25: Providing a title using the title element',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H25'
          }
        ]
    },
    TITLE_2: {
        ID:            'Title 2',
        DEFINITION:    '@h1@ elements must match part of the @title@ element content.',
        SUMMARY:       '@h1@ %s match part of the @title@',
        TARGET_RESOURCES_DESC: '@title@ and @h1@',
        RULE_RESULT_MESSAGES: {
          FAIL_S: 'The page has missing, hidden or empty @title@ and/or @h1@ elements or the @h1@ element content is not similar to the @title@ content.',
          FAIL_P: 'The page has missing, hidden or empty @title@ and/or @h1@ elements or the content of the @h1@ elements is not similar to the @title@ content.',
          MANUAL_CHECK_S: 'Verify that both the @title@ and @h1@ elements describe the purpose or content of the page and @h1@ elements are use to identify and describe the major sections of the page.',
          MANUAL_CHECK_P: 'Verify that both the @title@ and @h1@ elements describe the purpose or content of the page and @h1@ elements are use to identify and describe the major sections of the page.',
          HIDDEN_S: 'The page has a hidden @h1@ element that was not evaluated.',
          HIDDEN_P: 'The page has %N_H hidden @h1@ elements that were not evaluated.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1:   'The @h1@ element has the same or similar content as the @title@ element.',
          PAGE_PASS_1: 'The @h1@ element has the same or similar content as the @title@ element.',
          PAGE_PASS_2: 'The @h1@ elements have the same or similar content as the @title@ element.',
          PAGE_FAIL_1: 'Add a @title@ element to the page to enable the evaluation of @h1@ elements for similarity.',
          PAGE_FAIL_2: 'Add an @h1@ element to the page at the beginning of the main content.',
          PAGE_FAIL_3: 'Update the @h1@ element to have the same or similar content as the @title@ element.',
          PAGE_FAIL_4: 'Update the @h1@ elements to have the same or similar content as the @title@ element.',
          ELEMENT_MC_1:   'Verify @h1@ element identifies and describes a major section of the page.',
          ELEMENT_PASS_1: 'The @h1@ element has the same or similar content as the @title@ element.',
          ELEMENT_FAIL_1: 'The @h1@ element does NOT have the same or similar content as the @title@ element.',
          ELEMENT_FAIL_2: 'Add content to the @h1@ element, or remove it from the page.',
          ELEMENT_HIDDEN_1: 'The @h1@ element is hidden from assistive technology and therefore does not describe the purpose or content of the page.'
        },
        PURPOSES: [
          '@h1@ elements can be accessed by assistive technologies to identify the page content and to orient users within the website. The @h1@ element may also be used to identify the website.'
        ],
        TECHNIQUES: [
          'Use the @h1@ element to identify the page content in the same or similar way as the @title@ element.',
          'The @h1@ element may also be used to identify the website in the same or similar way as the @title@ element.',
          'If the page is part of a sequence of web pages, the @h1@ element should indicate the step in the sequence.'
        ],
        MANUAL_CHECKS: [
          'Verify that the @h1@ content identifies the page content.',
          'If applicable, verify that the @h1@ content of the page identifies the website to which it belongs.',
          'If the web page is part of a sequence of web pages, verify that the @h1@ content indicates the step number of the sequence.'
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'HTML TITLE Element Specification',
            url:   'https://www.w3.org/TR/html4/struct/global.html#edef-TITLE'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'G88: Providing descriptive titles for Web pages',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G88'
          },
          { type:  REFERENCES.WCAG_TECHNIQUE,
            title: 'H25: Providing a title using the title element',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H25'
          }
        ]
    }
}
