import "./style.css";
import { Task } from "./../app/index.js";

function createUI() {
  const taskList = document.createElement("div");
  taskList.id = "taskList";
  document.querySelector("#content").appendChild(taskList);
  // Hardcode a couple of tasks to start
  const task1 = Task("Task 1", "this is a test", "tomorrow", "high");
  const task2 = Task("Task 2", "this is another test", "next friday", "low");
  // Plot them
  showTask(task1);
  showTask(task2);

  function showTask(taskPar) {
    const task = document.createElement("div");
    task.classList.add("task");
    task.textContent = taskPar.title;
    document.querySelector("#taskList").appendChild(task);
  }
}
export { createUI };
