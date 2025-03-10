//DOM Related Module
import { isFuture, isToday } from "date-fns";
import { Project } from "./project";
import { projectList } from "./project";
import { addTodo } from "./todo";
import { Todo } from "./todo";
import { todoList } from "./todo";
import { createElementWithClass } from "./utils";

//6. DOM Elements
const todoContainer = document.querySelector(".todo-container");
const completed = document.querySelector(".completed");

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

//constants for tasks sections  - getElementByID - was having DOM issue with queryselector
const allTasks = document.getElementById("all-tasks"); 
const dueToday = document.getElementById("due-today-tasks");
const upcomingTasks = document.getElementById("upcoming-tasks");
const completedTasks = document.getElementById("completed-tasks");


//constants for project
const createProjectButton = document.querySelector("#addProjectButton");
const projectSidebar = document.querySelector(".projects-sidebar");
const projectTitles = document.querySelector(".project-titles");

let selectedTodo = null;

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
    const newTodo = new Todo(title, description, dueDate, priority, projectid);
    addTodo(newTodo);
    console.log(newTodo);
    addTodoToProject(projectid, newTodo);
    displayTodos();
    // clear form text fields
    taskTitle.value = "";
    taskDescription.value = "";
});

//show modal when the edit button is clicked
function showEditModal(dataId){
     selectedTodo = todoList.find(todos => todos.id == dataId);
 
    if(!selectedTodo){
        console.error(`Todo with ID ${dataId} not found.`);
        return; // Exit if the task is not found
    }

  editTaskTitle.value = selectedTodo.title;
  editTaskDescription.value = selectedTodo.description;
  editTaskDueDate.value= selectedTodo.dueDate;
  editTaskPriority.value= selectedTodo.priority;
  
    
    editModal.showModal();
    
    console.log(dataId);
   
}



// Attach event listener ONCE, updating only the selected todo
editTaskSubmitButton.addEventListener("click", () => {
    if (!selectedTodo) {
        console.error("No todo selected for editing.");
        return;
    }

    editTodo(selectedTodo, 
        editTaskTitle.value, 
        editTaskDescription.value, 
        editTaskDueDate.value, 
        editTaskPriority.value, 
        editTaskProjectDropdown.value
    );

    displayTodos(); // Refresh UI
    selectedTodo = null; // Reset the selected todo after edit
});

//START HERE TOMORROW - move to completed section - may need new array
// ** REMINDER: Linking event listener to container is best practice for dynamically added elements **
todoContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("completed")) {
        const dataid = event.target.getAttribute("data-id");
      const todo = todoList.find( todo => todo.id == dataid);

        console.log(event.target.checked ? "Box checked ✅" : "Box not checked ❌");
        console.log(dataid);
        console.log(todo);// remove all console logs later

        // checkbox boolean = todo completed boolean
        todo.completed = event.target.checked;
    }
});



//edit todo Object
function editTodo(todoObject, newTitle, newDescription, newDueDate, newPriority, newTodoProjectIdNumber){
    removeTodoFromProject(todoObject);
    todoObject.title = newTitle;
    todoObject.description = newDescription;
    todoObject.dueDate = newDueDate;
    todoObject.priority = newPriority;
    todoObject.todoProjectIdNumber = newTodoProjectIdNumber;
   
   
    addTodoToProject(newTodoProjectIdNumber, todoObject);
    console.log(todoObject);
   
   }
   

//ADD A DATA ATRIBUTE/ID TO THE ELEMENT SO YOU CAN DELETE - CHECK LIBRARY APP
// renders Todo object into DOM element
function renderTodoItem(todo) {
    let todoTitle = createElementWithClass("h3", "todoTitle", todo.title);
    let todoDescription = createElementWithClass("p", "todoDescription", todo.description);
    let todoDueDate = createElementWithClass("p", "todoDueDate", todo.dueDate);   // works - make more readable (date-fns)
    let todoPriority = createElementWithClass("p", "todoPriority", todo.priority);
    let editButton = createElementWithClass("button","todoEditButton");
    let completedCheckbox = createElementWithClass("INPUT", "completed");
    completedCheckbox.setAttribute("type", "checkbox");


    let svgIconEditButton = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <title>square-edit-outline</title>
      <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
    </svg>
    `;
    editButton.innerHTML = svgIconEditButton;
    editButton.setAttribute("data-id", todo.id);
    completedCheckbox.setAttribute("data-id", todo.id);
    const dataId = editButton.getAttribute("data-id");
    
    // if completed - render the checkbox already checked. // consider greying out the todo
     completedCheckbox.checked = todo.completed;

    //edit task button functionality
    editButton.addEventListener('click', () =>{
        showEditModal(dataId);
    });
    
    
    let todoItem = createElementWithClass("div", "todoItem");
    todoItem.setAttribute("data-id", todo.id);// link DOM element to todo object
    todoItem.append(todoTitle, todoDescription, todoDueDate, todoPriority, editButton, completedCheckbox);
    return todoItem;
}

//display the Todos to container
export function displayTodos() {
    todoContainer.innerHTML = "";
     // Render each todo and append it to the container
    todoList.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    })
}


// todo/task sidebar when task div is clicked - rephrase this section

//display all todos
allTasks.addEventListener("click", () => {
    displayTodos();
});

// display todos due today
dueToday.addEventListener("click", () => {
   
    todoContainer.innerHTML = "";
    // Filter todos that are due today using date-fns
    const todayTodos = todoList.filter(todo => isToday(new Date(todo.dueDate)));

    // Render each filtered todo and append it to the container
    todayTodos.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    });
});

// display upcoming todos
 upcomingTasks.addEventListener("click", () =>{
    
    todoContainer.innerHTML = "";
      // Filter todos that are in the future using date-fns
    const upcomingTodos = todoList.filter(todo => isFuture(new Date(todo.dueDate)));

    // Render each filtered todo and append it to the container
    upcomingTodos.forEach(todo => {
        todoContainer.append(renderTodoItem(todo));
    });
 });

 // display completed todos
 completedTasks.addEventListener("click", () => {
    console.log("hi");
    todoContainer.innerHTML = "";

    const completedTodos = todoList.filter(todo => todo.completed);
    completedTodos.forEach(todo =>{
    todoContainer.append(renderTodoItem(todo));
    });

 });

// *** PROJECTS SECTIONS ***

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
function addTodoToProject(projectid, todo){
    projectList.forEach(project => {
        if(project.id == projectid){
            project.addToProject(todo);
        }
    })
}


// later
function removeTodoFromProject(todo) {
 let todoProjectIdNumber = todo.todoProjectIdNumber;
 
  let project = projectList.find(project =>  project.id == todoProjectIdNumber);

  if(project){
    project.deleteTodo(todo);
  }else{
    console.error("no project");
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


