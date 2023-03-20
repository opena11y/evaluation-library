/* accessible-name.js */

const templateAccName = document.createElement('template');
templateAccName.innerHTML = `
  <div id="cc-div">
    <slot name="content">
      <div>
        <label for="control-11">Label Reference 1: TextBox</label>
        <input id="control-11"
               type="text"
               data-label="Label Reference 1: TextBox"
               title="WXYZ"
               data-desc="WXYZ">
      </div>

      <div>
        <label>
          Label Encapsulation 1: TextBox
          <input id="control-21"
                 type="checbox"
                 data-label="Label Encapsulation 1: TextBox"/>
        </label>
      </div>

      <div>
        <label>
          <code>aria-labelledby</code> 1: TextBox
          <input type="checbox"
                 id="control-51"
                 aria-labelledby="textbox-51-ref"
                 data-label="aria-labelledy A textbox label, overrides label encapsulation">
        </label>
        <div id="textbox-51-ref">aria-labelledy A textbox label, overrides label encapsulation</div>
      </div>

    </slot>
  </div>
`;

class AccNameComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Creates a shadow DOM root node for the element

    // Add DOM tree from template
    this.shadowRoot.appendChild(templateAccName.content.cloneNode(true));

  }
}

customElements.define('acc-name', AccNameComponent);

