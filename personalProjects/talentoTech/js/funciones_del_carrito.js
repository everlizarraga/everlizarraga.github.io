document.addEventListener('DOMContentLoaded', () => {
  const carritoItemsStorage = JSON.parse(localStorage.getItem('talentoTechFront:2024')) || [];

  //btn de modos de vistas
  const btnModeCards = document.querySelector('.car-switcher-btn--cards');
  const btnModeTable = document.querySelector('.car-switcher-btn--table');

  //Contenedroes
  const containerCards = document.querySelector('.car-cards');
  const containerTable = document.querySelector('.car-table__items');
  const sectionTable = document.querySelector('.car-table__container');

  //Total
  const elementoTotal = document.querySelector('.car-total');

  //btn call to action
  const btnFinalizarCompra = document.getElementById('btn-finaliza-compra');
  const btnVolverAlInicio = document.getElementById('btn-seguir-comprando');


  let total = 0;
  carritoItemsStorage.forEach(product => {
    // Como hay 2 vistas: una view de cards y otra view de tabla, tenemos que agregarlas a mabas a la vez.
    // const subTotal = (product.price * product.productCount).toFixed(2);
    const subTotal = (product.price * product.productCount);

    //Agregar CARD y FILA
    //===========================
    const nuevaFila = crearFilaDeTabla(product);
    const inputsDeLaTabla = [...nuevaFila.querySelectorAll('.td-count__value')];
    const subTotalFila = nuevaFila.querySelector('.sub-total');
    const btnDeleteFila = nuevaFila.querySelector('.td-btn__delete');
    subTotalFila.innerHTML = `${subTotal.toFixed(2)}`;

    const nuevaCard = crearCard(product);
    const inputsDeLaCardList = [...nuevaCard.querySelectorAll('.car-card__count-number')];
    const subTotalCard = nuevaCard.querySelector('.car-card__subtotal span');
    const btnDeleteCard = nuevaCard.querySelector('.car-card__btn--delete');
    subTotalCard.innerHTML = `${subTotal.toFixed(2)}`;

    const actualizarSubtotalDeLaFila = function(unValor) {
      subTotalFila.textContent = `${(unValor * product.price).toFixed(2)}`; 
    };
    const actualizarSubtotalDeLaCard = function(unValor) {
      subTotalCard.textContent = `${(unValor * product.price).toFixed(2)}`;
    };
    const listaCallbacksUbdate = [
      actualizarSubtotalDeLaFila, 
      actualizarSubtotalDeLaCard,
      actualizarTotal,
      (e) => {actualizarCantidadDeProductoEnLocalstorage(product.pedidoID, e)}
    ];

    [...nuevaFila.querySelectorAll('.td-count__value')].forEach(e => agregarValidadorDeCantidades(e, listaCallbacksUbdate));
    agregarValidadorDeCantidades(
      nuevaCard.querySelector('.car-card__count-number'),
      listaCallbacksUbdate
      // (es) => {listaCallbacksUbdateSubTotal.forEach(ada => {ada(es)})}
    );
    agregarFuncionalidadAlBloqueCantidad(
      nuevaCard.querySelector('.car-card__count-number'),
      nuevaCard.querySelector('.car-card__btn--minus'),
      nuevaCard.querySelector('.car-card__btn--plus'),
      inputsDeLaTabla,
      listaCallbacksUbdate
    );

    btnDeleteFila.addEventListener('click', () => {
      eliminarProducto(product);
      actualizarTotal();
    });

    btnDeleteCard.addEventListener('click', () => {
      eliminarProducto(product);
      actualizarTotal();
    });

    containerTable.appendChild(nuevaFila);
    containerCards.appendChild(nuevaCard);
    
    
    //Sumar al total
    // console.log(`Total:${total} | subTotal:${subTotal}`);
    total += subTotal;


    //================================
    //Conectando inputs de cantidades de un mismo producto para que al editar uno se actualicen en los otros inputs. Es decir si actualizo las cantidades de alguna card, se deberia actualizar tambien las cantidades de la tabla.
    enlazarInputsDeCantidad([...inputsDeLaCardList, ...inputsDeLaTabla]);

  });

  //Mostrar el Total
  elementoTotal.textContent = `${total.toFixed(2)}`;

  //Finalizar compra [btnFinalizarCompra][btnVolverAlInicio]
  btnFinalizarCompra.addEventListener('click', () => {
    Swal.fire({
      title: 'Compra Procesada',
      text: 'Se ha procesado la compra #1200',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });

    // Limpiar el carrito después de finalizar la compra
    localStorage.removeItem('talentoTechFront:2024'); 
    
    // Redirigir al inicio despues de 4 segundos
    setTimeout(() => {
    window.location.href = './index.html'; 
    }, 4000);  
  });

  btnVolverAlInicio.addEventListener('click', () => {
    localStorage.removeItem('talentoTechFront:2024'); 
    window.location.href = './productos.html';
  });

  //================================
  //Dando funcionalidad al cambio de Vista de la card 
  //[btnModeCards][btnModeTable] class: car-switcher-btn--select | disable
  btnModeCards.addEventListener('click', () => {
    btnModeCards.classList.add('car-switcher-btn--select');
    btnModeTable.classList.remove('car-switcher-btn--select');
    containerCards.classList.remove('disable');
    sectionTable.classList.add('disable');
  });
  btnModeTable.addEventListener('click', () => {
    btnModeTable.classList.add('car-switcher-btn--select');
    btnModeCards.classList.remove('car-switcher-btn--select');
    sectionTable.classList.remove('disable');
    containerCards.classList.add('disable');
  });

  


  //================================

  function eliminarProducto(product) {
    //Eliminar product del carritoItemsStorage y actualizar localStorage
    const index = carritoItemsStorage.findIndex(e => e == product);
    if(index != -1) {
      carritoItemsStorage.splice(index, 1);
      acturalizarCarritoItemsStorage();
    } else console.error('No se encontro el pedido en carritoItemsStorage');

    //Elimnar la card del cardList
    const listaDeCards = [...containerCards.children];
    const targetCard = listaDeCards.find(e => e.getAttribute('data-pedido-id') == product.pedidoID);
    if(targetCard) {
      targetCard.remove();
    } else console.error(`No se encontro la CARD del pedido id:${product.pedidoID}`);

    //Eliminar la fila de la tabla
    const listaDeFilas = [...containerTable.children];
    const targetFila = listaDeFilas.find(e => e.getAttribute('data-pedido-id') == product.pedidoID);
    if(targetFila) {
      targetFila.remove();
    } else console.error(`No se encontro la FILA del pedido id:${product.pedidoID}`);
  }

  function actualizarTotal() {
    //car-card__subtotal
    const listaDeCards = [...containerCards.children];
    const nuevoTotal = listaDeCards
      .map(card => {
        const element = card.querySelector('.car-card__subtotal span');
        const value = parseFloat(element.textContent);
        return value;
      })
      .reduce((acum, e) => acum + e, 0);
    elementoTotal.textContent = `${nuevoTotal.toFixed(2)}`;
  }


  function acturalizarCarritoItemsStorage() {
    localStorage.setItem("talentoTechFront:2024", JSON.stringify(carritoItemsStorage));
  }

  function actualizarCantidadDeProductoEnLocalstorage(productId, valor) {
    const target = carritoItemsStorage.find(product => product.pedidoID == productId);
    if(target) {
      target.productCount = valor;
      acturalizarCarritoItemsStorage();
    } else {
      console.error(`No se encontro el producto [ID:${productId} - valor:${valor}] en el localstorage`);
    }
  }

});




function crearCard(product) {
  const nuevaCard = document.createElement('li');
  nuevaCard.setAttribute('data-api-id', product.id);
  nuevaCard.setAttribute('data-pedido-id', product.pedidoID);
  nuevaCard.className = "car-card";
  nuevaCard.innerHTML = `
    <div class="car-card__img-container">
      <img class="car-card__img" src="${product.thumbnail}" alt="${product.title}">
    </div>
    <div class="car-card__info-container">
      <h3 class="car-card__title">${product.title}</h3>
      <div class="car-card__price-container">
        <h4 class="car-card__subtitle car-card__price-title">Precio</h4>
        <p class="car-card__price">$ <span>${product.price}</span></p>
      </div>
      <div class="car-card__count-container">
        <h4 class="car-card__subtitle car-card__count-title">Cantidad</h4>
        <div class="car-card__count">
          <button class="btn car-card__btn car-card__btn--minus">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-440v-80h560v80H200Z"/></svg>
            </span>
          </button>
          <input class="car-card__count-number" type="number" value="${product.productCount}" min="1" placeholder="${product.productCount}">
          <button class="btn car-card__btn car-card__btn--plus">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
            </span>
          </button>
        </div>
      </div>
      <div class="car-card__subtotal-container">
        <h4 class="car-card__subtitle car-card__subtotal-title">Subtotal</h4>
        <p class="car-card__subtotal">$ <span>14400</span></p>
      </div>
    </div>
    <button class="btn car-card__btn car-card__btn--delete">
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
      </span>
    </button>
  `;
  return nuevaCard;
}

function crearFilaDeTabla(product) {
  const nuevaFila = document.createElement('tr');
  nuevaFila.setAttribute('data-api-id', product.id);
  nuevaFila.setAttribute('data-pedido-id', product.pedidoID);
  nuevaFila.innerHTML = `
    <td class="td-product">
      <p>${product.title}</p>
      <p class="car-table__mobile-content">
        <input class="td-count__value" type="number" value="${product.productCount}" min="1" placeholder="${product.productCount}"> x $<span class="td-price__value">${product.price}</span>
      </p>
    </td>
    <td class="td-price">$ <span class="td-price__value">${product.price}</span></td>
    <td class="td-count"><input class="td-count__value" type="number" value="${product.productCount}" min="1" placeholder="${product.productCount}"></td>
    <td>$ <span class="sub-total">9.99</span></td>
    <td class="td-btn">
      <button class="btn td-btn__delete">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z"/></svg>
        </span>
      </button>
    </td>
  `;
  return nuevaFila;
}
