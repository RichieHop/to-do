import bannerIMG from './images/food.jpg';

export default function loadHome() {
    //Set the nav button background colours.
    document.getElementById("homeButton").style.background='lightgray';
    document.getElementById("menuButton").style.background='transparent';
    document.getElementById("aboutButton").style.background='transparent';
    document.getElementById("contactButton").style.background='transparent';

    const content = document.querySelector('#content'); 
    content.innerHTML = '';

    const menu = document.querySelector('#menu');
    menu.innerHTML = '';

    const greeting = document.createElement('p');
    const mission = document.createElement('p2'); 
    const banner = document.createElement('img'); 
    const blankLine = document.createElement("p2");

    greeting.setAttribute("id", "greeting")

    greeting.textContent = 'Welcome to Deli-Shus!'; 
    mission.innerHTML = "At <strong>Deli-Shus</strong> you'll find something different for the discerning palate, along with some old favourites."; 
    banner.src = bannerIMG; 
    banner.alt = 'Food, glorious food';
    banner.style.maxWidth = '100%';
    banner.style.height = 'auto';

    content.appendChild(greeting); 
    content.appendChild(banner);
    content.appendChild(blankLine);
    content.appendChild(mission);
} 
