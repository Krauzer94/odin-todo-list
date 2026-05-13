function getMainElement() {
  return document.getElementById('content');
};

// Load placeholder tasks
function loadCreatedTasks() {

  // Project specific title
  const projetTitle = document.createElement("h2");
  projetTitle.textContent = "Newly Created";
  getMainElement().appendChild(projetTitle);

  // Tasks list items
  const tasksList = document.createElement("ul");
  const tasksListItems1 = document.createElement("li");
  tasksListItems1.textContent = "Project Task #1";
  const tasksListItems2 = document.createElement("li");
  tasksListItems2.textContent = "Project Task #2";

  // Add created items
  tasksList.appendChild(tasksListItems1);
  tasksList.appendChild(tasksListItems2);
  getMainElement().appendChild(tasksList);

};

export { loadCreatedTasks };
