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

  set title(newTitle){
    if(typeof newTitle === "string" && newTitle.length > 0){
        this._title = newTitle;
    } else{
        console.error("Title must be a non empty String");
    }
  }

  get title(){
    return this._title;
  }

  set description(newDescription){
    if(typeof newDescription === "string"){
        this._description = newDescription;
    }else{
        console.error("Description must be a string");
    }
  }
}

export function addTodo(todo){
    todoList.push(todo);
}



