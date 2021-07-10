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


/* ---------------------------------------------------------------- */
/*              ARIA In HTML                                        */
/* ---------------------------------------------------------------- */


if (typeof OpenAjax.a11y.ariaInHTML == "undefined") {
  OpenAjax.a11y.ariaInHTML = {
        "a": [
            {
                "attr": "href",
                "attr_value": "",
                "defaultRole": "link",
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
                ]
            },
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "abbr": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "address": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "area": [
            {
                "attr": "href",
                "attr_value": "",
                "defaultRole": "link",
                "allowedRoles": []
            },
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "article": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "article",
                "allowedRoles": [
                    "application",
                    "document",
                    "feed",
                    "main",
                    "none",
                    "presentation",
                    "region"
                ]
            }
        ],
        "aside": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "complementary",
                "allowedRoles": [
                    "feed",
                    "none",
                    "note",
                    "presentation",
                    "region",
                    "search"
                ]
            }
        ],
        "audio": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "b": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "base": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "bdi": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "bdo": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "blockquote": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "body": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "br": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "presentation",
                    "none"
                ]
            }
        ],
        "button": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "button",
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
            }
        ],
        "canvas": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "caption": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "cite": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "code": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "col": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "colgroup": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "data": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "datalist": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "listbox",
                "allowedRoles": []
            }
        ],
        "dd": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "definition",
                "allowedRoles": []
            }
        ],
        "del": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "dfn": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "term",
                "allowedRoles": []
            }
        ],
        "details": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "group",
                "allowedRoles": []
            }
        ],
        "dialog": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "dialog",
                "allowedRoles": []
            }
        ],
        "div": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "dl": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "group",
                    "list",
                    "presentation",
                    "none"
                ]
            }
        ],
        "dt": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "term",
                "allowedRoles": []
            }
        ],
        "em": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "embed": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "application",
                    "document",
                    "img",
                    "presentation",
                    "none"
                ]
            }
        ],
        "fieldset": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "group",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "radiogroup"
                ]
            }
        ],
        "figcaption": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "group",
                    "presentation",
                    "none"
                ]
            }
        ],
        "figure": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "figure",
                "allowedRoles": []
            }
        ],
        "footer": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "group",
                    "none",
                    "presentation"
                ]
            }
        ],
        "form": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "form",
                "allowedRoles": [
                    "search",
                    "none",
                    "presentation"
                ]
            }
        ],
        "h1": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "h2": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "h3": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "h4": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "h5": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "h6": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "heading",
                "allowedRoles": [
                    "none",
                    "presentation",
                    "tab"
                ]
            }
        ],
        "head": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "header": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "group",
                    "none",
                    "presentation"
                ]
            }
        ],
        "hgroup": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "hr": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "separator",
                "allowedRoles": [
                    "none",
                    "presentation"
                ]
            }
        ],
        "html": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "document",
                "allowedRoles": []
            }
        ],
        "i": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "iframe": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "application",
                    "document",
                    "img",
                    "none",
                    "presentation"
                ]
            }
        ],
        "img": [
            {
                "attr": "alt",
                "attr_value": "",
                "defaultRole": "img",
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
                ]
            },
            {
                "attr": "alt",
                "attr_value": "",
                "defaultRole": "presentation",
                "allowedRoles": []
            },
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "img",
                "allowedRoles": []
            }
        ],
        "input": [
            {
                "attr": "type",
                "attr_value": "button",
                "defaultRole": "button",
                "allowedRoles": [
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
            {
                "attr": "type",
                "attr_value": "checkbox",
                "defaultRole": "checkbox",
                "allowedRoles": [
                    "menuitemcheckbox",
                    "option",
                    "switch",
                    "button",
                    "aria-pressed"
                ]
            },
            {
                "attr": "type",
                "attr_value": "color",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "date",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "datetime-local",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "email",
                "defaultRole": "textbox",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "file",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "hidden",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "image",
                "defaultRole": "button",
                "allowedRoles": [
                    "link",
                    "menuitem",
                    "menuitemcheckbox",
                    "menuitemradio",
                    "radio",
                    "switch"
                ]
            },
            {
                "attr": "type",
                "attr_value": "month",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "number",
                "defaultRole": "spinbutton",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "password",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "radio",
                "defaultRole": "radio",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "range",
                "defaultRole": "slider",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "reset",
                "defaultRole": "button",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "search",
                "defaultRole": "searchbox",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "submit",
                "defaultRole": "button",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "tel",
                "defaultRole": "textbox",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "text",
                "defaultRole": "textbox",
                "allowedRoles": [
                    "combobox",
                    "searchbox",
                    "spinbutton"
                ]
            },
            {
                "attr": "type",
                "attr_value": "time",
                "defaultRole": "widget",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "url",
                "defaultRole": "textbox",
                "allowedRoles": []
            },
            {
                "attr": "type",
                "attr_value": "week",
                "defaultRole": "widget",
                "allowedRoles": []
            }
        ],
        "ins": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "kbd": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "label": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "legend": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "li": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "listitem",
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
            }
        ],
        "link": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "main": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "main",
                "allowedRoles": []
            }
        ],
        "map": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "math": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "math",
                "allowedRoles": []
            }
        ],
        "mark": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "menu": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "list",
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
            }
        ],
        "meta": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "meter": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "nav": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "navigation",
                "allowedRoles": [
                    "menu",
                    "menubar",
                    "tablist"
                ]
            }
        ],
        "noscript": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "object": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": [
                    "application",
                    "document",
                    "img"
                ]
            }
        ],
        "ol": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "list",
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
            }
        ],
        "optgroup": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "group",
                "allowedRoles": []
            }
        ],
        "option": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "option",
                "allowedRoles": []
            }
        ],
        "output": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "status",
                "allowedRoles": []
            }
        ],
        "p": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "param": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "picture": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "pre": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "progress": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "progressbar",
                "allowedRoles": []
            }
        ],
        "q": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "rp": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "rt": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "ruby": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "s": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "samp": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "script": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "section": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "region",
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
            }
        ],
        "select": [
            {
                "attr": "multiple",
                "attr_value": "",
                "defaultRole": "combobox",
                "allowedRoles": []
            },
            {
                "attr": "multiple",
                "attr_value": "",
                "defaultRole": "listbox",
                "allowedRoles": []
            }
        ],
        "slot": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "small": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "source": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "span": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "strong": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "style": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "SVG": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "graphics-document",
                "allowedRoles": []
            }
        ],
        "sub": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "summary": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "button",
                "allowedRoles": []
            }
        ],
        "sup": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "table": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "table",
                "allowedRoles": []
            }
        ],
        "tbody": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "rowgroup",
                "allowedRoles": []
            }
        ],
        "template": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "textarea": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "textbox",
                "allowedRoles": []
            }
        ],
        "tfoot": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "rowgroup",
                "allowedRoles": []
            }
        ],
        "thead": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "rowgroup",
                "allowedRoles": []
            }
        ],
        "time": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "title": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "td": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "cell",
                "allowedRoles": []
            }
        ],
        "th": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "columnheader",
                "allowedRoles": []
            }
        ],
        "tr": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "row",
                "allowedRoles": []
            }
        ],
        "track": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "u": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "ul": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "list",
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
            }
        ],
        "var": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "video": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ],
        "wbr": [
            {
                "attr": "",
                "attr_value": "",
                "defaultRole": "generic",
                "allowedRoles": []
            }
        ]
  };

}
