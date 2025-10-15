import {format} from "date-fns"

// set to the "default" project on load
let currentProject = "Default";

const projectsArray = [
    {Name: 'Default', ID: 1, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the default project", Priority: "Low"}]},
    {Name: 'Work', ID: 2, Tasks: [{Task_ID: 1, Task_Name: "Test", Description: "Sample task for the work project", Priority: "Low"}]},
    {Name: 'Car', ID: 3, Tasks: [{Task_ID: 1, Task_Name: "Service", Description: "Book service for December", Priority: "Low"},
                                 {Task_ID: 2, Task_Name: "Dash-Cam", Description: "Check dash-cams with main dealer", Priority: "Medium"}
                                ]}
]

// Sort the array by project name
projectsArray.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));

if (!localStorage.getItem('projects')) {
    // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    // projectsArray.Car.push(projectsManager.createTask("1", "Service", "Book service for December", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("2", "Dash-Cam", "Check dash-cams with main dealer", "Medium", "2025-11-31", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("3", "Wash", "Wash exterior", "Low", "2025-10-20", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("4", "Vacuum", "Vacuum interior and boot", "Low", "2025-10-28", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("5", "Clean windows", "Use elbow grease window cleaner", "Low", "2025-10-29", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("6", "Air Freshener", "Check and replace air freshener if necessary", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("7", "Fuel", "Check local prices and fill tank at cheapest", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("8", "Speech recognition", "Check how to start, end and use speech recognition system", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("9", "Task 9", "Task 9 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("10", "Task 10", "Task 10 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
    // projectsArray.Car.push(projectsManager.createTask("11", "Task 11", "Task 11 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));

    // projectsArray.Default.push(projectsManager.createTask("1", "Sample", "Sample task for Default project", "Low", "2025-12-31", 1, "", "2025-10-07", 1));

    localStorage.setItem('projects', JSON.stringify(projectsArray));
}

// Projects data manager 
const projectsManager = (function () {

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
        // console.log("Current folder is", getCurrentProject());
        loadTasks();
    }

    // Get currentProject
    function getCurrentProject() {
        return currentProject;
    }

    // Create a new task for the current project
    function createTask(projectIndex, ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number) {
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority, });
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority, });
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority, });
        localStorage.setItem('projects', JSON.stringify(projectsArray));
        return
    }

    // // To-do factory function
    // // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    // // function createToDo(name, priority, date, details, project, checked=false) {
    // function createToDo(ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number) {
    //     return {
    //         ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    //     }
    // }

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
projectsManager.createTask(0, "9", "Push Test", "Sample pushed task", "Low", "2025-10-30", 6, "", "2025-10-07", 1);

export function loadProjects() {
// // Retrieve project data from local storage if it exists, otherwise create new sample projects
//     let projectsArray = JSON.parse(localStorage.getItem('projects')) || {
//          'Default': [] ,
//          'Work': [] ,
//          'Health and Fitness': [] ,
//          'Gym': [] ,
//          'Finance': [] ,
//          'Car': [] ,
//          'GP': [] ,
//          'Food': [] ,
//          'PC': [] ,
//          'Javascript': [] ,
//          'HTML': [] ,
//          'CSS': []
//     }

//     // console.log(projectsArray);
    
//     if (!localStorage.getItem('projects')) {

//         // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
//         projectsArray.Car.push(projectsManager.createToDo("1", "First task", "Book service for December", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("2", "Dash-Cam", "Check dash-cams with main dealer", "Medium", "2025-11-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("3", "Wash", "Wash exterior", "Low", "2025-10-20", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("4", "Vacuum", "Vacuum interior and boot", "Low", "2025-10-28", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("5", "Clean windows", "Use elbow grease window cleaner", "Low", "2025-10-29", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("6", "Air Freshener", "Check and replace air freshener if necessary", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("7", "Fuel", "Check local prices and fill tank at cheapest", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("8", "Speech recognition", "Check how to start, end and use speech recognition system", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("9", "Task 9", "Task 9 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("10", "Task 10", "Task 10 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));
//         projectsArray.Car.push(projectsManager.createToDo("11", "Task 11", "Task 11 detail", "Low", "2025-10-30", 6, "", "2025-10-07", 1));

//         projectsArray.Default.push(projectsManager.createToDo("1", "Sample", "Sample task for Default project", "Low", "2025-12-31", 1, "", "2025-10-07", 1));

//         // Sort the array by name
//         projectsArray.sort;
//         console.log(projectsArray);

//         localStorage.setItem('projects', JSON.stringify(projectsArray));

//     }

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

    for (let i = 0; i < projectsArray.length; i++) {
        let li = document.createElement('li');
        li.innerText = projectsArray[i].Name;
        list.appendChild(li);

        li.addEventListener("click", e => {
            let lists = document.querySelectorAll("li");
            lists.forEach((li) => li.style.color = "black");
            // Set selected font colour to blue.
            li.style.color = "blue";
            projectsManager.changeFolder(e, projectsArray[i].Name);
        })
    }

    // for (const project in projectsObject) {
    //     let li = document.createElement('li');
    //     li.innerText = project;
    //     list.appendChild(li);
    //     li.addEventListener("click", e => {
    //         let lists = document.querySelectorAll("li");
    //         lists.forEach((li) => li.style.color = "black");
    //         // Set selected font colour to blue.
    //         li.style.color = "blue";
    //         projectsManager.changeFolder(e, projectsArray[project]);
    //     })
    // }
        
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
                // li.addEventListener("click", e => {
                //     let lists = document.querySelectorAll("li");
                //     lists.forEach((li) => li.style.color = "black");
                //     // Set selected font colour to blue.
                //     li.style.color = "blue";
                //     projectsManager.changeFolder(e, projectsArray[project]);
                // })
                taskBody.appendChild(taskTitle);

                // // Create the task description
                taskDescription = document.createElement('div');
                taskDescription.classList.add('task_description');
                taskDescription.textContent = projectsArray[i].Tasks[tasksIndex].Description;
                taskBody.appendChild(taskDescription);

                // // Create the task due date, format dd/mm/yyyy.
                taskDueDate = document.createElement('div');
                taskDueDate.classList.add('task_due_date');

                // let dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Due_Date);
                // console.log(projectsArray[i].Tasks[tasksIndex].Due_Date);
                // let dateYear = format(dateObject, 'yyyy');
                // let dateMonth = format(dateObject, 'MM');
                // let dateDay = format(dateObject, 'dd');
                // let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

                // taskDueDate.textContent = dateDMY;
                taskDueDate.textContent = "31/10/2025";
                taskBody.appendChild(taskDueDate);

                // // Create the task completed date, format dd/mm/yyyy.
                taskCompletedDate = document.createElement('div');
                taskCompletedDate.classList.add('task_completed_date');

            //     let dateObject = new Date(projectsArray[i].Tasks[tasksIndex].Completed_Date);
            //     if (!dateObject === null) {
            //     dateObject = new Date(tasksArray[i].Completed_Date);
            //     dateYear = format(dateObject, 'yyyy');
            //     dateMonth = format(dateObject, 'MM');
            //     dateDay = format(dateObject, 'dd');
            //     dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;
            //     taskCompletedDate.textContent = dateDMY;
            //     }
                taskCompletedDate.textContent = null;
                taskBody.appendChild(taskCompletedDate);

                tasksContainer.appendChild(taskBody);
                
                tasksIndex++;
            }
        }

    }

    // const projectsObject = Object.assign({}, JSON.parse(localStorage.getItem('projects')));
    
    // // grab relevant todo items
    // // projectsManager.changeCurrentProject("Default");
    // const toDoList = projectsObject[projectsManager.getCurrentProject()];
    // // console.log(projectsManager.getCurrentProject());

    // for (const task in toDoList) {
    //     // Create the main body of the task
    //     taskBody = document.createElement('div');
    //     taskBody.classList.add('task');
    //     taskBody.classList.add(`priority-${toDoList[task].Priority}`);
    //     // Set the data index equal to the array counter, and data project equal to the project name
    //     taskBody.setAttribute('data-index', task);
    //     taskBody.setAttribute('data-project', `${toDoList[task].Name}`)
                
    //     // Create the task title
    //     taskTitle = document.createElement('div');
    //     taskTitle.classList.add('task_title');
    //     taskTitle.textContent = toDoList[task].Name;
    //     // li.addEventListener("click", e => {
    //     //     let lists = document.querySelectorAll("li");
    //     //     lists.forEach((li) => li.style.color = "black");
    //     //     // Set selected font colour to blue.
    //     //     li.style.color = "blue";
    //     //     projectsManager.changeFolder(e, projectsArray[project]);
    //     // })
    //     taskBody.appendChild(taskTitle);

    //     // Create the task description
    //     taskDescription = document.createElement('div');
    //     taskDescription.classList.add('task_description');
    //     taskDescription.textContent = toDoList[task].Description;
    //     taskBody.appendChild(taskDescription);

    //     // Create the task due date, format dd/mm/yyyy.
    //     taskDueDate = document.createElement('div');
    //     taskDueDate.classList.add('task_due_date');

    //     // let dateObject = new Date(toDoList[task].Due_Date);
    //     // let dateYear = format(dateObject, 'yyyy');
    //     // let dateMonth = format(dateObject, 'MM');
    //     // let dateDay = format(dateObject, 'dd');
    //     // let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

    //     // taskDueDate.textContent = dateDMY;
    //     taskDueDate.textContent = "31/10/2025";
    //     taskBody.appendChild(taskDueDate);

    //     // Create the task completed date, format dd/mm/yyyy.
    //     taskCompletedDate = document.createElement('div');
    //     taskCompletedDate.classList.add('task_completed_date');

    // //     taskCompletedDate.textContent = "";
    // //     if (!dateObject === null) {
    // //     dateObject = new Date(tasksArray[i].Completed_Date);
    // //     dateYear = format(dateObject, 'yyyy');
    // //     dateMonth = format(dateObject, 'MM');
    // //     dateDay = format(dateObject, 'dd');
    // //     dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;
    // //     taskCompletedDate.textContent = dateDMY;
    // //     }
    //     taskCompletedDate.textContent = null;
    //     taskBody.appendChild(taskCompletedDate);

    //     tasksContainer.appendChild(taskBody);

    // }

    return;
}

export function createProject() {

}

export function deleteProject() {

}
