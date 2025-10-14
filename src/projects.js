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

    // console.log(projectsArray);
    
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

    projectsArray.Default.push(projectsManager.createToDo("1", "Sample", "Sample task for Default project", "Low", "2025-12-31", 1, "", "2025-10-07", 1));

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
        // li.addEventListener('click', e => projectsManager.changeFolder(e, projectsArray[project]));
        li.addEventListener("click", e => {
            let lists = document.querySelectorAll("li");
            lists.forEach((li) => li.style.color = "black");
            // Set selected font colour to blue.
            li.style.color = "blue";
            projectsManager.changeFolder(e, projectsArray[project]);
        })
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

    const projectsObject = Object.assign({}, JSON.parse(localStorage.getItem('projects')));
    
    // grab relevant todo items
    // projectsManager.changeCurrentProject("Default");
    const toDoList = projectsObject[projectsManager.getCurrentProject()];
    // console.log(projectsManager.getCurrentProject());

    for (const task in toDoList) {
        // Create the main body of the task
        taskBody = document.createElement('div');
        taskBody.classList.add('task');
        taskBody.classList.add(`priority-${toDoList[task].Priority}`);
        // Set the data index equal to the array counter, and data project equal to the project name
        taskBody.setAttribute('data-index', task);
        taskBody.setAttribute('data-project', `${toDoList[task].Name}`)
                
        // Create the task title
        taskTitle = document.createElement('div');
        taskTitle.classList.add('task_title');
        taskTitle.textContent = toDoList[task].Name;
        // li.addEventListener("click", e => {
        //     let lists = document.querySelectorAll("li");
        //     lists.forEach((li) => li.style.color = "black");
        //     // Set selected font colour to blue.
        //     li.style.color = "blue";
        //     projectsManager.changeFolder(e, projectsArray[project]);
        // })
        taskBody.appendChild(taskTitle);

        // Create the task description
        taskDescription = document.createElement('div');
        taskDescription.classList.add('task_description');
        taskDescription.textContent = toDoList[task].Description;
        taskBody.appendChild(taskDescription);

        // Create the task due date, format dd/mm/yyyy.
        taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task_due_date');

        // let dateObject = new Date(toDoList[task].Due_Date);
        // let dateYear = format(dateObject, 'yyyy');
        // let dateMonth = format(dateObject, 'MM');
        // let dateDay = format(dateObject, 'dd');
        // let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

        // taskDueDate.textContent = dateDMY;
        taskDueDate.textContent = "31/10/2025";
        taskBody.appendChild(taskDueDate);

        // Create the task completed date, format dd/mm/yyyy.
        taskCompletedDate = document.createElement('div');
        taskCompletedDate.classList.add('task_completed_date');

    //     taskCompletedDate.textContent = "";
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

    }

    return;
}

export function createProject() {

}

export function deleteProject() {

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

    // To-do factory function
    // ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
    // function createToDo(name, priority, date, details, project, checked=false) {
    function createToDo(ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number) {
        return {
            ID, Name, Description, Priority, Due_Date, Project_ID, Completed_Date, Created_Date, Sequence_Number
        }
    }

    return {
        changeCurrentProject,
        changeFolder,
        getCurrentProject,
        createToDo
        // addNewToDo,
        // editToDo,
        // deleteToDo,
        // addNewProject,
        // checkEmptyProject
    }
})();

