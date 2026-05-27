// Internal private state
let _dialogEl = null;
let _formEl = null;
let _initialized = false;

// Initialize modal handlers
function initAddTaskModal({ onSubmit } = {}) {

  // Cache elements
  _dialogEl = document.getElementById('addTaskDialog');
  _formEl = _dialogEl.querySelector('.add-task-form');

  // Reset when dialog closes
  _dialogEl.addEventListener('close', () => {
    if (_formEl) {
      _formEl.reset();
    }
  });

  // Basic validation
  if (!_dialogEl) return;
  if (!_formEl) return;
  if (_initialized) return;

  // Function to close the modal
  function closeAddTaskModal() {
    if (!_dialogEl) _dialogEl = document.getElementById('addTaskDialog');
    if (!_formEl && _dialogEl) _formEl = _dialogEl.querySelector('.add-task-form');
    if (!_dialogEl) return;

    // Close the dialog
    if (typeof _dialogEl.close === 'function') {
      _dialogEl.close();
    } else {
      _dialogEl.removeAttribute('open');
    }

    // Reset form fields
    if (_formEl) {
      _formEl.reset();
    }
  }

  // Handle form submission
  _formEl.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    // Get user input
    const title = document.getElementById('taskTitle').value.trim();
    const description = document.getElementById('taskDescription').value.trim();
    const dueDate = document.getElementById('taskDuedate').value;
    const priority = document.getElementById('taskPriority').value;

    // Validate input
    if (!title || !priority) {
      alert('Please provide the required fields.');
      return;
    }

    // Add new task to project
    const task = { title, description, dueDate, priority };

    // Invoke callback if provided
    if (typeof onSubmit === 'function') {
      onSubmit(task);
    }

    // Close after submission
    closeAddTaskModal();

  });

  // Handle cancel and close buttons
  const cancelButton = document.getElementById('cancelBtn');
  const closeButton = document.getElementById('closeModalBtn');

  // Close button without submitting
  if (cancelButton) {
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      closeAddTaskModal();
    });
  }

  // Exit button without submitting
  if (closeButton) {
    closeButton.addEventListener('click', closeAddTaskModal);
  }

  // Mark as initialized
  _initialized = true;
};

// Show the add task modal
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

export { initAddTaskModal, showAddTaskModal };
