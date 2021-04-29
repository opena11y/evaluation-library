    <script type="text/javascript">
    
      /**
       * @function OAA_REPORT.removeEscapesFromJSON
       *
       * @desc Returns an unescaped string from a JSON string that has been escaped for single quotes and new line characters
       *
       * @param  {String}  str - string to un escape 
       *
       * @return {String}  String with escape characters removed
       */
 
       OAA_REPORT.removeEscapesFromJSON = function(str) {

         if (typeof str === 'string' && str.length) {
           var return_str = str.replace("\\'", "'", "g");
           return_str = return_str.replace(/\\\"/g, "\"");
           return_str = return_str.replace("\\n", "\n", "gi");
           return return_str;
         }
         return str;  
       }
       
      /**
       * @function OAA_REPORT.addElement 
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
       OAA_REPORT.addElement = function(node, element, id, style, content ) {
       
         var node_element = document.createElement(element);
         
         if (id && id.length) node_element.setAttribute('id', id);         
         if (style && style.length) node_element.setAttribute('class', style);
         if ((typeof content === 'string' || typeof content === 'number') && content.toString().length) {
           var node_text = document.createTextNode(content.toString());
           node_element.appendChild(node_text);
         }
         
         node.appendChild(node_element);
         
         return node_element;
         
       };

      /**
       * @function OAA_REPORT.addNodeResultsDetails
       *
       * @desc Adds anchor element as a child element to another DOM node 
       *
       * @param  {node}    node     - DOM node to add the tag
       * @param  {String}  element  - Tag name of the element to add
       * @param  {String}  id       - id of the element
       * @param  {String}  style    - styling class to add to the element
       * @param  {String}  text     - text content to add
       *
       * @return  {node}  New element node 
       */
       OAA_REPORT.addAnchor = function(node, id, style, content, href ) {
       
         var node_a = OAA_REPORT.addElement(node, 'a', id, style, content);
         node_a.setAttribute('href', href);
         
         return node_a;
         
       };



      /**
       * @function OAA_REPORT.addTitleAndEvalInfo
       *
       * @desc Adds title to HTML OAA report using the H1 element 
       */
       OAA_REPORT.addTitleAndEvalInfo = function() {

         function updateInfoItems(class_name, item, link_flag) {
         
           var nodes      = document.getElementsByClassName(class_name);
           
           for (var i = 0; i < nodes.length; i++) {
             
             var node = nodes[i];
             
             var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.rule_category_data[item]);
             var text_node = document.createTextNode(text);
             node.appendChild(text_node);
           
             if (typeof link_flag === 'boolean' && link_flag) {
               node.setAttribute('href', text);
               node.setAttribute('target', '_eval_page');
             }
           }   
           return node;
         }  

         function updateInfoItem(id, item, link_flag) {
         
           var node      = document.getElementById(id);
           var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.rule_category_data[item]);
           var text_node = document.createTextNode(text);
           node.appendChild(text_node);
           
           if (typeof link_flag === 'boolean' && link_flag) {
             node.setAttribute('href', text);
             node.setAttribute('target', '_eval_page');
           }
           
           return node;
         }  

         updateInfoItems('title', 'group_title');
         
         updateInfoItem('ID_SPAN_EVAL_TITLE', 'eval_title');
         updateInfoItem('ID_A_EVAL_URL', 'eval_url', true);
         updateInfoItem('ID_SPAN_EVAL_DATE', 'eval_date');
         updateInfoItem('ID_SPAN_EVAL_TIME', 'eval_time');

         updateInfoItem('ID_SPAN_RULESET_TITLE', 'ruleset_title');
         updateInfoItem('ID_SPAN_RULESET_VERSION', 'ruleset_version');
         
       }
       

      /**
       * @function addRuleCategorySummary
       *
       * @desc Adds summary of rule results for rules in the category to HTML OAA report  
       */
       OAA_REPORT.addRuleCategorySummary = function() {

         function addTableHeaderCell(content, style, id) {
           
           var node_th;

           if (id && id.length) {
             node_th = OAA_REPORT.addElement(node_tr, 'th', '', style, '')
             OAA_REPORT.addAnchor(node_td, 'element', content, ('#' + id))
           }
           else {
             OAA_REPORT.addElement(node_tr, 'th', '', style, content);
           }
           
         }
           
         function addTableDataCell(content, style, id) {
           
           var node_td;

           if (id && id.length) {             
             node_td = OAA_REPORT.addElement(node_tr, 'td', '', style, '')
             OAA_REPORT.addAnchor(node_td, '', 'element', content, ('#' + id))
           }
           else {
             OAA_REPORT.addElement(node_tr, 'td', '', style, content);
           }
           
         }
           
         function addTableRow(n, rule_result) {

           addTableHeaderCell("Rule " + (n+1), "rule_num", "");
           
           addTableDataCell(rule_result['definition'], "definition", "");
           
           if (rule_result['required']) addTableDataCell('Yes', 'required yes', '');
           else addTableDataCell('no', 'required no', '');

           addTableDataCell(rule_result['wcag_primary_id'] + " (" + rule_result['wcag_level'] + ")", 'wcag20', '');

           addTableDataCell(rule_result['percent'].toString(), 'passed', "");

           var mc = rule_result['manual'];
           total_manual_checks += mc;
           if (mc > 0) addTableDataCell(mc.toString(), "manual_check", "");
           else addTableDataCell('0', "zero", "");

           var v = rule_result['violations'];
           total_violations += v;
           if (v > 0) addTableDataCell(v.toString(), "violation", "");
           else addTableDataCell('0', "zero", "");

           var w = rule_result['warnings'];
           total_warnings += w;
           if (w > 0) addTableDataCell(w.toString(), "warning", "");
           else addTableDataCell('0', "zero", "");

           var p = rule_result['passed'];
           total_passed += p;
           if (p > 0) addTableDataCell(p.toString(), "passed", "");
           else addTableDataCell('0', "zero", "");

           var h = rule_result['hidden'];
           total_hidden += h;
           if (h > 0) addTableDataCell(h.toString(), "hidden", "");
           else addTableDataCell('0', "zero", "");

         }

         var doc = document;
         var node_td;
         var node_tr;
         
         var node_tbody  = doc.getElementById('ID_TBODY_SUMMARY');
         
         var rule_results     = OAA_REPORT.rule_category_data.rule_results;
         var rule_results_len = rule_results.length;

         var pepr_summ  = 0;

         var total_hidden = 0;
         var total_passed = 0;
         var total_warnings = 0;
         var total_manual_checks = 0;
         var total_violations = 0;

         for (i = 0; i < rule_results_len; i++) {
            node_tr = doc.createElement('tr');
            
            if (i % 2) node_tr.setAttribute('class', 'odd');
            else node_tr.setAttribute('class', 'even');
         
            addTableRow(i, rule_results[i]); 
            
            node_tbody.appendChild(node_tr);
         }

         node_tr = doc.createElement('tr');
         
         addTableHeaderCell('', 'total', ''); 
         
         addTableHeaderCell('Total Rule Evaluation Results', 'total right', ''); 

         addTableHeaderCell('', 'total', ''); 
         addTableHeaderCell('', 'total', ''); 
         addTableHeaderCell('', 'total', ''); 

         if (total_manual_checks == 0) addTableDataCell(total_manual_checks, 'total zero', ''); 
         else addTableDataCell(total_manual_checks, 'total', ''); 

         if (total_violations == 0) addTableDataCell(total_violations, 'total zero', ''); 
         else addTableDataCell(total_violations, 'total', ''); 

         if (total_warnings == 0) addTableDataCell(total_warnings, 'total zero', ''); 
         else addTableDataCell(total_warnings, 'total', ''); 
         if (total_passed == 0) addTableDataCell(total_passed, 'total zero', ''); 
         else addTableDataCell(total_passed, 'total', ''); 

         if (total_hidden == 0) addTableDataCell(total_hidden, 'total zero', ''); 
         else addTableDataCell(total_hidden, 'total', ''); 

         node_tbody.appendChild(node_tr);

       }

      /**
       * @function addRuleCategoryDetails
       *
       * @desc Adds node results of each rule result in the category to HTML OAA report  
       */
       OAA_REPORT.addRuleCategoryDetails = function() {

         function addNodeResults(node_results) {

           function addNodeProperties(properties) {
           
             OAA_REPORT.addElement(node_td, 'p', '', 'properties', 'Properties');
             var node_ul = OAA_REPORT.addElement(node_td, 'ul', '', 'properties', '');
             
             for (var i = 0; i < properties.length; i++) {
             
               var property = properties[i];             
               var node_li = OAA_REPORT.addElement(node_ul, 'li', '', '', '');
               OAA_REPORT.addElement(node_li, 'span', '', 'label', (property.label + ': '));
               OAA_REPORT.addElement(node_li, 'span', '', 'value', property.value);
             }
             
           }


           var node_table = OAA_REPORT.addElement(node_div,   'table', '', 'details', '');
           var node_thead = OAA_REPORT.addElement(node_table, 'thead', '', '', '');
           var node_tr    = OAA_REPORT.addElement(node_thead, 'tr', '', '', '');

           OAA_REPORT.addElement(node_tr, 'th', '', 'result',      'Result');
           OAA_REPORT.addElement(node_tr, 'th', '', 'required',    'Required');
           OAA_REPORT.addElement(node_tr, 'th', '', 'wcag20',      'WCAG 2.0');
           OAA_REPORT.addElement(node_tr, 'th', '', 'message', 'Message/Properties');

           var node_tbody = OAA_REPORT.addElement(node_table, 'tbody', '', '', '');
           
           for (var i = 0; i < node_results.length; i++) {
           
             var node_result = node_results[i];

             if (i % 2) node_tr = OAA_REPORT.addElement(node_tbody, 'tr', '', 'odd', '');
             else node_tr = OAA_REPORT.addElement(node_tbody, 'tr', '', 'even', '');

             
             OAA_REPORT.addElement(node_tr, 'td', '', node_result['result_style'], node_result['result_label']);

             if (node_result['required']) OAA_REPORT.addElement(node_tr, 'td', '', 'required yes', 'Yes');
             else  OAA_REPORT.addElement(node_tr, 'td', '', 'required no', 'no');

             OAA_REPORT.addElement(node_tr, 'td', '', '', ' ');

             var node_td = OAA_REPORT.addElement(node_tr, 'td', '', '', '');

             OAA_REPORT.addElement(node_td, 'span', '', 'message', node_result['message']);

             addNodeProperties(node_result['properties']);
           
           }

            node_div.appendChild(node_table);
         }

         var doc = document;
         var node_td;

         var node_details  = doc.getElementById('ID_DIV_ELEMENT_DETAILS');
         
         var node_h3;
         var node_text;
         
         var result_items     = OAA_REPORT.result_items;
         var result_items_len = result_items.length;

         for (i = 0; i < result_items_len; i++) {
         
            var position = i+1;
            
            var result_item = OAA_REPORT.result_items[i];
            var node_results = OAA_REPORT.result_data.results[i]['node_results'];

            var node_div = doc.createElement('div');
            node_div.setAttribute('class', 'element_details');
            
            node_h3 = doc.createElement('h3');
            node_a = doc.createElement('a');
            node_a.setAttribute('name', result_item[1].id);
            node_a.setAttribute('id', result_item[1].id);
            
            node_h3.appendChild(node_a);
            
            node_text = doc.createTextNode(('Element ' + position + ': '));                     
            node_h3.appendChild(node_text);                     
            node_text = doc.createTextNode(result_item[1].content);                     
            node_h3.appendChild(node_text);
            
            var str = "";
            
            if (result_item[6].content > 0)  
              if (result_item[6].content === 1) str += result_item[6].content + " Violation";
              else str += result_item[6].content + " Violations";

            if (result_item[5].content > 0)  {
              if (str.length) str += ", "
              
              if (result_item[5].content === 1) str += result_item[5].content + " Manual Check";
              else str += result_item[5].content + " Manual Checks";
            }  

            if (result_item[4].content > 0)  {
              if (str.length) str += ", "
              if (result_item[4].content === 1) str += result_item[4].content + " Warning";
              else str += result_item[4].content + " Warnings";
            }  

            if (result_item[3].content > 0)  {
              if (str.length) str += ", "
              str += result_item[3].content + " Pass";
            }  

            if (result_item[2].content > 0)  {
              if (str.length) str += ", "
              str += result_item[2].content + " hidden";
            }

            if (str.length) {
              node_text = doc.createTextNode(" (" + str + ")");                     
            }
            else {
              node_text = doc.createTextNode(" (no rule results)");
            }
            
            node_span = doc.createElement('span');
            node_span.setAttribute('class', 'summary');
            node_span.setAttribute('id', 'summary_' + result_item[1].id);
            
            node_span.appendChild(node_text);

            node_h3.appendChild(node_span);
            
            node_div.appendChild(node_h3);
            
            addNodeResults(node_results)
            
            node_details.appendChild(node_div);
         }
         
       }


       OAA_REPORT.onLoad = function() {
       
         OAA_REPORT.addTitleAndEvalInfo();

         OAA_REPORT.addRuleCategorySummary();
//
//         OAA_REPORT.addRuleCategoryDetails();


       }  
    
       window.addEventListener("load", function () { OAA_REPORT.onLoad();   }, false);
    </script>
