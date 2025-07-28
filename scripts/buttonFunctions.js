"use strict";

import {
    equationTPC,
    equationES,
    getValues
} from "./calcEquations.js";

import {
    resultMessageGen,
    messageCreator
} from "./resultFunction.js";

const container = document.querySelector(".container__input-container");
const resultContainer = document.querySelector(".results-container__results");
const warningContainer = document.querySelector(".results-container__warning");
const button = document.querySelector(".buttons__save-btn");

const buttonCalc = (info, inp) => {
    if(info[inp].id === "DEVU") {
        let results = equationTPC(getValues());
        if(results == undefined) return;

        let adv = messageCreator(results, info[inp].id);
        let messages = [
            `<p>Temperatura: <span class="yellow">${results[0]} °C</span></p>
             <p>Vida util restante: <span class="yellow">${results[1]} años</span></p>`,
             adv
        ];
        resultMessageGen(messages);

    }else if(info[inp].id === "ES") {
        let results = equationES(getValues());
        if(results == undefined) return;

        let adv = messageCreator(results, info[inp].id);
        let messages = [
            `<p>Temperatura (${results[3]}): <span class="yellow">${results[0]} °C</span></p>
             <p>Degradacion: <span class="yellow">${results[1]}%</span></p>
             <p>Costos por energia: <span class="yellow">${results[2]}$</span></p>`,
             adv
        ];
        resultMessageGen(messages);    
    }else if(info[inp].id === "BP") buttonLoader(info[inp].id);
    else if(info[inp].id == "BS") {
        const project = document.querySelector(".container__project");
        const projectName = document.querySelector(".I1");

        console.log(projectName)

        project.textContent = projectName.value;

    }else if(info[inp].id === "PBS") buttonLoader(info[inp].id);
}

const buttonCreator = (info, type, option) => {

    let fragment;
    let inputContainer;

    if(option == undefined) {
        fragment = document.createDocumentFragment()
        resultContainer.style.display = "none";
        warningContainer.style.display = "none";
        button.style.display = "none";
        
        inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container__inputs");
    }

    for(let inp in info) {
        const inputGroup = document.createElement("div");
        inputGroup.classList.add("inputs__input-group");   

        if(info[inp].type == "input") {

            const label = document.createElement("label");
            label.setAttribute("for", `${info[inp].id}`);
            label.textContent = `${info[inp].unit}`;
            inputGroup.appendChild(label);

            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.classList.add(`I${inp}`);
            input.setAttribute("id", `${info[inp].id}`);
            input.setAttribute("placeholder", `${info[inp].ph}`);
            inputGroup.appendChild(input);

        }else if(info[inp].type == "select") {

            const select = document.createElement("select");
            select.classList.add(`I${inp}`);
            inputGroup.appendChild(select);

            const generalOption = document.createElement("option");
            generalOption.textContent = `${info[inp].content}`;
            generalOption.setAttribute("value", "eee");
            generalOption.setAttribute("disabled", "true");
            select.appendChild(generalOption);

            for(let opt in info[inp].options) {

                const option = document.createElement("option");
                option.setAttribute("value", info[inp].options[opt].value);
                option.textContent = info[inp].options[opt].text;
                select.appendChild(option);

            }

        }else if(info[inp].type == "title") {

            const title = document.createElement("p");
            title.classList.add("input-container__title");
            title.textContent = `${info[inp].content}`;
            inputContainer.style.flexDirection = `${info[inp].flex}`;
            container.appendChild(title);

        }else if(info[inp].type == "button") {

            const button = document.createElement("button");
            button.textContent = `${info[inp].content}`;
            button.setAttribute("id", info[inp].id);
            button.addEventListener("click", () => {
                buttonCalc(info, inp);
            });
            button.style.animation = "fadeIn .4s both ease-in-out";
            if(option == undefined) inputGroup.appendChild(button)
            else option[1].appendChild(button);

        }else if(info[inp].type == "text") {

            const text = document.createElement("p");
            text.setAttribute("id", "text");
            text.classList.add("input-container__text");

            const pn = document.querySelector(".container__project");

            let sName

            if(info[inp].content == "Fecha de creación") {
                let date = new Date();
                let day = date.getDate();
                let month = date.getUTCMonth() + 1;
                let year = date.getFullYear();

                sName = `<span class="yellow">${day}/${month}/${year}</span>`;

            }else if(!info[inp].content.includes("Proyecto")) {
                sName = pn.textContent != "" ? pn.textContent : info[inp].ph;       

            }else {
                sName = ""; 
            }

            text.innerHTML = `${info[inp].content} <span class="yellow">${sName}</span>`;
            if(option == undefined) container.appendChild(text);
            else option[1].appendChild(text);

        }else if(info[inp].type == "project") {
            for(let opt in info[inp].options) {

                const _container = document.createElement("div");
                _container.classList.add("input-group__project");
                inputGroup.appendChild(_container);

                buttonCreator(info[inp].options[opt], type, [true, _container]);

            }    
        }

        if(option == undefined) {
            container.appendChild(inputContainer);
            fragment.append(inputGroup);
        } 
    }

    if(option == undefined) {
        inputContainer.style.animation = "fadeIn .4s both ease-in-out";
        inputContainer.appendChild(fragment);
    }
}

export const buttonLoader = type => {
    container.innerHTML = "";

    if(type == "TPC") {
        const inputInfo = [
            {
                type: "title",
                content: "Información del proyecto",
                ph: "",
                id: "",
                unit: "",
                flex: "column"
            },
            {
                type: "input",
                content: "",
                ph: "Nombre del proyecto",
                id: "PN",
                unit: "",      
            },
            {
                type: "input",
                content: "",
                ph: "Nombre del circuito/plano eléctrico",
                id: "CPN",
                unit: "",      
            },
            {
                type: "button",
                content: "Guardar",
                ph: "",
                id: "BS",
                unit: "",      
            },
            {
                type: "button",
                content: "Proyectos",
                ph: "",
                id: "BP",
                unit: "",      
            },
        ];

        buttonCreator(inputInfo, type);

    }else if(type === "DEVU") {
        const inputInfo = [
            {
                type: "title",
                content: "Temperatura y vida útil",
                ph: "",
                id: "",
                unit: "",
                flex: "row"
            },
            {
                type: "input",
                content: "",
                ph: "Corriente eléctrica general",
                id: "CE",
                unit: "A",      
            },
            {
                type: "input",
                content: "",
                ph: "Temperatura ambiente",
                id: "TA",
                unit: "°C",      
            },
            {
                type: "select",
                content: "Seleccione el material",
                ph: "",
                id: "MTC",
                unit: "--",
                options: {
                    c1: {
                        text: "Cobre",
                        value: "Cobre"
                    },
                    c2: {
                        text: "Aluminio",
                        value: "Aluminio"
                    }
                }
            },
            {
                type: "button",
                content: "Calcular",
                ph: "",
                id: "DEVU",
                unit: ""    
            }
        ];

        buttonCreator(inputInfo, type);
        
    }else if(type === "ES") {
        const inputInfo = [
            {
                type: "title",
                content: "Degradación y costos",
                ph: "",
                id: "",
                unit: "",
                flex: "row"
            },
            {
                type: "input",
                content: "",
                ph: "Corriente eléctrica general",
                id: "CE",
                unit: "A",      
            },
            {
                type: "input",
                content: "",
                ph: "Horas operativas",
                id: "HT",
                unit: "HORAS",      
            },
            {
                type: "select",
                content: "Seleccione el material",
                ph: "",
                id: "MTC",
                unit: "--",
                options: {
                    c1: {
                        text: "Cobre",
                        value: "Cobre"
                    },
                    c2: {
                        text: "Aluminio",
                        value: "Aluminio"
                    }
                }
            },
            {
                type: "select",
                content: "Seleccione el turno",
                ph: "",
                id: "MTC",
                unit: "--",
                options: {
                    c1: {
                        text: "Diurno",
                        value: "Diurno"
                    },
                    c2: {
                        text: "Tarde",
                        value: "Tarde"
                    },
                    c3: {
                        text: "Nocturno",
                        value: "Nocturno"
                    }
                }
            },
            {
                type: "input",
                content: "",
                ph: "Temperatura ambiente del turno",
                id: "TAT",
                unit: "°C",      
            },
        
            {
                type: "button",
                content: "Calcular",
                ph: "",
                id: "ES",
                unit: ""    
            }
        ];

        buttonCreator(inputInfo, type);  

    }else if(type === "UR") {
        const inputInfo = [
            {
                type: "title",
                content: "Generación de informe",
                ph: "",
                id: "",
                unit: "",
                flex: "column"
            },
            {
                type: "text",
                content: "Nombre del informe",
                ph: "Sin nombre",
                id: "",
                unit: "",
            },
            {
                type: "text",
                content: `Fecha de creación`,
                ph: "",
                id: "",
                unit: "",
            },
            {
                type: "button",
                content: "Generar informe",
                ph: "",
                id: "BC",
                unit: ""    
            }
        ];

        buttonCreator(inputInfo, type);    
    }else if(type === "BP") {
        const inputInfo = [
            {
                type: "project",
                content: "",
                ph: "",
                id: "",
                unit: "",
                flex: "column",
                options: {
                    project1: {
                        _name: {
                            type: "text",
                            content: "Proyecto 1",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonL: {
                            type: "button",
                            content: "Editar",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonS: {
                            type: "button",
                            content: "Ver",
                            ph: "",
                            id: "PBS",
                            unit: "",
                        },
                        buttonD: {
                            type: "button",
                            content: "Borrar",
                            ph: "",
                            id: "",
                            unit: "",
                        }
                    },
                    project2: {
                        _name: {
                            type: "text",
                            content: "Proyecto 2",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonL: {
                            type: "button",
                            content: "Editar",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonS: {
                            type: "button",
                            content: "Ver",
                            ph: "",
                            id: "PBS",
                            unit: "",
                        },
                        buttonD: {
                            type: "button",
                            content: "Borrar",
                            ph: "",
                            id: "",
                            unit: "",
                        }
                    },
                    project3: {
                        _name: {
                            type: "text",
                            content: "Proyecto 3",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonL: {
                            type: "button",
                            content: "Editar",
                            ph: "",
                            id: "",
                            unit: "",
                        },
                        buttonS: {
                            type: "button",
                            content: "Ver",
                            ph: "",
                            id: "PBS",
                            unit: "",
                        },
                        buttonD: {
                            type: "button",
                            content: "Borrar",
                            ph: "",
                            id: "",
                            unit: "",
                        }
                    }
                }
            },
        ];

        buttonCreator(inputInfo, type);    
    }else if(type === "PBS") {
        const inputInfo = [
            {
                type: "text",
                content: `Nombre del proyecto: <span class="yellow">Proyecto Polar</span>`,
                ph: "",
                id: "",
                unit: "",
            },
            {
                type: "text",
                content: `Nombre del circuito: <span class="yellow">Maquinaria pesada de la empresa polar</span>`,
                ph: "",
                id: "",
                unit: "",
            },
            {
                type: "text",
                content: `Fecha de creacion: <span class="yellow">15/07/25</span>`,
                ph: "",
                id: "",
                unit: "",
            },
            {
                type: "text",
                content: `Fecha de ultima generacion de informe: <span class="yellow">19/07/25</span>`,
                ph: "",
                id: "",
                unit: "",
            },
            {
                type: "text",
                content: `Ultimos resultados: <span class="yellow">Hay riesgo por temperatura alta\nVida util baja\nPorcentaje de degradacion del 0.5%\nCostos por consumo electrico entre los valores comunes\n</span>Se recomienda cambiar el equipo.`,
                ph: "",
                id: "",
                unit: "",
            },
        ]; 
        
        buttonCreator(inputInfo, type);
    }
}