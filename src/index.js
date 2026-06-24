import "./style.css";

import { loadCreatedTasks } from "./tasks.js";

document.addEventListener("DOMContentLoaded", () => {
  // Render mock tasks
  const mainElement = document.getElementById("content");
  mainElement.id = "content";
  loadCreatedTasks();
});
