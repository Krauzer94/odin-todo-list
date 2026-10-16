import "./style.css";

import { ProjectManager } from "./projects.js";
import { loadCreatedTasks } from "./tasks.js";
import { initProjectModal, renderProjectsList } from "./projects-dom.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize project modal logic
  initProjectModal({
    onSubmit: (title) => {
      ProjectManager.addProject(title);
      renderProjectsList();
    },
  });

  // Hook up sidebar add button
  const addProjectBtn = document.querySelector(".add-project");
  const addProjectDialog = document.getElementById("addProjectDialog");
  addProjectBtn?.addEventListener("click", () => {
    addProjectDialog.showModal();
  });

  // Load generated content
  loadCreatedTasks();
});
