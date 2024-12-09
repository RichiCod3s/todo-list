//create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
import { createElementWithClass } from "./utils"

export const todoList = [];


//add in ID Later
export class Todo{
    constructor(title,description, dueDate){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }
}

export function addTodo(todo){
    todoList.push(todo);
}




/*


export function createTodoItem(title, description){
let todoTitle = createElementWithClass("h3", "todoTitle", title);
let todoDescription = createElementWithClass("p", "todoDescription", description);

let todoItem = createElementWithClass("div", "todoItem");
todoItem.append(todoTitle,todoDescription);
return todoItem;
}
*/
