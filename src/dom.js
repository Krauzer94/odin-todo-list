// Internal private state
let _dialogEl = null;
let _formEl = null;
let _initialized = false;
let _editingIndex = null;

// Initialize modal handlers
function initAddTaskModal({ onSubmit } = {}) {

  // Cache elements
  _dialogEl = document.getElementById('addTaskDialog');
  _formEl = _dialogEl.querySelector('.add-task-form');

  // Reset when dialog closes
  _dialogEl.addEventListener('close', () => { _formEl.reset(); });

  // Basic validation
  if (!_dialogEl) return;
  if (!_formEl) return;
  if (_initialized) return;

  // Function to close the modal
  function closeAddTaskModal() {
    _editingIndex = null;
    _dialogEl.close();
    _formEl.reset();
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
    const task = {
      title,
      description,
      dueDate,
      priority,
      editingIndex: _editingIndex
    };

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

// Show the edit task modal
function showEditTaskModal(task, index) {

  // Locate element by index
  _editingIndex = index;

  // Get exsiting input
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDescription').value = task.description;
  document.getElementById('taskDuedate').value = task.dueDate;
  document.getElementById('taskPriority').value = task.priority.toLowerCase();

  // Display the modal
  showAddTaskModal();
};

export { 
  initAddTaskModal,
  showAddTaskModal,
  showEditTaskModal
};
