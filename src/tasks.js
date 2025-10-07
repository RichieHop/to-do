export function loadTasks() {

    const tasksArray = [
        { ID: 1, Name: 'Task 1', Description: 'Task 1', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 1 },
        { ID: 2, Name: 'Task 2', Description: 'Task 2', Priority: "Medium", Due_Date: 31/11/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 2 },
        { ID: 3, Name: 'Task 3', Description: 'Task 3', Priority: "High", Due_Date: 20/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 3 },
        { ID: 4, Name: 'Task 4', Description: 'Task 4', Priority: "Low", Due_Date: 28/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 4 },
        { ID: 5, Name: 'Task 5', Description: 'Task 5', Priority: "Low", Due_Date: 29/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 5 },
        { ID: 6, Name: 'Task 6', Description: 'Task 6', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 6 },
        { ID: 7, Name: 'Task 7', Description: 'Task 7', Priority: "High", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 7 },
        { ID: 8, Name: 'Task 8', Description: 'Task 8', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 8 },
        { ID: 9, Name: 'Task 9', Description: 'Task 9', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 9 },
        { ID: 10, Name: 'Task 10', Description: 'Task 10', Priority: "Medium", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 10 },
        { ID: 11, Name: 'Task 11', Description: 'Task 11', Priority: "Medium", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 11 },
    ]    

    // Sort the array by name
    tasksArray.sort(function(a, b){
        let x = a.Sequence_Number;
        let y = b.Sequence_Number;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }); 

    const tasks = document.querySelector('#tasks');
    tasks.innerHTML = '';

    const tasksUL = document.createElement('ul');
    tasksUL.setAttribute("id", "tasksList");
    tasks.appendChild(tasksUL);

    let list = document.getElementById("tasksList");

    for (let i = 0; i < tasksArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = tasksArray[i].Name;
        list.appendChild(li);
    }

    // const menu = document.querySelector('#projects');
    // menu.innerHTML = '';

    // const title = document.createElement('p');
    // title.textContent = 'Tasks';

    // content.appendChild(title);

    return;
}

export function createTask() {

}

export function deleteTask() {

}