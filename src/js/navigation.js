"use strict";


//MENY NAVEGERING


const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//funktion
function toggleMenu() {
    let navMenuEl = document.getElementById("burger-nav");
    //kolla vad display är inställt som (none/block)
    let style = window.getComputedStyle(navMenuEl);

    //ändra mellan none/block beroende på
    if (style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}