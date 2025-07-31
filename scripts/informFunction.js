"use strict";

const title = document.querySelector(".container__title");
const date = document.querySelector(".container__date");
const basicSection = document.querySelector(".container__basic");
const advancedSection = document.querySelector(".container__advanced");

const getInformation = () => {
    let name = localStorage.getItem("name");
    let circuit = localStorage.getItem("circuit");
    let basic = localStorage.getItem("basic");
    let advanced = localStorage.getItem("advanced");

    name = name == "undefined" ? "Sin nombre" : name;
    circuit = circuit == "undefined" ? "Sin nombre" : circuit;

    loadInform(name, circuit, basic, advanced);
}

const loadInform = (n, c, b, a) => {
    let _date = new Date();
    let day = _date.getDate();
    let month = _date.getUTCMonth() + 1;
    let year = _date.getFullYear();

    document.title = n;

    title.textContent = `INFORME DEL CIRCUITO: '${c}'`;
    date.innerHTML = `FECHA DE CREACION: ${day}/${month}/${year}`;

    if(b != "undefined") {
        const temp = document.getElementById("tempB");
        const life = document.getElementById("lifeB");

        const text = document.querySelector(".basic__text");

        let results = b.split(",");

        temp.innerHTML = `TEMPERATURA: <span class="unbold">${results[0]}°C</span>`;
        life.innerHTML = `VIDA UTIL: <span class="unbold">${results[1]} años</span>`;

        let x;
        let y;

        if(parseInt(results[0]) > 90) x = `Los resultados del analisas han dado una temperatura muy alta a la que deberia ser comun en los equipos, siendo que esta es de ${results[0]}°C, estando por encima de lo comun (90°C). Se recomienda tener un control constante del equipo o cambiarlo para evitar fallas o accidentes.\n\n`;
        else x = `Los resultados del analisas han dado una temperatura por debajo del nivel de riesgo (90°C), siendo que la temperatura del equipo es de ${results[0]}°C. Se recomienda hacer otro analisis luego de un tiempo o si se prensentan inconvenientes.\n\n`;

        if(parseInt(results[1]) < 3) y = `Se ha detectado que al equipo le queda muy poca vida util, teniendo solo ${results[1]} años aproximados de vida util, se recomienda cambiarlo lo mas pronto posible para evitar fallas o perdidas energeticas. \n\n`;
        else y = `La vida util del equipo aun es bastante prolongada y no se encuentra en ningun rango de riesgo, de todas formas, se recomienda realizar un chequeo o tomar acciones si aun se percibe como un valor de riesgo. \n\n`;

        text.innerHTML = x + y;
    }else basicSection.style.display = "none";

    if(a != "undefined") {
        const time = document.getElementById("timeB");
        const temp = document.getElementById("tempAB");
        const deg = document.getElementById("degB");
        const cost = document.getElementById("costB");

        let results = a.split(",");

        time.innerHTML = `HORARIO: <span class="unbold">${results[3]}</span>`;
        temp.innerHTML = `TEMPERATURA: <span class="unbold">${results[0]}°C</span>`;
        deg.innerHTML = `DEGRADACION: <span class="unbold">${results[1]}%</span>`;
        cost.innerHTML = `COSTOS POR CONSUMO: <span class="unbold">${results[2]}$</span>`;

        const text = document.querySelector(".advanced__text");

        let w;
        let x;
        let y;

        if(parseInt(results[0]) > 90) w = `Los resultados del analisas han dado una temperatura muy alta a la que deberia ser comun en los equipos, siendo que esta es de ${results[0]}°C, estando por encima de lo comun (90°C). Se recomienda tener un control constante del equipo o cambiarlo para evitar fallas o accidentes.\n\n`;
        else w = `Los resultados del analisas han dado una temperatura por debajo del nivel de riesgo (90°C), siendo que la temperatura del equipo es de ${results[0]}°C. Se recomienda hacer otro analisis luego de un tiempo o si se prensentan inconvenientes.\n\n`;

        x = `Este equipo cuenta con un porcentaje de degradacion del ${results[1]}%, si el valor visto se considera muy alto, es preferible realizar un cambio de equipo para evitar futuras fallas o accidentes. `;

        if(parseInt(results[2]) > 300) y = `Segun el analisis, los costos por consumo energetico son de ${results[2]}$, este valor es considerado muy elevado, se recomiendan realizar optimizaciones o cambios para reducir este valor lo mas posible para estar por debajo de 300$ (valores comunes). `;
        else y = `Segun el analisis, los costos por consumo energetico son de ${results[2]}$, el cual se encuentra entre los valores comunes y accesibles de la empresa (menos de 300$) `;

        text.innerHTML = w + x + y;
    }else advancedSection.style.display = "none";
}

getInformation();