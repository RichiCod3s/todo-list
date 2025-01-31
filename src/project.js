export const projectList = [];

export class Project{
    constructor(name){
        this.name = name;
        this.projectFolder = [];
        this.id = this.name + Date.now();
    }
    
    addToProject(todo){
        this.projectFolder.push(todo);
    }


    deleteTodo(todo){
       const index = this.projectFolder.findIndex(t => t.id === todo.id);
       if(index !== -1){
        this.projectFolder.splice(index,1);
       }
    }

      // Display all todos in the project
      displayTodos() {
        return this.projectFolder 
    }
}

// project array
export function addProject(project){
    this.projectList.push(project);
}

