import {format} from "date-fns"
// import { el } from "date-fns/locale";

export function loadTasks() {

    const tasksArray = [
        { ID: 1, Name: 'First task', Description: 'Book service for December', Priority: "Low", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 1 },
        { ID: 2, Name: 'Task 2', Description: 'Check dash-cams with main dealer', Priority: "Medium", Due_Date: "2025-11-31", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 2 },
        { ID: 3, Name: 'Task 3', Description: 'Wash', Priority: "High", Due_Date: "2025-10-20", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 3 },
        { ID: 4, Name: 'Task 4', Description: 'Vacuum interior', Priority: "Low", Due_Date: "2025-10-28", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 4 },
        { ID: 5, Name: 'Task 5', Description: 'Clean windows', Priority: "Low", Due_Date: "2025-10-29", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 5 },
        { ID: 6, Name: 'Task 6', Description: 'Air freshener', Priority: "Low", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 6 },
        { ID: 7, Name: 'Task 7', Description: 'Task 7', Priority: "High", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 7 },
        { ID: 8, Name: 'Task 8', Description: 'Task 8', Priority: "Low", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 8 },
        { ID: 9, Name: 'Task 9', Description: 'Task 9', Priority: "Low", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 9 },
        { ID: 10, Name: 'Task 10', Description: 'Task 10', Priority: "Medium", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 10 },
        { ID: 11, Name: 'Task 11', Description: 'Task 11', Priority: "Medium", Due_Date: "2025-10-30", Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 11 },
    ]    

    // Sort the array by sequence number
    tasksArray.sort(function(a, b){
        let x = a.Sequence_Number;
        let y = b.Sequence_Number;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }); 

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



    for (let i = 0; i < tasksArray.length; ++i) {

        // Create the main body of the task
        taskBody = document.createElement('div');
        taskBody.classList.add('task');
        taskBody.classList.add(`priority-${tasksArray[i].Priority}`);
        // Set the data index equal to the array counter, and data project equal to the project name
        taskBody.setAttribute('data-index', i);
        taskBody.setAttribute('data-project', `${tasksArray[i].Name}`)
            
        // Create the task title
        taskTitle = document.createElement('div');
        taskTitle.classList.add('task_title');
        taskTitle.textContent = tasksArray[i].Name;
        taskBody.appendChild(taskTitle);

        // Create the task description
        taskDescription = document.createElement('div');
        taskDescription.classList.add('task_description');
        taskDescription.textContent = tasksArray[i].Description;
        taskBody.appendChild(taskDescription);

        // Create the task due date, format dd/mm/yyyy.
        taskDueDate = document.createElement('div');
        taskDueDate.classList.add('task_due_date');

        let dateObject = new Date(tasksArray[i].Due_Date);
        let dateYear = format(dateObject, 'yyyy');
        let dateMonth = format(dateObject, 'MM');
        let dateDay = format(dateObject, 'dd');
        let dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;

        taskDueDate.textContent = dateDMY;
        taskBody.appendChild(taskDueDate);

        // Create the task completed date, format dd/mm/yyyy.
        taskCompletedDate = document.createElement('div');
        taskCompletedDate.classList.add('task_completed_date');

        taskCompletedDate.textContent = "";
        if (!dateObject === null) {
        dateObject = new Date(tasksArray[i].Completed_Date);
        dateYear = format(dateObject, 'yyyy');
        dateMonth = format(dateObject, 'MM');
        dateDay = format(dateObject, 'dd');
        dateDMY = `${dateDay}/${dateMonth}/${dateYear}`;
        taskCompletedDate.textContent = dateDMY;
        }
        taskBody.appendChild(taskCompletedDate);

        tasksContainer.appendChild(taskBody);

    }

    return;
}

export function createTask() {

}

export function deleteTask() {

}