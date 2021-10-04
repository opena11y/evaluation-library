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
        FOCUS_1: {
            ID:                    'Focus 1',
            DEFINITION:            'The sequential focus order of links, form controls, embedded apps and widgets %s be meaningful.',
            SUMMARY:               'Focus order %s be meaningful',
            TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@ and @select@ elements and elements with widget roles with @tabindex@ values',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Check the "tab" focus order of the page to make sure the sequence of focusable elements is meaningful.',
              MANUAL_CHECK_P:     'Check the "tab" focus order of the page to make sure the sequence of focusable elements is meaningful.',
              HIDDEN_S: 'The link, form control, embedded app or widget element that is hidden does not need to be tested for focus order.',
              HIDDEN_P: 'The %N_H links, form controls, embedded apps and/or widgets that are hidden do not need to be tested for focus order.',
              NOT_APPLICABLE:  'No or only one focusable element on the page'
            },
            NODE_RESULT_MESSAGES: {
              PAGE_MC_1:        'Use the "tab" key to check the focus order of the %1 interactive elements on the page (i.e. links, form controls, ...).',
              PAGE_MC_2:        'Use the "tab" key to check the focus order of the %1 interactive elements on the page (i.e. links, form controls, ...); NOTE: %2 other interactive elements on the page have been removed from the tab order by setting the @tabindex@ value to less than 0.',
              ELEMENT_MC_1:     '%1 element with @role@="%2" is part of the sequential focus order manual check.',
              ELEMENT_MC_2:     '%1 element is part of the sequential focus order manual check.',
              ELEMENT_MC_3:     '%1 element with @role@="%2" has a @tabindex@="%2", so it is NOT part of the sequential focus oarder of the page.',
              ELEMENT_MC_4:     '%1 element has a @tabindex@="%2", so it is NOT part of the sequential focus order of the page.',
              ELEMENT_HIDDEN_1: '%1 element with @role@="%2" is hidden, so NOT a part of the sequential focus order of the page.',
              ELEMENT_HIDDEN_2: '%1 element is hidden, so NOT a part of the sequential focus order of the page.'
            },
            PURPOSE: [
              'The "tab" key is the primary key many browsers use to navigate the interactive elements on a web page.',
              'The sequential order of the elements receiving focus can help a user understand the features on a web page.',
              'The usability of frequently used or important interactive features of a web page can be improved by moving them to the beginning of the focus sequence.'
            ],
            TECHNIQUES: [
              'Use document order to place related interactive items in a meaningful sequence.',
              'The @tabindex@ atttribute value (i.e. values greater than 0) can be used to change the sequence of focusable elements in a web page or make non-interactive elements part of the "tab" order of the page.',
              'A @tabindex@ values of less than 0 remove redundent interactive elements from the sequential focus order.'
            ],
            MANUAL_CHECKS: [
              'Use the "tab" key to move focus through the links, form controls, embedded applications and widgets on the page.',
              'Does the sequence of elements receiving focus make sense (i.e. related items on the page are navigated sequentially as a group).'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G59: Placing the interactive elements in an order that follows sequences and relationships within the content',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G59'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H4: Creating a logical tab order through links, form controls, and objects',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H4'
              }
            ]
        },
        FOCUS_2: {
            ID:                    'Focus 2',
            DEFINITION:            'The element with keyboard focus %s have a visible focus style that is different from the non-focus state.',
            SUMMARY:               'Focus %s be visible',
            TARGET_RESOURCES_DESC: '@a@, @area@, @input@, @textarea@ and @select@ elements and elements with widget roles with @tabindex@ values',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Use the "tab" key to move focus between links, form controls, embedded apps and widgets and check the visibility of focus styling for each element as it receives focus.',
              MANUAL_CHECK_P:     'Use the "tab" key to move focus between links, form controls, embedded apps and widgets and check the visibility of focus styling for each element as it receives focus.',
              HIDDEN_S: 'The link, form control, embedded app or widget element that is hidden does not need to be tested for focus order.',
              HIDDEN_P: 'The %N_H links, form controls, embedded apps and/or widgets that are hidden do not need to be tested for focus order.',
              NOT_APPLICABLE:  'No focusable elements on the page'
            },
            NODE_RESULT_MESSAGES: {
              PAGE_MC_1:        'Use keyboard commands to check the keyboard focus styling of the %1 interactive elements on the page (i.e. links, form controls, ...).',
              PAGE_MC_2:        'Use keyboard commands to check the keyboard focus styling of the %1 interactive elements on the page (i.e. links, form controls, ...); NOTE: %2 interactive elements are hidden.',
              ELEMENT_MC_1:     '%1 element with @role@="%2" is part of the keyboard focus styling manual check.',
              ELEMENT_MC_2:     '%1 element is part of the keyboard focus styling manual check.',
              ELEMENT_HIDDEN_1: '%1 element with @role@="%2" is hidden, so is not visible for changing the focus styling.',
              ELEMENT_HIDDEN_2: '%1 element is hidden, so is not visible for changing the focus styling.'
            },
            PURPOSE: [
              'Many browsers don\'t provide a prominent or consistent visible keyboard focus styling for interactive elements, making it difficult for users to identify and track the element with keyboard focus.',
              'Author defined visible keyboard focus style makes it easier for users to know which interactive element has keyboard focus and provides more consistent user experience between browsers and operating systems.'
            ],
            TECHNIQUES: [
              'Use CSS psuedo element selector @:focus@ to change the styling of elements with keyboard focus.',
              'Use @focus@ and @blur@ event handlers on checkboxes and radio buttons to change the styling of not only the form control, but also its label text to make it easier to see.',
              'Styling changes should include creating a border around the interactive element and its label, typically using the CSS @border@ or @outline@ properties.',
              'For consistent look and feel to the website it is often useful for the focus and hover styles to be the same or similar.'
            ],
            MANUAL_CHECKS: [
              'Use the the keyboard (i.e. typically he "tab" key, but in the case of widgets other keys) to move focus through the links, form controls, embedded applications and widgets on the page.',
              'Check if the element with keyboard focus is clearly visible for all focusable elements on the page as you move focus between elements, and that it changes more than just color (i.e. border/outline around element with focus).',
              'Test keyboard focus styling using more than one browser and operating system, since there is a wide varability of between operating systems and browsers for styling keyboard focus.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'C15: Using CSS to change the presentation of a user interface component when it receives focus ',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/C15'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G195: Using an author-supplied, highly visible focus indicator',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G195'
              }
            ]
        },
        FOCUS_3: {
            ID:                    'Focus 3',
            DEFINITION:            'The target of a link %s result in focus the content the window if the target results in more than one window opening.',
            SUMMARY:               'Target focus %s be in content window',
            TARGET_RESOURCES_DESC: '@a@, @area@ and @role="link"@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Check the link to make sure that if the link opens more than one window that the focus is in the content window.',
              MANUAL_CHECK_P:     'Check the %N_MC links to make sure that if any of the links opens more than one window that the focus is in the content window.',
              HIDDEN_S: 'The link element that is hidden does not need to be tested for content focus.',
              HIDDEN_P: 'The %N_H link elements that are hidden do not need to be tested for content focus.',
              NOT_APPLICABLE:  'No link elements on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'If the target of the link opens multiple windows (i.e. typically advertisements or other promotional information) make sure keyboard focus is on the content window.',
              ELEMENT_HIDDEN_1:       '%1 element is hidden, so cannot open any new windows.'
            },
            PURPOSE: [
              'User\'s can become disoriented if the focus causes unpredicatable actions, including new URLs and popup windows for advertisements or promotions.'
            ],
            TECHNIQUES: [
              'Do not link to URLs that open multiple windows and do not manage the focus to be in the content windoow the user was expecting by following the link.'
            ],
            MANUAL_CHECKS: [
              'After selecting a link and if it opens multiple windows, make sure the keyboard focus is in the content window.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G200: Opening new windows and tabs from a link only when necessary',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G200'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G201: Giving users advanced warning when opening a new window',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G201'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F52: Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F52'
              }
            ]
        },
        FOCUS_4: {
            ID:                    'Focus 4',
            DEFINITION:            '@select@ elements with @onchange@ event handler %s not automatically change the user\'s context when keyboard focus moves between options.',
            SUMMARY:               '@select@ %s not change context',
            TARGET_RESOURCES_DESC: '@a@, @area@ and @role="link"@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Check the @select@ element to make sure that when keyboard focus moves between options does not cause a change in context (e.g. moving to a new URL or focus being moved from the @select@ element).',
              MANUAL_CHECK_P:     'Check the %N_MC @select@ elements to make sure that when keyboard focus moves between options in each control does not cause a change in context (e.g. moving to a new URL or focus being moved from the @select@ element).',
              HIDDEN_S: 'The @select@ element that is hidden does not need to be tested for automatically changing user context.',
              HIDDEN_P: 'The %N_H @select@ elements that are hidden do not need to be tested for automatically changing user context.',
              NOT_APPLICABLE:  'No @select@ elements on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Check to make sure moving keyboard focus between options in the @select@ box does not move focus from the list of options.',
              ELEMENT_HIDDEN_1:       '@select@ element is hidden.'
            },
            PURPOSE: [
              'User\'s can become disoriented if the focus changes cause unpredicatable actions.',
              'When the user is using the kyboard to explore @select@ box options, the focus must stay on the options, until the user selects one of the options.'
            ],
            TECHNIQUES: [
              'Do not use @onchange@ event handlers on @select@ elements.',
              'Use selections should be made using the enter key.'
            ],
            MANUAL_CHECKS: [
              'Move focus to the @selection@ box and use the keyboard to move the focus between options, check to make sure the focus changes are not causing the context to change (i.e. focus movig to a new window or focus moving from the current option in the select box).'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G200: Opening new windows and tabs from a link only when necessary',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G200'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G201: Giving users advanced warning when opening a new window',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G201'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F52: Failure of Success Criterion 3.2.1 and 3.2.5 due to opening a new window as soon as a new page is loaded',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F52'
              }
            ]
        },
        FOCUS_5: {
            ID:         'Focus 5',
            DEFINITION: 'Forms %s use @input[type="submit"]@ or other form control buttons for submitting forms.',
            SUMMARY:    'Forms submitted using buttons',
            TARGET_RESOURCES_DESC: '@input[type="submit"]@, @input[type="button"]@, @input[type="image"]@, @button@, @[role="button"]@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that the form has uses a button to submit the form.',
              MANUAL_CHECK_P: 'Verify that each of the %N_MC forms has a button used to submit the form.',
              FAIL_S:    'No button elements found for submitting the form.',
              FAIL_P:    'No button elements found for submitting %N_MC forms.',
              HIDDEN_S:  'The form that is hidden was not evaluated.',
              HIDDEN_P:  'The %N_H forms that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No form controls on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: 'The form has an @input[type="submit"]@.',
              ELEMENT_PASS_2: '@input[type="submit"]@ is used for form submission.',
              ELEMENT_FAIL_1: 'The form has no button elements.',
              ELEMENT_MC_1: 'Verify that the button element contained in the form can be used for form submission.',
              ELEMENT_MC_2: 'Verify that at least one of the %1 button elements contained in the form can be used for form submission.',
              ELEMENT_MC_3: 'Verify if the @input[type="%1"]@ element can be used to  submit the form.',
              ELEMENT_MC_4: 'Verify if the @button@ element can be used to  submit the form.',
              ELEMENT_MC_5: 'Verify if the @%1[role="button"]@ element can be used to  submit the form.',
              ELEMENT_HIDDEN_1: '@form@ element was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2: '@input[type="submit"]@ element was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_3: '@input[type="%1"]@ element was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_4: '@button@ element was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_5: '@%1[role="button"]@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Using a submit button allows users to easily identify and control how to  submit form information to a server for processing.  Forms that are submitted through changes in focus or selection may result in users prematurely submitting the form or not being aware they submitted the form.'
            ],
            TECHNIQUES: [
              'The preferred technique for submitting forms is with the use of the input[type="submit"] form control.',
              'An alternative techniques include using other HTML form control elements, including @input[type="button"]@, @input[type="image"]@ or @button@ elements with an accessible name indicating that the button is for submitting form information.',
              'In the case when a non-form control element (e.g. @a@ or @div@ element) is being used to submit the form, the element can use ARIA [role="button"] attribute with the accessible name indicating that the button is for submitting form information.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @input[type="submit"]@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-INPUT'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H32: Providing submit buttons',
                url:   'https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/H32'
              }
            ]
        },
        FOCUS_6: {
            ID:         'Focus 6',
            DEFINITION: '@checkbox@ and @radio@ buttons %s not automatically change context.',
            SUMMARY:    '@checkbox/radio@ buttons changing context.',
            TARGET_RESOURCES_DESC: '@input[type="checkbox"]@ and @input[type="radio"]@',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that the @checkbox@ or @radio@ button does not automatically change context.',
              MANUAL_CHECK_P: 'Verify that %N_MC checkbox@ and/or @radio@ buttons do not automatically change context.',
              HIDDEN_S: 'The @checkbox@ or @radio@ button that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @checkbox@ or @radio@ buttons that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @checkbox@ or @radio@ buttons on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:     'Verify that the @input[type="%1"]@ does not automatically change context when the control is checked or unchecked.',
              ELEMENT_MC_2:     'Verify that the @%1[role="%2"]@ does not automatically change context when the control is checked or unchecked.',
              ELEMENT_HIDDEN_1: '@input[type="%1"]@ element was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2: ' @%1[role="%2"]@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Users do not expect that checking or unchecking a radio button or checkbox will cause focus to move to another a page or section of the current page they are on.'
            ],
            TECHNIQUES: [
              'Remove or modify the event handlers to change the behavior to not automatically change context when the checkbox or radio button is checked or unchecked.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @input[type="checkbox"]@ and @input[type="radio"]@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-INPUT'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Checkbox Role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#checkbox'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: Radio Role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#radio'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H32: Providing submit buttons',
                url:   'https://www.w3.org/TR/2014/NOTE-WCAG20-TECHS-20140408/H32'
              }
            ]
        }
    }
});
