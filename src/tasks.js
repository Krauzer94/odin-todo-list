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

// Render all available tasks
function renderTasks() {
  const mainContent = getMainElement();

  // Project title
  const projetTitle = document.createElement("h2");
  projetTitle.textContent = "Default Project";
  mainContent.appendChild(projetTitle);

  // Add taks button
  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "Add Task";
  mainContent.appendChild(addTaskButton);

  // Project task list
  const taskList = document.createElement("ul");
  defaultProjectTasks.forEach((tasks) => {
    const listItem = document.createElement("li");

    // All task priorities
    listItem.textContent = 
      `${task.title} | ${task.description} | ${task.dueDate} | ${task.priority}`;

    taskLists.appendChild(listItem);
  });

  mainContent.appendChild(taskList);

  // Button event handling
  addTaskButton.addEventListener("click", () => {
    const newTask = createTAsk(
      `Task ${defaultProjectTask.length + 1}`,
      "New task description",
      "First example task",
      "2026-05-14",
      "High",
    );

    // Mock task and render
    defaultProjectTasks.push(newTask);
    renderTasks();
  });

};

export { renderTasks };
