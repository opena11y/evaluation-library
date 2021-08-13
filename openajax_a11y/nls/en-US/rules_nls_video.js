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
        VIDEO_1: {
            ID:                    'Video 1',
            DEFINITION:            '@video@ elements used for prerecorded video only content %s have text or audio description of the video content.',
            SUMMARY:               '@video@ for video only %s have alternative',
            TARGET_RESOURCES_DESC: '@video@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @video@ element with the @aria-describedby@ attributes is used for video only content.   If so, verify the text description reference using the @aria-describedby@ describes the video only content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @video@ elements with the @aria-describedby@ attributes are used for video only content.   If so, verify the text description reference using the @aria-describedby@ describes the video only content.',
              HIDDEN_S: 'The @video@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @video@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @video@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:    '@video@ element has audio description track',
              ELEMENT_MC_1:      'Verify the @video@ element is used for video only content.   If so, verify the text description reference using the @aria-describedby@ describes the video only content.',
              ELEMENT_MC_2:      'Verify the @video@ element is used for video only content provides an audio track to describe the video content or text description of the video.',
              ELEMENT_HIDDEN_1:  'The @video@ element is hidden and therefore not evaluated.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.'
            ],
            TECHNIQUES: [
              'Use the @track@ element to add audio descriptions to the video content.',
              'Use @aria-describedby@ to reference a text description of the video content.',
              'Include an audio sound track that describes the video content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The video element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-video-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The track element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        },
        VIDEO_2: {
            ID:                    'Video 2',
            DEFINITION:            '@object@ elements used for prerecorded video only content %s have text or audio descriptions of the video content.',
            SUMMARY:               '@object@ for video only %s have alternative',
            TARGET_RESOURCES_DESC: '@object@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @object@ element is used for prerecorded video only content.  If it is used for video only, verify it has either a text or audio description of the video content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @object@ elements are used for prerecorded video only content.  If any are used for video only, verify they have either a text or audio description of the video content.',
              HIDDEN_S: 'The @object@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @object@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @object@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @object@ element with @video@ in its @type@ attrbute is used for video only content.  If so verify the @aria-describedby@ references a text description of the video only content.',
              ELEMENT_MC_2: 'Verify the @object@ element with @video@ in its @type@ attrbute is used for video only content.  If so verify the video only content has a text or audio descriptions.',
              ELEMENT_MC_3: 'Verify if the @object@ element is used for video only content.  If so verify the @aria-describedby@ references a text description of the video only content.',
              ELEMENT_MC_4: 'Verify if the @object@ element is used for video only content.  If so verify the video only content has a text or audio description.',
              ELEMENT_HIDDEN_1:       'The @object@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.'
            ],
            TECHNIQUES: [
              'Use the @video@ element instead of the @object@ element for video only content, since the @video@ element provides better support for audio description tracks.',
              'Include an audio track in the video that describes the video content.',
              'Use @aria-describedby@ attribute to point to a text description of the video only content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The object element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-object-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        },
        VIDEO_3: {
            ID:                    'Video 3',
            DEFINITION:            '@embed@ elements used for video only content %s have caption or text transcription of the audio content.',
            SUMMARY:               '@embed@ for video only %s have alternative',
            TARGET_RESOURCES_DESC: '@embed@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @embed@ element is used for prerecorded video only content.  If it is used for video only, verify it has either a text or audio description of the video content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @embed@ elements are used for prerecorded video only content.  If any are used for video only, verify they have either a text or audio description of the video content.',
              HIDDEN_S: 'The @embed@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @embed@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @embed@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @embed@ element with @video@ in its @type@ attribute is used for video only content.  If so verify the @aria-describedby@ references a text description of the video only content.',
              ELEMENT_MC_2: 'Verify the @embed@ element with @video@ in its @type@ attribute is used for video only content.  If so verify the video only content has a text or audio description.',
              ELEMENT_MC_3: 'Verify if the @embed@ element is used for video only content.  If so verify the @aria-describedby@ references a text description of the video only content.',
              ELEMENT_MC_4: 'Verify if the @embed@ element is used for video only content.  If so verify the video only content has a text or audio description.',
              ELEMENT_HIDDEN_1:       'The @embed@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.'
            ],
            TECHNIQUES: [
              'Use the @video@ element instead of the @embed@ element for video only content, since the @video@ element provides better support for audio description tracks.',
              'Include an audio track in the video that describes the video content.',
              'Use @aria-describedby@ attribute to point to a text description of the video only content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The embed element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-embed-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        },
        VIDEO_4: {
            ID:                    'Video 4',
            DEFINITION:            'Live and prerecorded video with synchronized audio (i.e. a movie, lecture) using the @video@ element %s have synchronized captions.',
            SUMMARY:               '@video@ %s have caption',
            TARGET_RESOURCES_DESC: '@video@ elements',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add caption @track@ element to the @video@ element.',
              FAIL_P:   'Add caption @track@ element to each of the %N_F @video@ elements with out caption tracks.',
              MANUAL_CHECK_S:     'Verify that the @video@ element without a caption track has open captions.',
              MANUAL_CHECK_P:     'Verify that the %N_MC @video@ elements without caption tracks have open captions.',
              HIDDEN_S: 'The @video@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @video@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @video@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:         '@video@ element has caption track.',
              ELEMENT_FAIL_1:       'Add caption @track@ element to @video@ element.',
              ELEMENT_MC_1: 'Verify the video content includes open captions.',
              ELEMENT_HIDDEN_1:       'The @video@ element is hidden and cannot render content.'
            },
            PURPOSE: [
              'Synchronized captions provide a means for people who cannot hear the audio content of a video to understand the audio content of the video.',
              'Some types of learning disabilities affect auditory processing, captions provide an alternative way to understand the audio content of a video.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.2 and 1.2.4, and therefore covers both live and prerecorded video content.'
             ],
            TECHNIQUES: [
              'Use the @track@ element to add a caption track to the video content.',
              'Use open captions to include the captions as part of the video.',
              'If closed captions are not support, use open captioning to include captions as part of the video.',
              'Open captioning is the only way to insure that captions are available on most cells phones and tablet computers connecting through wireless services.'
            ],
            MANUAL_CHECKS: [
              'When captions are enabled on the media player, verify the captions are visible.',
              'Verify that the captions accurately represent and are synchronized with the speech and sounds in the video.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The video element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-video-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The track element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-track-element'
              }
            ]
        },
        VIDEO_5: {
            ID:                    'Video 5',
            DEFINITION:            'Live and prerecorded video with synchronized audio (i.e. a movie, lecture) using the @object@ element %s have synchronized captions.',
            SUMMARY:               '@object@ for video %s have captions',
            TARGET_RESOURCES_DESC: '@object@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @object@ element is used for video content with synchronized audio (i.e movie, lecture).  If it is video with synchronized audio, verify it has open or closed captioning of the audio content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @object@ elements are used for video content with synchronized audio (i.e movie, lecture).  If any are used for video with synchronized audio, verify it has open or closed captioning of the audio content.',
              HIDDEN_S: 'The @object@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @object@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @object@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @object@ element with @video@ in its @type@ attribute has synchronized audio (i.e. movie, lecture).  If so, verify there is open or closed captioning of the audio content.',
              ELEMENT_MC_2: 'Verify the @object@ element renders video content with synchronized audio (i.e. movie, lecture).  If so, verify there is open or closed captioning of the audio content.',
              ELEMENT_HIDDEN_1: 'The @object@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Synchronized captions provide a means for people who cannot hear the audio content of a video to have access to the speech and sounds of the video.',
              'Some types of learning disabilities effect auditory processing, captions provide an alternative way to understand the audio content of a video.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.2 and 1.2.4, and therefore covers both live and prerecorded content.'
            ],
            TECHNIQUES: [
              'Consider using the @video@ element instead of the @object@ element for video containing synchronized audio.  The @video@ element has better support for adding caption tracks.',
              'Use video authoring tools and player technologies that support captioning.  Use the features of the authoring system and player to add open or closed captions to the video.',
              'If closed captions are not support, use open captioning to include captions as part of the video.',
              'Open captioning is the only way to insure that captions are available on most cells phones and tablet computers.'
            ],
            MANUAL_CHECKS: [
              'When captions are enabled on the media player, verify the captions are visible.',
              'Verify that the captions accurately represent and are synchronized with the speech and sounds in the video.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The object element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-object-element'
              }
            ]
        },
        VIDEO_6: {
            ID:                    'Video 6',
            DEFINITION:            'Live and prerecorded video with synchronized audio (i.e. a movie, lecture) using the @embed@ element %s have synchronized captions.',
            SUMMARY:               '@embed@ for video %s have captions',
            TARGET_RESOURCES_DESC: '@embed@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @embed@ element is used for video content with synchronized audio (i.e movie, lecture).  If it is video with synchronized audio, verify it has captions of the audio content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @embed@ elements are used for video content with synchronized audio (i.e movie, lecture).  If any are used for video with synchronized audio, verify it has captions of the audio content.',
              HIDDEN_S: 'The @embed@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @embed@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @embed@ elements found on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @embed@ element with @video@ in its @type@ attribute has synchronized audio (i.e. movie, lecture).  If so, verify their are captions avialble for the audio content.',
              ELEMENT_MC_2: 'Verify the @embed@ element renders video content with synchronized audio (i.e. movie, lecture).  If so, verify their are captions avialble for the audio content.',
              ELEMENT_HIDDEN_1:       'The @embed@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Synchronized captions provide a means for people who cannot hear the audio content of a video to have access to the speech and sounds of the video.',
              'Some types of learning disabilities effect auditory processing, captoins provide an alternative way to understand the audio content of a video.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.2 and 1.2.4, and therefore covers both live and prerecorded content.'
            ],
            TECHNIQUES: [
              'Consider using the @video@ element instead of the @object@ element for video containing synchronized audio.  The @video@ element has better support for adding caption tracks.',
              'Use video authoring tools and player technologies that support captioning.  Use the features of the authoring system and player to add open or closed captions to the video.',
              'If closed captions are not support, use open captioning to include captions as part of the video.',
              'Open captioning is the only way to insure that captions are available on most cells phones and tablet computers.'
            ],
            MANUAL_CHECKS: [
              'When captions are enabled on the media player, verify the captions are visible.',
              'Verify that the captions accurately represent and are synchronized with the speech and sounds in the video.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The embed element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-embed-element'
              }
            ]
        },
        VIDEO_7: {
            ID:                    'Video 7',
            DEFINITION:            '@video@ elements used for prerecorded video with synchronized audio (i.e. a movie, archived lecture) %s have an audio description of the video content.',
            SUMMARY:               '@video@ element %s have audio description.',
            TARGET_RESOURCES_DESC: '@video@ elements.',
            RULE_RESULT_MESSAGES: {
              FAIL_S:   'Add audio description track to @video@ element without an audio description track.',
              FAIL_P:   'Add audio description track to each of the %N_F the @video@ elements without audio description tracks.',
              MANUAL_CHECK_S:     'Verify the @video@ element with is used for prerecorded video with synchronized audio.   If so, verify the video includes an audio description of the video content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @video@ elements are used for prerecorded video with synchronized audio.   If so, verify each of the videos includes an audio description of the video content.',
              HIDDEN_S: 'The @video@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @video@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @video@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_PASS_1:         '@video@ element has audio description track.',
              ELEMENT_FAIL_1:       'Add audio description track to @video@ element.',
              ELEMENT_MC_1: 'Verify an audio description of the video content is included in the audio track of the video.',
              ELEMENT_HIDDEN_1:       'The @video@ element is hidden and cannot render content.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.3 and 1.2.5, that is why a text description of the video content cannot be used to satisfy this rule.'
            ],
            TECHNIQUES: [
              'Use the @track@ element to add audio descriptions to the video content.',
              'Use @aria-describedby@ to reference a text description of the video content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The video element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-video-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The track element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-track-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        },
        VIDEO_8: {
            ID:                    'Video 8',
            DEFINITION:            '@object@ elements used for prerecorded video with synchronized audio (i.e. a movie, archived lecture) %s have an audio description of the video content.',
            SUMMARY:               '@object@ for video %s have audio description.',
            TARGET_RESOURCES_DESC: '@object@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @object@ element is used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).  If so, verify the video includes an audio description of the video content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @object@ elements are used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).  If so, verify each video includes an audio description of the video content.',
              HIDDEN_S: 'The @object@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @object@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @object@ elements found on this page'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @object@ element with @video@ in its @type@ attrbute is used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).  If so verify an audio description of the video content is available.',
              ELEMENT_MC_2: 'Verify if the @object@ element is used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).  If so verify an audio description of the video content is available.',
              ELEMENT_HIDDEN_1:       'The @object@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.3 and 1.2.5, that is why a text description of the video content cannot be used to satisfy this rule.'
            ],
            TECHNIQUES: [
              'Use the @video@ element instead of the @object@ element for video only content, since the @video@ element provides better support for audio description tracks.',
              'Include an audio track in the video that describes the video content.',
              'Use @aria-describedby@ attribute to point to a text description of the video only content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The object element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-object-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        },
        VIDEO_9: {
            ID:                    'Video 9',
            DEFINITION:            '@embed@ elements used for prerecorded video with synchronized audio (i.e. a movie, archived lecture) %s have audio description of the video content.',
            SUMMARY:               '@embed@ for video %s have audio description',
            TARGET_RESOURCES_DESC: '@embed@ elements',
            RULE_RESULT_MESSAGES: {
              MANUAL_CHECK_S:     'Verify the @embed@ element is used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).   If so, verify the video includes an audio description of the video content.',
              MANUAL_CHECK_P:     'Verify if any of the %N_MC @embed@ elements are used for prerecorded video with synchronized audio (i.e. a movie, archived lecture).   If so, verify each of the videos include an audio description of the video content.',
              HIDDEN_S: 'The @embed@ element that is hidden was not evaluated.',
              HIDDEN_P: 'The %N_H @embed@ elements that are hidden were not evaluated.',
              NOT_APPLICABLE:  'No @embed@ elements found on this page.'
            },
            NODE_RESULT_MESSAGES: {
              ELEMENT_MC_1: 'Verify the @embed@ element with @video@ in its @type@ attrbute is used for video with synchronized audio (i.e. a movie, archived lecture).  If so, verify the video includes an audio description of the video content.',
              ELEMENT_MC_2: 'Verify if the @embed@ element is used for video with synchronized audio (i.e. a movie, archived lecture).  If so, verify the video includes an audio description of the video content.',
              ELEMENT_HIDDEN_1:       'The @embed@ element is hidden and cannot render video content.'
            },
            PURPOSE: [
              'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
              'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.',
              'This rule covers the requirements of both WCAG 2.0 Success Criteria 1.2.3 and 1.2.5, that is why a text description of the video content cannot be used to satisfy this rule.'
            ],
            TECHNIQUES: [
              'Use the @video@ element instead of the @embed@ element for video only content, since the @video@ element provides better support for audio description tracks.',
              'Include an audio track in the video that describes the video content.',
              'Use @aria-describedby@ attribute to point to a text description of the video only content.'
            ],
            MANUAL_CHECKS: [
              'When audio descriptions are enabled on the media player, check to make sure the audio description can be heard.',
              'If there is a audio description make sure the description accurately describes the video content.',
              'If there is a text description make sure the description accurately describes the video content.'
            ],
            INFORMATIONAL_LINKS: [
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'HMTL 5: The embed element',
                url:   'https://www.w3.org/TR/html5/embedded-content-0.html#the-embed-element'
              },
              { type:  OpenAjax.a11y.REFERENCES.SPECIFICATION,
                title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
                url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
              }
            ]
        }
   }
});
