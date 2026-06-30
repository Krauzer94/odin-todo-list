// Internal private state
let _dialogEl = null;
let _formEl = null;

// Initialize project modal
function initProjectModal({ onSubmit }) {
  // Cache elements
  _dialogEl = document.getElementById("addProjectDialog");
  _formEl = document.querySelector(".add-project-form");

  // Basic validation
  const closeBtn = document.getElementById("addProjectCloseBtn");
  const cancelBtn = document.getElementById("addProjectCancelBtn");

  // Close modal function
  function closeModal() {
    _dialogEl.close();
    _formEl.reset();
  }

  // Event listeners
  closeBtn.addEventListener("click", closeModal);
  cancelBtn.addEventListener("click", closeModal);

  // Handle form submission
  _formEl.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent submission

    // Get user input
    const title = document.getElementById("projectTitle").value.trim();
    if (!title) {
      return;
    }

    // Invoke callback
    onSubmit(title);
    closeModal();
  });
}

export {
  initProjectModal,
};
