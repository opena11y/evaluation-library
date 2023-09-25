/* color-contrast.js */

const templateColor = document.createElement('template');
templateColor.innerHTML = `
  <div id="cc-div">
    <slot name="content">
      <p id="cc-slot-default-p" style="color: white">Default Slot Content: </p>
    </slot>
  </div>
`;

class ColorContrastComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Creates a shadow DOM root node for the element

    // Add DOM tree from template
    this.shadowRoot.appendChild(templateColor.content.cloneNode(true));

    const backgroundColor = this.getAttribute('backgroundColor');
    const color           = this.getAttribute('color');
    const opacity         = this.getAttribute('opacity');

    const div = this.shadowRoot.querySelector('div');
    const p = this.shadowRoot.querySelector('p');

    let style = '';

    if (backgroundColor) {
      div.setAttribute('style', `background-color: ${backgroundColor}`);
      p.textContent += `background-color: ${backgroundColor} `
    }
    if (color) {
      style += `color: ${color}`;
      p.textContent += `color: ${color} `
    }
    if (opacity) {
      style += style.length ?  `; opacity: ${opacity}` : `opacity: ${opacity}`;
      p.textContent += `opacity: ${opacity} `
    }

    p.setAttribute('style', style);

  }
}

customElements.define('color-contrast', ColorContrastComponent);

const templateColor1 = document.createElement('template');
templateColor1.innerHTML = `
  <div id="cc-div">
    <slot name="content">
      <p id="cc-slot-default-p" style="color: white">Default Slot Content 1: </p>
      <color-contrast class="COLOR_1_FAIL">
        <div slot="content" id="cc-6-div-F">
          <div style="background-color: #224466" id="cc-6-div-B">
            <p style="color: rgb(255, 255, 255); opacity: 0.5"  id="cc-6-p-C">Web Component 6: Opacity 0.5</p>
          </div>
        </div>
      </color-contrast>
    </slot>
  </div>
`;

class ColorContrastComponent1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Creates a shadow DOM root node for the element

    // Add DOM tree from template
    this.shadowRoot.appendChild(templateColor1.content.cloneNode(true));

    const backgroundColor = this.getAttribute('backgroundColor');
    const color           = this.getAttribute('color');
    const opacity         = this.getAttribute('opacity');

    const div = this.shadowRoot.querySelector('div');
    const p = this.shadowRoot.querySelector('p');

    let style = '';

    if (backgroundColor) {
      div.setAttribute('style', `background-color: ${backgroundColor}`);
      p.textContent += `background-color: ${backgroundColor} `
    }
    if (color) {
      style += `color: ${color}`;
      p.textContent += `color: ${color} `
    }
    if (opacity) {
      style += style.length ?  `; opacity: ${opacity}` : `opacity: ${opacity}`;
      p.textContent += `opacity: ${opacity} `
    }

    p.setAttribute('style', style);

  }
}

customElements.define('color-contrast-1', ColorContrastComponent1);


