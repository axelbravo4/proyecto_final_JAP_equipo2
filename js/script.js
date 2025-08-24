document.addEventListener("DOMContentLoaded", () => {
    const listaProductos = document.getElementById("lista-productos");
    const endpoint = "https://japceibal.github.io/emercado-api/cats_products/101.json";
  //Mostrar error si no se puede cargar el JSON
    fetch(endpoint)
      .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then(data => mostrarProductos(data.products))
      .catch(error => {
        console.error("Hubo un error cargando los productos:", error);
        listaProductos.innerHTML = "<p>Error al cargar productos. Intentá de nuevo más tarde.</p>";
      });
  // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
      productos.forEach(prod => {
        const item = document.createElement("li");
        item.classList.add("producto-item");

  // Estructura del producto(estilos en CSS)
        item.innerHTML = `
          <img src="${prod.image}" alt="${prod.name}">
          <div class="producto-info">
            <h3>${prod.name}</h3>
            <p>${prod.description}</p>
            <p class="precio">${prod.currency} ${prod.cost}</p>
            <p class="vendidos">Vendidos: ${prod.soldCount}</p>
          </div>
        `;
  
        listaProductos.appendChild(item);
      });
    }
  });