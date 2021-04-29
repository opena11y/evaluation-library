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

/* ---------------------------------------------------------------- */
/*                      Logger APIs                                 */
/* ---------------------------------------------------------------- */

/**
 * @object logger
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc logger object supports sending messages to the console
 *       This default logger object does nothing other than enumerate
 *       the minimal interface that must be implemented for logging
 *       Use the setLogger function to replace the default object with an
 *       object that supports logging in your development environment
 *       The replacement object may have additional methods defined by
 *       the host for controlling logging, but the OpenAjax Evaluation
 *       library will only use these 4 methods.
 */

OpenAjax.a11y.logger = OpenAjax.a11y.logger || {
  debug: function (message) {},
  info:  function (message) {},
  warn:  function (message) {},
  error: function (message) {}
};

OpenAjax.a11y.setLogger = function (logger) {
   OpenAjax.a11y.logger = logger;
};

/* ---------------------------------------------------------------- */
/*                   OpenAjax High Level APIs                       */
/* ---------------------------------------------------------------- */

// basic info about version of ruleset and rules
OpenAjax.a11y.name = "OpenAjax Alliance Accessibility Tools Task Force";
OpenAjax.a11y.baseUri = "http://www.openajax.org/member/wiki/Accessibility";



