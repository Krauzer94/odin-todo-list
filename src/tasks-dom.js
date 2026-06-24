// tasks-dom.js

// Internal private state
let _dialogEl = null;
let _formEl = null;
let _initialized = false;
let _editingIndex = null;
let _detailsDialogEl = null;

// Initialize task modal
function initAddTaskModal({ onSubmit } = {}) {
  // Cache elements
  _dialogEl = document.getElementById("addTaskDialog");
  _formEl = _dialogEl?.querySelector(".add-task-form");

  // Basic validation
  if (!_dialogEl) return;
  if (!_formEl) return;
  if (_initialized) return;

  // Reset on close
  _dialogEl.addEventListener("close", () => {
    _formEl.reset();
  });

  // Modal close event
  function closeAddTaskModal() {
    _editingIndex = null;
    _dialogEl.close();
    _formEl.reset();
  }

  // Handle form submission
  _formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("taskTitle").value.trim();
    const description = document
      .getElementById("taskDescription")
      .value.trim();
    const dueDate = document.getElementById("taskDuedate").value;
    const priority = document.getElementById("taskPriority").value;

    if (!title || !priority) {
      alert("Please provide the required fields.");
      return;
    }

    const task = {
      title,
      description,
      dueDate,
      priority,
      editingIndex: _editingIndex,
    };

    if (typeof onSubmit === "function") {
      onSubmit(task);
    }

    closeAddTaskModal();
  });

  // Cancel operations
  const cancelButton = document.getElementById("cancelBtn");
  const closeButton = document.getElementById("closeModalBtn");

  if (cancelButton) {
    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeAddTaskModal();
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeAddTaskModal);
  }

  _initialized = true;
}

// Show add task modal
function showAddTaskModal() {
  if (!_dialogEl) {
    _dialogEl = document.getElementById("addTaskDialog");
  }

  if (!_dialogEl) return;

  if (typeof _dialogEl.showModal === "function") {
    _dialogEl.showModal();
  } else {
    _dialogEl.setAttribute("open", "");
  }
}

// Show edit task modal
function showEditTaskModal(task, index) {
  _editingIndex = index;

  document.getElementById("taskTitle").value = task.title;
  document.getElementById("taskDescription").value = task.description;
  document.getElementById("taskDuedate").value = task.dueDate;
  document.getElementById("taskPriority").value =
    task.priority.toLowerCase();

  showAddTaskModal();
}

// Initialize task details modal
function initTaskDetailsModal() {
  _detailsDialogEl = document.getElementById("taskDetailsDialog");

  if (!_detailsDialogEl) return;

  const closeDetailsBtn = document.getElementById("closeDetailsBtn");
  const detailsCancelBtn = document.getElementById("detailsCancelBtn");

  function closeTaskDetailsModal() {
    _detailsDialogEl.close();
  }

  if (closeDetailsBtn) {
    closeDetailsBtn.addEventListener("click", closeTaskDetailsModal);
  }

  if (detailsCancelBtn) {
    detailsCancelBtn.addEventListener("click", closeTaskDetailsModal);
  }
}

// Show task details dialog
function showTaskDetailsModal(task) {
  if (!_detailsDialogEl) {
    _detailsDialogEl = document.getElementById("taskDetailsDialog");
  }

  if (!_detailsDialogEl) return;

  document.getElementById("detailsTitle").textContent = task.title;
  document.getElementById("detailsDescription").textContent =
    task.description || "No description";
  document.getElementById("detailsDueDate").textContent =
    task.dueDate || "No due date";
  document.getElementById("detailsPriority").textContent =
    task.priority;

  _detailsDialogEl.showModal();
}

export {
  initAddTaskModal,
  showAddTaskModal,
  showEditTaskModal,
  initTaskDetailsModal,
  showTaskDetailsModal,
};
