export function loadTasks() {

    const tasksArray = [
        { ID: 1, Name: 'First task', Description: 'Book service for December', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 1 },
        { ID: 2, Name: 'Task 2', Description: 'Check dash-cams with main dealer', Priority: "Medium", Due_Date: 31/11/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 2 },
        { ID: 3, Name: 'Task 3', Description: 'Wash', Priority: "High", Due_Date: 20/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 3 },
        { ID: 4, Name: 'Task 4', Description: 'Vacuum interior', Priority: "Low", Due_Date: 28/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 4 },
        { ID: 5, Name: 'Task 5', Description: 'Clean windows', Priority: "Low", Due_Date: 29/10/2025, Project_ID: 6, Completed_Date: null, 
            Created_Date: 7/10/2025, Sequence_Number: 5 },
        { ID: 6, Name: 'Task 6', Description: 'Air freshener', Priority: "Low", Due_Date: 30/10/2025, Project_ID: 6, Completed_Date: null, 
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

    for (let i = 0; i < tasksArray.length; ++i) {

        // Create the main body of the task
        const toDoBody = document.createElement('div');
        toDoBody.classList.add('todo');
        toDoBody.classList.add(`priority-${tasksArray[i].Priority}`);
        // Set the data index equal to the array counter, and data project equal to the project name
        toDoBody.setAttribute('data-index', i);
        toDoBody.setAttribute('data-project', `${tasksArray[i].Name}`)
            
        // Create the task title
        const toDoTitle = document.createElement('div');
        toDoTitle.classList.add('todo_title');
        toDoTitle.textContent = tasksArray[i].Name;
        toDoBody.appendChild(toDoTitle);

        // Create the task description
        const toDoDescription = document.createElement('div');
        toDoDescription.classList.add('todo_description');
        toDoDescription.textContent = tasksArray[i].Description;
        toDoBody.appendChild(toDoDescription);

        // Create the task due date, format dd/mm/yyyy.
        const toDoDate = document.createElement('div');
        toDoDate.classList.add('todo_date');

        // const dateObject = new Date(tasksArray[i].Due_Date);
        // const dateMonth = format(dateObject, 'MMM');
        // const dateDay = format(dateObject, 'do');
        // const dateFormated = `${dateMonth} ${dateDay}`;

        // toDoDate.textContent = dateFormated;
        // toDoDate.textContent = datestring;
        // toDoDate.textContent = tasksArray[i].Due_Date;

        let date = new Date(tasksArray[i].Due_Date);
        // console.log(date);
        let year = Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        let month = Intl.DateTimeFormat('en', { month: 'short' }).format(date);
        let day = Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        let formattedDate = (`${day}-${month}-${year}`);
        // console.log(formattedDate);
        toDoDate.textContent = formattedDate;
        toDoBody.appendChild(toDoDate);

        tasks.appendChild(toDoBody);

    }

    return;
}

export function createTask() {

}

export function deleteTask() {

}