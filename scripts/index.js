"use strict";

import {
    buttonLoader  
} from "./buttonFunctions.js";

const form = document.querySelector(".log-in__form");

const container = document.querySelector(".container");
const login = document.querySelector(".log-in");
const username = document.querySelector(".container__username");

const buttonTPC = document.getElementById("TPC");
const buttonDEVU = document.getElementById("DEVU");
const buttonES = document.getElementById("ES");
const buttonUR = document.getElementById("UR");

form.addEventListener("submit", e => {
    e.preventDefault();
    
    login.style.display = "none";
    container.style.display = "flex";

    username.textContent = e.target[0].value;
});

buttonTPC.addEventListener("click", () => {
    buttonTPC.style.color = "var(--color-4)";
    buttonDEVU.style.color = "whitesmoke";
    buttonES.style.color = "whitesmoke";
    buttonUR.style.color = "whitesmoke";
    buttonLoader("TPC");
});

buttonDEVU.addEventListener("click", () => {
    buttonTPC.style.color = "whitesmoke";
    buttonDEVU.style.color = "var(--color-4)";
    buttonES.style.color = "whitesmoke";
    buttonUR.style.color = "whitesmoke";
    buttonLoader("DEVU");
});


buttonES.addEventListener("click", () => {
    buttonTPC.style.color = "whitesmoke";
    buttonDEVU.style.color = "whitesmoke";
    buttonES.style.color = "var(--color-4)";
    buttonUR.style.color = "whitesmoke";
    buttonLoader("ES");
});

buttonUR.addEventListener("click", () => {
    buttonTPC.style.color = "whitesmoke";
    buttonDEVU.style.color = "whitesmoke";
    buttonES.style.color = "whitesmoke";
    buttonUR.style.color = "var(--color-4)";
    buttonLoader("UR");
});

buttonTPC.style.color = "var(--color-4)";
buttonDEVU.style.color = "whitesmoke";
buttonES.style.color = "whitesmoke";
buttonUR.style.color = "whitesmoke";
buttonLoader("TPC");

// * Create a project creation/save system
// * Create a way to generate an essay with all it information


