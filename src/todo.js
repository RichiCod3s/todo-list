//create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
import { createElementWithClass } from "./utils"

export const todoList = [];

export function createTodoItem(title, description){
let todoTitle = createElementWithClass("h3", "todoTitle", title);
let todoDescription = createElementWithClass("p", "todoDescription", description);

let todoItem = createElementWithClass("div", "todoItem");
todoItem.append(todoTitle,todoDescription);
return todoItem;
}

export function addTodo(todo){
    let index = todoList.length;
    todoList[index]= todo;
}

