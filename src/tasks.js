// Get main content element
function getMainElement() {
  return document.getElementById('content');
};

// Tasks factory function module
function createTask(title, description, dueDate, priority) {
  return {title, description, dueDate, priority};
};

// Stora default project tasks
const defaultProjectTasks = [];

export { renderTasks };
