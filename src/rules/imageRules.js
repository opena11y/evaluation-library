/* imageRules.js */

/* Imports */
import {
  RULESET,
  RULE_SCOPE,
  RULE_CATEGORIES,
  TEST_RESULT
} from '../constants.js';
import DebugLogging  from '../debug.js';

/* Constants */
const debug = new DebugLogging('Image Rules', true);

/*
 * OpenA11y Alliance Rules
 * Rule group: Color Rules
 */

export const imageRules = [

/**
 * @object IMAGE_1
 *
 * @desc Images must have a source for an accessible name or be identified as decorative
 */

{ rule_id             : 'IMAGE_1',
  last_updated        : '2014-11-28',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.TRIAGE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.imageInfo.allImageElements.forEach(ie => {
      const de = ie.domElement;
      if (de.visibility.isVisibleToAT) {
        if (de.accName.source === 'none') {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
        }
        else {
          if (de.accName.source === 'alt') {
            if (de.tagName === "img") {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName]);
            }
            else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tagName]);
            }
          }
          else {
            if (de.accName.source === 'aria-labelledby') {
              rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_2', [de.tagName]);
            }
            else {
              if (de.accName.source === 'aria-label') {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_3', [de.tagName]);
              }
              else {
                rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_4', [de.tagName]);
              }
            }
          }
        }
      } else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
      }
    });
  } // end validation function
},

/**
 * @object IMAGE_2
 *
 * @desc Text alternatives accurately describe images
 */
{ rule_id             : 'IMAGE_2',
  last_updated        : '2015-09-11',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {
    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de = ie.domElement;
      if (de.visibility.isVisibleToAT) {
        if (de.tagName === 'img') {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
        }
      } else {
        if (de.tagName === 'img') {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);
        }
      }
    });
  } // end validation function
},

/**
 * @object IMAGE_3
 *
 * @desc The file name of the image should not be part of the accessible name content (it must have an image file extension)
 */
{ rule_id             : 'IMAGE_3',
  last_updated        : '2014-11-28',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {

    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de = ie.domElement;
      if (de.visibility.isVisibleToAT) {
        if (de.tagName === 'img') {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);
        }
      } else {
        rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
      }
    });
  } // end validation function
 },

/**
 * @object IMAGE_4_EN (English)
 *
 * @desc If the accessible name contains content, it should be less than 100 characters long, longer descriptions should use long description techniques (English only)
 */
{ rule_id             : 'IMAGE_4_EN',
  last_updated        : '2014-11-28',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', 'area'],
  validate            : function (dom_cache, rule_result) {
    debug.log('[IMAGE 4_EN]');

/*
    var MAX_ACCESSIBLE_NAME_LENGTH = 100;

    var TEST_RESULT = TEST_RESULT;
    var VISIBILITY  = VISIBILITY;
    var SOURCE      = SOURCE;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;

        if (ie.accessible_name_source !== SOURCE.NONE && (ie.accessible_name_for_comparison.length > 0)) {

          if ((de.computed_style.is_visible_to_at === VISIBILITY.VISIBLE) &&
              (!de.has_role || (de.role !== 'presentation'))){

            if (ie.accessible_name_for_comparison.length > MAX_ACCESSIBLE_NAME_LENGTH) {
              rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [ie.accessible_name_for_comparison.length], ie.toString('short'));
            }
            else {
              rule_result.addResult(TEST_RESULT.PASS, ie, 'ELEMENT_PASS_1', [ie.accessible_name_for_comparison.length], ie.toString('short'));
            }
          }
          else {
            rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [de.tag_name], ie.toString('short'));
          }
        }
      } // end loop
    }
    */

  } // end validation function
},

/**
 * @object IMAGE_5
 *
 * @desc Verify the image is decorative
 */
{ rule_id             : 'IMAGE_5',
  last_updated        : '2015-09-11',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {
    debug.log('[IMAGE 5]');

/*
    var TEST_RESULT   = TEST_RESULT;
    var VISIBILITY    = VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
        var cs = de.computed_style;

        if (ie.accessible_name_source !== SOURCE.NONE || ie.is_presentation) {
          if (ie.accessible_name_for_comparison.length === 0 || ie.is_presentation) {
            if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
              if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', []);
              else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tag_name]);
            }
            else {
              if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', []);
              else rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_2', [de.tag_name]);
            }
          }
        }
      } // end loop
    }
    */
  } // end validation function
},

/**
 * @object IMAGE_6
 *
 * @desc For complex images, charts or graphs provide long description
 */
{ rule_id             : 'IMAGE_6',
  last_updated        : '2014-11-28',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {
    debug.log('[IMAGE 6]');

/*
    function isSimilar(alt, title) {

      if (typeof alt   !== 'string') return false;
      if (typeof title !== 'string') return false;

      alt   = util.normalizeSpace(alt.toLowerCase());
      title = util.normalizeSpace(title.toLowerCase());

      if (alt === title) return true;

      if ((alt.length >= title.length) &&
          (alt.indexOf(title) >= 0)) return true;

      return false;
    }

    var TEST_RESULT   = TEST_RESULT;
    var VISIBILITY    = VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
        var cs = de.computed_style;

        if (ie.is_presentation || (ie.accessible_name_length === 0) || ie.accessible_name_source === SOURCE.NONE) continue;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          if (de.has_aria_describedby) {
            if (de.undefined_aria_describedby_ids && de.undefined_aria_describedby_ids.length) {
              rule_result.addResult(TEST_RESULT.FAIL, ie, 'ELEMENT_FAIL_1', [de.undefined_aria_describedby_ids], ie.toString('long'));
            }
            else {
              if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [de.aria_describedby], ie.toString('long'));
              else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tag_name, de.aria_describedby], ie.toString('long'));
            }
          } else if (de.has_title && (ie.accessible_name_source !== SOURCE.TITLE)) {
              if (de.tag_name === 'img') {
                if (isSimilar(de.alt, de.title)) rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_3A', [], ie.toString('long'));
                else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_3', [de.title], ie.toString('long'));
              } else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_4', [de.tag_name, de.title], ie.toString('long'));
            }
            else if (ie.has_longdesc) {
              if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_5', [ie.longdesc], ie.toString('long'));
              else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_6', [de.tag_name. ie.longdesc], ie.toString('long'));
            }
          else {
            if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_7', [], ie.toString('long'));
            else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_8', [de.tag_name], ie.toString('long'));
          }
        }
        else {
          if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [], ie.toString('long'));
          else rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_2', [de.tag_name], ie.toString('long'));
        }
      } // end loop
    }
    */

  } // end validation function
},

/**
 * @object IMAGE_7
 *
 * @desc MathML for mathematical expressions
 */
{ rule_id             : 'IMAGE_7',
  last_updated        : '2015-09-15',
  rule_scope          : RULE_SCOPE.ELEMENT,
  rule_category       : RULE_CATEGORIES.IMAGES,
  ruleset             : RULESET.MORE,
  rule_required       : true,
  wcag_primary_id     : '1.1.1',
  wcag_related_ids    : [],
  target_resources    : ['img', '[role="img"]'],
  validate            : function (dom_cache, rule_result) {
    debug.log('[IMAGE 7]');

/*
    var TEST_RESULT   = TEST_RESULT;
    var VISIBILITY    = VISIBILITY;

    var image_elements   = dom_cache.images_cache.image_elements;
    var image_elements_len = image_elements.length;

    // Check to see if valid cache reference
    if (image_elements && image_elements_len) {

      for (var i = 0; i < image_elements_len; i++) {
        var ie = image_elements[i];
        var de = ie.dom_element;
        var cs = de.computed_style;

        if (ie.is_presentation || (ie.accessible_name_length === 0)) continue;

        if (cs.is_visible_to_at === VISIBILITY.VISIBLE) {
          if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_1', [], ie.toString('short'));
          else rule_result.addResult(TEST_RESULT.MANUAL_CHECK, ie, 'ELEMENT_MC_2', [de.tag_name], ie.toString('short'));
        }
        else {
          if (de.tag_name === 'img') rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_1', [], ie.toString('short'));
          else rule_result.addResult(TEST_RESULT.HIDDEN, ie, 'ELEMENT_HIDDEN_2', [de.tag_name], ie.toString('short'));
        }
      } // end loop
    }
    */

  } // end validation function
}
];

