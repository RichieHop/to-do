import {format} from "date-fns"

import addIcon from "./images/add.png";
import editIcon from "./images/edit.png";
import deleteIcon from "./images/delete.png";

let projectsArray = [];

if (localStorage.getItem('projects')) {
    projectsArray = JSON.parse(localStorage.getItem('projects'));
    // Sort the array by project name
    projectsArray.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
}

if (!localStorage.getItem('projects')) {
    projectsArray = [
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
    // Create 3 new tasks on the Cars project
    projectsManager.createTask(projectsArray, 0, 3, "Push Test", "Sample pushed task", "Low", "2025-10-30", "", "2025-10-07");
    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

import { projectsManager } from './projects_admin.js';

export function loadProjects() {
    const projectsListContainer = document.querySelector('#projectsListContainer');
    projectsListContainer.innerHTML = '';

    // Create project headers
    let projectBody = document.createElement('div');
    projectBody.classList.add('project');
    // Set the data index equal to 0, and data project equal to "Headers"
    projectBody.setAttribute('data-index', 0);
    projectBody.setAttribute('data-project', `Headers`)
        
    // Create the project title header
    let projectTitle = document.createElement('div');
    projectTitle.classList.add('project_title');
    projectTitle.textContent = "Project";
    projectTitle.style.fontWeight = "900";
    projectBody.appendChild(projectTitle);

    // Add the plus icon.
    let projectNewIcon = document.createElement('img');
    projectNewIcon.classList.add('project_new');
    projectNewIcon.src = addIcon;
    projectBody.appendChild(projectNewIcon);

    projectsListContainer.appendChild(projectBody);

    let list = document.getElementById("projectsListContainer");

    for (let i = 0; i < projectsArray.length; i++) {
        // Create the main body of the project
        projectBody = document.createElement('div');
        projectBody.classList.add('project');
        // Set the data index equal to the array counter, and data project equal to the project name
        projectBody.setAttribute('data-index', i);
        projectBody.setAttribute('data-project', `${projectsArray[i].Name}`)
                
        // Create the project title
        projectTitle = document.createElement('div');
        projectTitle.classList.add('project_title');
        projectTitle.textContent = projectsArray[i].Name;
        projectBody.appendChild(projectTitle);

        // Set default folder font colour to blue.
        if (projectsArray[i].Name === "Default") {
            projectTitle.style.color = "blue";
        }

        projectTitle.addEventListener("click", e => {
            let projects = document.querySelectorAll(".project_title");
            // Set font colour to black for all projects
            for (let i = 0; i < projects.length; i++) {projects[i].style.color = "black";}
            // Set font colour to blue for selected project.
            e.target.style.color = "blue";  
            projectsManager.changeProject(e, projectsArray[i].Name);
            loadTasks();
        })
    
        if (projectsArray[i].Name != "Default") {
            // Add the edit icon.
            let projectEditIcon = document.createElement('img');
            projectEditIcon.classList.add('project_edit');
            projectEditIcon.src = editIcon;
            projectBody.appendChild(projectEditIcon);

            // Add the delete icon.
            let projectDeleteIcon = document.createElement('img');
            projectDeleteIcon.classList.add('project_delete');
            projectDeleteIcon.src = deleteIcon;
            projectBody.appendChild(projectDeleteIcon);

            projectDeleteIcon.addEventListener("click", e => {
                projectsManager.deleteCurrentProject(projectsArray, projectsArray[i].ID);
                projectsArray = JSON.parse(localStorage.getItem('projects'));
                loadProjects();
            })
        }
    
        projectsListContainer.appendChild(projectBody);
                

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

    // Add the plus icon.
    let taskNewIcon = document.createElement('img');
    taskNewIcon.classList.add('task_new');
    taskNewIcon.src = addIcon;
    taskBody.appendChild(taskNewIcon);

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

                let projectID = projectsArray[i].ID;
                let taskID = projectsArray[i].Tasks[tasksIndex].Task_ID;

                taskDeleteIcon.addEventListener("click", e => {
                    projectsManager.deleteCurrentTask(projectsArray, projectID, taskID);
                    loadTasks();
                })

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
