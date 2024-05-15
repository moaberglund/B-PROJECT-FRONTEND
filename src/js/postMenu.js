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


        await addMenu(category, name, price, description);
    });
}

async function addMenu(category, name, price, description) {

    let Menu = {
        category: category,
        name: name,
        price: price,
        description: description
    }
    const token = localStorage.getItem("token");

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(Menu)
    });

    let data = await response.json();

    if (response.status === 201) {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        window.location.href = "admin.html"
    } else {
        document.getElementById("error-message").innerHTML = "Failed to add menu object.";
        throw new Error("Failed to add menu object");

    }

    // nollställ formuläret
    document.getElementById("menu-category").value = "";
    document.getElementById("menu-name").value = "";
    document.getElementById("menu-price").value = "";
    document.getElementById("menu-description").value ="";

    return await response.json();
}