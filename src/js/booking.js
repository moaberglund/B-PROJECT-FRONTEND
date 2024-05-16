"use strict";

//url för POST contact rutt
const url = "https://b-project.onrender.com/api/booking";

//Skicka kontaktformulär
const addBookingBtn = document.getElementById("addBookingBtn");

if (addBookingBtn) {
    addBookingBtn.addEventListener("click", async function (event) {
        //förhindra felskickning av formulär
        event.preventDefault();
        const name = document.getElementById("booking-name").value;
        const phone = document.getElementById("booking-phone").value;
        const mail = document.getElementById("booking-mail").value;
        const amountOfPeople = document.getElementById("booking-amount").value;
        const day = document.getElementById("booking-day").value;
        const time = document.getElementById("booking-time").value;

            // Kontrollera att alla fält är ifyllda
            if (!name || !phone || !mail || !amountOfPeople || !day | !time) {
                document.getElementById("message").innerHTML = "* All fields are mandatory, make sure you fill them out correctly.";
                return;
            }
  
        await createBooking(name, phone, mail, amountOfPeople, day, time);
    });
}

//skicka data till API
async function createBooking(name, phone, mail, amountOfPeople, day, time) {
    let BookingSchema = {
        name: name,
        phone: phone,
        mail: mail,
        amountOfPeople: amountOfPeople,
        day: day,
        time: time
    }

    try {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(BookingSchema)
    });

    if (!response.ok) {
        document.getElementById("message").innerHTML = "* Failed to send booking.";
        throw new Error("Misslyckade att skicka kontakt formulär");
    } else {
        document.getElementById("message").innerHTML = "Booking sent successfully";
    }

    // nollställ formuläret
    document.getElementById("booking-name").value = "";
    document.getElementById("booking-phone").value = "";
    document.getElementById("booking-mail").value = "";
    document.getElementById("booking-amount").value = "";
    document.getElementById("booking-day").value = "";
    document.getElementById("booking-time").value = "";

    return await response.json();

} catch (error) {
    console.log("Error: ", error);
    document.getElementById("message").innerHTML = "A problem occured when trying to send the booking...";
}
}