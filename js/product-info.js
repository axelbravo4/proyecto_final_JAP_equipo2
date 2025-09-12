// Mostrar información de un producto específico
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("producto-info");
    const nombreProducto = localStorage.getItem("prodName");
  
    if (!nombreProducto) {
      contenedor.innerHTML = "<p>No se seleccionó ningún producto. Volvé al listado.</p>";
      return;
    }
  
    // Recuperar la categoría desde localStorage
    const catID = localStorage.getItem("catID");
    const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
  
    fetch(endpoint)
      .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
      })
      .then(data => {
        // Buscar el producto por nombre
        const producto = data.products.find(p => p.name === nombreProducto);
  
        if (!producto) {
          contenedor.innerHTML = "<p>No se encontró el producto.</p>";
          return;
        }
  
        // Mostrar info del producto
        contenedor.innerHTML = `
          <h2>${producto.name}</h2>
          <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
          <p><strong>Descripción:</strong> ${producto.description}</p>
          <p><strong>Categoría:</strong> ${producto.category}</p>
          <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
          <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
        `;
      })
      .catch(error => {
        console.error("Error cargando producto:", error);
        contenedor.innerHTML = "<p>Error al cargar el producto.</p>";
      });
  });
  
  // Botón de cerrar sesión (igual que antes)
  const btnCerrar = document.getElementById("boton-cerrar");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      alert("Sesión cerrada correctamente");
      location.reload();
    });
  }
  