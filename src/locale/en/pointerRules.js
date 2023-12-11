/* pointerRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const pointerRules = {
  POINTER_1: {
        ID:                    'Pointer 1',
        DEFINITION:            'Verify all functionality that uses multi-touch or tracing a path with a pointer for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
        SUMMARY:               'Pointer Gestures',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if their is any functionality activated by multi-touch or tracing a path with a pointer, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if the requirements apply to this page.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify all functionality that uses multi-touch or tracing a path for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
        },
        PURPOSES: [
          'Alternatives to multi-touch and path specific movements is required to ensure that content can be controlled with a range of pointing devices, abilities, and assistive technologies. Some people cannot perform gestures in a precise manner, or they may use a specialized or adapted input device such as a head pointer, eye-gaze system, or speech-controlled mouse emulator. Some pointing methods lack the capability or accuracy to perform multipoint or path-based gestures.',
          'A path-based gesture involves an interaction where not just the endpoints matter. If going through an intermediate point (usually near the start of the gesture) also affects its meaning then it is a path-based gesture. The user engages a pointer (starting point), carries out a movement that goes through at least one intermediate-point before disengaging the pointer (end point). The intermediate point defines the gesture as requiring a specific path, even if the complete path is not defined.'
        ],
        TECHNIQUES: [
          'Example: A web site includes a map view that supports the pinch gesture to zoom into the map content. User interface controls offer the operation using plus and minus buttons to zoom in and out. ',
          'Example: A web site includes a map view that supports the pinch gesture to zoom into the map content. As an single-pointer alternative, the map also allows users to double-tap, hold, and then move the pointer up or down to zoom in or out. ',
          'Example: A news site has a horizontal content slider with hidden news teasers that can moved into the viewport via a fast horizontal swipe/flicking motion. It also offers forward and backward arrow buttons for single-point activation to navigate to adjacent slider content. ',
          'Example: A kanban widget with several vertical areas representing states in a defined process allows the user to right- or left-swipe elements to move them to an adjacent silo. The user can also accomplish this by selecting the element with a single tap or click, and then activating an arrow button to move the selected element. ',
          'Example: A custom slider requires movement in a strict left/right direction when operated by dragging the thumb control. Buttons on both sides of the slider increment and decrement the selected value and update the thumb position. '        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Pointer Gestures',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/pointer-gestures.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G215: Providing controls to achieve the same result as path based or multipoint gestures',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G215'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G216: Providing single point activation for a control slider',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G216'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F105: Failure of Success Criterion 2.5.1 due to providing functionality via a path-based gesture without simple pointer alternative',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F105'
          }
        ]
  },

  POINTER_2: {
        ID:                    'Pointer 2',
        DEFINITION:            'Verify users can cancel pointer events using either "No Down-Event", "abort or undo", "up Reversal" techniques, unless completing the function is essential.',
        SUMMARY:               'Pointer Cancellation',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if their is any functionality activated by pointer interaction, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if the requirements apply to this page.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify users can cancel pointer events using either "No Down-Event", "abort or undo", "up Reversal" techniques, unless completing the function is essential.',
        },
        PURPOSES: [
          'Pointer events that can be cancelled make it easier for users to prevent accidental or erroneous pointer input. People with various disabilities can inadvertently initiate touch or mouse events with unwanted results.',
          'Makes it easier for all users to recover from hitting the wrong target.',
          'Helps people with visual disabilities, cognitive limitations, and motor impairments by reducing the chance that a control will be accidentally activated or an action will occur unexpectedly, and also ensures that where complex controls are activated, a means of Undoing or Aborting the action is available. ',
          'Individuals who are unable to detect changes of context are less likely to become disoriented while navigating a site. '
        ],
        TECHNIQUES: [
          'No Down-Event: The down-event of the pointer is not used to execute any part of the function',
          'Abort or Undo: Completion of the function is on the up-event, and a mechanism is available to abort the function before completion or to undo the function after completion.',
          'Up Reversal: The up-event reverses any outcome of the preceding down-event.',
          'Essential: Completing the function on the down-event is essential.',
          'Example: For interface elements that have a single tap or long press as input, the corresponding event is triggered when the finger is lifted inside that element. ',
          'Example: A drag-and-drop interface allows users to sort vertically stacked cards by picking up one card with the pointer (down-event), move it to a new position, and insert it at the new location when the pointer is released (up-event). Releasing the pointer outside the drop target area reverts the action, i.e., it moves the card back to the old position before the interaction started.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Pointer Cancellation',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/pointer-cancellation.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G210: Ensuring that drag-and-drop actions can be cancelled',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G210'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G212: Using native controls to ensure functionality is triggered on the up-event.',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G212'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F101: Failure of Success Criterion 2.5.2 due to activating a control on the down-event',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F101'
          }
        ]
  }
}

