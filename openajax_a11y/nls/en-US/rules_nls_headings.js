/*
 * Copyright 2011-2018 OpenAjax Alliance
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
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
    HEADING_1: {
      ID:                    'Heading 1',
      DEFINITION:            'The page %s contain at least one @h1@ element identifying and describing the main content of the page.',
      SUMMARY:               'Page %s have @h1@ element',
      TARGET_RESOURCES_DESC: '@h1@ and @body@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a descriptive @h1@ element at the beginning of the main content of the page.',
        FAIL_P:   'Add a descriptive @h1@ element at the beginning of the main content of the page.',
        HIDDEN_S: 'One @h1@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @h1@ elements that are hidden were not evaluated.'
      },
      NODE_RESULT_MESSAGES: {
        PAGE_PASS_1:     'Page has @h1@ element.',
        PAGE_FAIL_1:     'Add an @h1@ element at the beginning of the main content of the page.',
        ELEMENT_PASS_1:  '@h1@ element contributes to passing this rule.',
        ELEMENT_FAIL_1:  'Add an accessible name to the @h1@ element that describes the main content of the page.',
        ELEMENT_HIDDEN_1:'The @h1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'An @h1@ heading provides an important navigation point for users of assistive technologies, allowing them to easily find the main content of the page.',
        'An @h1@ heading is often also used in the banner of a web page to identify and describe the website.',
        'Home pages of websites often have a variety of "main" sections (e.g. navigation links, news, calendars, ...) that could be considered having somewhat equal potential interest by a visitor, these sections could each be identified using @h1@ headings.'
      ],
      TECHNIQUES: [
        'Include an @h1@ element at the beginning of the main content.',
        'The accessible name of the @h1@ element should describe the main content of the page.',
        'The accessible name of the @h1@ element in the banner of the page, should identify and describe the website.',
        'The @h1@ element should be visible graphically and to assistive technologies. It should not be hidden using CSS techniques.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @h1@ element',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G130: Providing descriptive headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G130'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G141: Organizing a page using headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G141'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Unique Title',
          url:   'https://html.cita.illinois.edu/nav/title/'
        }
      ]
    },
    HEADING_2: {
      ID:                    'Heading 2',
      DEFINITION:            'If the page contains @h1@ element and either a @main@ or @banner@ landmark, the @h1@ element %s be a child of either the main or @banner@ landmark.',
      SUMMARY:               '@h1@ %s be in @main@ or @banner@ landmark',
      TARGET_RESOURCES_DESC: '@h1@ elements and elements with ARIA attribute @role="main"@ or @role="banner"@ ',
      RULE_RESULT_MESSAGES: {
        FAIL_S: 'Move the @h1@ element inside (and preferably at the beginning) of the @main@ element, or change the @h1@ element to another heading level.',
        FAIL_P: 'Move the %N_F @h1@ elements inside (and preferably at the beginning) of @main@ or @banner@ landmark elements, or change the @h1@ elements to other heading levels.',
        HIDDEN_S: 'One @h1@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @h1@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No @h1@ elements and either a @main@ or @banner@ landmark.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @h1@ is a child element of a @main@ landmark.',
        ELEMENT_PASS_2:   'The @h1@ is a child element of a @banner@ landmark.',
        ELEMENT_FAIL_1:   'Position the @h1@ element as one of the first child elements of a @main@ landmark to mark the beginning of main content to identify the main content of this page, or within the @banner@ landmark to provide a label for the website.',
        ELEMENT_HIDDEN_1: 'The @h1@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'An @h1@ heading should primarily be used to identify the content on the specific page within the website and be placed at the beginning of the main content to provide an important navigation point for users of assistive technologies, allowing them to easily find the main content of the page.',
        'An @h1@ heading can also be used (but not required) to provide a label for the website and when it is used for this purpose it should be placed in the @banner@ element.',
        'Including both a @main@ landmark and an @h1@ element provides a redundant way for users of assistive technologies to find the main content of a web page.'
      ],
      TECHNIQUES: [
        'This rule supports the coding practice of reserving the @h1@ element for titling the main content area of a web page.',
        'Include an @h1@ element at the beginning of each @main@ landmark.',
        'The @h1@ element should describe the main content or purpose of the page.',
        'If there is more than one @main@ landmark, use the @aria-labelledby@ attribute on each to reference an @h1@ element that provides its accessible name.',
        'An @h1@ element being used to label the the website must be placed inside the @banner@ element.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: The @h1@ element',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: @main@ role',
          url:   'https://www.w3.org/TR/wai-aria/#main'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: @banner@ role',
          url:   'https://www.w3.org/TR/wai-aria/#banner'
        }
      ]
    },
    HEADING_3: {
      ID:                    'Heading 3',
      DEFINITION:            'The accessible names of sibling heading elements of the same level %s be unique.',
      SUMMARY:               'Sibling headings %s be unique',
      TARGET_RESOURCES_DESC: 'Heading elements',
      RULE_RESULT_MESSAGES: {
        FAIL_P: 'Update the accessible names of the %N_F sibling heading elements of the same level to be unique.',
        HIDDEN_S: 'One heading element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H heading elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No sibling heading elements of the same level were found on the page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:    'The %1 heading content is unique among its sibling headings.',
        ELEMENT_FAIL_1:  'Change the accessible name of %1 heading to make it unique among its sibling headings.',
        ELEMENT_HIDDEN_1:  'The %1 element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'If section headings that share the same parent heading are NOT unique, users of assistive technologies will not be able to discern the differences among sibling sections of the web page.'
      ],
      TECHNIQUES: [
        'Make sure the accessible names of sibling headings that share the same parent heading help users understand the unique content of each section they describe.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G130: Providing descriptive headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G130'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G141: Organizing a page using headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G141'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Unique Title',
          url:   'https://html.cita.illinois.edu/nav/title/'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Sub Headings',
          url:   'https://html.cita.illinois.edu/nav/heading/'
        }
      ]
    },
    HEADING_5: {
      ID:                    'Heading 5',
      DEFINITION:            'Heading elements %s be properly nested on the page.',
      SUMMARY:               'Headings %s be properly nested',
      TARGET_RESOURCES_DESC: 'Heading elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:  'Review the entire heading structure and update the heading levels so that the heading element is properly nested in relation to the %N_T headings on the page.',
        FAIL_P:  'Review the entire heading structure and update the heading levels so that the %N_F heading elements are properly nested in relation to the %N_T headings on the page.',
        HIDDEN_S: 'One heading element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H heading elements that are hidden were not evaluated.',
        NOT_APPLICABLE: 'No heading elements or only one heading element on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The %1 element is properly nested.',
        ELEMENT_PASS_2:   'All heading elements are properly nested',
        ELEMENT_FAIL_1:   'Adjust the level of the %1 element or other heading elements so that the headings are properly nested on the page.',
        ELEMENT_FAIL_2:   'Adjust the heading levels of the parent %1 element or this %2 element so that the headings are properly nested on the page.',
        ELEMENT_HIDDEN_1: 'The %1 element was not evaluated because it is hidden from assistive technologies.',
        ELEMENT_HIDDEN_2: 'The %1 element has not text content either add content, or remove it from the page if it is not needed.'
      },
      PURPOSE: [
        'Heading elements that are properly nested help users of assistive technologies understand the structure of the information on the web page.'
      ],
      TECHNIQUES: [
        'Include headings elements at the proper level for each section of a web page.',
        'Use headings as labels for ARIA landmarks to provide a redundant way for users of assistive technologies to navigate the page (i.e. header or landmark navigation).',
        'Check headings against other headings in the document to make sure they uniquely describe the content of each section of the web page.',
        'If headings are too similar to each other, users of assistive technologies will not be able to use them to understand the differences between sections of the web page.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G130: Providing descriptive headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G130'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'G141: Organizing a page using headings',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/G141'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Unique Title',
          url:   'https://html.cita.illinois.edu/nav/title/'
        },
        { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
          title: 'iCITA Best Practices: Sub Headings',
          url:   'https://html.cita.illinois.edu/nav/heading/'
        }
      ]
    },
    HEADING_6: {
      ID:                    'Heading 6',
      DEFINITION:            'Heading elements %s have visible text content.',
      SUMMARY:               'Headings %s have text content',
      TARGET_RESOURCES_DESC: 'Heading elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'For the heading element with only image content, replace the image with text content styled using CSS.',
        FAIL_P:   'For the %N_F heading elements with only image content, replace the images with text content styled using CSS.',
        HIDDEN_S: 'One heading element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H heading elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No headings with only image content.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The %1 element contains visible text content.',
        ELEMENT_FAIL_1: 'Add visible text content to the %1 element.',
        ELEMENT_FAIL_2: 'The %1 element does not have an accessible name.  Either remove the heading from the page or add visible text content to describe the section.',
        ELEMENT_HIDDEN_1: 'The %1 element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Heading elements that consist only of image content are not easily restyled for readabilty by people with low vision.'
      ],
      TECHNIQUES: [
        'Use CSS instead of images to style heading text content.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: Headings: The H1, H2, H3, H4, H5, H6 elements',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H1'
        },
        { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
          title: 'C22: Using CSS to control visual presentation of text',
          url:   'https://www.w3.org/TR/WCAG20-TECHS/C22'
        }
      ]
    },
    HEADING_7: {
      ID:                    'Heading 7',
      DEFINITION:            'If a @contentinfo@, @complementary@, @form@, @navigation@ or @search@ landmark contains a heading element, the first heading should be an @h2@ element.',
      SUMMARY:               'First landmark heading @h2@',
      TARGET_RESOURCES_DESC: '@contentinfo@, @complementary@, @form@, @navigation@ or @search@ landmarks elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Adjust the heading structure within the landmark so that the first heading is an @h2@ element.',
        FAIL_P:   'Adjust the heading structures of the %N_F landmarks with headings so that the first heading of each is an @h2@ element.',
        HIDDEN_S: 'One @h2@ element that is hidden was not evaluated.',
        HIDDEN_P: '%N_H @h2@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No headings in landmarks, or no landmarks on the page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   'The @h2@ element is the first heading in the landmark.',
        ELEMENT_FAIL_1: 'Adjust the headings in the %1 landmark to ensure that the first heading is an @h2@ element instead of an @%2@.',
        ELEMENT_HIDDEN_1: 'The @h2@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE: [
        'Headings provide a redundant way for people to navigate and orient themselves to content on a web page.',
        'The use of an @h2@ element as the first heading in a landmark (except the @main@ and @banner@ landmarks) supports a consistent use of headings for finding the main sections in a web page.'
      ],
      TECHNIQUES: [
        'Locate an @h2@ element at the beginning of the content in the landmark to describe the content in the landmark.',
        'The @h2@ element can be used as the accessible name for a landmark using the @aria-labelledby@ attribute on the landmark to point to an @id@ attribute on the @h2@ element.',
        'The @h2@ element can be hidden from the graphical rendering using offscreen CSS positioning (e.g. @position: absolute@ )techniques.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: landmark roles',
          url:   'https://www.w3.org/TR/wai-aria/#landmark'
        },
        { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
          title: 'HTML 4.01 Specification: Headings: The H2 elements',
          url:   'https://www.w3.org/TR/html4/struct/global.html#edef-H2'
        }
      ]
    },
        // ----------------------------------------------------------------
        // LANDMARK_8: Headings nested in landmarks
        // ----------------------------------------------------------------

        HEADING_8: {
            ID:         'Heading 8',
            DEFINITION: 'Headings %s be properly nested within a landmark.',
            SUMMARY:    'Headings nested in landmarks',
            TARGET_RESOURCES_DESC: 'Landmark elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Review the heading structure within the landmark and adjust the heading levels such that all are properly nested.',
              FAIL_P:   'Review the heading structure for each landmark with more than one heading, and adjust the heading levels in each landmark such that all headings are properly nested.',
              HIDDEN_S: 'If the hidden heading element is supposed to be visible to assistive technologies, style it to be positioned off-screen.',
              HIDDEN_P: 'If any of the %N_H hidden heading elements are supposed to be visible to assistive technologies, style them to be positioned off-screen.',
              NOT_APPLICABLE: 'No nested headings found in landmarks.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ heading is properly nested in the @%2@ landmark.',
              ELEMENT_FAIL_1:   'Adjust the level of the @%1@ heading or other heading elements such that the headings are properly nested in the @%2@ landmark.',
              ELEMENT_FAIL_2:   'Add text content to @%1@ element that describes the section it labels or remove it from the @%2@ landmark.',
              ELEMENT_FAIL_3:   'Adjust the level of either the parent @%1@ heading or this @%2@ heading such that they are properly nested in the @%3@ landmark.',
              ELEMENT_HIDDEN_1: 'The @%1@ heading in the @%2@ landmark was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2: 'The @%2@ landmark was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              // TODO: what is the purpose?
              'Headings provide a way to indicate the structure and to label the sections of content within a landmark.',
              'Headings and there associated heading levels provide a way for people using assistive technology to understand and navigate the structure of the content within a landmark.'
            ],
            TECHNIQUES: [
              // TODO: what are the techniques?
              'Use an @h1@ element for the first heading in @main@ landmarks.',
              'Use an @h2@ element for the first heading in other top level landmarks.',
              'Use heading elements to identify the content of each section within a landmark.',
              'Properly nest of heading elements within a landmark (e.g. @h2@ follows @h1@ headings, @h3@ follows @h2@ headings, ...).'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: contentinfo role',
                url:   'https://www.w3.org/TR/wai-aria/#contentinfo'
              }
            ]
        }
    }
});
