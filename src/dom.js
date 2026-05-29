// Internal private state
let _dialogEl = null;
let _formEl = null;
let _initialized = false;
let _editingIndex = null;
let _detailsDialogEl = null;

// Modal handlers
function initAddTaskModal({ onSubmit } = {}) {

  // Cache elements
  _dialogEl = document.getElementById('addTaskDialog');
  _formEl = _dialogEl.querySelector('.add-task-form');

  // Reset on close
  _dialogEl.addEventListener('close', () => {
    _formEl.reset();
  });

  // Basic validation
  if (!_dialogEl) return;
  if (!_formEl) return;
  if (_initialized) return;

  // Modal close event
  function closeAddTaskModal() {
    _editingIndex = null;
    _dialogEl.close();
    _formEl.reset();
  }

  // Handle form submission
  _formEl.addEventListener('submit', (e) => {

    // Prevent submission
    e.preventDefault();

    // Get user input
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const dueDate = document.getElementById('taskDuedate').value;
    const priority = document.getElementById('taskPriority').value;

    // Validate required
    if (!title || !priority) {
      alert('Please provide the required fields.');
      return;
    }

    // Push to project
    const task = {
      title,
      description,
      dueDate,
      priority,
      editingIndex: _editingIndex
    };

    // Invoke callback
    if (typeof onSubmit === 'function') {
      onSubmit(task);
    }

    // Close on submit
    closeAddTaskModal();
  });

  // Cancel operations
  const cancelButton = document.getElementById('cancelBtn');
  const closeButton = document.getElementById('closeModalBtn');

  // Close submission
  if (cancelButton) {
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeAddTaskModal();
    });
  }

  // Exit submission
  if (closeButton) {
    closeButton.addEventListener('click', closeAddTaskModal);
  }

  // Mark as initialized
  _initialized = true;
};

// Show add task modal
function showAddTaskModal() {

  // Ensure modal is initialized
  if (!_dialogEl) _dialogEl = document.getElementById('addTaskDialog');
  if (!_dialogEl) return;
  if (typeof _dialogEl.showModal === 'function') {
    _dialogEl.showModal();
  } else {
    _dialogEl.setAttribute('open', '');
  }
};

// Show edit task modal
function showEditTaskModal(task, index) {
  _editingIndex = index;
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskDuedate').value = task.dueDate;
  document.getElementById('taskPriority').value = task.priority.toLowerCase();
  showAddTaskModal();
};

// Initialize task details modal
function initTaskDetailsModal() {

  // Cache elements
  _detailsDialogEl = document.getElementById('taskDetailsDialog');
  if (!_detailsDialogEl) return;
  const closeButton = document.getElementById('closeDetailsBtn');

  // Close the dialog
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      _detailsDialogEl.close();
    });
  }
};

export { 
  initAddTaskModal,
  showAddTaskModal,
  showEditTaskModal
};
