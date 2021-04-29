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
           return_str = return_str.replace('\\"', "'", "g");
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
             
             var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.rule_summary_data[item]);
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
           var text     = OAA_REPORT.removeEscapesFromJSON(OAA_REPORT.rule_summary_data[item]);
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
       * @function OAA_REPORT.addDocumentSummary
       *
       * @desc Adds summary of rule results for rules in the category to HTML OAA report  
       */
       OAA_REPORT.addDocumentSummary = function() {

         function addTableHeaderCell(content, style, id) {
           
           var node_th;

           if (id && id.length) {
             node_th = OAA_REPORT.addElement(node_tr, 'th', '', style, '')
             OAA_REPORT.addAnchor(node_th, 'element', content, ('#' + id))
           }
           else {
             node_th = OAA_REPORT.addElement(node_tr, 'th', '', style, content);
           }
           
           return node_th;
         }
           
         function addTableDataCell(content, style, id) {
           
           var node_td;

           if (id && id.length) {             
             node_td = OAA_REPORT.addElement(node_tr, 'td', '', style, '')
             OAA_REPORT.addAnchor(node_td, '', 'element', content, ('#' + id))
           }
           else {
             node_td = OAA_REPORT.addElement(node_tr, 'td', '', style, content);
           }

           return node_td;

         }
           
         function addTableRow(result, level) {
         
           node_tr = doc.createElement('tr');
           
           if (row % 2) node_tr.setAttribute('class', 'odd');
           else node_tr.setAttribute('class', 'even');
           row++;

           if (typeof result['group_title'] === 'string') node = addTableHeaderCell(result['group_title'], "definition " + level, "");
           else node = addTableHeaderCell(result['definition'], "definition " + level, "");
 
           
           if (typeof result['required'] === 'boolean') {
             if (result['required']) addTableDataCell('Yes', 'required yes', '');
             else addTableDataCell('no', 'required no', '');
           }
           else {
             addTableDataCell('', '', '');
           }

           if (typeof result['wcag_level'] === 'string') addTableDataCell(result['wcag_level'], 'wcag20', '');
           else addTableDataCell('', '', '');

           node = addTableDataCell(result['percent'].toString(), "passed" + " " + level, "");

           var mc = result['manual'];
           if (mc > 0) node = addTableDataCell(mc.toString(), "manual_check " + level, "");
           else node = addTableDataCell('0', "zero " + level, "");
           
           node_tbody.appendChild(node_tr);

         }


         function addSummaryResults(summary_results, level) {
         
           if (typeof summary_results !== 'object') return;
           
           var summary_results_len = summary_results.length;
         
           for (var i = 0; i < summary_results_len; i++) {
           
             var summary_result = summary_results[i];
             
             addTableRow(summary_result, level);
                      
             if (summary_result.summary_results) addSummaryResults(summary_result.summary_results, level + "g");
             else if (summary_result.rule_results) addSummaryResults(summary_result.rule_results, level + "r");
           }
         
         
         }

         var doc = document;
         var node_td;
         var node_tr;
         
         var row = 0;
         
         var node_tbody  = doc.getElementById('ID_TBODY_SUMMARY');
         
         addSummaryResults(OAA_REPORT.rule_summary_data.summary_results, 'g');

       }



       OAA_REPORT.onLoad = function() {
       
         OAA_REPORT.addTitleAndEvalInfo();

         OAA_REPORT.addDocumentSummary();

       }  
    
       window.addEventListener("load", function () { OAA_REPORT.onLoad();   }, false);
    </script>
