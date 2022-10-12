


// Ejercicios Herramientas Styles
let eje_btn_clear;
function limpiarInputLocal(objeto) {
    objeto.value = "";
}

// Ejercicio 1
let model1, model2;

// Ejercicio 2
let eje2_mes = document.getElementById("eje2-data1");
let eje2_publicar = document.getElementById("eje2-resultado");
let eje2_btn = document.getElementById("eje2-btn-procesar");
let eje2_btn_clear = document.getElementById("eje2-btn-clear");

eje2_btn.addEventListener("click", () => {
    eje2_publicar.innerHTML = eje2_mes.value;
    // alert(`[[[ ${eje2_mes} ]]]`);
});

eje2_btn_clear.addEventListener("click", () => {
    eje2_publicar.innerHTML = "";
    limpiarInputLocal(eje2_mes);
});