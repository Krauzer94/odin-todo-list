import './style.css';

import { helloWorld } from './home.js';

document.addEventListener('DOMContentLoaded', () => {

  // Loads home for validation
  function loadHelloWorld() {
    helloWorld();
  };

  // Render home by default
  const mainElement = document.getElementById('content');
  mainElement.id = 'content';
  loadHelloWorld();

});
