/*
 * Copyright 2021 OpenAjax Alliance
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

/* ---------------------------------------------------------------- */
/*              ARIA In HTML                                        */
/* ---------------------------------------------------------------- */

/*
* design patterns for ARIA in HTML
* legitimate keys for each role include:
*
* {Boolean} noRoleAllowed     : No role can be set for the element (required)
* {Boolean} anyRoleAllowed    : Any role can be set for the element (required)
* {String}  defaultRole       : Default role for the element (required)
* {Array}   allowedRoles      : Array of allowed role values (optional)
* {String}  reqAttribute      : Required attribute is present (optional)
* {String   reqAttributeValue : Required attribute value (optional)
* {Boolean} hasAccName        : ELement has an accessible name (optional)
* {Boolean} hasNoRole         : ELement has no role attribute (optional)
* {Boolean} hasListAttribute  : Element has a datalist (optional)
* - :
* - :
*/


if (typeof OpenAjax.a11y.ariaInHTML == "undefined") {
  OpenAjax.a11y.ariaInHTML = {
    "elementInfo": {
        "a[href]": {
            "tagName": "a",
            "defaultRole": "link",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "button",
                "checkbox",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "radio",
                "switch",
                "tab",
                "treeitem"
            ],
            "attr1": "href"
        },
        "a": {
            "tagName": "a",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "abbr": {
            "tagName": "abbr",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "address": {
            "tagName": "address",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "area[href]": {
            "tagName": "area",
            "defaultRole": "link",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "href"
        },
        "area": {
            "tagName": "area",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "article": {
            "tagName": "article",
            "defaultRole": "article",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application",
                "document",
                "feed",
                "main",
                "none",
                "presentation",
                "region"
            ]
        },
        "aside": {
            "tagName": "aside",
            "defaultRole": "complementary",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "feed",
                "none",
                "note",
                "presentation",
                "region",
                "search"
            ]
        },
        "audio": {
            "tagName": "audio",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application"
            ]
        },
        "b": {
            "tagName": "b",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "base": {
            "tagName": "base",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "bdi": {
            "tagName": "bdi",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "bdo": {
            "tagName": "bdo",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "blockquote": {
            "tagName": "blockquote",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "body": {
            "tagName": "body",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "br": {
            "tagName": "br",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "presentation",
                "none"
            ]
        },
        "button": {
            "tagName": "button",
            "defaultRole": "button",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "checkbox",
                "link",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "radio",
                "switch",
                "tab"
            ]
        },
        "canvas": {
            "tagName": "canvas",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "caption": {
            "tagName": "caption",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "cite": {
            "tagName": "cite",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "code": {
            "tagName": "code",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "col": {
            "tagName": "col",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "colgroup": {
            "tagName": "colgroup",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "data": {
            "tagName": "data",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "datalist": {
            "tagName": "datalist",
            "defaultRole": "listbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "dd": {
            "tagName": "dd",
            "defaultRole": "definition",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "del": {
            "tagName": "del",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "dfn": {
            "tagName": "dfn",
            "defaultRole": "term",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "details": {
            "tagName": "details",
            "defaultRole": "group",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "dialog": {
            "tagName": "dialog",
            "defaultRole": "dialog",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "alertdialog"
            ]
        },
        "div": {
            "tagName": "div",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "dl": {
            "tagName": "dl",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "list",
                "presentation",
                "none"
            ]
        },
        "dt": {
            "tagName": "dt",
            "defaultRole": "term",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "listitem"
            ]
        },
        "em": {
            "tagName": "em",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "embed": {
            "tagName": "embed",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application",
                "document",
                "img",
                "presentation",
                "none"
            ]
        },
        "fieldset": {
            "tagName": "fieldset",
            "defaultRole": "group",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "radiogroup"
            ]
        },
        "figcaption": {
            "tagName": "figcaption",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "presentation",
                "none"
            ]
        },
        "figure[figcaption]": {
            "tagName": "figure",
            "defaultRole": "figure",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "hasFigcaption": true
        },
        "figure": {
            "tagName": "figure",
            "defaultRole": "figure",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "footer[contentinfo]": {
            "tagName": "footer",
            "defaultRole": "contentInfo",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "none",
                "presentation"
            ],
            "isLandmark": true
        },
        "footer": {
            "tagName": "footer",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "none",
                "presentation"
            ]
        },
        "form": {
            "tagName": "form",
            "defaultRole": "form",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "search",
                "none",
                "presentation"
            ]
        },
        "h1": {
            "tagName": "h1",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "h2": {
            "tagName": "h2",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "h3": {
            "tagName": "h3",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "h4": {
            "tagName": "h4",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "h5": {
            "tagName": "h5",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "h6": {
            "tagName": "h6",
            "defaultRole": "heading",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation",
                "tab"
            ]
        },
        "head": {
            "tagName": "head",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "header[banner]": {
            "tagName": "header",
            "defaultRole": "banner",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "none",
                "presentation"
            ],
            "isLandmark": true
        },
        "header": {
            "tagName": "header",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "group",
                "none",
                "presentation"
            ]
        },
        "hgroup": {
            "tagName": "hgroup",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "hr": {
            "tagName": "hr",
            "defaultRole": "separator",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "none",
                "presentation"
            ]
        },
        "html": {
            "tagName": "html",
            "defaultRole": "document",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "i": {
            "tagName": "i",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "iframe": {
            "tagName": "iframe",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application",
                "document",
                "img",
                "none",
                "presentation"
            ]
        },
        "img[accname]": {
            "tagName": "img",
            "defaultRole": "img",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "button",
                "checkbox",
                "link",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "progressbar",
                "scrollbar",
                "separator",
                "slider",
                "switch",
                "tab",
                "treeitem"
            ],
            "hasAccname": true
        },
        "img[alt]": {
            "tagName": "img",
            "defaultRole": "img",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "button",
                "checkbox",
                "link",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "progressbar",
                "scrollbar",
                "separator",
                "slider",
                "switch",
                "tab",
                "treeitem"
            ],
            "attr1": "alt"
        },
        "img[emptyalt]": {
            "tagName": "img",
            "defaultRole": "presentation",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "alt=\"\""
        },
        "img": {
            "tagName": "img",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "input[type=button]": {
            "tagName": "input",
            "defaultRole": "button",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "link",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "radio",
                "switch",
                "tab"
            ],
            "attr1": "type=button"
        },
        "input[type=checkbox]": {
            "tagName": "input",
            "defaultRole": "checkbox",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "menuitemcheckbox",
                "option",
                "switch",
                "button"
            ],
            "attr1": "type=checkbox"
        },
        "input[type=color]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=color"
        },
        "input[type=date]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=date"
        },
        "input[type=datetime-local]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=datetime-local"
        },
        "input[type=email][list]": {
            "tagName": "input",
            "defaultRole": "combobox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=email",
            "attr2": "list"
        },
        "input[type=email]": {
            "tagName": "input",
            "defaultRole": "textbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=email"
        },
        "input[type=file]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=file"
        },
        "input[type=hidden]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [],
            "attr1": "type=hidden"
        },
        "input[type=image]": {
            "tagName": "input",
            "defaultRole": "button",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "link",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "radio",
                "switch"
            ],
            "attr1": "type=image"
        },
        "input[type=month]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=month"
        },
        "input[type=number]": {
            "tagName": "input",
            "defaultRole": "spinbutton",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=number"
        },
        "input[type=password]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=password"
        },
        "input[type=radio]": {
            "tagName": "input",
            "defaultRole": "radio",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "menuitemradio"
            ],
            "attr1": "type=radio"
        },
        "input[type=range]": {
            "tagName": "input",
            "defaultRole": "slider",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=range"
        },
        "input[type=reset]": {
            "tagName": "input",
            "defaultRole": "button",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=reset"
        },
        "input[type=search][list]": {
            "tagName": "input",
            "defaultRole": "combobox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=search",
            "attr2": "list"
        },
        "input[type=search]": {
            "tagName": "input",
            "defaultRole": "searchbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=search"
        },
        "input[type=submit]": {
            "tagName": "input",
            "defaultRole": "button",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=submit"
        },
        "input[type=tel][list]": {
            "tagName": "input",
            "defaultRole": "combobox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=tel",
            "attr2": "list"
        },
        "input[type=tel]": {
            "tagName": "input",
            "defaultRole": "textbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=tel"
        },
        "input[type=text][list]": {
            "tagName": "input",
            "defaultRole": "combobox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=text",
            "attr2": "list"
        },
        "input[type=text]": {
            "tagName": "input",
            "defaultRole": "textbox",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "combobox",
                "searchbox",
                "spinbutton"
            ],
            "attr1": "type=text"
        },
        "input[type=time]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=time"
        },
        "input[type=url][list]": {
            "tagName": "input",
            "defaultRole": "combobox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=url",
            "attr2": "list"
        },
        "input[type=url]": {
            "tagName": "input",
            "defaultRole": "textbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=url"
        },
        "input[type=week]": {
            "tagName": "input",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "attr1": "type=week"
        },
        "ins": {
            "tagName": "ins",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "kbd": {
            "tagName": "kbd",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "label": {
            "tagName": "label",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "legend": {
            "tagName": "legend",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "li": {
            "tagName": "li",
            "defaultRole": "listitem",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio",
                "option",
                "none",
                "presentation",
                "radio",
                "separator",
                "tab",
                "treeitem"
            ]
        },
        "link": {
            "tagName": "link",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "main": {
            "tagName": "main",
            "defaultRole": "main",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "map": {
            "tagName": "map",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "math": {
            "tagName": "math",
            "defaultRole": "math",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "mark": {
            "tagName": "mark",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "menu": {
            "tagName": "menu",
            "defaultRole": "list",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "directory",
                "group",
                "listbox",
                "menu",
                "menubar",
                "none",
                "presentation",
                "radiogroup",
                "tablist",
                "toolbar",
                "tree"
            ]
        },
        "meta": {
            "tagName": "meta",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "meter": {
            "tagName": "meter",
            "defaultRole": "generic",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "nav": {
            "tagName": "nav",
            "defaultRole": "navigation",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "menu",
                "menubar",
                "tablist"
            ]
        },
        "noscript": {
            "tagName": "noscript",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "object": {
            "tagName": "object",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application",
                "document",
                "img"
            ]
        },
        "ol": {
            "tagName": "ol",
            "defaultRole": "list",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "directory",
                "group",
                "listbox",
                "menu",
                "menubar",
                "none",
                "presentation",
                "radiogroup",
                "tablist",
                "toolbar",
                "tree"
            ]
        },
        "optgroup": {
            "tagName": "optgroup",
            "defaultRole": "group",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "option": {
            "tagName": "option",
            "defaultRole": "option",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "output": {
            "tagName": "output",
            "defaultRole": "status",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "p": {
            "tagName": "p",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "param": {
            "tagName": "param",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "picture": {
            "tagName": "picture",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "pre": {
            "tagName": "pre",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "progress": {
            "tagName": "progress",
            "defaultRole": "progressbar",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "q": {
            "tagName": "q",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "rp": {
            "tagName": "rp",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "rt": {
            "tagName": "rt",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "ruby": {
            "tagName": "ruby",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "s": {
            "tagName": "s",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "samp": {
            "tagName": "samp",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "script": {
            "tagName": "script",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "section[accname]": {
            "tagName": "section",
            "defaultRole": "region",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "alert",
                "alertdialog",
                "application",
                "banner",
                "complementary",
                "contentinfo",
                "dialog",
                "document",
                "feed",
                "log",
                "main",
                "marquee",
                "navigation",
                "none",
                "note",
                "presentation",
                "search",
                "status",
                "tabpanel"
            ],
            "hasAccname": true
        },
        "section": {
            "tagName": "section",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "alert",
                "alertdialog",
                "application",
                "banner",
                "complementary",
                "contentinfo",
                "dialog",
                "document",
                "feed",
                "log",
                "main",
                "marquee",
                "navigation",
                "none",
                "note",
                "presentation",
                "search",
                "status",
                "tabpanel"
            ]
        },
        "select": {
            "tagName": "select",
            "defaultRole": "combobox",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "menu"
            ]
        },
        "select[size-or-multiple]": {
            "tagName": "select",
            "defaultRole": "listbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "hasSizeOrMultiple": true
        },
        "slot": {
            "tagName": "slot",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "small": {
            "tagName": "small",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "source": {
            "tagName": "source",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "span": {
            "tagName": "span",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "strong": {
            "tagName": "strong",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "style": {
            "tagName": "style",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "SVG": {
            "tagName": "SVG",
            "defaultRole": "graphics-document",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "sub": {
            "tagName": "sub",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "summary": {
            "tagName": "summary",
            "defaultRole": "button",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "sup": {
            "tagName": "sup",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "table": {
            "tagName": "table",
            "defaultRole": "table",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "tbody": {
            "tagName": "tbody",
            "defaultRole": "rowgroup",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "template": {
            "tagName": "template",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "textarea": {
            "tagName": "textarea",
            "defaultRole": "textbox",
            "noRoleAllowed": true,
            "anyRoleAllowed": false
        },
        "tfoot": {
            "tagName": "tfoot",
            "defaultRole": "rowgroup",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "thead": {
            "tagName": "thead",
            "defaultRole": "rowgroup",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "time": {
            "tagName": "time",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "title": {
            "tagName": "title",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "td[cell]": {
            "tagName": "td",
            "defaultRole": "cell",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyTable": true
        },
        "td[gridcell]": {
            "tagName": "td",
            "defaultRole": "gridcell",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyGrid": true,
            "ownedbyTreegrid": true
        },
        "td": {
            "tagName": "td",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "th[cell]": {
            "tagName": "th",
            "defaultRole": "cell",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyTable": true
        },
        "th[gridcell]": {
            "tagName": "th",
            "defaultRole": "gridcell",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyGrid": true,
            "ownedbyTreegrid": true
        },
        "th[colheder]": {
            "tagName": "th",
            "defaultRole": "colheader",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyTable": true,
            "ownedbyGrid": true,
            "ownedbyTreegrid": true
        },
        "th": {
            "tagName": "th",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "tr[table]": {
            "tagName": "tr",
            "defaultRole": "row",
            "noRoleAllowed": true,
            "anyRoleAllowed": false,
            "ownedbyTable": true,
            "ownedbyGrid": true,
            "ownedbyTreegrid": true
        },
        "tr": {
            "tagName": "tr",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "track": {
            "tagName": "track",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": []
        },
        "u": {
            "tagName": "u",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "ul": {
            "tagName": "ul",
            "defaultRole": "list",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "directory",
                "group",
                "listbox",
                "menu",
                "menubar",
                "none",
                "presentation",
                "radiogroup",
                "tablist",
                "toolbar",
                "tree"
            ]
        },
        "var": {
            "tagName": "var",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        },
        "video": {
            "tagName": "video",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": false,
            "allowedRoles": [
                "application"
            ]
        },
        "wbr": {
            "tagName": "wbr",
            "defaultRole": "generic",
            "noRoleAllowed": false,
            "anyRoleAllowed": true
        }
    },
    getElementAriaInfo : function (node) {

        var tagName = node.tagName.toLowerCase();
        var elemInfo, type;

        switch (tagName) {
            case 'a':
                if (node.href) {
                    elemInfo = this.elementInfo['a[href]'];
                } else {
                    elemInfo = this.elementInfo['a'];
                }
                break;

            case 'area':
                if (node.href) {
                    elemInfo = this.elementInfo['area[href]'];
                } else {
                    elemInfo = this.elementInfo['area'];
                }
                break;

            case 'img':
                if (node.alt) {
                    if (node.alt.trim().length) {
                        elemInfo = this.elementInfo['img[alt]'];
                    } else {
                        elemInfo = this.elementInfo['img[emptyalt]'];
                    }
                } else {
                    if (node.hasAttribute('aria-label') ||
                        node.hasAttribute('aria-labelledby')) {
                        elemInfo = this.elementInfo['img[accname]'];
                    } else {
                        elemInfo = this.elementInfo['img'];
                    }
                }
                break;

            case 'input':

                type = node.type;

                if (!type) {
                    type = 'text';
                }
                tagName += '[type=' + type + ']';

                if (node.list) {
                    tagName += '[list]';
                }
                elemInfo = this.elementInfo[tagName];
                break;

            case 'section':
                if (node.hasAttribute('aria-label') ||
                    node.hasAttribute('aria-labelledby')) {
                    elemInfo = this.elementInfo['section[accname]'];
                } else {
                    elemInfo = this.elementInfo['section'];
                }
                break;

            case 'select':
                if (node.multiple || (node.size > 1)) {
                    elemInfo = this.elementInfo['select[size-or-multiple]'];
                } else {
                    elemInfo = this.elementInfo['select'];
                }
                break;

            default:
                elemInfo = this.elementInfo[tagName];

        }

        if (!elemInfo) {
            elemInfo = {
              "tagName": node.tagName,
              "defaultRole": "generic",
              "noRoleAllowed": false,
              "anyRoleAllowed": true
            }
        }

        return elemInfo;
    }
  };
}
