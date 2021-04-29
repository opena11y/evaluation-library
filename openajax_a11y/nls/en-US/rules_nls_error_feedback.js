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
        ERROR_1: {
            ID:                    'Error 1',
            DEFINITION:            'Form controls with invalid values %s provide information to assitive technologies that the values are invalid.',
            SUMMARY:               'Information on invalid values',
            TARGET_RESOURCES_DESC: '@textarea@, @select@ and @input@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Change the value of @aria-invalid@ property to @true@, on form control that is invalid and @aria-invalid="false"@.',
              FAIL_P:   'Change the value of @aria-invalid@ property to @true@, on %N_F form controls that are invalid and @aria-invalid="false"@.',
              MANUAL_CHECK_S:     'If the form control can be validated make sure it indicates invalid values when invalid.',
              MANUAL_CHECK_P:     'If the %N_MC form controls can be validated make sure they indicates invalid values when invalid.',
              HIDDEN_S: 'The control element that is hidden does not need to be tested for indicating invalid values.',
              HIDDEN_P: 'The %N_H control elements that are hidden do not need to be tested for indicating invalid values.',
              NOT_APPLICABLE:  'No form controls on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:       '@%1@ is invalid (i.e. validity.valid property of the control is "false") change the value of "@aria-invalid@ attribute from @false@ to @true@.',
              ELEMENT_FAIL_2:       '@%1@ is valid (i.e. validity.valid property of the control is "true") change the value of "@aria-invalid@ attribute from @true@ to @false@.',
              ELEMENT_MC_1: '@%1@ is invalid (i.e. validity.valid property of the control is "false"), verify the label contains information on the value being invalid or add the @aria-invalid="true"@ attribute to the control.',
              ELEMENT_MC_2: '@%1@ is being tested for validity (i.e. @pattern@ attribute is present), verify the label contains information on the validity or add the @aria-invalid@ attribute to inidcate the state of validity of the control.',
              ELEMENT_MC_3: 'Verify if the @%1@ is being validated, if it is being validated verify it implements a technique to indicate the state of validity.',
              ELEMENT_PASS_1:         '@%1@ is invalid (i.e. validity.valid property of the control is "false") and the "@aria-invalid=true@" has been set.',
              ELEMENT_PASS_2:         '@%1@ is valid (i.e. validity.valid property of the control is "true") and the "@aria-invalid=false@" has been set.',
              ELEMENT_HIDDEN_1:       '%1 form control was not tested for indicating invalid values because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Users must be able to identify form control values which are invalid in order to successfully correct the values and submit the form.'
            ],
            TECHNIQUES: [
              'Add the text "invalid" to the label of the form control, the text can be placed off screen using CSS.',
              'Add the image to the label.  The image should be visible indicating an invalid value with the alt text \'invalid\'.',
              'Use @aira-invalid@ attribute to indicate the form control is invalid.'
            ],
            MANUAL_CHECKS: [
              'Enter invalid values into form controls that are validated and activate the validation event (i.e. form submission, change of focus...).',
              'For the form controls with invalid values check to make sure the technique for indicating the invalid value is present.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element',
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-invalid',
                url:   'http://www.w3.org/TR/wai-aria/#aria-invalid'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA21: Using Aria-invalid to Indicate An Error Field',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA21'
              }
            ]
        },
        ERROR_2: {
            ID:                    'Error 2',
            DEFINITION:            'If user input is required for a form control the @required@ or @aria-required@ attribute %s must used.',
            SUMMARY:               'Required form controls',
            TARGET_RESOURCES_DESC: '@textarea@ and @input[type="text"]@ elements, and ARIA textbox, gridcell and combobox widgets',
            RULE_RESULT_MESSAGES: {
              FAIL_S:         'Update the form control with @aria-required="false"@ and the @required@ attributes to indicate the true required state of the control.',
              FAUL_P:         'Update the %N_F form controls with @aria-required="false"@ and the @required@ attributes to indicate the true required state of the control.',
              MANUAL_CHECK_S: 'If the form control is required, add the @required@ attribute or if HTML4 compatibility is required the @aria-required="true"@ attribute.',
              MANUAL_CHECK_P: 'If any of the %N_F form controls are required, add the @required@ attribute or if HTML4 compatibility is required the @aria-required="true"@ attribute.',
              HIDDEN_S:       'The form control element that is hidden does not need to be tested for being required.',
              HIDDEN_P:       'The %N_H form control elements that are hidden do not need to be tested for being required.',
              NOT_APPLICABLE: 'No form controls on this page that need testing for being required.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_FAIL_1:   'If the @input[type="%1"]@ element with the attribute @aria-required="false"@ which conflicts with presence of the @required@ attribute.',
              ELEMENT_PASS_1:   'If the @input[type="%1"]@ element has the @required@ attribute.',
              ELEMENT_PASS_2:   'If the @input[type="%1"]@ element has the @aria-required@ attribute.',
              ELEMENT_PASS_3:   'If the %1 element has the @required@ attribute.',
              ELEMENT_PASS_4:   'If the %1 element has @aria-required@.',
              ELEMENT_MC_1:     'If the @input[type="%1"]@ element is a required, add the @required@ attribute to the control.',
              ELEMENT_MC_2:     'If the %1 element is a required, add the @required@ attribute to the control.',
              ELEMENT_HIDDEN_1: 'The @input[type="%1"]@ element was not tested because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2: 'The @%1@ element was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Users benefit from information being informed if a input to a control is required for form submission or task completion.'
            ],
            TECHNIQUES: [
              'To identify a required form control, add the HTML5 @required@ attribute to the standard form controls.',
              'If compatibility with HTML4 standards or legacy browsers and assistve technologies, you can also use @aria-required="true"@ to indicate a form control is required.',
              'Use the @required@ attribute (or the @aria-required@ if used) as the CSS selector for visually styling the form control as required.  This ensures that the visual state stays synchronized with the accessibility API state used by assistive technologies.',
              'The only reason to support both @required@ and @aria-required@ on the same form control is to support legacy browsers and assistive technologies.  This required extra care to make sure the two values do not conflict.  If they do conflict the @required@ attribute will override the @aria-required@ property value.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML5: required attribute',
                url:   'http://www.w3.org/TR/html5/forms.html#attr-input-required'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-required',
                url:   'http://www.w3.org/TR/wai-aria/#aria-required'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA2: Identifying a required field with the aria-required property',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA2'
              }
            ]
        },
        ERROR_3: {
            ID:                    'Error 3',
            DEFINITION:            'If user input is required for a widget the @aria-required@ attribute %s must used.',
            SUMMARY:               'Required widgets',
            TARGET_RESOURCES_DESC: '@textarea@ and @input[type="text"]@ elements, and ARIA textbox, gridcell and combobox widgets',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'If the widget is required use @aria-required="true"@ attribute.',
              MANUAL_CHECK_P: 'If any of the %N_F widgets are required, use the @aria-required="true"@ attribute.',
              HIDDEN_S:       'The widget that is hidden does not need to be tested for being required.',
              HIDDEN_P:       'The %N_H widget elements that are hidden do not need to be tested for being required.',
              NOT_APPLICABLE: 'No widgets on this page that need testing for being required.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:   'The @%1[role="%2"]@ widget is identified as required though the use of @aria-required="true"@ attribute.',
              ELEMENT_MC_1:     'If the @%1[role="%2"]@ widget is a required, add the @aria-required="true"@ attribute to the control.',
              ELEMENT_HIDDEN_1: 'The @%1[role="%2"]@ element was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Users benefit from information being informed if a input to a widget is required for form submission or task completion.'
            ],
            TECHNIQUES: [
              'To identify a required widget, add the ARIA @aria-required="true"@ attribute to the widget.',
              'Use the @aria-required@ attribute as the CSS selector for visually styling the widget as required.  This ensures that the visual state stays synchronized with the accessibility API state used by assistive technologies.',
              'Note the the HTML5 @required@ attribute CANNOT be used to indicate that a widget is required, the @requiured@ attribute can only be used on HTML5 defined form controls.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-required',
                url:   'http://www.w3.org/TR/wai-aria/#aria-required'
              }
            ]
        },
        ERROR_4: {
            ID:                    'Error 4',
            DEFINITION:            'When input error is automatically detected and suggestions are automatically known, the suggestions %s be provided to the user (some exceptions).',
            SUMMARY:               'Error correction suggestions',
            TARGET_RESOURCES_DESC: '@textarea@ and @input[type="text"]@ elements, and ARIA textbox, gridcell and combobox widgets',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'If the form control element or widget can automatically detect errors and suggest corrections, make sure that at least one accessible technique is used to present the suggestion to the user.',
              MANUAL_CHECK_P: 'If the %N_MC form control elements and/or widgets can automatically detect errors and suggest corrections, make sure that at least one accessible technique is used to present the suggestion to the user.',
              HIDDEN_S:       'The form control element and/or widget that is hidden does not need to be tested for accessible suggestions.',
              HIDDEN_P:       'The %N_H form control elements and/or widgets that are hidden does not need to be tested for accessible suggestions.',
              NOT_APPLICABLE: 'No form controls or widgets on this page that typically can provide suggestions.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:     'If the @input[type="%1"]@ element can automatically detect errors and suggest corrections, use at least one accessible technique to provide the information to users.',
              ELEMENT_MC_2:     'If the @%1@ element can automatically detect errors and suggest corrections, use at least one accessible technique to provide the information to users.',
              ELEMENT_MC_3:     'If the @%1@ widget can automatically detect errors and suggest corrections, use at least one accessible technique to provide the information to users.',
              ELEMENT_HIDDEN_1: 'The @input[type="%1"]@ element was not tested because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_2: 'The @%1@ element was not tested because it is hidden from assistive technologies.',
              ELEMENT_HIDDEN_3: 'The @%1@ widget was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'Users benefit from being informed of invalid input and on how to correct invalid input.'
            ],
            TECHNIQUES: [
              'Add @aria-describedby@ reference on the form control or widget to the suggestion information.',
              'Use a popup list to provide suggested values for valid input.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HTML 4.01 Specification: The @label@ element',
                url:   'http://www.w3.org/TR/html4/interact/forms.html#edef-LABEL'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.0: aria-invalid',
                url:   'http://www.w3.org/TR/wai-aria/#aria-invalid'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'H44: Using label elements to associate text labels with form controls',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/H44'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA1: Using the aria-describedby property to provide a descriptive label for user interface controls',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA1.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'ARIA19: Using ARIA role=alert or Live Regions to Identify Errors',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/ARIA19.html'
              }             ]
        },
        ERROR_5: {
            ID:                    'Error 5',
            DEFINITION:            'To prevent errors when input includes legal and/or financial transactions (e.g. online shopping, banking), the user %s be able to either reverse, check or confirm the data before the transaction is finalized.',
            SUMMARY:               'Prevent errors',
            TARGET_RESOURCES_DESC: 'Forms that contain legal or financial transactions including online purchases',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S: 'If the form control or widget on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
              MANUAL_CHECK_P: 'If the %N_MC form controls and widgets on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
              HIDDEN_S:       'The form control element and/or widget that is hidden does not need to be tested for accessible suggestions.',
              HIDDEN_P:       'The %N_H form control elements and/or widgets that are hidden does not need to be tested for accessible suggestions.',
              NOT_APPLICABLE: 'No form controls or widgets on this page that typically can provide suggestions.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:     'If the form control or widget is used as part of a legal and/or financial transaction, make sure the information this control provides can be changed and/or confirmed before the transaction is finalized.',
              PAGE_MC_1:        'If form controls and widgets on this page are used for legal and/or financial transactions, make sure the actions are either reversible or requires the user to confirm the information before the transaction is finalized.',
              ELEMENT_HIDDEN_1: 'The form control or widget was not tested because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The intent of this rule is to help users with disabilities avoid serious consequences as the result of a mistake when performing an action that cannot be reversed. For example, purchasing non-refundable airline tickets or submitting an order to purchase stock in a brokerage account are financial transactions with serious consequences.'
            ],
            TECHNIQUES: [
              'Provide a confirmation page showing all the user inputs before for final submission of the information for modification of user controlled data on a server.',
              'Provide a means for the user to review previous submissions and give them the ability to cancel or modify previous submissions of legal or financial information.',
              'Use a confirmation checkbox in addition to the submit button, to require the user to confirm the data is valid before submission.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'Understanding SC 3.3.4 Error Prevention (Legal, Financial, Data.)',
                url:   'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-reversible.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G164: Providing a stated time within which an online request (or transaction) may be amended or canceled by the user after making the request.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G164'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G98: Providing the ability for the user to review and correct answers before submitting.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G98'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G155: Providing a checkbox in addition to a submit button.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G155'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G99: Providing the ability to recover deleted information.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G99'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G168: Requesting confirmation to continue with selected action.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G168'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G155: Providing a checkbox in addition to a submit button.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G155'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G98: Providing the ability for the user to review and correct answers before submitting.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G98'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: ' G168: Requesting confirmation to continue with selected action.',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G168'
              }
            ]
        }
    }
});
