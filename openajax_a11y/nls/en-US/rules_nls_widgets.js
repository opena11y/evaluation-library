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
        WIDGET_1: {
            ID:                    'Widget 1',
            DEFINITION:            'Widgets %s have label.',
            SUMMARY:               'Widgets %s have label',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Add a label to the element with a widget role that is unlabelled.',
              FAIL_P:         'Add labels to the %N_F elements with widget roles that are unlabelled.',
              MANUAL_CHECK_S: 'Element with a widget role may need a label.',
              MANUAL_CHECK_P: '%N_MC out of %N_T element with widget roles may need a label.',
              HIDDEN_S:       'An element defined as a widget role that is hidden and was not evaluated.',
              HIDDEN_P:       '%N_H elements defined with widget roles that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No elements with widget roles on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@%1@ element with @%2@ widget role has label: %3.',
              ELEMENT_MC_1:   '@%1@ element with @%2@ widget role may require a label depending on context (i.e multiple elements with the same widget role) in the page, adding an label will improve accessibility.',
              ELEMENT_FAIL_1:   'Add label to @%1@ element with @%2@ widget role.',
              ELEMENT_HIDDEN_1: 'Label for widget was not tested because @%1@ element with @%2@ widget role is hidden from assistive technologies and/or not visible on screen'
            },
            PURPOSE: [
              'A label associated with a element with a widget role ensures that information about the widget is spoken by screen readers when it receives focus.'
            ],
            TECHNIQUES: [
              'In some cases the child text nodes and @alt@ from descendant image elements will be used as the label for elements with widget roles.',
              'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page to label elements with widget roles.',
              'Use @aria-label@ attribute to provide a explicit label for an element with a widget role.',
              'Elements with grouping widget roles may not receive keyboard focus, but giving them a label provides users of assistive technologies a more accurate description of the purpose of the widget'
            ],
            MANUAL_CHECKS: [
              'Good labels are both concise and descriptive of the element with widget role purpose.',
              'If element with widget roles are arranged in groups, make sure labels include grouping information.',
              'Consider using @aria-describedby@ to provide references to instructions or error information.',
              'When there is more than one widget of the same type on a page, they need an label for users to uniquely identify the form control.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Accessible Name (e.g. label) Calculation',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#namecalculation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-labelledby',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-label',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA6: Using aria-label to provide labels for objects',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA9'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
        WIDGET_2: {
            ID:                    'Widget 2',
            DEFINITION:            'Elements with @onClick@ event handlers %s be a link, button or have a widget role with tabindex.',
            SUMMARY:               '@onClick@ event handlers %s have role',
            TARGET_RESOURCES_DESC: 'Elements with @onClick@ event handler values that are defined as widgets',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add widget role name to element.',
              FAIL_P:   'Add widget roles to each of the %N_F elements.',
              MANUAL_CHECK_S:     'Verify that any child elements that can respond to element with an @onclick@ event handler are a link, form control or has a widget role, and can be accessed with the keyboard alone.',
              MANUAL_CHECK_P:     'Verify that any child elements that can respond to %N_MC elements with an @onclick@ event handler are a link, form control or has a widget role, and can be accessed with the keyboard alone.',
              HIDDEN_S: 'The element with an @onClick@ event handler that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H elements with @onClick@ events handler that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements with @onClick@ event handlers on the page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ element has a widget role.',
              ELEMENT_PASS_2:   '@%1@ element is a form control.',
              ELEMENT_PASS_3:   '@%1@ element is a link.',
              ELEMENT_FAIL_1:   'Add widget role to the @%1@ element.',
              ELEMENT_MC_1:     'The @%1@ element has an @onclick@ event handler, verify any child elements that can respond to the @onclick@ event handler are a link, form control or have a widget role, and can be access with the keyboard alone.',
              ELEMENT_HIDDEN_1: 'Elements with onClick events having a @role@ was not tested because %1 element with @onClick@ event handler is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'Elements with @onClick@ event handlers must be a link, form control or have a widget role.'
            ],
            TECHNIQUES: [
              'Use ARIA widget role on non-form controls to describe their function on the page.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'WAI-ARIA 1.2 Authoring Practices:  Keyboard Navigation Inside Components',
                url:   'https://w3c.github.io/aria-practices/#kbd_general_within'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
        WIDGET_3: {
            ID:                    'Widget 3',
            DEFINITION:            '@role@ attribute value %s be a widget, section, landmark or live region role.',
            SUMMARY:               '@role@ %s be valid',
            TARGET_RESOURCES_DESC: 'Elements with @role@ attribute values',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add a valid widget, section, landmark or live region role value to the element.',
              FAIL_P:   'Add a valid widget, section, landmark or live region role values to %N_F out of %N_T elements with @role@ attributes.',
              HIDDEN_S: 'The element with a role that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H elements with a role that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements with @role@ attribute on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:     '@%1@ is a widget role.',
              ELEMENT_PASS_2:     '@%1@ is a landmark role.',
              ELEMENT_PASS_3:     '@%1@ is a live region role.',
              ELEMENT_PASS_4:     '@%1@ is a section role.',
              ELEMENT_FAIL_1:   '@%1@ is an abstract ARIA role, change the role attribute to a widget, landmark or live region role.',
              ELEMENT_FAIL_2:   'The @role@ attribute is an empty string, change the @role@ attribute value to an appropriate widget, landmark, section or live region role.',
              ELEMENT_FAIL_3:   '@%1@ is not a defined ARIA role, change the @role@ attribute value to an appropriate widget, landmark, section or live region role.',
              ELEMENT_HIDDEN_1:   '@role@ attribute value was not validated because the %1 element is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'Elements with @role@ attributes describe the section of a document (i.e landmarks) and the types of interactive elements (i.e. widgets) to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use ARIA landmark roles to describe the sections of a web page.',
              'Use ARIA widget roles to describe interactive elements on a web page'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Landmark Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA19: Using ARIA role=alert or Live Regions to Identify Errors',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA19.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
        WIDGET_4: {
            ID:                    'Widget 4',
            DEFINITION:            'ARIA property and state values %s be valid types.',
            SUMMARY:               'ARIA values %s be valid',
            TARGET_RESOURCES_DESC: 'Elements with aria attributes',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change ARIA attribute to a valid type.',
              FAIL_P:   'Change %N_F out of %N_T ARIA attributes to a valid types.',
              HIDDEN_S: 'The widget that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No ARIA attributes on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   'The @%1@ attribute with the value "@%2@" is a valid token.',
              ELEMENT_PASS_2:   'The @%1@ attribute with the value "@%2@" is a valid "%3" type.',
              ELEMENT_FAIL_1: 'The @%1@ attribute with the value "@%2@" must change to one of the following values: %3.',
              ELEMENT_FAIL_2: 'The @%1@ attribute with the value "@%2@" must change to one or more of the following values: %3.',
              ELEMENT_FAIL_3: 'The @%1@ attribute with the value "@%2@" must change to a value with type of \'%3\'.',
              ELEMENT_HIDDEN_1: 'ARIA attribute value was not tested for validity because the @%1@ attribute with the value "@%2@" is hidden from assistive technologies and not visible on screen.'
            },
            PURPOSE: [
              'ARIA attributes must be a valid type to accurately describe web content to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use valid values for ARIA attributes.',
              'Check W3C WAI Accessible Rich Internet Applications specifications for allowed values for ARIA attributes.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Supported Property and States',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
      },
      WIDGET_5: {
            ID:                    'Widget 5',
            DEFINITION:            'Elements with the attributes that start with @aria-@ %s be a valid ARIA property or state.',
            SUMMARY:               'Attributes that start with @aria-@ %s be defined.',
            TARGET_RESOURCES_DESC: 'Elements with aria attributes',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change ARIA attribute to a defined property or state.',
              FAIL_P:   'Change all %N_F out of %N_T ARIA attributes to a defined properties or states.',
              HIDDEN_S: 'The widget that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No undefined ARIA attributes on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:    'The @%1@ attribute is a defined ARIA property or state.',
              ELEMENT_FAIL_1:  'The @%1@ attribute must be changed to a defined ARIA property or state.',
              ELEMENT_HIDDEN_1:  'Valid ARIA attribute was not tested becasue the @%1@ attribute with the value "@%2@" is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'ARIA attributes must be defined properties or states to accurately describe web content to users of assistive technologies, especially screen reader users'
            ],
            TECHNIQUES: [
              'Use defined ARIA properties and states in the ARIA specification.',
              'Check W3C WAI Accessible Rich Internet Applications specifications for allowed values for ARIA attributes.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Supported Property and States',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
      },
      WIDGET_6: {
            ID:                    'Widget 6',
            DEFINITION:            'Widgets %s define required properties and states.',
            SUMMARY:               'Widgets %s have properties',
            TARGET_RESOURCES_DESC: 'Widgets with required properties and states',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add required properties and states to widget.',
              FAIL_P:   'Add required properties and states to the %N_F of the %N_T widgets with required properties and/or states on the page.',
              HIDDEN_S: 'The widget with required properties and states that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that have required properties and states that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No widgets with required properties and states on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ widget has the following required ARIA properties and states: %2.',
              ELEMENT_FAIL_1: 'Add one or more of the required ARIA properties and states (i.e. "%2") to the @%1@ widget.',
              ELEMENT_HIDDEN_1: 'Required ARA properties and states was not tested because the %1 widget is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use required ARIA properties to describe the features and options of a widget.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
      WIDGET_7: {
            ID:                    'Widget 7',
            DEFINITION:            'Container widgets %s have required owned elements.',
            SUMMARY:               'Widgets %s have owned elements',
            TARGET_RESOURCES_DESC: 'Widgets with required owned elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add required child element to the widget.',
              FAIL_P:   'Add required child elements for the %N_F out of %N_T widgets missing required child elements.',
              HIDDEN_S: 'The widget with requires child elements that is is hidden and was not evaluated.',
              HIDDEN_P: '%N_H hidden widgets that require child elements were not evaluated.',
              NOT_APPLICABLE:  'No widgets with required child elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:    '@%1@ widget contains at least one required owned element: @%2@.',
              ELEMENT_PASS_2:    'When @aria-busy@ is set to @true@, the @%1@ widget is not required to contain required owned elements.',
              ELEMENT_FAIL_1:  '@%1@ widget does not contain one or more of following required owned elements: @%2@.',
              ELEMENT_HIDDEN_1:  'Required owned elements was not tested because the @%1@ widget is hidden from assistive technologies and not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.',
              'Roles that are associated with container widgets have important parent/child relationships with other roles.',
              'Parent/Child relationships are used by assistive technologies for computing the number of items in a container and the item position.',
              'Container roles are also used by assistive technologies to provide enhanced navigation features for moving between items in lists, tables, grids and treegrids.'
            ],
            TECHNIQUES: [
              'Required owned elements can be defined using the HTML DOM structure or the @aria-owns@ attribute.',
              'Use the DOM structure to add required owned elements by making them a descendant of the container element.',
              'When the owned elements are not descendants of the container element, use the @aria-owns@ attribute on the container element to reference the owned elements.',
              'When @aria-busy@ attribute is set to @true@ on the container element, the container element does not need to own any required elements.  @aria-busy@ should be used when a container element is being dynamically populated.',
              'NOTE: The DOM structure technique is preferred over the @aria-owns@ technique, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
     WIDGET_8: {
            ID:                    'Widget 8',
            DEFINITION:            'Role %s have a required parent role using the HTML DOM structure or the @aria-owns@ attribute.',
            SUMMARY:               'Role %s have parent',
            TARGET_RESOURCES_DESC: 'Role with required parent role',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add required parent role to the widget.',
              FAIL_P:   'Add required parent role to the %N_F of the %N_T widgets that require a parent role.',
              HIDDEN_S: 'The role that requires a parent role that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that require a parent roles that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No widgets with required parent role on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ role is a child of the a @%2@ role.',
              ELEMENT_FAIL_1:   'The @%2@ role requires a parent @%1@ role, check your HTML DOM structure to ensure an ancestor element or an @aria-owns@ attributes identifies a required parent role.',
              ELEMENT_HIDDEN_1: 'Required parent role was not tested because the @%1@ widget is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.',
              'Roles that are associated with container widgets have important parent/child relationships with other roles.',
              'Parent/child relationships are used by assistive technologies for computing the number of items owned by a container and the position of an item (e.g. "third of five links").',
              'Container roles are also used by assistive technologies to provide enhanced navigation features for moving between items in lists, tables, grids and treegrids.'
            ],
            TECHNIQUES: [
              'Parent roles can be defined using the HTML DOM structure or the @aria-owns@ attribute.',
              'Required parent role is a DOM ancestor of the element.',
              'Required parent role references the element using the @aria-owns@ attribute.',
              'NOTE: HTML DOM parent/child relationships for defining relationships is preferred over the use of @aria-owns@ attribute, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
     WIDGET_9: {
            ID:                    'Widget 9',
            DEFINITION:            'Elements %s be owned by only one widget.',
            SUMMARY:               'Only one owner',
            TARGET_RESOURCES_DESC: 'Widgets with required parent roles',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update widgets with aria-owns to make sure a element is only referenced once.',
              FAIL_P:   'Update %N_F out of %N_T widgets with aria-owns to make sure they reference a element only once.',
              NOT_APPLICABLE:  'No elements are referenced using aria-owns on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%2@ element is referenced only by @%1@ container element using aria-owns.',
              ELEMENT_FAIL_1: 'Check the @%1@ @aria-owns@ reference to @%2@ element so it is only referenced by one container element.',
            },
            PURPOSE: [
              'ARIA container elements  have require child elements.',
              'When the HTML DOM parent/child relationships do not identify the child elements the @aria-owns@ attribute can be used to reference the child elements.',
              'A child element can only be referenced using @aria-owns@ by one container element.'
            ],
            TECHNIQUES: [
              'Container elements using @aria-owns@ attribute must accurately reference the associated child elements.',
              'A child element can only be referenced by one container element using the @aria-owns@ attribute.',
              'Update the application to use the DOM parent/child relationships instead of using @aria-owns@ technique.',
              'NOTE: HTML DOM parent/child relationships for defining relationships is preferred over the use of @aria-owns@ attribute, since it is less likely to result in authoring errors associated with creating and referencing elements with unique @id@s.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Owned Element definition',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#dfn-owned-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-owns attribute',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-owns'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
     WIDGET_10: {
            ID:                    'Widget 10',
            DEFINITION:            'Range widget %s have value between minimum and maximum values, or have an indeterminate state.',
            SUMMARY:               'Value in range',
            TARGET_RESOURCES_DESC: 'Range widgets',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update @range@ widget attributes of the range widget so the @aria-valuenow@ attribute is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes.',
              FAIL_P:   'Update @range@ widget attributes of the %N_F out of %N_T range widgets so the @aria-valuenow@ attribute of each widget is in the range defined by @aria-valuemin@ and @aria-valuemax@ attributes.',
              HIDDEN_S: 'The @range@ widget that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H @range@ widgets that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @range@ widgets on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:  '@%1@ widget is using @aria-valuetext@ attribute which overrides the @aria-valuenow@ attribute for describing the value of the range.',
              ELEMENT_PASS_2:  '@%1@ widget value of %2 is in the range %3 and %4.',
              ELEMENT_PASS_3:  '@%1@ widget has no @aria-valuenow@ attribute and the value is considered indeterminate.',
              ELEMENT_FAIL_1:  'Update the numeric values of @aria-valuenow@ (%1), @aria-valuemin@ (%2) and @aria-valuemax@ (%3) so the @aria-valuenow@ value is in range.',
              ELEMENT_FAIL_2:  'Update the numeric values of @aria-valuemin@ (%1) and @aria-valuemax@ (%2) so the @aria-valuemin@ value is less than the @aria-valuemax@ value.',
              ELEMENT_FAIL_3:  'Update the @%1@ widget values for @aria-valuemin@ ("%2") and/or @aria-valuemax@ ("%3") attributes to be valid numbers.',
              ELEMENT_FAIL_4:  '@%1@ widget is missing or has an invalid value for @aria-valuenow@.',
              ELEMENT_HIDDEN_1:  'Widget range values were not tested because the @%1@ range widget is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Range roles identify a value between a minimum or maximum value and whether the value can be changed by the user (e.g. @scrollbar@, @slider@ or @spinbutton@).',
              'Screen readers typcially render the value of a range widget as a percentage of the total range defined by the minimum and maximum values.',
              '@aria-valuetext@ can be used to render an alternative to the percentage when a numerical values and/or a units of measure are more descriptive.',
              'Some range roles (e.g. @progress@ and @spinbutton@) allow an unknown current value indicating indeterminate or no current value.'
            ],
            TECHNIQUES: [
              'Use the @aria-valuenow@ attributes numerical value must be in the range defined by @aria-valuemin@ and @aria-valuemax@.',
              'Screen reader typically render the slider value as a percentage, requiring a valid @aria-valuenow@ attribute.',
              'Use the @aria-valuetext@ to provide an alternative to the percentage typically spoken by assistive technologies (e.g. "32 dollars", "78 degrees")',
              'For most range roles, if @aria-valuemin@ is not defined it\'s default value is 0.',
              'For most range roles, if @aria-valuemax@ is not defined it\'s default value is 100.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices: Communicating Value and Limits for Range Widgets',
                url:   'https://w3c.github.io/aria-practices/#range_related_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Meter',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#meter'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Progress',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#progress'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Scollbar',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#scollbar'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Slider',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#slider'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Spinbutton',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#spinbutton'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA5.html'
              }
            ]
        },
     WIDGET_11: {
            ID:                    'Widget 11',
            DEFINITION:            'Elements with UI event handlers %s have widget roles that accurately describe the options and actions available to the user upon interacting with the element.',
            SUMMARY:               'Elements with event handlers %s have roles',
            TARGET_RESOURCES_DESC: 'Elements with event handlers',
            RULE_RESULT_MESSAGES: {
              FAIL_S:          'Add an ARIA widget role to the interactive element, or to its descendants, to describe the user interactions associated with the event handler or handlers on the element.',
              FAIL_P:          'Add ARIA widget roles to the %N_F interactive elements, or to their descendants, to describe the user interactions associated with the event handlers on those elements.',
              MANUAL_CHECK_S:  'Verify the user interactions associated with the interactive element with one or more event handlers are accurately described by the element\'s widget role and/or those of its descendants.',
              MANUAL_CHECK_P:  'Verify the user interactions associated with the %N_MC interactive elements with one or more event handlers are accurately described by each element\'s widget role and/or their descendants.',
              HIDDEN_S:        'The hidden interactive element with event handlers was not evaluated.',
              HIDDEN_P:        'The %N_H interactive elements with event handlers were not evaluated.',
              NOT_APPLICABLE:  'No interactive elements with event handlers found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MANUAL_CHECK_1:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by the @%1@ widget role.',
              ELEMENT_MANUAL_CHECK_2:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by native role semantics of the @%1@ element.',
              ELEMENT_MANUAL_CHECK_3:  'Verify the user options and actions available through the "@%2@" event handler(s) are accurately described by the descendant elements with widget roles or the native role semantics of the interactive elements.',
              ELEMENT_FAIL_1:   'Add widget role(s) to the element and/or its descendants that accurately describe the user options and actions of the @%1@ element with the following event handlers: %2.',
              ELEMENT_HIDDEN_1: 'Roles for interactive elements was not tested because the %1 element is hidden from assistive technologies with following event handlers: %2'
            },
            PURPOSE: [
              'ARIA widget roles describe the user options and actions, or more generally, the expected behavior, of interactive elements to users of assistive technologies.',
              'Standard HTML form controls and links have default widget roles that describe their behavior.',
              'When UI event handlers are used to create user options and actions that change the expected behavior of an interactive element, ensure that the appropriate widget role is assigned to the element.',
              'Conversely, ensure that the event handlers are adding appropriate behaviors that align with the ARIA widget role.'
            ],
            TECHNIQUES: [
              'Use the @role@ attribute with an ARIA widget role value to describe the user options, actions and expected behavior of custom interactive elements.',
              'Use ARIA property and state attributes to describe the features of each widget role. Note that some widget roles have required properties and states.',
              'Ensure that all options and actions of interactive elements are available through keyboard-only interaction.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: INPUT element widget role semantics',
                url:   'https://www.w3.org/TR/html51/sec-forms.html#state-of-the-type-attribute'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: SELECT element widget role semantics',
                url:   'https://www.w3.org/TR/html51/sec-forms.html#the-select-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: TEXTAREA element widget role semantics',
                url:   'https://www.w3.org/TR/html51/sec-forms.html#the-textarea-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: BUTTON element widget role semantics',
                url:   'https://www.w3.org/TR/html51/sec-forms.html#the-button-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: A element widget role semantics',
                url:   'https://www.w3.org/TR/html51/textlevel-semantics.html#the-a-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'UI Events Specification',
                url:   'https://www.w3.org/TR/DOM-Level-3-Events/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes.',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes.',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
        WIDGET_12: {
            ID:         'Widget 12',
            DEFINITION: 'The label for elements with a widget roles on a page %s sufficiently describe its purpose.',
            SUMMARY:    'Widget labels %s be descriptive',
            TARGET_RESOURCES_DESC: 'Elements with widget roles on a page',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'To the element with widget role missing a label, add a label that describes its purpose.',
              FAIL_P:   'To each of the %N_F element with widget roles missing labels, add a label that uniquely describes its purpose.',
              MANUAL_CHECK_S: 'Verify that the label uniquely describes the purpose of the element with widget role.',
              MANUAL_CHECK_P: 'Verify that the label for each of the %N_MC element with widget roles uniquely describes its purpose.',
              HIDDEN_S: 'The control element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H control elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No element with widget roles on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:     'Verify the label "%1" for the @%2@ element with @%3@ widget role describes its purpose.',
              ELEMENT_MC_2:     'Verify the @%1@ element with @%2@ widget role does not need a label, a label is only needed  if it clarifies the purpose of the widget on the page.',
              ELEMENT_FAIL_1:   'Add a label to the @%1@ element with @%2@ widget role.',
              ELEMENT_HIDDEN_1: '@%1@ element with the %2@ widget role was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Labels that are sufficiently descriptive make it possible for people to understand the purposes of elements with widget roles on the page.'
            ],
            TECHNIQUES: [
              'In some cases the child text nodes and @alt@ from descendant image elements will be used as the label for elements with widget roles.',
              'Use @aria-labelledby@ attribute to reference the id(s) of the elements on the page to label elements with widget roles.',
              'Use @aria-label@ attribute to provide a explicit label for an element with a widget role.',
              'Elements with grouping widget roles may not receive keyboard focus, but giving them a label provides users of assistive technologies a more accurate description of the purpose of the widget'
            ],
            MANUAL_CHECKS: [
              'Good labels are both concise and descriptive of the element with widget role purpose.',
              'If element with widget roles are arranged in groups, make sure labels include grouping information.',
              'Consider using @aria-describedby@ to provide references to instructions or error information.',
              'When there is more than one widget of the same type on a page, they need an label for users to uniquely identify the form control.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML Specification: The @label@ element',
                url:   'https://html.spec.whatwg.org/#the-label-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-label@ attribute',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-label'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @aria-labelledby@ attribute',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-labelledby'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML Specification: The @title@ attribute',
                url:   'https://html.spec.whatwg.org/#the-title-attribute'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H65'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA6: Using aria-label to provide labels for objects',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA6'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA9'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/html/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'MDN Web Docs: ARIA ',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Web Fundamentals: Introduction to ARIA',
                url:   'https://developers.google.com/web/fundamentals/accessibility/semantics-aria'
              }
            ]
        },
        WIDGET_13: {
            ID:                    'Widget 13',
            DEFINITION:            'ARIA roles that prohibit accessible names %s not have an accessible name defined using @aria-label@ or @aria-labelledby@ attributes.',
            SUMMARY:               'Role does not support accessible name.',
            TARGET_RESOURCES_DESC: 'ARIA roles which prohibit an accessible name',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Remove @aria-label@ or @aria-labelledby@ from the element with a role that prohibits the use of naming techniques.',
              FAIL_P:   'Remove @aria-label@ or @aria-labelledby@ from the %N_F elements with roles that prohibit the use of naming techniques.',
              HIDDEN_S: 'The element with an widget role that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H elements with @aria-label@ or @aria-labelledby@ that are on elements and/or have roles that prohibit the use of naming techniques.',
              NOT_APPLICABLE:  'No elements with @aria-label@ or @aria-labelledby@ that are on elements and/or have roles that prohibit the use of naming techniques where found.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:    'Remove @aria-label@ or @aria-labelledby@ attribute from @%1@ element with role @%2@.',
              ELEMENT_FAIL_2:    'Remove @aria-label@ or @aria-labelledby@ attribute from @%1@ element.',
              ELEMENT_HIDDEN_1:  'Element @%1[role="%2"]@ was not tested because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2:  'Element @%1@ was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Providing an accessible name for elements or roles provides a way for users to identify the purpose of each landmark, widget, link, table and form control on a web page.',
              'Versions of the ARIA specification before 1.2 allowed @aria-label@ or @aria-labelledby@  to be used on any element, even if an accessible name was not useful .',
              'For example, defining an accessible name on a @p@ element or an element with @role=none@ does not provide any useful accessibility information to assistive technologies.  For a @p@ element the text content is the only part that is needed by assistive technologies.'
            ],
            TECHNIQUES: [
              'Remove @aria-label@ or @aria-labelledby@ attribute from the element.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              }
            ]
        },
        WIDGET_14: {
            ID:                    'Widget 14',
            DEFINITION:            'Verify the live region has the appropriate ARIA markup to indicate whether or how the screen reader will interrupt the user with a change notification.',
            SUMMARY:               'Verify appropriate use of live region',
            TARGET_RESOURCES_DESC: 'Elements with @alert@, @log@ or @status@ roles or the @aria-live@ attribute',
            RULE_RESULT_MESSAGES: {
              FAIL_S:          'One element identified as a live region has a conflict between the implied attribute values of the role and the defined attribute values.',
              FAIL_P:          'The %N_F elements identified as live regions have conflicts between the implied attribute values of their roles and the defined attribute values.',
              HIDDEN_S:        'One element identified as a live region is hidden and was not evaluated.',
              MANUAL_CHECK_S:  'Verify the element identified as a live region has the appropriate ARIA markup for the type of informational change that can occur.',
              MANUAL_CHECK_P:  'Verify the %N_MC elements identified as live regions have the appropriate ARIA markup for the type of informational changes that can occur in those regions.',
              HIDDEN_P:        '%N_H elements identified as live regions are hidden and were not evaluated.',
              NOT_APPLICABLE:  'No elements were identified as live regions on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:     'The @aria-live@ attribute value of @%1@ conflicts with the default value of @%2@ for the @aria-live@ property of the @%3@ role.',
              ELEMENT_FAIL_2:     'The @aria-atomic@ attribute value of @false@ conflicts with the default value of @true@ for the @aria-atomic@ property of the @%1@ role.',
              ELEMENT_MC_1:       'Verify the @aria-live@ attribute value of @%1@ is appropriate for the type of informational change that can occur in the region.',
              ELEMENT_MC_2:       'Verify the @alert@ role identifies a live region with critical time-sensitive information.',
              ELEMENT_MC_3:       'Verify the @log@ role identifies a live region where new information added and deleted in a meaningful order.',
              ELEMENT_MC_4:       'Verify the @alert@ role identifies a live region with advisory information.',
              ELEMENT_HIDDEN_1:   '@%1[arial-live="%2"]@ was not evaluated because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2:   '@%1[role="%2"]@ was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'ARIA live regions provide a mechanism for displaying dynamic text content on a page such that changes in the content will be automatically announced to screen reader users while they are focusing on other parts of the page.',
              'The manner in which informational changes in live regions are announced to screen reader users is controlled by three separate ARIA roles that may be assigned to the region: @alert@, @log@ and @status@.',
              'In general, live regions should be used sparingly, since live regions that are constantly announcing changes become distracting, and may prevent the user from completing the task they are working on.',
              'A common misuse of live regions is to announce the opening of pull down menus or dialog boxes: These types of announcements are better handled through the appropriate use of other ARIA markup such as the @menu@ and @dialog@ roles.'
            ],
            TECHNIQUES: [
              'The @alert@ role identifies a live region with very important, and usually time-sensitive, information. When the information changes in this type of live region, a message is typically sent that interrupts the current speech being spoken by a screen reader. Examples includes transaction errors that are cancelling or impeding the progress of completing a financial transaction.',
              'The @log@ role identifies a type of live region where new information is added in a meaningful order and old information may disappear. Examples include chat logs, messaging history, game log, or an error log.',
              'The @status@ role identifies a live region that contains an advisory message, but one that is not important enough to justify an @alert@ role. This type of region is often, but not necessarily, presented as a status bar, and announcements of informational changes are typically delayed until a break occurs in the current speech being read by the screen reader software.',
              'When the @aria-atomic@ attribute is specified for a live region, it indicates to assistive technologies that when a change occurs, it should re-render all of the content or just the changes.',
              'The optional @aria-relevant@ attribute on a live region indicates what types of informational changes should be communicated to the user (e.g. @additions@, @deletions@, @text@ and @all@).',
              'The @aria-live@ attribute can be used to create custom live regions, with possible values of @polite@, @assertive@ and @off@. When used in conjunction with the ARIA @alert@, @log@ or @status@ roles, care must be taken in order to avoid conflicts with the default properties of those roles.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.OTHER,
                title: 'Mozilla Developer Network: ARIA Live Regions',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Alert Role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/roles#alert'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Log Role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/roles#log'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Status Role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/roles#status'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-live',
                url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-live'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-atomic',
                url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-atomic'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: aria-relevant',
                url:   'https://www.w3.org/TR/wai-aria-1.2/states_and_properties#aria-relevant'
              }

            ]
        },
        WIDGET_15: {
            ID:                    'Widget 15',
            DEFINITION:            'ARIA attributes that have been deprecated for a role %s be removed.',
            SUMMARY:               'Remove deprecated ARIA attributes.',
            TARGET_RESOURCES_DESC: 'Roles where ARIA attributes are deprecated.',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Remove the deprecated ARIA attribute from the element.',
              FAIL_P:   'Remove the deprecated ARIA attributes from the %N_F elements.',
              HIDDEN_S: 'The element with deprecated ARIA attribute that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H elements with deprecated ARIA attributes that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements with deprecated ARIA attributes found.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:    'Remove @%1@ attribute from @%2@ element with role @%3@.',
              ELEMENT_FAIL_2:    'Remove @%1@ attribute from @%2@ element which has an implicit role of "@%3@".',
              ELEMENT_HIDDEN_1:  'The @%1@ attribute on the @%2[role="%3"]@ element was not tested because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2:  'The @%1@ attribute on the @%2@ element which has the implicit role of "@%3@"" was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Not all ARIA properties and states are useful on every ARIA role and starting with ARIA 1.2 certain states and properties that were once considered global have been deprecated on specific roles.',
              'The ARIA in HTML specification defines implicit roles for most HTML elememnts.',
              'The same ARIA property and state restrictions on explicit roles apply to implicit roles.'
            ],
            TECHNIQUES: [
              'Remove the deprecated ARIA attribute from the element.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification: Widget Roles',
                url:   'https://www.w3.org/TR/wai-aria-1.2/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'ARIA in HTML',
                url:   'https://www.w3.org/TR/html-aria/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              }
            ]
        },
        WIDGET_16: {
            ID:                    'Widget 16',
            DEFINITION:            'Custom elements (HTML elements created using the Web Components APIs) %s be manually checked for accessibility requirements.',
            SUMMARY:               'Custom element requires manual check.',
            TARGET_RESOURCES_DESC: 'Custom elements created using web components API.',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:  'Verify the custom element meets WCAG accessibility requirments.',
              MANUAL_CHECK_P:  'Verify the %N_MC custom elements meet WCAG accessibility requirments.',
              HIDDEN_S: 'A custom element is hidden and only needs to be checked if has features that become visible need to be checked for accessbility.',
              HIDDEN_P: '%N_H custom elements are hidden and only the custom elements with features that may become visible need to be checked for accessibility.',
              NOT_APPLICABLE:  'No custom elements found on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:       'Verify the accessibility of the features of the custom component with the tag name of @%1@ using manual checking techniques or automated tools that can anlyze the shadow DOM of custom elements.',
              ELEMENT_HIDDEN_1:  'The @%1@ custom element is hidden from assistive technologies.',
            },
            PURPOSE: [
              'Custom elements, defined using the Web Components APIs of HTML 5, are typically used for creating interactive widgets on a web page. A custom element effectively creates a self-scoped package of HTML, CSS and JavaScript that uses the Shadow DOM to insulate itself from other CSS and JavaScript defined by the parent document.',
              'Because custom elements use the Shadow DOM and thus are not part of the legacy DOM, they cannot be accessed by the evaluation library for programmatic checking of accessibility features.',
              'The evaluation library is able to report the presence of custom elements, but can only recommend that they be manually checked for accessibility, possibly by using other DOM inspection tools to identify accessibility issues and features.'
            ],
            TECHNIQUES: [
              'In evaluating custom elements that render as interactive widgets, the most important manual checks involve keyboard navigation and operability, and focus styling, which are related to the various ways a user may interact with the widget.',
              'Test with screen readers to verify functionality is operable by a screen reader user.',
              'Test the graphical rendering in operating system using high contrast settings to verify content is perceivable by people with visual impairments.',
              'Use accessibility tools in browser DOM inspectors to assist with manual inspection, since the DOM inspector of most  browsers allows access to the Shadow DOM of the custom element.',
              'You can use the accessibility rules in this tool to help guide your manual testing procedures.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'MDN: Web Components',
                url:   'https://developer.mozilla.org/en-US/docs/Web/Web_Components'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'WebComponents.org: Introduction',
                url:   'https://www.webcomponents.org/introduction'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Web Content Accessibility Guidelines (WCAG)',
                url:   'https://www.w3.org/TR/WCAG/'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specification',
                url:   'https://www.w3.org/TR/wai-aria-1.2/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'ARIA Authoring Practices',
                url:   'https://w3c.github.io/aria-practices/'
              }
            ]
        }
    }
});
