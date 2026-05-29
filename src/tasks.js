import {
  initAddTaskModal,
  showAddTaskModal,
  showEditTaskModal,
  initTaskDetailsModal,
  showTaskDetailsModal
} from './dom.js';

// Get main content
function getMainElement() {
  return document.getElementById('content');
};

// Tasks factory function module
function createTask(title, description, dueDate, priority) {
  return { title, description, dueDate, priority };
};

// Store default project
const defaultProjectTasks = [];

// Render available tasks
function renderTasks() {

  // Cache and clear
  const mainContent = getMainElement();
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
  defaultProjectTasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    // All task priorities
    const taskDetails = document.createElement("span");
    taskDetails.textContent = `${task.title} | ${task.description} | ${task.dueDate} | ${task.priority}`;

    // Edit element operation
    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => {
      showEditTaskModal(task, index);
    });

    // Delete element operation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });

    // Details info operation
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "ℹ️";
    detailsButton.addEventListener("click", () => {
      showTaskDetailsModal(task);
    });

    // DOM manipulation handling
    listItem.appendChild(taskDetails);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(detailsButton);
    taskList.appendChild(listItem);
  });
  mainContent.appendChild(taskList);

  // Button event handling
  addTaskButton.addEventListener("click", () => {
    showAddTaskModal();
  });
};

// Load created tasks contents
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
  initTaskDetailsModal();

  // Initialize modal handlers
  initAddTaskModal({
    onSubmit: (task) => {
      if (task.editingIndex !== null) {
        editTask(task.editingIndex, task);
      } else {
        defaultProjectTasks.push(createTask(
          task.title,
          task.description,
          task.dueDate,
          task.priority
        ));
        renderTasks();
      }
    }
  });
};

// Edit a previously created task
function editTask(index, updatedTask) {
  defaultProjectTasks[index] = createTask(
    updatedTask.title,
    updatedTask.description,
    updatedTask.dueDate,
    updatedTask.priority,
  );

  // Re-render after editing
  renderTasks();
};

// Delete a previously created task
function deleteTask(index) {
  defaultProjectTasks.splice(index, 1);
  renderTasks();
};

export { loadCreatedTasks, deleteTask };
