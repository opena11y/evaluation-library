/* webComponentAriaRef.js */

const template1 = document.createElement('template');
template1.innerHTML = `
  <div class="custom-header">webcomponent-aria-ref</div>
  <div class="content">
    <div id="valid-combobox-menu" role="menu" aria-labelledby="valid-component-ref-1 invalid-component-ref-A valid-component-ref-2 invalid-component-ref-B">
    </div>

    <div id="valid-component-ref-1">Menu Label 1: component</div>
    <div id="valid-component-ref-2">Menu Label 2: component</div>

    <input role="combobox" aria-controls="valid-combobox-menu" aria-label="valid IDREF"/>
    <input role="combobox" aria-controls="invalid-combobox-menu"  aria-label="invalid IDREF"/>

  </div>
`;

class WebComponentAriaRef extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Creates a shadow DOM root node for the element

    // Use external CSS stylesheet
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'test.css');
    this.shadowRoot.appendChild(link);

    // Add DOM tree from template
    this.shadowRoot.appendChild(template1.content.cloneNode(true));
  }
}

customElements.define('aria-ref-webcomponent', WebComponentAriaRef);


