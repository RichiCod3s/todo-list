
import "./styles.css";
import { greeting } from "./greeting.js";
import { createTodoItem } from "./todo.js";
import { addTodo } from "./todo.js";
import { displayTodo } from "./todoUI.js";
import { setUpModal } from "./todoUI.js";
console.log(greeting);

//1. make a layout - html/grid
//2.remember SOLID Principles - seperate appliation logic from DOM related stuff
//3. create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
//4. create modal as a way to populate new task
//5. connect modal with task object - task to show in todo-container
//6. toDo card to populate the ".todo-container"
//7. work on projects and to-do functionality 
//8. work on styling of modal - layout and background

//modal click
setUpModal();