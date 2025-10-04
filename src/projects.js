export function loadProjects() {
    //Set the nav button background colours.
    document.getElementById("homeButton").style.background='transparent';
    document.getElementById("projectsButton").style.background='lightgray';
    document.getElementById("tasksButton").style.background='transparent';

    const projects = document.querySelector('#projects');
    projects.innerHTML = '';

    const projectsArray = [
        [1, "General", 0],
        [2, "Work", 0],
        [3, "Health & Fitness", 0],
        [4, "Gym", 3]
    ];

    const projectsUL = document.createElement('ul');
    projectsUL.setAttribute("id", "projectsList");
    projects.appendChild(projectsUL);

    let list = document.getElementById("projectsList");

    for (let i = 0; i < projectsArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = projectsArray[i][1];
        list.appendChild(li);
        console.log(projectsArray[i][1]);
    }
}

export function createProject() {

}

export function deleteProject() {

}