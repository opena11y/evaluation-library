/**
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

// import {OpenAjax} from '../../openajax_a11y_constants.js';

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance WCAG 2.0 National Language Support (NLS): English         */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.nls.WCAG20.addNLS('en-us', {

  abbreviation : 'WCAG 2.0',
  title        : 'Web Content Accessibility Guidelines 2.0',
  url          : 'http://www.w3c.org/TR/WCAG20',

  level : "Level ",

  levels : ['Undefined', 'AAA','AA','', 'A'],

  evaluation_levels : ['Undefined', 'AAA','AA','AA and AAA', 'A',  'A and AAA', 'A nd AA', 'A, AA and AAA'],

  all_guidelines : {
      title       : 'All Guidelines',
      description : 'All the rules related to WCAG 2.0.',
      url_spec    : 'http://www.w3.org/TR/WCAG20/'
  },

  principles : {
    //
    // Principle 1: Perceivable
    //
    '1' : {
      id          : OpenAjax.a11y.WCAG20_PRINCIPLE.P_1,
      title       : '1. Perceivable',
      description : 'Information and user interface components must be presentable to users in ways they can perceive.',
      url_spec    : 'http://www.w3.org/TR/WCAG20/#perceivable',
      guidelines : {
        //
        // Guideline 1.1 Text Alternatives
        //
        '1.1' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_1_1,
          title       : '1.1 Text Alternatives',
          description : 'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#text-equiv',
          success_criteria : {
            //
            // Success Criterion 1.1.1 Non-text Content: All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.
            //
            '1.1.1' : {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_1_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '1.1.1 Non-text Content',
              description    : 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#text-equiv',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-text-equiv-all',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html',
              references     : []
            }
          }
        },
        //
        // Guideline 1.2 Time-based Media
        //
        '1.2' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_1_2,
          title       : '1.2 Time-based Media',
          description : 'Provide alternatives for time-based media.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv',
          success_criteria : {
            //
            // Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded)
            //
            '1.2.1': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_1,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.1 Audio-only and Video-only (Prerecorded)',
              description : 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such: (1) Prerecorded Audio-only: An alternative for time-based media is provided that presents equivalent information for prerecorded audio-only content. (2) Prerecorded Video-only: Either an alternative for time-based media or an audio track is provided that presents equivalent information for prerecorded video-only content.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-av-only-alt',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-av-only-alt.html',
              references     : []
            },
            //
            // Success Criterion 1.2.2 Captions (Prerecorded)
            //
           '1.2.2': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_2,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.2 Captions (Prerecorded)',
              description : 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-captions',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-captions.html',
              references     : []
            },
            //
            // Success Criterion 1.2.3 Audio Description or Media Alternative (Prerecorded)
            //
            '1.2.3': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_3,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.2.3 Audio Description or Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-audio-desc',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-audio-desc.html',
              references     : []
            },
            //
            // Success Criterion 1.2.4 Captions (Live)
            //
            '1.2.4': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_4,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.4 Captions (Live)',
              description : 'Captions are provided for all live audio content in synchronized media. ',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-real-time-captions',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-real-time-captions.html',
              references     : []
            },
            //
            // Success Criterion 1.2.5 Audio Description (Prerecorded)
            //
            '1.2.5': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_5,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title       : '1.2.5 Audio Description (Prerecorded)',
              description : 'Audio description is provided for all prerecorded video content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-audio-desc-only',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-audio-desc-only.html',
              references     : []
            },
            //
            // Success Criterion 1.2.6 Sign Language (Prerecorded)
            //
            '1.2.6': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_6,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.6 Sign Language (Prerecorded)',
              description : 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-sign',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-sign.html',
              references     : []
            },
            //
            // Success Criterion 1.2.7 Extended Audio Description (Prerecorded)
            //
            '1.2.7': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_7,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.7 Extended Audio Description (Prerecorded)',
              description : 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-extended-ad',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-extended-ad.html',
              references     : []
            },
            //
            // Success Criterion 1.2.8 Media Alternative (Prerecorded)
            //
            '1.2.8': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_8,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.8 Media Alternative (Prerecorded)',
              description : 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-text-doc',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-text-doc.html',
              references     : []
            },
            //
            // Success Criterion 1.2.9 Audio-only (Live)
            //
            '1.2.9': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_9,
              level       : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title       : '1.2.9 Audio-only (Live)',
              description : 'An alternative for time-based media that presents equivalent information for live audio-only content is provided. ',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-media-equiv-live-audio-only',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/media-equiv-live-audio-only.html',
              references     : []
            }
          }
        },
        //
        // Guideline 1.3 Adaptable
        //
        '1.3' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_1_3,
          title       : '1.3 Adaptable',
          description : 'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation',
          success_criteria : {
            //
            // Success Criterion 1.3.1 Info and Relationships
            //
            '1.3.1': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_1,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.1 Info and Relationships',
              description : 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-programmatic',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html',
              references     : []
            },
            //
            // Success Criterion 1.3.2 Meaningful Sequence
            //
            '1.3.2': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_2,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.2 Meaningful Sequence',
              description : 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequence',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-sequence',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-sequence.html',
              references     : []
            },
            //
            // Success Criterion 1.3.3 Sensory Characteristics
            //
            '1.3.3': {
              id          : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_3,
              level       : OpenAjax.a11y.WCAG20_LEVEL.A,
              title       : '1.3.3 Sensory Characteristics',
              description : 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, size, visual location, orientation, or sound.',
              url_spec    : 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-content-structure-separation-understanding',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-understanding.html',
              references     : []
            }
          }
        },
        //
        // Guideline 1.4 Distinguishable
        //
        '1.4' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_1_4,
          title       : '1.4 Distinguishable',
          description : 'Make it easier for users to see and hear content including separating foreground from background.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast',
          success_criteria : {
            //
            // Success Criterion 1.4.1 Use of Color
            //
            '1.4.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '1.4.1 Use of Color',
              description    : 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-without-color',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-without-color.html',
              references     : []
            },
            //
            // Success Criterion 1.4.2 Audio Control
            //
            '1.4.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '1.4.2 Audio Control',
              description    : 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-dis-audio',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-dis-audio.html',
              references     : []
            },
            //
            // Success Criterion 1.4.3 Contrast (Minimum)
            //
            '1.4.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '1.4.3 Contrast (Minimum)',
              description    : 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following: \n(1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 3:1;\n(2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement.\n(3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html',
              references     : []
            },
            //
            // Success Criterion 1.4.4 Resize text
            //
            '1.4.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '1.4.4 Resize text',
              description    : 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-scale',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-scale.html',
              references     : []
            },
            //
            // Success Criterion 1.4.5 Images of Text
            //
            '1.4.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '1.4.5 Images of Text',
              description    : 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following: (1) Customizable: The image of text can be visually customized to the user\'s requirements; (2) Essential: A particular presentation of text is essential to the information being conveyed.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-text-presentation',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-text-presentation.html',
              references     : []
            },
            //
            // Success Criterion 1.4.6 Contrast (Enhanced)
            //
            '1.4.6': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_6,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '1.4.6 Contrast (Enhanced)',
              description    : 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following: (1) Large Text: Large-scale text and images of large-scale text have a contrast ratio of at least 4.5:1; (2) Incidental: Text or images of text that are part of an inactive user interface component, that are pure decoration, that are not visible to anyone, or that are part of a picture that contains significant other visual content, have no contrast requirement. (3) Logotypes: Text that is part of a logo or brand name has no minimum contrast requirement.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html',
              references     : []
            },
            //
            // Success Criterion 1.4.7 Low or No Background Audio
            //
            '1.4.7': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_7,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '1.4.7 Low or No Background Audio',
              description    : 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true: (4a) No Background: The audio does not contain background sounds. (4b) Turn Off: The background sounds can be turned off. (4c) 20 dB: The background sounds are at least 20 decibels lower than the foreground speech content, with the exception of occasional sounds that last for only one or two seconds.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-noaudio',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-noaudio',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-noaudio.html',
              references     : []
            },
            //
            // Success Criterion 1.4.8 Visual Presentation
            //
            '1.4.8': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_8,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '1.4.8 Visual Presentation',
              description    : 'For the visual presentation of blocks of text, a mechanism is available to achieve the following: (1) Foreground and background colors can be selected by the user; (2) Width is no more than 80 characters or glyphs (40 if CJK); (3) Text is not justified (aligned to both the left and the right margins); (4) Line spacing (leading) is at least space-and-a-half within paragraphs, and paragraph spacing is at least 1.5 times larger than the line spacing; (5) Text can be resized without assistive technology up to 200 percent in a way that does not require the user to scroll horizontally to read a line of text on a full-screen window.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-visual-presentation',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html',
              references     : []
            },
            //
            // Success Criterion 1.4.9 Images of Text (No Exception)
            //
            '1.4.9': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_9,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '1.4.9 Images of Text (No Exception)',
              description    : 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-text-images',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-text-images.html',
              references     : []
            }
          }
        }
      }
    },
    //
    // Principle 2: Operable
    //
    '2' : {
      id          : OpenAjax.a11y.WCAG20_PRINCIPLE.P_2,
      title       : '2. Operable',
      description : 'User interface components and navigation must be operable.',
      url_spec    : 'http://www.w3.org/TR/WCAG20/#operable',
      guidelines : {
        //
        // Guideline 2.1 Keyboard Accessible
        //
        '2.1' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_2_1,
          title       : '2.1 Keyboard Accessible',
          description : 'Make all functionality available from a keyboard.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#keyboard-operation',
          success_criteria : {
            //
            // Success Criterion 2.1.1 Keyboard
            //
            '2.1.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.1.1 Keyboard',
              description    : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#keyboard-operation-keyboard-operable',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-keyboard-operation-keyboard-operable',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-keyboard-operable.html',
              references     : []
            },
            //
            // Success Criterion 2.1.2 No Keyboard Trap
            //
            '2.1.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.1.2 No Keyboard Trap',
              description    : 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#keyboard-operation-trapping',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-keyboard-operation-trapping',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-trapping.html',
              references     : []
            },
            //
            // Success Criterion 2.1.3 Keyboard (No Exception)
            //
            '2.1.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.1.3 Keyboard (No Exception)',
              description    : 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#keyboard-operation-all-funcs',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-keyboard-operation-all-funcs',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/keyboard-operation-all-funcs.html',
              references     : []
            }
          }
        },
        //
        // Guideline 2.2 Enough Time
        //
        '2.2' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_2_2,
          title       : '2.2 Enough Time',
          description : 'Provide users enough time to read and use content.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#time-limits',
          success_criteria : {
            //
            // Success Criterion 2.2.1 Timing Adjustable
            //
            '2.2.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.2.1 Timing Adjustable',
              description    : 'For each time limit that is set by the content, at least one of the following is true: (1) Turn off: The user is allowed to turn off the time limit before encountering it; or (2) Adjust: The user is allowed to adjust the time limit before encountering it over a wide range that is at least ten times the length of the default setting; or (3) Extend: The user is warned before time expires and given at least 20 seconds to extend the time limit with a simple action (for example, "press the space bar"), and the user is allowed to extend the time limit at least ten times; or (4) Real-time Exception: The time limit is a required part of a real-time event (for example, an auction), and no alternative to the time limit is possible; or (5) Essential Exception: The time limit is essential and extending it would invalidate the activity; or (6) 20 Hour Exception: The time limit is longer than 20 hours.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#time-limits-required-behaviors',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-time-limits-required-behaviors',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-required-behaviors.html',
              references     : []
            },
            //
            // Success Criterion 2.2.2 Pause, Stop, Hide
            //
            '2.2.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.2.2 Pause, Stop, Hide',
              description    : 'For moving, blinking, scrolling, or auto-updating information, all of the following are true: Moving, blinking, scrolling: For any moving, blinking or scrolling information that (1) starts automatically, (2) lasts more than five seconds, and (3) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it unless the movement, blinking, or scrolling is part of an activity where it is essential; and Auto-updating: For any auto-updating information that (1) starts automatically and (2) is presented in parallel with other content, there is a mechanism for the user to pause, stop, or hide it or to control the frequency of the update unless the auto-updating is part of an activity where it is essential.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#time-limits-pause',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-time-limits-pause',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-pause.html',
              references     : []
            },
            //
            // Success Criterion 2.2.3 No Timing
            //
            '2.2.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.3 No Timing',
              description    : 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#time-limits-no-exceptions',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-time-limits-no-exceptions',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-no-exceptions.html',
              references     : []
            },
            //
            // Success Criterion 2.2.4 Interruptions
            //
            '2.2.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.4 Interruptions',
              description    : 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#time-limits-postponed',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-time-limits-postponed',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-postponed.html',
              references     : []
            },
            //
            // Success Criterion 2.2.5 Re-authenticating
            //
            '2.2.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.2.5 Re-authenticating',
              description    : 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#time-limits-server-timeout',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-time-limits-server-timeout',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/time-limits-server-timeout.html',
              references     : []
            }
          }
        },
        //
        // Guideline 2.3 Seizures
        //
        '2.3' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_2_3,
          title       : '2.3 Seizures',
          description : 'Do not design content in a way that is known to cause seizures.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#seizure',
          success_criteria : {
            //
            // Success Criterion 2.3.1 Three Flashes or Below Threshold
            //
            '2.3.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_3_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.3.1 Three Flashes or Below Threshold',
              description    : 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#seizure-does-not-violate',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-seizure-does-not-violate',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-does-not-violate.html',
              references     : []
            },
            //
            // Success Criterion 2.3.2 Three Flashes
            //
            '2.3.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_3_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.3.2 Three Flashes',
              description    : 'Web pages do not contain anything that flashes more than three times in any one second period.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#seizure-three-times',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-seizure-three-times',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/seizure-three-times.html',
              references     : []
            }
          }
        },
        //
        // Guideline 2.4 Navigable
        //
        '2.4' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_2_4,
          title       : '2.4 Navigable',
          description : 'Provide ways to help users navigate, find content, and determine where they are.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms',
          success_criteria : {
            //
            // Success Criterion 2.4.1 Bypass Blocks
            //
            '2.4.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.1 Bypass Blocks',
              description    : 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-skip',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-skip.html',
              references     : []
            },
            //
            // Success Criterion 2.4.2 Page Titled
            //
            '2.4.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.2 Page Titled',
              description    : 'Web pages have titles that describe topic or purpose.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-title',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-title',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html',
              references     : []
            },
            //
            // Success Criterion 2.4.3 Focus Order
            //
            '2.4.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.3 Focus Order',
              description    : 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-order',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-focus-order',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-order.html',
              references     : []
            },
            //
            // Success Criterion 2.4.4 Link Purpose (In Context)
            //
            '2.4.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.4 Link Purpose (In Context)',
              description    : 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-refs',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-refs',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-refs.html',
              references     : []
            },
            //
            // Success Criterion 2.4.5 Multiple Ways
            //
            '2.4.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '2.4.5 Multiple Ways',
              description    : 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-mult-loc',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-mult-loc',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-mult-loc.html',
              references     : []
            },
            //
            // Success Criterion 2.4.6 Headings and Labels
            //
            '2.4.6': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_6,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.6 Headings and Labels',
              description    : 'Headings and labels describe topic or purpose.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-descriptive',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-descriptive',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-descriptive.html',
              references     : []
            },
            //
            // Success Criterion 2.4.7 Focus Visible
            //
            '2.4.7': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_7,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '2.4.7 Focus Visible',
              description    : 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-focus-visible',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html',
              references     : []
            },
            //
            // Success Criterion 2.4.8 Location
            //
            '2.4.8': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_8,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.8 Location',
              description    : 'Information about the user\'s location within a set of Web pages is available.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-location',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-location',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-location.html',
              references     : []
            },
            //
            // Success Criterion 2.4.9 Link Purpose (Link Only)
            //
            '2.4.9': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_9,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.9 Link Purpose (Link Only)',
              description    : 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-link',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-link',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-link.html',
              references     : []
            },
            //
            // Success Criterion 2.4.10 Section Headings
            //
            '2.4.10': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_10,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '2.4.10 Section Headings',
              description    : 'Section headings are used to organize the content.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-headings',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-navigation-mechanisms-headings',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-headings.html',
              references     : []
            }
          }
        }
      }
    },
    //
    // Principle 3: Understandable
    //
    '3' : {
      id          : OpenAjax.a11y.WCAG20_PRINCIPLE.P_3,
      title       : '3. Understandable',
      description : 'Information and the operation of user interface must be understandable.',
      url_spec    : 'http://www.w3.org/TR/WCAG20/#understandable',
      guidelines : {
        //
        // Guideline 3.1 Readable
        //
        '3.1' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_3_1,
          title       : '3.1 Readable',
          description : 'Make text content readable and understandable.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#meaning',
          success_criteria : {
            //
            // Success Criterion 3.1.1 Language of Page
            //
            '3.1.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.1.1 Language of Page',
              description    : 'The default human language  of each Web page  can be programmatically determined. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-doc-lang-id',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-doc-lang-id',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-doc-lang-id.html',
              references     : []
            },
            //
            // Success Criterion 3.1.2 Language of Parts
            //
            '3.1.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.1.2 Language of Parts',
              description    : 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-other-lang-id',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-other-lang-id',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-other-lang-id.html',
              references     : []
            },
            //
            // Success Criterion 3.1.3 Unusual Words
            //
            '3.1.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.3 Unusual Words',
              description    : 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-idioms',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-idioms',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-idioms.html',
              references     : []
            },
            //
            // Success Criterion 3.1.4 Abbreviations
            //
            '3.1.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.4 Abbreviations',
              description    : 'A mechanism for identifying the expanded form or meaning of abbreviations is available. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-located',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-located',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-located.html',
              references     : []
            },
            //
            // Success Criterion 3.1.5 Reading Level
            //
            '3.1.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.5 Reading Level',
              description    : 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available. ',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-supplements',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-supplements',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-supplements.html',
              references     : []
            },
            //
            // Success Criterion 3.1.6 Pronunciation
            //
            '3.1.6': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_6,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.1.6 Pronunciation',
              description    : 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#meaning-pronunciation',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-meaning-pronunciation',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/meaning-pronunciation.html',
              references     : []
            }
          }
        },
        //
        // Guideline 3.2 Predictable
        //
        '3.2' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_3_2,
          title       : '3.2 Predictable',
          description : 'Make Web pages appear and operate in predictable ways.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#consistent-behavior',
          success_criteria : {
            //
            // Success Criterion 3.2.1 On Focus
            //
            '3.2.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.2.1 On Focus',
              description    : 'When any component receives focus, it does not initiate a change of context.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#consistent-behavior-receive-focus',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-receive-focus',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-receive-focus.html',
              references     : []
            },
            //
            // Success Criterion 3.2.2 On Input
            //
            '3.2.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.2.2 On Input',
              description    : 'Changing the setting of any user interface component  does not automatically cause a change of context  unless the user has been advised of the behavior before using the component.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#consistent-behavior-unpredictable-change',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-unpredictable-change',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-unpredictable-change.html',
              references     : []
            },
            //
            // Success Criterion 3.2.3 Consistent Navigation
            //
            '3.2.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.2.3 Consistent Navigation',
              description    : 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages  occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-consistent-locations',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-consistent-locations.html',
              references     : []
            },
            //
            // Success Criterion 3.2.4 Consistent Identification
            //
            '3.2.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.2.4 Consistent Identification',
              description    : 'Components that have the same functionality within a set of Web pages are identified consistently.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-functionality',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-consistent-functionality',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-consistent-functionality.html',
              references     : []
            },
            //
            // Success Criterion 3.2.5 Change on Request
            //
            '3.2.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.2.5 Change on Request',
              description    : 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#consistent-behavior-no-extreme-changes-context',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-consistent-behavior-no-extreme-changes-context',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/consistent-behavior-no-extreme-changes-context.html',
              references     : []
            }
          }
        },
        //
        // Guideline 3.3 Input Assistance
        //
        '3.3' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_3_3,
          title       : '3.3 Input Assistance',
          description : 'Help users avoid and correct mistakes.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#minimize-error',
          success_criteria : {
            //
            // Success Criterion 3.3.1 Error Identification
            //
            '3.3.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.3.1 Error Identification',
              description    : 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-identified',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-identified',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-identified.html',
              references     : []
            },
            //
            // Success Criterion 3.3.2 Labels or Instructions
            //
            '3.3.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '3.3.2 Labels or Instructions',
              description    : 'Labels or instructions are provided when content requires user input.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-cues',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-cues',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-cues.html',
              references     : []
            },
            //
            // Success Criterion 3.3.3 Error Suggestion
            //
            '3.3.3': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_3,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.3.3 Error Suggestion',
              description    : 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-suggestions',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-suggestions',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-suggestions.html',
              references     : []
            },
            //
            // Success Criterion 3.3.4 Error Prevention (Legal, Financial, Data)
            //
            '3.3.4': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_4,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AA,
              title          : '3.3.4 Error Prevention (Legal, Financial, Data)',
              description    : 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-reversible',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-reversible',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-reversible.html',
              references     : []
            },
            //
            // Success Criterion 3.3.5 Help
            //
            '3.3.5': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_5,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.3.5 Help',
              description    : 'Context-sensitive help is available.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-context-help',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-context-help',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-context-help.html',
              references     : []
            },
            //
            // Success Criterion 3.3.6 Error Prevention (All)
            //
            '3.3.6': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_6,
              level          : OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title          : '3.3.6 Error Prevention (All)',
              description    : 'For Web pages that require the user to submit information, at least one of the following is true',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#minimize-error-reversible-all',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-minimize-error-reversible-all',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/minimize-error-reversible-all.html',
              references     : []
            }
          }
        }
      }
    },
    //
    // Principle 4: Robust
    //
    '4' : {
      id          : OpenAjax.a11y.WCAG20_PRINCIPLE.P_4,
      title       : '4. Robust',
      description : 'Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies.',
      url_spec    : 'http://www.w3.org/TR/WCAG20/#robust',
      guidelines : {
        //
        // Guideline 4.1 Compatible
        //
        '4.1' : {
          id          : OpenAjax.a11y.WCAG20_GUIDELINE.G_4_1,
          title       : '4.1 Compatible',
          description : 'Maximize compatibility with current and future user agents, including assistive technologies.',
          url_spec    : 'http://www.w3.org/TR/WCAG20/#ensure-compat',
          success_criteria : {
            //
            // Success Criterion 4.1.1 Parsing Content
            //
            '4.1.1': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_1,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '4.1.1 Parsing Content',
              description    : 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#ensure-compat-parses',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-ensure-compat-parses',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-parses.html',
              references     : []
            },
            //
            // Success Criterion 4.1.2 Name, Role, Value
            //
            '4.1.2': {
              id             : OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_2,
              level          : OpenAjax.a11y.WCAG20_LEVEL.A,
              title          : '4.1.2 Name, Role, Value',
              description    : 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
              url_spec       : 'http://www.w3.org/TR/WCAG20/#ensure-compat-rsv',
              url_meet       : 'http://www.w3.org/WAI/WCAG20/quickref/#qr-ensure-compat-rsv',
              url_understand : 'http://www.w3.org/TR/UNDERSTANDING-WCAG20/ensure-compat-rsv.html',
              references     : []
            }
          }
        }
      }
    }
  }
});
