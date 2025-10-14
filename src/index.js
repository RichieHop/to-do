import "./styles.css";

import { loadProjects, loadTasks, createProject, deleteProject } from './projects.js';

/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;

/* Using test() method to search regexp in details; it returns boolean value*/
let isMobileDevice = regexp.test(details);

if (isMobileDevice) {
    console.log("You are using a Mobile Device");
} else {
    console.log("You are using Desktop");
}

// Always load projects and tasks'
loadProjects();
loadTasks();

// Other pages. 
// document.getElementById('homeButton').addEventListener('click', loadHome);
// document.getElementById('projectsButton').addEventListener('click', loadProjects);
// document.getElementById('tasksButton').addEventListener('click', loadTasks);

