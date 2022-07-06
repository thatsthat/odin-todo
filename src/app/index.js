// Task factory function
const Task = (title, dueDate, project) => {
  return { title, dueDate, project };
};

const taskList = (() => {
  // Initialize tasks and projects array
  const tasks = [];
  const projects = [];
  // Default active project is the first one on projects array
  const activeProjectInd = 0;

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

  const getAllTasks = () => {
    return tasks;
  };

  const getProjTasks = (projectInd) => {
    // Filter tasks by project
    return tasks.filter((task) => task.project == projects[projectInd]);
  };

  return {
    addTask,
    rmTask,
    addProject,
    getAllTasks,
    getProjTasks,
    tasks,
    projects,
  };
})();

export { taskList };
