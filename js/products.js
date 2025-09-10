// API para obtener productos
document.addEventListener("DOMContentLoaded", () => {
  const listaProductos = document.getElementById("lista-productos");
  const catID = localStorage.getItem("catID");

  // (opcional pero útil para debug)
  console.log("catID:", catID);

  const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
  console.log("endpoint:", endpoint);

  if (!catID) {
    listaProductos.innerHTML = "<p>No hay categoría seleccionada. Volvé al inicio.</p>";
    return;
  }

  // --- NUEVO estado para filtro/orden ---
  let allProducts = [];
  let currentView = [];
  let currentSort = null; // 'ASC' | 'DESC' | 'REL'

  fetch(endpoint)
    .then(response => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    // >>> CAMBIO mínimo: guardo productos y renderizo desde currentView
    .then(data => {
      allProducts = data.products;
      currentView = [...allProducts];
      listaProductos.innerHTML = "";
      mostrarProductos(currentView);
    })
    .catch(error => {
      console.error("Hubo un error cargando los productos:", error);
      listaProductos.innerHTML = "<p>Error al cargar productos. Intentá de nuevo más tarde.</p>";
    });

  // Función para mostrar los productos en la página (tu base, igual)
  function mostrarProductos(productos) {
    productos.forEach(prod => {
      const item = document.createElement("li");
      item.classList.add("producto-item");
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

  // ---------- NUEVO: helpers de filtro/orden ----------
  function aplicarOrden() {
    if (currentSort === "ASC") {
      currentView.sort((a, b) => a.cost - b.cost);
    } else if (currentSort === "DESC") {
      currentView.sort((a, b) => b.cost - a.cost);
    } else if (currentSort === "REL") {
      currentView.sort((a, b) => b.soldCount - a.soldCount);
    }
    listaProductos.innerHTML = "";
    mostrarProductos(currentView);
  }

  function filtrarPorPrecio() {
    const minVal = document.getElementById("priceMinInput")?.value.trim();
    const maxVal = document.getElementById("priceMaxInput")?.value.trim();
    const min = minVal === "" ? -Infinity : parseInt(minVal, 10);
    const max = maxVal === "" ?  Infinity : parseInt(maxVal, 10);

    currentView = allProducts.filter(p => p.cost >= min && p.cost <= max);
    aplicarOrden(); // respeta el orden vigente si hubiera
  }

  function limpiarFiltro() {
    const minI = document.getElementById("priceMinInput");
    const maxI = document.getElementById("priceMaxInput");
    if (minI) minI.value = "";
    if (maxI) maxI.value = "";
    currentView = [...allProducts];
    aplicarOrden();
  }

  // ---------- NUEVO: listeners de los controles ----------
  document.getElementById("sortAscPrice") ?.addEventListener("click", () => { currentSort = "ASC";  aplicarOrden(); });
  document.getElementById("sortDescPrice")?.addEventListener("click", () => { currentSort = "DESC"; aplicarOrden(); });
  document.getElementById("sortByRel")    ?.addEventListener("click", () => { currentSort = "REL";  aplicarOrden(); });

  document.getElementById("btnFilterPrice")?.addEventListener("click", filtrarPorPrecio);
  document.getElementById("btnClearPrice") ?.addEventListener("click", limpiarFiltro);
});

// Botón de cerrar sesión
const btnCerrar = document.getElementById("boton-cerrar");
if (btnCerrar) {
  btnCerrar.addEventListener("click", () => {
    localStorage.removeItem("usuario");
    alert("Sesión cerrada correctamente");
    location.reload();
  });
}