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

    // Create a new task for the current project
    function createTask(projectsArray, projectIndex, ID, Name, Description, Priority, Due_Date, Completed_Date, Created_Date) {
        
        projectsArray[projectIndex].Tasks.push({Task_ID: ID, Task_Name: Name, Description: Description, Priority: Priority,
                                      Due_Date: Due_Date, Completed_Date: Completed_Date, Created_Date: Created_Date});
        // Add 3 additional tasks manually (don't use passed parameters)
        projectsArray[projectIndex].Tasks.push({Task_ID: 4, Task_Name: "Test 1", Description: "Sample 1", Priority: "Low",
                                      Due_Date: "2025-10-21", Completed_Date: "", Created_Date: "2025-10-01"});
        projectsArray[projectIndex].Tasks.push({Task_ID: 5, Task_Name: "Test 2", Description: "Sample 2", Priority: "High",
                                      Due_Date: "2025-10-22", Completed_Date: "2025-10-19", Created_Date: "2025-10-01"});
        projectsArray[projectIndex].Tasks.push({Task_ID: 6, Task_Name: "Test 3", Description: "Sample 3", Priority: "Low",
                                      Due_Date: "2025-10-23", Completed_Date: "", Created_Date: "2025-10-01"});

        localStorage.setItem('projects', JSON.stringify(projectsArray));

        return
    }

    // Delete the current project
    function deleteCurrentProject(projectsArray, projectID) {
        // Delete the project with the ID matching the one passed in the function parameters.
        projectsArray = projectsArray.filter(a => a.ID != projectID);
        localStorage.setItem('projects', JSON.stringify(projectsArray));
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
    }

    // Edit a project
    function editProject(projectsArray, newName, oldName) {
        const index = projectsArray.findIndex(x => x.Name === oldName);
        // Only edit the array if the project is found.
        if (index > -1) {
            projectsArray[index].Name = newName;
        }
    }

    // Add a task
    function addTask(projectsArray, ProjectID, taskName, taskDescription, taskPriority, taskDueDate, taskCompletedDate) {
        // Get highest ID and add 1 to it
        if (projectsArray[ProjectID].Tasks[0] === undefined) {
            var maxID = 0
        } else {
            maxID = projectsArray[ProjectID].Tasks.reduce((max, task) => max.Task_ID > task.Task_ID ? max : task).Task_ID + 1;
        }
        // Add the new task to projectsArray
        projectsArray[ProjectID].Tasks.push({Task_ID: maxID, Task_Name: taskName, Description: taskDescription, Priority: taskPriority,
                                      Due_Date: taskDueDate, Completed_Date: taskCompletedDate, Created_Date: ""});
    }

    // Edit a task
    function editTask(projectsArray, ProjectID, taskIndex, taskName, taskDescription, taskPriority, taskDueDate, taskCompletedDate) {
        // Edit the task in projectsArray
        projectsArray[ProjectID].Tasks[taskIndex].Task_Name = taskName;
        projectsArray[ProjectID].Tasks[taskIndex].Description = taskDescription;
        projectsArray[ProjectID].Tasks[taskIndex].Priority = taskPriority;
        projectsArray[ProjectID].Tasks[taskIndex].Due_Date = taskDueDate;
        projectsArray[ProjectID].Tasks[taskIndex].Completed_Date = taskCompletedDate;
    }

    return {
        changeProject,
        getCurrentProject,
        createTask,
        deleteCurrentProject,
        deleteCurrentTask,
        addProject,
        editProject,
        addTask,
        editTask
    }
})();

