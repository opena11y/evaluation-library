/*
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

/* --------------------------------------------------------------------------- */
/*       OpenAjax Alliance Rules National Language Support (NLS): English      */
/* --------------------------------------------------------------------------- */


OpenAjax.a11y.RuleManager.addRulesNLSFromJSON('en-us', {

    rule_scope: ['unknown', 'Element', 'Page', 'Website'],

    message_severities: {
      MUST  : 'must',
      SHOULD: 'should'
    },

    rule_categories: {
           '1': 'Audio and Video',
           '2': 'Tables',
           '4': 'Forms',
           '8': 'Images',
          '16': 'Keyboard Support',
          '32': 'Links',
          '64': 'Navigation',
         '128': 'Structure/Content',
         '256': 'Styles/Readability',
         '512': 'Widgets'
    },

    ACTION_NONE: 'None',

    NOT_APPLICABLE: 'N/A'

});