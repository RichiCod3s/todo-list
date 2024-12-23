export const projectList = [];

export class Project{
    constructor(name){
        this.name = name;
        this.projectFolder = new Map();
        this.id = this.name + Date.now();
    }
    //holds todos -- consider making this a hashmap/map
    addToProject(todo){
        this.projectFolder.set(todo.id, todo);
    }

    getTodo(todo){
    this.projectFolder.get(todo.id);
    }

    deleteTodo(todo){
        this.projectFolder.delete(todo.id);
    }
}

// project array
export function addProject(project){
    this.projectList.push(project);
}

