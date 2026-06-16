const projects = [];
let currentProjectIndex = 0;

// Get sidebar projects element
function getSidebarProjectsEl() {
  return document.querySelector(".sidebar-projects");
}

// Projects factory module
function createProject(title) {
  return {
    id: Date.now(), // Unique ID for each project
    title,
    tasks: [],
  };
}

// Add new project
function addProject(title) {
  const project = createProject(title);
  projects.push(project);
  return project;
}

// Get all projects
function getProjects() {
  return projects;
}

// Get project by index
function getProject(index) {
  return projects[index];
}

// Get current project
function getCurrentProject(index) {
  return projects[currentProjectIndex];
}

// Add task to specific project
function addTaskToProject(projectIndex, task) {
  if (projectIndex >= 0 && projectIndex < projects.length) {
    projects[projectIndex].task.push(task);
    return true;
  } else {
    return false;
  }
}

export { addProject, getProjects, createProject };
