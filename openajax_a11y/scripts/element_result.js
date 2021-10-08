/*
 * Copyright 2011-2018 OpenAjax Alliance
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

/* ---------------------------------------------------------------- */
/*                      ElementInfo                                   */
/* ---------------------------------------------------------------- */

/**
 * @constructor ElementInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains element information
 *       typically attribute values or calculated property values important
 *       to understand the accessibility of the element
 *
 * @property  {String}  name        - The title for the group of rules
 * @property  {String}  value       - URL to more information about the group
 *                                     (e.g. WCAG 2.0 requirement)
 * @property  {String}  description  - Short description of the group
 */

OpenAjax.a11y.info.ElementInfo = function (name, value, desc) {

  var n  = name;
  var v  = value;
  var d  = desc;

  return {

     get name()          { return n;  },
     get value()         { return v;  },
     get description()   { return d;  },


    toString : function() {
      return "Name: " + n + " Value: " + v;
    }

  };
};


/* ---------------------------------------------------------------- */
/*                             ElementResult                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor ElementResult
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains a the results of
 *          the evaluation of a rule on a element
 *
 * @param  {ResultRule}   rule_result         - reference to the rule result object
 * @param  {Number}       result_value        - Constant representing result value of the evaluation result
 * @param  {Object}       cache_item          - Object reference to element information used by this rule result
 * @param  {String}       message_id          - String reference to the message string in the NLS file
 * @param  {Array}        message_arguments   - Array  array of values used in the message string
 * @param  {Array}        props               - Array of properties that are defined in the validation function (NOTE: typically undefined)
 * @param  {String}       elem_identifier     - String identifying the element (Optional)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {RuleResult} rule_result         - reference to the rule result object
 * @property  {Number}     result_value        - Constant representing result value of the evaluation result
 * @property  {DOMElement} cache_item          - Object reference to cache item associated with the test
 * @property  {String}     message_id          - String reference to the message string in the NLS file
 * @property  {Array}      message_arguments   - Array  array of values used in the message string
 */

OpenAjax.a11y.ElementResult = function (rule_result, result_value, cache_item, message_id, message_arguments, elem_identifier) {

  this.rule_result = rule_result;

  this.result_value  = result_value;
  this.result_message       = "";
  this.position = 0;

//  OpenAjax.a11y.logger.debug("Rule: " + elem_identifier + " (" + (typeof elem_identifier) + ")");

  if (typeof elem_identifier === 'string') this.element_identifier = elem_identifier;
  else this.element_identifier = cache_item.toString();

  this.primary_element_info = false;
  this.secondary_element_info_array = [];

  this.related_elements = [];

  this.message_id        = message_id;
  this.message_arguments = message_arguments;

//  OpenAjax.a11y.logger.debug("Rule: " + this.getRuleId() + "Prop: " + typeof props);

  this.cache_item    = cache_item;

  if (cache_item.dom_element && cache_item.dom_element.node) this.dom_node = cache_item.dom_element.node;
  else this.dom_node = cache_item.node;

};


 /**
 * @method getRule
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets the rule object that this element result is associated with.
 *       Provides access to rule information if needed
 *
 * @return {Object} see description
 */
OpenAjax.a11y.ElementResult.prototype.getRule = function () {
   return this.getRuleResult().getRule();
};



 /**
 * @method getRuleResult
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets the rule result that this element result is associated with.
 *       Provides access to rule and ruleset information if needed
 *
 * @return {Object} see description
 */
OpenAjax.a11y.ElementResult.prototype.getRuleResult = function () {
   return this.rule_result;
};

 /**
 * @method getElementIdentifier
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets a string identifying the element, typically element and//or a key attribute
 *       or property value
 *
 * @return {String} see description
 */
OpenAjax.a11y.ElementResult.prototype.getElementIdentifier = function () {
   return this.element_identifier;
};


 /**
 * @method getResultValue
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Returns an numerical constant representing the element result:<br/>
 *         OpenAjax.a11y.ELEMENT_RESULT_VALUE.VIOLATION<br/>
 *         OpenAjax.a11y.ELEMENT_RESULT_VALUE.WARNING<br/>
 *         OpenAjax.a11y.ELEMENT_RESULT_VALUE.MANUAL_CHECK<br/>
 *         OpenAjax.a11y.ELEMENT_RESULT_VALUE.PASS<br/>
 *         OpenAjax.a11y.ELEMENT_RESULT_VALUE.HIDDEN  <br/>
 *
 * @return {Number} see description
 */
OpenAjax.a11y.ElementResult.prototype.getResultValue = function () {
   return this.result_value;
};

/**
 * @method getResultValueNLS
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets a string representation of the rule result value: <br/>
 *         'V'<br/>
 *         'W'<br/>
 *         'MC'<br/>
 *         'P'<br/>
 *         'H'<br/> *
 * @return {String} see description
 */

OpenAjax.a11y.ElementResult.prototype.getResultValueNLS = function () {
  return OpenAjax.a11y.nls.Cache.getElementResultValueNLS(this.result_value);
};



 /**
 * @method getResultMessage
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Returns an localized element result message
 *
 * @return {String} String with element result message
 */
OpenAjax.a11y.ElementResult.prototype.getResultMessage = function () {

  if (this.result_message.length === 0) {
    this.result_message = this.computeMessage();
  }
  return this.result_message;
};

 /**
 * @method computeMessage
 * @private
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Returns an localized element result message
 *
 * @return {String} String with element result message
 */
OpenAjax.a11y.ElementResult.prototype.computeMessage = function () {

  var rule       = this.getRuleResult().getRule();
  var rule_nls   = rule.getNLS();
  var common_nls = rule.getCommonNLS();

  var NODE_RESULT_VALUE = OpenAjax.a11y.NODE_RESULT_VALUE;

  var message;

  // If no message id return the empty string
  if (this.message_id.length === 0) return "";


//  OpenAjax.a11y.logger.debug("Rule: " + rule_id);

  var str = rule_nls['NODE_RESULT_MESSAGES'][this.message_id];

  if (!str) return common_nls.missing_message + this.message_id;

//    OpenAjax.a11y.logger.debug("Rule: " + rule_id + " Message: " + str);

  var vstr; // i.e. %1, %2 ....
  var message_arguments_len = this.message_arguments.length;

  // check to see if message has result value dependence

  vstr = "%s";

  if (str.indexOf(vstr) >= 0) {

    switch (this.result_value) {
    case NODE_RESULT_VALUE.VIOLATION:
      message = common_nls.message_severities.MUST;
      break;

    case NODE_RESULT_VALUE.WARNING:
      message = common_nls.message_severities.SHOULD;
      break;

    case NODE_RESULT_VALUE.MANUAL_CHECK:
      message = common_nls.message_severities.MAY;
      break;

    default:
      message = "";
      break;
    }

    str = str.replace(vstr, message);
  }

  // Replace

  for (var i = 0; i < message_arguments_len; i++) {
    vstr = "%" + (i+1);
    message = this.message_arguments[i];

    if (typeof message === 'string') {
      message = OpenAjax.a11y.util.normalizeSpace(message);
    }
    else {
      if (typeof message === 'number') {
        message = message.toString();
      }
      else {
        message = "";
      }
    }
    str = str.replace(vstr, message);
  } // end loop

  return OpenAjax.a11y.util.transformElementMarkup(str);

};

/**
 * @method getElementIndentifier
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Return a string describing the element
 *
 * @return {String} see description
 */

OpenAjax.a11y.ElementResult.prototype.getElementIndentifier = function () {
  this.element_indentifier;
};

/**
 * @method getElementInfoPrimary
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Get information on the primary property or attribute associated with element
 *
 * @return {ElementInfo} see description
 */

OpenAjax.a11y.ElementResult.prototype.getElementInfoPrimary = function () {

  if (!this.primary_element_info) {

    var prop = this.getRuleResult().getRule().getTargetResourcePrimaryProperty();

//    OpenAjax.a11y.logger.debug("[ElementResult] prop: " + prop + " (" + prop.length + ")");

    if (prop.length > 0) {

      var cache_nls = OpenAjax.a11y.nls.Cache;
      var value    = this.cache_item.getCachePropertyValue(prop);
      var nls_item = cache_nls.getLabelAndValueNLS(prop, value);

      this.primary_element_info = new OpenAjax.a11y.info.ElementInfo(nls_item.label, nls_item.value, nls_item.description);
    }
    else {
      this.primary_element_info = new OpenAjax.a11y.info.ElementInfo("", "", "");
    }
  }

  return this.primary_element_info;

};


/**
 * @method getElementInfoSecondaryArray
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Get the DOM cache values for the properties associated with a rule
 *
 * @return {Array} Array of ElementInfo objects
 */

OpenAjax.a11y.ElementResult.prototype.getElementInfoSecondaryArray = function () {

  var prop_list = this.getRuleResult().getRule().getTargetResourceSecondaryProperties();

  if ((this.secondary_element_info_array.length === 0) && (prop_list.length > 1)) {

    var cache_nls = OpenAjax.a11y.nls.Cache;

    for (var i = 0; i < prop_list.length; i++) {
      var prop_item = prop_list[i];
      var value    = this.cache_item.getCachePropertyValue(prop_item);
      var nls_item = cache_nls.getLabelAndValueNLS(prop_item, value);
      var ei = new OpenAjax.a11y.info.ElementInfo(nls_item.label, nls_item.value, nls_item.description);
      this.secondary_element_info_array.push(ei);
    }
  }

  return this.secondary_element_info_array;

};



/**
 * @method getOrdinalPosition
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Returns a the ordinal position of the element in a list of element results
 *
 * @return {Number} Returns a number indicating the position in a list of element results
 */

OpenAjax.a11y.ElementResult.prototype.getOrdinalPosition = function () {

  var position = 0;

  if (this.cache_item) {
    if(this.cache_item.dom_element) position = this.cache_item.dom_element.document_order;
    else position = this.cache_item.document_order;
  }

  return position;

};


/**
 * @method getDOMElement
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets live dom node reference of the element
 *
 * @param {DOMElement} see description
 */

OpenAjax.a11y.ElementResult.prototype.getDOMElement = function () {

  // Get DOMElement object: If cacheItem does not have dom_element property
  // referencing an object, then cacheItem is itself a DOMElement.
  var dom_element = (this.cache_item.dom_element) ?
                    this.cache_item.dom_element : this.cache_item;

  // If DOMElement type is TEXT_NODE then use its parent element, since
  // that is where its computed style and tag name would come from.
  if (dom_element.type === Node.TEXT_NODE) dom_element = dom_element.parent_element;

  return dom_element;

};

/**
 * @method getAccessibleName
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets accessible name of cache item if it exists or its text content
 *
 * @returns {String}
 */

OpenAjax.a11y.ElementResult.prototype.getAccessibleName = function () {

  function getSource(source) {
    var SOURCE = OpenAjax.a11y.SOURCE;

    switch(source) {
      case SOURCE.ALT_ATTRIBUTE:
        return "alt attribute";

      case SOURCE.ARIA_LABELLEDBY:
        return "aria-labelledby attribute";

      case SOURCE.ARIA_LABEL:
        return "aria-label attribute";

      case SOURCE.LABEL_REFERENCE:
        return "label reference";

      case SOURCE.LABEL_ENCAPSULATION:
        return "label encapsulation";

      case SOURCE.TABLE_CAPTION:
        return "caption element";

      case SOURCE.TABLE_SUMMARY:
        return "summary attribute";

      case SOURCE.TEXT_CONTENT:
        return "text content";

      case SOURCE.TITLE_ATTRIBUTE:
        return "title attribute";

      case SOURCE.VALUE_ATTRIBUTE:
        return "value attribute";

      default:
        break;
    }

    return "none";

  }

  var de = this.getDOMElement();

  if (this.cache_item.accessible_name) {
    if (this.cache_item.accessible_name_source) {
      return [getSource(this.cache_item.accessible_name_source), this.cache_item.accessible_name, ''];
    }
    else {
      return [getSource(this.cache_item.computed_label_source), this.cache_item.accessible_name, ''];
    }
  }
  else {
    if (this.cache_item.computed_label) {

      return [getSource(this.cache_item.computed_label_source), this.cache_item.computed_label, ''];
    }
    else {

      var text_content = de.getText();
      if (text_content.length > 50) {
        text_content = text_content.substring(0,50) + "...";
      }

      switch(de.tag_name) {

        case 'body':
          return ['none', '', ''];

        case 'img':
        case 'audio':
        case 'video':
        case 'object':
        case 'iframe':
          if (de.has_alt) {
            return ['alt attribute', de.alt, de.src];
          }
          else {
            if (de.has_title) {
              return ['title attribute', de.title, de.src];
            }
          }
          return ['none', '', de.src];

        case 'a':
        case 'area':
          if (text_content) {
            return ['text content', text_content, de.href];
          }
          else {
            if (de.has_title) {
              return ['title attribute', de.title, de.href];
            }
          }
          return ['none', '', de.href];

        default:
          if (text_content) {
            return ['text content', text_content, ''];
          }
          else {
            if (de.has_title) {
              return ['title attribute', de.title, ''];
            }
          }
          break;
      }
    }
  }

  return ['none', '', ''];

};


/**
 * @method getRelatedElementsArray
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Returns the xpath of the associated element
 *
 * @return {String} information about the node result
 */

OpenAjax.a11y.ElementResult.prototype.getRelatedElementsArray = function () {

  return [];

};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Gets a list of related elements by hoe they are related
 *
 * @return {Array} Array of RelatedElements objects
 */

OpenAjax.a11y.ElementResult.prototype.toString = function () {

  return this.related_elements;

};


/**
 * @method toJSON
 *
 * @memberOf OpenAjax.a11y.ElementResult
 *
 * @desc Creates JSON object descibing the properties of the node result
 *
 * @param {String} prefix  -  A prefix string typically spaces
 *
 * @return String information about the node result
 */

OpenAjax.a11y.ElementResult.prototype.toJSON = function (prefix) {

  var json = "";

  var de = this.cache_item;
  if (de.dom_element) de = de.dom_element;

  var class_name = "";
  var id = "";

  if (de.class_name && de.class_name.length) class_name = de.class_name;
  if (de.id && de.id.length) id = de.id;

  json += prefix + "{ \"result_value\"       : \"" + this.getResultValue()       + "\",\n";
  json += prefix + "  \"result_value_nls\"   : \"" + this.getResultValueNLS()    + "\",\n";
  json += prefix + "  \"element_identifier\" : " + JSON.stringify(this.getElementIdentifier()) + ",\n";
  json += prefix + "  \"ordinal_position\"   : " + this.getOrdinalPosition()     + ",\n";
  json += prefix + "  \"message\"            : " + JSON.stringify(this.getResultMessage()) + ",\n";
  json += prefix + "  \"class\"              : " + JSON.stringify(class_name) + ",\n";
  json += prefix + "  \"id\"                 : " + JSON.stringify(id) + "\n";
  json += prefix + "}";

  return json;
};

/* ---------------------------------------------------------------- */
/*                      RelatedElementInfo                                   */
/* ---------------------------------------------------------------- */

/**
 * @constructor RelatedElementInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains related element information
 *       typically elements used in creating accessible names, descriptions,
 *       data table headers, aria-owns, aria-controls.....
 *
 * @property  {String}  identifier    - String identifying the element
 * @property  {String}  node          - Live DOM node of the element
 */

OpenAjax.a11y.info.RelatedElementInfo = function (identifier, node) {

  var i  = identifier;
  var n  = node;

  return {

     get element_identifier() { return i;  },
     get dom_node()           { return n;  },


    toString : function() {
      return "Element: " + i;
    }

  };
};

/* ---------------------------------------------------------------- */
/*                             RelatedElements                           */
/* ---------------------------------------------------------------- */

/**
 * @constructor RelatedElements
 *
 * @memberOf OpenAjax.a11y
 *
 * @desc Constructor for an object that contains related element information
 *       The title describes the relationship
 *
 * @param  {String}   title  - The title describing the relationship
 *                             (e.g. 'Accessible Name', 'Accessible description', ..)
 */

/**
 * @private
 * @constructor Internal Properties
 *
 * @property  {String}   title                   - The title describing the relationship
 * @property  {Array}    related_elements_info   - Array of RelatedElementInfo objects
 */

OpenAjax.a11y.RelatedElements = function (title) {

  this.title = title;

  this.related_elements_info = [];

};

/**
 * @method title
 *
 * @memberOf OpenAjax.a11y.RelatedElements
 *
 * @desc Gets a string representing the title of the relationship
 *
 * @return {String} see description
 */

OpenAjax.a11y.RelatedElements.prototype.title = function () {
  return this.title;
};

/**
 * @method getRelatedElementsArray
 *
 * @memberOf OpenAjax.a11y.RelatedElements
 *
 * @desc Gets a list of RelatedElementInfo objects
 *
 * @return {Array} see description
 */

OpenAjax.a11y.RelatedElements.prototype.getRelatedElementsArray = function () {
  return this.related_elements_info;
};


/**
 * @method toString
 *
 * @memberOf OpenAjax.a11y.RelatedElements
 *
 * @desc Gets a string representing the relationship
 *
 * @return {Array} Array of RelatedElements objects
 */

OpenAjax.a11y.RelatedElements.prototype.toString = function () {
  return this.title + "(" + this.related_elements_info.length + " related elements)";
};
