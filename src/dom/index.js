import "./style.css";
import "@mdi/font/css/materialdesignicons.css";
import { Task } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function createUI() {
  // Insert new task butto at the top
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
  showTask(task1);
  showTask(task2);
}
export { createUI };

function showTask(taskPar) {
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
  taskData.append(name, date);
  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("mdi", "mdi-radiobox-blank");
  // Insert everything into task container
  task.append(checkButton, taskData);

  document.querySelector("#taskList").appendChild(task);
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
}

function createTaskInputForm() {
  const newTaskForm = document.createElement("div");
  newTaskForm.classList.add("newTaskForm");
  // Create a sub container with task name and due date
  const formData = document.createElement("div");
  formData.classList.add("taskData");
  const name = document.createElement("div");
  const date = document.createElement("div");
  name.textContent = taskPar.title;
  date.textContent = taskPar.dueDate;
  formData.append(name, date);
  // Create check button (radio input button)
  const checkButton = document.createElement("span");
  checkButton.classList.add("mdi", "mdi-radiobox-blank");
  // Insert everything into task container
  newTaskForm.append(checkButton, formData);
}
