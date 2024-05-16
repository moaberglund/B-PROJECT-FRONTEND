"use strict";



//GET
const GetUrl = "https://b-project.onrender.com/api/contact"

//Skriv ut meddelanden på protected route
const loadBtn = document.getElementById("loadBtn")
if (loadBtn) {
    loadBtn.addEventListener("click", async function () {
        await fetchAPI();
        await processAPI();
    });
}

//hämta data från API
async function fetchAPI() {
    //hämta token
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(GetUrl, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
                "content-type": "Application/json"
            },
        });

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
    const print = document.getElementById("print-messages");
    print.innerHTML = "";

    result.forEach(item => {
        const id = item._id;
        const name = item.name;
        const phone = item.phone;
        const mail = item.mail;
        const textmessage = item.textmessage;

        //skapa article tagg
        const article = document.createElement("article");
        article.classList.add("custumer-message");

        article.innerHTML = `
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Mail: ${mail}</p>
        <p>Message:${textmessage}</p>
        `
        print.appendChild(article);
    });
}
