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
  const date1 = format(new Date(2022, 5, 20), "dd-MM-yyyy");
  const task1 = Task("Task 1", "this is a test", date1, "high");
  const date2 = format(new Date(2022, 6, 25), "dd-MM-yyyy");
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
  // Create a sub container with task name and due date
  const taskData = document.createElement("div");
  taskData.classList.add("taskData");
  const name = document.createElement("div");
  const date = document.createElement("div");
  name.textContent = taskPar.title;
  date.textContent = taskPar.dueDate;

  // Create form to create/edit title and date
  const editName = document.createElement("input");
  editName.type = "text";
  editName.classList.add("editElem");
  editName.placeholder = "Title";
  // Add listener to store value into task object

  const editDate = document.createElement("input");
  editDate.classList.add("editElem");
  editDate.type = "date";

  const viewElems = document.createElement("div");
  viewElems.append(name, date);
  const editElems = document.createElement("div");

  // If it's a new task show edit fields, otherwise show title/date
  if (taskPar.length === 0) {
    viewElems.classList.add("hidden");
    editElems.classList.add("visible");
  } else {
    viewElems.classList.add("visible");
    editElems.classList.add("hidden");
  }

  editElems.append(editName, editDate);
  taskData.append(viewElems, editElems);

  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("mdi", "mdi-radiobox-blank");

  // Insert everything into task container;
  task.append(checkButton, taskData);

  // Add a click event listener to the main task div container
  task.addEventListener("click", (event) => {
    const hiddenElem = event.currentTarget.querySelector(".hidden");
    const visibleElem = event.currentTarget.querySelector(".visible");
    visibleElem.classList.add("hidden");
    visibleElem.classList.remove("visible");
    hiddenElem.classList.add("visible");
    hiddenElem.classList.remove("hidden");
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
    renderTask();
  });
}
