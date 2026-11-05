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
