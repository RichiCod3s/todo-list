//create TO-DO object/function - title, description, due-date (date-fns), priority, notes, checklist

export const todoList = [];


//add in ID Later
export class Todo{
    constructor(title, description, dueDate, priority){
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

  

}

export function addTodo(todo){
    todoList.push(todo);
}



