export default function loadContact() {
    //Set the nav button background colours.
    document.getElementById("contactButton").style.background='lightgray';
    document.getElementById("menuButton").style.background='transparent';
    document.getElementById("aboutButton").style.background='transparent';
    document.getElementById("homeButton").style.background='transparent';

    const content = document.querySelector('#content');
    content.innerHTML = '';

    const menu = document.querySelector('#menu');
    menu.innerHTML = '';

    const title = document.createElement('p');
    title.textContent = 'Contact';

    const contactTel = document.createElement('p2');
    const contactAdd1 = document.createElement('p2');
    const contactAdd2 = document.createElement('p2');
    const contactAdd3 = document.createElement('p2');
    const contactPostCode = document.createElement('p2');
    contactTel.textContent = `(+44) 151 111 2222`;
    contactAdd1.textContent = `24 High Street`;
    contactAdd2.textContent = `Hoylake`;
    contactAdd3.textContent = `Wirral`;
    contactPostCode.textContent = `CH47 1AA`;

    content.appendChild(title);
    content.appendChild(contactAdd1);
    content.appendChild(contactAdd2);
    content.appendChild(contactAdd3);
    content.appendChild(contactPostCode);
    content.appendChild(contactTel);                
}
