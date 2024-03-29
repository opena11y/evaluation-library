 /* linkRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const linkRules = {

  LINK_1: {
    ID:                    'Link 1',
    DEFINITION:            'The accessible name of a link must accurately describe the target or purpose of the link.',
    SUMMARY:               'Link text must describe the link target',
    TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@ attribute',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S: 'Verify the accessible name of the @a@, @area@ or @[role=link]@ element describes the target of the link.',
      MANUAL_CHECK_P: 'Verify the accessible name of each of the %N_MC @a@, @area@ or @[role=link]@ elements describes the target of the link.',
      FAIL_S:         'Add text content to the empty link that describes the target of the link.',
      FAIL_P:         'Add text content to the %N_F empty links that describes the target of each link.',
      HIDDEN_S:       'One hidden link was not evaluated.',
      HIDDEN_P:       '%N_H hidden links were not evaluated.',
      NOT_APPLICABLE: 'No @a@, @area@ or @[role=link]@ elements on the page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_MC_1:     '@%1@ element has accessible name "%2". Verify that the name accurately describes the target of the link, or if not, change the accessible name to be more descriptive.',
      ELEMENT_MC_2:     '@%1@ element has accessible name "%2" with text content "%3". Verify that the name and text content, along with its surrounding context, each accurately describes the target of the link, or if not, change the accessible name, text content and/or context so that they are more descriptive.',
      ELEMENT_FAIL_1:   'The @%1@ element does NOT have an accessible name. Add text content to the link or use an ARIA labeling technique so that the accessible name describes the target of the link.',
      ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
    },
    PURPOSES: [
      'When the accessible name of a link does not describe its target or purpose, users will not have the information they need to determine the usefulness of the target resources.',
      'Following links to target resources that do not provide the expected informational value is inefficient and potentially frustrating.'
    ],
    TECHNIQUES: [
      'The text content of a link, which is its default accessible name, should uniquely describe the target or purpose of the link.',
      'Use @aria-label@, @aria-labelledby@ or the @title@ attribute to provide a more descriptive accessible name when the text content of the link cannot be changed.',
      'Use @aria-describedby@ to provide additional information for links that share the same accessible name but have different contexts to allow users to differentiate among them.',
      'If the content of a link includes an @img@ element, the accessible name for the link will incorporate the text alternative specified for the image.'
    ],
    MANUAL_CHECKS: [
      'Read the accessible name for each link aloud and make sure that it describes the target or purpose of the link.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML Specification: The A element',
        url:   'https://html.spec.whatwg.org/#the-a-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-describedby@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML Specification: The @title@ attribute',
        url:   'https://html.spec.whatwg.org/#attr-title'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'H30: Providing link text that describes the purpose of a link for anchor elements',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H30'
      },
      { type:  REFERENCES.EXAMPLE,
        title: 'OAA Example 44 - Using aria-describedby to satisfy WCAG 2.4.4 Link Purpose in Context',
        url:   'https://oaa-accessibility.org/example/44/'
      }
    ]
  },

  LINK_2: {
    ID:                    'Link 2',
    DEFINITION:            'Links with different @href@s should have unique accessible names or descriptions.',
    SUMMARY:               'Link text should be unique',
    TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
    RULE_RESULT_MESSAGES: {
      FAIL_P:   'Change the accessible names or add @aria-describedby@ attributes to the %N_F @a@, @area@ or @[role=link]@ elements to provide additional information that makes each accessible name or description unique.',
      NOT_APPLICABLE:  'No @a@, @area@ or @[role=link]@ elements on the page share the same accessible name.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1: 'There is one other link that shares the same accessible name and @href@ value.',
      ELEMENT_PASS_2: 'There are %1 other links that share the same accessible name and @href@ value.',
      ELEMENT_PASS_3: 'The link shares has same accessible name anoother link with different @href@ value, but has a different accessible description.',
      ELEMENT_PASS_4: 'The link shares has same accessible name as %1 other links with different @href@ values, but has a different accessible description.',
      ELEMENT_FAIL_1: 'Update the accessible names of the %1 link elements that share the same accessible name, but have different @href@ values to clearly indicate the target of the links.'
    },
    PURPOSES: [
      'Screen reader programs provide commands that list all links on a page by their accessible names. When links are taken out of their page context and placed in the context of such a list, links with the same accessible name appear to refer to the same informational resource.',
      'When links that point to different URLs have the same accessible name or description, screen reader users may be unable to determine which link among them references the information they are seeking.'
    ],
    TECHNIQUES: [
      'The link text (i.e. its accessible name and/or description) should uniquely describe the target of a link.',
      'Use the @aria-label@, @aria-labelledby@ or @title@ attribute to provide a more descriptive accessible name when the text content of the link cannot be changed.',
      'Use @aria-describedby@ to provide additional information for links that share the same accessible name but have different contexts to allow users to differentiate among them.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML Specification: The A element',
        url:   'https://html.spec.whatwg.org/#the-a-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-describedby@ attribute',
        url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HTML Specification: The @title@ attribute',
        url:   'https://html.spec.whatwg.org/#attr-title'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'H30: Providing link text that describes the purpose of a link for anchor elements',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H30'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA1'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'ARIA7: Using aria-labelledby for link purpose',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA7'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'ARIA8: Using aria-label for link purpose',
        url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8'
      }
    ]
  },

  LINK_3: {
      ID:                    'Link 3',
      DEFINITION:            'The target of a link should result in focus in the content the window if the target results in more than one window opening.',
      SUMMARY:               'Target focus should be in content window',
      TARGET_RESOURCES_DESC: '@a@, @area@ and @role="link"@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Check the link to make sure that if the link opens more than one window that the focus is in the content window.',
        MANUAL_CHECK_P:     'Check the %N_MC links to make sure that if any of the links opens more than one window that the focus is in the content window.',
        HIDDEN_S: 'The link element that is hidden does not need to be tested for content focus.',
        HIDDEN_P: 'The %N_H link elements that are hidden do not need to be tested for content focus.',
        NOT_APPLICABLE:  'No link elements on the page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_MC_1: 'If the target of the @%1@ element opens multiple windows (i.e. typically advertisements or other promotional information) make sure keyboard focus is on the content window.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is hidden, so cannot open any new windows.'
      },
      PURPOSES: [
        'User\'s can become disoriented if the focus causes unpredictable actions, including new URLs and popup windows for advertisements or promotions.'
      ],
      TECHNIQUES: [
        'Do not link to URLs that open multiple windows and do not manage the focus to be in the content windoow the user was expecting by following the link.'
      ],
      MANUAL_CHECKS: [
        'After selecting a link and if it opens multiple windows, make sure the keyboard focus is in the content window.'
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G200: Opening new windows and tabs from a link only when necessary',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G200'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'G201: Giving users advanced warning when opening a new window',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G201'
        },
        { type:  REFERENCES.WCAG_TECHNIQUE,
          title: 'F52: Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded',
          url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F52'
        }
      ]
  },

    LINK_4: {
        ID:                    'Link 4',
        DEFINITION:            'The labels (e.g. accessible name) for links that include text or images of text, the name contains the text that is presented visually.',
        SUMMARY:               'Label in name for links',
        TARGET_RESOURCES_DESC: '@a@',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify the link with images, @aria-label@ and/or references to hidden content contain the same text associated with the visually rendered label associated with the control.',
          MANUAL_CHECK_P:  'Verify the %N_MC links with images, @aria-label@ and/or references to hidden content contain the same text associated with each of the visually rendered labels associated with each control.',
          HIDDEN_S:  'One link with images, @aria-label@ and/or references to hidden content was not tested because it is hidden from assistive technologies',
          HIDDEN_P:  '%N_H linkss with images, @aria-label@ and/or references were not tested because they are hidden from assistive technologies',
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1: 'Verify the @alt@ text of the image includes any text visually rendered by the image for use in the accessible name for the link.',
          ELEMENT_MC_2: 'Verify the @aria-label@ contains the same text associated the visually rendered label associated with the link.',
          ELEMENT_MC_3: 'Verify that the computed name of the referenced content includes the rendered text of the link.',
          ELEMENT_HIDDEN_1: 'The hidden control with an accessible name that includes image content was not tested.',
          ELEMENT_HIDDEN_2: 'The hidden control with an accessible name with @aria-label@ content was not tested.',
          ELEMENT_HIDDEN_3: 'The hidden control with an accessible name that includes references to hidden content was not tested.',
          PAGE_MC_1: 'The pages contains '
        },
        PURPOSES: [
          'Voice recognition users can directly activate controls on a page with fewer surprising changes of focus.',
          'Screen reader users will have a better experience because the labels that they hear match the visible text labels that they see on the screen.',
          'In general avoid using images and hidden text for defining accessible names whenever possible.'
        ],
        TECHNIQUES: [
          'If images of text that are part of an accessible name (e.g. label), the alt text must be the same as the text of the image.',
          'If @aria-label@ is used as part of an accessible name (e.g. label), the @aria-label@ contains the same text associated the visually rendered content associated with the control.',
          'If a hidden @aria-labelledby@ reference is used as part of the accessible name (e.g. label), verify the computed name of all the referenced contain has the same text associated the visually rendered label associated with the control.',
          'Accessible names may contain additional information useful to people using assistive technologies, but should start with the visible text associated with the control.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG Understanding Label in Name',
            url:   'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'W3C Accessible Name and Description Computation 1.1',
            url:   'https://www.w3.org/TR/accname-1.1/'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G208: Including the text of the visible label as part of the accessible name',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G208'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G211: Matching the accessible name to the visible label',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G211'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G162: Positioning labels to maximize predictability of relationships',
            url:   'https://www.w3.org/WAI/GL/2016/WD-WCAG20-TECHS-20160105/G162'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F96: Failure due to the accessible name not containing the visible label text',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F96'
          }
        ]
    }
};
