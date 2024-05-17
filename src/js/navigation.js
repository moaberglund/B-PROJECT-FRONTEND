"use strict";


//MENY NAVEGERING


const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");
openBtn.addEventListener("click", toggleMenu);
closeBtn.addEventListener("click", toggleMenu);

//funktion

function toggleMenu() {
    let navMenuEl = document.getElementById("burger-nav");
    if (navMenuEl.classList.contains("open")) {
        navMenuEl.addEventListener("transitionend", () => {
            navMenuEl.style.visibility = "hidden";
        }, { once: true });
        navMenuEl.classList.remove("open");
    } else {
        navMenuEl.style.visibility = "visible";
        navMenuEl.classList.add("open");
    }
}