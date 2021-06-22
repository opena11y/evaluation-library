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
/*              ARIA Defintions and Validation Methods              */
/* ---------------------------------------------------------------- */


if (typeof OpenAjax.a11y.aria == "undefined") {
  OpenAjax.a11y.aria = {

        /*
         * XSD data types for all WAI-ARIA properties
         * along with valid values when the data type is NMTOKEN
         */
    "propertyDataTypes": {
        "aria-activedescendant": {
            "propType": "property",
            "type": "idref",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-atomic": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-autocomplete": {
            "propType": "property",
            "type": "nmtoken",
            "values": [
                "inline",
                "list",
                "both",
                "none"
            ],
            "defaultValue": "none",
            "deprecated": false
        },
        "aria-busy": {
            "propType": "state",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-checked": {
            "propType": "state",
            "type": "tristate",
            "values": [
                "false",
                "mixed",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-colcount": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-colindex": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-colspan": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-controls": {
            "propType": "property",
            "type": "idrefs",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-current": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "page",
                "step",
                "location",
                "date",
                "time",
                "true",
                "false"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-describedby": {
            "propType": "property",
            "type": "idrefs",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-details": {
            "propType": "property",
            "type": "idref",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-disabled": {
            "propType": "state",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-dropeffect": {
            "propType": "property",
            "type": "nmtokens",
            "values": [
                "copy",
                "execute",
                "link",
                "move",
                "none",
                "popup"
            ],
            "defaultValue": "none",
            "deprecated": true
        },
        "aria-errormessage": {
            "propType": "property",
            "type": "idref",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-expanded": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "false",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-flowto": {
            "propType": "property",
            "type": "idrefs",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-grabbed": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "false",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": true
        },
        "aria-haspopup": {
            "propType": "property",
            "type": "nmtoken",
            "values": [
                "false",
                "true",
                "menu",
                "listbox",
                "tree",
                "grid",
                "dialog"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-hidden": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "false",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-invalid": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "grammar",
                "false",
                "spelling",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-keyshortcuts": {
            "propType": "property",
            "type": "string",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-label": {
            "propType": "property",
            "type": "string",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-labelledby": {
            "propType": "property",
            "type": "idrefs",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-level": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-live": {
            "propType": "property",
            "type": "nmtoken",
            "values": [
                "assertive",
                "off",
                "polite"
            ],
            "defaultValue": "off",
            "deprecated": false
        },
        "aria-modal": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-multiline": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-multiselectable": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-orientation": {
            "propType": "property",
            "type": "nmtoken",
            "values": [
                "horizontal",
                "undefined",
                "vertical"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-owns": {
            "propType": "property",
            "type": "idrefs",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-placeholder": {
            "propType": "property",
            "type": "string",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-posinset": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-pressed": {
            "propType": "state",
            "type": "tristate",
            "values": [
                "false",
                "mixed",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-readonly": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-relevant": {
            "propType": "property",
            "type": "nmtokens",
            "values": [
                "additions",
                "additions",
                "all",
                "removals",
                "text"
            ],
            "defaultValue": "additions",
            "deprecated": false
        },
        "aria-required": {
            "propType": "property",
            "type": "boolean",
            "values": [
                "false",
                "true"
            ],
            "defaultValue": "false",
            "deprecated": false
        },
        "aria-roledescription": {
            "propType": "property",
            "type": "string",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-rowcount": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-rowindex": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-rowspan": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-selected": {
            "propType": "state",
            "type": "nmtoken",
            "values": [
                "false",
                "true",
                "undefined"
            ],
            "defaultValue": "undefined",
            "deprecated": false
        },
        "aria-setsize": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-sort": {
            "propType": "property",
            "type": "nmtoken",
            "values": [
                "ascending",
                "descending",
                "none",
                "other"
            ],
            "defaultValue": "none",
            "deprecated": false
        },
        "aria-valuemax": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-valuemin": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-valuenow": {
            "propType": "property",
            "type": "number",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        },
        "aria-valuetext": {
            "propType": "property",
            "type": "string",
            "values": [],
            "defaultValue": "",
            "deprecated": false
        }
    },
        /*
         * list of abstract roles - used to support the WAI-ARIA role taxonomy and
         * not to be used by content authors
         * @see http://www.w3.org/TR/wai-aria/roles#isAbstract
         */
        abstractRoles : [
            "command",
            "composite",
            "input",
            "landmark",
            "range",
            "roletype",
            "section",
            "sectionhead",
            "select",
            "structure",
            "widget",
            "window"
        ],

          /*
           * design patterns for concrete WAI-ARIA roles
           * legitimate keys for each role include:
           *
           * - container: appropriate container(s) for that role
           * - props: states and properties that may be associated with this role (in addition to the global states and properties listed above)
           * - reqProps: required states or properties for this role
           * - reqChildren: required children for this role
           * - htmlEquiv: HTML equivalent for this role
           * - roleType: one of widget, landmark, or null
           */
    "designPatterns": {
        "alert": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "alertdialog": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-modal",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "application": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-activedescendant",
                "aria-disabled",
                "aria-errormessage",
                "aria-expanded",
                "aria-haspopup",
                "aria-invalid"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-activedescendant",
                "aria-disabled",
                "aria-errormessage",
                "aria-expanded",
                "aria-haspopup",
                "aria-invalid"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "article": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-posinset",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-posinset",
                "aria-setsize"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "banner": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "blockquote": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "button": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-disabled",
                "aria-haspopup",
                "aria-expanded",
                "aria-pressed"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-haspopup",
                "aria-expanded",
                "aria-pressed"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "caption": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "figure",
                "grid",
                "table",
                "treegrid"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "cell": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-colindex",
                "aria-colspan",
                "aria-rowindex",
                "aria-rowspan"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-colindex",
                "aria-colspan",
                "aria-rowindex",
                "aria-rowspan"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "row"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "checkbox": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-checked",
                "aria-errormessage",
                "aria-expanded",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [
                "aria-errormessage",
                "aria-expanded",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "requiredProps": [
                "aria-checked"
            ],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "code": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "columnheader": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-colindex",
                "aria-colspan",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-expanded",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-readonly",
                "aria-relevant",
                "aria-required",
                "aria-roledescription",
                "aria-rowindex",
                "aria-rowspan",
                "aria-selected"
            ],
            "deprecatedProps": [],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "row"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "combobox": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-controls",
                "aria-expanded",
                "aria-activedescendant",
                "aria-autocomplete",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-activedescendant",
                "aria-autocomplete",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "requiredProps": [
                "aria-controls",
                "aria-expanded"
            ],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "command": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "complementary": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "composite": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-activedescendant",
                "aria-disabled"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-activedescendant",
                "aria-disabled"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "contentinfo": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "definition": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "deletion": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "dialog": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-modal",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "directory": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "document": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "emphasis": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "feed": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "article"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "figure": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "form": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "generic": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "grid": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-colcount",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-rowcount",
                "aria-multiselectable",
                "aria-readonly"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-multiselectable",
                "aria-readonly"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "row",
                "rowgroup"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "gridcell": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-colindex",
                "aria-colspan",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-rowindex",
                "aria-rowspan",
                "aria-disabled",
                "aria-errormessage",
                "aria-expanded",
                "aria-haspopup",
                "aria-invalid",
                "aria-readonly",
                "aria-required",
                "aria-selected"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-disabled",
                "aria-errormessage",
                "aria-expanded",
                "aria-haspopup",
                "aria-invalid",
                "aria-readonly",
                "aria-required",
                "aria-selected"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "row"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "group": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-activedescendant",
                "aria-disabled"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-activedescendant",
                "aria-disabled"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "heading": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "img": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "input": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "insertion": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "landmark": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "link": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "list": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "listitem"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "listbox": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-orientation",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-errormessage",
                "aria-expanded",
                "aria-invalid",
                "aria-multiselectable",
                "aria-readonly",
                "aria-required"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [
                "aria-errormessage",
                "aria-expanded",
                "aria-invalid",
                "aria-multiselectable",
                "aria-readonly",
                "aria-required"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "group",
                "option"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "listitem": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-level",
                "aria-posinset",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-level",
                "aria-posinset",
                "aria-setsize"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "directory",
                "list"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "log": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "main": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "marquee": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "math": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "meter": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuetext"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "menu": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-orientation",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "group",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "menubar": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-orientation",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "group",
                "menuitem",
                "menuitemcheckbox",
                "menuitemradio"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "menuitem": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup",
                "aria-posinset",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup",
                "aria-posinset",
                "aria-setsize"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "group",
                "menu",
                "menubar"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "menuitemcheckbox": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-expanded",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-posinset",
                "aria-relevant",
                "aria-roledescription",
                "aria-setsize",
                "aria-checked"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [
                "aria-checked"
            ],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [
                "group",
                "menu",
                "menubar"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "menuitemradio": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-checked",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-expanded",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-posinset",
                "aria-relevant",
                "aria-roledescription",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-checked",
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [
                "group",
                "menu",
                "menubar"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "navigation": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "none": {
            "allowedProps": [],
            "deprecatedProps": [],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "note": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "option": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-selected",
                "aria-checked",
                "aria-posinset",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-checked",
                "aria-posinset",
                "aria-setsize"
            ],
            "requiredProps": [
                "aria-selected"
            ],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [
                "group",
                "listbox"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "paragraph": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "presentation": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "progressbar": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuenow",
                "aria-valuetext"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "radio": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-checked",
                "aria-posinset",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-posinset",
                "aria-setsize"
            ],
            "requiredProps": [
                "aria-checked"
            ],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "radiogroup": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-orientation",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-errormessage",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [
                "aria-errormessage",
                "aria-invalid",
                "aria-readonly",
                "aria-required"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "radio"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "range": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuenow",
                "aria-valuetext"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuenow",
                "aria-valuetext"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "region": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "roletype": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy (state)",
                "aria-controls",
                "aria-current (state)",
                "aria-describedby",
                "aria-details",
                "aria-disabled (state)",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed (state)",
                "aria-haspopup",
                "aria-hidden (state)",
                "aria-invalid (state)",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-atomic",
                "aria-busy (state)",
                "aria-controls",
                "aria-current (state)",
                "aria-describedby",
                "aria-details",
                "aria-disabled (state)",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed (state)",
                "aria-haspopup",
                "aria-hidden (state)",
                "aria-invalid (state)",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "n/a"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "row": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-colindex",
                "aria-expanded",
                "aria-level",
                "aria-posinset",
                "aria-rowindex",
                "aria-setsize",
                "aria-selected"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-colindex",
                "aria-expanded",
                "aria-level",
                "aria-posinset",
                "aria-rowindex",
                "aria-setsize",
                "aria-selected"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "grid",
                "rowgroup",
                "table",
                "treegrid"
            ],
            "onlyContain": [
                "cell",
                "columnheader",
                "gridcell",
                "rowheader"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "rowgroup": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "grid",
                "table",
                "treegrid"
            ],
            "onlyContain": [
                "row"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "rowheader": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-colindex",
                "aria-colspan",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-readonly",
                "aria-relevant",
                "aria-required",
                "aria-roledescription",
                "aria-rowindex",
                "aria-rowspan",
                "aria-selected",
                "aria-expanded",
                "aria-sort"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-expanded",
                "aria-sort"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "row"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "scrollbar": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-valuetext",
                "aria-controls",
                "aria-valuenow",
                "aria-disabled",
                "aria-orientation",
                "aria-valuemax",
                "aria-valuemin"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-orientation",
                "aria-valuemax",
                "aria-valuemin"
            ],
            "requiredProps": [
                "aria-controls",
                "aria-valuenow"
            ],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "search": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "searchbox": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-autocomplete",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-multiline",
                "aria-owns",
                "aria-placeholder",
                "aria-readonly",
                "aria-relevant",
                "aria-required",
                "aria-roledescription"
            ],
            "deprecatedProps": [],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "section": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "n/a"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "sectionhead": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "select": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "separator": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-disabled",
                "aria-orientation",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuetext"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-orientation",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuetext"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "slider": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-valuetext",
                "aria-valuenow",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-orientation",
                "aria-readonly",
                "aria-valuemax",
                "aria-valuemin"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-orientation",
                "aria-readonly",
                "aria-valuemax",
                "aria-valuemin"
            ],
            "requiredProps": [
                "aria-valuenow"
            ],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "spinbutton": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-errormessage",
                "aria-invalid",
                "aria-readonly",
                "aria-required",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuenow",
                "aria-valuetext"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [
                "aria-errormessage",
                "aria-invalid",
                "aria-readonly",
                "aria-required",
                "aria-valuemax",
                "aria-valuemin",
                "aria-valuenow",
                "aria-valuetext"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "status": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "strong": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "structure": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "n/a"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "subscript": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "superscript": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "prohibited"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "switch": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-expanded",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-readonly",
                "aria-relevant",
                "aria-required",
                "aria-roledescription",
                "aria-checked"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [],
            "requiredProps": [
                "aria-checked"
            ],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "tab": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup",
                "aria-posinset",
                "aria-selected",
                "aria-setsize"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid"
            ],
            "props": [
                "aria-disabled",
                "aria-expanded",
                "aria-haspopup",
                "aria-posinset",
                "aria-selected",
                "aria-setsize"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": true,
            "requiredContext": [
                "tablist"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "table": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-colcount",
                "aria-rowcount"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-colcount",
                "aria-rowcount"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "row",
                "rowgroup"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "tablist": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-multiselectable",
                "aria-orientation"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [
                "aria-multiselectable",
                "aria-orientation"
            ],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "tab"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "tabpanel": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "term": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "textbox": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-activedescendant",
                "aria-autocomplete",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-multiline",
                "aria-placeholder",
                "aria-readonly",
                "aria-required"
            ],
            "deprecatedProps": [],
            "props": [
                "aria-activedescendant",
                "aria-autocomplete",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid",
                "aria-multiline",
                "aria-placeholder",
                "aria-readonly",
                "aria-required"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "time": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "timer": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "toolbar": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "tooltip": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "tree": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-orientation",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription",
                "aria-errormessage",
                "aria-invalid",
                "aria-multiselectable",
                "aria-required"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [
                "aria-errormessage",
                "aria-invalid",
                "aria-multiselectable",
                "aria-required"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "group",
                "treeitem"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "treegrid": {
            "allowedProps": [
                "aria-activedescendant",
                "aria-atomic",
                "aria-busy",
                "aria-colcount",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-multiselectable",
                "aria-orientation",
                "aria-owns",
                "aria-readonly",
                "aria-relevant",
                "aria-required",
                "aria-roledescription",
                "aria-rowcount"
            ],
            "deprecatedProps": [
                "aria-haspopup"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [
                "row",
                "rowgroup"
            ],
            "roleType": "",
            "isAbstract": false
        },
        "treeitem": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-checked",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-level",
                "aria-live",
                "aria-owns",
                "aria-posinset",
                "aria-relevant",
                "aria-roledescription",
                "aria-selected",
                "aria-setsize",
                "aria-expanded",
                "aria-haspopup"
            ],
            "deprecatedProps": [
                "aria-errormessage",
                "aria-invalid",
                "aria-selected"
            ],
            "props": [
                "aria-expanded",
                "aria-haspopup"
            ],
            "requiredProps": [],
            "nameRequired": true,
            "nameFrom": [
                "contents",
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [
                "group",
                "tree"
            ],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": false
        },
        "widget": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "n/a"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        },
        "window": {
            "allowedProps": [
                "aria-atomic",
                "aria-busy",
                "aria-controls",
                "aria-current",
                "aria-describedby",
                "aria-details",
                "aria-disabled",
                "aria-dropeffect",
                "aria-errormessage",
                "aria-flowto",
                "aria-grabbed",
                "aria-haspopup",
                "aria-hidden",
                "aria-invalid",
                "aria-keyshortcuts",
                "aria-label",
                "aria-labelledby",
                "aria-live",
                "aria-owns",
                "aria-relevant",
                "aria-roledescription"
            ],
            "deprecatedProps": [
                "aria-disabled",
                "aria-errormessage",
                "aria-haspopup",
                "aria-invalid"
            ],
            "props": [],
            "requiredProps": [],
            "nameRequired": false,
            "nameFrom": [
                "author"
            ],
            "childrenPresentational": false,
            "requiredContext": [],
            "onlyContain": [],
            "roleType": "",
            "isAbstract": true
        }
    }, // end designPatterns

        getRoleObject : function(role) {

          var dp = this.designPatterns;

          for (var r in dp) {

            if (role == r)  return dp[r];

          }

          var ar = this.abstractRoles;
          var ar_len = ar.length;

          for (var i = 0; i < ar_len; i++) {

            if (role == r[i])  return 'abstract';

          }

          return null;
        }

    };

}
