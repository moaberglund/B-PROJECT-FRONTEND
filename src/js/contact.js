"use strict";

//url för POST contact rutt
const url = "https://b-project.onrender.com/api/contact/postcontact";

//Skicka kontaktformulär
const addContactFormBtn = document.getElementById("addContactFormBtn");

if (addContactFormBtn) {
    addContactFormBtn.addEventListener("click", async function (event) {
        //förhindra felskickning av formulär
        event.preventDefault();
        const name = document.getElementById("contact-name").value;
        const phone = document.getElementById("contact-phone").value;
        const mail = document.getElementById("contact-mail").value;
        const textmessage = document.getElementById("contact-message").value;

        // Kontrollera att alla fält är ifyllda
        if (!name || !phone || !mail || !message) {
            document.getElementById("message").innerHTML = "* All fields are mandatory, make sure you fill them out correctly.";
            return;
        }

        await createContactForm(name, phone, mail, textmessage);
    });
}

//skicka data till API
async function createContactForm(name, phone, mail, textmessage) {
    let ContactSchema = {
        name: name,
        phone: phone,
        mail: mail,
        textmessage: textmessage,
    }

    try {
        showLoadingSpinner();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(ContactSchema)
        });

        if (!response.ok) {
            document.getElementById("message").innerHTML = "* Failed fo send message.";
            throw new Error("Misslyckade att skicka kontakt formulär");
        } else {
            document.getElementById("message").innerHTML = "Message sent successfully";
        }

        // nollställ formuläret
        document.getElementById("contact-name").value = "";
        document.getElementById("contact-phone").value = "";
        document.getElementById("contact-mail").value = "";
        document.getElementById("contact-message").value = "";

        hideLoadingSpinner();
        return await response.json();

    } catch (error) {
        hideLoadingSpinner();
        console.log("Error: ", error);
        document.getElementById("message").innerHTML = "* Ett fel uppstod vid skickandet av meddelandet.";
    }
}


/* Laddningsanimation som visar spinnern */
function showLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "block";
}
/* Laddningsanimation som gömmer spinnern */
function hideLoadingSpinner() {
    document.getElementById("loadingSpinner").style.display = "none";
}
