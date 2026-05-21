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
    const addTaskDialog = document.getElementById('addTaskDialog');
    if (addTaskDialog && typeof addTaskDialog.showModal === 'function') {
      addTaskDialog.showModal();
    } else if (addTaskDialog) {
      // Fallback for browsers without dialog support
      addTaskDialog.setAttribute('open', '');
    }

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

  // Setup dialog form handling once
  const addTaskDialog = document.getElementById('addTaskDialog');
  if (addTaskDialog) {
    const addTaskForm = addTaskDialog.querySelector('.add-task-form');
    if (addTaskForm) {
      addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission

        // Get user input
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('taskDuedate').value;
        const priority = document.getElementById('taskPriority').value;

        // Validate input
        if (!title || !priority) {
          alert('Please provide a title and priority.');
          return;
        }

        // Add new task to project
        const newTask = createTask(title, description, dueDate, priority);
        defaultProjectTasks.push(newTask);

        // Close the dialog
        if (typeof addTaskDialog.close === 'function') {
          addTaskDialog.close();
        } else {
          addTaskDialog.removeAttribute('open');
        }

        // Reset form and re-render
        addTaskForm.reset();
        renderTasks();
      });
    }
  }
};

export { loadCreatedTasks };
