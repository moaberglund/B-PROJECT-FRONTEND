"use strict";

//url för meny rutt
const url = "https://b-project.onrender.com/api/menu";

//Lägg till meny
//Lägg till data i databasen

const addMenuBtn = document.getElementById("addMenuBtn");
if (addMenuBtn) {
    addMenuBtn.addEventListener("click", async function (event) {
        //förhindra felskickning av formulär
        event.preventDefault();

        const category = document.getElementById("menu-category").value;
        const name = document.getElementById("menu-name").value;
        const price = document.getElementById("menu-price").value;
        const description = document.getElementById("menu-description").value;

        console.log(category, name, price, description);

        await addMenu(category, name, price, description);
    });
}

async function addMenu(category, name, price, description) {

    let MenuSchema = {
        category: category,
        name: name,
        price: price,
        description: description
    }
    console.log(MenuSchema);

    const token = localStorage.getItem("token");

    const response = await fetch(url + "/postmenu", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            "content-type": "application/json"
        },
        body: JSON.stringify(MenuSchema)
    });

    let data = await response.json();

    if (response.ok) {
        document.getElementById("info-message").innerHTML = data.message;
    } else {
        document.getElementById("error-message").innerHTML = data.error;
        throw new Error("Failed to add menu object");
    }

    // nollställ formuläret
    document.getElementById("menu-category").value = "";
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-price").value = "";
    document.getElementById("menu-description").value = "";

}

// RUTT FÖR ATT EDIT + DELETE
// skriv ut först och lägg till funktion för att redigera och radera

//Skriv ut meddelanden på protected route
const loadBtn = document.getElementById("loadBtn")
if (loadBtn) {
    loadBtn.addEventListener("click", async function () {
        await fetchAPI();
        await processAPI();
    });
}


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
        return; // Avbryt
    }

    // Utskrift DOM
    const nibble = document.getElementById("nibble");
    nibble.innerHTML = `<h2 class="menu-title">Nibble</h2>`;
    const pizza = document.getElementById("pizza");
    pizza.innerHTML = `<h2 class="menu-title">Pizza</h2>`;
    const sweet = document.getElementById("sweet");
    sweet.innerHTML = `<h2 class="menu-title">Sweet Tooth</h2>`;
    const wine = document.getElementById("wine");
    wine.innerHTML = `<h2 class="menu-title">Wine</h2>`;

    result.forEach(item => {
        const id = item._id;
        const category = item.category;
        const name = item.name;
        const price = item.price;
        const description = item.description;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add(`${category.toLowerCase()}-object`);
        itemDiv.innerHTML = `
            <h3 contenteditable="true" class="editable">${name}</h3>
            <p contenteditable="true" class="editable">${price} &euro;</p>
            <p contenteditable="true" class="editable">${description}</p>
            <button class="saveBtn" id="${id}">Save</button>
            <button class="deleteBtn" id="${id}">Delete</button>
        `;

        const saveBtn = itemDiv.querySelector(".saveBtn");
        saveBtn.addEventListener("click", async () => {
            await saveData(id, itemDiv);
        });

        const deleteBtn = itemDiv.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", async () => {
            await deleteData(id);
        });

        if (category === "Nibble") nibble.appendChild(itemDiv);
        if (category === "Pizza") pizza.appendChild(itemDiv);
        if (category === "Sweet") sweet.appendChild(itemDiv);
        if (category === "Wine") wine.appendChild(itemDiv);
    });
}

//redigera data från API:et
async function saveData(id, itemDiv) {
    try {
        //hämta token
        const token = localStorage.getItem("token");

        const updatedItem = {
            name: itemDiv.querySelector("h3").innerText,
            price: itemDiv.querySelector("p").innerText.replace(" €", ""),
            description: itemDiv.querySelector("p:nth-of-type(2)").innerText
        };

        const response = await fetch(`https://b-project.onrender.com/api/menu/${id}`, {
            method: "PUT",
            headers: {
                'Authorization': 'Bearer ' + token,
                "content-type": "Application/json"
            },
            body: JSON.stringify(updatedItem)
        });

        //Lägg till kod för att hantera redigering av data

        if (!response.ok) {
            throw new Error("Misslyckades med att ta bort posten");
        }

        // Uppdatera gränssnittet efter borttagning
        fetchAPI();
        processAPI();
    } catch (error) {
        console.error("Fel vid försök att ta bort posten:", error);
    }
}



//ta bort data från API:et
async function deleteData(id) {
    try {
        //hämta token
        const token = localStorage.getItem("token");

        const response = await fetch(`https://b-project.onrender.com/api/menu/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error("Misslyckades med att ta bort posten");
        }

        // Uppdatera gränssnittet efter borttagning
        fetchAPI();
        processAPI();
    } catch (error) {
        console.error("Fel vid försök att ta bort posten:", error);
    }
}