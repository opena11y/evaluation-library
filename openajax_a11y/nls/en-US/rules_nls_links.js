/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import {OpenAjax} from '../../openajax_a11y_constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenAjax Alliance Rules National Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.RuleManager.addRulesNLSFromJSON('en-us', {

  //
  //  OAA Rules title and message string National Language Support (NLS)
  //
  rules: {

    LINK_1: {
      ID:                    'Link 1',
      DEFINITION:            'The accessible name of a link %s accurately describe the target or purpose of the link.',
      SUMMARY:               'Link text %s describe the link target',
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
      NODE_RESULT_MESSAGES: {
        ELEMENT_MC_1:     '@%1@ element has accessible name "%2". Verify that the name accurately describes the target of the link, or if not, change the accessible name to be more descriptive.',
        ELEMENT_MC_2:     '@%1@ element has accessible name "%2" with text content "%3". Verify that the name and text content, along with its surrounding context, each accurately describes the target of the link, or if not, change the accessible name, text content and/or context so that they are more descriptive.',
        ELEMENT_FAIL_1:   'The @%1@ element does NOT have an accessible name. Add text content to the link or use an ARIA labeling technique so that the accessible name describes the target of the link.',
        ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
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
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 12.2 The A element',
          url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-label@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-label'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-labelledby@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-labelledby'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-describedby@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-describedby'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @title@ attribute',
          url:   'http://www.w3.org/TR/html4/struct/global.html#adef-title'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H30: Providing link text that describes the purpose of a link for anchor elements',
          url:   'http://www.w3.org/TR/WCAG20-TECHS/H30'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'OAA Example 44 - Using aria-describedby to satisfy WCAG 2.4.4 Link Purpose in Context',
          url:   'http://oaa-accessibility.org/example/44/'
        }
      ]
    },

    LINK_2: {
      ID:                    'Link 2',
      DEFINITION:            'Links with different @href@s %s have unique accessible names or descriptions.',
      SUMMARY:               'Link text %s be unique',
      TARGET_RESOURCES_DESC: '@a@ and @area@ elements and elements with @role="link"@',
      RULE_RESULT_MESSAGES: {
        FAIL_P:   'Change the accessible names or add @aria-describedby@ attributes to the %N_F @a@, @area@ or @[role=link]@ elements to provide additional information that makes each accessible name or description unique.',
        NOT_APPLICABLE:  'No @a@, @area@ or @[role=link]@ elements on the page share the same accessible name.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:     '@%1@ element has the same @href@ value as the %2 links with which it shares its accessible name.',
        ELEMENT_PASS_2:     '@%1@ element has a different @href@ value than the %2 links with which it shares its accessible name, but has a unique description using the @aria-describedby@ attribute.',
        ELEMENT_FAIL_1:   'Change the accessible name of the @%1@ element or provide additional information using the @aria-describedby@ attribute to make the link text unique.'
      },
      PURPOSE: [
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
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: 12.2 The A element',
          url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-label@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-label'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-labelledby@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-labelledby'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: The @aria-describedby@ attribute',
          url:   'http://www.w3.org/TR/wai-aria/#aria-describedby'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @title@ attribute',
          url:   'http://www.w3.org/TR/html4/struct/global.html#adef-title'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'H30: Providing link text that describes the purpose of a link for anchor elements',
          url:   'http://www.w3.org/TR/WCAG20-TECHS/H30'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls',
          url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA7: Using aria-labelledby for link purpose',
          url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA7'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'ARIA8: Using aria-label for link purpose',
          url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA8'
        },
        { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
          title: 'OAA Example 44 - Using aria-describedby to satisfy WCAG 2.4.4 Link Purpose in Context',
          url:   'http://oaa-accessibility.org/example/44/'
        }
      ]
    }
  }
});
