"use strict";

import {
    resultMessageGen
} from "./resultFunction.js";


let schedule;

export const getValues = () => {
    let values = [];

    const inputContainer = document.querySelector(".input-container__inputs");
    let count = inputContainer.childElementCount;

    for(let i = 1; i < count; i++) {
        let inputValue = document.querySelector(`.I${i}`);
        if(inputValue != null) {
            if(inputValue.value == "Cobre") {
                values.push(50);
                values.push(0.005);
                values.push(0.1);
                values.push(30);
                values.push(150);
                values.push(90);
            }else if(inputValue.value == "Aluminio") {
                values.push(70);
                values.push(0.006);
                values.push(0.15);  
                values.push(25); 
                values.push(220);
                values.push(90);
            }else if (inputValue.value == "Diurno" || inputValue.value == "Tarde" || inputValue.value == "Nocturno") schedule = inputValue.value;
            else {
                let valueFloat = parseFloat(inputValue.value);

                if(isNaN(valueFloat) || valueFloat == undefined || valueFloat == null) return resultMessageGen(
                    [`<span class="red">Los valores ingresados no son validos</span>`]
                );
                else values.push(valueFloat);
            }
        }
    }   
    return values;
}

export const equationTPC = values => {
    if(values == undefined) return;

    let I = values[0];
    let TA = values[1];
    // let M = values[2];
    let C = values[3];
    // let R = values[4];
    let vN = values[5];
    // let cC = values[6];

    let finalTemperature = Math.round(TA + ((I ** 2) * C) * 1.05);
    let serviceLife = Math.round(vN * Math.exp(5000 * (1 / (finalTemperature + 273) - 1 / (90 + 273))));

    return [finalTemperature, serviceLife];
}

export const equationES = values => {
    if(values == undefined) return;

    let I = values[0];
    let hT = values[1];
    let M = values[2];
    let C = values[3];
    let R = values[4];
    let vN = values[5];
    let cC = values[6];
    let cN = values[7];
    let TAT = values[8];

    let price = 0.14;

    let finalTemperature = (TAT + ((I ** 2) * C) * 1.05);
    // let serviceLife = (vN * Math.exp(5000 * (1 / (finalTemperature + 273) - 1 / (90 + 273))));

    let SL1 = finalTemperature + 273;
    let SL2 = cC + 273;
    let SL3 = 1 / SL1;
    let SL4 = 1 / SL2;
    let SL5 = SL3 - SL4;
    let SL6 = SL5 * 5000;
    let SL7 = Math.exp(SL6);
    let serviceLife = SL7 * vN;

    let profilePercent = (I / cN);

    // (TAT + (((I * profilePercent) ** 2) * C) * 1.05);
    let TPH1 = (I ** 2) * C;
    let TPH2 = TPH1 * 1.05;
    let temperaturePerHour = TPH2 + TAT;

    // (hT / (serviceLife * 8760)) * 100;
    let D1 = serviceLife * 8760
    let D2 = hT / D1
    let degradation = D2 * 100;


    let C1 = (I ** 2) * R;
    let C2 = C1 / 1000;
    let C3 = C2 * hT;
    let costs = C3 * price; 

    return [temperaturePerHour.toFixed(2), degradation.toFixed(2), Math.round(costs), schedule];
}