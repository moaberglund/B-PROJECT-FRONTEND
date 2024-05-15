"use strict";

//url för meny rutt
const url = "https://b-project.onrender.com/api/menu";

function init() {
    fetchAPI();
    processAPI();
}

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

