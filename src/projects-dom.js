import { ProjectManager } from "./projects.js";

let _dialogEl = null;
let _formEl = null;

// Render sidebar projects list
function renderProjectsList(onProjectSwitch) {
  // Cache and clear elements
  const sidebarProjectsEl = document.querySelector(".sidebar-projects");
  if (!sidebarProjectsEl) return;
  sidebarProjectsEl.replaceChildren();

  // Access state via ProjectManager
  const allProjects = ProjectManager.allProjects;
  const activeIndex = ProjectManager.currentIndex;

  allProjects.forEach((project, index) => {
    // Create sidebar list element
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("sidebar-project-item");
    projectDiv.textContent = project.title;

    // Visually highlight active item
    if (index === activeIndex) {
      projectDiv.classList.add("active-project");
    }

    // Switch project click event
    projectDiv.addEventListener("click", () => {
      // Use static method to update index
      ProjectManager.currentIndex = index;
      renderProjectsList(onProjectSwitch);

      // Trigger the task switch callback
      if (typeof onProjectSwitch === "function") {
        onProjectSwitch();
      }
    });

    sidebarProjectsEl.appendChild(projectDiv);
  });
}

// Initialize project modal
function initProjectModal({ onSubmit }) {
  // Cache and basic validation
  _dialogEl = document.getElementById("addProjectDialog");
  _formEl = document.querySelector(".add-project-form");
  const closeBtn = document.getElementById("addProjectCloseBtn");
  const cancelBtn = document.getElementById("addProjectCancelBtn");

  // Close modal module
  function closeModal() {
    _dialogEl.close();
    _formEl.reset();
  }

  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  _formEl.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent submission

    // Get user input
    const title = document.getElementById("projectTitle").value.trim();
    if (!title) {
      return;
    }

    onSubmit(title);
    closeModal();
  });
}

export {
  initProjectModal,
  renderProjectsList,
};
