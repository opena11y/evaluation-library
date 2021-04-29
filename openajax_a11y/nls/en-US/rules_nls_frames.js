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
  //  OAA Rules title and message string National Language Support (NLS) for color rules
  //
  rules: {
    FRAME_1: {
      ID:                    'Frame 1',
      DEFINITION:            '@frame@ element %s have an accessible name to support screen reader navigation.',
      SUMMARY:               '@frame@ %s have accessible name',
      TARGET_RESOURCES_DESC: '@frame@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add a @title@ attribute to the @frame@ element that describes the contents of the frame.',
        FAIL_P:   'Add a @title@ attribute to the %N_F @frame@ elements that describes the contents of the frame.',
        MANUAL_CHECK_S:  'Verify the @frame@ element with empty accessible name (e.g. @title=""@ attribute) does not contain visible content.',
        MANUAL_CHECK_M:  'Verify the %N_MC @frame@ elements with empty accessible names (e.g. @title=""@ attribute) do not contain visible content.',
        HIDDEN_S: 'The @frame@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @frame@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No visible @frame@ elements on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@frame@ element has the accessible name: %1.',
        ELEMENT_FAIL_1:   'Add a @title@ attribute to the @frame@ element describing the contents of the frame.',
        ELEMENT_MC_1:     'Verify the @frame@ element with empty accessible name (e.g. @title=""@) is not intended to be a frame navigation target.',
        ELEMENT_HIDDEN_1: '@frame@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE:        [ 'Screen readers provide a means to navigate web page content using @frame@ elements.',
                        'The accessible name of the @frame@ element (the @title@ attribute value) must describe the contents of the frame.',
                        'The accessible name helps users decide whether they want to navigate to a frame.'
                      ],
      TECHNIQUES:     [ 'Use the @title@ attribute to provide an accessible name for a @frame@ element.',
                        'Accessible names should be short and describe the contents of the @frame@ element to help users to decide whether to navigate to a @frame@.',
                        'For @frame@s with no visible content, explicitly identify the @frame@ as having no information for the user (e.g. @title="No content"@).'
                      ],
      MANUAL_CHECKS:  [ 'View the accessible names of the frames in the document to verify that they help users identify the contents of each frame.'
      ],
      INFORMATIONAL_LINKS: [
                       { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                         title: 'WCAG 2.0 Success Criterion 2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple Web pages',
                         url:   'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip'
                       },
                       { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                         title: 'H64: Using the title attribute of the frame and iframe elements',
                         url:   'http://www.w3.org/TR/WCAG20-TECHS/H64.html'
                       }
                      ]
    },

    FRAME_2: {
      ID:                    'Frame 2',
      DEFINITION:            '@iframe@ element %s have an accessible name to support screen reader navigation.',
      SUMMARY:               '@iframe@ %s have accessible name',
      TARGET_RESOURCES_DESC: '@iframe@ elements',
      RULE_RESULT_MESSAGES: {
        FAIL_S:   'Add an accessible name to @iframe@ element that describes the contents of the frame.',
        FAIL_P:   'Add accessible names to %N_F @iframe@ elements that describe the contents of the frame.',
        MANUAL_CHECK_S:  'Verify the @iframe@ elements with empty accessible name (e.g. @title=""@ attribute) does not contain visible content.',
        MANUAL_CHECK_M:  'Verify the %N_MC @iframe@ elements with empty accessible names (e.g. @title=""@ attribute) do not contain visible content.',
        HIDDEN_S: 'The @iframe@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @iframe@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No visible @iframe@ elements on this page.'
      },
      NODE_RESULT_MESSAGES: {
        ELEMENT_PASS_1:   '@iframe@ element has accessible name.',
        ELEMENT_FAIL_1:   'Add an accessible name to the @iframe@ element describing the contents of the @iframe@.',
        ELEMENT_MC_1:     'Verify the @iframe@ element with empty accessible name (e.g. @title=""@) does not contain visible content.',
        ELEMENT_HIDDEN_1: '@iframe@ element was not evaluated because it is hidden from assistive technologies.'
      },
      PURPOSE:        [ 'Screen readers provide a means to navigate web page content using @iframe@ elements.',
                        'The accessible name of the @iframe@ element must describe the contents of the @iframe@.',
                        'The accessible name helps users to decide whether they want to navigate to a @iframe@.'
      ],
      TECHNIQUES:     [ 'Use the @title@ attribute to define an accessible name for an @iframe@ element.',
                        'Use the @aria-label@ attribute to define an accessible name for an @iframe@ element.',
                        'Use the @aria-labelledby@ attribute to define an accessible name for an @iframe@ element.',
                        'Accessible names should be short and describe the contents of the @iframe@ element to help users to decide whether to navigate to the @iframe@.',
                        'For @iframe@s with no visible content, explicitly identify the @iframe@ as having no information for the user (e.g. @title="No content"@).'
      ],
      MANUAL_CHECKS:  [ 'View the accessible names of the @iframe@s in the page to verify that they help users identify the contents of each frame.'
      ],
      INFORMATIONAL_LINKS: [
                      { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                        title: 'WCAG 2.0 Success Criterion 2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple Web pages',
                        url:   'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip'
                      },
                      { type:  OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE,
                        title: 'H64: Using the title attribute of the frame and iframe elements',
                        url:   'http://www.w3.org/TR/WCAG20-TECHS/H64.html'
                      }
      ]
    }
  }
});
