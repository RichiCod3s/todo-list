//DOM Related Module
import { todoList } from "./todo";
import { addTodo } from "./todo";
import { Todo } from "./todo";
import { createElementWithClass } from "./utils";

//6. DOM Elements
const todoContainer = document.querySelector(".todo-container");
const createTaskButton = document.querySelector("#addTaskButton");
const modal = document.querySelector("#modal");
const taskSubmitButton = document.querySelector("#task-submit-button");
const taskTitle = document.querySelector("#title");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#datepicker");
const taskPriority = document.querySelector("#priority");


// show modal when addTaskbtn clicked
export function setUpModal() {
    createTaskButton.addEventListener('click', () => {
        modal.showModal();
    })
}


// create a Todo object using modal
taskSubmitButton.addEventListener('click', () => {
    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let priority = taskPriority.value;
    const newTodo = new Todo(title, description, dueDate, priority);
    addTodo(newTodo);
    console.log(newTodo);
    displayTodos();
    // clear form text fields
    taskTitle.value = "";
    taskDescription.value = "";
})

//ADD A DATA ATRIBUTE/ID TO THE ELEMENT SO YOU CAN DELETE - CHECK LIBRARY APP
// renders Todo object into DOM element
function renderTodoItem(todo) {
    let todoTitle = createElementWithClass("h3", "todoTitle", todo.title);
    let todoDescription = createElementWithClass("p", "todoDescription", todo.description);
    let todoDueDate = createElementWithClass("p", "todoDueDate", todo.dueDate);   // works - make more readable (date-fns)
    let todoPriority = createElementWithClass("p", "todoPriority", todo.priority);
    let todoItem = createElementWithClass("div", "todoItem");
    todoItem.append(todoTitle, todoDescription, todoDueDate, todoPriority);
    return todoItem;
}

//display the Todos to container
export function displayTodos() {
    todoContainer.innerHTML = "";
    todoList.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    })
}
