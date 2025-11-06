document.addEventListener("DOMContentLoaded", () => {
    const contenedorProductos = document.getElementById("cart1");
    const contenedorTotal = document.getElementById("cart2");

    function updateCartIconCount() {
        const cartCountElem = document.getElementById("cart-count");
        if (!cartCountElem) return;
    
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};
    
        // Sumar todas las cantidades reales
        const totalItems = carrito.reduce((acc, prod) => acc + (cantidades[prod.id] || 1), 0);
    
        if (totalItems === 0) {
            cartCountElem.style.display = "none";
        } else {
            cartCountElem.style.display = "flex";
            cartCountElem.textContent = totalItems;
        }
    }

    // Llamamos al cargar la página
    updateCartIconCount();

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
        });

        const totalCompraElement = document.getElementById("total-compra");
        if (totalCompraElement) {
            totalCompraElement.textContent = `Total: ${carrito[0].currency || ""} ${total.toLocaleString()}`;
        } else {
            console.error("El elemento con ID 'total-compra' no existe en el DOM.");
        }
    }

    calcularTotal();

    contenedorProductos.innerHTML = "";
    carrito.forEach(prod => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("producto-carrito");
        divProducto.innerHTML = `
            <div id="nombre">${prod.name}</div>
            <div id="boton-sumar-restar">
                <button class="boton-restar" data-id="${prod.id}">-</button>
                <span id="cantidad-productos">${cantidades[prod.id]}</span>
                <button class="boton-sumar" data-id="${prod.id}">+</button>
            </div>
            <p>${prod.currency} ${prod.cost}</p>
            <img src="${prod.image}" alt="${prod.name}" class="img-carrito">
        `;
        contenedorProductos.appendChild(divProducto);
    });

    contenedorProductos.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        if (e.target.classList.contains("boton-sumar")) {
            cantidades[id]++;
        } else if (e.target.classList.contains("boton-restar")) {
            if (cantidades[id] > 1) {
                cantidades[id]--;
            } else {
                const index = carrito.findIndex(prod => prod.id === id);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    delete cantidades[id];
                    e.target.closest(".producto-carrito").remove();
                }
            }
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("cantidades", JSON.stringify(cantidades));

        const span = e.target.parentElement.querySelector("#cantidad-productos");
        if (span) span.textContent = cantidades[id];

        calcularTotal();
        updateCartIconCount();
    });

    const botonFinalizar = document.getElementById("finalizar-compra");
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("Tu carrito está vacío.");
                return;
            }

            alert("¡Compra finalizada con éxito!");
            localStorage.removeItem("carrito");
            localStorage.removeItem("cantidades");
            updateCartIconCount();
            location.reload();
        });
    } else {
        console.error("El botón con ID 'finalizar-compra' no existe en el DOM.");
    }
});
