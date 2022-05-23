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
        title: 'HTML 4.01 Specification: 12.2 The A element',
        url:   'https://www.w3.org/TR/html4/struct/links.html#edef-A'
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
        title: 'HTML 4.01 Specification: The @title@ attribute',
        url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
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
        title: 'HTML 4.01 Specification: 12.2 The A element',
        url:   'https://www.w3.org/TR/html4/struct/links.html#edef-A'
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
        title: 'HTML 4.01 Specification: The @title@ attribute',
        url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
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
  }
};
