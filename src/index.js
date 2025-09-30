import "./styles.css";

import loadHome from './home.js';
import loadMenu from './menu.js';
import loadAbout from './about.js';
import loadContact from './contact.js';

// Always load home page'
loadHome();

// Other pages. 
document.getElementById('homeButton').addEventListener('click', loadHome);
document.getElementById('menuButton').addEventListener('click', loadMenu);
document.getElementById('aboutButton').addEventListener('click', loadAbout);
document.getElementById('contactButton').addEventListener('click', loadContact);
