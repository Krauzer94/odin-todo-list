// Get main content element
function getMainElement() {
  return document.getElementById('content');
};

// Tasks factory function module
function createTask(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority
  };
};

// Stora default project tasks
const defaultProjectTasks = [];

// Render all available tasks
function renderTasks() {
  const mainContent = getMainElement();

  // Clear previous render
  mainContent.replaceChildren();

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
  defaultProjectTasks.forEach((task) => {
    const listItem = document.createElement("li");

    // All task priorities
    listItem.textContent = 
      `${task.title} | ${task.description} | ${task.dueDate} | ${task.priority}`;

    taskList.appendChild(listItem);
  });

  mainContent.appendChild(taskList);

  // Button event handling
  addTaskButton.addEventListener("click", () => {
    const newTask = createTask(
      `Task ${defaultProjectTasks.length + 1}`,
      "New task description",
      "2026-05-14",
      "High",
    );

    // Mock task and render
    defaultProjectTasks.push(newTask);
    renderTasks();

  });
};

// Initial mock tasks
function loadCreatedTasks() {

  // Create 1st task
  const task1 = createTask(
    "Trash disposal",
    "Take out the organic and dry waste",
    "2026-05-19",
    "Low",
  );

  // Create 2nd task
  const task2 = createTask(
    "Week groceries",
    "Create a list of groceries to buy",
    "2026-05-16",
    "High",
  );

  // Append both tasks
  defaultProjectTasks.push(task1);
  defaultProjectTasks.push(task2);

  renderTasks();
};

export { loadCreatedTasks };
