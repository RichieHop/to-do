export function loadProjects() {

    const projectsArray = [
        { ID: 1, Name: 'Default', Description: 'Default project' },
        { ID: 2, Name: 'Work', Description: 'Work-based tasks' },
        { ID: 3, Name: 'Health and Fitness', Description: 'Health and fitness tasks' },
        { ID: 4, Name: 'Gym', Description: 'Gym tasks, sub-project of Health and Fitness' },
        { ID: 5, Name: 'Finance', Description: 'Finance project' },
        { ID: 6, Name: 'Car', Description: 'Car tasks' },
        { ID: 7, Name: 'GP', Description: 'GP tasks' },
        { ID: 8, Name: 'Food', Description: 'Food project' },
        { ID: 9, Name: 'PC', Description: 'PC tasks' },
        { ID: 10, Name: 'Javascript', Description: 'WJavascript tasks' },
        { ID: 11, Name: 'HTML', Description: 'HTML tasks' },
        { ID: 12, Name: 'CSS', Description: 'CSS tasks' }
        // { ID: 13, Name: 'Default', Description: 'Default project' },
        // { ID: 14, Name: 'Work', Description: 'Work-based tasks' },
        // { ID: 15, Name: 'Health and Fitness', Description: 'Health and fitness tasks' },
        // { ID: 16, Name: 'Gym', Description: 'Gym tasks, sub-project of Health and Fitness' },
        // { ID: 17, Name: 'Default', Description: 'Default project' },
        // { ID: 18, Name: 'Work', Description: 'Work-based tasks' },
        // { ID: 19, Name: 'Health and Fitness', Description: 'Health and fitness tasks' },
        // { ID: 20, Name: 'Gym', Description: 'Gym tasks, sub-project of Health and Fitness' },
        // { ID: 21, Name: 'Default', Description: 'Default project' },
        // { ID: 22, Name: 'Work', Description: 'Work-based tasks' },
        // { ID: 23, Name: 'Health and Fitness', Description: 'Health and fitness tasks' },
        // { ID: 24, Name: 'Gym', Description: 'Gym tasks, sub-project of Health and Fitness' }
    ]    

    // Sort the array by name
    projectsArray.sort(function(a, b){
        let x = a.Name.toLowerCase();
        let y = b.Name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    }); 

    const projects = document.querySelector('#projects');
    projects.innerHTML = '';

    const projectsUL = document.createElement('ul');
    projectsUL.setAttribute("id", "projectsList");
    projects.appendChild(projectsUL);

    let list = document.getElementById("projectsList");

    for (let i = 0; i < projectsArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = projectsArray[i].Name;
        list.appendChild(li);
    }

    // let table = document.querySelector("table");
    // let data = Object.keys(projectsArray[0]);
    // generateTable(table, projectsArray);
    // generateTableHead(table, data);

}

export function createProject() {

}

export function deleteProject() {

}

// function generateTableHead(table, data) {
//   let thead = table.createTHead();
//   let row = thead.insertRow();
//   for (let key of data) {
//     let th = document.createElement("th");
//     let text = document.createTextNode(key);
//     th.appendChild(text);
//     row.appendChild(th);
//   }
// }

// function generateTable(table, data) {
//   for (let element of data) {
//     let row = table.insertRow();
//     for (let key in element) {
//       let cell = row.insertCell();
//       let text = document.createTextNode(element[key]);
//       cell.appendChild(text);
//     }
//   }
// }