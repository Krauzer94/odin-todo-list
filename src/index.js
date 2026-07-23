import "./style.css";

import { loadCreatedTasks, renderTasks } from "./tasks.js";
import { initProjectModal, renderProjectsList } from "./projects-dom.js";
import { addProject, getProjects } from "./projects.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize project modal logic
  initProjectModal({
    onSubmit: (title) => {
      addProject(title);
      renderProjectsList();
    },
  });

  // Hook up sidebar add button
  const addProjectBtn = document.querySelector(".add-project");
  const addProjectDialog = document.getElementById("addProjectDialog");
  addProjectBtn.addEventListener("click", () => {
    addProjectDialog.showModal();
  });

  // Load generated content
  loadCreatedTasks();
});
