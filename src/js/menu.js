"use strict";

/* Laddningsanimation som visar spinnern */
function showLoadingSpinner() {
    document.querySelector(".spinner").style.display = "block";
}
/* Laddningsanimation som gömmer spinnern */
function hideLoadingSpinner() {
    document.querySelector(".spinner").style.display = "none";
}

//API hantering för meny

//url för meny rutt
const url = "https://b-project.onrender.com/api/menu";

function init() {
    fetchAPI();
    processAPI();
}
window.onload = init();

//hämta data från API
async function fetchAPI() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Misslyckad hämtning!")
        }
        return await response.json();
    } catch (err) {
        console.error("Error vid hämtning av data från API: " + err);
        return null;
    }
}

async function processAPI() {
    const result = await fetchAPI();
    if (!result) {
        return //avbryt
    }

    //utskrift DOM

    //article tagg för nibble
    const nibble = document.getElementById("nibble");
    nibble.innerHTML = `<h2 class="menu-title">Nibble</h2>`;
    //article tagg för pizzas
    const pizza = document.getElementById("pizza");
    pizza.innerHTML = `<h2 class="menu-title">Pizza</h2>`;
    //article för efterrätter
    const sweet = document.getElementById("sweet");
    sweet.innerHTML = `<h2 class="menu-title">Sweet Tooth</h2>`;
    //article för vin
    const wine = document.getElementById("wine");
    wine.innerHTML = `<h2 class="menu-title">Wine</h2>`;

    result.forEach(item => {
        const id = item._id;
        const category = item.category;
        const name = item.name;
        const price = item.price;
        const description = item.description;

        //skapa div per menyobject
        //NIBBLE
        const nibbleDiv = document.createElement("div");
        nibbleDiv.classList.add("nibble-object");
        //PIZZA
        const pizzaDiv = document.createElement("div");
        pizzaDiv.classList.add("pizza-object");
        //SWEET
        const sweetDiv = document.createElement("div");
        sweetDiv.classList.add("sweet-object")
        //WINE
        const wineDiv = document.createElement("div");
        wineDiv.classList.add("wine-object");

        //om kategori är nibble
        if (category === "Nibble") {
            nibbleDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${price} &euro; </p>
        <p>${description}</p>
        `
            nibble.appendChild(nibbleDiv);
        }

        //om kategori är pizza
        if (category === "Pizza") {
            pizzaDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${price} &euro; </p>
        <p>${description}</p>
        `
            pizza.appendChild(pizzaDiv);
        }

        //om kategori är efterrätt
        if (category === "Sweet") {
            sweetDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${price} &euro; </p>
        <p>${description}</p>
        `
            sweet.appendChild(sweetDiv);
        }

        //om kategori är vin
        if (category === "Wine") {
            wineDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${price} &euro;</p>
        <p>${description}</p>
        `
            wine.appendChild(wineDiv);
        }
    })

}