
  abbreviation: 'WCAG 2.1',
  title: 'Web Content Accessibility Guidelines (WCAG) 2.1',
  url: 'https://www.w3.org/TR/WCAG21/',
  status: 'W3C Recommendation 05 June 2018',
  level: 'Level ',
  levels: [  'Undefined',  'AAA',  'AA',  '',  'A'  ],
  evaluation_levels: [  'Undefined',  'AAA',  'AA',  'AA and AAA',  'A',  'A and AAA',  'A nd AA',  'A, AA and AAA'  ],
  all_guidelines: {
    title: 'All Guidelines',
    description: 'All the rules related to WCAG 2.1.',
    url_spec: 'https://www.w3.org/TR/WCAG21/'
  },
  principles: {
    '1': {
      id: OpenAjax.a11y.WCAG20_PRINCIPLE.P_1,
      title: '1. Perceivable',
      description: 'Information and user interface components must be presentable to users in ways they can perceive.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#perceivable',
      guidelines: {
        '1.1': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_1_1,
          title: 'Guideline 1.1 Text Alternatives',
          description: 'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#text-alternatives',
          success_criteria: {
            '1.1.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_1_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.1.1 Non-text Content',
              description: 'All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#non-text-content',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#non-text-content',
              references: {
              }
            }
          }
        },
        '1.2': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_1_2,
          title: 'Guideline 1.2 Time-based Media',
          description: 'Provide alternatives for time-based media.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#time-based-media',
          success_criteria: {
            '1.2.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.2.1 Audio-only and Video-only (Prerecorded)',
              description: 'For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-only-and-video-only-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-only-and-video-only-prerecorded',
              references: {
              }
            },
            '1.2.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.2.2 Captions (Prerecorded)',
              description: 'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#captions-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#captions-prerecorded',
              references: {
              }
            },
            '1.2.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.2.3 Audio Description or Media Alternative (Prerecorded)',
              description: 'An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-description-or-media-alternative-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-or-media-alternative-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-description-or-media-alternative-prerecorded',
              references: {
              }
            },
            '1.2.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.2.4 Captions (Live)',
              description: 'Captions are provided for all live audio content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#captions-live',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/captions-live.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#captions-live',
              references: {
              }
            },
            '1.2.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.2.5 Audio Description (Prerecorded)',
              description: 'Audio description is provided for all prerecorded video content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-description-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-description-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-description-prerecorded',
              references: {
              }
            },
            '1.2.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.2.6 Sign Language (Prerecorded)',
              description: 'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#sign-language-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/sign-language-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#sign-language-prerecorded',
              references: {
              }
            },
            '1.2.7': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_7,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.2.7 Extended Audio Description (Prerecorded)',
              description: 'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#extended-audio-description-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/extended-audio-description-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#extended-audio-description-prerecorded',
              references: {
              }
            },
            '1.2.8': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_8,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.2.8 Media Alternative (Prerecorded)',
              description: 'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#media-alternative-prerecorded',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/media-alternative-prerecorded.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#media-alternative-prerecorded',
              references: {
              }
            },
            '1.2.9': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_2_9,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.2.9 Audio-only (Live)',
              description: 'An alternative for time-based media that presents equivalent information for live audio-only content is provided.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-only-live',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-only-live.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-only-live',
              references: {
              }
            }
          }
        },
        '1.3': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_1_3,
          title: 'Guideline 1.3 Adaptable',
          description: 'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#adaptable',
          success_criteria: {
            '1.3.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.3.1 Info and Relationships',
              description: 'Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#info-and-relationships',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#info-and-relationships',
              references: {
              }
            },
            '1.3.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.3.2 Meaningful Sequence',
              description: 'When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#meaningful-sequence',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#meaningful-sequence',
              references: {
              }
            },
            '1.3.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.3.3 Sensory Characteristics',
              description: 'Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#sensory-characteristics',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/sensory-characteristics.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#sensory-characteristics',
              references: {
              }
            },
            '1.3.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.3.4 Orientation',
              description: 'Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#orientation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/orientation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#orientation',
              references: {
              }
            },
            '1.3.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.3.5 Identify Input Purpose',
              description: 'The purpose of each input field collecting information about the user can be programmatically determined when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#identify-input-purpose',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-input-purpose.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#identify-input-purpose',
              references: {
              }
            },
            '1.3.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_3_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.3.6 Identify Purpose',
              description: 'In content implemented using markup languages, the purpose of User Interface Components, icons, and regions can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#identify-purpose',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/identify-purpose.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#identify-purpose',
              references: {
              }
            }
          }
        },
        '1.4': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_1_4,
          title: 'Guideline 1.4 Distinguishable',
          description: 'Make it easier for users to see and hear content including separating foreground from background.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#distinguishable',
          success_criteria: {
            '1.4.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.4.1 Use of Color',
              description: 'Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#use-of-color',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#use-of-color',
              references: {
              }
            },
            '1.4.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 1.4.2 Audio Control',
              description: 'If any audio on a Web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#audio-control',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#audio-control',
              references: {
              }
            },
            '1.4.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.3 Contrast (Minimum)',
              description: 'The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#contrast-minimum',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum',
              references: {
              }
            },
            '1.4.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.4 Resize text',
              description: 'Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#resize-text',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#resize-text',
              references: {
              }
            },
            '1.4.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.5 Images of Text',
              description: 'If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#images-of-text',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#images-of-text',
              references: {
              }
            },
            '1.4.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.4.6 Contrast (Enhanced)',
              description: 'The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#contrast-enhanced',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced',
              references: {
              }
            },
            '1.4.7': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_7,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.4.7 Low or No Background Audio',
              description: 'For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#low-or-no-background-audio',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/low-or-no-background-audio.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#low-or-no-background-audio',
              references: {
              }
            },
            '1.4.8': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_8,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.4.8 Visual Presentation',
              description: 'For the visual presentation of blocks of text, a mechanism is available to achieve the following:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#visual-presentation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#visual-presentation',
              references: {
              }
            },
            '1.4.9': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_9,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 1.4.9 Images of Text (No Exception)',
              description: 'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#images-of-text-no-exception',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/images-of-text-no-exception.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#images-of-text-no-exception',
              references: {
              }
            },
            '1.4.10': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_10,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.10 Reflow',
              description: 'Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#reflow',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/reflow.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#reflow',
              references: {
              }
            },
            '1.4.11': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_11,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.11 Non-text Contrast',
              description: 'The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):',
              url_spec: 'https://www.w3.org/TR/WCAG21/#non-text-contrast',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#non-text-contrast',
              references: {
              }
            },
            '1.4.12': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_12,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.12 Text Spacing',
              description: 'In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#text-spacing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#text-spacing',
              references: {
              }
            },
            '1.4.13': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_1_4_13,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 1.4.13 Content on Hover or Focus',
              description: 'Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#content-on-hover-or-focus',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#content-on-hover-or-focus',
              references: {
              }
            }
          }
        }
      }
    },
    '2': {
      id: OpenAjax.a11y.WCAG20_PRINCIPLE.P_2,
      title: '2. Operable',
      description: 'User interface components and navigation must be operable.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#operable',
      guidelines: {
        '2.1': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_2_1,
          title: 'Guideline 2.1 Keyboard Accessible',
          description: 'Make all functionality available from a keyboard.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard-accessible',
          success_criteria: {
            '2.1.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.1.1 Keyboard',
              description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user\'s movement and not just the endpoints.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#keyboard',
              references: {
              }
            },
            '2.1.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.1.2 No Keyboard Trap',
              description: 'If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#no-keyboard-trap',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/no-keyboard-trap.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#no-keyboard-trap',
              references: {
              }
            },
            '2.1.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.1.3 Keyboard (No Exception)',
              description: 'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#keyboard-no-exception',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard-no-exception.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#keyboard-no-exception',
              references: {
              }
            },
            '2.1.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_1_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.1.4 Character Key Shortcuts',
              description: 'If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#character-key-shortcuts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#character-key-shortcuts',
              references: {
              }
            }
          }
        },
        '2.2': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_2_2,
          title: 'Guideline 2.2 Enough Time',
          description: 'Provide users enough time to read and use content.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#enough-time',
          success_criteria: {
            '2.2.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.2.1 Timing Adjustable',
              description: 'For each time limit that is set by the content, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#timing-adjustable',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/timing-adjustable.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#timing-adjustable',
              references: {
              }
            },
            '2.2.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.2.2 Pause, Stop, Hide',
              description: 'For moving, blinking, scrolling, or auto-updating information, all of the following are true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pause-stop-hide',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pause-stop-hide',
              references: {
              }
            },
            '2.2.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.2.3 No Timing',
              description: 'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#no-timing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/no-timing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#no-timing',
              references: {
              }
            },
            '2.2.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.2.4 Interruptions',
              description: 'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#interruptions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/interruptions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#interruptions',
              references: {
              }
            },
            '2.2.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.2.5 Re-authenticating',
              description: 'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#re-authenticating',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/re-authenticating.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#re-authenticating',
              references: {
              }
            },
            '2.2.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_2_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.2.6 Timeouts',
              description: 'Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours when the user does not take any actions.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#timeouts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/timeouts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#timeouts',
              references: {
              }
            }
          }
        },
        '2.3': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_2_3,
          title: 'Guideline 2.3 Seizures and Physical Reactions',
          description: 'Do not design content in a way that is known to cause seizures or physical reactions.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#seizures-and-physical-reactions',
          success_criteria: {
            '2.3.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_3_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.3.1 Three Flashes or Below Threshold',
              description: 'Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#three-flashes-or-below-threshold',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#three-flashes-or-below-threshold',
              references: {
              }
            },
            '2.3.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_3_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.3.2 Three Flashes',
              description: 'Web pages do not contain anything that flashes more than three times in any one second period.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#three-flashes',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/three-flashes.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#three-flashes',
              references: {
              }
            },
            '2.3.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_3_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.3.3 Animation from Interactions',
              description: 'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#animation-from-interactions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#animation-from-interactions',
              references: {
              }
            }
          }
        },
        '2.4': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_2_4,
          title: 'Guideline 2.4 Navigable',
          description: 'Provide ways to help users navigate, find content, and determine where they are.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#navigable',
          success_criteria: {
            '2.4.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.4.1 Bypass Blocks',
              description: 'A mechanism is available to bypass blocks of content that are repeated on multiple Web pages.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#bypass-blocks',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#bypass-blocks',
              references: {
              }
            },
            '2.4.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.4.2 Page Titled',
              description: 'Web pages have titles that describe topic or purpose.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#page-titled',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#page-titled',
              references: {
              }
            },
            '2.4.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.4.3 Focus Order',
              description: 'If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#focus-order',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-order.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#focus-order',
              references: {
              }
            },
            '2.4.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.4.4 Link Purpose (In Context)',
              description: 'The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#link-purpose-in-context',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#link-purpose-in-context',
              references: {
              }
            },
            '2.4.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 2.4.5 Multiple Ways',
              description: 'More than one way is available to locate a Web page within a set of Web pages except where the Web Page is the result of, or a step in, a process.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#multiple-ways',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/multiple-ways.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#multiple-ways',
              references: {
              }
            },
            '2.4.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 2.4.6 Headings and Labels',
              description: 'Headings and labels describe topic or purpose.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#headings-and-labels',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#headings-and-labels',
              references: {
              }
            },
            '2.4.7': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_7,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 2.4.7 Focus Visible',
              description: 'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#focus-visible',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#focus-visible',
              references: {
              }
            },
            '2.4.8': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_8,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.4.8 Location',
              description: 'Information about the user\'s location within a set of Web pages is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#location',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/location.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#location',
              references: {
              }
            },
            '2.4.9': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_9,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.4.9 Link Purpose (Link Only)',
              description: 'A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#link-purpose-link-only',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#link-purpose-link-only',
              references: {
              }
            },
            '2.4.10': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_4_10,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.4.10 Section Headings',
              description: 'Section headings are used to organize the content.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#section-headings',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/section-headings.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#section-headings',
              references: {
              }
            }
          }
        },
        '2.5': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_2_5,
          title: 'Guideline 2.5 Input Modalities',
          description: 'Make it easier for users to operate functionality through various inputs beyond keyboard.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#input-modalities',
          success_criteria: {
            '2.5.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.5.1 Pointer Gestures',
              description: 'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pointer-gestures',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-gestures.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pointer-gestures',
              references: {
              }
            },
            '2.5.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.5.2 Pointer Cancellation',
              description: 'For functionality that can be operated using a single pointer, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pointer-cancellation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pointer-cancellation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pointer-cancellation',
              references: {
              }
            },
            '2.5.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.5.3 Label in Name',
              description: 'For user interface components with labels that include text or images of text, the name contains the text that is presented visually.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#label-in-name',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#label-in-name',
              references: {
              }
            },
            '2.5.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 2.5.4 Motion Actuation',
              description: 'Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#motion-actuation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/motion-actuation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#motion-actuation',
              references: {
              }
            },
            '2.5.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.5.5 Target Size',
              description: 'The size of the target for pointer inputs is at least 44 by 44 CSS pixels except when:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#target-size',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/target-size.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#target-size',
              references: {
              }
            },
            '2.5.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_2_5_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 2.5.6 Concurrent Input Mechanisms',
              description: 'Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#concurrent-input-mechanisms',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/concurrent-input-mechanisms.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#concurrent-input-mechanisms',
              references: {
              }
            }
          }
        }
      }
    },
    '3': {
      id: OpenAjax.a11y.WCAG20_PRINCIPLE.P_3,
      title: '3. Understandable',
      description: 'Information and the operation of user interface must be understandable.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#understandable',
      guidelines: {
        '3.1': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_3_1,
          title: 'Guideline 3.1 Readable',
          description: 'Make text content readable and understandable.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#readable',
          success_criteria: {
            '3.1.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 3.1.1 Language of Page',
              description: 'The default human language of each Web page can be programmatically determined.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#language-of-page',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#language-of-page',
              references: {
              }
            },
            '3.1.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 3.1.2 Language of Parts',
              description: 'The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#language-of-parts',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#language-of-parts',
              references: {
              }
            },
            '3.1.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.1.3 Unusual Words',
              description: 'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#unusual-words',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/unusual-words.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#unusual-words',
              references: {
              }
            },
            '3.1.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.1.4 Abbreviations',
              description: 'A mechanism for identifying the expanded form or meaning of abbreviations is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#abbreviations',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/abbreviations.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#abbreviations',
              references: {
              }
            },
            '3.1.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.1.5 Reading Level',
              description: 'When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#reading-level',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#reading-level',
              references: {
              }
            },
            '3.1.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_1_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.1.6 Pronunciation',
              description: 'A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#pronunciation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/pronunciation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#pronunciation',
              references: {
              }
            }
          }
        },
        '3.2': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_3_2,
          title: 'Guideline 3.2 Predictable',
          description: 'Make Web pages appear and operate in predictable ways.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#predictable',
          success_criteria: {
            '3.2.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 3.2.1 On Focus',
              description: 'When any user interface component receives focus, it does not initiate a change of context.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#on-focus',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/on-focus.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#on-focus',
              references: {
              }
            },
            '3.2.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 3.2.2 On Input',
              description: 'Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#on-input',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/on-input.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#on-input',
              references: {
              }
            },
            '3.2.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 3.2.3 Consistent Navigation',
              description: 'Navigational mechanisms that are repeated on multiple Web pages within a set of Web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#consistent-navigation',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-navigation.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#consistent-navigation',
              references: {
              }
            },
            '3.2.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 3.2.4 Consistent Identification',
              description: 'Components that have the same functionality within a set of Web pages are identified consistently.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#consistent-identification',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#consistent-identification',
              references: {
              }
            },
            '3.2.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_2_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.2.5 Change on Request',
              description: 'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#change-on-request',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/change-on-request.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#change-on-request',
              references: {
              }
            }
          }
        },
        '3.3': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_3_3,
          title: 'Guideline 3.3 Input Assistance',
          description: 'Help users avoid and correct mistakes.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#input-assistance',
          success_criteria: {
            '3.3.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 3.3.1 Error Identification',
              description: 'If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-identification',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-identification',
              references: {
              }
            },
            '3.3.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 3.3.2 Labels or Instructions',
              description: 'Labels or instructions are provided when content requires user input.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#labels-or-instructions',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#labels-or-instructions',
              references: {
              }
            },
            '3.3.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 3.3.3 Error Suggestion',
              description: 'If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-suggestion',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-suggestion',
              references: {
              }
            },
            '3.3.4': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_4,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 3.3.4 Error Prevention (Legal, Financial, Data)',
              description: 'For Web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-prevention-legal-financial-data',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-prevention-legal-financial-data',
              references: {
              }
            },
            '3.3.5': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_5,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.3.5 Help',
              description: 'Context-sensitive help is available.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#help',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/help.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#help',
              references: {
              }
            },
            '3.3.6': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_3_3_6,
              level: OpenAjax.a11y.WCAG20_LEVEL.AAA,
              title: 'Success Criterion 3.3.6 Error Prevention (All)',
              description: 'For Web pages that require the user to submit information, at least one of the following is true:',
              url_spec: 'https://www.w3.org/TR/WCAG21/#error-prevention-all',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-all.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#error-prevention-all',
              references: {
              }
            }
          }
        }
      }
    },
    '4': {
      id: OpenAjax.a11y.WCAG20_PRINCIPLE.P_4,
      title: '4. Robust',
      description: 'Content must be robust enough that it can be interpreted by by a wide variety of user agents, including assistive technologies.',
      url_spec: 'https://www.w3.org/TR/WCAG21/#robust',
      guidelines: {
        '4.1': {
          id: OpenAjax.a11y.WCAG20_GUIDELINE.G_4_1,
          title: 'Guideline 4.1 Compatible',
          description: 'Maximize compatibility with current and future user agents, including assistive technologies.',
          url_spec: 'https://www.w3.org/TR/WCAG21/#compatible',
          success_criteria: {
            '4.1.1': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_1,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 4.1.1 Parsing',
              description: 'In content implemented using markup languages, elements have complete start and end tags, elements are nested according to their specifications, elements do not contain duplicate attributes, and any IDs are unique, except where the specifications allow these features.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#parsing',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/parsing.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#parsing',
              references: {
              }
            },
            '4.1.2': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_2,
              level: OpenAjax.a11y.WCAG20_LEVEL.A,
              title: 'Success Criterion 4.1.2 Name, Role, Value',
              description: 'For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#name-role-value',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#name-role-value',
              references: {
              }
            },
            '4.1.3': {
              id: OpenAjax.a11y.WCAG20_SUCCESS_CRITERION.SC_4_1_3,
              level: OpenAjax.a11y.WCAG20_LEVEL.AA,
              title: 'Success Criterion 4.1.3 Status Messages',
              description: 'In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.',
              url_spec: 'https://www.w3.org/TR/WCAG21/#status-messages',
              url_understand: 'https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html',
              url_meet: 'https://www.w3.org/WAI/WCAG21/quickref/#status-messages',
              references: {
              }
            }
          }
        }
      }
    }
  }