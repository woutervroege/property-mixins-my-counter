import { ObservedProperties } from 'html-element-property-mixins';

class MyCounter extends ObservedProperties(HTMLElement) {

  static get observedProperties() {
    return ['count'];
  }

  static get template() {
    return /*html*/ `
    <style>
      * {
        font-size: 200%;
      }

      span {
        width: 4rem;
        display: inline-block;
        text-align: center;
      }

      button {
        width: 4rem;
        height: 4rem;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
      }
    </style>
    <button id="dec">-</button>
    <span id="count">0</span>
    <button id="inc">+</button>
    `
  }

  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = this.constructor.template;
    this.shadowRoot.getElementById('inc').onclick = () => this.count++;
    this.shadowRoot.getElementById('dec').onclick = () => this.count--;
  }

  propertyChangedCallback() {
    this.update();
  }

  update() {
    if(!this.shadowRoot) return;
    this.shadowRoot.getElementById('count').innerHTML = this.count;
  }
}

customElements.define('my-counter', MyCounter);