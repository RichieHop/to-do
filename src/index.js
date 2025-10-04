import "./styles.css";

import loadHome from './home.js';
import { loadProjects, createProject, deleteProject } from './projects.js';
// import loadProjects from './projects.js';
import { loadTasks, createTask, deleteTask } from './tasks.js';
import displayProjects from './dom_handler.js';
// import loadTasks from './tasks.js';
// import loadContact from './contact.js';

// Always load home page'
loadHome();

// Other pages. 
document.getElementById('homeButton').addEventListener('click', loadHome);
document.getElementById('projectsButton').addEventListener('click', loadProjects);
document.getElementById('tasksButton').addEventListener('click', loadTasks);

