import './style.css';

import { loadCreatedTasks } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {

  // Loads created tasks
  function _loadCreatedTasks() {
    loadCreatedTasks();
  };

  // Render mock tasks
  const mainElement = document.getElementById('content');
  mainElement.id = 'content';
  _loadCreatedTasks();

});
