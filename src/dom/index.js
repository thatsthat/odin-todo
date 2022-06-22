import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import { Task } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function createUI() {
  // Insert new task button at the top
  drawNewTaskButton();
  // Create tasks list view
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  document.querySelector("#content").appendChild(taskList);

  // Hardcode a couple of tasks to start
  const date1 = format(new Date(2022, 5, 20), "yyyy-MM-dd");
  const task1 = Task("Task 1", "this is a test", date1, "high");
  const date2 = format(new Date(2022, 6, 25), "yyyy-MM-dd");
  const task2 = Task("Task 2", "this is another test", date2, "low");
  // Array containing all tasks
  const tasks = [task1, task2];
  // Plot all the tasks in the array
  for (let ind in tasks) renderTask(tasks[tasks.length - ind - 1]);
}
export { createUI };

function renderTask(taskPar = []) {
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
  if (taskPar.title.length === 0) {
    viewElems.classList.add("hidden");
  } else {
    editElems.classList.add("hidden");
  }

  editElems.append(editName, editDate);
  taskData.append(viewElems, editElems);

  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("mdi", "mdi-radiobox-blank");

  // Insert everything into task container;
  task.append(checkButton, taskData);

  // Add a focus event listener to the main task div container
  task.addEventListener("focusin", (event) => {
    event.currentTarget.querySelector(".viewElems").classList.add("hidden");
    event.currentTarget.querySelector(".editElems").classList.remove("hidden");
  });

  task.addEventListener("focusout", (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      event.currentTarget.querySelector(".editElems").classList.add("hidden");
      event.currentTarget
        .querySelector(".viewElems")
        .classList.remove("hidden");
    }
  });

  // Add the task at the top of the stack
  document.querySelector("#taskList").prepend(task);
}

function drawNewTaskButton() {
  const button = document.createElement("div");
  button.classList.add("newTaskButton", "task");
  const icon = document.createElement("span");
  icon.classList.add("mdi", "mdi-checkbox-marked-circle-plus-outline");
  const text = document.createElement("div");
  text.textContent = "Add a task";
  text.classList.add("newTaskButtonText");
  button.append(icon, text);
  document.querySelector("#content").append(button);
  // Add listener
  button.addEventListener("click", (event) => {
    const emptyTask = Task("", "", "", "");
    renderTask(emptyTask);
  });
}
