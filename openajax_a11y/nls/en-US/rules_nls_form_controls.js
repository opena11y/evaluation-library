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
        CONTROL_1: {
            ID:         'Control 1',
            DEFINITION: 'Each @input@, @select@, @textarea@, @progress@, @meter@ and @output@ element %s have an accessible label.',
            SUMMARY:    'Form controls %s have labels',
            TARGET_RESOURCES_DESC: '@input@, @select@, @textarea@, @progress@, @meter@ and @output@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add a label to the form control element that is unlabelled.',
              FAIL_P:   'Add labels to the %N_F form control elements that are unlabelled.',
              NOT_APPLICABLE: 'No @input@, @select@, @textarea@, @progress@, @meter@ or @output@ elements on the page.',
              HIDDEN_S: 'One form control element that is hidden was not evaluated.',
              HIDDEN_P: '%N_H form control elements that are hidden were not evaluated.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   '@%1@ control has the label: \'%2\'',
              ELEMENT_FAIL_1:   'Add label to @%1@ control.',
              ELEMENT_HIDDEN_1: '@%1@ control was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A label associated with a form control ensures that information about the form control is spoken by screen readers when it receives focus.'
            ],
            TECHNIQUES: [
              'The preferred technique for labeling form controls is by reference: First, include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.',
              'An alternative technique is to use the @label@ element to encapsulate the form control element.',
              'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
              'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.',
              'In special cases, the @title@ attribute on the form control element can be used to provide an explicit text description of its purpose.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
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
                title: 'HTML 4.01 Specification: The @title@ attribute',
                url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H65'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H71'
              }
            ]
        },
        CONTROL_2: {
            ID:         'Control 2',
            DEFINITION: 'Every @input@ type @image@ element %s have an @alt@ or @title@ attribute with content.',
            SUMMARY:    'Image button %s have alt. content',
            TARGET_RESOURCES_DESC: '@input[type="image"]@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add an @alt@ attribute to the @input[type="image"]@ element that does not have alt. content.',
              FAIL_P:   'Add an @alt@ attribute to the %N_F @input[type="image"]@ elements that do not have alt. content.',
              HIDDEN_S: 'The @input@ type @image@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @input@ type @image@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @input[type="image"]@ elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: 'Image button has an accessible name: %1',
              ELEMENT_FAIL_1: 'Add @alt@ attribute with text content.',
              ELEMENT_FAIL_2: 'Add text content to the @alt@ attribute.',
              ELEMENT_HIDDEN_1: 'Image button was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Alternate content associated with an image-based form control ensures that information about the control is spoken by screen readers when it receives focus.'
            ],
            TECHNIQUES: [
              'The @alt@ attribute is the preferred and most commonly used way to provide an accessible label for @input@ type @image@ elements.',
              'In special cases, the @title@ attribute can be used on the @input@ type @image@ element to provide an explicit text description of its purpose.',
              'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
              'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @input[type=image]@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#adef-type-INPUT'
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
                title: 'HTML 4.01 Specification: The @title@ attribute',
                url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H36: Using alt attributes on images used as submit buttons',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H36'
              }
            ]
        },
        CONTROL_3: {
            ID:         'Control 3',
            DEFINITION: 'A related group of radio buttons %s have a grouping label.',
            SUMMARY:    'Radio buttons %s have grouping label',
            TARGET_RESOURCES_DESC: '@input[type="radio"]@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add a @fieldset@ container with a @legend@ label for the @input[type="radio"]@ element NOT in a grouping container.',
              FAIL_P:   'Add a @fieldset@ container with a @legend@ label for each group of the %N_F @input[type="radio"]@ elements NOT in a grouping container.',
              HIDDEN_S: 'The @input[type="radio"]@ that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @input[type="radio"]@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @input[type="radio"]@ elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: 'Radio button has grouping label "%1" from @fieldset/legend@ elements.',
              ELEMENT_PASS_2: 'Radio button has grouping label "%2" from @%1[role=group]@ element.',
              ELEMENT_FAIL_1: 'Add a @fieldset@ element with a @legend@ element to provide a grouping label for the radio buttons.',
              ELEMENT_FAIL_2: 'The @fieldset@ element has a missing or empty @legend@ element.',
              ELEMENT_FAIL_3: 'The @%1[role=group]@ grouping element does not have an accessible name.',
              ELEMENT_HIDDEN_1: 'Radio button was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Radio buttons that provide a set of related options need grouping information and a common grouping label to provide the overall context for those options.',
              'Screen readers treat grouping labels differently than standard labels, typically speaking the grouping label only once when focus is first moved to one the groups controls.'
            ],
            TECHNIQUES: [
              'The @fieldset@/@legend@ element combination is the preferred technique for providing a grouping information and label for a related group of radio buttons.',
              'If the @fieldset@/@legend@ technique cannot be used, use @[role=group]@ on a container element that contains the related radio buttons, and the container element must have an accessible name representing the grouping label.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @fieldset@ and @legend@ elements',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.2: The @group@ role',
                url:   'https://www.w3.org/TR/wai-aria-1.2/roles#group'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.EXAMPLE,
                title: 'IBM Web checklist: HTML example 6',
                url:   'https://www-03.ibm.com/able/guidelines/web/webstructure.html'
              }
            ]
        },
        CONTROL_4: {
            // TODO: Question: What if button only contains img elements with alt. text?
            ID:         'Control 4',
            DEFINITION: '@button@ elements %s have text content.',
            SUMMARY:    '@button@s %s have content',
            TARGET_RESOURCES_DESC: '@button@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add descriptive text content to the @button@ element.',
              FAIL_P:   'Add descriptive text content to %N_F @button@ elements.',
              HIDDEN_S: 'The @button@ that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @button@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @button@ elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@button@ element has text content.',
              ELEMENT_FAIL_1: 'Add text content to the @button@ element.',
              ELEMENT_HIDDEN_1: '@button@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The text content of a @button@ element is used as its label, and ensures that the purpose of the button is spoken by screen readers when the button receives focus.'
            ],
            TECHNIQUES: [
              'The accessible label of a @button@ element includes its text content along with the @alt@ attribute content of any image elements it contains.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @button@ elements',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-BUTTON'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              }
            ]
        },
        CONTROL_5: {
            ID:         'Control 5',
            DEFINITION: 'All @id@ attribute values %s be unique on the page.',
            SUMMARY:               '@id@ %s be unique',
            TARGET_RESOURCES_DESC: 'Form control elements with @id@ attributes',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update elements with @id@ attributes so that each attribute value is unique.',
              FAIL_P:   'Update elements with @id@ attributes so that each attribute value is unique.',
              HIDDEN_S: 'The element with an @id@ attribute that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H elements with @id@ attributes that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements or only one element with an @id@ attribute on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '\'%1\' @id@ attribute value is unique.',
              ELEMENT_FAIL_1: '@%1@ element shares the \'%2\' @id@ value with another element on the page.',
              ELEMENT_FAIL_2: 'The hidden @%1@ element shares the \'%2\' @id@ value with another element on the page.',
              ELEMENT_HIDDEN_1: '%1 element with @id@ attribute was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              '@id@ attribute values on form control elements can be used as references by @label@ elements. When @id@ attribute values on the page are not unique, form controls may be incorrectly labelled.',
              '@aria-labelledby@ and @aria-describedby@ atributes also depend on unique @id@ values for labeling and adding descriptions to form controls.'
            ],
            TECHNIQUES: [
              'If a form control defines an @id@ attribute, ensure that its value is unique on the page.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: @id@ attribute',
                url:   'https://www.w3.org/TR/html4/struct/global.html#adef-id'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F77: Failure of Success Criterion 4.1.1 due to duplicate values of type ID',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/F77'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H88: Using HTML according to spec',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H88'
              }
            ]
        },
        CONTROL_6: {
            ID:         'Control 6',
            DEFINITION: 'Each @label@ element using the @for@ attribute %s reference a form control on the page.',
            SUMMARY:    '@label@ %s reference control',
            TARGET_RESOURCES_DESC: '@label@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change the @label@ element to use the @for@ attribute to label its form control.',
              FAIL_P:   'Change the %N_F @label@ elements to use the @for@ attribute to label their respective form controls.',
              MANUAL_CHECK_S: 'There is one form control being labeled by more than one labeling technique.',
              MANUAL_CHECK_P: 'There are %N_MC form controls being labeled by more than one labeling technique.',
              HIDDEN_S: 'The @label@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @label@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No visible @label@ elements with invalid @for@ references on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@label[for=%1]@ references a form control.',
              ELEMENT_FAIL_1: 'Change the @label@ element with the @for@ attribute value \'%1\' to reference a form control.',
              ELEMENT_MC_1:   'The @label[for=%1]@ is being ingored as a label because the form control is being labeled with @aria-labelledby@ or @aria-label@ attribute.',
              ELEMENT_HIDDEN_1: 'The @label@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              '@label@ elements are useful for accessibility only when they reference or encapsulate form controls.'
            ],
            TECHNIQUES: [
              'For a @label@ element to properly reference a form control, ensure that the @for@ attribute value on the @label@ element exactly matches the @id@ attribute value on the form control.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element FOR attribute',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H44'
              }
            ]
        },
        CONTROL_7: {
            ID:         'Control 7',
            DEFINITION: 'Every @label@ and @legend@ element %s contain text content.',
            SUMMARY:    '@label@ %s have content',
            TARGET_RESOURCES_DESC: '@label@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add text content to the @label@ or @legend@ element that describes the purpose of the form control or group of form controls, or remove the element if it is not needed for labeling.',
              FAIL_P:   'Add text content to the %N_F @label@ or @legend@ elements that describes the purpose of the form control or group of form controls, or remove the element(s) if they are not needed for labeling.',
              HIDDEN_S: 'One @label@ or @legend@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @label@ or @legend@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @label@ or @legend@ elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@%1@ has text content.',
              ELEMENT_FAIL_1: 'Add text content to the @%1@ element, or if it is unneeded, remove it from the page.',
              ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'A @label@ or @legend@ elements is only useful for accessibility when it contains content that describes the purpose of the associated form control(s).'
            ],
            TECHNIQUES: [
              'Add text content to @label@ and @legend@ elements that describes the purpose of the form control or group of form controls.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element @for@ attribute',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#adef-for'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using @label@ elements to associate text labels with form controls',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H88: Using HTML according to spec',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H88'
              }
            ]
        },
        CONTROL_8: {
            ID:         'Control 8',
            DEFINITION: 'Every @fieldset@ element %s contain exactly one @legend@ element.',
            SUMMARY:    '@fieldset@ %s have one @legend@',
            TARGET_RESOURCES_DESC: '@fieldset@ and @legend@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update the @fieldset@ element such that it contains only one @legend@ element.',
              FAIL_P:   'Update %N_F @fieldset@ elements such that each contains only one @legend@ element.',
              HIDDEN_S: 'One @fieldset@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @fieldset@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @fieldset@ elements on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@fieldset@ has one @legend@ element.',
              ELEMENT_FAIL_1: 'Add @legend@ element.',
              ELEMENT_FAIL_2: 'Remove %1 @legend@ elements.',
              ELEMENT_FAIL_3: '@legend@ element is hidden from assistive technologies. Use CSS off-screen positioning instead of CSS display or visibility properties to remove @legend@ from graphical rendering.',
              ELEMENT_HIDDEN_1: '@fieldset@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Multiple @legend@ elements contained in the same @fieldset@ may result in the improper calculation of labels for assistive technologies.'
            ],
            TECHNIQUES: [
              'A @fieldset@ element should have one and only one @legend@ element to describe the purpose of the form controls it contains.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H71'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H88: Using HTML according to spec',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H88'
              }
            ]
        },
        CONTROL_9: {
            ID:         'Control 9',
            DEFINITION: 'Verify that the @title@ attribute content serves as an appropriate label for the form control, and not only as a tooltip.',
            SUMMARY:    'Verify @title@ is the label.',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'Verify that the @title@ attribute is an appropriate label for the form control, and that it is not being used only as a tooltip.',
              MANUAL_CHECK_P: 'Verify that the @title@ attribute is an appropriate label for each of the %N_F form controls, and that it is not being used only as a tooltip.',
              HIDDEN_S: 'The form control element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H form control elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No @textarea@, @select@ or @input@ elements on this page with a @title@ attribute.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: '@title@ is not used as label.',
              ELEMENT_MC_1:   'If possible use the @label@ element or an ARIA technique to label %1 form control instead of using the @title@ attribute.',
              ELEMENT_HIDDEN_1: '@%1@ element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'When the @title@ attribute is used for tooltips, it often uses more words than needed to label a form control for users of assistive technologies.',
              'Use @aria-label@ to provide a shorter label to users of assistive technologies if the @title@ attribute content is determined not to be an optimal label.'
            ],
            TECHNIQUES: [
              'The preferred technique for labeling form controls is to use the @label@ element and its @for@ attribute to reference the @id@ attribute value of the form control element.',
              'An alternative technique is to use the @label@ element to encapsulate the form control element.',
              'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
              'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.',
              'The @title@ attribute will be used as the last resort to provide a label for the form control.'
            ],
            MANUAL_CHECKS: [
              'If the @title@ attribute is the labeling technique of last resort, use other form labeling techniques.',
              'Reserve the @title@ attribute for tooltips if they are needed for your form.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: Adding structure to forms: the @fieldset@ and @legend@ elements',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-FIELDSET'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H88: Using HTML according to spec',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H88'
              }
            ]
        },
        CONTROL_10: {
            ID:         'Control 10',
            DEFINITION: 'Each standard HTML form control and ARIA widget role must have a label that is unique on the page.',
            SUMMARY:    'Labels %s be unique',
            TARGET_RESOURCES_DESC: '@select@, @textarea@ and @input@ elements of type @text@, @password@, @checkbox@, @radio@, @file@ and aria widget roles',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update the labels for the %N_F form controls and ARIA widgets with duplicate labels to uniquely identify the purpose of each control on the page.',
              FAIL_P:   'Update the labels for the %N_F form controls and ARIA widgets with duplicate labels to uniquely identify the purpose of each control on the page.',
              HIDDEN_S: 'The form control or ARIA widget element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H form control and/or ARIA widget elements or widgets that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No form controls or only one form control on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1: 'Label is unique.',
              ELEMENT_FAIL_1: 'Change the @label@ element content, use @fieldset@ and @legend@ elements or an ARIA technique to make the label text content unique on the page.',
              ELEMENT_HIDDEN_1: '%1 control element was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page.'
            ],
            TECHNIQUES: [
              'The preferred technique for labeling standard HTML form controls is by reference: First, include an @id@ attribute on the form control to be labeled; then use the @label@ element with a @for@ attribute value that references the @id@ value of the control.',
              'An alternative technique for standard HTML form controls is to use the @label@ element to encapsulate the form control element.',
              'The @fieldset@ and @legend@ elements can be used add a grouping label to the form controls contained in the @fieldeset@ element.',
              'For ARIA widgets and special cases of standard HTML form controls, the @aria-labelledby@ attribute can be used to reference the id(s) of the elements on the page that describe its purpose.',
              'For ARIA widgets and special cases of standard HTML form controls, the @aria-label@ attribute can be used to provide an explicit text description of its purpose.',
              'For ARIA widgets and special cases of standard HTML form controls, the @title@ attribute can be used to provide an explicit text description of its purpose.',
              'For @input[type=submit]@ the default label is "Submit", but the label can be changed using other labeling techniques if there is more than one submit button on the page.',
              'For @input[type=reset]@ the default label is "Reset", but the label can be changed using other labeling techniques if there is more than one reset button on the page.',
              'For @input[type=image]@ the default label is defined using the @alt@ attribute.',
              'For @input[type=button]@ the default label is defined using the @value@ attribute.',
              'For the @button@ element, the child text content can be used to define its purpose.',
              'For some ARIA widgets (e.g. @menuitem@, @tab@, @treeitem@), the child text content can be used to define its purpose.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
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
                title: 'HTML 4.01 Specification: The @title@ attribute',
                url:   'https://www.w3.org/TR/html4/struct/global.html#adef-title'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H65: Using the title attribute to identify form controls when the label element cannot be used',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H65'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H71: Providing a description for groups of form controls using fieldset and legend elements',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H71'
              }
            ]
        },
        CONTROL_11: {
            ID:         'Control 11',
            DEFINITION: 'If there is more than one form on a page, each submit and reset button %s have a unique label.',
            SUMMARY:    'Submit and reset button labels %s be unique',
            TARGET_RESOURCES_DESC: 'submit and reset buttons',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change the labeling of the submit or reset button to uniquely identify which form on the page will be sumnitted or reset on the page.',
              FAIL_P:   'Change the labeling of the %N_F submit or reset buttons to uniquely identify which form on the page will be sumnitted or reset on the page.',
              HIDDEN_S: 'The submit or reset button that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H submit and/or reset buttons that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No forms or only one form with submit or reset buttons on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1: 'Change the text content of the @button@ element to create a unique label, or use @aria-label@ or @aria-labelledby@ to make the @%1@ button accessible names unique on the page.',
              ELEMENT_FAIL_2: 'Change the @value@ attribute of the @input@ element to create a unique label, or use @aria-label@ or @aria-labelledby@ to make the @%1@ button accessible names unique on the page.',
              ELEMENT_HIDDEN_1: '@%1@ button was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Labels that are unique make it possible for people to understand the different purposes of form controls on the same page.',
              '@submit@ and @reset@ form controls have default labels and if these are present on more than one form on a page, the user may not understand which form they are submitting.'
            ],
            TECHNIQUES: [
              'The preferred technique for changing the default label for @submit@ and @reset@ controls is the @value@ attribute.',
              'In special cases, the @aria-labelledby@ attribute can be used on the form control element to reference the id(s) of the elements on the page that describe its purpose.',
              'In special cases, the @aria-label@ attribute can be used on the form control element to provide an explicit text description of its purpose.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @form@ element',
                url:   'https://www.w3.org/TR/html4/interact/forms.html#edef-FORM'
              },
              {type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'W3C WAI Accessibility Tutorials: Forms Concepts',
                url: 'https://www.w3.org/WAI/tutorials/forms/'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'https://www.w3.org/TR/WCAG20-TECHS/H44'
              },
            ]
        }    }
});
