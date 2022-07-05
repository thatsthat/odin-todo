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
    // Insert the task at the beginning of the array
    tasks.unshift(task);
  };

  const rmTask = (taskInd) => {
    tasks.splice(taskInd, 1);
  };

  const addProject = (projName) => {
    projects.push(projName);
  };

  return {
    addTask,
    rmTask,
    addProject,
    tasks,
    projects,
  };
})();

export { taskList };
