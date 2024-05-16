"use strict";

//GET
const GetUrl = "https://b-project.onrender.com/api/booking"

//Skriv ut bokningar på protected route
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
    const print = document.getElementById("print-bookings");
    print.innerHTML = "";

    result.forEach(item => {
        const id = item._id;
        const name = item.name;
        const phone = item.phone;
        const mail = item.mail;
        const amountOfPeople = item.amountOfPeople;
        const day = formatDate(item.day);
        const time = item.time;

        //skapa article tagg
        const article = document.createElement("article");
        article.classList.add("bookings-for-admin");

        article.innerHTML = `
        <p>Day: ${day}</p>
        <p>Time: ${time}</p>
        <p>Amount: ${amountOfPeople}</p>
        <br>
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Mail: ${mail}</p>
     
        
        `
        print.appendChild(article);
    });
}


//formatera datum snyggare "maj 2024"
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('sv-SE', options);
}