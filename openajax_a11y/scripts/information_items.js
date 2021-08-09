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

// import {OpenAjax} from '../openajax_a11y_constants.js';

/**
 * @namespace OpenAjax.a11y.info
 */

OpenAjax.a11y.info = OpenAjax.a11y.info || {};

/* ---------------------------------------------------------------- */
/*                             InformationalLinkInfo                */
/* ---------------------------------------------------------------- */

 /**
 * @constructor InformationalLinkInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains a title, url and description
 *       of some item of information associated with a rule or rule set
 *
 * @param  {Number}  rt - Constant indicating the type of information
 * @param  {String}  t  - String to be used as a title
 * @param  {String}  u  - A url to more information on the item
 *
 * @property  {String}  title        - Text describing the reference, the text
 *                                     can be used as the text of a link
 * @property  {String}  url          - A url to more information on the item, if no
 *                                     this property will be an empty string
 * @property  {String}  reference_type  - A number that identifies the type of information<br/>
 *                                        OpenAjax.a11y.REFERENCES.UNKNOWN<br/>
 *                                        OpenAjax.a11y.REFERENCES.SPECIFICATION<br/>
 *                                        OpenAjax.a11y.REFERENCES.WCAG_TECHNIQUE<br/>
 *                                        OpenAjax.a11y.REFERENCES.TECHNIQUE<br/>
 *                                        OpenAjax.a11y.REFERENCES.EXAMPLE<br/>
 *                                        OpenAjax.a11y.REFERENCES.MANUAL_CHECK<br/>
 *                                        OpenAjax.a11y.REFERENCES.AUTHORING_TOOL<br/>
 *                                        OpenAjax.a11y.REFERENCES.OTHER<br/>
 */

OpenAjax.a11y.info.InformationalLinkInfo = function (rt, t, u) {

  var reference_type = OpenAjax.a11y.REFERENCES.UNKNOWN;
  var title = "";
  var url   = "";

  if (typeof c === 'number') reference_type = rt;
  if (typeof t === 'string') title          = OpenAjax.a11y.util.transformElementMarkup(t);
  if (typeof u === 'string') url            = u;

  return {
     get reference_type  () { return reference_type; },
     get title           () { return title; },
     get url             () { return url;   },

     toString : function () { return title; }
  };

};



/* ---------------------------------------------------------------- */
/*                                RulesetInfo                       */
/* ---------------------------------------------------------------- */

/**
 * @constructor RulesetInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains a title, url and description
 *       for a group of rule results
 *
 * @param  {String}  i1   - ID of the ruleset
 * @param  {String}  i2   - Version of ruleset
 * @param  {String}  i3   - Date last updated
 *
 * @param  {String}  a1   - Author of ruleset
 * @param  {String}  a2  - Link to more information about the ruleset
 *
 * @param  {String}  d1    - A title that can be used as the text of a link
 * @param  {String}  d2    - An abbreviation
 * @param  {String}  d3   - A description that can be used as a tooltip
 * @param  {String}  d4    - A longer description of the item
 *
 * @param  {Number}  r1   - Number of required rules
 * @param  {Number}  r2   - Number of recommended rules
 *
 *
 * @property  {String}  title                 - A title for the ruleset
 * @property  {String}  description           - A detailed description of the ruleset
 * @property  {String}  abbrev                - A abbreviation of the ruleset title
 * @property  {String}  tooltip               - A short description of the ruleset
 * @property  {String}  author_name           - Name of the author of the ruleset
 * @property  {String}  author_url            - URL to more information about the author of the ruleset
 * @property  {String}  date                  - Date the ruleset was last updated
 * @property  {String}  url                   - URL to more information about the ruleset
 * @property  {Number}  num_rules_required    - Number of required rules in the ruleset
 * @property  {Number}  num_rules_recommended - Number of recommended rules in the ruleset
 * @property  {Number}  num_rules_total       - Total number rules in the ruleset
 */

OpenAjax.a11y.info.RulesetInfo = function (i1, i2, i3, a1, a2, d1, d2, d3, d4, d5, r1, r2) {

//  OpenAjax.a11y.logger.debug("[RulesetInfo] Constructor");

  var id       = i1;
  var version  = i2;
  var date     = i3;

  var author     = a1;
  var author_url = a2;

  var title           = OpenAjax.a11y.util.transformElementMarkup(d1);
  var abbrev          = d2;
  var tooltip         = OpenAjax.a11y.util.transformElementMarkup(d3);
  var description     = OpenAjax.a11y.util.transformElementMarkup(d4);
  var description_url = d5;

  var rules_required    = r1;
  var rules_recommended = r2;

  return {
     get title        () { return title;        },
     get description  () { return description;  },
     get tooltip      () { return tooltip;      },
     get abbrev       () { return abbrev;       },

     get author_name  () { return author;       },
     get author_url   () { return author_url;   },

     get date  () { return date;                },
     get url   () { return description_url;     },

     get num_rules_required    () { return rules_required;    },
     get num_rules_recommended () { return rules_recommended; },
     get num_rules_total       () { return rules_recommended + rules_required; },

     /* other APIs for consideration */

     get version           () { return version;    },

     toJSON : function(prefix) {

       var json = "";

       json += prefix + "  \"ruleset_id\"              : \"" + id      + "\",\n";
       json += prefix + "  \"ruleset_version\"         : \"" + version + "\",\n";
       json += prefix + "  \"ruleset_updated\"         : \"" + date    + "\",\n";

       json += prefix + "  \"ruleset_author_name\"     : " + JSON.stringify(author)      + ",\n";
       json += prefix + "  \"ruleset_author_url\"      : \"" + author_url                + "\",\n";

       json += prefix + "  \"ruleset_title\"           : " + JSON.stringify(title)       + ",\n";
       json += prefix + "  \"ruleset_abbrev\"          : " + JSON.stringify(abbrev)      + ",\n";
       json += prefix + "  \"ruleset_tooltip\"         : " + JSON.stringify(tooltip)     + ",\n";
       json += prefix + "  \"ruleset_description\"     : " + JSON.stringify(description) + ",\n";
       json += prefix + "  \"ruleset_description_url\" : \"" + description_url   + "\",\n";

       json += prefix + "  \"ruleset_required_rules\"    : " + rules_required    + ",\n";
       json += prefix + "  \"ruleset_recommended_rules\" : " + rules_recommended + ",\n";

       return json;
     },

     toString : function   () { return title;    }
  };

};


/* ---------------------------------------------------------------- */
/*                    SuccessCriterionInfo                */
/* ---------------------------------------------------------------- */

 /**
 * @constructor SuccessCriterionInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains information about a WCAG20
 *       Principle, Guideline or Success Criterion
 *
 * @param  {String}  id - ID in the format "P.G.SC" for the WCAG 2.0 item to get information
 *
 * @property  {String}  title        - The title of the success criterion
 * @property  {String}  description  - A longer description of the success criterion
 *
 * @property  {Number}  level        - Number representing WCAG 2.0 level (i.e. A, AA or AAA)<br/>
 *                                     OpenAjax.a11y.WCAG20_LEVEL.A<br/>
 *                                     OpenAjax.a11y.WCAG20_LEVEL.AA<br/>
 *                                     OpenAjax.a11y.WCAG20_LEVEL.AAA<br/>
 * @property  {String}  level_nls    - NLS WCAG 2.0 level (i.e. "A", "AA" or "AAA")
 *
 * @property  {String}  url_spec         - A url to success criterion in WCAG 2.0 specification
 * @property  {String}  url_how_to_meet  - URL to the WCAG 2.0 techniques and failure
 *                                         conditions to meet or violate the requirements
 * @property  {String}  url_understand   - URL to more information on the requirements
 *                                         of the success criteria
 */

OpenAjax.a11y.info.SuccessCriterionInfo = function (sc_id) {

  var id     = sc_id;
  var title  = "";
  var desc   = "";

  var level      = 0;
  var level_nls  = "";

  var url_spec       = "";
  var url_meet       = "";
  var url_understand = "";

  var wcag20_nls = OpenAjax.a11y.nls.WCAG20.getNLS();

  var sc = wcag20_nls.getNLSItemById(sc_id);

//  OpenAjax.a11y.logger.debug("[SuccessCriterionInfo] success criterion: " + sc + " (" + sc_id + ")");

  if (sc) {
    level      = sc.level;
    level_nls  = wcag20_nls.levels[sc.level];

    title      = sc.title;
    desc       = sc.description;

    url_spec        = sc.url_spec;
    url_meet        = sc.url_meet;
    url_understand  = sc.url_understand;

  }

  return {
     get id              () { return id;     },
     get title           () { return title;     },
     get description     () { return desc;      },

     get level           () { return level;     },
     get level_nls       () { return level_nls; },

     get url_spec        () { return url_spec;       },
     get url_how_to_meet () { return url_meet;       },
     get url_understand  () { return url_understand; },

     toString : function() { return title; }
  };

};


/* ---------------------------------------------------------------- */
/*                    RuleCategoryInfo                              */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleCategoryInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains information about a Rule Category
 *
 * @param  {Number}  rc_id  - id of the rule category
 *
 * @property  {String}  title        - A title of the rule category
 * @property  {String}  url          - A url to more information on the rule category
 * @property  {String}  description  - A longer description of the rule category
 */

OpenAjax.a11y.info.RuleCategoryInfo = function (rc_id) {

  var title   = "";
  var url     = "";
  var desc    = "";

  var rc_nls = OpenAjax.a11y.nls.RuleCategories.getNLS().getRuleCategory(rc_id);

//  OpenAjax.a11y.logger.debug("[RuleCategoryInfo] rule category: " + rc_nls);

  if (rc_nls) {
    title = rc_nls.title;
    desc  = rc_nls.description;
    url   = rc_nls.url_spec;

  }

  return {
     get title       () { return title; },
     get url         () { return url;   },
     get description () { return desc;  },

     toString : function() { return title; }
  };

};

/* ---------------------------------------------------------------- */
/*                    GuidelineInfo                              */
/* ---------------------------------------------------------------- */

 /**
 * @constructor GuidelineInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains information about a WCAG 2.0 Guideline
 *
 * @param  {String}  g_id - id of the guideline
 *
 * @property  {String}  title        - A title of the guideline
 * @property  {String}  url          - A url to more information on the guideline
 * @property  {String}  description  - A longer description of the guideline
 */

OpenAjax.a11y.info.GuidelineInfo = function (g_id) {

  var id          = g_id;
  var title       = "";
  var url         = "";
  var description = "";

  var wcag20_nls = OpenAjax.a11y.nls.WCAG20.getNLS();

  var g = wcag20_nls.getNLSItemById(g_id);

//  OpenAjax.a11y.logger.debug("[GuidelineInfo] guideline: " + g + " (" + g_id + ")");

  if (g) {
    title        = g.title;
    description  = g.description;
    url          = g.url_spec;

  }

  return {
     get id          () { return id;          },
     get title       () { return title;       },
     get url         () { return url;         },
     get description () { return description; },

     toString : function() { return title; }
  };

};



/* ---------------------------------------------------------------- */
/*                    RuleGroupInfo                              */
/* ---------------------------------------------------------------- */

 /**
 * @constructor RuleGroupInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains information about a Rule Group
 *       The evaluation library suports groups based on Rule Categories
 *       and WCAG 2.0 Guidelines
 *
 * @param  {String}  t   - A title describes the rule group
 * @param  {String}  u   - A url to more information on the rule group
 * @param  {String}  d   - A longer description of the group
 * @param  {Number}  req - Number of required rules in the group
 * @param  {Number}  rec - Number of recommended rules in the group
 *
 * @property  {String}  title                 - A title for the group of rules
 * @property  {String}  url                   - A url to more information on the group
 * @property  {String}  description           - A longer description of the group
 * @property  {Number}  num_rules_required    - Number of required rules in the group
 * @property  {Number}  num_rules_recommended - Number of recommended rules in the group
 * @property  {Number}  num_rules_total       - Total number of rules in the group
 */

OpenAjax.a11y.info.RuleGroupInfo = function (t, u, d, req, rec) {

  var title             = t;
  var url               = u;
  var description       = d;

  var rules_required    = req;
  var rules_recommended = rec;

  return {
     get title                 () { return title;       },
     get url                   () { return url;         },
     get description           () { return description; },
     get num_rules_required    () { return rules_required;    },
     get num_rules_recommended () { return rules_recommended; },
     get num_rules_total       () { return rules_recommended + rules_required; },

     incRequiredRuleCount : function() {
       rules_required += 1;
     },

     incRecommendedRuleCount : function() {
       rules_recommended += 1;
     },


     toString : function() { return title; }
  };

};
/* ---------------------------------------------------------------- */
/*                             ElementSummary                       */
/* ---------------------------------------------------------------- */

 /**
 * @constructor ElementSummary
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains information about the total
 *       number of elements and specific element types on a web page
 *
 * @param  {Object}  dom_cache    - Cache of the document object model of the web page
 * @param  {Number}  option       - 0: All elements<br/>
 *                                  1: AT visible elements<br/>
 *                                  2: Hidden elements<br/>
 *
 * @property  {Number}  total       - Total number of elements
 * @property  {Number}  audio       - Number of audio elements
 * @property  {Number}  controls    - Number of form controls
 * @property  {Number}  headings    - Number of heading elements (h1-h6)
 * @property  {Number}  iframes     - Number of iframes
 * @property  {Number}  images      - Number of images (img)
 * @property  {Number}  landmarks   - Number of landmarks
 * @property  {Number}  links       - Number of links (i.e. a and area)
 * @property  {Number}  lists       - Number of lists (i.e. ul, ol and dl)
 * @property  {Number}  listitems   - Number of listitems (i.e. il, dt and dd)
 * @property  {Number}  other       - Number of elements not in one of the
 *                                    other counts
 * @property  {Number}  tables      - Number of table elements
 * @property  {Number}  table_cells - Number of table cells
 * @property  {Number}  objects     - Number of object, embed or applet elements
 * @property  {Number}  video       - Number of video elements
 * @property  {Number}  widgets     - Number of ARIA identified widgets
 */

OpenAjax.a11y.info.ElementSummary = function (dom_cache, option) {

  function getCount(list) {

    var VISIBILITY  = OpenAjax.a11y.VISIBILITY;

    var count = 0;

    if (option === 0) {
      return list.length;
    }
    else {

      var list_len = list.length;

      for (var i = 0; i < list_len; i++) {
        var de = list[i].dom_element;
        if (!de) de = list[i];
        if (!de) continue;

        var cs = de.computed_style;

        if (cs) {
          if ((cs.is_visible_to_at === VISIBILITY.VISIBLE) &&
              (option === 1)) count++;
          else if ((cs.is_visible_to_at === VISIBILITY.HIDDEN) &&
              (option === 2)) count++;
        }
      }
    }

    return count;
  }

  var total       = 0;

  var audio       = 0;
  var controls    = 0;
  var events      = 0;
  var headings    = 0;
  var iframes     = 0;
  var images      = 0;
  var landmarks   = 0;
  var links       = 0;
  var lists       = 0;
  var listitems   = 0;
  var tables      = 0;
  var objects     = 0;
  var video       = 0;
  var widgets     = 0;

  if (dom_cache) {

    if (typeof option !== 'number') option = 0;

    audio   = getCount(dom_cache.media_cache.audio_elements);
    video   = getCount(dom_cache.media_cache.video_elements);
    objects = getCount(dom_cache.media_cache.object_elements);

    controls  = getCount(dom_cache.controls_cache.control_elements);
    widgets   = getCount(dom_cache.controls_cache.widget_elements);
    events    = getCount(dom_cache.controls_cache.elements_with_events);

    headings  = getCount(dom_cache.headings_landmarks_cache.heading_elements);
    landmarks = getCount(dom_cache.headings_landmarks_cache.landmark_elements);

    iframes   = getCount(dom_cache.headings_landmarks_cache.iframe_elements);

    images    = getCount(dom_cache.images_cache.image_elements);

    links     = getCount(dom_cache.links_cache.link_elements);

    lists     = getCount(dom_cache.lists_cache.container_elements);
    listitems = getCount(dom_cache.lists_cache.listitem_elements);

    tables    = getCount(dom_cache.tables_cache.table_elements);

    total     = getCount(dom_cache.element_cache.dom_elements);

  }

  return {
     get audio         () { return audio;       },
     get elements_with_events ()  { return events;  },
     get SITE_NAVIGATION () { return controls;    },
     get headings      () { return headings;    },
     get iframes       () { return iframes;     },
     get images        () { return images;      },
     get landmarks     () { return landmarks;   },
     get links         () { return links;       },
     get lists         () { return lists;       },
     get listitems     () { return listitems;   },
     get objects       () { return objects;     },
     get tables        () { return tables;      },
     get total         () { return total;       },
     get video         () { return video;       },
     get widgets       () { return widgets;     }
  };

};

/* ---------------------------------------------------------------- */
/*                             PageInfo                   */
/* ---------------------------------------------------------------- */

 /**
 * @constructor PageInfo
 *
 * @memberOf OpenAjax.a11y.info
 *
 * @desc Constructor for an object that contains a title, url and description
 *       for a group of rule results
 *
 * @param  {Object}  dom_cache    - Cache of the document object model of the web page
 *
 * @property  {String}  title        - A short description that can be used as
 *                                     a title or the text of a link
 * @property  {String}  url          - A url to more information on the item
 *
 * @property  {ElementSummary}  elements         - Summary information about all
 *                                                 the elements on the web page
 *
 * @property  {ElementSummary}  visible_elements - Summary information about the
 *                                                 elements visible to assistive
 *                                                 technology on the web page
 *
 * @property  {ElementSummary}  hidden_elements - Summary information about the
 *                                                 elements hidden from assistive
 *                                                 technology on the web page
 */

OpenAjax.a11y.info.PageInfo = function (dom_cache) {

  var title   = dom_cache.title;
  var url     = dom_cache.url;
  var lang    = "";

  var elements = new OpenAjax.a11y.info.ElementSummary(dom_cache, 0);
  var visible  = new OpenAjax.a11y.info.ElementSummary(dom_cache, 1);
  var hidden   = new OpenAjax.a11y.info.ElementSummary(dom_cache, 2);

  return {
     get title             () { return title;    },
     get url               () { return url;      },
     get language          () { return lang;     },
     get elements          () { return elements;  },
     get visible_elements  () { return visible;  },
     get hidden_elements   () { return hidden;   },
     toString : function   () { return title;    }
  };

};




