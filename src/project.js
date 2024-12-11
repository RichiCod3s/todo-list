

export class Project{
    constructor(name){
        this.name = name;
        this.projectFolder = [];
    }

    addTodo(todo){
        this.projectFolder.push(todo);
    }
}