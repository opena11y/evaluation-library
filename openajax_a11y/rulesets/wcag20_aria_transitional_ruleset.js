/**
 * Copyright 2011-2021 OpenAjax Alliance
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

// import {OpenAjax} from '../openajax_a11y_constants.js';

/* --------------------------------------------------------------------------- */
/* OpenAjax Alliance (OAA) ARIA Transitional Rule Mapping (Beta)               */
/* --------------------------------------------------------------------------- */

(function () {

  var ruleset_info = {
    ruleset_id    : "ARIA_TRANS",
    version       : "1.2.0",
    last_updated  : "2021-07-07",
    author        : "OpenAjax Accessibility Task Force",
    author_url    : "https://www.openajax.org/member/wiki/Accessibility",

    nls : {
      'en-us' : {
         title           : "HTML4 Legacy Techniques",
         abbrev          : "HTML4",
         tooltip         : "WCAG 2.0 Level A and AA requirements primarily using HTML4 techniques, but allows HTML5 and ARIA accessibility techniques.",
         description     : "Evaluation of W3C Web Content Accessibility Guidelines 2.0 Level A and AA conformance using HTML4 accessibility techniques, but allows for the use of HTML5 and ARIA techniques.  ARIA landmarks are NOT required, but if used must follow landmark and sectioning element requirements as outlined in HTML5 and ARIA.  The ruleset does NOT require the use of ARIA widget roles for identifying and describing interactive elements (e.g. popup menus, grids, trees, etc...) that cannot be not described by the native semantics of HTML4 and HTML5 form control and link elements.  This means the developer will need to do more manual checking and have a high level understanding of assistive technology to describe widgets typically using offscreen text and/or small images (e.g. with ALT text) to define and manage the roles, properties and states of interactive elements. ",
         description_url : ""
      }
    }
  };

  var rule_mappings = {
   AUDIO_1 : {
       required : true,
       enabled  : true
     },
   AUDIO_2 : {
       required : true,
       enabled  : true
     },
   AUDIO_3 : {
       required : true,
       enabled  : true
     },
   AUDIO_4 : {
       required : true,
       enabled  : true
     },
   BYPASS_1 : {
       required : false,
       enabled  : true
   },
   COLOR_1 : {
       required : true,
       enabled  : true
     },
   COLOR_2 : {
       required : true,
       enabled  : true
     },
   CONTROL_1 : {
       required : true,
       enabled  : true
     },
   CONTROL_2 : {
       required : true,
       enabled  : true
     },
   CONTROL_3 : {
       required : true,
       enabled  : true
     },
   CONTROL_4 : {
       required : true,
       enabled  : true
     },
   CONTROL_5 : {
       required : true,
       enabled  : true
     },
   CONTROL_6 : {
       required : true,
       enabled  : true
     },
   CONTROL_7 : {
       required : true,
       enabled  : true
     },
   CONTROL_8 : {
       required : true,
       enabled  : true
     },
   CONTROL_9 : {
       required : true,
       enabled  : true
     },
   CONTROL_10 : {
       required : true,
       enabled  : true
     },
   CONTROL_11 : {
       required : true,
       enabled  : true
     },
   ERROR_1 : {
       required : true,
       enabled  : true
     },
   ERROR_2 : {
       required : true,
       enabled  : true
     },
   ERROR_4 : {
       required : true,
       enabled  : true
     },
   ERROR_5 : {
       required : true,
       enabled  : true
     },
   FOCUS_1 : {
       required : true,
       enabled  : true
     },
   FOCUS_2 : {
       required : true,
       enabled  : true
     },
   FOCUS_3 : {
       required : true,
       enabled  : true
     },
   FOCUS_4 : {
       required : true,
       enabled  : true
     },
   FOCUS_5 : {
       required : true,
       enabled  : true
     },
   FRAME_1 : {
     required : true,
     enabled  : true
   },
   FRAME_2 : {
      required : true,
      enabled  : true
   },
   HEADING_1 : {
       required : false,
       enabled  : true
     },
   HEADING_2 : {
       required : false,
       enabled  : true
     },
   HEADING_3 : {
       required : false,
       enabled  : true
     },
   HEADING_5 : {
       required : true,
       enabled  : true
     },
   HEADING_6 : {
       required : false,
       enabled  : true
     },
   HTML_2 : {
       required : true,
       enabled  : true
     },
   HTML_3 : {
       required : true,
       enabled  : true
     },
   IMAGE_1 : {
       required : true,
       enabled  : true
     },
   IMAGE_2 : {
       required : true,
       enabled  : true
     },
   IMAGE_3 : {
       required : true,
       enabled  : true
     },
   IMAGE_4_EN : {
       required : false,
       enabled  : true
     },
   IMAGE_5 : {
       required : true,
       enabled  : true
     },
   IMAGE_6 : {
       required : true,
       enabled  : true
     },
    IMAGE_7 : {
      required : true,
      enabled  : true
    },
   KEYBOARD_1 : {
       required : true,
       enabled  : true
     },
   KEYBOARD_2 : {
       required : true,
       enabled  : true
     },
   KEYBOARD_3 : {
       required : true,
       enabled  : true
     },
   LANDMARK_5 : {
       required : false,
       enabled  : true
     },
   LANDMARK_7 : {
       required : false,
       enabled  : true
     },
   LANDMARK_8 : {
       required : false,
       enabled  : true
     },
   LANDMARK_9 : {
       required : false,
       enabled  : true
     },
   LANDMARK_10 : {
       required : false,
       enabled  : true
     },
   LANDMARK_11 : {
       required : false,
       enabled  : true
     },
   LANDMARK_12 : {
       required : false,
       enabled  : true
     },
   LANDMARK_13 : {
       required : false,
       enabled  : true
     },
   LANDMARK_14 : {
       required : false,
       enabled  : true
     },
   LANDMARK_15 : {
       required : false,
       enabled  : true
     },
   LANDMARK_16 : {
       required : false,
       enabled  : true
     },
   LANDMARK_17 : {
       required : false,
       enabled  : true
     },
   LANDMARK_18 : {
     required : true,
     enabled  : true
   },
   LANDMARK_19 : {
       required : false,
       enabled  : true
     },
   LANGUAGE_1 : {
       required : true,
       enabled  : true
     },
   LANGUAGE_2 : {
       required : true,
       enabled  : true
     },
   LAYOUT_1 : {
       required : true,
       enabled  : true
     },
   LAYOUT_2 : {
       required : false,
       enabled  : true
     },
   LAYOUT_3 : {
       required : true,
       enabled  : true
     },
   LINK_1 : {
       required : true,
       enabled  : true
     },
   LINK_2 : {
       required : false,
       enabled  : true
     },
   LIST_1 : {
       required : true,
       enabled  : true
     },
   LIST_2 : {
       required : false,
       enabled  : true
     },
   NAVIGATION_1 : {
       required : false,
       enabled  : true
     },
   NAVIGATION_2 : {
       required : false,
       enabled  : true
     },
   NAVIGATION_3 : {
       required : true,
       enabled  : true
     },
   NAVIGATION_4 : {
       required : false,
       enabled  : true
     },
   NAVIGATION_5 : {
       required : true,
       enabled  : true
     },
   ORDER_1 : {
       required : true,
       enabled  : true
     },
   RESIZE_1 : {
       required : true,
       enabled  : true
     },
   ROLE_1 : {
       required : false,
       enabled  : false
     },
   ROLE_2 : {
       required : false,
       enabled  : false
     },
   ROLE_3 : {
       required : false,
       enabled  : false
     },
   ROLE_4 : {
       required : false,
       enabled  : false
     },
   ROLE_5 : {
       required : false,
       enabled  : false
     },
   ROLE_6 : {
       required : false,
       enabled  : false
     },
   ROLE_7 : {
       required : false,
       enabled  : false
     },
   ROLE_8 : {
       required : false,
       enabled  : false
     },
   ROLE_9 : {
       required : false,
       enabled  : false
     },
   ROLE_10 : {
       required : false,
       enabled  : false
     },
   ROLE_11 : {
       required : false,
       enabled  : false
     },
   ROLE_12 : {
       required : false,
       enabled  : false
    },
      ROLE_13 : {
       required : false,
       enabled  : false
      },
   ROLE_14: {
       required : false,
       enabled  : false
     },
   SENSORY_1 : {
       required : true,
       enabled  : true
     },
   TABLE_1 : {
       required : true,
       enabled  : true
     },
   TABLE_2 : {
       required : false,
       enabled  : true
     },
   TABLE_3 : {
       required : false,
       enabled  : true
     },
   TABLE_4 : {
       required : true,
       enabled  : true
     },
   TABLE_5 : {
       required : false,
       enabled  : true
     },
   TABLE_6 : {
       required : false,
       enabled  : true
     },
      TABLE_7 : {
        required : true,
        enabled  : true
      },
   TITLE_1 : {
       required : true,
       enabled  : true
     },
   TIMING_1 : {
       required : true,
       enabled  : true
     },
   TIMING_2 : {
       required : true,
       enabled  : true
     },
   TIMING_3 : {
       required : true,
       enabled  : true
     },
   VIDEO_1 : {
       required : true,
       enabled  : true
     },
   VIDEO_2 : {
       required : true,
       enabled  : true
     },
   VIDEO_3 : {
       required : true,
       enabled  : true
     },
   VIDEO_4 : {
       required : true,
       enabled  : true
     },
   VIDEO_5 : {
       required : true,
       enabled  : true
     },
   VIDEO_6 : {
       required : true,
       enabled  : true
     },
   VIDEO_7 : {
       required : true,
       enabled  : true
     },
   VIDEO_8 : {
       required : true,
       enabled  : true
     },
   VIDEO_9 : {
       required : true,
       enabled  : true
     },
   WIDGET_1 : {
       required : true,
       enabled  : true
     },
   WIDGET_3 : {
       required : true,
       enabled  : true
     },
   WIDGET_4 : {
       required : true,
       enabled  : true
     },
   WIDGET_5 : {
       required : true,
       enabled  : true
     },
   WIDGET_6 : {
       required : true,
       enabled  : true
     },
   WIDGET_7 : {
       required : true,
       enabled  : true
     },
   WIDGET_8 : {
       required : true,
       enabled  : true
     },
   WIDGET_9 : {
       required : true,
       enabled  : true
     },
   WIDGET_10 : {
       required : true,
       enabled  : true
     },
   WIDGET_11 : {
       required : true,
       enabled  : true
     },
   WIDGET_12 : {
       required : true,
       enabled  : true
     },
   WIDGET_13 : {
       required : false,
       enabled  : true
     },
   WIDGET_14 : {
       required : true,
       enabled  : true
     },
   WIDGET_15: {
       required : false,
       enabled  : true
     },
   WIDGET_16: {
       required : true,
       enabled  : true
     }
  };

  try {
    // Create a Ruleset and add it to the RulesetManager

    var as_ruleset_factory = OpenAjax.a11y.RulesetFactory.newInstance();

    as_ruleset_factory.setParameter('rulesetInfo', ruleset_info);
    as_ruleset_factory.setParameter('ruleMappingInfo', rule_mappings);

    as_ruleset_factory.setFeature('locale', 'en-us');

    var as_ruleset = as_ruleset_factory.newRuleset();

    OpenAjax.a11y.RulesetManager.addRuleset(as_ruleset);
  }
  catch (err) {
    OpenAjax.a11y.logger.error("[ARIA TRANS Ruleset] ** Error creating ARIA Strict Ruleset");
  }

}());
