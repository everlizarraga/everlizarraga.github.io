import * as appToDo from "./modules/contorlerApp.js";

appToDo.init();
// window.addEventListener('resize', () => {
//   console.log('Windows: Resize !!!');
// });


// const headerPanel = document.querySelector('.quick-input-panel__header h3');
// const floatingActions = document.querySelector('.floating-actions');
// // floatingActions.style.
// // floatingActions.style.marginBottom = '20px';

// // Esta API es más moderna y precisa, pero no está soportada en todos los navegadores
// if (window.visualViewport) {
//   // alert('Soporta el navegador a .visualViewport');
//   window.addEventListener('resize', () => {
//   // window.visualViewport.addEventListener('resize', () => {
//       const alturaViewport = window.visualViewport.height;
//       const alturaVentana = window.innerHeight;
      
//       // Si hay una diferencia significativa, probablemente el teclado está visible
//       const tecladoVisible = alturaVentana - alturaViewport > 120;
//       const diferencia = alturaVentana - alturaViewport;
      
//       if (tecladoVisible) {
//         console.log('Teclado visible');
//         headerPanel.textContent = `[HW:${alturaVentana}][HV:${alturaViewport}]`;
//         floatingActions.style.marginBottom = `${diferencia}px`;
//         // Ajustar UI
//       } else {
//         console.log('Teclado oculto');
//         headerPanel.textContent = `[HW:${alturaVentana}][HV:${alturaViewport}]`;
//         floatingActions.style.marginBottom = `${diferencia}px`;
//           // Restaurar UI
//       }
//   });
// }