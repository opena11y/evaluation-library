/* htmlRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const htmlRules = {

  HTML_1: {
      ID:                    'HTML 1',
      DEFINITION:            '@marquee@ elements must be removed to improve readability of content.',
      SUMMARY:               'Replace @marquee@ elements',
      TARGET_RESOURCES_DESC: '@marquee@ element',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Replace the @marquee@ element with a standard HTML element. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
        FAIL_P:   'Replace the %N_F @marquee@ elements with standard HTML elements. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
        HIDDEN_S: 'If the hidden @marquee@ element becomes visible, it must be changed to a standard HTML element.  Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
        HIDDEN_P: 'If any of the %N_H hidden @marquee@ elements become visible, they must be changed to standard HTML elements. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
        NOT_APPLICABLE:  'No @marquee@ elements found on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_FAIL_1: 'Change the @marquee@ element to a standard HTML element. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
        ELEMENT_HIDDEN_1: '@marquee@ element is hidden, but should be changed to a standard HTML element, in case it becomes visible. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.'
      },
      PURPOSES: [
        'Automatically moving text cannot be read by many people with visual impairments or by people with learning disabilities that affect reading.'
      ],
      TECHNIQUES: [
        'Replace the @marquee@ element with a standard HTML element and use CSS techniques to style the content.',
        'By default, when the page loads, the marquee should be paused.',
        'Use Javascript to provide buttons that start and stop the scrolling of content in the marquee.',
        'Provide a means to see all of the content in the marquee at one time.'
      ],
      MANUAL_CHECKS: [
        'Verify that when the page loads, the content is not scrolling.',
        'Verify that there are start and pause buttons that start and stop the scrolling of content.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'MDN: The Marquee element',
          url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'W3C Schools: The Marquee element',
          url:   'https://www.w3schools.in/html/marquee-tag'
        }
      ]
  }
}
