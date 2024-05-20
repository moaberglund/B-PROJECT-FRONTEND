"use strict";

const url = "https://b-project.onrender.com";

//Logga in

const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", async function (event) {
        //förhindra felskickning av formulär
        event.preventDefault();
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;


        await loginUser(username, password);
    });
}

async function loginUser(username, password) {
    let User = {
        username: username,
        password: password
    }
    showLoadingSpinner();
    const response = await fetch(url + "/api/login/login", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(User)
    });

    let data = await response.json();

    if (response.status === 200) {
        console.log(data.token);
        localStorage.setItem("token", data.response.token);
        localStorage.setItem("user", User.username);
        window.location.href = "admin.html"
    } else {
        hideLoadingSpinner();
        document.getElementById("error-message").innerHTML = "Misslyckade att logga in användare, fel användarnamn eller lösenord";
        throw new Error("Misslyckade att logga in användare, fel användarnamn eller lösenord");

    }

    // nollställ formuläret
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    hideLoadingSpinner();
    return await response.json();
}


/* Laddningsanimation som visar spinnern */
function showLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
}
/* Laddningsanimation som gömmer spinnern */
function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
}
