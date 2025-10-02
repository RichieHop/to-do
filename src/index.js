import "./styles.css";

import loadHome from './home.js';
import loadProjects from './projects.js';
import loadTasks from './tasks.js';
// import loadContact from './contact.js';

// Always load home page'
loadHome();

// Other pages. 
document.getElementById('homeButton').addEventListener('click', loadHome);
document.getElementById('projectsButton').addEventListener('click', loadProjects);
document.getElementById('tasksButton').addEventListener('click', loadTasks);
// document.getElementById('contactButton').addEventListener('click', loadContact);
