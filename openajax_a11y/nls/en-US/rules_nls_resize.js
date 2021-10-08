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
    //  OAA Rules National Language Support (NLS) for Audio Rules
    //
    rules: {
        RESIZE_1: {
            ID:                    'Resize 1',
            DEFINITION:            'When the text of a page is resized the text content %s reflow to fill available view and all text content should remain visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).',
            SUMMARY:               'Resize text content',
            TARGET_RESOURCES_DESC: 'All pages',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:  'Resize the text using the zoom feature of the browser to check to make sure text content is visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).'
            },
            NODE_RESULT_MESSAGES: {
              PAGE_MC_1:      'Resize the text using the zoom feature of the browser to check to make sure text content is visible (e.g. text is not clipped by iframe sizes or CSS overflow limits).'
            },
            PURPOSE: [
              'People with visual impairments may increase the size of text and the text should reflow to fit the available viewing area to make it easier to read.',
              'If text is clipped by limits on iframe sizes or CSS overflow properties some text content will be impossible to view.'
            ],
            TECHNIQUES: [
              'Use relative CSS sized like @em@ and @percentage@ rather than pixels and point sizes.',
              'If using the CSS overflow property, @iframe@ or @frame@ check to make sure content reflows and is not clipped by changes in zoom levels.'
            ],
            MANUAL_CHECKS: [
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                title: 'How to meet 1.4.4 Resize Text',
                url:   'https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-scale'
              }
            ]
        }
    }
});
