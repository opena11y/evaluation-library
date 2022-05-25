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
          if ((de.role === 'none') ||
              (de.role === 'presentation')) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.role]);
          }
          else {
            if ((de.tagName === 'img') || (de.tagName === 'area')) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', [de.tagName]);
            } else {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_2', [de.tagName]);
            }
          }
        }
        else {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [de.tagName, de.accName.source]);
        }
      }
      else {
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
      if (de.accName.name.length > 0) {
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
        const name = de.accName.name.toLowerCase();
        if (name.indexOf(ie.fileName) < 0) {
          rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', []);
        }
        else {
          rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);          
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
    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de = ie.domElement;
      if (de.accName.name.length > 0) {
        if (de.visibility.isVisibleToAT) {
          const length = de.accName.name.length;
          if (length <= 100) {
            rule_result.addElementResult(TEST_RESULT.PASS, de, 'ELEMENT_PASS_1', [length]);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [length]);
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', [de.tagName]);
        }
      }
    });
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
    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de = ie.domElement;
      if (de.accName.name.length === 0) {
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
      }
    });
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
    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de   = ie.domElement;
      const accName = de.accName;
      const accDesc = de.accDescription;
      if (accName.name.length > 0) {
        if (de.visibility.isVisibleToAT) {
          if (accDesc.name.length) {
           rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', [accDesc.source]);                    
          }
          else {
            if (de.node.hasAttribute('longdesc')) {
              rule_result.addElementResult(TEST_RESULT.FAIL, de, 'ELEMENT_FAIL_1', []);                                
            } else {
             rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', []);                                
            }
          }
        } else {
          rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
        }
      }
    });
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
    dom_cache.imageInfo.allImageElements.forEach( ie => {
      const de   = ie.domElement;
      const accName = de.accName;
      if (accName.name.length > 0) {
        if (de.visibility.isVisibleToAT) {
          if (de.tagName === 'img') {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_1', []);                    
          } else {
            rule_result.addElementResult(TEST_RESULT.MANUAL_CHECK, de, 'ELEMENT_MC_2', [de.tagName]);                    
          }
        } 
        else {
          if (de.tagName === 'img') {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_1', []);
          }
          else {
            rule_result.addElementResult(TEST_RESULT.HIDDEN, de, 'ELEMENT_HIDDEN_2', [de.tagName]);                    
          }
        }
      }
    });
  } // end validation function
}
];

