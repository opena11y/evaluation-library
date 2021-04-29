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
    //  OAA Rules title and message string National Language Support (NLS) for sensory rules
    //
    rules: {
        SENSORY_1: {
            ID:                    'Sensory 1',
            DEFINITION:            'Understanding and operating on content on the page %s not rely solely on the shape, size, visual location, orientation, or sound.',
            SUMMARY:               'Not only shape, size and location',
            TARGET_RESOURCES_DESC: 'Images used for links and controls',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
            },
            PURPOSE:        [ 'People with visual impairments and learning disabilities that affect the visual processing of information may not be able to perceive the content or identify the purpose of links and controls.',
                              'People with hearing impairments and learning disabilities that affect the auditory processing of information may not be able to perceive the content or identify the purpose of links and controls.'
                            ],
            TECHNIQUES:     [ 'Provide redundant text labels and references in addition to references to shape, size, visual location or sound.'
                            ],
            MANUAL_CHECKS:  [ 'Verify that understanding the content, navigation of links and operation of controls and widgets does not depend solely on the shape, size, visual location, orientation, or sound.'
                            ],
            INFORMATIONAL_LINKS: [{ type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                               title: 'WCAG 2.0 Success Criterion 1.3.3 Sensory Characteristics',
                               url:   'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding'
                             },
                             { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                               title: 'How to meet Success Criterion 1.3.3 Sensory Characteristics',
                               url:   'http://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-understanding'
                             }
                            ]
        }
    }
});
