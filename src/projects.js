const projects = [];
let currentProjectIndex = 0;

// Projects factory module
function createProject(title) {
  return {
    id: Date.now(),
    title,
    tasks: [],
  };
}

// Initialize default project
function initDefaultProject() {
  if (projects.length === 0) {
    const defaultProject = createProject("First Project");
    projects.push(defaultProject);
    currentProjectIndex = 0;
  }
}

// Add a new project
function addProject(title) {
  const project = createProject(title);
  projects.push(project);

  // Automatically switch to new project
  currentProjectIndex = projects.length - 1;

  return project;
}

// Get all projects
function getProjects() {
  // Create default if empty
  if (projects.length === 0) {
    initDefaultProject();
  }
  return projects;
}

// Get current project
function getCurrentProject() {
  if (projects.length === 0) {
    initDefaultProject();
  }
  return projects[currentProjectIndex];
}

// Set active project by index
function setCurrentProjectIndex(index) {
  if (index >= 0 && index < projects.length) {
    currentProjectIndex = index;
  }
}

// Get current project index
function getCurrentProjectIndex() {
  return currentProjectIndex;
}

// Delete a specific project
function deleteProject(index) {
  if (index >= 0 && index < projects.length) {

    // Prevent Default Project deletion
    if (project.length <= 1) {
      return false;
    }
    
    // Delete the specified project
    projects.splice(index, 1);
    if (currentProjectIndex === projects.length) {
      currentProjectIndex = projects.length -1;
    }
    return true;
  }
  return false;
}

export {
  addProject,
  getProjects,
  getCurrentProject,
  setCurrentProjectIndex,
  getCurrentProjectIndex,
  deleteProject,
};
