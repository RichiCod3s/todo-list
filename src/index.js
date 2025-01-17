
import "./todoUI.js";
import "./styles.css";
import { greeting } from "./greeting.js";
import { prebuiltProject } from "./todoUI.js";
console.log(greeting);

//1. make a layout - html/grid *
//2.remember SOLID Principles - seperate appliation logic from DOM related stuff *
//3. create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist 
//4. create modal as a way to populate new task *
//5. connect modal with task object - task to show in todo-container *
//6. toDo card to populate the ".todo-container" *
//7. work on styling of todo card & modal - layout and background
//8. work on projects and to-do functionality 


// work on projects: add project option to todos - todo will display when project div is clicked on

// continue next: added hashmap to hold todos in project. Use this to add/delete -- add button functionality that will enable editing of todo

prebuiltProject();