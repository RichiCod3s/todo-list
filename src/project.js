export const projectList = [];

export class Project{
    constructor(name){
        this.name = name;
        this.projectFolder = new Map();
        this.id = this.name + Date.now();
    }
    
    addToProject(todo){
        this.projectFolder.set(todo.id, todo);
    }

    getTodo(todo){
    return this.projectFolder.get(todo.id);
    }

    deleteTodo(todo){
        this.projectFolder.delete(todo.id);
    }

      // Display all todos in the project
      displayTodos() {
        return Array.from(this.projectFolder.values()); // Convert Map values to an array
    }
}

// project array
export function addProject(project){
    this.projectList.push(project);
}

