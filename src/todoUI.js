//DOM Related Module
import { Project } from "./project";
import { projectList } from "./project";
import { addTodo } from "./todo";
import { Todo } from "./todo";
import { todoList } from "./todo";
import { createElementWithClass } from "./utils";

//6. DOM Elements
const todoContainer = document.querySelector(".todo-container");

// Constants for the create modal
const createTaskButton = document.querySelector("#addTaskButton");
const modal = document.querySelector("#modal");
const taskSubmitButton = document.querySelector("#task-submit-button");
const taskTitle = document.querySelector("#title");
const taskDescription = document.querySelector("#task-description");
const taskDueDate = document.querySelector("#datepicker");
const taskPriority = document.querySelector("#priority");
const taskProjectDropdown = document.querySelector("#projects-dropdown");

// Constants for the edit modal
const editModal = document.querySelector("#editModal");
const editTaskSubmitButton = document.querySelector("#editTask-submit-button");
const editTaskTitle = document.querySelector("#editTitle");
const editTaskDescription = document.querySelector("#editTask-description");
const editTaskDueDate = document.querySelector("#editDatepicker");
const editTaskPriority = document.querySelector("#editPriority");
const editTaskProjectDropdown = document.querySelector("#editProjects-dropdown"); 


//constants for project
const createProjectButton = document.querySelector("#addProjectButton");
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
    let projectid = taskProjectDropdown.value; // add to the project hashmap
    const newTodo = new Todo(title, description, dueDate, priority);
    addTodo(newTodo);
    console.log(newTodo);
    addTaskToProject(projectid, newTodo);
    displayTodos();
    // clear form text fields
    taskTitle.value = "";
    taskDescription.value = "";
});

//show modal when the edit button is clicked
function showEditModal(dataId){
    const todoObject = todoList.find(todo => todo.id == dataId);
 
    if(!todoObject){
        console.error(`Todo with ID ${dataId} not found.`);
        return; // Exit if the task is not found
    }

  editTaskTitle.value = todoObject.title;
  editTaskDescription.value = todoObject.description;
  editTaskDueDate.value= todoObject.dueDate;
  editTaskPriority.value= todoObject.priority;
  // projectid
    
    editModal.showModal(dataId);
    
    console.log(dataId);
   
}

//edit a Todo object using modal
function editTask(dataId){
    editTaskSubmitButton.addEventListener('click', (e) =>{
       
        const todoObject = todoList.find(todo => todo.id == dataId); 
        if(!todoObject){
            console.error(`Todo with ID ${dataId} not found.`);
            return; // Exit if the task is not found
        }
        
    editTodo(todoObject,editTaskTitle.value, editTaskDescription.value, editTaskDueDate.value, editTaskPriority.value);
  
    displayTodos();

        console.log(dataId);
    
    });
}


//ADD A DATA ATRIBUTE/ID TO THE ELEMENT SO YOU CAN DELETE - CHECK LIBRARY APP
// renders Todo object into DOM element
function renderTodoItem(todo) {
    let todoTitle = createElementWithClass("h3", "todoTitle", todo.title);
    let todoDescription = createElementWithClass("p", "todoDescription", todo.description);
    let todoDueDate = createElementWithClass("p", "todoDueDate", todo.dueDate);   // works - make more readable (date-fns)
    let todoPriority = createElementWithClass("p", "todoPriority", todo.priority);
    let editButton = createElementWithClass("button","todoEditButton");
    
    let svgIconEditButton = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <title>square-edit-outline</title>
      <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
    </svg>
    `;
    editButton.innerHTML = svgIconEditButton;
    editButton.setAttribute("data-id", todo.id);

    const dataId = editButton.getAttribute("data-id");

    //edit task button functionality
    editButton.addEventListener('click', () =>{
        showEditModal(dataId);
        editTask(dataId);
    });
    
    
    let todoItem = createElementWithClass("div", "todoItem");
    todoItem.setAttribute("data-id", todo.id);// link DOM element to todo object
    todoItem.append(todoTitle, todoDescription, todoDueDate, todoPriority, editButton);
    return todoItem;
}

//display the Todos to container
export function displayTodos() {
    todoContainer.innerHTML = "";
    todoList.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    })
}

//HERE1!!!!!!!!!!!!!!!!

//edit todo Object
function editTodo(todo, title, description, dueDate, priority){
 todo.title = title;
 todo.description = description;
 todo.dueDate = dueDate;
 todo.priority = priority;

 removeTodoFromProject(todo);
 let projectid = editTaskProjectDropdown.value;
 addTaskToProject(projectid, todo);
 console.log(todo);

}


// PROJECTS SECTIONS

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
            updateProjectDropdown();
           
            //clear and remove textbox from sidebar
            projectTextbox.value="";
            projectSidebar.removeChild(projectTextbox);
            console.log(newProject); // remove later
        }
    })
  }
})

// Create a DOM element for a project to render in the sidebar
function renderProjectSection(project){
    let projectSection =  createElementWithClass("div","projectSection",project.name);
    projectSection.setAttribute("dataid", project.id);

    return projectSection;
}


// Create project section DOM elements and append them to the sidebar
function displayProjectSection(){
    projectTitles.innerHTML = "";
    projectList.forEach(project =>{
        projectTitles.append(renderProjectSection(project));
    })
}


// project clicked - shows todos in project in main container
//Tip!: use container as eventhandler for dynamically added DOMS
projectSidebar.addEventListener("click", (e) => {
    // Check if the clicked element is a projectSection
    if (e.target && e.target.classList.contains('projectSection')) {
        console.log("PROJECT SECTION CLICKED"); // delete later
        console.log(e.target.getAttribute("dataid")); // delete later
         
        // Get the data-id of the clicked project
        const projectId = e.target.getAttribute("dataid");
        const project = projectList.find(proj => proj.id == projectId);

        if(project){
            console.log(project.displayTodos()); // delete later
            //displays todo in project from main container
            displayTodosfromProject(project);
        }
        
    }
});

// show todos in project when clicked --- this can be deleted or implemented
function displayProjectFolder(dataid){

}

// update the project dropdown list when creating a todo
function updateProjectDropdown(){
    taskProjectDropdown.innerHTML = "";
    editTaskProjectDropdown.innerHTML = "";
    projectList.forEach(project => {
        // create an element for each project with the project's name and id and use to populate the project dropdown menu
        const option = document.createElement("option");
        option.value = project.id;
        option.textContent = project.name;
        taskProjectDropdown.appendChild(option);

        // update edit dropdown - populate dropdown with option element 
        const editOption = document.createElement("option");
        editOption.value = project.id;
        editOption.textContent = project.name;
        editTaskProjectDropdown.appendChild(editOption); // dropdowns could be shared but not sure if I should break seprating concerns
    });
}

//add todo to selected project from dropdown menu
function addTaskToProject(projectid, todo){
    projectList.forEach(project => {
        if(project.id == projectid){
            project.addToProject(todo);
        }
    })
}

function findProject(todo) {
    // Iterate through each project in the projectList
    for (const project of projectList) {
        // Check if the todo exists in the project's Map
        if (project.projectFolder.has(todo.id)) {
            console.log("Found project: ", project);
            return project; // Return the project if the todo is found
        }
    }
    console.error("No project found containing the todo:", todo);
    return null; // Return null if the todo is not found
}


function removeTodoFromProject(todo) {
    const project = findProject(todo);
    if (project) {
        project.deleteTodo(todo.id);
    } else {
        console.error("Could not remove todo because no project was found:", todo);
    }
}


// display the todos in a project to main container
export function displayTodosfromProject(project) {
    todoContainer.innerHTML = "";   
    project.displayTodos().forEach(todo => {
        // Render each todo and append it to the container
        todoContainer.append(renderTodoItem(todo));
    });
   
}

//create prebuilt project
export function prebuiltProject(){
    const allTodos = new Project("All Todos");
    projectList.push(allTodos);
    displayProjectSection();
    updateProjectDropdown();
}


