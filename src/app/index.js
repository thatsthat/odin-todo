// Task factory function
const Task = (title, details, dueDate, priority, project) => {
  return { title, details, dueDate, priority, project };
};

const taskList = (() => {
  // Initialize tasks and projects array
  const tasks = [];
  const projects = [];
  // Default active project is the first one on projects array
  let activeProjectInd = [];

  const setActProjInd = (ind) => {
    activeProjectInd = ind;
  };

  const getActProjInd = (ind) => {
    return activeProjectInd;
  };

  const addTask = (
    title,
    details,
    dueDate,
    priority = 1,
    project = projects[activeProjectInd]
  ) => {
    const task = Task(title, details, dueDate, priority, project);
    // Insert the task at the beginning of the array
    tasks.unshift(task);
  };

  const rmTask = (taskInd) => {
    tasks.splice(taskInd, 1);
  };

  const addProject = (projName) => {
    projects.push(projName);
    // Set the new project as the active project
    setActProjInd(activeProjectInd + 1);
  };

  const getAllTasks = () => {
    return tasks;
  };

  const getProjTasks = () => {
    // Filter tasks by project
    return tasks.filter((task) => task.project == projects[activeProjectInd]);
  };

  return {
    addTask,
    rmTask,
    addProject,
    getAllTasks,
    getProjTasks,
    setActProjInd,
    getActProjInd,
    tasks,
    projects,
    activeProjectInd,
  };
})();

export { taskList };
