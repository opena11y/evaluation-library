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
           var return_str = str.replace("\\'", "'", "gi");
           return_str = return_str.replace("\\\"", "\"", "gi");
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
             
             var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.element_type_data[item]);
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
           var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.element_type_data[item]);
           var text_node = document.createTextNode(text);
           node.appendChild(text_node);
           
           if (typeof link_flag === 'boolean' && link_flag) {
             node.setAttribute('href', text);
             node.setAttribute('target', '_eval_page');
           }
           
           return node;
         }  

         updateInfoItems('title', 'element_type_title');
         
         updateInfoItem('ID_SPAN_EVAL_TITLE', 'eval_title');
         updateInfoItem('ID_A_EVAL_URL', 'eval_url', true);
         updateInfoItem('ID_SPAN_EVAL_DATE', 'eval_date');
         updateInfoItem('ID_SPAN_EVAL_TIME', 'eval_time');

         updateInfoItem('ID_SPAN_RULESET_TITLE', 'ruleset_title');
         updateInfoItem('ID_SPAN_RULESET_VERSION', 'ruleset_version');
         
       }
       
      /**
       * @function initResultItemsArray
       *
       * @desc Creates an array of result items that can be sorted and easily rendered as HTML
       */
       OAA_REPORT.initResultItemsArray = function() {
       
         function addResults(indent, parent_result_item, result_items) {

           var result_items_len = result_items.length;
           var indent_style ="";
  
           for (var i = 0; i < result_items_len; i++) {
         
              var result_item = result_items[i];
         
              var result_row = [];

              var result_cell_1 = new Object();
                        
              result_cell_1.content = position + 1;
              result_cell_1.style   = 'order';
              result_cell_1.id     = '';
              result_row.push(result_cell_1);

              if (indent) indent_style = ' level_' + indent;

              result_cell_2 = new Object();
              result_cell_2.content = result_item['cache_item'];
              result_cell_2.style   = 'element' + indent_style;
              result_cell_2.id     = result_item['cache_id'];
              result_row.push(result_cell_2);

              result_cell_3 = new Object();
              result_cell_3.content = result_item['hidden'];
              result_cell_3.style   = 'hidden';
              result_cell_3.id     = '';
              result_row.push(result_cell_3);

              result_cell_4 = new Object();
              result_cell_4.content = result_item['passed'];
              result_cell_4.style   = 'passed';
              result_cell_4.id     = '';
              result_row.push(result_cell_4);

              result_cell_5 = new Object();
              result_cell_5.content = result_item['warnings'];
              result_cell_5.style   = 'warning';
              result_cell_5.id     = '';
              result_row.push(result_cell_5);

              result_cell = new Object();
              result_cell.content = result_item['manual_checks'];
              result_cell.style   = 'manual_check';
              result_cell.id     = '';
              result_row.push(result_cell);

              result_cell = new Object();
              result_cell.content = result_item['violations'];
              result_cell.style   = 'violation';
              result_cell.id     = '';
              result_row.push(result_cell);

              OAA_REPORT.result_items.push(result_row);
              position++;
              
              var next_indent = indent + 1;
              
              if (result_item.children.length) addResults(next_indent, result_item, result_item.children);
              
           }
         
         }

         var results     = OAA_REPORT.element_type_data.results;

         OAA_REPORT.result_items = [];
         position = 0;
         
         addResults(0, null, OAA_REPORT.element_type_data.results);
      };       

      /**
       * @function addNodeResultsSummary
       *
       * @desc Adds summary of rule eveluation results to HTML OAA report  
       */
       OAA_REPORT.addNodeResultsSummary = function() {

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
           
         function addTableCells(result_row) {
           
           for (var i = 0; i < result_row.length; i++) {
             var result_cell = result_row[i];
             if (typeof result_cell.content === 'number' && result_cell.content == 0) addTableDataCell(result_cell.content, 'zero', result_cell.id); 
             else addTableDataCell(result_cell.content, result_cell.style, result_cell.id); 
           }

           total_hidden        += result_row[2].content;
           total_passed        += result_row[3].content;
           total_warnings      += result_row[4].content;
           total_manual_checks += result_row[5].content;
           total_violations    += result_row[6].content;

         }

         var doc = document;
         var node_td;

         var node_tbody  = doc.getElementById('ID_TBODY_SUMMARY');
         
         var node_tr;
         
         var result_items     = OAA_REPORT.result_items;
         var result_items_len = result_items.length;

         var total_hidden = 0;
         var total_passed = 0;
         var total_warnings = 0;
         var total_manual_checks = 0;
         var total_violations = 0;

         for (i = 0; i < result_items_len; i++) {
            node_tr = doc.createElement('tr');
            
            if (i % 2) node_tr.setAttribute('class', 'odd');
            else node_tr.setAttribute('class', 'even');
         
            addTableCells(result_items[i]); 
            
            node_tbody.appendChild(node_tr);
         }

         node_tr = doc.createElement('tr');
         
         addTableHeaderCell('', 'total', ''); 
         
         addTableHeaderCell('Total Rule Evaluation Results', 'total right', ''); 

         if (total_hidden == 0) addTableDataCell(total_hidden, 'total zero', ''); 
         else addTableDataCell(total_hidden, 'total', ''); 

         if (total_passed == 0) addTableDataCell(total_passed, 'total zero', ''); 
         else addTableDataCell(total_passed, 'total', ''); 

         if (total_warnings == 0) addTableDataCell(total_warnings, 'total zero', ''); 
         else addTableDataCell(total_warnings, 'total', ''); 

         if (total_manual_checks == 0) addTableDataCell(total_manual_checks, 'total zero', ''); 
         else addTableDataCell(total_manual_checks, 'total', ''); 

         if (total_violations == 0) addTableDataCell(total_violations, 'total zero', ''); 
         else addTableDataCell(total_violations, 'total', ''); 

         node_tbody.appendChild(node_tr);

       }

      /**
       * @function addNodeResultsDetails
       *
       * @desc Adds rule eveluation results details to HTML OAA report  
       */
       OAA_REPORT.addNodeResultsDetails = function() {

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
           OAA_REPORT.addElement(node_tr, 'th', '', 'wcag20_level','WCAG 2.0');
           OAA_REPORT.addElement(node_tr, 'th', '', 'message', 'Message/Properties');

           var node_tbody = OAA_REPORT.addElement(node_table, 'tbody', '', '', '');
           
           for (var i = 0; i < node_results.length; i++) {
           
             var node_result = node_results[i];

             if (i % 2) node_tr = OAA_REPORT.addElement(node_tbody, 'tr', '', 'odd', '');
             else node_tr = OAA_REPORT.addElement(node_tbody, 'tr', '', 'even', '');

             
             OAA_REPORT.addElement(node_tr, 'td', '', node_result['result_style'], node_result['result_label']);

             if (node_result['required']) OAA_REPORT.addElement(node_tr, 'td', '', 'required yes', 'Yes');
             else  OAA_REPORT.addElement(node_tr, 'td', '', 'required no', 'no');

             OAA_REPORT.addElement(node_tr, 'td', '', 'wcag20', node_result['wcag_primary_id'] + " (" + node_result['wcag_level'] + ")");

             var node_td = OAA_REPORT.addElement(node_tr, 'td', '', '', '');

             OAA_REPORT.addElement(node_td, 'span', '', 'message', node_result['message']);

             addNodeProperties(node_result['properties']);
           
           }

            node_div.appendChild(node_table);
         }

         var doc = document;
         var node_td;

         var node_details  = doc.getElementById('ID_DIV_DETAILS');
         
         var node_h3;
         var node_text;
         
         var result_items     = OAA_REPORT.result_items;
         var result_items_len = result_items.length;

         for (i = 0; i < result_items_len; i++) {
         
            var position = i+1;
            
            var result_item = OAA_REPORT.result_items[i];
            var node_results = OAA_REPORT.element_type_data.results[i]['node_results'];

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

         OAA_REPORT.initResultItemsArray();

         OAA_REPORT.addNodeResultsSummary();

         OAA_REPORT.addNodeResultsDetails();

//         OAA_REPORT.addCSVRusults();

       }  
    
       window.addEventListener("load", function () { OAA_REPORT.onLoad();   }, false);
    </script>
