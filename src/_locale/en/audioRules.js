/* audioRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const audioRules = {
  AUDIO_1: {
    ID:                    'Audio 1',
    DEFINITION:            '@audio@ elements must have caption or text transcription of the audio content.',
    SUMMARY:               '@audio@ must have alternative',
    TARGET_RESOURCES_DESC: '@audio@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:         'Add caption or text transcript to @audio@ element',
      FAIL_P:         'Add a caption or text transcript to each of the %N_F the @audio@ elements with out captions or transcripts.',
      MANUAL_CHECK_S: 'Verify the @audio@ element has either a caption or text transcript of the audio content.',
      MANUAL_CHECK_P: 'Verify the %N_MC @audio@ elements are audio only have either a caption or text transcript of the audio.',
      HIDDEN_S:       'The @audio@ element that is hidden was not analyzed for accessible audio.',
      HIDDEN_P:       'The %N_H @audio@ elements that are hidden were not analyzed for accessible audio.',
      NOT_APPLICABLE: 'No @audio@ elements found on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:    '@audio@ element has caption.',
      ELEMENT_PASS_2:    '@audio@ element has a text transcript.',
      ELEMENT_FAIL_1:    'Add caption or text transcript to @audio@ element.',
      ELEMENT_MC_1:      'Verify the @audio@ element has captions or text transcript.',
      ELEMENT_HIDDEN_1:  'The @audio@ element is hidden and was not evaluated.'
    },
    PURPOSES: [
      'Captions and text transcripts provide a means for people cannot hear the audio to understand the audio content.',
      'Some types of learning disabilities affect speech perception, captions and text transcripts provide an alternative way to understand the audio content.',
      'When the language of the audio is different than the native language of the listener, captions and text transcripts support the listener in understanding the audio content.'
    ],
    TECHNIQUES: [
      'Use the @track@ element to add captioning to the audio content.',
      'Use WebVTT to encode the timed stamped captioning information for the audio content.',
      'Use @aria-describedby@ to reference a text transcript of the audio content.'
    ],
    MANUAL_CHECKS: [
      'When captions are enabled on the media player, check to make sure the captions visible.',
      'If there is a caption make sure the captions accurately represents the audio content.',
      'If there is a text transcript make sure the transcript accurately represents the audio content.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL: The audio element',
        url:   'https://html.spec.whatwg.org/multipage/media.html#the-audio-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL: The track element',
        url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'WebVTT: The Web Video Text Tracks Format',
        url:   'https://www.w3.org/TR/webvtt1/'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (ARIA) 1.2: aria-describedby',
        url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'University of Washington: Creating Accessible Videos',
        url:   'https://www.washington.edu/accessibility/videos/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Captions, Transcripts, and Audio Descriptions',
        url:   'https://webaim.org/techniques/captions/'
      }
    ]
  },
  AUDIO_2: {
    ID:                    'Audio 2',
    DEFINITION:            '@object@ elements used for audio only must have caption or text transcription of the audio content.',
    SUMMARY:               '@object@ for audio must have alternative',
    TARGET_RESOURCES_DESC: '@object@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:   'Add caption or text transcript to @object@ element.',
      FAIL_P:   'Add a caption or text transcript to each of the %N_F the @object@ elements with out captions or transcripts.',
      MANUAL_CHECK_S:     'Check if the @object@ element is audio only content.  If it is audio only make sure it has either a caption or text transcript of the audio content.',
      MANUAL_CHECK_P:     'Check if any of the %N_MC @object@ elements are audio only. If any are audio only make sure they have either a caption or text transcript of the audio.',
      HIDDEN_S: 'The @object@ element that is hidden was not analyzed for accessible audio.',
      HIDDEN_P: 'The %N_H @object@ elements that are hidden were not analyzed for accessible audio.',
      NOT_APPLICABLE:  'No @embed@ elements found on this page.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:   '@object@ element references text transcript.',
      ELEMENT_FAIL_1:   'Add captions or text transcript to @object@ element.',
      ELEMENT_MC_1:     'Verify the @object@ element has synchronous captions.',
      ELEMENT_MC_2:     'Verify the @object@ element only renders audio only, if it is audio only verify that it has captions or text transcript.',
      ELEMENT_HIDDEN_1: 'The @object@ element is hidden and was not evaluated.'
    },
    PURPOSES: [
      'Captions and text transcripts provide a means for people cannot hear the audio to understand the audio content.',
      'Some types of learning disabilities affect speech perception, captions and text transcripts provide an alternative way to understand the audio content.',
      'When the language of the audio is different than the native language of the listener, captions and text transcripts support the listener in understanding the audio content.'
    ],
    TECHNIQUES: [
      'Use the @audio@ element instead of the @object@ element for audio only content, since the @audio@ element provides better support for captions and text transcripts.',
      'Use @aria-describedby@ attribute to point to a text description of the audio only content.'
    ],
    MANUAL_CHECKS: [
      'Check the web page for a link to a text transcript of the audio, or if the transcript is part of the page rendering the audio.',
      'Check the media player for a button to turn on and off captions.',
      'When captions are enabled on the media player, check to make sure the captions visible and represent the speech and sounds heard on the audio.',
      'In some cases "open" captions might be used, this means the captions are always "on" as part of the video.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL: The object element',
        url:   'https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-object-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (ARIA) 1.2: aria-describedby',
        url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'University of Washington: Creating Accessible Videos',
        url:   'https://www.washington.edu/accessibility/videos/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Captions, Transcripts, and Audio Descriptions',
        url:   'https://webaim.org/techniques/captions/'
      }
    ]
  },
  AUDIO_3: {
    ID:                    'Audio 3',
    DEFINITION:            '@embed@ elements used for audio only must have caption or text transcription of the audio content.',
    SUMMARY:               '@embed@ for audio must have alternative',
    TARGET_RESOURCES_DESC: '@embed@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:          'Add caption or text transcript to @embed@ element.',
      FAIL_P:          'Add a caption or text transcript to each of the %N_F @embed@ elements without captions or transcripts.',
      MANUAL_CHECK_S:  'Check if the @embed@ element is audio only content.  If it is audio only make sure it has either a caption or text transcript of the audio content.',
      MANUAL_CHECK_P:  'Check if any of the %N_MC @embed@ elements are audio only. If any are audio only make sure they have either a caption or text transcript of the audio.',
      HIDDEN_S:        'The @embed@ element that is hidden was not analyzed for accessible audio.',
      HIDDEN_P:        'The %N_H @embed@ elements that are hidden were not analyzed for accessibile audio.',
      NOT_APPLICABLE:  'No @embed@ elements found on this page'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:   '@embed@ element references text transcript.',
      ELEMENT_FAIL_1:   'Add captions or text transcript to @embed@ element.',
      ELEMENT_MC_1:     'Verify the @embed@ element has synchronous captions.',
      ELEMENT_MC_2:     'Verify the @embed@ element only renders audio only, if it is audio only verify that it has captions or text transcript.',
      ELEMENT_HIDDEN_1: 'The @object@ element is hidden and was not evaluated.'
    },
    PURPOSES: [
      'Captions and text transcripts provide a means for people cannot hear the audio to understand the audio content.',
      'Some types of learning disabilities affect speech perception, captions and text transcripts provide an alternative way to understand the audio content.',
      'When the language of the audio is different than the native language of the listener, captions and text transcripts support the listener in understanding the audio content.'
    ],
    TECHNIQUES: [
      'Use the @audio@ element instead of the @embed@ element for audio only content, since the @audio@ element provides better support for captions and text transcripts.',
      'Use @aria-describedby@ attribute to point to a text description of the audio only content.'
    ],
    MANUAL_CHECKS: [
      'Check the web page for a link to a text transcript of the audio, or if the transcript is part of the page rendering the audio.',
      'Check the media player for a button to turn on and off captions',
      'When captions are enabled on the media player, check to make sure the captions visible and represent the speech and sounds heard on the audio.',
      'In some cases "open" captions might be used, this means the captions are always "on" as part of the video.'
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL: The embed element',
        url:   'https://html.spec.whatwg.org/multipage/iframe-embed-object.html#the-embed-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'Accessible Rich Internet Applications (ARIA) 1.2: aria-describedby',
        url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'University of Washington: Creating Accessible Videos',
        url:   'https://www.washington.edu/accessibility/videos/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Captions, Transcripts, and Audio Descriptions',
        url:   'https://webaim.org/techniques/captions/'
      }
    ]
  },
  AUDIO_4: {
    ID:                    'Audio 4',
    DEFINITION:            'Media content with audio that automatically starts playing when the page loads and lasts longer than 3 seconds must provide a means for the user able to stop, pause or mute the audio content.',
    SUMMARY:               'Pause, stop or mute audio',
    TARGET_RESOURCES_DESC: 'Content that is used to auto play media that includes audio content',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:     'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.',
      MANUAL_CHECK_P:     'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.'
    },
    BASE_RESULT_MESSAGES: {
      PAGE_MC_1:   'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.'
    },
    PURPOSES:        [ 'Audio content interferes with people using speech based assistive technologies like screen readers.'
                    ],
    TECHNIQUES:     [ 'Remove or disable the auto playing of media that includes audio content.',
                      'Provide a means to pause, stop or mute the audio content.',
                      'Use cookies to preserve the user preference of pausing, stopping or muting the audio content.'
                    ],
    MANUAL_CHECKS:  [ 'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.'
                    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'WCAG 2.1 Success Criterion 1.4.2 Audio Control',
        url:   'https://www.w3.org/TR/WCAG21/#audio-control'
      },
      { type:  REFERENCES.WCAG_TECHNIQUE,
        title: 'How to meet Success Criterion 1.4.2 Audio Control',
        url:   'https://www.w3.org/WAI/WCAG21/quickref/#audio-control'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'University of Washington: Creating Accessible Videos',
        url:   'https://www.washington.edu/accessibility/videos/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebAIM: Captions, Transcripts, and Audio Descriptions',
        url:   'https://webaim.org/techniques/captions/'
      }
    ]
  }
}
