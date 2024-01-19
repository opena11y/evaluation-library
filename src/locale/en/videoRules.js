/* audioRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const videoRules = {
  VIDEO_1: {
      ID:                    'Video 1',
      DEFINITION:            'Prerecorded video-only media must have either a text based alternative or an audio description track that presents equivalent information for prerecorded video-only content.',
      SUMMARY:               'Video-only (Prerecorded)',
      TARGET_RESOURCES_DESC: '@video@, @object@ and @embed@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify the media element with the @aria-describedby@ attributes is used for video-only content.   If so, verify the text description reference using the @aria-describedby@ describes the video-only content.',
        MANUAL_CHECK_P:     'Verify if any of the %N_MC media elements with the @aria-describedby@ attributes are used for video-only content.   If so, verify the text description reference using the @aria-describedby@ describes the video-only content.',
        HIDDEN_S: 'The @video@ element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H @video@ elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No @video@ elements found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element has audio description track',
        ELEMENT_MC_1: 'Verify the @%1@ element is used for video-only content.   If so, verify the text description reference using the @aria-describedby@ describes the video-only content.',
        ELEMENT_MC_2: 'Verify the @%1@ element is used for video-only content provides an audio track to describe the video content or text description of the video.',
        ELEMENT_MC_3: 'Verify the @%1@ element with @video@ in its @type@ attrbute is used for video-only content.  If so verify the @aria-describedby@ references a text description of the video-only content.',
        ELEMENT_MC_4: 'Verify the @%1@ element with @video@ in its @type@ attrbute is used for video-only content.  If so verify the video-only content has a text or audio descriptions.',
        ELEMENT_MC_5: 'Verify if the @%1@ element is used for video-only content.  If so verify the @aria-describedby@ references a text description of the video-only content.',
        ELEMENT_MC_6: 'Verify if the @%1@ element is used for video-only content.  If so verify the video-only content has a text or audio description.',
        ELEMENT_HIDDEN_1:  'The @%1@ element is hidden and therefore not evaluated.'
      },
      PURPOSES: [
        'This Success Criterion helps people who have difficulty perceiving visual content.',
        'Assistive technology can read text alternatives aloud, present them visually, or convert them to braille.',
        'Alternatives for timed-based media that are text based may help some people who have difficulty understanding the meaning of prerecorded video content.',
        'People who are deaf, are hard of hearing, or who are having trouble understanding audio information for any reason can read the text presentation. Research is ongoing regarding automatic translation of text into sign language.',
        'People who are deaf-blind can read the text in braille.',
        'Additionally, text supports the ability to search for non-text content and to re-purpose content in a variety of ways.'
      ],
      TECHNIQUES: [
        'For the @video@ eleemnt use the @track@ element to add audio descriptions to the video content.',
        'For @object@ and @embed@ elements use @aria-describedby@ to reference a text description of the video content.',
        'Include an audio sound track that describes the video content.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'W3C WCAG Understanding SC 1.2.1: Audio-only and Video-only (Prerecorded)',
          url:   'https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The video element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The track element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (ARIA) 1.2: aria-describedby',
          url:   'https://www.w3.org/TR/wai-aria/#aria-describedby'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G159: Providing an alternative for time-based media for video-only content',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G159'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G166: Providing audio that describes the important video content and describing it as such',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G166'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'H96: Using the track element to provide audio descriptions',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/html/H96'
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
          title: 'W3C: Making Audio and Video Media Accessible',
          url:   'https://www.w3.org/WAI/media/av/'
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

  VIDEO_2: {
      ID:                    'Video 2',
      DEFINITION:            'Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
      SUMMARY:               'Captions (Prerecorded)',
      TARGET_RESOURCES_DESC: '@video@, @object@ and @embed@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify that the media element has video with synchronized audio, if so verify the video includes captioning.',
        MANUAL_CHECK_P:     'Verify if any of the %N_MC media elements are video with synchronized audio, if so verify each video includes captioning.',
        HIDDEN_S: 'The media element that is hidden was not evaluated for captions.',
        HIDDEN_P: 'The %N_H media elements that are hidden were not evaluated for captions.',
        NOT_APPLICABLE:  'No media elements found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element has caption track.',
        ELEMENT_MC_1: 'Verify the @%1@ element is used for video with synchronized audio content.   If so, verify the the video includes open captioning or a caption track.',
        ELEMENT_MC_2: 'Verify the @%1@ element with @video@ in its @type@ attribute is used for video with synchronized audio content.  If so verify the video has open captioning or support a caption track.',
        ELEMENT_MC_3: 'Verify the @%1@ element is being used for video with synchronized audio content provides open captioning or a caption track.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is hidden and is not tested for captions.'
      },
      PURPOSES: [
        'People who are deaf or have a hearing loss can access the auditory information in the synchronized media content through captions.'
       ],
      TECHNIQUES: [
        'For the @video@ element use the @track@ element to add a caption track to the video content.',
        'Use WebVTT to encode the timed stamped captioning information for the audio content.',
        'Use open captions to include the captions as part of the video.',
        'If closed captions are not supported, use open captioning to include captions as part of the video.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
     { type:  REFERENCES.SPECIFICATION,
          title: 'W3C WCAG Understanding SC 1.2.2: Captions (Prerecorded)',
          url:   'https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The video element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The track element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'WebVTT: The Web Video Text Tracks Format',
          url:   'https://www.w3.org/TR/webvtt1/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G93: Providing open (always visible) captions',
          url:   'https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G87: Providing closed captions',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G87'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G87: Providing closed captions',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G87'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C: Making Audio and Video Media Accessible',
          url:   'https://www.w3.org/WAI/media/av/'
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
  VIDEO_3: {
      ID:                    'Video 3',
      DEFINITION:            'An audio description (preferred) or alternative for time-based media of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.',
      SUMMARY:               'Audio Description or Media Alternative (Prerecorded)',
      TARGET_RESOURCES_DESC: '@video@, @object@ and @embed@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify the @video@ element is used for prerecorded video with synchronized audio.   If so, verify the video includes an audio description or media alternative of the video content.',
        MANUAL_CHECK_P:     'Verify if any of the %N_MC @video@ elements are used for prerecorded video with synchronized audio.   If so, verify each of the videos includes an audio description or the media alternative of the video content.',
        HIDDEN_S: 'The media element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H media elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No media elements found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element has audio description track.',
        ELEMENT_MC_1: 'Verify the @%1@ element is used for video with synchronized audio content.   If so, verify the the video includes audio descriptions or media alternative.',
        ELEMENT_MC_2: 'Verify the @%1@ element with @video@ in its @type@ attribute is used for video with synchronized audio content.  If so verify the video has audio descriptions or media alternative.',
        ELEMENT_MC_3: 'Verify the @%1@ element is being used for video with synchronized audio content has an audio description or media alternative.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is hidden and is not tested for audio descriptions.'
      },
      PURPOSES: [
        'This Success Criterion may help some people who have difficulty watching video or other synchronized media content, including people who have difficulty perceiving or understanding moving images.'
      ],
      TECHNIQUES: [
        'For the @video@ element use the @track@ element to add audio descriptions to the video content.',
        'For @object@ and @embed@ elements use @aria-describedby@ to reference a text description of the video content.',
        '^Note:^ Audio descriptions are preferred over other alternatives since WCAG Success Criteria 1.2.5 (AA) requires the use of audio descriptions and legal requirements for accessibility include WCAG AA requirements.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.SPECIFICATION,
          title: 'W3C WCAG Understanding SC 1.2.3: Audio Description or Media Alternative (Prerecorded)',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The video element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The track element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G69: Providing an alternative for time based media',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G69'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'G78: Providing a second, user-selectable, audio track that includes audio descriptions',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G78'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'H96: Using the track element to provide audio descriptions',
          url:   'https://www.w3.org/WAI/WCAG22/Techniques/html/H96'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C: Making Audio and Video Media Accessible',
          url:   'https://www.w3.org/WAI/media/av/'
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
  VIDEO_4: {
      ID:                    'Video 4',
      DEFINITION:            'Captions are provided for all live audio content in synchronized media.',
      SUMMARY:               'Captions (Live)',
      TARGET_RESOURCES_DESC: '@video@, @object@ and @embed@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S: 'Verify that the media element has video with synchronized audio, if so verify the video includes captioning.',
        MANUAL_CHECK_P: 'Verify if any of the %N_MC media elements are video with synchronized audio, if so verify each video includes captioning.',
        HIDDEN_S:       'The media element that is hidden was not evaluated for captions.',
        HIDDEN_P:       'The %N_H media elements that are hidden were not evaluated for captions.',
        NOT_APPLICABLE: 'No media elements found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element has caption track.',
        ELEMENT_MC_1:   'Verify the @%1@ element is used for video with synchronized audio content.   If so, verify the the video includes open captioning or a caption track.',
        ELEMENT_MC_2:   'Verify the @%1@ element with @video@ in its @type@ attribute is used for video with synchronized audio content.  If so verify the video has open captioning or support a caption track.',
        ELEMENT_MC_3:   'Verify the @%1@ element is being used for video with synchronized audio content provides open captioning or a caption track.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is hidden and is not tested for captions.'
      },
      PURPOSES: [
        'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
        'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.'
      ],
      TECHNIQUES: [
        'For the @video@ element use the @track@ element to add audio descriptions to the video content.',
        'Use WebVTT to encode the timed stamped captioning information for the audio content.',
        'For @object@ and @embed@ elements use @aria-describedby@ to reference a text description of the video content.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C: Making Audio and Video Media Accessible',
          url:   'https://www.w3.org/WAI/media/av/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The video element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The track element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'WebVTT: The Web Video Text Tracks Format',
          url:   'https://www.w3.org/TR/webvtt1/'
        },
        { type:  REFERENCES.TECHNIQUE,
          title: 'WebVTT: The Web Video Text Tracks Format',
          url:   'https://www.w3.org/TR/webvtt1/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
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
  VIDEO_5: {
      ID:                    'Video 5',
      DEFINITION:            'Audio description is provided for all prerecorded video content in synchronized media.',
      SUMMARY:               'Audio Description (Prerecorded)',
      TARGET_RESOURCES_DESC: '@video@, @object@ and @embed@ elements',
      RULE_RESULT_MESSAGES: {
        MANUAL_CHECK_S:     'Verify the @video@ element is used for prerecorded video with synchronized audio.   If so, verify the video includes an audio description of the video content.',
        MANUAL_CHECK_P:     'Verify if any of the %N_MC @video@ elements are used for prerecorded video with synchronized audio.   If so, verify each of the videos includes an audio description of the video content.',
        HIDDEN_S: 'The media element that is hidden was not evaluated.',
        HIDDEN_P: 'The %N_H media elements that are hidden were not evaluated.',
        NOT_APPLICABLE:  'No media elements found on this page.'
      },
      BASE_RESULT_MESSAGES: {
        ELEMENT_PASS_1: '@%1@ element has audio description track.',
        ELEMENT_MC_1: 'Verify the @%1@ element is used for video with synchronized audio content.   If so, verify the the video includes audio descriptions.',
        ELEMENT_MC_2: 'Verify the @%1@ element with @video@ in its @type@ attribute is used for video with synchronized audio content.  If so verify the video has audio descriptions.',
        ELEMENT_MC_3: 'Verify the @%1@ element is being used for video with synchronized audio content has an audio description.',
        ELEMENT_HIDDEN_1: 'The @%1@ element is hidden and is not tested for audio descriptions.'
      },
      PURPOSES: [
        'Text and audio descriptions provide a means for people who cannot see the video to understand the video content.',
        'Some types of learning disabilities affect visual processing, text and audio descriptions provide an alternative way to understand the video content.'      ],
      TECHNIQUES: [
        'For the @video@ eleemnt use the @track@ element to add audio descriptions to the video content.',
        'For @object@ and @embed@ elements use @aria-describedby@ to reference a text description of the video content.'
      ],
      MANUAL_CHECKS: [
      ],
      INFORMATIONAL_LINKS: [
        { type:  REFERENCES.TECHNIQUE,
          title: 'W3C: Making Audio and Video Media Accessible',
          url:   'https://www.w3.org/WAI/media/av/'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The video element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-video-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'HMTL: The track element',
          url:   'https://html.spec.whatwg.org/multipage/media.html#the-track-element'
        },
        { type:  REFERENCES.SPECIFICATION,
          title: 'Accessible Rich Internet Applications (ARIA) 1.0: aria-describedby',
          url:   'https://www.w3.org/TR/wai-aria-1.2/#aria-describedby'
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
