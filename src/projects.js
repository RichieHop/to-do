import {format, addDays} from "date-fns"

import addIcon from "./images/add.png";
import blankIcon from "./images/blank.png";
import deleteIcon from "./images/delete.png";
import editIcon from "./images/edit.png";
import csvIcon from "./images/csv.png";
import ganttIcon from "./images/gantt-chart.png";
import projectIconImage from "./images/project.png";

import PdfHelpFile from "./images/to_do.pdf";

let projectsArray = [];

// Format date as yyyy-mm-dd
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

var todayDate = formatDate(new Date());
var taskCreatedDate = todayDate;
var task1StartDate = formatDate(addDays(todayDate, 2));
var task1DueDate = formatDate(addDays(todayDate, 5));
var task1CompletedDate = formatDate(addDays(todayDate, 2));
var task2StartDate = task1DueDate;
var task2DueDate = formatDate(addDays(task2StartDate, 5));
var task3StartDate = task2DueDate
var task3DueDate = formatDate(addDays(task3StartDate, 5));
var task4StartDate = task3DueDate
var task4DueDate = formatDate(addDays(task4StartDate, 5));
var task5StartDate = task4DueDate
var task5DueDate = formatDate(addDays(task5StartDate, 5));
var task6StartDate = task5DueDate
var task6DueDate = formatDate(addDays(task6StartDate, 5));

if (localStorage.getItem('projects')) {
    projectsArray = JSON.parse(localStorage.getItem('projects'));
    // Sort the array by project name
    projectsArray.sort((a, b) => ("" + a.Name).localeCompare(b.Name, undefined, {numeric: true}));
}

if (!localStorage.getItem('projects')) {
    projectsArray = [
        {Name: ' Default', ID: 1, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the default project", Priority: "Low",
                                           Due_Date: task1DueDate, Completed_Date: "", Created_Date: taskCreatedDate, Start_Date: task1StartDate, 
                                           Dependencies: "", Progress: 20}]},
        {Name: 'Work', ID: 2, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the work project", Priority: "Low",
                                        Due_Date: task1DueDate, Completed_Date: "", Created_Date: taskCreatedDate, Start_Date: task1StartDate, Dependencies: "", Progress: 0}]},
        {Name: 'Car', ID: 3, Tasks: [{Task_ID: 1, Task_Name: "Service", Description: "Book service for December", Priority: "High",
                                        Due_Date: task1DueDate, Completed_Date: "", Created_Date: taskCreatedDate, Start_Date: task1StartDate, Dependencies: "", Progress: 50},
                                    {Task_ID: 2, Task_Name: "Dash-Cam", Description: "Check dash-cams with main dealer", Priority: "Medium",
                                        Due_Date: task2DueDate, Completed_Date: "", Created_Date: taskCreatedDate, Start_Date: task2StartDate, Dependencies: "1", Progress: 10}]},
        {Name: 'CSS', ID: 4, Tasks: []},
        {Name: 'JavaScript', ID: 5, Tasks: []},
        {Name: 'HTML', ID: 6, Tasks: []},
        {Name: 'Health and Fitness', ID: 7, Tasks: []},
        {Name: 'Finance', ID: 8, Tasks: []},
        {Name: 'Food', ID: 9, Tasks: []},
        {Name: 'GP', ID: 10, Tasks: []},
        {Name: 'PC', ID: 11, Tasks: []}   
    ]

    // Sort the array by project name
    projectsArray.sort((a, b) => ("" + a.Name).localeCompare(b.Name, undefined, {numeric: true}));
    // Add 4 tasks to the "Cars" project.
    const projectIndex = projectsArray.findIndex(x => x.Name === "Car");
    if (projectIndex >= 0) {
        projectsManager.createSampleTask(projectsArray, projectIndex, 3, "Yet Another Test", "Another test description", "Low", task3DueDate, "", taskCreatedDate, task3StartDate, "2", 0);
        projectsManager.createSampleTask(projectsArray, projectIndex, 4, "Test 1", "Sample 1", "Low", task4DueDate, "", taskCreatedDate, task4StartDate, "3", 0);
        projectsManager.createSampleTask(projectsArray, projectIndex, 5, "Test 2", "Sample 2", "High", task5DueDate, "", taskCreatedDate, task5StartDate, "4", 0);
        projectsManager.createSampleTask(projectsArray, projectIndex, 6, "Test 3", "Sample 3", "Low", task6DueDate, "", taskCreatedDate, task6StartDate, "5", 0);        
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }
}

import { projectsManager } from './projects_admin.js';
import { ganttManager } from './gantt.js';

export function loadProjects() {
    // Add gantt view button
    const formHeader = document.querySelector('#title');
    let ganttLink = document.querySelector('#ganttIcon');
    if (ganttLink === null) {
        ganttLink = document.createElement('input');
        ganttLink.src = ganttIcon;
        ganttLink.title = "Toggle Gantt View for Current Project";
        ganttLink.type = "image";
        ganttLink.setAttribute("id", "ganttIcon");
        formHeader.appendChild(ganttLink);
    }
    
    // Add CSV export button
    let csvLink = document.querySelector('#exportCSV');
    if (csvLink === null) {
        csvLink = document.createElement('input');
        csvLink.src = csvIcon;
        csvLink.title = "Export all to CSV";
        csvLink.type = "image";
        csvLink.setAttribute("id", "exportCSV");
        formHeader.appendChild(csvLink);
    }
    
    // Add help icon and link to PDF document
    let pdfLink = document.querySelector('#pdf');
    if (pdfLink === null) {
        pdfLink = document.createElement('a');
        pdfLink.href = PdfHelpFile;
        pdfLink.target = "blank";
        pdfLink.title = "Documentation";
        pdfLink.innerHTML = "?";
        pdfLink.classList.add('pdf');
        pdfLink.setAttribute("id", "pdf");
        formHeader.appendChild(pdfLink);
    }
    
    // Add event listener for gantt.
    ganttLink.addEventListener("click", e => {
        let projectID = projectsArray.findIndex(x => x.Name === projectsManager.getCurrentProject());
        // Only build the gantt if there are tasks in the current project.
        if (projectsArray[projectID].Tasks[0] != undefined) {
            projectsListContainer.style.display = projectsListContainer.style.display === 'none' ? '' : 'none';
            tasksContainer.style.display = tasksContainer.style.display === 'none' ? '' : 'none';
            var ganttDisplay = document.getElementById("ganttChartDiv");
            var svgDiv = document.getElementById("svgDiv");

            // Display or hide the chart.
            if (ganttDisplay.style.display === 'none' || ganttDisplay.style.display === '' ) {
                // Clear the current chart; clear all from svgDiv, then add element <svg id="gantt"></svg> to svgDiv
                svgDiv.innerHTML = "";
                let blankSVG = document.createElement('svg');
                blankSVG.setAttribute("id", "gantt");
                svgDiv.appendChild(blankSVG);
                ganttDisplay.style.display = 'block';
            } else {
                ganttDisplay.style.display = 'none';
            }
            let projectID = projectsArray.findIndex(x => x.Name === projectsManager.getCurrentProject());
            ganttManager.displayGantt(projectsArray[projectID], projectsManager.getCurrentProject());
            // Sort the tasks by start date ascending
            projectsArray[projectID].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));
            // Save any start or end dates modified in gantt view and reload tasks.
            localStorage.setItem('projects', JSON.stringify(projectsArray));
            loadTasks();
        }
    });


    // Add event listener for exporting to CSV.
    csvLink.addEventListener("click", e => {
        // Get the modal
        var modal = document.getElementById("exportCSVModal");
        // Get the modal header
        var optionsHeader = document.getElementById("optionsHeader");
        optionsHeader.textContent = "CSV Export Options";
        // Get the date ranges
        var dateRanges = document.getElementById("dateRangesID");
        var fromDate = document.getElementById("fromDateID");
        var toDate = document.getElementById("toDateID");
        fromDate.value = todayDate;
        toDate.value = formatDate(addDays(todayDate, 90));
        // Get the Cancel and Delete buttons.
        var cancelButton = document.getElementsByClassName("cancelCSV")[0];
        var exportButton = document.getElementsByClassName("exportCSV")[0];
        // Open the modal
        modal.style.display = "block";
        // dateRanges.style.display = "none";
        // When the user clicks on Cancel, close the modal
        cancelButton.onclick = function() {
            modal.style.display = "none";
            return;
        }
        // When the user clicks on Export, use the options to produce a CSV
        exportButton.onclick = function() {
            var ele = document.getElementsByName('exportChoice');
            for (let i = 0; i < ele.length; i++) {
                if (ele[i].checked)
                var selectedOption = ele[i].value;
            }
            
            var csvString = "Project" + "," + "Task" + "," + "Description" + "," + "Start Date" + "," + "Due Date" + "," + "Completed Date" + "," 
                        + "Progress %" + ","  + "Task ID" + ","  + "Priority" + "," + "Created Date" + "\n";

            var exportArray = [];

            // Use returned selection to build array to export
            switch (selectedOption) {
                case "all":
                    // Use all of projectsArray
                    exportArray = projectsArray;
                    break;
                case "current":
                    // Use tasks for current project from projectsArray
                    exportArray = projectsArray.filter(function (project) {return project.Name === projectsManager.getCurrentProject()});
                    break;
                case "allByDate":
                    // Get a date range; need to add hidden fields for date range
                    dateRanges.style.display = "block";
                    // Map projectsArray for tasks with dates within the filters
                    exportArray = projectsArray.map((element) => {
                        return {...element, Tasks: element.Tasks.filter((tasks) => tasks.Start_Date >= fromDate.value && tasks.Due_Date <= toDate.value)};
                    })
                    // Remove elements with no tasks
                    exportArray = exportArray.filter(projects => {
                        return projects.Tasks.length != 0;
                    })
                    break;
                case "currentByDate":
                    // Use tasks for current project from projectsArray
                    exportArray = projectsArray.filter(function (project) {return project.Name === projectsManager.getCurrentProject()});
                    // Map projectsArray for tasks with dates within the filters
                    exportArray = exportArray.map((element) => {
                        return {...element, Tasks: element.Tasks.filter((tasks) => tasks.Start_Date >= fromDate.value && tasks.Due_Date <= toDate.value)};
                    })
                    // Remove elements with no tasks
                    exportArray = exportArray.filter(projects => {
                        return projects.Tasks.length != 0;
                    })
            }
            
            for (let i = 0; i < exportArray.length; i++) {
                csvString += exportArray[i].Name + "\r\n";
                for (let x = 0; x < exportArray[i].Tasks.length; x++) {
                    csvString += "," + exportArray[i].Tasks[x].Task_Name + "," + exportArray[i].Tasks[x].Description + "," 
                                    + exportArray[i].Tasks[x].Start_Date + "," + exportArray[i].Tasks[x].Due_Date + "," 
                                    + exportArray[i].Tasks[x].Completed_Date + ","  + exportArray[i].Tasks[x].Progress + "," 
                                    + exportArray[i].Tasks[x].Task_ID + "," + exportArray[i].Tasks[x].Priority + "," 
                                    + exportArray[i].Tasks[x].Created_Date + "," + "\n";
                }
                csvString += "\r\n";
            } 
            csvString = "data:application/csv," + encodeURIComponent(csvString);
            var x = document.createElement("A");
            x.setAttribute("href", csvString );
            x.setAttribute("download","To-Do Data.csv");
            x.setAttribute("id", "downloadCSV");
            document.body.appendChild(x);
            x.click();
            // Remove the download element after use.
            var downloadElement = document.getElementById("downloadCSV");
            downloadElement.remove();

            exportArray = [];

            modal.style.display = "none";
        }   
    })

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

    // _____________________________________________________________________________________________________
    // Add a project
    // _____________________________________________________________________________________________________

    // Add an event listener for the plus icon.
    projectNewIcon.addEventListener("click", e => {
        // Get the modal
        var modal = document.getElementById("addProjectModal");
        // Set the modal header
        var addProjectHeader = document.getElementById("addProjectHeader");
        addProjectHeader.textContent = "Add a new project";

        // Open the modal
        modal.style.display = "block";
        
        // Clear errors, text and set focus on the project name
        document.getElementById('projectNameID').focus();
        document.getElementById('projectNameID').value = "";
        document.getElementById('addProject').classList.remove('invalid');
        document.getElementById("projectNameHelp").innerText = "";

        // Validate the form
        const myform = document.getElementById('addProject');
        myform.noValidate = true;
        myform.reset;

        // Custom form validation
        myform.addEventListener('submit', validateForm)

        // Execute once if validation is OK
        myform.addEventListener('submit', e => {
            e.preventDefault();
            if (e.submitter.className === "cancelProject") {
                myform.close;
                modal.style.display = "none";
                return true;
            } else {      
                // Actions after form has passed validation.... add the new project to the array
                projectsManager.addProject(projectsArray, document.getElementById("projectNameID").value);

                // Refresh form header in order to allow gantt display
                const formHeader = document.querySelector('#title');
                formHeader.innerHTML = "";
                let projectIconLink = document.createElement('img');
                projectIconLink.src = projectIconImage;
                projectIconLink.setAttribute("id", "projectIcon");
                formHeader.appendChild(projectIconLink);
                const title = document.createElement('span');
                title.textContent = "To-Do";
                formHeader.appendChild(title);

                // projectsArray = JSON.parse(localStorage.getItem('projects'));
                loadProjects();
                loadTasks();
                myform.close;
                modal.style.display = "none";
                return true;
            }
        }, {once : true});

        // Form validation
        function validateForm(e) {
            if (e.submitter.className != "cancelProject") {
                const form = e.target, nameField = document.getElementById("projectNameID").value;
                // Reset fields
                form.projectName.setCustomValidity('');
                form.projectName.parentElement.classList.remove('invalid');
                // Check valid project entered
                const err = form.projectName.value ? '' : 'error';
                form.projectName.setCustomValidity(err);
                let duplicate = "";
                duplicate = projectsArray.filter((project) => project.Name.toUpperCase() === form.projectName.value.toUpperCase());            
                if (duplicate != "") {
                    form.projectName.setCustomValidity("Project already exists.");
                }            
                if (!form.checkValidity() || duplicate != "") {
                    // Form is invalid - cancel submit
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Apply invalid class
                    if (!form.projectName.checkValidity() || duplicate != "") {
                        if (form.projectName.value != "") {
                            document.getElementById("projectNameHelp").innerText = "Project already exists";
                        }
                        form.projectName.parentElement.classList.add('invalid');
                    }
                    return false;
                }
                return true;
            }
        };
    })

    projectsListContainer.appendChild(projectBody);

    // let list = document.getElementById("projectsListContainer");

    for (let i = 0; i < projectsArray.length; i++) {
        // Create the main body of the project
        projectBody = document.createElement('div');
        projectBody.classList.add('project');
        // Set the data index equal to the array counter, and data project equal to the project name
        projectBody.setAttribute('data-index', i);
        projectBody.setAttribute('data-project', `${projectsArray[i].Name}`)
                
        // Create the tasks count
        let tasksCounter = 0;
        projectsArray[i].Tasks.forEach(task => {
            if(!task.Completed_Date) {
                tasksCounter++
            }
        })
        let tasksCount = document.createElement('div');
        tasksCount.classList.add('tasks_count');
        tasksCount.textContent = `${tasksCounter}`;
        projectBody.appendChild(tasksCount);
             
        // Create the project title
        projectTitle = document.createElement('div');
        projectTitle.classList.add('project_title');
        projectTitle.textContent = projectsArray[i].Name;
        projectBody.appendChild(projectTitle);

        // Set current folder font colour to blue.
        if (projectsArray[i].Name ===  projectsManager.getCurrentProject()) {
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
    
        if (projectsArray[i].Name != " Default") {
            // Add the edit icon.
            let projectEditIcon = document.createElement('img');
            projectEditIcon.classList.add('project_edit');
            projectEditIcon.src = editIcon;
            projectBody.appendChild(projectEditIcon);

            // _____________________________________________________________________________________________________
            // Edit a project
            // _____________________________________________________________________________________________________

            // Add an event listener for the edit icon.
            projectEditIcon.addEventListener("click", e => {
                // Get the modal
                var modal = document.getElementById("addProjectModal");
                // Set the modal header
                var addProjectHeader = document.getElementById("addProjectHeader");
                addProjectHeader.textContent = "Edit project";

                // Open the modal
                modal.style.display = "block";
                
                // Clear errors, text and set focus on the project name
                document.getElementById('projectNameID').focus();
                document.getElementById('projectNameID').value = projectsArray[i].Name;
                var oldName = projectsArray[i].Name;
                document.getElementById('addProject').classList.remove('invalid');
                document.getElementById("projectNameHelp").innerText = "";
                var addButton = document.getElementsByClassName("addProject")[0];
                addButton.innerHTML = "Edit";

                // Validate the form
                const myform = document.getElementById('addProject');
                myform.noValidate = true;
                myform.reset;

                // Custom form validation
                myform.addEventListener('submit', validateForm)

                // Execute once if validation is OK
                myform.addEventListener('submit', e => {
                    e.preventDefault();
                    if (e.submitter.className === "cancelProject") {
                        myform.close;
                        modal.style.display = "none";
                        return true;
                    } else {      
                        // Actions after form has passed validation....
                        projectsManager.editProject(projectsArray, document.getElementById('projectNameID').value, oldName);

                        // Refresh the form header in order to allow gantt display
                        const formHeader = document.querySelector('#title');
                        formHeader.innerHTML = "";
                        let projectIconLink = document.createElement('img');
                        projectIconLink.src = projectIconImage;
                        projectIconLink.setAttribute("id", "projectIcon");
                        formHeader.appendChild(projectIconLink);
                        const title = document.createElement('span');
                        title.textContent = "To-Do";
                        formHeader.appendChild(title);

                        loadProjects();
                        loadTasks();
                        myform.close;
                        modal.style.display = "none";
                        return true;
                    }
                }, {once : true});

                // Form validation
                function validateForm(e) {
                    if (e.submitter.className != "cancelProject") {
                        const form = e.target, nameField = document.getElementById("projectNameID").value;
                        // Reset fields
                        form.projectName.setCustomValidity('');
                        form.projectName.parentElement.classList.remove('invalid');
                        // Check valid project entered
                        const err = form.projectName.value ? '' : 'error';
                        form.projectName.setCustomValidity(err);
                        let duplicate = "";
                        duplicate = projectsArray.filter((project) => project.Name.toUpperCase() === form.projectName.value.toUpperCase());            
                        if (duplicate != "") {
                            form.projectName.setCustomValidity("Project already exists.");
                        }            
                        if (!form.checkValidity() || duplicate != "") {
                            // Form is invalid - cancel submit
                            e.preventDefault();
                            e.stopImmediatePropagation();
                            // Apply invalid class
                            if (!form.projectName.checkValidity() || duplicate != "") {
                                if (form.projectName.value != "") {
                                    document.getElementById("projectNameHelp").innerText = "Project already exists";
                                }
                                form.projectName.parentElement.classList.add('invalid');
                            }
                            return false;
                        }
                        return true;
                    }
                };
            })

            // Add the delete icon.
            let projectDeleteIcon = document.createElement('img');
            projectDeleteIcon.classList.add('project_delete');
            projectDeleteIcon.src = deleteIcon;
            projectBody.appendChild(projectDeleteIcon);

            // _____________________________________________________________________________________________________
            // Delete a project
            // _____________________________________________________________________________________________________

            projectDeleteIcon.addEventListener("click", e => {
                // Get the modal
                var modal = document.getElementById("deleteProjectModal");
                // Get the modal header
                var deleteProjectHeader = document.getElementById("deleteProjectHeader");
                deleteProjectHeader.textContent = `${projectsArray[i].Name}`;
                // Get the Cancel and Delete buttons.
                var cancelButton = document.getElementsByClassName("cancelProject")[0];
                var deleteButton = document.getElementsByClassName("deleteProject")[0];
                // Open the modal
                modal.style.display = "block";
                // When the user clicks on Cancel, close the modal
                cancelButton.onclick = function() {
                    modal.style.display = "none";
                    return;
                }
                // When the user clicks on Delete, delete the project
                deleteButton.onclick = function() {
                    projectsManager.deleteCurrentProject(projectsArray, projectsArray[i].ID);
                    projectsArray = JSON.parse(localStorage.getItem('projects'));
                    
                    // Refresh the form header in order to allow gantt display
                    const formHeader = document.querySelector('#title');
                    formHeader.innerHTML = "";
                    let projectIconLink = document.createElement('img');
                    projectIconLink.src = projectIconImage;
                    projectIconLink.setAttribute("id", "projectIcon");
                    formHeader.appendChild(projectIconLink);
                    const title = document.createElement('span');
                    title.textContent = "To-Do";
                    formHeader.appendChild(title);

                    loadProjects();
                    loadTasks();
                    modal.style.display = "none";
                }
            })
        } else {
            // Add dummy edit icon.
            let projectEditIcon = document.createElement('img');
            projectEditIcon.classList.add('project_edit_dummy');
            projectEditIcon.src = blankIcon;
            projectBody.appendChild(projectEditIcon);

            // Add dummy delete icon.
            let projectDeleteIcon = document.createElement('img');
            projectDeleteIcon.classList.add('project_delete_dummy');
            projectDeleteIcon.src = blankIcon;
            projectBody.appendChild(projectDeleteIcon);
        }
    
        projectsListContainer.appendChild(projectBody);

    }

}

export function loadTasks() {
    const tasksContainer = document.querySelector('#tasksContainer');
    tasksContainer.innerHTML = '';

    // Create task headers
    let taskBody = document.createElement('div');
    taskBody.classList.add('task');
    // Set the data index equal to 0, and data project equal to "Headers"
    taskBody.setAttribute('data-index', 0);
    taskBody.setAttribute('data-project', `Headers`)
        
    // Create dummy priority header
    let taskPriority = document.createElement('div');
    taskPriority.classList.add('task_priority');
    // taskPriority.textContent = "";
    taskBody.appendChild(taskPriority);

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

    // Create the task start date header
    let taskStartDate = document.createElement('div');
    taskStartDate.classList.add('task_start_date');
    taskStartDate.textContent = "Start Date";
    taskBody.appendChild(taskStartDate);

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

    // Create the task progress header
    let taskProgress = document.createElement('div');
    taskProgress.classList.add('task_progress');
    taskProgress.textContent = "Progress %";
    taskBody.appendChild(taskProgress);

    // Create the task ID header
    let taskIDField = document.createElement('div');
    taskIDField.classList.add('task_progress');
    taskIDField.textContent = "Task ID";
    taskBody.appendChild(taskIDField);

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

    // _____________________________________________________________________________________________________
    // Add a task
    // _____________________________________________________________________________________________________

    // Add an event listener for the plus icon.
    taskNewIcon.addEventListener("click", e => {
        // Get the modal
        var modal = document.getElementById("addTaskModal");
        // Set the modal header
        var addTaskHeader = document.getElementById("addTaskHeader");
        addTaskHeader.textContent = "Add a new task";

        var addButton = document.getElementsByClassName("addTask")[0];
        addButton.innerHTML = "Add";

        // Open the modal
        modal.style.display = "block";
        
        // Clear errors, text and set focus on the project name
        document.getElementById('taskNameID').focus();

        document.getElementById('taskNameID').value = "";
        document.getElementById('taskDescriptionID').value = "";
        document.getElementById('taskPriorityID').value = "Low";
        document.getElementById('taskDueDateID').value = "";
        document.getElementById('taskCompletedDateID').value = "";
        document.getElementById('taskStartDateID').value = "";
        document.getElementById('taskDependenciesID').value = "";
        document.getElementById('taskProgressID').value = 0;

        document.getElementById("taskDueDateHelp").innerText = "Please enter a due date";
        document.getElementById("taskStartDateHelp").innerText = "Please enter a start date";
        document.getElementById("taskDueDateDiv").classList.remove('invalid');
        document.getElementById("taskStartDateDiv").classList.remove('invalid');
    
        // Validate the form
        const myform = document.getElementById('addTask');
        myform.noValidate = true;
        myform.reset;

        // Custom form validation
        myform.addEventListener('submit', validateForm)

        // Execute once if validation is OK
        myform.addEventListener('submit', e => {
            e.preventDefault();
            if (e.submitter.className === "cancelAddTask") {
                myform.close;
                modal.style.display = "none";
                return true;
            } else {      
                // Actions after form has passed validation....
                let projectID = projectsArray.findIndex(x => x.Name === projectsManager.getCurrentProject());
                projectsManager.addTask(projectsArray, projectID, myform.taskName.value, myform.taskDescription.value, 
                                        myform.taskPriority.value, myform.taskDueDate.value, myform.taskCompletedDate.value,  taskCreatedDate,
                                        myform.taskStartDate.value, myform.taskDependencies.value, myform.taskProgress.value);

                // Refresh the form header in order to allow gantt display
                const formHeader = document.querySelector('#title');
                formHeader.innerHTML = "";
                let projectIconLink = document.createElement('img');
                projectIconLink.src = projectIconImage;
                projectIconLink.setAttribute("id", "projectIcon");
                formHeader.appendChild(projectIconLink);
                const title = document.createElement('span');
                title.textContent = "To-Do";
                formHeader.appendChild(title);

                loadProjects();
                loadTasks();
                myform.close;
                modal.style.display = "none";
                return true;
            }
        }, {once : true});

        // Form validation
        function validateForm(e) {
            if (e.submitter.className != "cancelAddTask") {
                const form = e.target;
                var field = Array.from(form.elements);
                // Reset fields
                field.forEach(i => {
                    i.setCustomValidity('');
                    i.parentElement.classList.remove('invalid');
                });

                var todaysDate = new Date().setHours(0,0,0,0);
                var enteredStartDate = new Date(form.taskStartDate.value).setHours(0,0,0,0);
                todaysDate = new Date().setHours(0,0,0,0);
                var enteredDueDate = new Date(form.taskDueDate.value).setHours(0,0,0,0);
                var err = "error";

                // Add extra check for start date after due date
                if (field.name = "taskStartDate" && enteredStartDate > enteredDueDate) {
                    document.getElementById("taskStartDateHelp").innerText = "Start date cannot be later than due date";
                    document.getElementById("taskStartDateDiv").classList.add('invalid');
                    form.taskStartDate.setCustomValidity(err);
                }

                // Add extra check for due date prior to today
                if (field.name = "taskDueDate" && enteredDueDate < todaysDate) {
                    document.getElementById("taskDueDateHelp").innerText = "Due date cannot be earlier than today";
                    document.getElementById("taskDueDateDiv").classList.add('invalid');
                    form.taskDueDate.setCustomValidity(err);
                }

                if (!form.checkValidity() || enteredDueDate < todaysDate) {
                    // Form is invalid - cancel submit
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    // Apply invalid class
                    field.forEach(i => {
                        if (!i.checkValidity()) {
                            // field is invalid - add class
                            i.parentElement.classList.add('invalid');
                        }
                        }
                    );

                    return false;
                }
                return true;
            }
        };
    })

    tasksContainer.appendChild(taskBody);

    // Display tasks for the selected project
    let tasksIndex=0;
    
    for (var i = 0; i < projectsArray.length; i++)  {
        
        // Only select the current project if it has tasks
        if (projectsArray[i].Tasks[tasksIndex] != undefined && projectsArray[i].Name === projectsManager.getCurrentProject()) {

            // Sort the tasks by start date ascending
            projectsArray[i].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));

            // Loop through all tasks for the current project
            for (var x = 0; x < projectsArray[i].Tasks.length; x++)  {
                // Create the main body of the task
                taskBody = document.createElement('div');
                taskBody.classList.add('task');
                taskBody.classList.add(`priority-${projectsArray[i].Tasks[tasksIndex].Priority}`);
                // Set the data index equal to the array counter, and data project equal to the project name
                taskBody.setAttribute('data-index', x);
                taskBody.setAttribute('data-project', `${projectsArray[i].Tasks[tasksIndex].Task_Name}`)
                        
                // Create the task title
                taskTitle = document.createElement('div');
                taskTitle.classList.add('task_title');
                taskTitle.textContent = projectsArray[i].Tasks[tasksIndex].Task_Name;
                taskBody.appendChild(taskTitle);

                // Create the task description
                taskDescription = document.createElement('div');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = projectsArray[i].Tasks[tasksIndex].Description;
                taskBody.appendChild(taskDescription);

                // Create the task start date, format dd/mm/yyyy.
                taskStartDate = document.createElement('div');
                taskStartDate.classList.add('task_start_date');

                let dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Start_Date); 
                let dateYear = format(dateObject, 'yyyy');
                let dateMonth = format(dateObject, 'MM');
                let dateDay = format(dateObject, 'dd');
                let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

                taskStartDate.textContent = dateDMY;
                taskBody.appendChild(taskStartDate);

                // Create the task due date, format dd/mm/yyyy.
                taskDueDate = document.createElement('div');
                taskDueDate.classList.add('task_due_date');

                dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Due_Date); 
                dateYear = format(dateObject, 'yyyy');
                dateMonth = format(dateObject, 'MM');
                dateDay = format(dateObject, 'dd');
                dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

                taskDueDate.textContent = dateDMY;
                taskBody.appendChild(taskDueDate);

                // Create the task completed date, format dd/mm/yyyy.
                taskCompletedDate = document.createElement('div');
                taskCompletedDate.classList.add('task_completed_date');

                // dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Completed_Date);
                taskCompletedDate.textContent = null;
                if (projectsArray[i].Tasks[tasksIndex].Completed_Date !== "") {
                    dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Completed_Date);
                    dateYear = format(dateObject, 'yyyy');
                    dateMonth = format(dateObject, 'MM');
                    dateDay = format(dateObject, 'dd');
                    dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;
                    taskCompletedDate.textContent = dateDMY;
                    taskBody.classList.add('completed');
                }
                taskBody.appendChild(taskCompletedDate);

                // Create the task progress
                taskProgress = document.createElement('div');
                taskProgress.classList.add('task_progress');
                taskProgress.textContent = projectsArray[i].Tasks[tasksIndex].Progress;
                taskBody.appendChild(taskProgress);

                // Create the task ID
                taskIDField = document.createElement('div');
                taskIDField.classList.add('task_progress');
                taskIDField.textContent = projectsArray[i].Tasks[tasksIndex].Task_ID;
                taskBody.appendChild(taskIDField);

                // Add the edit icon.
                let taskEditIcon = document.createElement('img');
                taskEditIcon.classList.add('task_edit');
                taskEditIcon.src = editIcon;
                taskBody.appendChild(taskEditIcon);

                // _____________________________________________________________________________________________________
                // Edit a task
                // _____________________________________________________________________________________________________

                // Add an event listener for the edit icon.
                taskEditIcon.addEventListener("click", e => {

                    // Get the array index of the clicked item
                    var clickedTasksIndex = e.target.parentElement.dataset.index;

                    // Get the modal
                    var modal = document.getElementById("addTaskModal");
                    // Set the modal header
                    var addTaskHeader = document.getElementById("addTaskHeader");
                    addTaskHeader.textContent = "Edit a task";

                    var addButton = document.getElementsByClassName("addTask")[0];
                    addButton.innerHTML = "Edit";

                    // Open the modal
                    modal.style.display = "block";
                    
                    // Clear errors, text and set focus on the project name
                    document.getElementById('taskNameID').focus();

                    var projectID = projectsArray.findIndex(x => x.Name === projectsManager.getCurrentProject());

                    document.getElementById('taskNameID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Task_Name;
                    document.getElementById('taskDescriptionID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Description;
                    document.getElementById('taskPriorityID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Priority;
                    document.getElementById('taskDueDateID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Due_Date;
                    document.getElementById('taskCompletedDateID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Completed_Date;
                    document.getElementById('taskStartDateID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Start_Date;
                    document.getElementById('taskDependenciesID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Dependencies;
                    document.getElementById('taskProgressID').value = projectsArray[projectID].Tasks[clickedTasksIndex].Progress;

                    document.getElementById("taskDueDateHelp").innerText = "Please enter a due date";
                    document.getElementById("taskStartDateHelp").innerText = "Please enter a start date";
                    document.getElementById("taskDueDateDiv").classList.remove('invalid');

                    // Validate the form
                    const myform = document.getElementById('addTask');
                    myform.noValidate = true;
                    myform.reset;

                    // Custom form validation
                    myform.addEventListener('submit', validateForm)

                    // Execute once if validation is OK
                    myform.addEventListener('submit', e => {
                        e.preventDefault();
                        if (e.submitter.className === "cancelAddTask") {
                            myform.close;
                            modal.style.display = "none";
                            return true;
                        } else {      
                            // Actions after form has passed validation....
                            projectsManager.editTask(projectsArray, projectID, clickedTasksIndex, myform.taskName.value, myform.taskDescription.value, 
                                                     myform.taskPriority.value, myform.taskDueDate.value, myform.taskCompletedDate.value, 
                                                     myform.taskStartDate.value, myform.taskDependencies.value, myform.taskProgress.value);

                            // Refresh the form header in order to allow gantt display
                            const formHeader = document.querySelector('#title');
                            formHeader.innerHTML = "";
                            let projectIconLink = document.createElement('img');
                            projectIconLink.src = projectIconImage;
                            projectIconLink.setAttribute("id", "projectIcon");
                            formHeader.appendChild(projectIconLink);
                            const title = document.createElement('span');
                            title.textContent = "To-Do";
                            formHeader.appendChild(title);

                            loadProjects();
                            loadTasks();
                            myform.close;
                            modal.style.display = "none";
                            return true;
                        }
                    }, {once : true});

                    // Form validation
                    function validateForm(e) {
                        if (e.submitter.className != "cancelAddTask") {
                            const form = e.target;
                            var field = Array.from(form.elements);
                            // Reset fields
                            field.forEach(i => {
                                i.setCustomValidity('');
                                i.parentElement.classList.remove('invalid');
                            });

                            // Add extra check for start date after due date
                            var enteredDueDate = new Date(form.taskDueDate.value).setHours(0,0,0,0);
                            var enteredStartDate = new Date(form.taskStartDate.value).setHours(0,0,0,0);
                            var err = "error";

                            if (field.name = "taskStartDate" && enteredStartDate > enteredDueDate) {
                                document.getElementById("taskStartDateHelp").innerText = "Start date cannot be later than due date";
                                document.getElementById("taskStartDateDiv").classList.add('invalid');
                                form.taskStartDate.setCustomValidity(err);
                            }

                            // *** Don't check for due date prior to today when editing, only when adding ***

                            // Add extra check for due date prior to today
                            // var todaysDate = new Date().setHours(0,0,0,0);
                            // var enteredDueDate = new Date(form.taskDueDate.value).setHours(0,0,0,0);
                            // var err = "error";

                            // if (field.name = "taskDueDate" && enteredDueDate < todaysDate) {
                            //     document.getElementById("taskDueDateHelp").innerText = "Due date cannot be earlier than today";
                            //     document.getElementById("taskDueDateDiv").classList.add('invalid');
                            //     form.taskDueDate.setCustomValidity(err);
                            // }

                            // if (!form.checkValidity() || enteredDueDate < todaysDate) {
                            if (!form.checkValidity()) {
                                // Form is invalid - cancel submit
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                // Apply invalid class
                                field.forEach(i => {
                                    if (!i.checkValidity()) {
                                        // field is invalid - add class
                                        i.parentElement.classList.add('invalid');
                                    }
                                    }
                                );

                                return false;
                            }
                            return true;
                        }
                    };
                })

                // Add the delete icon.
                let taskDeleteIcon = document.createElement('img');
                taskDeleteIcon.classList.add('task_delete');
                taskDeleteIcon.src = deleteIcon;
                taskBody.appendChild(taskDeleteIcon);

                let projectID = projectsArray[i].ID;
                let taskID = projectsArray[i].Tasks[tasksIndex].Task_ID;
                let taskName = projectsArray[i].Tasks[tasksIndex].Task_Name;

                // _____________________________________________________________________________________________________
                // Delete a task
                // _____________________________________________________________________________________________________

                taskDeleteIcon.addEventListener("click", e => {
                    // Get the modal
                    var modal = document.getElementById("deleteTaskModal");
                    // Get the modal header
                    var deleteProjectHeader = document.getElementById("deleteTaskHeader");
                    deleteProjectHeader.textContent = `${taskName}`;
                    // Get the Cancel and Delete buttons.
                    var cancelButton = document.getElementsByClassName("cancelDeleteTask")[0];
                    var deleteButton = document.getElementsByClassName("deleteTask")[0];
                    // Open the modal
                    modal.style.display = "block";
                    // When the user clicks on Cancel, close the modal
                    cancelButton.onclick = function() {
                        modal.style.display = "none";
                        return;
                    }
                    // When the user clicks on Delete, delete the task
                    deleteButton.onclick = function() {
                        projectsManager.deleteCurrentTask(projectsArray, projectID, taskID);

                        // Refresh the form header in order to allow gantt display
                        const formHeader = document.querySelector('#title');
                        formHeader.innerHTML = "";
                        let projectIconLink = document.createElement('img');
                        projectIconLink.src = projectIconImage;
                        projectIconLink.setAttribute("id", "projectIcon");
                        formHeader.appendChild(projectIconLink);
                        const title = document.createElement('span');
                        title.textContent = "To-Do";
                        formHeader.appendChild(title);

                        loadProjects();
                        loadTasks();
                        modal.style.display = "none";
                    }
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
