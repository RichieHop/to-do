export function loadProjects() {

// Retrieve project data from local storage if it exists, otherwise create new sample projects
    const projectsArray = JSON.parse(localStorage.getItem('projects')) || {
         'Default': [] ,
         'Work': [] ,
         'Health and Fitness': [] ,
         'Gym': [] ,
         'Finance': [] ,
         'Car': [] ,
         'GP': [] ,
         'Food': [] ,
         'PC': [] ,
         'Javascript': [] ,
         'HTML': [] ,
         'CSS': []
    }

    console.log(projectsArray);
    
if (!localStorage.getItem('projects')) {

    // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    projectsArray.Car.push(projectsManager.createToDo("1", "First task", "Book service for December", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("2", "Dash-Cam", "Check dash-cams with main dealer", "Medium", "2025-11-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("3", "Wash", "Wash exterior", "Low", "2025-10-20", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("4", "Vacuum", "Vacuum interior and boot", "Low", "2025-10-28", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("5", "Clean windows", "Use elbow grease window cleaner", "Low", "2025-10-29", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("6", "Air Freshener", "Check and replace air freshener if necessary", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("7", "Fuel", "Check local prices and fill tank at cheapest", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("8", "Speech recognition", "Check how to start, end and use speech recognition system", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("9", "Task 9", "Task 9 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("10", "Task 10", "Task 10 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    projectsArray.Car.push(projectsManager.createToDo("11", "Task 11", "Task 11 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));

    localStorage.setItem('projects', JSON.stringify(projectsArray));

}

    // Sort the array by name
    // projectsArray.sort(function(a, b){
    //     let x = a.Name.toLowerCase();
    //     let y = b.Name.toLowerCase();
    //     if (x < y) {return -1;}
    //     if (x > y) {return 1;}
    //     return 0;
    // }); 

    const projects = document.querySelector('#projects');
    projects.innerHTML = '';

    const projectsUL = document.createElement('ul');
    projectsUL.setAttribute("id", "projectsList");
    projects.appendChild(projectsUL);
    
    let list = document.getElementById("projectsList");

    // Create the project header
    let projectTitle = document.createElement('div');
    projectTitle.classList.add('project_title');
    projectTitle.textContent = "Projects";
    list.appendChild(projectTitle);

    const projectsObject = Object.assign({}, JSON.parse(localStorage.getItem('projects')));

    for (const project in projectsObject) {
        let li = document.createElement('li');
        li.innerText = project;
        list.appendChild(li);
        li.addEventListener('click', e => projectsManager.changeFolder(e, projectsArray[project]));
    }
        
}

export function createProject() {

}

export function deleteProject() {

}

// Projects data manager 
export const projectsManager = (function () {

    // Check which project is selected, so that new items go to the correct one. 
    // set to the "default" project on load
    let currentProject = "Default";

    // Change the current project
    function changeCurrentProject(newProject) {
        currentProject = newProject;
        // console.log(currentProject);
    }

    // Check for clicks on the projects list
    function changeFolder(e, project) {
        // Set the current folder to the li item that was clicked
        changeCurrentProject(e.target.textContent);
        console.log("Current folder is", getCurrentProject());

        // render all to-dos from all projects if on the home page. otherwise
        // only render the relevent to-do items
        // if (toDosManager.getCurrentProject() === 'home') {
        //     renderAllToDos(todos, display);
        //     updateActiveNavMain(e);
        // } else {
            
        //     renderToDos(todos, display);
        //     updateActiveNavMain(e);
        // }

        // if changing to a new empty custom project, display placeholder screen
        // if (!['home', 'week', 'today'].includes(toDosManager.getCurrentProject())) {
        //     if (todos[toDosManager.getCurrentProject()].length < 1) {
        //         renderEmptyProjectPlaceholder(todos, display);
        //     }
        // }
   
    }

    // Get currentProject
    function getCurrentProject() {
        return currentProject;
    }

    // To-do factory function
    // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    // function createToDo(name, priority, date, details, project, checked=false) {
    function createToDo(ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number) {
        return {
            ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
        }
    }

    // retrieves the data entered to the new to-do form and creates a new to-do
    // and then displays it to the dom
    // function addNewToDo(e, toDoList, display, overlay, form) {

    //     // stop page from refreshing after each submit
    //     e.preventDefault();
         
    //     const toDoTitle = (document.querySelector('#new-todo-title')).value;
    //     const toDoDetails = (document.querySelector('#new-todo-details')).value;
    //     const toDoDate = (document.querySelector('#new-todo-date')).value;
    //     const toDoPriority = (document.querySelector('[name="create-new-priority"]:checked')).value;
    //     // get the current project so can store new to-do item in the correct sub array.
    //     const toDoProject = getCurrentProject();
        
    //     const newToDo = createToDo(toDoTitle, toDoPriority, toDoDate, toDoDetails, toDoProject);
    //     toDoList[toDoProject].push(newToDo);


    //     // render all to-dos from all projects if on the home page. otherwise
    //     // only render the relevent to-do items
    //     if (getCurrentProject() === 'home') {
    //         domManipulator.renderAllToDos(toDoList, display);
            
    //     } else {
    //         domManipulator.renderToDos(toDoList, display);
    //     }
        
    //     // closes the form and removes the overlay after submission
    //     overlay.classList.toggle('overlay-new-invisible');
    //     form.classList.toggle('create-new-open');

    //     // I want the form to fade out before the inputs are reset
    //     const sleep = (milliseconds) => {
    //         return new Promise(resolve => setTimeout(resolve, milliseconds))
    //       }
        
    //     sleep(300).then(() => {
    //         // clear inputs after submission 
    //         form.reset();
    //         // removes active status from all buttons
    //         domManipulator.removeActivePriority();
    //     })

    //     // update project name counter 
    //     domManipulator.renderProjectNames(toDoList, display);
    // }

    // // edit selected todo data
    // function editToDo(e, toDoList, display, overlay, form) {

    //     e.preventDefault();
    //     // retrieve the position of the to-do item in the data array
    //     const i = e.target.firstElementChild.dataset.index;
    //     // retrieve the project the to-do was assigned to
        
    //     const project = e.target.firstElementChild.dataset.project;

    //     // update the to-do item data
    //     toDoList[project][i].name = (document.querySelector('.edit-popup__input')).value;
    //     toDoList[project][i].details = (document.querySelector('.edit-popup__input-big')).value;
    //     toDoList[project][i].date = (document.querySelector('.edit-popup__date-input')).value;
    //     toDoList[project][i].priority = (document.querySelector('[name="edit-priority"]:checked')).value;

    //     // render all to-dos from all projects if on the home page. otherwise
    //     // only render the relevent to-do items
    //     if (getCurrentProject() === 'home') {
    //         domManipulator.renderAllToDos(toDoList, display);
    //         console.log(toDoList);
    //     } else {
    //         domManipulator.renderToDos(toDoList, display);
    //     }

    //     overlay.classList.toggle('overlay-edit-invisible');
    //     form.classList.toggle('edit-popup-open');

        // console.log(document.querySelector('.edit-popup__input').value);
        
    // }

    // // removes selected to-do item from the array and re renders the display
    // function deleteToDo(e, toDoList, display) {
    //     const element = e.target;
    //     let i;
    //     let project;
    //     // sometimes the event target is the svg element, other times it is the use element.
    //     // this ensures i get index of the to-do body item 
    //     if (element.tagName === 'svg') {
    //         i = element.parentElement.dataset.index;
    //     } else if (element.tagName === 'use') {
    //         i = element.parentElement.parentElement.dataset.index;
    //     }

    //     // sometimes the event target is the svg element, other times it is the use element.
    //     // this ensures i get project of the to-do body item 
    //     if (element.tagName === 'svg') {
    //         project = element.parentElement.dataset.project;
    //     } else if (element.tagName === 'use') {
    //         project = element.parentElement.parentElement.dataset.project;
    //     }

    //     // render all to-dos from all projects if on the home page. otherwise
    //     // only render the relevent to-do items
    //     if (getCurrentProject() === 'home') {
    //         // if in home
    //         toDoList[project].splice(i, 1);
    //         domManipulator.renderAllToDos(toDoList, display);
    //         // logs the entire to-do object
    //         // console.log(toDoList);
    //     } else {
    //         // console.log(toDoList[toDosManager.getCurrentProject()]);
    //         // logs just the project array
            
    //         toDoList[toDosManager.getCurrentProject()].splice(i, 1);
            
    //         domManipulator.renderToDos(toDoList, display);
    //     }

    //     // console.log('del', toDoList)
    //     //check if a project is now empty, and delete the project if true
    //     checkEmptyProject(toDoList, display);
    //     // save todos to local storage
    //     localStorage.setItem("todos", JSON.stringify(toDoList));
    //     // update project name counter 
    //     domManipulator.renderProjectNames(toDoList, display);

    // }

    // // add new project to-dos object
    // function addNewProject(e, todos, overlay, form, display) {
    //     const newProject = (document.querySelector('.create-new__project-input')).value;
    //     // if text was entered in the input and project doesnt already exist
    //     if (newProject && !(newProject.toLowerCase() in todos)) {
    //         todos[newProject] = [];

    //         // render project names in sidebar
    //         domManipulator.renderProjectNames(todos, display);
            
    //         // sets the current folder variable to nav item that was clicked
    //         toDosManager.changeCurrentProject(newProject);
    //         console.log("you are in folder", toDosManager.getCurrentProject());

    //         // render all to-dos from all projects if on the home page. otherwise
    //         // only render the relevent to-do items
    //         if (toDosManager.getCurrentProject() === 'home') {
    //             domManipulator.renderAllToDos(todos, display);
    //         } else {
    //             domManipulator.renderToDos(todos, display);
    //         }

    //         // sets nav active status to newly created project
    //         const navItems = document.querySelectorAll('.nav__item--link');
    //         navItems.forEach(item => {
    //             item.classList.remove("nav__selected");
    //         })
    //         document.querySelector('.projects').lastChild.classList.add('nav__selected');

    //         // scrolls to bottom of custom projects div
    //         domManipulator.projectNamesScrollBottom();

    //       // if the created project already exists, change folder to that project  
    //     } else if (newProject && (newProject.toLowerCase() in todos)) {

    //         // render all to-dos from all projects if on the home page. otherwise
    //         // only render the relevent to-do items
    //         if (newProject.toLowerCase() === 'home') {
    //             console.log(`${newProject} already exists. changing folder to ${newProject}`);
    //             changeCurrentProject(newProject.toLowerCase());
    //             domManipulator.renderAllToDos(todos, display);
    //         } else {
    //             console.log(`${newProject} already exists. changing folder to ${newProject}`);
    //             changeCurrentProject(newProject.toLowerCase());
    //             domManipulator.renderToDos(todos, display);
    //         }
            
    //     }

    //     // closes the form and removes the overlay after submission
    //     overlay.classList.toggle('overlay-new-invisible');
    //     form.classList.toggle('create-new-open');


    //     // I want the form to fade out before the input is reset
    //     const sleep = (milliseconds) => {
    //         return new Promise(resolve => setTimeout(resolve, milliseconds))
    //     }
        
    //     sleep(300).then(() => {
    //         // clear input after form closes 
    //         form.reset();
    //         // reset add new form to show add todo
    //         document.querySelector('#new-project-menu').style.display = "none";
        
    //         document.querySelector('#new-todo-menu').style.display = "flex";
    //     })

    //     // show a placeholder screen after a new empty project has been created
    //     domManipulator.renderEmptyProjectPlaceholder(todos, display);

    //     //update local storage
    //     localStorage.setItem("todos", JSON.stringify(todos));

    // }

    // function checkEmptyProject(todos, display) {
        
    //     // get an object of only the custom projects
    //     const projectsObject = Object.assign({}, todos);
    //     delete projectsObject.home;
    //     delete projectsObject.today;
    //     delete projectsObject.week;

    //     // only delete empty custom projects
    //     if (!['home', 'week', 'today'].includes(getCurrentProject())) {
    //         // deletes only the current empty project
    //         if (projectsObject[getCurrentProject()].length < 1) {
                
    //             delete todos[getCurrentProject()];
    //             domManipulator.renderProjectNames(todos, display);
                
    //             // change folder to home
                
    //             changeCurrentProject('home');
    //             domManipulator.renderAllToDos(todos, display);

    //             // update nave link to show home active
    //             document.querySelector('.nav').children.item(0).classList.add('nav__selected');
    //             console.log(document.querySelector('.nav').children.item(0));
    //         }
    //     }
        

        // deletes all empty projects
        // for (const project in projectsObject) {
        //     console.log(project);
        //     console.log(projectsObject[project]);
        //     console.log(projectsObject[project].length);
        //     if (projectsObject[project].length < 1) {
        //         delete todos[project];
        //         domManipulator.renderProjectNames(todos, display);
        //     }
        // }

        
        
    // }

    return {
        changeCurrentProject,
        changeFolder,
        // getCurrentProject,
        createToDo
        // addNewToDo,
        // editToDo,
        // deleteToDo,
        // addNewProject,
        // checkEmptyProject
    }
})();

