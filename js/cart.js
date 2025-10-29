document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedorProductos = document.getElementById("cart1");
    const contenedorTotal = document.getElementById("cart2");

    if (carrito.length === 0) {
        contenedorProductos.innerHTML = "<p>El carrito está vacío.</p>";
        contenedorTotal.innerHTML = "";
        return;
    }

    let cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};

    carrito.forEach(prod => {
        if (!cantidades[prod.id]) {
            cantidades[prod.id] = 1;
        }
    });

    function calcularTotal() {
        let total = 0;
        carrito.forEach(prod => {
            total += prod.cost * cantidades[prod.id];
        })
        document.getElementById("total-compra").textContent =
        `Total: ${carrito[0].currency || ''} ${total.toLocaleString()} `;
    }

    contenedorProductos.innerHTML = "";
    carrito.forEach(prod => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto-carrito");
       
        // Funcionalidad en Desarrollo