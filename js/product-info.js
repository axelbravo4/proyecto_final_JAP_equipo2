// Este archivo maneja la visualización de la información detallada del producto seleccionado.
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("producto-info");
    const nombreProducto = localStorage.getItem("idProducto");

    if (!nombreProducto) {
        contenedor.innerHTML = "<p>No se ha seleccionado ningún producto.</p>";
        return;
    }

    // Agarrar categoría y producto
    const catID = localStorage.getItem("prodName");
    const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;
    
    fetch(endpoint)
    .then(response => {
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        return response.json();
    })

     

  // Buscar el producto por el nombre
.then(data => {
    const producto = data.products.find(p => p.name === nombreProducto);
    if (!producto) {
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }


     // Mostrar la información del producto
    
        contenedor.innerHTML = `
        <h2>${producto.name}</h2>
        <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
        <p><strong>Descripción:</strong> ${producto.description}</p>
        <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
        <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
        `;

    // Llamar a la función para mostrar el producto
    mostrarProducto(producto);
})
});
