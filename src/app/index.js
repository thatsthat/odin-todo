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
    projInd = activeProjectInd
  ) => {
    const task = Task(title, details, dueDate, priority, projects[projInd]);
    // Insert the task at the beginning of the array
    console.log(tasks, projInd);
    tasks[projInd].unshift(task);
  };

  const rmTask = (taskInd) => {
    tasks[activeProjectInd].splice(taskInd, 1);
  };

  const editTask = (ind) => {
    return activeProjectInd;
  };

  const addProject = (projName) => {
    projects.push(projName);
    // Set the new project as the active project
    setActProjInd(activeProjectInd + 1);
    // Add a new empty array inside tasks 2d array corresponding to the new project
    tasks.push([]);
  };

  const getActProjTasks = () => {
    // Filter tasks by project
    return tasks[activeProjectInd];
    //return tasks.filter((task) => task.project == projects[activeProjectInd]);
  };

  return {
    addTask,
    rmTask,
    addProject,
    getActProjTasks,
    setActProjInd,
    getActProjInd,
    tasks,
    projects,
    activeProjectInd,
  };
})();

export { taskList };
