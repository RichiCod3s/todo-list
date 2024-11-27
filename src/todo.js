//create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
import { createElementWithClass } from "./utils"

export function createTodoItem(title, description){
let todoTitle = createElementWithClass("h3", "todoTitle", title);
let todoDescription = createElementWithClass("p", "todoDescription", description);

let todoItem = createElementWithClass("div", "todoItem");
todoItem.append(todoTitle,todoDescription);
return todoItem;
}