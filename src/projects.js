import {format} from "date-fns"

import editIcon from "./images/edit.png";
import deleteIcon from "./images/delete.png";

// set to the "default" project on load
let currentProject = "Default";

const projectsArray = [
    {Name: 'Default', ID: 1, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the default project", Priority: "Low",
                                      Due_Date: "2025-10-30", Completed_Date: "", Created_Date: "2025-10-01"}]},
    {Name: 'Work', ID: 2, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the work project", Priority: "Low",
                                      Due_Date: "2025-11-30", Completed_Date: "", Created_Date: "2025-10-01"}]},
    {Name: 'Car', ID: 3, Tasks: [{Task_ID: 1, Task_Name: "Service", Description: "Book service for December", Priority: "Low",
                                      Due_Date: "2025-10-31", Completed_Date: "", Created_Date: "2025-10-01"},
                                 {Task_ID: 2, Task_Name: "Dash-Cam", Description: "Check dash-cams with main dealer", Priority: "Medium",
                                      Due_Date: "2025-11-30", Completed_Date: "", Created_Date: "2025-10-01"}
                                ]}
]

// Sort the array by project name
projectsArray.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));

if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

// Projects data manager 
const projectsManager = (function () {

    // set to the "default" project on load
    let currentProject = "Default";

    // Change the current project
    function changeCurrentProject(project) {
        currentProject = project;
    }

    // Check for clicks on the projects list
    function changeFolder(e, project) {
        // Set the current folder to the li item that was clicked
        changeCurrentProject(e.target.textContent);
        loadTasks();
    }

    // Get currentProject
    function getCurrentProject() {
        return currentProject;
    }

    // Create a new task for the current project
    function createTask(projectIndex, ID, Name, Description, Priority, Due_Date, Completed_Date, Created_Date) {
        
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority,
                                      Due_Date: Due_Date, Completed_Date: Completed_Date, Created_Date: Created_Date});
        // Add 3 additional tasks manually (don't use passed parameters)
        projectsArray[projectIndex].Tasks.push({Task_ID: 5, Task_Name: "Test 1", Description: "Sample 1", Priority: "Low",
                                      Due_Date: "2025-10-21", Completed_Date: "", Created_Date: "2025-10-01"});
        projectsArray[projectIndex].Tasks.push({Task_ID: 4, Task_Name: "Test 2", Description: "Sample 2", Priority: "Low",
                                      Due_Date: "2025-10-22", Completed_Date: "", Created_Date: "2025-10-01"});
        projectsArray[projectIndex].Tasks.push({Task_ID: 5, Task_Name: "Test 3", Description: "Sample 3", Priority: "Low",
                                      Due_Date: "2025-10-23", Completed_Date: "", Created_Date: "2025-10-01"});

        localStorage.setItem('projects', JSON.stringify(projectsArray));

        return
    }

    return {
        changeCurrentProject,
        changeFolder,
        getCurrentProject,
        createTask
        // addNewToDo,
        // editToDo,
        // deleteToDo,
        // addNewProject,
        // checkEmptyProject
    }
})();

// Create 3 new tasks on the Cars project
projectsManager.createTask(0, "9", "Push Test", "Sample pushed task", "Low", "2025-10-30", "", "2025-10-07");

export function loadProjects() {
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

    for (let i = 0; i < projectsArray.length; i++) {
        let li = document.createElement('li');
        li.innerText = projectsArray[i].Name;
        list.appendChild(li);

        // Set default folder font colour to blue.
        if (projectsArray[i].Name === "Default") {
            li.style.color = "blue";
        }

        li.addEventListener("click", e => {
            let lists = document.querySelectorAll("li");
            lists.forEach((li) => li.style.color = "black");
            // Set selected font colour to blue.
            li.style.color = "blue";
            projectsManager.changeFolder(e, projectsArray[i].Name);
        })
    }
}

export function loadTasks() {
    // const projectsArray = localStorage.getItem('projects');
    const tasksContainer = document.querySelector('#tasksContainer');
    tasksContainer.innerHTML = '';

    // Create task headers
    let taskBody = document.createElement('div');
    taskBody.classList.add('task');
    // Set the data index equal to 0, and data project equal to "Headers"
    taskBody.setAttribute('data-index', 0);
    taskBody.setAttribute('data-project', `Headers`)
        
    // Create the task title header
    let taskTitle = document.createElement('div');
    taskTitle.classList.add('task_title');
    taskTitle.textContent = "Task";
    taskBody.appendChild(taskTitle);

    // Create the task description header
    let taskDescription = document.createElement('div');
    taskDescription.classList.add('task_description');
    taskDescription.textContent = "Description";
    taskBody.appendChild(taskDescription);

    // Create the task due date header
    let taskDueDate = document.createElement('div');
    taskDueDate.classList.add('task_due_date');
    taskDueDate.textContent = "Due Date";
    taskBody.appendChild(taskDueDate);

    // Create the task completed date header
    let taskCompletedDate = document.createElement('div');
    taskCompletedDate.classList.add('task_completed_date');
    taskCompletedDate.textContent = "Completed Date";
    taskBody.appendChild(taskCompletedDate);


    // Create dummy edit header
    let taskEdit = document.createElement('div');
    taskEdit.classList.add('task_edit');
    taskEdit.textContent = " ";
    taskBody.appendChild(taskEdit);

    // Create dummy delete header
    let taskDelete = document.createElement('div');
    taskDelete.classList.add('task_delete');
    taskDelete.textContent = " ";
    taskBody.appendChild(taskDelete);

    tasksContainer.appendChild(taskBody);

    // Display tasks for the selected project
    let tasksIndex=0;
    
    for (var i = 0; i < projectsArray.length; i++)  {
        
        // Only select the current project if it has tasks
        if (projectsArray[i].Tasks[tasksIndex] != undefined && projectsArray[i].Name === projectsManager.getCurrentProject()) {

            // Loop through all tasks for the current project
            for (var x = 0; x < projectsArray[i].Tasks.length; x++)  {
                // Create the main body of the task
                taskBody = document.createElement('div');
                taskBody.classList.add('task');
                taskBody.classList.add(`priority-${projectsArray[i].Priority}`);
                // Set the data index equal to the array counter, and data project equal to the project name
                taskBody.setAttribute('data-index', i);
                taskBody.setAttribute('data-project', `${projectsArray[i].Tasks[tasksIndex].Task_Name}`)
                        
                // Create the task title
                taskTitle = document.createElement('div');
                taskTitle.classList.add('task_title');
                taskTitle.textContent = projectsArray[i].Tasks[tasksIndex].Task_Name;
                taskBody.appendChild(taskTitle);

                // // Create the task description
                taskDescription = document.createElement('div');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = projectsArray[i].Tasks[tasksIndex].Description;
                taskBody.appendChild(taskDescription);

                // // Create the task due date, format dd/mm/yyyy.
                taskDueDate = document.createElement('div');
                taskDueDate.classList.add('task_due_date');

                let dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Due_Date);
                console.log(projectsArray[i].Tasks[tasksIndex].Due_Date);
                let dateYear = format(dateObject, 'yyyy');
                let dateMonth = format(dateObject, 'MM');
                let dateDay = format(dateObject, 'dd');
                let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

                taskDueDate.textContent = dateDMY;
                taskBody.appendChild(taskDueDate);

                // // Create the task completed date, format dd/mm/yyyy.
                taskCompletedDate = document.createElement('div');
                taskCompletedDate.classList.add('task_completed_date');

                dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Completed_Date);
                taskCompletedDate.textContent = null;
                if (!dateObject === null) {
                    dateObject = new Date(tasksArray[i].Completed_Date);
                    dateYear = format(dateObject, 'yyyy');
                    dateMonth = format(dateObject, 'MM');
                    dateDay = format(dateObject, 'dd');
                    dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;
                    taskCompletedDate.textContent = dateDMY;
                }
                taskBody.appendChild(taskCompletedDate);

                // // Add the edit icon.
                let taskEditIcon = document.createElement('img');
                taskEditIcon.classList.add('task_edit');
                taskEditIcon.src = editIcon;
                taskBody.appendChild(taskEditIcon);

                // // Add the delete icon.
                let taskDeleteIcon = document.createElement('img');
                taskDeleteIcon.classList.add('task_delete');
                taskDeleteIcon.src = deleteIcon;
                taskBody.appendChild(taskDeleteIcon);

                tasksContainer.appendChild(taskBody);
                
                tasksIndex++;
            }
        }

    }
    return;
}

export function createProject() {

}

export function deleteProject() {

}
