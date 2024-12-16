export const projectList = [];

export class Project{
    constructor(name){
        this.name = name;
        this.projectFolder = [];
        this.id = this.name + Date.now();
    }
    //holds todos
    addToProject(todo){
        this.projectFolder.push(todo);
    }
}

// project array
export function addProject(project){
    this.projectList.push(project);
}

