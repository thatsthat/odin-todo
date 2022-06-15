import "./style.css";
import { Task } from "../app/index.js";
import { format, differenceInDays } from "date-fns";

function createUI() {
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  document.querySelector("#content").appendChild(taskList);
  // Hardcode a couple of tasks to start
  const date1 = new Date(2022, 5, 20);
  const date2 = new Date(2022, 6, 25);

  const dif1 = differenceInDays(date1, new Date());
  const dif2 = differenceInDays(date2, new Date());

  const task1 = Task("Task 1", "this is a test", dif1, "high");
  const task2 = Task("Task 2", "this is another test", dif2, "low");
  // Plot them
  showTask(task1);
  showTask(task2);
}
export { createUI };

function showTask(taskPar) {
  const task = document.createElement("div");
  task.classList.add("task");
  task.textContent = `${taskPar.title}, ${taskPar.dueDate}`;
  document.querySelector("#taskList").appendChild(task);
}
