
import "./styles.css";
import { greeting } from "./greeting.js";


console.log(greeting);


//1. make a layout - html/grid
//2.remember SOLID Principles - seperate appliation logic from DOM related stuff
//3. create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
//4. Create modal as a way to populate new task
//5. work on projects and to-do functionality 

let createTaskButton = document.getElementById("createTaskButton");
//modal when button is clicked