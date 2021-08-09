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
/* OpenAjax Alliance Rule Scope National Language Support (NLS): English    */
/* --------------------------------------------------------------------------- */

OpenAjax.a11y.rule_scopes_nls.addNLS('en-us', {
  abbreviation : 'Scope',
  title        : 'Rule Scope',
  url          : '',

  rule_scopes: [
    {
      id          : OpenAjax.a11y.RULE_SCOPE.WEBSITE,
      title       : 'Website Rules',
      url         : '',
      description : 'Rules that need to be considered in the design of the templates and pages of a website or application.'
    },
    {
      id          : OpenAjax.a11y.RULE_SCOPE.PAGE,
      title       : 'Page Rules',
      url         : '',
      description : 'Rules that need to be considered in the design and layout of a web page.'
    },
    {
      id          : OpenAjax.a11y.RULE_SCOPE.ELEMENT,
      title       : 'Element Rules',
      url         : '',
      description : 'Rules that apply independently to individual elements or groups of elements on a web page.'
    }
  ]
});
