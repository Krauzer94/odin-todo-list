import { initAddTaskModal, showAddTaskModal } from './dom.js';

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
    const taskDetails = document.createElement("span");
    taskDetails.textContent = `${task.title} | ${task.description} | ${task.dueDate} | ${task.priority}`;

    // Delete button for each task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    // Handle task deletion
    listItem.appendChild(taskDetails);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

  });

  mainContent.appendChild(taskList);

  // Button event handling
  addTaskButton.addEventListener("click", () => {
    showAddTaskModal();

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

  // Initialize modal handlers
  initAddTaskModal({
    onSubmit: (task) => {
      defaultProjectTasks.push(createTask(
        task.title,
        task.description,
        task.dueDate,
        task.priority
      ));
      renderTasks();
    }
  });
};

export { loadCreatedTasks };
