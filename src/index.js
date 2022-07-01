import { app } from "./app/index.js";
import { renderUI } from "./dom/index.js";

const content = document.createElement("div");
content.id = "content";
document.body.append(content);
renderUI();
