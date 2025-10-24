document.addEventListener("DOMContentLoaded", () => {
  const listaProductos = document.getElementById("lista-productos");
  const catID = localStorage.getItem("catID");
  const searchForm = document.querySelector(".barra-busqueda");
  const searchInput = document.querySelector(".barra-busqueda input");

  console.log("catID:", catID);
  const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
  console.log("endpoint:", endpoint);

  if (!catID) {
    listaProductos.innerHTML = "<p>No hay categoría seleccionada. Volvé al inicio.</p>";
    return;
  }

  // --- estado global para filtros/orden/búsqueda ---
  let allProducts = [];
  let currentView = [];
  let currentSort = null; // 'ASC' | 'DESC' | 'REL'
  let searchQuery = "";

  // Debounce simple para evitar filtrar a cada tecla sin control
  function debounce(fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  // Carga inicial
  fetch(endpoint)
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    .then(data => {
      allProducts = data.products || [];
      // inicializar vista y renderizar respetando filtros (vacíos por ahora)
      aplicarFiltrosYOrden();
    })
    .catch(error => {
      console.error("Hubo un error cargando los productos:", error);
      listaProductos.innerHTML = "<p>Error al cargar productos. Intentá de nuevo más tarde.</p>";
    });

  // Función para mostrar productos (no borra la lista: se espera que quien la llame la limpie)
  function mostrarProductos(productos) {
    productos.forEach(prod => {
      const item = document.createElement("li");
      item.classList.add("producto-item");
      item.dataset.id = prod.id; // para identificar el producto al clickear
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

  // Función central que aplica búsqueda + filtro de precio + orden
  function aplicarFiltrosYOrden() {
    // leer valores de precio

    const minVal = document.getElementById("priceMinInput")?.value.trim();
    const maxVal = document.getElementById("priceMaxInput")?.value.trim();
    const min = minVal === "" ? -Infinity : parseInt(minVal, 10);
    const max = maxVal === "" ? Infinity : parseInt(maxVal, 10);

    currentView = allProducts.filter(p => {
      // filtrado por precio
      if (p.cost < min || p.cost > max) return false;

      // filtrado por búsqueda (si hay texto)
      if (searchQuery) {
        const name = (p.name || "").toString().toLowerCase();
        const desc = (p.description || "").toString().toLowerCase();
        if (!(name.includes(searchQuery) || desc.includes(searchQuery))) return false;
      }
      return true;
    });

    // aplicar orden si corresponde
    if (currentSort === "ASC") {
      currentView.sort((a, b) => a.cost - b.cost);
    } else if (currentSort === "DESC") {
      currentView.sort((a, b) => b.cost - a.cost);
    } else if (currentSort === "REL") {
      currentView.sort((a, b) => b.soldCount - a.soldCount);
    }

    // render
    listaProductos.innerHTML = "";
    if (currentView.length === 0) {
      listaProductos.innerHTML = "<p>No se encontraron productos que coincidan.</p>";
      return;
    }
    mostrarProductos(currentView);
  }

  // --- Listeners y hooks UI ---
  // evitar que el form recargue la página
  if (searchForm) {
    searchForm.addEventListener("submit", e => e.preventDefault());
  }

  // búsqueda en tiempo real 
  if (searchInput) {
    const onInput = debounce((e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      aplicarFiltrosYOrden();
    }, 150); // 150 ms, ajustable
    searchInput.addEventListener("input", onInput);
  }

  // Sort buttons
  document.getElementById("sortAscPrice")?.addEventListener("click", () => { currentSort = "ASC"; aplicarFiltrosYOrden(); });
  document.getElementById("sortDescPrice")?.addEventListener("click", () => { currentSort = "DESC"; aplicarFiltrosYOrden(); });
  document.getElementById("sortByRel")?.addEventListener("click", () => { currentSort = "REL"; aplicarFiltrosYOrden(); });

  // Botones de filtro por precio
  document.getElementById("btnFilterPrice")?.addEventListener("click", () => { aplicarFiltrosYOrden(); });
  document.getElementById("btnClearPrice")?.addEventListener("click", () => {
    const minI = document.getElementById("priceMinInput");
    const maxI = document.getElementById("priceMaxInput");
    if (minI) minI.value = "";
    if (maxI) maxI.value = "";
    aplicarFiltrosYOrden();
  });


  window.setCatID = function(id) {
    localStorage.setItem("catID", id);   // Guarda el ID de la categoría en Local Storage
    window.location = "products.html"    // Redirige a la página de productos
}




// Botón de cerrar sesión 
const btnCerrar = document.getElementById("boton-cerrar");
if (btnCerrar) {
  btnCerrar.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada correctamente");
    location.reload();
  });
}

//Cliquear en un producto
document.addEventListener("click", (e) => {
  const productoItem = e.target.closest(".producto-item");
  if (productoItem) {
    const nombreProducto = productoItem.querySelector("h3")?.textContent;
    const idProducto = productoItem.dataset.id;
    if (nombreProducto) {
      localStorage.setItem("prodName", nombreProducto);
      localStorage.setItem("prodID", idProducto);
      window.location.href = "product-info.html";
    }
  }
});


// Modo oscuro - claro
let toggle=document.getElementById('toggle');
toggle.addEventListener('change', (event)=>{
    let checked=event.target.checked;
    document.body.classList.toggle('dark');
})

}); // fin DOMContentLoaded

