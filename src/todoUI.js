//DOM Related Module
import { todoList } from "./todo";
import { createTodoItem } from "./todo";
import { addTodo } from "./todo";
//6. todo card to populate the ".todo-container" (look back at library app)

const todoContainer = document.querySelector(".todo-container");

export function displayTodo(){
    todoContainer.innerHTML ="";

    for(let i =0; i< todoList.length; i++){
        todoContainer.append(todoList[i]);
    }
}

//modal click
const createTaskButton = document.querySelector("#addTaskButton");
const modal = document.querySelector("#modal");
const taskSubmitButton = document.querySelector("#task-submit-button");

export function setUpModal(){
    createTaskButton.addEventListener('click', () => {
        modal.showModal();
    })
}


//5. connect modal with task object - task to show in todo-container
const taskTitle = document.querySelector("#title");
const taskDescription = document.querySelector("#task-description");

// create ne todoItem when submit button clicked
taskSubmitButton.addEventListener('click', () => {
     let title = taskTitle.value;
     let description = taskDescription.value;
   let todoItem = createTodoItem(title, description);
    console.log(todoItem);
    
    addTodo(todoItem);
    displayTodo();
    // clear form text fields
    taskTitle.value = "";
    taskDescription.value ="";
})

