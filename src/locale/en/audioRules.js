/* video-onlyRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English              */
/* --------------------------------------------------------------------------- */

export const audioRules = {
  AUDIO_1: {
    ID:                    'Audio 1',
    DEFINITION:            'For prerecorded audio-only media provide a text transcript that presents equivalent information of prerecorded content. Exception for when the audio is a media alternative for text and is clearly labeled as such.',
    SUMMARY:               'Audio-only  (Prerecorded)',
    TARGET_RESOURCES_DESC: '@audio@, @object@ and @embed@ elements',
    RULE_RESULT_MESSAGES: {
      FAIL_S:         'Add a text transcript to the @audio@ element with out captions or transcripts',
      FAIL_P:         'Add a  text transcript to each of the %N_F the audio-only elements with out a text transcript.',
      MANUAL_CHECK_S: 'Verify if the media element is audio-only, if it is audio-only verify that it has a text transcript of the audio content.',
      MANUAL_CHECK_P: 'Verify the if the %N_MC media elements are audio-only, if any are audio-only verify it has a text transcript of the audio content.',
      HIDDEN_S:       'The media element that is hidden was not analyzed for accessible audio.',
      HIDDEN_P:       'The %N_H media elements that are hidden were not analyzed for accessible audio.'
    },
    BASE_RESULT_MESSAGES: {
      ELEMENT_PASS_1:    '@%1@ element has caption track.',
      ELEMENT_PASS_2:    '@%1@ element has a text transcript.',
      ELEMENT_FAIL_1:    'Provide a text transcript for @%1@ element content.',
      ELEMENT_MC_1:      'Verify the audio media content has a text transcript.',
      ELEMENT_MC_2:      'Verify the @%1@ element is providing audio-only content, and if it is audio-only that is has captions or text transcript.',
      ELEMENT_HIDDEN_1:  'The @%1@ element is hidden and was not evaluated.'
    },
    PURPOSES: [
      'People who are deaf, are hard of hearing, or who are having trouble understanding audio information for any reason can read the text transcripts.',
      'People who are deaf-blind can read the text in braille.',
      'Additionally, text transcripts support the ability to search for non-text content and to repurpose content in a variety of ways.'
    ],
    TECHNIQUES: [
      'For the @audio@ eleemnt use the @track@ element to add captioning to the audio content.',
      'Use WebVTT to encode the timed stamped captioning information for the audio content.',
      'Use @aria-describedby@ to reference an equivalent text description of the audio content.'
    ],
    MANUAL_CHECKS: [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'Understanding SC 1.2.1: Audio-only and Video-only (Prerecorded) ',
        url:   'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'W3C: Making Audio and Video Media Accessible',
        url:   'https://www.w3.org/WAI/media/av/'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL Specification: The audio element',
        url:   'https://html.spec.whatwg.org/multipage/media.html#the-audio-element'
      },
      { type:  REFERENCES.SPECIFICATION,
        title: 'HMTL Specification: The track element',
        url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'WebVTT: The Web Video Text Tracks Format',
        url:   'https://www.w3.org/TR/webvtt1/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'G158: Providing an alternative for time-based media for audio-only content',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G158'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'F30: Failure of Success Criterion 1.1.1 and 1.2.1 due to using text alternatives that are not alternatives (e.g., filenames or placeholder text)',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F30'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'F67: Failure of Success Criterion 1.1.1 and 1.2.1 due to providing long descriptions for non-text content that does not serve the same purpose or does not present the same information',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F67'
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
    DEFINITION:            'Media content with audio that automatically starts playing when the page loads and lasts longer than 3 seconds must provide a means for the user able to stop, pause or mute the audio content.',
    SUMMARY:               'Audio Control',
    TARGET_RESOURCES_DESC: 'Content that is used to auto play media that includes audio content',
    RULE_RESULT_MESSAGES: {
      MANUAL_CHECK_S:     'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.',
      MANUAL_CHECK_P:     'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.'
    },
    BASE_RESULT_MESSAGES: {
      PAGE_MC_1:   'Verify that there is no media content that plays automatically and includes audio content that lasts longer than 3 seconds.  If the audio content lasts longer than 3 seconds, verify the user can pause, stop or mute the audio.'
    },
    PURPOSES: [
      'Individuals who use screen reading technologies can hear the screen reader without other sounds playing. This is especially important for those who are hard of hearing and for those whose screen readers use the system volume (so they cannot turn sound down and screen reader up).',
      'People who have difficulty focusing on visual content (including text) benefit when audio is playing.'
    ],
    TECHNIQUES: [
      'Remove or disable the auto playing of media that includes audio content.',
      'Provide a means to pause, stop or mute the audio content.',
      'Use cookies to preserve the user preference of pausing, stopping or muting the audio content.'
    ],
    MANUAL_CHECKS:  [
    ],
    INFORMATIONAL_LINKS: [
      { type:  REFERENCES.SPECIFICATION,
        title: 'WCAG Understanding 1.4.2 Audio Control',
        url:   'https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'W3C: Making Audio and Video Media Accessible',
        url:   'https://www.w3.org/WAI/media/av/'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'G60: Playing a sound that turns off automatically within three seconds',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G60'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'G170: Providing a control near the beginning of the Web page that turns off sounds that play automatically',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G170'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'G171: Playing sounds only on user request',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G171'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'F23: Failure of 1.4.2 due to playing a sound longer than 3 seconds where there is no mechanism to turn it off',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F23'
      },
      { type:  REFERENCES.TECHNIQUE,
        title: 'F93: Failure of Success Criterion 1.4.2 for absence of a way to pause or stop an HTML5 media element that autoplays',
        url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F93'
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
