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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Accessible Name (e.g. label) Calculation',
                url:   'http://www.w3.org/TR/wai-aria/#namecalculation'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: aria-labelledby',
                url:   'http://www.w3.org/TR/wai-aria/#aria-labelledby'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: aria-label',
                url:   'http://www.w3.org/TR/wai-aria/#aria-label'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA6: Using aria-label to provide labels for objects',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA6'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA9'
              },
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
                title: 'WAI-ARIA 1.0 Authoring Practices',
                url:   'http://www.w3.org/TR/wai-aria-practices/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'WAI-ARIA 1.0 Authoring Practices: Tabindex for managing focus',
                url:   'http://www.w3.org/TR/2010/WD-wai-aria-practices-20100916/#kbd_focus'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Landmark Roles',
                url:   'http://www.w3.org/TR/wai-aria/#landmark_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA19: Using ARIA role=alert or Live Regions to Identify Errors',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA19.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Supported Property and States',
                url:   'http://www.w3.org/TR/wai-aria/#states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
              }
            ]
      },
      WIDGET_5: {
            ID:                    'Widget 5',
            DEFINITION:            'ARIA property or state %s be defined.',
            SUMMARY:               'ARIA attribute %s be defined',
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Supported Property and States',
                url:   'http://www.w3.org/TR/wai-aria/#states_and_properties'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
              }
            ]
        },
      WIDGET_7: {
            ID:                    'Widget 7',
            DEFINITION:            'Widgets %s have required child roles.',
            SUMMARY:               'Widgets %s have child roles',
            TARGET_RESOURCES_DESC: 'Widgets with required owned elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add required child roles to child elements in the widget.',
              FAIL_P:   'Add required child roles to child elements in the %N_F out of %N_T widgets with required child elements.',
              HIDDEN_S: 'The widget that requires child widget roles that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that require child widget roles that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No widgets with required child ARIA elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:    '@%1@ widget has at least one required owned elements: %2.',
              ELEMENT_FAIL_1:  '@%1@ widget is MISSING one or more of following required owned elements: %2.',
              ELEMENT_HIDDEN_1:  'Required child widgets was not tested because the %1 widget is hidden from assistive technologies and not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use required ARIA owned elements to describe the features and options of a widget.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
              }
            ]
        },
     WIDGET_8: {
            ID:                    'Widget 8',
            DEFINITION:            'Widgets %s have required parent role.',
            SUMMARY:               'Widgets %s have parent',
            TARGET_RESOURCES_DESC: 'Widgets with required parent role',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add required parent role to the widget.',
              FAIL_P:   'Add required parent role to the %N_F of the %N_T widgets that require a parent role.',
              HIDDEN_S: 'The widget that requires a parent role that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets that require a parent roles that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No widgets with required parent role on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ widget is a child of the a @%2@ role.',
              ELEMENT_FAIL_1: 'Create a parent widget with the role of @%1@ for this @%2@ widget.',
              ELEMENT_FAIL_2: 'Create a parent widget with the one of the required roles (i.e. @%1@) for this @%2@ widget.',
              ELEMENT_HIDDEN_1: 'Required parent widgets was not tested because the %1 widget is hidden from assistive technologies and/or not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use required parent roles to describe the features and options of a widget.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA4: Using a WAI-ARIA role to expose the role of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA4.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
              }
            ]
        },
     WIDGET_9: {
            ID:                    'Widget 9',
            DEFINITION:            'Widgets %s be owned by only one parent widget.',
            SUMMARY:               'Only one owner',
            TARGET_RESOURCES_DESC: 'Widgets with required parent roles',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update widgets with aria-owns to make sure it only references a child widget once.',
              FAIL_P:   'Update %N_F out of %N_T widgets with aria-owns to make sure they reference a child widget only once.',
              HIDDEN_S: 'The widget with @aria-owns@ that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H widgets with @aria-owns@ that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No widgets using aria-owns on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ child widget is referenced only by @%2@ parent widget with aria-owns.',
              ELEMENT_FAIL_1: 'Update references of @%1@ parent widgets with aria-owns to reference @%2@ child widget only once.',
              ELEMENT_HIDDEN_1: 'Widgets owned by more than one parent widget was not tested becasue the %1 parent widget with aria-owns is hidden from assistive technologies and not visible on screen.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Parent widget roles with aria-owns must accurately describe the parent relationships, a child widget can only have one parent widget.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              }
            ]
        },
     WIDGET_10: {
            ID:                    'Widget 10',
            DEFINITION:            'Range widget %s have value between minimum and maximum values.',
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
              ELEMENT_PASS_1:    '@%1@ widget is using @aria-valuetext@ attribute which overrides the @aria-valuenow@ attribute for describing the value of the range.',
              ELEMENT_PASS_2:    '@%1@ widget value of %2 is in the range %3 and %4.',
              ELEMENT_PASS_3:    '@%1@ widget has the range %3 and %4, and by not including the @aria-valuenow@ attribute the value of the progress-bar is considered indeterminate.',
              ELEMENT_FAIL_1:  'Update the numeric values of @aria-valuenow@ (%1), @aria-valuemin@ (%2) and @aria-valuemax@ (%3) so the @aria-valuenow@ value is in range.',
              ELEMENT_FAIL_2:  'Update the numeric values of @aria-valuemin@ (%1) and @aria-valuemax@ (%2) so the @aria-valuemin@ value is less than the @aria-valuemax@ value.',
              ELEMENT_FAIL_3:  'For progress bar update the numeric values or add @aria-valuemin@ (%2) and @aria-valuemax@ (%3) attributes and when state of progress is known use the @aria-valuenow@ attribute value to communicate the current state of progress.',
              ELEMENT_FAIL_4:  'Update or create @%1@ attribute to be a numeric value.',
              ELEMENT_FAIL_5:  'Update or create @%1@ attributes to be a numeric values.',
              ELEMENT_HIDDEN_1:  'Widget range values were not tested becasue the %1 range widget is hidden from assistive technologies.'
            },
            PURPOSE: [
              'ARIA roles, properties and states describes the features of interactive widgets to users of assistive technologies, especially screen reader users.'
            ],
            TECHNIQUES: [
              'Use the @aria-valuenow@, @aria-valuemin@ and @aria-valuemax@ are accurately defined.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA5: Using WAI-ARIA state and property attributes to expose the state of a user interface component',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA5.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
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
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
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
                title: 'HTML 4.01 Specification: The @label@ element',
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
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
                title: 'HTML 4.01 Specification: The @title@ attribute',
                url:   'http://www.w3.org/TR/html4/struct/global.html#adef-title'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/H65'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA6: Using aria-label to provide labels for objects',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA6'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA9: Using aria-labelledby to concatenate a label from several text nodes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA9'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.TECHNIQUE,
                title: 'iCITA Best Practices: Labels for Form Controls Overview',
                url:   'http://html.cita.illinois.edu/nav/form/'
              }
            ]
        },
        WIDGET_13: {
            ID:                    'Widget 13',
            DEFINITION:            'Widget roles %s be removed until the ARIA properties, states, focus management and keyboard support for widgets is fully understood by the developer.',
            SUMMARY:               'Remove widget roles',
            TARGET_RESOURCES_DESC: 'Elements widget roles',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Remove widget role from element until you are confident that you understand the ARIA properties, states, focus management and keyboard support needed by the widget.',
              FAIL_P:   'Remove widget role from the %N_F elements until you are confident that you understand the ARIA properties, states, focus management and keyboard support needed by the widget.',
              HIDDEN_S: 'The element with an widget role that is hidden and was not evaluated.',
              HIDDEN_P: '%N_H elements with widget roles that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements with widget toles on the page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:    'Remove @%1@ widget role from the %2 element.',
              ELEMENT_HIDDEN_1:  '@%1[role="%2"]@ was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Developers who are new to ARIA and do not completely understand how ARIA technologies can enhancing accessibility may.',
              'The improper use of ARIA roles leads to less accessibility due to conflicting accessibility information being represented in the accessibility APIs.',
              'The intention of the rule to discourage web developers form using widget roles until they fully understand how to use ARIA roles, properties, states, focus management and keyboard support.',
              'Once a developer is confident they understand how to implement ARIA enabled widgets that should use the WCAG + ARIA ruleset to evaluate the accessibility of their pages.'
            ],
            TECHNIQUES: [
              'Remove widget roles from elements, until the developer fully understands who to create accessibility widgets with ARIA roles, properties, states, focus management and keyboard support.',
              'Widget from javascript libraries that claim to support ARIA should be tested for correct use of ARIA roles, properties, states, focus management and keyboard support, since many javascript libraries using ARIA may be using it incorrectly, or updated to previously accessible libraries may have broken accessibility features.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Widget Roles',
                url:   'http://www.w3.org/TR/wai-aria/#widget_roles'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'WAI-ARIA 1.0 Authoring Practices: Tabindex for managing focus',
                url:   'http://www.w3.org/TR/2010/WD-wai-aria-practices-20100916/#kbd_focus'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G108: Using markup features to expose the name and role, allow user-settable properties to be directly set, and provide notification of changes',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G108'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'OAA Web Accessibility ARIA Examples',
                url:   'http://oaa-accessibility.org/examples/'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'Accessible jQuery-ui Components Demonstration',
                url:   'http://access.aol.com/aegis/#goto_slider'
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
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Alert Role',
                url:   'https://www.w3.org/TR/wai-aria/roles#alert'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Log Role',
                url:   'https://www.w3.org/TR/wai-aria/roles#log'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: Status Role',
                url:   'https://www.w3.org/TR/wai-aria/roles#status'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: aria-live',
                url:   'https://www.w3.org/TR/wai-aria/states_and_properties#aria-live'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: aria-atomic',
                url:   'https://www.w3.org/TR/wai-aria/states_and_properties#aria-atomic'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: aria-relevant',
                url:   'https://www.w3.org/TR/wai-aria/states_and_properties#aria-relevant'
              }

            ]
        }
    }
});
