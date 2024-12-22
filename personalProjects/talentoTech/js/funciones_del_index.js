document.addEventListener("DOMContentLoaded", () => 
  {
  const productosContainer = document.querySelector("#products-list");

  //capturo los elementos html (botones) que necesito
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageInfo = document.getElementById("page-info");

  //estan variables se utilizan para ver la pagina actual, la cantidad de elementos a mostrar y el total de elementos.
  let currentPage = 1;
  const limit = 20;
  let totalProductos = 0;


  function fetchProductos(page) 
  {
    //esta variable se usa para saber los elemtos que ya mostre y los que tienen que mostrar, o sea a partir del 2 en adelante
    const skip = (page - 1) * limit;

    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        totalProductos = data.total;
        const productos = data.products;

        // Limpia el contenedor de productos
        productosContainer.innerHTML = "";

        // Genera las cards de productos
        productos.forEach((product) => 
          {
          const cardDiv = document.createElement("li");
          cardDiv.className = "product-card";

          cardDiv.innerHTML = `
            <div>
              <div class="product-card__img-container">
                <img class="product-card__img" src="${product.thumbnail}" alt="${product.title}">
              </div>
              <div class="product-card__info">
                <h3 class="product-card__title">${product.title}</h3>
                <p class="product-card__description">${product.description}</p>
                <div class="price-cant">
                  <div>
                    <h4 class="product-card__precio">Precio:</h4>
                    <p>$ <span class="product-card__precio-number">${product.price}</span></p>
                  </div>
                  <div>
                    <h4>Cantidad:</h4>
                    <div class="product-card__cant-container">
                      <button class="btn product-card__cant-minus">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-440v-80h560v80H200Z"/></svg>
                        </span>
                      </button>
                      <input type="number" class="product-card__cant-number" value="1" min="1" step="1" placeholder="1">
                      <button class="btn product-card__cant-plus">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <button class="product-card__btn-add">Añadir al carrito</button>
              </div>
            </div>
          `;

          const bloqueCantidad = cardDiv.querySelector('.product-card__cant-container');
          const input = bloqueCantidad.querySelector('input[type="number"]');
          agregarValidadorDeCantidades(input);
          const btnMinus = bloqueCantidad.querySelector('.product-card__cant-minus');
          const btnPlus = bloqueCantidad.querySelector('.product-card__cant-plus');
          agregarFuncionalidadAlBloqueCantidad(input, btnMinus, btnPlus);
          // Agregar evento al botón "Agregar"
          const botonAgregar = cardDiv.querySelector(".product-card__btn-add");
          botonAgregar.addEventListener("click", () => 
            {
            agregarAlCartito(product, input);
          });

          // Añadir la card al contenedor
          productosContainer.appendChild(cardDiv);
        });


        pageInfo.textContent = `${currentPage}`;          
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = (currentPage * limit) >= totalProductos;



      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Función para agregar al carrito usando localStorage
  function agregarAlCartito(product, input) 
  {
    const inputBox = controladorInput(input);
    const productCount = inputBox.getValue();
    const pedidoID = generarPedidoID();
    let cart = JSON.parse(localStorage.getItem("talentoTechFront:2024")) || [];
    cart.push({...product, productCount, pedidoID});
    localStorage.setItem("talentoTechFront:2024", JSON.stringify(cart));
    alert(`${product.title} ha sido agregado al carrito!`);
  }


  prevBtn.addEventListener("click", () => 
    {
    if (currentPage > 1) {
        currentPage--;
        fetchProductos(currentPage);
    }
    });


  nextBtn.addEventListener("click", () => 
    {
    if ((currentPage * limit) < totalProductos) 
      {
        currentPage++;
        fetchProductos(currentPage);
    }
    });



  // Carga inicial de productos
  fetchProductos(currentPage);
});

