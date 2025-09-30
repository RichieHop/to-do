import kedgereeImage from "./images/kedgeree.jpg";
import paellaImage from "./images/paella.jpg";
import chorizoImage from "./images/chorizo_and_potato_stew.jpg";
import tboneImage from "./images/t-bone.jpg";
import thaiGreenCurryImage from "./images/thai-green-curry.jpg";
import toadInTheHoleImage from "./images/toad-in-the-hole.jpg";
import chocolateCakeImage from "./images/chocolate_orange_cake.jpg";
import tarteAuCitronImage from "./images/tarte_au_citron.jpg";
   
export default function loadMenu() {
    //Set the nav button background colours.
    document.getElementById("menuButton").style.background='lightgray';
    document.getElementById("homeButton").style.background='transparent';
    document.getElementById("aboutButton").style.background='transparent';
    document.getElementById("contactButton").style.background='transparent';

    const content = document.querySelector('#content');
    content.innerHTML = '';

    const menu = document.querySelector('#menu');
    menu.innerHTML = '';

    menu.appendChild(
        createMenuItem(
        "Kedgeree",
        "Curry sauce, smoked haddock, hard-boiled Egg and basmati rice - <strong>£15.95</strong>",
        kedgereeImage
        )
    );
    menu.appendChild(
        createMenuItem(
        "Paella",
        "Seafood, chicken, chorizo and calasparra rice (for 2 people) - <strong>£35.95</strong>",
        paellaImage
        )
    );    
    menu.appendChild(
        createMenuItem(
        "Patatas a la Riojana",
        "Chorizo and potato stew - <strong>£14.95</strong>",
        chorizoImage
        )
    );
    menu.appendChild(
        createMenuItem(
        "T-Bone Steak",
        "T-Bone steak cooked to your liking, served with onion rings and salad - <strong>£25.95</strong>",
        tboneImage
        )
    );    
    menu.appendChild(
        createMenuItem(
        "Thai Green Curry",
        "Authentic Thai green curry with either chicken or tofu and basmati Rice - <strong>£16.95</strong>",
        thaiGreenCurryImage
        )
    );
    menu.appendChild(
        createMenuItem(
        "Toad In The Hole",
        "Fluffy Yorkshire pudding, premium pork or vegan sausages, onion gravy, mashed potato and vegetables - <strong>£15.95</strong>",
        toadInTheHoleImage
        )
    );    
    menu.appendChild(
        createMenuItem(
        "Tarte au Citron",
        "A zesty Sicilian lemon tart with a sweet pastry base - <strong>£5.95 per slice</strong>",
        tarteAuCitronImage
        )
    );
    menu.appendChild(
        createMenuItem(
        "Chocolate Orange Cake",
        "Moist chocolate and orange cake with a chocolate ganache - <strong>£5.95 per slice</strong>",
        chocolateCakeImage
        )
    );    

}

function createMenuItem(name, description, imageSrc) {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    const blankLine = document.createElement("p2");

    const foodName = document.createElement("p3");
    foodName.textContent = name;

    const foodDescription = document.createElement("p2");
    foodDescription.innerHTML = description;

    const foodImage = document.createElement("img");
    foodImage.src = imageSrc;
    foodImage.alt = `${name}`;

    menuItem.appendChild(foodImage);
    menuItem.appendChild(foodName);
    menuItem.appendChild(foodDescription);
    menuItem.appendChild(blankLine);

    return menuItem;
}
