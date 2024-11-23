//create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist
import { createElementWithClass } from "./utils"

export function todoItem(title, description){
let todoTitle = createElementWithClass("h3", "todoTitle", title);
let todoDescription = createElementWithClass("p", "todoDescription", description);

let todoItem = createElementWithClass("div", "todoItem");
todoItem.append(todoItem,todoDescription);
return todoItem;
}