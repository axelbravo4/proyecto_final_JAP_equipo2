// Mostrar información de un producto específico
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("producto-info");
    const nombreProducto = localStorage.getItem("prodName");
    const catNombre = localStorage.getItem("catNombre");
    const productosRelacionado = document.getElementById("productos-relacionados");
  
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
          <p><strong>Categoría:</strong> ${catNombre}</p>
          <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
          <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
        `;
      })
      .catch(error => {
        console.error("Error cargando producto:", error);
        contenedor.innerHTML = "<p>Error al cargar el producto.</p>";
      });
  });

  window.setCatID = function(id) {
    localStorage.setItem("catID", id);   // Guarda el ID de la categoría en Local Storage
    window.location = "products.html"    // Redirige a la página de productos
}
  
  // Botón de cerrar sesión (igual que antes)
  const btnCerrar = document.getElementById("boton-cerrar");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      alert("Sesión cerrada correctamente");
      location.reload();
    });
  }


    //calificación

document.querySelectorAll('.calificacion:not(.readonly) i').forEach(star => {
    star.addEventListener('click', function() {
        const rating = parseInt(this.getAttribute('data-rating'));
        const container = this.parentElement;
        
        container.querySelectorAll('i').forEach(s => {
            const starRating = parseInt(s.getAttribute('data-rating'));
            if (starRating <= rating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
    });
});


// Productos relacionados
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-relacionados");

  const catID = localStorage.getItem("catID");

  const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    data.products.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
      
      
      // Muestra los productos relacionados (hay que personalizar el diseño, está en product-info.CSS, arriba de footer)
      div.innerHTML = `
        <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
        <h3>${producto.name}</h3>
        <p>${producto.description}</p>
      `;

      contenedor.appendChild(div);
  });
});
});
