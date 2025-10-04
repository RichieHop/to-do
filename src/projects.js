export function loadProjects() {
    //Set the nav button background colours.
    document.getElementById("homeButton").style.background='transparent';
    document.getElementById("projectsButton").style.background='lightgray';
    document.getElementById("tasksButton").style.background='transparent';

    // const content = document.querySelector('#content');
    // content.innerHTML = '';

    const projects = document.querySelector('#projects');
    // projects.innerHTML = '';

    // const title = document.createElement('p');
    // title.textContent = 'Projects';

    const projectsArray = [
        {id: 1, title: "General", sub_project_of: 0},
        {id: 2, title: "Work", sub_project_of: 0},
        {id: 3, title: "Health & Fitness", sub_project_of: 0},
        {id: 4, title: "Gym", sub_project_of: 3}
    ];

    console.log(projectsArray);


    let list = document.getElementById("projectsList");

    // projectsArray.forEach((item) => {
    //     let li = document.createElement("li");
    //     li.innerText = projectsArray[item];
    //     list.appendChild(li);
    // });

    for (let i = 0; i < projectsArray.length; ++i) {
        let li = document.createElement('li');
        li.innerText = projectsArray[i][0];
        list.appendChild(li);
    }

    // const contactTel = document.createElement('p2');
    // const contactAdd1 = document.createElement('p2');
    // const contactAdd2 = document.createElement('p2');
    // const contactAdd3 = document.createElement('p2');
    // const contactPostCode = document.createElement('p2');
    // contactTel.textContent = `(+44) 151 111 2222`;
    // contactAdd1.textContent = `24 High Street`;
    // contactAdd2.textContent = `Hoylake`;
    // contactAdd3.textContent = `Wirral`;
    // contactPostCode.textContent = `CH47 1AA`;

    // projects.appendChild(title);
    
    // content.appendChild(contactAdd1);
    // content.appendChild(contactAdd2);
    // content.appendChild(contactAdd3);
    // content.appendChild(contactPostCode);
    // content.appendChild(contactTel);                
}

export function createProject() {

}

export function deleteProject() {

}