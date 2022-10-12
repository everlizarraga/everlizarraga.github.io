


// Ejercicios Herramientas Styles
let eje_btn_clear;
function limpiarInputLocal(objeto) {
    objeto.value = "";
}

// /////////////////////////////////////////////////////////////////////
// Ejercicio 0
let eje0_data1 = document.getElementById('eje0_data1');
let eje0_data2 = document.getElementById('eje0_data2');
let eje0_span = document.getElementById('eje0_resultado');
let eje0_btn_procesar = document.getElementById('eje0_btn_procesar');
let eje0_btn_clear = document.getElementById('eje0_btn_clear');
let eje0_form = document.getElementById('eje0_form');

eje0_form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if(parseInt(eje0_data1.value) > parseInt(eje0_data2.value)){
        eje0_span.innerHTML = eje0_data1.value;
    } else {
        eje0_span.innerHTML = eje0_data2.value;
    }

}, false);

eje0_btn_clear.addEventListener('click', () => {
    limpiarInputLocal(eje0_data1);
    limpiarInputLocal(eje0_data2);
    eje0_span.innerHTML = '';
});


// /////////////////////////////////////////////////////////////////////
// Ejercicio 1
let eje1_data1 = document.getElementById('eje1_data1');
let eje1_data2 = document.getElementById('eje1_data2');
let eje1_span = document.getElementById('eje1_resultado');
let eje1_btn_procesar = document.getElementById('eje1_btn_procesar');
let eje1_btn_clear = document.getElementById('eje1_btn_clear');

eje1_btn_procesar.addEventListener('click', () => {
    let descuento = 'No hay descuento';
    if(eje1_data1.value == "ford" && eje1_data2.value == "fiesta"){
        descuento = 'Descuento de 5%';
    } 
    if(eje1_data1.value == "ford" && eje1_data2.value == "focus"){
        descuento = 'Descuento de 10%';
    }

    eje1_span.innerHTML = descuento;
});

eje1_btn_clear.addEventListener('click', () => {
    limpiarInputLocal(eje1_data1);
    limpiarInputLocal(eje1_data2);
    eje1_span.innerHTML = '';
});

// /////////////////////////////////////////////////////////////////////
// Ejercicio 2
let eje2_mes = document.getElementById("eje2-data1");
// let eje2_publicar = document.getElementById("eje2_resultado");
var eje2_span = window.getComputedStyle(document.getElementById('eje2_resultado'), '::after');
let eje2_btn = document.getElementById("eje2-btn-procesar");
let eje2_btn_clear = document.getElementById("eje2-btn-clear");

eje2_btn.addEventListener("click", () => {
    let meses31 = [1,3,5,7,8,10,12];
    let inputMes = parseInt(eje2_mes.value);
    let mensaje;
    if(meses31.some((element) => {return element == inputMes})) {
        mensaje = `El mes tiene 31 días`;
    } else {
        mensaje = `El mes tiene 30 días`;
    }

    // eje2_publicar.innerHTML = eje2_mes.value;
    eje2_resultado.dataset.content = mensaje;
});

eje2_btn_clear.addEventListener("click", () => {
    // eje2_publicar.innerHTML = "";
    eje2_resultado.dataset.content = "";
    limpiarInputLocal(eje2_mes);
});