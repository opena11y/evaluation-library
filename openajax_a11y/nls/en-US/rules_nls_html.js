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
         HTML_1: {
            ID:                    'HTML 1',
            DEFINITION:            '@strong@, @em@ or in some cases @h1-h6@ heading elements %s be used instead of @b@ and @i@ elements.',
            SUMMARY:               'Replace @b@ and @i@ elements',
            TARGET_RESOURCES_DESC: '@b@ and @i@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change the @b@ or @i@ element to a @strong@ or @em@ element or, if appropriate, an @h1-h6@ element.',
              FAIL_P:   'Change the @b@ or @i@ elements to @strong@ or @em@ elements or, if appropriate, @h1-h6@ elements.',
              HIDDEN_S: 'If the hidden @b@ or @i@ element becomes visible, it should be changed to a @strong@, @em@ or possibly an @h1-h6@ element.',
              HIDDEN_P: 'If any of the %N_H hidden @b@ or @i@ elements become visible, they should be changed to @strong@, @em@ or possibly @h1-h6@ elements.',
              NOT_APPLICABLE:  'No @b@ or @i@ elements found on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1: 'Change the @b@ element to a @strong@ element or to a heading element (i.e. @h1-h6@), depending on its purpose in the page.',
              ELEMENT_HIDDEN_1: '@b@ element is hidden, but should be changed to a @strong@ element or to a heading element (i.e. @h1-h6@), depending on its purpose in the page, in case it becomes visible.',
              ELEMENT_FAIL_2: 'Change the @i@ element to an @em@ element or to a heading element (i.e. @h1-h6@), depending on its purpose in the page.',
              ELEMENT_HIDDEN_2: '@i@ element is hidden, but should be changed to an @em@ element or to a heading element (i.e. @h1-h6@), depending on its purpose in the page, in case it becomes visible.'
            },
            PURPOSE: [
              'In inline formatting use, the @b@ and @i@ elements do not convey the semantics of the text content.',
              'The @b@ and @i@ elements are often misused for emphasizing words in a sentence, or to change the styling of content being used as a section header in the page.'
            ],
            TECHNIQUES: [
              'If a @b@ element is being used in a sentence for emphasizing a word or phrase, replace it with the @strong@ element.',
              'If an @i@ element is being used in a sentence for emphasizing a word or phrase, replace it with the @em@ element.',
              'If a @b@ or @i@ element is being used to style a section heading, replace it with an @h1-h6@ heading element, depending on the level of heading needed in accordance with the structure of the page.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: Headings: The em and strong elements',
                url:   'http://www.w3.org/TR/html4/struct/text.html#edef-EM'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: Headings: The H1-H6 elements',
                url:   'http://www.w3.org/TR/html4/struct/global.html#edef-H2'
              }
            ]
        },
        HTML_2: {
            ID:                    'HTML 2',
            DEFINITION:            '@marquee@ elements %s be removed to improve readability of content.',
            SUMMARY:               'Replace @marquee@ elements',
            TARGET_RESOURCES_DESC: '@marquee@ element',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Replace the @marquee@ element with a standard HTML element. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
              FAIL_P:   'Replace the %N_F @marquee@ elements with standard HTML elements. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
              HIDDEN_S: 'If the hidden @marquee@ element becomes visible, it must be changed to a standard HTML element.  Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
              HIDDEN_P: 'If any of the %N_H hidden @marquee@ elements become visible, they must be changed to standard HTML elements. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
              NOT_APPLICABLE:  'No @marquee@ elements found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1: 'Change the @marquee@ element to a standard HTML element. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.',
              ELEMENT_HIDDEN_1: '@marquee@ element is hidden, but should be changed to a standard HTML element, in case it becomes visible. Use CSS techniques to style the content, and JavaScript to provide controls that stop and start the scrolling.'
            },
            PURPOSE: [
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
            ]
        },
        HTML_3: {
            ID:         'HTML 3',
            DEFINITION: 'Some HTML elements are restricted in the role allowed based on the semantics of the element (e.g. @li@ elements can only have list related ARIA roles).',
            SUMMARY:    'Role is not allowed',
            TARGET_RESOURCES_DESC: '',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Remove or update the role to an allowed role on the element',
              FAIL_P:   'Remove or update the roles to an allowed role on the %N_F elements',
              HIDDEN_S: 'If the hidden element becomes visible, it\'s role must be removed or updated.',
              HIDDEN_P: 'If any of the %N_H hidden elements become visible, it\'s role must be removed or updated to an allowed role.',
              NOT_APPLICABLE:  'No elements with role restrictions found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1: 'The @%1@ element with the @%2@ and @%3@ attributes does not allow the implict role of the element to be changed.  Remove the @%4@ role from the element.',
              ELEMENT_FAIL_2: 'The @%1@ element with the @%2@ attribute does not allow the implict role of the element to be changed.  Remove the @%3@ role from the element.',
              ELEMENT_FAIL_3: 'The @%1@ element with an accessible name (e.g. using @aria-label@ or @aria-labelledby@) does not allow the implict role of the element to be changed.  Remove the @%2@ role from the element.',
              ELEMENT_FAIL_4: 'The @%1@ element does not allowed the implict role of the element to be changed.  Remove the @%2@ role from the element.',
              ELEMENT_FAIL_5: 'The @%1@ element with the @%2@ and @%3@ attributes does not allow the @%4@ role.  Either remove the role or change it to one of the following allowed values: %5.',
              ELEMENT_FAIL_6: 'The @%1@ element with the @%2@ attribute does not allow the @%3@ role.  Either remove the role or change it to one of the following allowed values: @%4@.',
              ELEMENT_FAIL_7: 'The @%1@ element with an accessible name (e.g. using @aria-label@ or @aria-labelledby@) does not allow @%2@ role. Either remove the role or change it to one of the following allowed values: @%3@.',
              ELEMENT_FAIL_8: 'The @%1@ element does not allow the @%2@ role.  Either remove the role or change it to one of the following allowed values: @%3@.',
              ELEMENT_HIDDEN_1: '@%1@ element is hidden, the @%2@ role must be removed before it becomes visible.',
              ELEMENT_HIDDEN_2: '@%1@ element is hidden, the @%2@ role must be removed or changed to an allowed role before it becomes visible.'
            },
            PURPOSE: [
              'ARIA role attributes change the exposed meaning (semantics) of HTML elements to assisitve technologies.',
              'When a role conflicts with the implicit semantics of an HTML element the accessibility API provides confusing and/or conflicting information to screen readers.',
              'Role restrictions make sure roles enhance rather than conflict with the implicit semantcs of an HTML element.'
            ],
            TECHNIQUES: [
              'Some HTML elements do not allow any role to override of the implicit role, in this case the role must be removed.',
              'Some HTML elements only allow certain roles to override of the implicit role, in this case only those roles can be used to override the implicit role.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'W3C ARIA in HTML',
                url:   'https://www.w3.org/TR/html-aria/'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'W3C WAI-ARIA Authoring Practices 1.2 (Editor\'s Draft)',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'W3C HTML Accessibility API Mappings 1.0',
                url:   'https://www.w3.org/TR/html-aam-1.0/'
              },
            ]
        }
   }
});
