import "./style.css";
import { Task } from "../app/index.js";
import { format } from "date-fns";

function createUI() {
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  document.querySelector("#content").appendChild(taskList);
  // Hardcode a couple of tasks to start
  const date1 = format(new Date("2022/06/20"), "dd/MM/yyyy");
  const date2 = format(new Date("2022/07/25"), "dd/MM/yyyy");

  const task1 = Task("Task 1", "this is a test", date1, "high");
  const task2 = Task("Task 2", "this is another test", date2, "low");
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
