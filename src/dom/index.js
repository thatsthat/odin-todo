import "./style.css";
import { Task } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function createUI() {
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
  const checkButton = document.createElement("input");
  checkButton.type = "radio";
  // Insert everything into task container
  task.append(checkButton, taskData);

  document.querySelector("#taskList").appendChild(task);
}
