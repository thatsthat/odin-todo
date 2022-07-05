import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import { taskList } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function renderUI() {
  // Create a couple of tasks to start
  const date2 = format(new Date(2022, 6, 25), "yyyy-MM-dd");
  taskList.addTask("Task 2", date2, "Project 2");

  const date1 = format(new Date(2022, 5, 20), "yyyy-MM-dd");
  taskList.addTask("Task 1", date1, "Project 1");

  // Create two projects
  taskList.addProject("Project 1");
  taskList.addProject("Project 2");

  // Insert project menu button
  drawProjectMenuButton(taskList.projects);

  // Insert new task button at the top
  drawNewTaskButton();

  // Create tasks list view
  const taskListDiv = document.createElement("div");
  taskListDiv.id = "taskList";
  document.querySelector("#content").appendChild(taskListDiv);

  renderAllTasks();
}
export { renderUI };

function renderAllTasks(proj = "") {
  // Delete all existing tasks on the UI if present
  const existingTasks = document.querySelectorAll(".task");
  if (existingTasks) {
    existingTasks.forEach((task) => {
      task.remove();
    });
  }
  // Plot all the tasks in the array
  for (let ind in taskList.tasks) renderTask(taskList.tasks[ind]);
}

function renderTask(taskPar) {
  // Create task container
  const task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("tabindex", "0"); // Make it focusable
  // Create a sub container with task name and due date
  const taskData = document.createElement("div");
  taskData.classList.add("taskData");
  const name = document.createElement("div");
  const date = document.createElement("div");
  name.textContent = taskPar.title;
  date.textContent = format(new Date(taskPar.dueDate), "dd-MM-yyyy");

  // Create form to create/edit title and date
  const editName = document.createElement("input");
  editName.type = "text";
  editName.placeholder = "Title";
  editName.value = taskPar.title;

  // Add listener to store value into task object
  editName.addEventListener("change", (event) => {
    taskPar.title = event.target.value;
    name.textContent = taskPar.title;
  });

  const editDate = document.createElement("input");
  editDate.type = "date";
  editDate.value = taskPar.dueDate;

  // Add listener to store value into task object
  editDate.addEventListener("change", (event) => {
    taskPar.dueDate = event.target.value;
    date.textContent = format(new Date(taskPar.dueDate), "dd-MM-yyyy");
  });

  const viewElems = document.createElement("div");
  viewElems.classList.add("viewElems");
  viewElems.append(name, date);

  const editElems = document.createElement("div");
  editElems.classList.add("editElems");

  // If it's a new task show edit fields, otherwise show title/date
  if (taskPar.title.length === 0) viewElems.classList.add("hidden");
  else editElems.classList.add("hidden");

  editElems.append(editName, editDate);
  taskData.append(viewElems, editElems);

  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("checkButton", "mdi", "mdi-radiobox-blank");

  checkButton.addEventListener("click", (event) => {
    event.target.classList.remove("mdi-radiobox-blank");
    event.target.classList.add("mdi-radiobox-marked");
    const task = event.target.parentElement;
    const ind = [...task.parentNode.children].indexOf(task);
    taskList.rmTask(ind);
    renderAllTasks();
  });

  checkButton.addEventListener("mouseover", (event) => {
    event.target.classList.remove("mdi-radiobox-blank");
    event.target.classList.add("mdi-checkbox-marked-circle-outline");
  });

  checkButton.addEventListener("mouseout", (event) => {
    event.target.classList.remove("mdi-checkbox-marked-circle-outline");
    event.target.classList.add("mdi-radiobox-blank");
  });

  // Insert everything into task container;
  task.append(checkButton, taskData);

  // When clicking on a task (focus in) show edit fields, hide view fields
  // and put the cursor into the name edit field
  task.addEventListener("focusin", (event) => {
    event.currentTarget.querySelector(".viewElems").classList.add("hidden");
    event.currentTarget.querySelector(".editElems").classList.remove("hidden");
    event.currentTarget.querySelector(".editElems").firstChild.focus();
  });

  // When a task is 'expanded' close it if a click is detected outside
  task.addEventListener("focusout", (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      event.currentTarget.querySelector(".editElems").classList.add("hidden");
      event.currentTarget
        .querySelector(".viewElems")
        .classList.remove("hidden");
    }
  });
  // Close the edit dialog when 'Enter' is pressed
  task.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) document.activeElement.blur();
  });

  // Add the task at the top of the stack
  document.querySelector("#taskList").append(task);
  if (taskPar.title.length === 0)
    document
      .querySelector("#taskList")
      .firstChild.querySelector(".editElems")
      .firstChild.focus();
}

function drawNewTaskButton() {
  const button = document.createElement("div");
  button.classList.add("newTaskButton");
  const icon = document.createElement("span");
  icon.classList.add("mdi", "mdi-checkbox-marked-circle-plus-outline");
  const text = document.createElement("div");
  text.textContent = "Add a task";
  text.classList.add("newTaskButtonText");
  button.append(icon, text);
  document.querySelector("#content").append(button);
  // Add listener
  button.addEventListener("click", (event) => {
    const date1 = format(new Date(), "yyyy-MM-dd");
    taskList.addTask("", date1, "Project 1");
    renderAllTasks();
  });
}

function drawProjectMenuButton(projList) {
  // Draw the button to opens dropdown menu
  const button = document.createElement("div");
  button.classList.add("projectButton");
  const icon = document.createElement("span");
  icon.classList.add("mdi", "mdi-chevron-down");
  const text = document.createElement("div");
  text.textContent = "Project";
  text.classList.add("projectButtonText");
  button.append(text, icon);

  // Click on the button to show/hide dropdown menu
  button.addEventListener("click", (event) => {
    document.querySelector(".projectsDropdown").classList.toggle("show");
  });

  // Draw the list of projects
  const projects = document.createElement("div");
  projects.classList.add("projectsDropdown");
  for (let i in projList) {
    const project = document.createElement("div");
    project.textContent = projList[i];
    projects.append(project);
  }

  // When dropdown is open, close it if a click is detected outside
  window.onclick = function (e) {
    const button = document.querySelector(".projectButton");
    if (!(e.target.matches(".projectButton") || button.contains(e.target))) {
      var myDropdown = document.querySelector(".projectsDropdown");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  };
  document.querySelector("#content").append(button, projects);
}
