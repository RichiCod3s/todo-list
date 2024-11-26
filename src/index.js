
import "./styles.css";
import { greeting } from "./greeting.js";


console.log(greeting);


//1. make a layout - html/grid
//2.remember SOLID Principles - seperate appliation logic from DOM related stuff
//3. create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
//4. create modal as a way to populate new task
//5. connect modal with task object - task to show in todo-container

//6. work on projects and to-do functionality 


//modal click
const createTaskButton = document.querySelector("#addTaskButton");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-button");

createTaskButton.addEventListener('click', () => {
    modal.showModal();
})

 closeModal.addEventListener('click', () => {
    modal.close();
})

//5. connect modal with task object - task to show in todo-container