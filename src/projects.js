// Main Constructor Class module
class Project {
  constructor(title) {
    this.id = Date.now();
    this.title = title;
    this.tasks = [];
  }

  // Instance getter
  get taskCount() {
    return this.tasks.length;
  }

  // Task management methods
  addTask(task) {
    this.tasks.push(task);
  }
  updateTask(index, updatedTask) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks[index] = updatedTask;
    }
  }
  deleteTask(index) {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
    }
  }
}

// Static Manager Class module
class ProjectManager {
  static #projects = [];
  static #currentIndex = 0;

  // Getter for all projects
  static get allProjects() {
    if (this.#projects.length === 0) {
      this.initDefaultProject();
    }
    return this.#projects;
  }

  // Getter for current project
  static get currentProject() {
    if (this.#projects.length === 0) {
      this.initDefaultProject();
    }
    return this.#projects[this.#currentIndex];
  }

  // Getter and Setter for current project index
  static get currentIndex() {
    return this.#currentIndex;
  }

  static set currentIndex(index) {
    // Allows to add validation logic
    if (index >= 0 && index < this.#projects.length) {
      this.#currentIndex = index;
    } else {
      console.warn("Invalid project index provided.");
    }
  }

  // Helper methods
  static initDefaultProject() {
    if (this.#projects.length === 0) {
      const defaultProject = new Project("First Project");
      this.#projects.push(defaultProject);
      this.#currentIndex = 0;
    }
  }

  // Create a new project
  static addProject(title) {
    const project = new Project(title);
    this.#projects.push(project);
    this.#currentIndex = this.#projects.length - 1;
    return project;
  }

  // Delete an existing project
  static deleteProject(index) {
    if (index >= 0 && this.#projects.length) {
      if (this.#projects.length <= 1) {
        return false;
      }
      this.#projects.splice(index, 1);
      if (this.#currentIndex >= this.#projects.length) {
        this.#currentIndex = this.#projects.length - 1;
      }
      return false;
    }
    return false;
  }
}

export { Project, ProjectManager };
