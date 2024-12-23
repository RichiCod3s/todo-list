//DOM Related Module
import { Project } from "./project";
import { projectList } from "./project";
import { addTodo } from "./todo";
import { Todo } from "./todo";
import { todoList } from "./todo";
import { createElementWithClass } from "./utils";

//6. DOM Elements
const todoContainer = document.querySelector(".todo-container");
const createTaskButton = document.querySelector("#addTaskButton");
const createProjectButton = document.querySelector("#addProjectButton");
const modal = document.querySelector("#modal");
const taskSubmitButton = document.querySelector("#task-submit-button");
const taskTitle = document.querySelector("#title");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#datepicker");
const taskPriority = document.querySelector("#priority");
const taskProjectDropdown = document.querySelector("#projects-dropdown");

const projectSidebar = document.querySelector(".projects-sidebar");
const projectTitles = document.querySelector(".project-titles");


// show modal when addTaskbtn clicked

    createTaskButton.addEventListener('click', () => {
        modal.showModal();
    })



// create a Todo object using modal
taskSubmitButton.addEventListener('click', () => {
    let title = taskTitle.value;
    let description = taskDescription.value;
    let dueDate = taskDueDate.value;
    let priority = taskPriority.value;
    let project = taskProjectDropdown.value; // add to the project hashmap
    const newTodo = new Todo(title, description, dueDate, priority);
    addTodo(newTodo);
    console.log(newTodo);
    displayTodos();
    // clear form text fields
    taskTitle.value = "";
    taskDescription.value = "";
})

//ADD A DATA ATRIBUTE/ID TO THE ELEMENT SO YOU CAN DELETE - CHECK LIBRARY APP
// renders Todo object into DOM element
function renderTodoItem(todo) {
    let todoTitle = createElementWithClass("h3", "todoTitle", todo.title);
    let todoDescription = createElementWithClass("p", "todoDescription", todo.description);
    let todoDueDate = createElementWithClass("p", "todoDueDate", todo.dueDate);   // works - make more readable (date-fns)
    let todoPriority = createElementWithClass("p", "todoPriority", todo.priority);
    let todoItem = createElementWithClass("div", "todoItem");
    todoItem.append(todoTitle, todoDescription, todoDueDate, todoPriority);
    return todoItem;
}

//display the Todos to container
export function displayTodos() {
    todoContainer.innerHTML = "";
    todoList.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    })
}

// PROJECTS

//user add a project functionality 
createProjectButton.addEventListener('click', () =>{
    //create textbox and append to DOM
    if(!document.querySelector('.projectTextbox')){
    let projectTextbox = createElementWithClass("INPUT","projectTextbox");
    projectTextbox.setAttribute("type", "text");
    projectTextbox.setAttribute("placeholder", "Type project name and press 'Enter'");

    //append to sidebar
    projectSidebar.append(projectTextbox);
    

    //listen for enter key and add the project
    projectTextbox.addEventListener('keydown', (e) => {
        if(e.key === "Enter"){
            console.log("enter pressed");// remove later
            let projectName = projectTextbox.value;
            const newProject = new Project(projectName);
            //add project to array
            projectList.push(newProject);

            displayProjectSection();

           
            //clear and remove textbox from sidebar
            projectTextbox.value="";
            projectSidebar.removeChild(projectTextbox);
            console.log(newProject); // remove later
        }
    })
  }
})


function renderProjectSection(project){
    let projectSection =  createElementWithClass("div","projectSection",project.name);
    projectSection.setAttribute("dataid", project.id);

    return projectSection;
}

function displayProjectSection(){
    projectTitles.innerHTML = "";
    projectList.forEach(project =>{
        projectTitles.append(renderProjectSection(project));
    })
}


// project clicked - this will show the todos later
//Tip!: use container as eventhandler for dynamically added DOMS
projectSidebar.addEventListener("click", (e) => {
    // Check if the clicked element is a projectSection
    if (e.target && e.target.classList.contains('projectSection')) {
        console.log("PROJECT SECTION CLICKED");
        //change to show todos in project array in the todoContainer
    }
});


//create prebuilt project
export function prebuiltProject(){
    const allTodos = new Project("All Todos");
    projectList.push(allTodos);
    displayProjectSection();
}
