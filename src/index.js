import './style.css';

import { homeSideBar, homeContent } from './home.js';

document.addEventListener('DOMContentLoaded', () => {

  // Loads home for validation
  function loadHomePage() {
    homeSideBar();
    homeContent();
  };

  // Render home by default
  const mainElement = document.getElementById('content');
  mainElement.id = 'content';
  loadHomePage();

});
