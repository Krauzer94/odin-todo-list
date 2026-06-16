import "./style.css";

import { renderProjects } from "./dom.js";
import { addProject } from "./projects.js";
import { loadCreatedTasks } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  // Add default project
  addProject("Default Project");

  // Render sidebar projects
  renderProjects();

  // Render mock tasks
  const mainElement = document.getElementById("content");
  mainElement.id = "content";
  loadCreatedTasks();
});
