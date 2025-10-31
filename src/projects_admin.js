// Projects data manager 
export const projectsManager = (function () {

    // set to the default project on load
    let currentProject = " Default";

    // Check for clicks on the projects list
    function changeProject(e, project) {
        // Set the current project to the li item that was clicked
        currentProject = e.target.textContent;
    }

    // Get currentProject
    function getCurrentProject() {
        return currentProject;
    }

    // Create a new sample task for the current project
    function createSampleTask(projectsArray, projectIndex, ID, Name, Description, Priority, Due_Date, Completed_Date, Created_Date, Start_Date, Dependencies, Progress) {
        
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority,
                                                Due_Date: Due_Date, Completed_Date: Completed_Date, Created_Date: Created_Date, Start_Date: Start_Date, 
                                                Dependencies: Dependencies, Progress: Progress});
        // Sort the tasks by start date ascending
        projectsArray[projectIndex].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));
        localStorage.setItem('projects', JSON.stringify(projectsArray));
        return
    }

    // Delete the current project
    function deleteCurrentProject(projectsArray, projectID) {
        // Delete the project with the ID matching the one passed in the function parameters.
        projectsArray = projectsArray.filter(a => a.ID != projectID);
        localStorage.setItem('projects', JSON.stringify(projectsArray));
        currentProject = " Default";
    }

    // Delete the current task
    function deleteCurrentTask(projectsArray, projectID, taskID) {
        // Delete the task with the project ID and Task_ID matching those passed in the function parameters.
        projectsArray.forEach(function(a) {
            if (a.ID === projectID) {
                a.Tasks = a.Tasks.filter(b => b.Task_ID != taskID);
            }
        });
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    // Add a project
    function addProject(projectsArray, newProject) {
        // Get highest ID and add 1 to it
        let maxID = projectsArray.reduce((max, project) => max.ID > project.ID ? max : project).ID + 1;
        // Add the new project to projectsArray
        projectsArray.push({Name: newProject, ID: maxID, Tasks: []});
        projectsArray.sort((a, b) => ("" + a.Name).localeCompare(b.Name, undefined, {numeric: true}));
        localStorage.setItem('projects', JSON.stringify(projectsArray));
        currentProject = newProject;
    }

    // Edit a project
    function editProject(projectsArray, newName, oldName) {
        const index = projectsArray.findIndex(x => x.Name === oldName);
        // Only edit the array if the project is found.
        if (index > -1) {
            projectsArray[index].Name = newName;
            // Sort the array by project name
            projectsArray.sort((a, b) => ("" + a.Name).localeCompare(b.Name, undefined, {numeric: true}));
            // Sort the tasks by start date ascending
            projectsArray[index].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));
            localStorage.setItem('projects', JSON.stringify(projectsArray));
            currentProject = newName;
        }
    }

    // Add a task
    function addTask(projectsArray, ProjectID, taskName, taskDescription, taskPriority, taskDueDate, taskCompletedDate, taskCreatedDate, taskStartDate, taskDependencies, taskProgress) {
        // Get highest ID and add 1 to it
        if (projectsArray[ProjectID].Tasks[0] === undefined) {
            var maxID = 0
        } else {
            maxID = projectsArray[ProjectID].Tasks.reduce((max, task) => max.Task_ID > task.Task_ID ? max : task).Task_ID + 1;
        }
        // Add the new task to projectsArray
        projectsArray[ProjectID].Tasks.push({Task_ID: maxID, Task_Name: taskName, Description: taskDescription, Priority: taskPriority,
                                             Due_Date: taskDueDate, Completed_Date: taskCompletedDate, Created_Date: taskCreatedDate, Start_Date: taskStartDate, 
                                             Dependencies: taskDependencies, Progress: taskProgress});
        projectsArray[ProjectID].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    // Edit a task
    function editTask(projectsArray, ProjectID, taskIndex, taskName, taskDescription, taskPriority, taskDueDate, taskCompletedDate, taskStartDate, taskDependencies, taskProgress) {
        // Edit the task in projectsArray
        projectsArray[ProjectID].Tasks[taskIndex].Task_Name = taskName;
        projectsArray[ProjectID].Tasks[taskIndex].Description = taskDescription;
        projectsArray[ProjectID].Tasks[taskIndex].Priority = taskPriority;
        projectsArray[ProjectID].Tasks[taskIndex].Due_Date = taskDueDate;
        projectsArray[ProjectID].Tasks[taskIndex].Completed_Date = taskCompletedDate;
        projectsArray[ProjectID].Tasks[taskIndex].Start_Date = taskStartDate;
        projectsArray[ProjectID].Tasks[taskIndex].Dependencies = taskDependencies;
        projectsArray[ProjectID].Tasks[taskIndex].Progress = taskProgress;
        // Sort the array by project name
        projectsArray.sort((a, b) => ("" + a.Name).localeCompare(b.Name, undefined, {numeric: true}));
        // Sort the tasks by start date ascending
        projectsArray[ProjectID].Tasks.sort((a, b) => new Date(a.Start_Date) - new Date(b.Start_Date));        
        localStorage.setItem('projects', JSON.stringify(projectsArray));
    }

    return {
        changeProject,
        getCurrentProject,
        createSampleTask,
        deleteCurrentProject,
        deleteCurrentTask,
        addProject,
        editProject,
        addTask,
        editTask
    }
})();

