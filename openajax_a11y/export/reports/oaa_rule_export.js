    <script type="text/javascript">

      /**
       * @function replaceAll
       * @memberOf String
       */

      String.prototype.replaceAll = function(str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function(c){return "\\" + c;}), "g"+(ignore?"i":"")), str2);
      }; 
      
      var OAA_RULE_EXPORT = {};

      OAA_RULE_EXPORT.CATEGORIES = {
             '1': 'Abbrevitation',
             '2': 'Audio',  
             '4': 'Color',
             '8': 'Form Control',
            '16': 'Embedded Application',
            '32': 'Heading',
            '64': 'Image',
           '128': 'Landmark',
           '256': 'Language',
           '512': 'Layout',
          '1024': 'Link',
          '2048': 'List',
          '4096': 'Page Navigation',
          '8192': 'Scripting',
         '16384': 'Table',
         '32768': 'Title',
         '65536': 'Timing',
        '131072': 'Video',
        '262144': 'Widget'
      };
      
      
      /**
       * @function OAA_RULE_EXPORT.removeEscapesFromJSON
       *
       * @desc Returns an unescaped string from a JSON string that has been escaped for single quotes and new line characters
       *
       * @param  {String}  str - string to un escape 
       *
       * @return {String}  String with escape characters removed
       */
 
       OAA_RULE_EXPORT.removeEscapesFromJSON = function(str) {

         if (typeof str === 'string' && str.length) {
           var return_str = str.replace("\\'", "'", "gi");
           return_str = return_str.replace("\\\"", "\"", "gi");
           return_str = return_str.replace("\\n", "\n", "gi");
           return return_str;
         }
         return str;  
       };
       

      /**
       * @function OAA_RULE_EXPORT.addElement 
       *
       * @desc Adds element as a child element to another DOM node 
       *
       * @param  {node}    node     - DOM node to add the tag
       * @param  {String}  element  - Tag name of the element to add
       * @param  {String}  id       - id of the element
       * @param  {String}  style    - styling class to add to the element
       * @param  {String}  text     - text content to add
       *
       * @return  {node}  New element node 
       */
       OAA_RULE_EXPORT.addElement = function(node, element, id, style, content ) {
       
         var node_element = document.createElement(element);
         
         if (id    &&    id.length) node_element.setAttribute('id', id);         
         if (style && style.length) node_element.setAttribute('class', style);
         if ((typeof content === 'string' || typeof content === 'number') && content.toString().length) {
           var node_text = document.createTextNode(content.toString());
           node_element.appendChild(node_text);
         }
         
         node.appendChild(node_element);
         
         return node_element;
         
       };


      /**
       * @function OAA_RULE_EXPORT.addTitle
       *
       * @desc Output rule information
       *
       */

       OAA_RULE_EXPORT.addTitle = function() {
       
         var node = document.getElementById('ID_TITLE');
         var title     = OAA_RULE_EXPORT.removeEscapesFromJSON(OAA_RULE_EXPORT.title);
         var text_node = document.createTextNode(title);
         node.appendChild(text_node);

         node = document.getElementById('ID_H1_TITLE');
         node.appendChild(text_node);

       };  

      /**
       * @function OAA_RULE_EXPORT.translateMessageCodes
       *
       * @desc Translate string codes to DOM nodes 
       *
       */
       OAA_RULE_EXPORT.removeCodes = function (message) {
       
         var str = "";
         var end_tag = false; 
         
         if (typeof message != 'string') return "";
         
         message = message.replaceAll("%s", "must/should");
         
         for (var i = 0; i < message.length; i++) {
         
           if (message[i] === "@") {
             if (end_tag) {
                end_tag = false;
             }
             else {             
               end_tag = true;
             }
           }
           else {
             if (end_tag) str += message[i].toUpperCase();
             else str += message[i];
           }
        
         }
         
         return str;
       
       };

      /**
       * @function OAA_RULE_EXPORT.getRulesetHeaders
       *
       * @desc Generate wiki table markup for ruleset titles as headers 
       *
       */

       OAA_RULE_EXPORT.getRulesetHeaders = function(node) {

         for (var i = 0; i < rulesets.length; i++) {
          
            var ruleset = rulesets[i];
            OAA_RULE_EXPORT.addElement(node, "div", "", "", "! " + ruleset['title']);          
         
          }
       }  
      /**
       * @function OAA_RULE_EXPORT.getRulesetInfo
       *
       * @desc Generate wiki table markup for ruleset types for a rule_id
       *
       */

       OAA_RULE_EXPORT.getRulesetInfo = function(node, rule_id) {

         for (var i = 0; i < rulesets.length; i++) {
          
            var mapping = rulesets[i]['rule_mappings'][rule_id];
            
            if (typeof mapping === 'object') {
              if (mapping['type'] === 'required') {
                OAA_RULE_EXPORT.addElement(node, "div", "", "", "| style='text-align: center; font-size: 110%;' | Required");                     
              }
              else {
                OAA_RULE_EXPORT.addElement(node, "div", "", "", "| style='text-align: center; font-style: italic;' | Recommended");                                   
              }
            }
            else {
              OAA_RULE_EXPORT.addElement(node, "div", "", "", "| style='text-align: center; color: gray' | not included");          
            }
         
          }

       }

      /**
       * @function OAA_RULE_EXPORT.translateMessageCodes
       *
       * @desc Translate string codes to DOM nodes 
       *
       */

       OAA_RULE_EXPORT.translateMessageCodes = function(node, message) {
       
         function addTextNode(text) {
           if (text.length) {
             var text_node = document.createTextNode(text);
             node.appendChild(text_node);
           }         
         }

         var str = "";
         var end_tag = false; 
         
         message = message.replaceAll("%s", "must/should");
         
         for (var i = 0; i < message.length; i++) {
         
           if (message[i] === "@") {
             if (end_tag) {
                OAA_RULE_EXPORT.addElement(node, "code", "", "", str);
                end_tag = false;
             }
             else {             
               addTextNode(str);
               end_tag = true;
             }
             str = "";
           }
           else {
             str += message[i];
           }
        
         }
         
         addTextNode(str);
      };  

      /**
       * @function OAA_RULE_EXPORT.showWCAG20Summary
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showWCAG20Summary = function(node) {
       
       
         var level_a_sc_total    = 0;
         var level_a_sc_has_rule = 0;
         var level_a_sc_total_rules = 0;
         
         var level_aa_sc_total    = 0;
         var level_aa_sc_has_rule = 0;
         var level_aa_sc_total_rules = 0;
         
         var level_aaa_sc_total    = 0;
         var level_aaa_sc_has_rule = 0;
         var level_aaa_sc_total_rules = 0;
 
         OAA_RULE_EXPORT.addElement(node, "h2", "", "", "== WCAG 2.0 Rule Summary ==");

         OAA_RULE_EXPORT.addElement(node, "h3", "", "", "=== Summary of Rule Implementation by Success Criteria Level ===");

         OAA_RULE_EXPORT.addElement(node, "div", "", "", "{| summary='Summary of WCAG 2.0 Success Criteria with Rules Defined' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! WCAG 2.0 SC Level");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Total Success Criteria");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Number Success Criteria with Rules");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Number Success Criteria without Rules");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Total Number of Rules");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|-");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Level A");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_A",       "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_HAVE_RULES_A",  "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_NO_RULES_A",    "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_RULES_A", "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|-");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Level AA");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_AA",       "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_HAVE_RULES_AA",  "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_NO_RULES_AA",    "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_RULES_AA", "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|-");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "! Level AAA");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_AAA",       "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_HAVE_RULES_AAA",  "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_NO_RULES_AAA",    "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_RULES_AAA", "", "| style='text-align: center;' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|-");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "!  style='background-color: #dddddd' | All Levels");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_ALL",       "", "| style='text-align: center; background-color: #dddddd' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_HAVE_RULES_ALL",  "", "| style='text-align: center; background-color: #dddddd' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_NO_RULES_ALL",    "", "| style='text-align: center; background-color: #dddddd' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "ID_SC_TOTAL_RULES_ALL", "", "| style='text-align: center; background-color: #dddddd' | ");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|-");
         OAA_RULE_EXPORT.addElement(node, "div", "", "", "|}");

         for (var item in wcag20) {

           var type  = wcag20[item]['type'];
           var title = wcag20[item]['title'];
           var level = wcag20[item]['level'];
           
           if (level === 1) {
             level = "A";
             level_a_sc_total += 1;
           }  
           else {
             if (level === 2) {
               level = "AA";
               level_aa_sc_total += 1;
             }
             else {
               if (level === 3) {
                 level = "AAA";
                 level_aaa_sc_total += 1;
               }
               else {
                 level = "";
               }
             }  
             
           }  

//           OAA_RULE_EXPORT.addElement(node, "div", "", "", item + " " + type + " " + title);

           if (type === 'sc') {

             var section_node = OAA_RULE_EXPORT.addElement(node, "div", "", "", "");
             section_node.setAttribute('role', 'region');
             section_node.setAttribute('aria-labelledby', ('ID_H2_' + item));
        
             OAA_RULE_EXPORT.addElement(section_node, "h3", "", "", "=== " + title + " (" + level + ") ===");
             
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='Rules for " + title + " Category' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Rule ID");
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Rule Description");
             OAA_RULE_EXPORT.getRulesetHeaders(section_node);
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");
             
        
             var at_least_one = false;

             for (var i = 0; i < rules.length; i++) {

               var rule = rules[i];

               if (rule.wcag_primary === item) {

                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| " + rule['nls_rule_id']);              
                 var div_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| ");              
                 OAA_RULE_EXPORT.translateMessageCodes(div_node, rule['definition']);
               
                 OAA_RULE_EXPORT.getRulesetInfo(section_node, rule['rule_id']);
               
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");              


                 if (!at_least_one) {
                   if (level === 'A') level_a_sc_has_rule += 1;
                   else if (level === 'AA') level_aa_sc_has_rule += 1;
                   else if (level === 'AAA') level_aaa_sc_has_rule += 1;
                 }

                 if (level === 'A') level_a_sc_total_rules += 1;
                 else if (level === 'AA') level_aa_sc_total_rules += 1;
                 else if (level === 'AAA') level_aaa_sc_total_rules += 1;

                 at_least_one = true;
               }  
                    
             }
         
             if (!at_least_one) {
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| colspan='" + (2 + rulesets.length).toString() + "' | ''no rules at this time''");              
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");              
             }

             OAA_RULE_EXPORT.addElement(node, "div", "", "", "|}");
     
           }
           
         }  
         
         var data_node = document.getElementById("ID_SC_TOTAL_A");
         var data_text = document.createTextNode(level_a_sc_total.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_HAVE_RULES_A");
         data_text = document.createTextNode(level_a_sc_has_rule.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_NO_RULES_A");
         data_text = document.createTextNode((level_a_sc_total - level_a_sc_has_rule).toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_TOTAL_RULES_A");
         data_text = document.createTextNode(level_a_sc_total_rules.toString());
         data_node.appendChild(data_text);



         data_node = document.getElementById("ID_SC_TOTAL_AA");
         data_text = document.createTextNode(level_aa_sc_total.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_HAVE_RULES_AA");
         data_text = document.createTextNode(level_aa_sc_has_rule.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_NO_RULES_AA");
         data_text = document.createTextNode((level_aa_sc_total - level_aa_sc_has_rule).toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_TOTAL_RULES_AA");
         data_text = document.createTextNode(level_aa_sc_total_rules.toString());
         data_node.appendChild(data_text);


         data_node = document.getElementById("ID_SC_TOTAL_AAA");
         data_text = document.createTextNode(level_aaa_sc_total.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_HAVE_RULES_AAA");
         data_text = document.createTextNode(level_aaa_sc_has_rule.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_NO_RULES_AAA");
         data_text = document.createTextNode((level_aaa_sc_total - level_aaa_sc_has_rule).toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_TOTAL_RULES_AAA");
         data_text = document.createTextNode(level_aaa_sc_total_rules.toString());
         data_node.appendChild(data_text);
         

         var sc_total = level_a_sc_total + level_aa_sc_total + level_aaa_sc_total;

         data_node = document.getElementById("ID_SC_TOTAL_ALL");
         data_text = document.createTextNode(sc_total.toString());
         data_node.appendChild(data_text);

         var sc_has_rule = level_a_sc_has_rule + level_aa_sc_has_rule + level_aaa_sc_has_rule;

         data_node = document.getElementById("ID_SC_HAVE_RULES_ALL");
         data_text = document.createTextNode(sc_has_rule.toString());
         data_node.appendChild(data_text);

         data_node = document.getElementById("ID_SC_NO_RULES_ALL");
         data_text = document.createTextNode((sc_total - sc_has_rule).toString());
         data_node.appendChild(data_text);
         
         var sc_total_rules = level_a_sc_total_rules + level_aa_sc_total_rules + level_aaa_sc_total_rules;

         data_node = document.getElementById("ID_SC_TOTAL_RULES_ALL");
         data_text = document.createTextNode(sc_total_rules.toString());
         data_node.appendChild(data_text);
         


       };  


      /**
       * @function OAA_RULE_EXPORT.showRuleCategorySummary
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showRuleCategorySummary = function(node) {

         OAA_RULE_EXPORT.addElement(node, "h2", "", "", "== Rule Categories Summary ==");

         for (var category in OAA_RULE_EXPORT.CATEGORIES) {

           var category_name = OAA_RULE_EXPORT.CATEGORIES[category];
           var category_id = parseInt(category, 10);

           var section_node = OAA_RULE_EXPORT.addElement(node, "div", "", "", "");
           section_node.setAttribute('role', 'region');
           section_node.setAttribute('aria-labelledby', ('ID_H2_' + category_id));
        
           OAA_RULE_EXPORT.addElement(section_node, "h3", "", "", "=== " + category_name + " Rules ===");

           OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='Rules for " + category_name + " Category' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
           OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Rule ID");
           OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Rule Description");
           OAA_RULE_EXPORT.getRulesetHeaders(section_node);
           OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");

           var at_least_one = false;
       
       
           for (var i = 0; i < rules.length; i++) {

             var rule = rules[i];

             if (rule.rule_category === category_id) {
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| " + rule['nls_rule_id']);              
               var div_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| ");              
               OAA_RULE_EXPORT.translateMessageCodes(div_node, rule['definition']);
               
               OAA_RULE_EXPORT.getRulesetInfo(section_node, rule['rule_id']);
               
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");              
              
               at_least_one = true;
             }  
                    
           }
         
           if (!at_least_one) {
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| colspan='" + (2 + rulesets.length).toString() + "' | ''no rules at this time''");              
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");              
           }

           OAA_RULE_EXPORT.addElement(node, "div", "", "", "|}");

         }  
         
         
       };  

      /**
       * @function OAA_RULE_EXPORT.showRuleCategory
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showRuleCategory = function(nav_node, node, category_id, category_name) {

        function addProperty(property_name, values, up_to_date) {
        
           if (typeof up_to_date !== 'string') up_to_date = 'yes';
        
           OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! style='text-align: left;' | " + property_name);
           
           if (typeof values === 'string' || typeof values === 'number') {
             if (typeof values === 'string' && values.length) {
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| " + OAA_RULE_EXPORT.removeCodes(values) );
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);
             }
             else {
               if (typeof values === 'number') {
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| " + values);
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);                           
               }
               else {
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='color: gray; font-size: 85%;' | ''empty string''");
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);            
               }  
             }
             OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");
           }
           else {
             if (typeof values === 'object' && (typeof values.length === 'number')) {
             
               var count = 0;
               for (var i = 0; i < values.length; i++ ) {
                 if (values[i] && values[i].length) { 
                   count++;
                 }  
               }

               if (count !== 0) {
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| ");
                 for (var i = 0; i < values.length; i++ ) {
                   if (values[i].length) OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "  * " + OAA_RULE_EXPORT.removeCodes(values[i]));
                 }  
               }
               else {
                 if (count === 0) OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='color: gray; font-size: 85%;' | ''none''");            
               }  
               
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);
               OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");
             }
             else {
               if (typeof values === 'boolean') {
                 if (values) OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='color: gray;  font-size: 85%;' | true");
                 else OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='color: gray;  font-size: 85%;' | false");
                 
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");
               }
               else {
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='color: gray;  font-size: 85%;' | ''undefined''");
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "| style='text-align: center;' | " + up_to_date);
                 OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|-");
               }        
             }
           }
        }

        var id =  "ID_DIV_CATEGORY_" + category_id;
        var name = category_name + " Rule Details"
        
        var section_node = OAA_RULE_EXPORT.addElement(node, "section", id, "", "");
        section_node.setAttribute('role', 'region');
        section_node.setAttribute('aria-labelledby', ('ID_H2_' + category_id));
        section_node.style.display = 'none';

        OAA_RULE_EXPORT.addElement(section_node, "h2", ('ID_H2_' + category_id), "", "= " + name + " =");

        var li_node = OAA_RULE_EXPORT.addElement(nav_node, "LI", "", "", "");
        var a_node  =OAA_RULE_EXPORT.addElement(li_node, "a", "", "", name);
        a_node.href="#";
        a_node.addEventListener('click', function () { var x = id; showSection(x);});

        var at_least_one = false;
       
        for (var i = 0; i < rules.length; i++) {

            var rule = rules[i];

            if (rule.rule_category === category_id) {
              var h3_node = OAA_RULE_EXPORT.addElement(section_node, "h3", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h3_node, "== " + rule['nls_rule_id'] + ": " + rule['summary'] + " ==");
              
              at_least_one = true;
 
              var div_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "");              
              
              var summary = "Details of " + rule['nls_rule_id'] + ": " + rule['definition']; 
              
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('Definition', rule['definition']);
              addProperty('Summary', rule['summary']);
              addProperty('Purpose', [rule['purpose_1'],rule['purpose_2'],rule['purpose_3'],rule['purpose_4']] );
              addProperty('Rule ID', rule['rule_id']);
              addProperty('NLS Rule ID', rule['nls_rule_id']);
              addProperty('Techniques', [rule['technique_1'],rule['technique_1_url'],rule['technique_2'],rule['technique_2_url'],rule['technique_3'],rule['technique_3_url'],rule['technique_4'],rule['technique_4_url']] );
              addProperty('Manual Checks', [rule['manual_check_1'],rule['manual_check_1_url'],rule['manual_check_2'],rule['manual_check_2_url'],rule['manual_check_3'],rule['manual_check_3_url'],rule['manual_check_4'],rule['manual_check_4_url']] );
                           
              addProperty('Scope',   (rule['scope']===1?"Element":"Page"));
              addProperty('WCAG 2.0 Primary', rule['wcag_primary']);
              addProperty('WCAG 2.0 Related', rule['wcag_related']);

              addProperty('Language Dependency', rule['language_dependency']);

              addProperty('Rule Category', category_name);

              addProperty('Target Resources', rule['target_resources']);
              addProperty('Target Resources Description', rule['target_resource_desc']);
              addProperty('Resource Properties', rule['resource_properties']);

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");

              summary = rule['nls_rule_id'] + ": Rule Result Messages";

              var h4_node = OAA_RULE_EXPORT.addElement(section_node, "h4", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h4_node, "=== " + summary + " ===");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('All Pass: Singular', rule['rule_result_all_pass_singular']);
              addProperty('All Pass: Plural',   rule['rule_result_all_pass_plural']);

              addProperty('Manual Check: Singular', rule['rule_result_manual_checks_singular']);
              addProperty('Manual Check: Plural',   rule['rule_result_manual_checks_plural']);

              addProperty('Some Fail', rule['rule_result_some_fail']);
              addProperty('All Fail: Singular', rule['rule_result_all_fail_singular']);
              addProperty('All Fail: Plural',   rule['rule_result_all_fail_plural']);
              
              addProperty('Corrective Action: Singular', rule['rule_result_corrective_action_singular']);
              addProperty('Corrective Action: Plural',   rule['rule_result_corrective_action_plural']);

              addProperty('Not Applicable', rule['rule_result_not_applicable']);

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");

              summary = rule['nls_rule_id'] + ": Node Result Messages";

              var h4_node = OAA_RULE_EXPORT.addElement(section_node, "h4", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h4_node, "=== " + summary + " ===");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('Pass 1', rule['node_result_pass_1']);
              addProperty('Pass 2', rule['node_result_pass_2']);
              addProperty('Pass 3', rule['node_result_pass_3']);

              addProperty('Manual Check 1', rule['node_result_manual_check_1']);
              addProperty('Manual Check 2', rule['node_result_manual_check_2']);
              addProperty('Manual Check 3', rule['node_result_manual_check_3']);

              addProperty('Corrective Action 1', rule['node_result_corrective_action_1']);
              addProperty('Corrective Action 2', rule['node_result_corrective_action_2']);
              addProperty('Corrective Action 3', rule['node_result_corrective_action_3']);

              addProperty('Hidden (i.e. thru css)', rule['node_result_hidden']);
              addProperty('Presentation (i.e. role=presentation)', rule['node_result_presentation']);
              addProperty('Other', rule['node_result_other']);
              
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");

            }  
                  
         }
         
         if (!at_least_one) {
            var message_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "");         
            OAA_RULE_EXPORT.addElement(message_node, "em", "", "", "no rules at this time");         
         }

              var h3_node = OAA_RULE_EXPORT.addElement(section_node, "h3", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h3_node, "== new rule nls id : ''new rule summary'' ==");
              
              at_least_one = true;
 
              var div_node = OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "");              
              
              var summary = "Details of of new rule "; 
              
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('Definition', "''definition''", "NO");
              addProperty('Summary', "''summary''", "NO");
              addProperty('Purpose', ["''purpose 1''","''purpose 2''","''purpose 3''","''purpose 4''"], "NO" );
              addProperty('Rule ID', "''rule id''", "NO");
              addProperty('NLS Rule ID', "''rule nls id''", "NO");
              addProperty('Techniques', ["''technique 1''", "''technique 1 url''", "''technique 2''", "''technique 2 url''","''technique 3''", "''technique 3 url''","''technique 4''", "''technique 4 url''"], "NO" );
              addProperty('Manual Checks', ["''manual check 1''", "''manual 1 url''", "''manual check 2''", "''manual 2 url''", "''manual check 3''", "''manual 3 url''", "''manual check 4''", "''manual 4 url''"], "NO"  );
                           
              addProperty('Scope',   "''Element or Page''", "NO");
              addProperty('WCAG 2.0 Primary', "''X.X.X''", "NO");
              addProperty('WCAG 2.0 Related', ["''Y.Y.Y''", "''Z.Z.Z''"], "NO");

              addProperty('Language Dependency', "", "NO");

              addProperty('Rule Category', category_name, "NO");
              
              addProperty('Target Resources', ["''element 1''", "''element 2''"], "NO");
              addProperty('Target Resources Description', "''target resource nls description''", "NO");
              addProperty('Resource Properties', ["''property 1''", "''property 2''"], "NO");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");

              summary = "new rule nls id : Rule Result Messages";

              var h4_node = OAA_RULE_EXPORT.addElement(section_node, "h4", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h4_node, "=== " + summary + " ===");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('All Pass: Singular', "", "NO");
              addProperty('All Pass: Plural',   "", "NO");

              addProperty('Manual Check: Singular', "", "NO");
              addProperty('Manual Check: Plural',   "", "NO");

              addProperty('Some Fail', "", "NO");
              addProperty('All Fail: Singular', "", "NO");
              addProperty('All Fail: Plural',   "", "NO");

              addProperty('Corrective Action: Singular', "", "NO");
              addProperty('Corrective Action: Plural',   "", "NO");

              addProperty('Not Applicable', "", "NO");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");

              summary = "new rule nls id : Node Result Messages";

              var h4_node = OAA_RULE_EXPORT.addElement(section_node, "h4", "", "", "");              
              OAA_RULE_EXPORT.translateMessageCodes(h4_node, "=== " + summary + " ===");

              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "{| summary='" + summary + "' border='1' cellpadding='3' style='margin: .5em; border: black solid 2px; border-collapse: collapse;'");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Property ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Value(s) ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "! Up To Date ");
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|- ");

              addProperty('Pass 1', "", "NO");
              addProperty('Pass 2', "", "NO");
              addProperty('Pass 3', "", "NO");

              addProperty('Manual Check 1', "", "NO");
              addProperty('Manual Check 2', "", "NO");
              addProperty('Manual Check 3', "", "NO");

              addProperty('Corrective Action 1', "", "NO");
              addProperty('Corrective Action 2', "", "NO");
              addProperty('Corrective Action 3', "", "NO");

              addProperty('Hidden (i.e. thru css)', "", "NO");
              addProperty('Presentation (i.e. role=presentation)', "", "NO");
              addProperty('Other', "", "NO");
              
              OAA_RULE_EXPORT.addElement(section_node, "div", "", "", "|}");


       };  

      /**
       * @function OAA_RULE_EXPORT.showRules
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.showRules = function() {

         var nav_node = document.getElementById('ID_UL_NAVIGATION');

         var main_node = document.getElementById('ID_DIV_MAIN');

         var category_node = document.getElementById('ID_DIV_CATEGORY_SUMMARY');

         OAA_RULE_EXPORT.showRuleCategorySummary(category_node);

         var wcag20_node = document.getElementById('ID_DIV_WCAG20_SUMMARY');

         OAA_RULE_EXPORT.showWCAG20Summary(wcag20_node);

         for (var category in OAA_RULE_EXPORT.CATEGORIES) {

           var category_name = OAA_RULE_EXPORT.CATEGORIES[category];
           var category_id = parseInt(category, 10);
          
           OAA_RULE_EXPORT.showRuleCategory(nav_node, main_node, category_id, category_name);           
          
         }  

       };  

      /**
       * @function OAA_RULE_EXPORT.onload
       *
       * @desc Creates web page for rule wiki
       *
       */

       OAA_RULE_EXPORT.onLoad = function() {

         OAA_RULE_EXPORT.title = "OAA Rule Export to JSON and Wiki Format";

         OAA_RULE_EXPORT.addTitle();
         
         OAA_RULE_EXPORT.showRules();
         
       }; 
       
      /**
       * @function showSection
       *
       * @desc Hides and shows different section of the rules
       *
       * @ param {String} id  -  id of section to show
       */

       function showSection(id) {
      
         var sections = document.getElementsByTagName('section');
         
         // alert(sections);
         
         for (var i = 0; i < sections.length; i++) {

           sections[i].style.display = "none";
         }
         
         var section = document.getElementById(id);


         section.style.display = "block";
      
       }

    
       window.addEventListener("load", function () { OAA_RULE_EXPORT.onLoad();   }, false);
    </script>
