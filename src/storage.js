import { Project } from "./projects";
import { Task } from "./tasks.js";

const STORAGE_KEY = "odin_todo_projects_v1.0";

// Save projects array to localStorage
function saveStorage(projects) {
  try {
    const serializedData = JSON.stringify(projects);
    localStorage.setItem(STORAGE_KEY, serializedData);
  } catch {
    console.error("Failed to save to localStorage:", error);
  }
}

// Load existing projects from localStorage
function loadStorage() {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    if (!serializedData) return []; // If the storage is empty

    const rawProjects = JSON.parse(serializedData);

    // Load JSON objects back into Project and Task instances
    return rawProjects.map((projectData) => {
      const project = new Project(projectData.title);
      project.id = projectData.id;

      // Map saved tasks and bring them back to Task instances
      project.tasks = (projectData.tasks || []).map((taskData) => {
        const task = new Task(
          taskData.title,
          taskData.description,
          taskData.dueDate,
          taskData,
          priority,
        );
        task.isComplete = taskData.isComplete ?? false;
        return task;
      });

      return project;
    });
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
    return [];
  }
}

export { saveStorage, loadStorage };
