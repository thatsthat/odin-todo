import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import { Task } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function createUI() {
  // Insert new task button at the top
  drawNewTaskButton();
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  document.querySelector("#content").appendChild(taskList);
  // Hardcode a couple of tasks to start
  const date1 = format(new Date(2022, 5, 20), "dd-MM-yyyy");
  const date2 = format(new Date(2022, 6, 25), "dd-MM-yyyy");

  const dif1 = differenceInDays(date1, new Date());
  const dif2 = differenceInDays(date2, new Date());

  const task1 = Task("Task 1", "this is a test", date1, "high");
  const task2 = Task("Task 2", "this is another test", date2, "low");
  // Plot them
  renderTask(task2);
  renderTask(task1);
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
  editName.placeholder = "Title";
  //const editDate = document.createElement("div");
  //const editDateIcon = document.createElement("span");
  //editDateIcon.classList.add("mdi", "mdi-calendar");
  const editDate = document.createElement("input");
  editDate.type = "date";
  //editDate.append(editDateIcon, editDateInput);
  taskData.append(name, date, editName, editDate);
  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("mdi", "mdi-radiobox-blank");
  // If it's a new task show edit fields, otherwise show title/date
  if (taskPar.length === 0) {
    name.classList.add("hidden");
    date.classList.add("hidden");
  } else {
    editName.classList.add("hidden");
    editDate.classList.add("hidden");
  }
  // Insert everything into task container
  task.append(checkButton, taskData);

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
