/**
* @file logger.js
*
* @desc Define simple factory function that returns a utility object used for
*       logging messages to the Firefox console.
*
*       Recommended usage: Calls to the logging methods (debug, info, warn and
*       error) can be placed anywhere in your code. However, it is recommended
*       that you only set or change the level, enabled and prefix properties
*       at one location, preferably in your initialization code.
*
*       Note: If you are creating a library that needs to do its own separate
*       logging, include code in that library similar to the following, and
*       then call setLogger, passing in an object created by getLogger.
*
*       var namespace = namespace || {};
*
*       namespace.logger = {
*         debug: function (message) {},
*         info:  function (message) {},
*         warn:  function (message) {},
*         error: function (message) {}
*       };
*
*       namespace.setLogger = function (logger) {
*         namespace.logger = logger;
*       };
*/

var EXPORTED_SYMBOLS = ["getLogger"];

/**
* @function getLogger
*
* @desc Get logger object (described below) used for logging messages to the
*       Firefox error console or Mozilla JavaScript Shell.
*
* @param prefix  [optional] String - appended to level prefix of message
*
* @param enabled [optional] Boolean - flag that sets initial enabled state
*
* @return Object - with the following properties and methods:
*
*   1. The LEVEL object, with constants DEBUG, INFO, WARN and ERROR, used
*      for setting the logging level. For example, when the level is set
*      to WARN, then all messages made with calls at levels below WARN
*      (namely DEBUG and INFO) are suppressed.
*
*   2. Getter and setter methods for the following properties:
*      a. level - set to one of the LEVEL constants
*      b. enabled - turn logging on or off
*      c. prefix - output an identifier prefix with the log message
*
*   3. Four logging methods that correspond to each of the four LEVEL
*      constants: debug, info, warn and error.
*/

/**
 * @namespace OpenAjax
 */

// import {OpenAjax} from '../openajax_a11y_constants.js';

/**
 * @namespace OpenAjax.a11y
 */

OpenAjax.a11y = OpenAjax.a11y || {};

OpenAjax.a11y.getLogger = function (prefix, enabled) {

  // private members
  var LEVEL = Object.defineProperties({}, {
    DEBUG: { value: 0, writable: false, configurable: false, enumerable: true },
    INFO:  { value: 1, writable: false, configurable: false, enumerable: true },
    WARN:  { value: 2, writable: false, configurable: false, enumerable: true },
    ERROR: { value: 3, writable: false, configurable: false, enumerable: true }
  });

  var $level = LEVEL.DEBUG;

  var $enabled = arguments.length < 2 ? true : (enabled) ? true : false;

  var $prefix = prefix ? prefix : '';

  var consoleService = (typeof Components !== "undefined") ?
                         Components.classes["@mozilla.org/consoleservice;1"].getService(
                           Components.interfaces.nsIConsoleService) : null;

  // private methods
  var getPrefix = function (levelStr) {
    return $prefix ? levelStr + " " + $prefix + ": " : levelStr + ": ";
  };

  var logToConsole = function (message) {
    if (consoleService)
      // use Firefox message console
      consoleService.logStringMessage(message);
    else if (typeof print === "function")
      // use JavaScript Shell print fn.
      print(message);
    else
      return;
  };

  // public API
  return Object.freeze({
    LEVEL: LEVEL,

    get level() { return $level; },

    set level(num) {
      switch (num) {
      case LEVEL.DEBUG:
      case LEVEL.INFO:
      case LEVEL.WARN:
      case LEVEL.ERROR:
        $level = num;
        break;
      default:
        logToConsole("ERROR: " + "arg to logger.level must be in the range of " +
                     LEVEL.DEBUG + " to " + LEVEL.ERROR + " inclusive.");
        break;
      }
    },

    get enabled() { return $enabled; },

    set enabled(value) { $enabled = (value) ? true : false; },

    get prefix() { return $prefix; },

    set prefix(str) { $prefix = str; },

    debug: function (message) {
      if ($enabled && $level <= LEVEL.DEBUG)
        logToConsole(getPrefix("DEBUG") + message);
    },
    info: function (message) {
      if ($enabled && $level <= LEVEL.INFO)
        logToConsole(getPrefix("INFO") + message);
    },
    warn: function (message) {
      if ($enabled && $level <= LEVEL.WARN)
        logToConsole(getPrefix("WARN") + message);
    },
    error: function (message) {
      if ($enabled && $level <= LEVEL.ERROR)
        logToConsole(getPrefix("ERROR") + message);
    }
  }); // end return
}

OpenAjax.a11y.logger = OpenAjax.a11y.getLogger('OAA-LIBRARY', true);
