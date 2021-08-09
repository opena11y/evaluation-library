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
      BYPASS_1: {
            ID:                    'Bypass 1',
            DEFINITION:            'Provide a keyboard-supported means of bypassing blocks of content, such as navigation menus and page headers, to get to the main content of the page.',
            SUMMARY:               'Skip to main content link',
            TARGET_RESOURCES_DESC: '@a@ and @a[button]@',
            RULE_RESULT_MESSAGES: {
              FAIL_S :         'Provide a valid target for the "skip to main content" link.',
              FAIL_P :         'Provide a valid target for the "skip to main content" link.',
              MANUAL_CHECK_S:  'Verify that the first link on the page is a "skip to main content" link and that the target of the skip link is a focusable element.',
              MANUAL_CHECK_P:  'Verify that the first link on the page is a "skip to main content" link and that the target of the skip link is a focusable element.',
              HIDDEN_S:        'One link that is hidden was not evaluated.',
              HIDDEN_P:        '%N_H links that are hidden were not evaluated.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '"SkipTo" menu button provides navigation to main and navigation landmarks and headings on the page.',
              ELEMENT_PASS_2:   'Link references a target on the page; verify that the target is focusable and at the start of the main content of the page.',
              ELEMENT_PASS_3:   'Target of link; verify that it is at the start of the main content of the page.',
              ELEMENT_FAIL_1:   'Link does not reference a valid target on the page.',
              ELEMENT_MC_1:     'Verify the target of "skip to main content" link is a focusable element.',
              ELEMENT_HIDDEN_1: 'Link is hidden from assistive technologies and was not evaluated.',
              PAGE_PASS_1:      'Page includes a link or "SkipTo" script that provides a means of skipping to the main content of the page.',
              PAGE_FAIL_1:      'Link does not reference a valid target on the page.',
              PAGE_MC_1:        'Verify that that the target of the "skip to main content" link is focusable.',
              PAGE_MC_2:        'Verify that the page provides a link or other means of skipping to the main content of the page.'
            },
            PURPOSE: [
              'Most pages of websites typically have navigation menus, page headers and other repeated content before the main content of the page.',
              'For keyboard-only and screen reader users, a link or other means of skipping these types of content blocks makes it easy to go directly to the main content of the page, without first having to tab through the repeated content.'
            ],
            TECHNIQUES: [
              'Make the first link on the page an internal link that references a valid target element at the beginning of the main content of the page.',
              'The @id@ attribute is preferred method to identify the target element for the "Skip to main content" link.',
              'To make any target element focusable, add @tabindex="-1"@ to the element. If the target is an @a@ element, adding @tabindex="-1"@ will remove it from the tab order.',
              'If you use an @h1[id="main"]@ element as the target of the "Skip to main content" link, most screen readers will read the heading level and content when the user activates the skip to link.',
              'Use the "SkipTo" script, main and navigation landmarks and headings (H1-H2) to enable keyboard navigation from the "SkipTo" menu to all major sections of a page, including main content.',
              'The @name@ attribute can be used if the target is an @a@ element and is focusable (e.g. tabindex or non-empty @href@ value), but this technique is discouraged, since the @name@ attribute is being deprecated in HTML5.'
            ],
            MANUAL_CHECKS: [
              'Using only the keyboard, use the link or "SkipTo" menu to move focus to the main content of the page.',
              'After moving focus to the main content, the next tab should move you to the first link, form control or other interactive element after the main content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: 12.2 The A element',
                url:   'http://www.w3.org/TR/html4/struct/links.html#edef-A'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'WAI-ARIA 1.0 Authoring Practices: Using Tabindex to Manage Focus among Widgets',
                url:   'http://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#focus_tabindex'
              },
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
                title: 'SkipTo plugin by PayPal Accessibility Team',
                url:   'http://paypal.github.io/skipto/'
              }
            ]
      }
    }
});
