  <body>
    
      <div role="main" aria-labelledby="ID_H1_SUMMARY">
        <h1 id="ID_H1_TITLE">Element Evaluation Results: <span class="title"></span></h1>

        <p class="csv"><a href="report_element_type.csv">CSV Export of Element Evaluation Results for <span class="title"></span></a></p>
        
        <div role="region" aria-labelledby="ID_H2_EVAL_INFO">
          <h2 id="ID_H2_EVAL_INFO">Evaluation Information</h2>
          <div class="info"><span class="label">Title: </span>  <span class="item" id="ID_SPAN_EVAL_TITLE"></span></div>
          <div class="info"><span class="label">URL: </span>    <span class="item"><a id="ID_A_EVAL_URL"></a></span></div>
          <div class="info"><span class="label">Date: </span>   <span class="item" id="ID_SPAN_EVAL_DATE"></span></div>
          <div class="info"><span class="label">Time: </span>   <span class="item" id="ID_SPAN_EVAL_TIME"></span></div>
          <div class="info"><span class="label">Ruleset: </span><span class="item"><span id="ID_SPAN_RULESET_TITLE"></span> (<span id="ID_SPAN_RULESET_VERSION"></span>)</span></div>
          
        </div> 
        
        <div role="region" aria-labelledby="ID_H2_SUMMARY">
          <h2 id="ID_H2_SUMMARY"><a id="ID_A_SUMMARY" name="ID_A_SUMMARY"></a>Element Summary</h2>
          <p>Summary of rule results for each element.</p>
        
          <table id="ID_TABLE_SUMMARY" summary="Summary of the types of evaluation results for each element">
            <thead>
              <th class="order">Order</th>
              <th class="element">Element</th>
              <th class="h">Hidden</th>
              <th class="p">Passed</th>
              <th class="w">Warnings</th>
              <th class="mc">Manual Checks</th>
              <th class="v">Violations</th>
            </thead>
            <tbody id="ID_TBODY_SUMMARY">
            
            </tbody>
          </table>
          <h3>Severity Definitions</h3>
          <ul class="severities">
            <li><span class="violation">violation:</span> element or page is missing a <em>required</em> accessibility feature.</li>
            <li><span class="warning">warning:</span> element or page is missing a <em>recommended</em> accessibility feature.</li>
            <li><span class="manual_check">manual check:</span> element or page accessibility feature can only be determined using human judgement.</li>
            <li><span class="passed">pass:</span> element or page has a required or recommended accessibility feature.</li>
            <li><span class="hidden">hidden:</span> element is hidden from assistive technology and/or is not rendered visually by the browser.  
              Elements that are hidden are not analyzed, but they are reported since sometimes elements that are hidden were intended to improve accessibility of a page, but the use of <code>display: none</code> or other technique hide the accessibilit information.  
              If element was intended to improve accessibility of currently rendered content, use an off screen positioning technique to make the information visible to assistive technologies.</li>
          </ul>
        </div>
        <div id="ID_DIV_DETAILS" role="region" aria-labelledby="ID_H2_DETAILS">
          <h2 id="ID_H2_DETAILS">Element Details</h2>        
          <p>Details of he rule results for each element, including the properties of the element that were used to determine if the rule resulted
             in one of the following:
          </p>
        </div>
      </div>    
     
  </body>
