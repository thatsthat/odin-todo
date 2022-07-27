// Task factory function
const Task = (title, details, dueDate, priority, project) => {
  return { title, details, dueDate, priority, project };
};

const taskList = (() => {
  // Initialize tasks and projects array
  let tasks = [];
  let projects = [];
  let activeProjectInd = 0;

  /*   localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("tasks", JSON.stringify(tasks)); */

  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  let storedProjs = localStorage.getItem("projects");
  if (storedProjs) {
    projects = JSON.parse(storedProjs);
  }

  let storedProjInd = localStorage.getItem("actProjInd");
  if (storedProjInd) {
    activeProjectInd = parseInt(storedProjInd);
  }

  const setActProjInd = (ind) => {
    activeProjectInd = ind;
    localStorage.setItem("actProjInd", activeProjectInd);
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
    tasks[projInd].unshift(task);
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("actProjInd", projInd);
  };

  const rmTask = (taskInd) => {
    tasks[activeProjectInd].splice(taskInd, 1);
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const setTaskPrio = (taskInd, prio) => {
    tasks[activeProjectInd][taskInd].priority = prio;
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const setTaskTitle = (taskInd, title) => {
    tasks[activeProjectInd][taskInd].title = title;
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const setTaskDate = (taskInd, date) => {
    tasks[activeProjectInd][taskInd].dueDate = date;
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const setTaskDetails = (taskInd, details) => {
    tasks[activeProjectInd][taskInd].details = details;
    // store all tasks in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addProject = (projName) => {
    projects.push(projName);
    // Set the new project as the active project
    setActProjInd(projects.length - 1);
    // Add a new empty array inside tasks 2d array corresponding to the new project
    tasks.push([]);
    // store all tasks and projects in local storage
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getActProjTasks = () => {
    // Filter tasks by project
    return tasks[activeProjectInd];
    //return tasks.filter((task) => task.project == projects[activeProjectInd]);
  };

  return {
    addTask,
    setTaskPrio,
    setTaskTitle,
    setTaskDate,
    setTaskDetails,
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
