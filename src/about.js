export default function loadAbout() {
    //Set the nav button background colours.
    document.getElementById("aboutButton").style.background='lightgray';
    document.getElementById("menuButton").style.background='transparent';
    document.getElementById("homeButton").style.background='transparent';
    document.getElementById("contactButton").style.background='transparent';

    const content = document.querySelector('#content');
    content.innerHTML = '';

    const menu = document.querySelector('#menu');
    menu.innerHTML = '';

    const title = document.createElement('p');
    title.textContent = 'About Us';

    const aboutText = document.createElement('p2');
    aboutText.textContent = `Deli-Shus was founded in 1989 and is still going strong.`;

    content.appendChild(title);
    content.appendChild(aboutText);
}
