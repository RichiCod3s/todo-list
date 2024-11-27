
import "./styles.css";
import { greeting } from "./greeting.js";
import { createTodoItem } from "./todo.js";


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
const createTaskButton = document.querySelector("#addTaskButton");
const modal = document.querySelector("#modal");
const taskSubmitButton = document.querySelector("#task-submit-button");

createTaskButton.addEventListener('click', () => {
    modal.showModal();
})


//5. connect modal with task object - task to show in todo-container
const taskTitle = document.querySelector("#title");
const taskDescription = document.querySelector("#task-description");

// create todoItem
taskSubmitButton.addEventListener('click', () => {
     let title = taskTitle.value;
     let description = taskDescription.value;
   let item = createTodoItem(title, description);
    console.log(item);

    // clear form text fields
    taskTitle.value = "";
    taskDescription.value ="";
})



//6. toDo card to populate the ".todo-container" (look back at library app)

