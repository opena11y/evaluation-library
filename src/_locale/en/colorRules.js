/* colorRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const colorRules = {
  COLOR_1: {
      ID:                    'Color 1',
      DEFINITION:            'Text content must exceed Color Contrast Ratio (CCR) of 3.1 for large and/or bolded text and 4.5 for any other size or style of text.',
      SUMMARY:               'Text must exceed CCR threshold',
      TARGET_RESOURCES_DESC: 'All elements with text content',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Change the foreground and background colors of the text element to meet the CCR threshold.',
        FAIL_P:   'Change the foreground and background colors of the %N_F text elements to meet the CCR threshold.',
        MANUAL_CHECK_S:     'One element requires manual checking for CCR threshold to the use of a background image.',
        MANUAL_CHECK_P:     '%N_MC elements require manual checking for CCR thrshold to the use of background images.',
        HIDDEN_S: 'The element with text content that is hidden was not analyzed for color contrast accessibility.',
        HIDDEN_P: 'The %N_H elements with text content that are hidden were not analyzed for color contrast accessibility.',
        NOT_APPLICABLE:  'No visible text content on this page.'
      },
      ELEMENT_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'CCR of %1 exceeds 4.5.',
        ELEMENT_PASS_2:   'CCR of %1 exceeds 3.1 for large or bolded text.',
        ELEMENT_FAIL_1:   'CCR of %1, adjust foreground and background colors to exceed 4.5.',
        ELEMENT_FAIL_2:   'CCR of %1 for large or bolded text, adjust foreground and background colors to exceed 3.1.',
        ELEMENT_MC_1:     'CCR of %1 is greater than 4.5, but background image may reduce color contrast.',
        ELEMENT_MC_2:     'CCR of %1 is less than or equal to 4.5, but background image may improve color contrast.',
        ELEMENT_MC_3:     'CCR of %1 is greater than 3.1 for large or bolded text, but background image may reduce color contrast.',
        ELEMENT_MC_4:     'CCR of %1 is less than or equal to 3.1 for large and bolded text, but background image may improve color contrast.',
        ELEMENT_HIDDEN_1: 'CCR was not tested since the text is hidden from assistive technologies.'
      },
      PURPOSES:       [ 'The higher the color contrast of text the more easy it is to read, especially for people with visual impairments.'
                      ],
      TECHNIQUES:     [ 'Change the foreground color to a more complementary color to the background color.',
                        'Change the background color to a more complementary color to the foreground color.',
                        'Remove background images or verify they do not compromise color contrast requirements.'
                      ],
      MANUAL_CHECKS:  [ 'Use graphic editing tools to analyze the color(s) of the background image and then recacluate the CCR with the range of colors in the background image.',
                        'Verify the range of colors that could be part of the background of text is have a CCR > 4.5.'
      ],
      INFORMATIONAL_LINKS: [{ type:  REFERENCES.SPECIFICATION,
                         title: 'WCAG 2.0 Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
                         url:   'https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast'
                       },
                       { type:  REFERENCES.WCAG_TECHNIQUE,
                         title: 'How to meet Success Criterion 1.4.3 Contrast (Minimum): The visual presentation of text and images of text has a contrast ratio of at least 4.5:1',
                         url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast'
                       },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G17: Ensuring that a contrast ratio of at least 7:1 exists between text (and images of text) and background behind the text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G17'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text (and images of text) and background behind the text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G18'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G148: Not specifying background color, not specifying text color, and not using technology features that change those default',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G148'
                      },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G174: Providing a control with a sufficient contrast ratio that allows users to switch to a presentation that uses sufficient contrast',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G174'
                      }
                      ]
  },
  COLOR_2: {
      ID:                    'Color 2',
      DEFINITION:            'Color must not be the only way to convey information on the page.',
      SUMMARY:               'Use of color',
      TARGET_RESOURCES_DESC: 'Any content on the page that refers to or is a specific color',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element on the page.'
      },
      PAGE_RESULT_MESSAGES: {
        PAGE_MC_1: 'Verify color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element on the page.'
      },
      PURPOSES:       [ 'For people with color blindness and other forms of visual impairments will not be able to see colors or color differences.',
                        'This requirement also includes references to color of content on page to identify some type of information, there should be redundant labeling of the content, for example using text labels to also identify and refer to the information.'
                      ],
      TECHNIQUES:     [ 'Provide redundant text labels for content presented in color, it the color is presenting meaningful information.',
                        'Use background patterns to also identify information.'
                      ],
      MANUAL_CHECKS:  [ 'Verify the page does not use color alone to identify or refer to information on the page.'
                      ],
      INFORMATIONAL_LINKS: [{ type:  REFERENCES.SPECIFICATION,
                         title: 'WCAG 2.0 Success Criterion 1.4.1 Use of Color',
                         url:   'https://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color'
                       },
                       { type:  REFERENCES.WCAG_TECHNIQUE,
                         title: 'How to meet Success Criterion 1.4.1 Use of Color',
                         url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color'
                       },
                      { type:  REFERENCES.WCAG_TECHNIQUE,
                        title: 'G14: Ensuring that information conveyed by color differences is also available in text',
                        url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G14'
                      }
                      ]
  }
}

