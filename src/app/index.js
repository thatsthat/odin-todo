// Task factory function
const Task = (title, dueDate, project) => {
  return { title, dueDate, project };
};

const taskList = (() => {
  // Initialize tasks and projects array
  const tasks = [];
  const projects = [];

  const addTask = (title, dueDate, project) => {
    const task = Task(title, dueDate, project);
    tasks.push(task);
  };

  const addProject = (projName) => {
    projects.push(projName);
  };

  return {
    addTask,
    addProject,
    tasks,
    projects,
  };
})();

export { taskList };
