"use strict";

const url = "https://b-project.onrender.com/protected";

window.onload = init;

async function init() {

    //kontroll av token
    const token = localStorage.getItem("token");
    if (!token) {  //lack av token => skickas till index
        window.location.href = "index.html";
    }
    

    let response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

}



//logga ut
const logout = document.getElementById("logout");
logout.addEventListener("click", async function () {

    localStorage.clear();

});


// Sanera data exempel för input
// testIput = testInput.replace(/(<([^>]+)>)/ig, "");