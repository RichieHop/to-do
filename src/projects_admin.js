// Projects data manager 
export const projectsManager = (function () {

    // set to the "default" project on load
    let currentProject = "Default";

    // Check for clicks on the projects list
    function changeProject(e, project) {
        // Set the current folder to the li item that was clicked
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
                                      Due_Date: "2025-10-22", Completed_Date: "", Created_Date: "2025-10-01"});
        projectsArray[projectIndex].Tasks.push({Task_ID: 6, Task_Name: "Test 3", Description: "Sample 3", Priority: "Low",
                                      Due_Date: "2025-10-23", Completed_Date: "", Created_Date: "2025-10-01"});

        localStorage.setItem('projects', JSON.stringify(projectsArray));

        return
    }

    // Delete the current project
    function deleteCurrentProject(projectsArray, projectID) {
        // const index = projectsArray.findIndex(x => x.Name === project);
        // Only splice array if item is found.
        // if (index > -1) {
        //     projectsArray.splice(index, 1);
        //     localStorage.setItem('projects2', JSON.stringify(projectsArray));
        // }
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

    return {
        changeProject,
        getCurrentProject,
        createTask,
        deleteCurrentProject,
        deleteCurrentTask
    }
})();

