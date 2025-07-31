"use strict";

import {
    buttonCalc
} from "./buttonFunctions.js";

export const messageCreator = (results, type) => {
    if(type === "DEVU") {
        let a;
        let b;
        let f;

        if(results[0] > 90) a = ["hay riesgo por temperatura alta", "red"];
        else a = ["la temperatura es estable", "green"];

        if(results[1] < 3) b = ["la vida útil es baja, se recomienda un cambio de equipo", "red"];
        else b = ["la vida útil esta entre valores esperados, el funcionamiento seguirá siendo correcto", "green"];

        f = `Según el análisis <span class="${a[1]}">${a[0]}</span>, mientras que <span class="${b[1]}">${b[0]}</span>`;

        return f;
    }else if(type === "ES") {
        let a;
        let b;
        let c;
        let f;
        
        if(results[0] > 90) a = ["hay riesgo por temperaturas altas", "red"];
        else a = ["la temperatura es estable", "green"];

        b = ["el equipo cuenta con un porcentaje de degradación del", "yellow"];

        if(results[2] > 300) c = ["los costos por consumo energético son muy elevados, se recomienda hacer optimizaciones", "red"];
        else c = ["los costos por consumo energético estan entre los valores comunes", "green"];

        f = `Según el análisis: <span class="${a[1]}">${a[0]}</span>, <span class="${b[1]}">${b[0]}: ${results[1]}%</span>: y <span class="${c[1]}">${c[0]}</span>`;

        return f;
    }
}

export const resultMessageGen = content => {
    const resultContainer = document.querySelector(".results-container__results");
    const warningContainer = document.querySelector(".results-container__warning");
    const button = document.querySelector(".buttons__save-btn");
    const result = document.querySelector(".results__result-text");
    const warning = document.querySelector(".results__result-warning");
    const container = document.querySelector(".container__results-container");

    container.style.justifyContent = "space-evenly";

    resultContainer.style.display = "flex";
    resultContainer.style.animation = "fadeIn .4s both ease-in-out";
    result.innerHTML = content[0];

    if(content[1] == "o" || content[1] == undefined) {
        container.style.justifyContent = "center"
        return;
    }
    button.style.display = "flex";
    button.style.animation = "fadeIn .4s both ease-in-out";
    button.addEventListener("click", () => {
        button.style.animation = "savedAnim .4s both ease-in-out";
        buttonCalc([{id: "SB"}], 0);
        setTimeout(() => {
            button.style.animation = "none";
        }, 500);
    });

    warningContainer.style.display = "flex";
    warningContainer.style.animation = "fadeIn .4s both ease-in-out";
    warning.innerHTML = content[1];

    setTimeout(() => {
        warningContainer.style.animation = "none";
        resultContainer.style.animation = "none";
    }, 500);
    
}