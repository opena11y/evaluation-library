/* shortcutRules.js */

import {REFERENCES} from '../../constants.js';

/* --------------------------------------------------------------------------- */
/*       OpenA11y Rules Localized Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */

export const shortcutRules = {
  SHORTCUT_1: {
        ID:                    'Shortcut 1',
        DEFINITION:            'If the page has author defined keyboard shortcuts, verify the user has control over the use the shortcuts',
        SUMMARY:               'Character Key Shortcuts',
        TARGET_RESOURCES_DESC: 'Page',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  ' The evaluation can not automatically determine if their is any functionality activated by keyboard shortcuts defined by the page author, but there is scripting on the page so it is possible.  Please review the WCAG requirements for accessibility and determine if the requirements apply to this page.',
        },
        BASE_RESULT_MESSAGES: {
          PAGE_MC_1: 'Verify if the page has author defined keyboard shortcuts, if the page does support shortcuts, verify the user can disable or remap each shortcut, or a shortcut is only available when a specific component has focus.',
        },
        PURPOSES: [
          'Screen reader users will be able to turn off single-key shortcuts so they can avoid accidentally firing batches of them at once. This will allow speech users to make full use of programs that offer single-key shortcuts to keyboard users.',
          'Keyboard-only users who have dexterity challenges can also be prone to accidentally hitting keys. Those users would be able to avoid problematic single character shortcuts by turning them off or modifying them to include at least one non-character key.',
          'Allowing all shortcut keys to be remapped can help users with some cognitive disabilities, since the same shortcuts can be assigned to perform the same actions across different applications.'
        ],
        TECHNIQUES: [
          'The shortcut can be turned off.',
          'Provide a way to change the shortcut to include one or more non-printable keyboard keys, for example Ctrl or Alt.',
          'The keyboard shortcut for a user interface component is only active when that component has focus.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C Understanding Character Key Shortcuts ',
            url:   'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'G217: Providing a mechanism to allow users to remap or turn off character key shortcuts',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/general/G217'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'F99: Failure of Success Criterion 2.1.4 due to implementing character key shortcuts that cannot be turned off or remapped',
            url:   'https://www.w3.org/WAI/WCAG21/Techniques/failures/F99'
          }
        ]
  },
  SHORTCUT_2: {
        ID:                    'Shortcut 2',
        DEFINITION:            'Avoid using @accesskey@ attribute for shortcuts due to potential conflicts with browser and assistive technology shortcuts.',
        SUMMARY:               'Avoid using @accesskey@ for shortcuts',
        TARGET_RESOURCES_DESC: 'Element',
        RULE_RESULT_MESSAGES: {
          MANUAL_CHECK_S:  'Verify the accesskey does not interfere with shortcuts used by the browser or assistive technologies.',
          MANUAL_CHECK_P:  'Verify none of the %N_MC accesskeys interfere with shortcuts used by the browser or assistive technologies.',
        },
        BASE_RESULT_MESSAGES: {
          ELEMENT_MC_1:     'Verify the @%1@ accesskey does not interfere with shortcuts used by the browser or assistive technologies.',
          ELEMENT_HIDDEN_1: 'The @%1@ accesskey is on a hidden element and not tested for accessibility.',
        },
        PURPOSES: [
          'An @accesskey@ value can conflict with a system or browser keyboard shortcut, or assistive technology functionality. What may work for one combination of operating system, assistive technology, and browser may not work with other combinations.',
          'Certain @accesskey@ values may not be present on certain keyboards, especially when internationalization is a concern. So adapting to specific languages could cause further problems.',
          '@accesskey@ values that rely on numbers may be confusing to individuals experiencing cognitive concerns, where the number doesn\'t have a logical association with the functionality it triggers.',
          'Informing the user that @accesskey@s are present, so that they are aware of the functionality. If the system lacks a method of notifying the user about this feature, the user might accidentally activate @accesskey@s.'
        ],
        TECHNIQUES: [
          'Remove the use of the @accesskey@ attribute.',
          'Use scripting instead of @accesskey@ attribute to define shortcuts.  The scripting must meet the WCAG 2.1.4 requirements for shortcuts.'
        ],
        MANUAL_CHECKS: [
        ],
        INFORMATIONAL_LINKS: [
          { type:  REFERENCES.SPECIFICATION,
            title: 'W3C Understanding Character Key Shortcuts ',
            url:   'https://www.w3.org/WAI/WCAG21/Understanding/character-key-shortcuts.html'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'MDN: accesskey',
            url:   'https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey'
          },
          { type:  REFERENCES.TECHNIQUE,
            title: 'WebAIM: Accesskey',
            url:   'https://webaim.org/techniques/keyboard/accesskey#spec'
          }
        ]
  }

}

