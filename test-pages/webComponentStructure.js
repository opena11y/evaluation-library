/* webComponentAriaRef.js */

const template1 = document.createElement('template');
template1.innerHTML = `
  <section aria-labelledby="title-1">
    <h3 id="title-1"><slot name="section-1-title"></slot></h3>
    <slot name="section-1-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Mauris viverra ultrices leo, ut sodales magna pulvinar et.
      Nunc scelerisque, eros sed feugiat sodales, mauris justo vulputate lorem,
      fringilla iaculis turpis arcu sit amet sapien. Vivamus facilisis orci leo.
    </slot>
    <ul>
      <li>Item A1</li>
      <li>Item B1</li>
      <li>Item C1</li>
    </ul>
  </section>
  <section aria-labelledby="title-2">
    <h3 id="title-2"><slot name="section-2-title"></slot></h3>
    <p>
      Usce imperdiet eu est id aliquet. Nullam ut leo quis ligula ultrices iaculis.
      Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
      Proin quis venenatis lacus, ac tincidunt nibh. Morbi eget ante ac ipsum tempor dictum.
    </p>
    <ul>
      <li>Item A2</li>
      <li>Item B2</li>
      <li>Item C2</li>
    </ul>
  </section>
`;

class WebComponentStructure extends HTMLElement {
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

customElements.define('structure-webcomponent', WebComponentStructure);


