"use strict"
const inputs = document.querySelectorAll("input");
const cardDetails = document.querySelectorAll(".on-card");
const errorMessages = document.querySelectorAll(".error-message");
const confirmBtn = document.querySelector(".form-confirm-btn");
const continueBtn = document.querySelector(".continue-btn");
const formSection = document.querySelector(".form-container");
const successSection = document.querySelector(".success-container");
const form = document.querySelector("form");

inputs.forEach(i => {
    const userData = i.dataset.input;
    i.addEventListener("input", function () {
        cardDetails.forEach(c => {
            const cardData = c.dataset.card;
            if (userData === cardData) {
                if (userData === "number") {
                    let x = "";
                    for (let n = 0; n < i.value.length; n++) {
                        if (n >= 4 && n % 4 === 0) {
                            x = x + " " + i.value[n];
                        } else {
                            x += i.value[n];
                        }
                    }
                    c.textContent = x;
                } else if (userData === "month" && i.value < 10) {
                    c.textContent = "0" + i.value;
                } else {
                    c.textContent = i.value;
                }
            }
        })
    })

    i.addEventListener("keydown", function (e) {
        if (e.key === "Backspace") {
            if (i.value.length === 0) {
                cardDetails.forEach(c => {
                    const cardData = c.dataset.card;
                    if (userData === cardData) {
                        switch (userData) {
                            case "name":
                                c.textContent = "Jane Appleseed"
                                break;
                            case "number":
                                c.textContent = "0000 0000 0000 0000";
                            case "month":
                                c.textContent = "00";
                                break
                            case "year":
                                c.textContent = "00";
                                break
                            default:
                                c.textContent = "000";
                        }
                    }
                })
            }
        }
    })
})

function formvalidation(e) {
    let allFields = true;
    inputs.forEach(i => {
        let data = i.dataset.input;

        if (!i.checkValidity()) {
            errorMessages.forEach(err => {
                if (err.classList.contains(data)) {
                    err.style.display = "block";
                }
            })
            i.classList.add("error");
            allFields = false;
            e.preventDefault();
        } else {

            errorMessages.forEach(err => {
                if (err.classList.contains(data)) {
                    err.style.display = "none";
                }
            })
            i.classList.remove('error');
        }

    });

    if (allFields) {
        formSection.style.display = "none";
        successSection.style.display = "block";
    } else {
        e.preventDefault();
    }
}

confirmBtn.addEventListener("click", function (e) {
    e.preventDefault();
    formvalidation(e);
});

continueBtn.addEventListener("click", function () {
    formSection.style.display = "block";
    successSection.style.display = "none";
})
