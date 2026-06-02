const projects = [];

// Get sidebar projects element
function getSidebarProjectsEl() {
    return document.querySelector('.sidebar-projects');
};

// Projects factory module
function createProject(title) {
    return { title, tasks: [] };
};

// Add new project
function addProject(title) {
    const project = createProject(title);
    projects.push(project);
    return project;
};

// Get all projects
function getProjects() {
    return projects;
};

export {
    addProject,
    getProjects,
    createProject
};
