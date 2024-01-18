/* pointerRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const pointerRules = {
  POINTER_1: {
        ID:                    'Pointer 1',
        DEFINITION:            'All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.',
        SUMMARY:               'Pointer Gestures',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if their is any functionality activated by multi-touch or tracing a path with a pointer, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if the requirements apply to this page or the exception is met.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'The evaluation can not automatically determine if their is any functionality activated by multi-touch or tracing a path with a pointer, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if the requirements apply to this page or the exception is met.',
        },
        PURPOSES: [
          'Some people cannot perform gestures in a precise manner, or they may use a specialized or adapted input device such as a head pointer, eye-gaze system, or speech-controlled mouse emulator.',
          'Some pointing methods lack the capability or accuracy to perform multipoint or path-based gestures.'
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
        DEFINITION:            'For functionality that can be operated using a single pointer, at least one of the following is true: "No Down-Event", "abort or undo", "up Reversal" techniques, unless completing the function is essential.',
        SUMMARY:               'Pointer Cancellation',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'The evaluation can not automatically determine if their is any functionality activated by pointer interaction, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if using a single pointer requirements apply to this page, if they do verify at least one of the following is true: "No Down-Event", "abort or undo", "up Reversal" techniques; or the essential exception is met.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'The evaluation can not automatically determine if their is any functionality activated by pointer interaction, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if using a single pointer requirements apply to this page, if they do verify at least one of the following is true: "No Down-Event", "abort or undo", "up Reversal" techniques; or the essential exception is met.',
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
  },

  POINTER_3: {
        ID:                    'Pointer 3',
        DEFINITION:            'All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent and not modified by the author.',
        SUMMARY:               'Dragging Movements',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S: 'The evaluation library cannot automatically determine if any dragging operations exist on a page and if they do if the operation can be completed with a single pointer without dragging.  Verification requires understanding the requirements to see if they apply to the page and if they do interacting with the page with a single pointer to verify the requirement is met or that essential exception applies.'
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'The evaluation library cannot automatically determine if any dragging operations exist on a page and if they do if the operation can be completed with a single pointer without dragging.  Verification requires understanding the requirements to see if they apply to the page and if they do interacting with the page with a single pointer to verify the requirement is met or that essential exception applies.'
        },
        PURPOSES: [
          'Users who struggle with performing dragging movements can still operate an interface with a pointer interface.'
        ],
        TECHNIQUES: [
          'Example: A map allows users to drag the view of the map around, and the map has up/down/left/right buttons to move the view as well.',
          'Example: A sortable list of elements may, after tapping or clicking on a list element, provide adjacent controls for moving the element up or down in the list by simply tapping or clicking on those controls.',
          'Example: A taskboard that allows users to drag and drop items between columns also provides an additional pop-up menu after tapping or clicking on items for moving the selected element to another column by tapping or clicking on pop-up menu entries.',
          'Example: A radial control widget (color wheel) where the value can be set by dragging the marker for the currently selected color to another position, also allows picking another color value by tapping or clicking on another place in the color wheel.',
          'Example: A linear slider control widget, where the value can be set by dragging the visual indicator (thumb) showing the current value, allows tapping or clicking on any point of the slider track to change the value and set the thumb to that position.',
          'Example: A widget where you can drag a gift to one person in a photo of a group of people also has a menu alternative where users can select the person that should receive the gift from the menu.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C WCAG: Understanding Dragging Movements',
            url:   'https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G219: Ensuring that an alternative is available for dragging movements that operate on content',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/general/G219'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F108: Failure of Success Criterion 2.5.7 Dragging Movements due to not providing a single pointer method for the user to operate a function that does not require a dragging movement',
            url:   'https://www.w3.org/WAI/WCAG22/Techniques/failures/F108'
          }
        ]
  }
}

