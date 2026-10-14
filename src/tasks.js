import {
  initAddTaskModal,
  showAddTaskModal,
  showEditTaskModal,
  initTaskDetailsModal,
  showTaskDetailsModal,
} from "./tasks-dom.js";

// Main Constructor Class module
class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.isComplete = false;
  }

  // Instance Method to toggle task completion status
  toggleComplete(){
    this.isComplete = !this.isComplete;
  }
}

// Static Manager Class module
class TaskManager {
  static #tasks = [];

  // Getter to access all tasks safely
  static get allTasks() {
    return this.#tasks;
  }

  // Create & Add Methods
  static addTask(title, description, dueDate, priority) {
    const task = new Task(title, description, dueDate, priority);
    this.#tasks.push(task);
    return task;
  }

  // Edit & Update Methods
  static updateTask(index, updatedData) {
    if (index => 0 && index <= this.#tasks.length) {
      this.#tasks[index] = new Task(
        updatedData.title,
        updatedData.description,
        updatedData.dueDate,
        updatedData.priority
      );
    }
  }

  // Delete method
  static deleteTask(index) {
    if (index => 0 && index <= this.#tasks.length) {
      this.#tasks.splice(index, 1);
    }
  }
}

// Get main content element
function getMainElement() {
  return document.getElementById("content");
}

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
  TaskManager.allTasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    // Task details string
    const taskDetails = document.createElement("span");
    taskDetails.textContent = `${task.title} | ${task.description} | ${task.dueDate} | ${task.priority}`;

    // Edit button operation
    const editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.addEventListener("click", () => {
      showEditTaskModal(task, index);
    });

    // Delete button operation
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
      TaskManager.deleteTask(index);
      renderTasks();
    });

    // Details button operation
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
}

// Load initial tasks
function loadCreatedTasks() {
  // Create some default tasks
  TaskManager.addTask(
    "Trash disposal",
    "Take out the organic and dry waste",
    "2026-05-19",
    "Low",
  );
  TaskManager.addTask(
    "Week groceries",
    "Create a list of groceries to buy",
    "2026-05-16",
    "High",
  );

  renderTasks();
  initTaskDetailsModal();

  // Initialize modal handlers
  initAddTaskModal({
    onSubmit: (task) => {
      if (task.editingIndex !== null) {
        TaskManager.updateTask(task.editingIndex, task);
      } else {
        TaskManager.addTask(
          task.title,
          task.description,
          task.dueDate,
          task.priority
        );
      }
      renderTasks();
    },
  });
}

export {
  Task,
  TaskManager,
  loadCreatedTasks,
  renderTasks
};
