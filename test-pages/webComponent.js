/* webComponent.js */

const template1 = document.createElement('template');
template1.innerHTML = `
  <div class="custom-header">heading-webcomponent</div>
  <div class="content">
    <h3><slot name="h3">Default Slotted H3 content</slot></h3>
    <slot name="h4"><h4>Default Slotted H4 content</h4></slot>
    <slot name="h5"><h5>Default Slotted H5 content</h5></slot>
    <slot name="h6"><h6>Default Slotted H6 content</h6></slot>
  </div>
`;

class HeadingWebComponent extends HTMLElement {
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

customElements.define('heading-webcomponent', HeadingWebComponent);

const template2 = document.createElement('template');
template2.innerHTML = `
  <div class="content">
    <div class="custom-header">ccr-webcomponent</div>
    <slot name="content">
      <p>No slot content, <span><code>span</code> child of <code>p</code> element</span></p>
    </slot>
  </div>
`;

class ColorContrastComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Creates a shadow DOM root node for the element

    // Use external CSS stylesheet
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'test.css');
    this.shadowRoot.appendChild(link);

    // Add DOM tree from template
    this.shadowRoot.appendChild(template2.content.cloneNode(true));

    // Add background color
    const backgroundColor = this.getAttribute('backgroundColor');
    if (backgroundColor) {
      const div = this.shadowRoot.querySelector('.content');
      div.setAttribute('style', `background-color: ${backgroundColor}`);
    }

  }
}

customElements.define('cc-webcomponent', ColorContrastComponent);


