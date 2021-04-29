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
        LAYOUT_1: {
            ID:                    'Layout 1',
            DEFINITION:            'Layout tables %s organize content in a meaningful sequence.',
            SUMMARY:               'Layout tables %s have meaningful sequence',
            TARGET_RESOURCES_DESC: '@table@ elements used for layout',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:    'Verify document has a meaningful sequence when layout table markup is disabled.  If content does not have a meaningful sequence, reorganize content on the page to have a meaningful sequence when layout tables are disabled.',
              HIDDEN_S:          'One @table@ element that is hidden was not evaluated.',
              HIDDEN_P:          '%N_H @table@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE: 'No layout tables found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              PAGE_PASS_1:      'Page does not have any tables or layout tables are only one column wide.',
              PAGE_MC_1:        '%1 tables being used for layout were found, verify the page has a meaningful sequence of content when table markup is disabled.',
              ELEMENT_PASS_1:   'Table is one column wide, and will have the same document sequence when table markup is disabled.',
              ELEMENT_MC_1:     'Verify document has a meaningful sequence of content when layout table markup is disabled.',
              ELEMENT_MC_2:     'Verify the content in the %1x%2 layout table has a meaningful sequence of content when table markup is disabled, if the table is actually a data table add data table markup to give the table an effective caption and the data tables headings.',
              ELEMENT_MC_3:     'Verify the nesting of tables for layout of content maintains a meaningful sequence of content when table markup is disabled.',
              ELEMENT_HIDDEN_1: 'Meaningful sequence was not tested The layout @table@ is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The sequence of the content (i.e. reading order) in a web page affects the conveyed meaning, especially for users of assistive technologies who cannot see the relationships between sections of content as provided by the visual cues in a graphical layout.',
              'Using table markup for page layout is one way in which the DOM order of web content can be altered such that it makes sense visually, but the reading order rendered by assistive technologies is no longer meaningful.'
            ],
            TECHNIQUES: [
              'Use CSS and web standards techniques for the coding of content, and the graphical styling and positioning of content.',
              'Avoid using table markup for graphical layout, if you do use tables for layout make sure the content still is meaningful when the table markup is disabled.',
              'Avoid using nested tables for layout, the deeper the level of nesting the more chance there of having a confusing sequence of content.',
              'Tables that are used for layout should use only @tr@ and @td@ elements, and the @table@, @tr@ and @td@ elements should have a @role="presentation"@ attribute to clearly indicate the table markup is being used for layout.'
            ],
            MANUAL_CHECKS: [
              'Use browser developer tools to disable table markup or enable a user stylesheet to change table cells to be rendered as block level elements.',
              'With layout tables disabled, view the content to make sure the reading order and structure of the document makes sense.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification: Visual formatting model',
                url:   'http://www.w3.org/TR/CSS21/visuren.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'G57: Ordering the content in a meaningful sequence',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/G57'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'C6: Positioning content based on structural markup',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/C6'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'C8: Using CSS letter-spacing to control spacing within a word',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/C8'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'C27: Making the DOM order match the visual order',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/C27'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F1: Failure of Success Criterion 1.3.2 due to changing the meaning of content by positioning information with CSS',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F1'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F33: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to create multiple columns in plain text content',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F33'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F34: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to format tables in plain text content',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F34'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F49: Failure of Success Criterion 1.3.2 due to using an HTML layout table that does not make sense when linearized',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F49'
              },
              { type:  OpenAjax.a11y.REFERENCES.OTHER,
                title: 'Web Standards Group',
                url:   'http://webstandardsgroup.org/standards/'
              },
              { type:  OpenAjax.a11y.REFERENCES.OTHER,
                title: 'W3C Standards',
                url:   'http://www.w3.org/standards/'
              }
            ]
        },
        LAYOUT_2: {
            ID:                    'Layout 2',
            DEFINITION:            'Tables %s not be nested for layout of content.',
            SUMMARY:               'Do not nest layout tables',
            TARGET_RESOURCES_DESC: '@table@ elements used for layout',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Update the markup and CSS on this page to remove the nesting of the layout table that is nested.',
              FAIL_P:   'Update the markup and CSS on this page to remove the nesting of %N_F layout tables that are nested.',
              HIDDEN_S: 'One table element that is hidden was not evaluated.',
              HIDDEN_P: '%N_H table elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No table elements used for layout.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:    'Table is not nested with another layout table.',
              ELEMENT_PASS_2:    'Table is one column wide, and will have the same document sequence when table markup is disabled.',
              ELEMENT_FAIL_1:  'Update the markup and CSS on this page to remove the nesting of this layout table.',
              ELEMENT_HIDDEN_1:  'Table nesting was not tested beacuse the @table@ is hidden from assistive technology.'
            },
            PURPOSE: [
              'The sequence of content (i.e. order) in the document code affects its meaning, nesting layout tables often makes the sequence of content less understandable.'
            ],
            TECHNIQUES: [
              'Use CSS and web standards techniques for the coding of content, and the graphical styling and positioning of content.',
              'Avoid using table markup for graphical layout, if you do use tables for layout make sure the content still is meaningful when the table markup is disabled.',
              'Avoid using nested tables for layout, the deeper the level of nesting the more chance there of having a confusing sequence of content.',
              'Tables that are used for layout should use only @tr@ and @td@ elements, and the @table@, @tr@ and @td@ elements should have a @role="presentation"@ attribute to clearly indicate the table markup is being used for layout.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification: Visual formatting model',
                url:   'http://www.w3.org/TR/CSS21/visuren.html'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F33: Failure of Success Criterion 1.3.1 and 1.3.2 due to using white space characters to create multiple columns in plain text content',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F33'
              },
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'F49: Failure of Success Criterion 1.3.2 due to using an HTML layout table that does not make sense when linearized',
                url:   'http://www.w3.org/TR/WCAG20-TECHS/F49'
              },
              { type:  OpenAjax.a11y.REFERENCES.OTHER,
                title: 'Web Standards Group',
                url:   'http://webstandardsgroup.org/standards/'
              },
              { type:  OpenAjax.a11y.REFERENCES.OTHER,
                title: 'W3C Standards',
                url:   'http://www.w3.org/standards/'
              }
            ]
        },
        LAYOUT_3: {
            ID:                    'Layout 3',
            DEFINITION:            'Verify that the use of the @aria-flowto@ attribute supports the intended reading order of content on the page.',
            SUMMARY:               'Verify @aria-flowto@ supports reading order',
            TARGET_RESOURCES_DESC: 'Elements with @aria-flowto@ attribute',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:    'Verify the element with the @aria-flowto@ attribute contributes to the intended reading order of content on the page.',
              MANUAL_CHECK_P:    'Verify the %N_MC elements with the @aria-flowto@ attributes contribute to the intended reading order of content on the page.',
              HIDDEN_S:          'One element with @aria-flowto@ attribute that is hidden was not evaluated.',
              HIDDEN_P:          '%N_H elements with @aria-flowto@ attribute that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No elements with @aria-flowto@ attribute found.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1:     'Verify the content reflow defined by the @aria-flowto@ attribute on the  @%1@ element creates a meaningful reading order.',
              ELEMENT_HIDDEN_1: '@%1@ element with @aria-flowto@ attribute was not evaluated because it is hidden from assistive technologies.'
            },
            PURPOSE: [
              'The reading order of content on the page can, in some cases, be made easier to understand by users of assistive technology with the use of @aria-flowto@.',
              'By default the reading order used by assisitive technologies is the same as the DOM ordering of content.',
              'When the DOM order of content is interspersed with unrelated content, @aria-flowto@ can be used to keep related content together.  For example a multi-column newspaper where an article spans several columns, @aria-flowto@ can be used to make it look like one continuous column to assistive technology.',
              'The @aria-flowto@ reorganizes the content by changing the order of how the content is represented in accessibility Application Programming Interfaces (APIs) used by operating systems to communicate to screen readers.'
            ],
            TECHNIQUES: [
              'The @aria-flowto@ attribute value contains a sequence of @idrefs@ that changes the reading order of content on the page as rendered by assistive technologies.',
              'Since @aria-flowto@ changes reading order to assistive technologies, it is important to read the page with a screen reader to verify the content affected by the @aria-flowto@ places related information in the proper sequence.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (WAI-ARIA) 1.1 Specification: flowto property',
                url:   'https://www.w3.org/TR/wai-aria/states_and_properties#aria-flowto'
              }
            ]
        }
   }
});
