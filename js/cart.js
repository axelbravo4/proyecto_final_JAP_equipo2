// Modo oscuro - claro
const toggle = document.getElementById('toggle');
if (toggle) {
    // Cargar modo oscuro si está activado
    if (localStorage.getItem('modoOscuro') === 'true') {
        document.body.classList.add('dark');
        toggle.checked = true;
    }
    
    // Guardar cuando cambie
    toggle.addEventListener('change', function(e) {
        document.body.classList.toggle('dark', this.checked);
        localStorage.setItem('modoOscuro', this.checked);
    });
}

// Funcionalidad del Carrito 

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
            <button class="boton-eliminar" data-id="${prod.id}">Eliminar</button>
            <p>${prod.currency} ${prod.cost}</p>
            <img src="${prod.image}" alt="${prod.name}" class="img-carrito">
        `;
        contenedorProductos.appendChild(divProducto);
    });

    contenedorProductos.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (!id) return;

        const productoDiv = e.target.closest(".producto-carrito");
        const findIndexById = () => carrito.findIndex(prod => String(prod.id) === String(id));

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
                    if (productoDiv) productoDiv.remove();
                }
            }
        } else if (e.target.classList.contains("boton-eliminar")) {
            console.log("Eliminar producto con ID:", id);
            const index = findIndexById();
            if (index !== -1) {
                carrito.splice(index, 1);
                delete cantidades[id];
                if (productoDiv) productoDiv.remove();
            } else {
                console.warn("No se encontró el producto para eliminar (index -1).ID:", id);
            }
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("cantidades", JSON.stringify(cantidades));

        if (productoDiv) {
            const span = productoDiv.querySelector("#cantidad-productos");
            if (span) {
                if (cantidaes[id]) {
                    span.textContent = cantidades[id];
                } else {
                }
            }
        }

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

            
            updateCartIconCount();
            location.reload();
        });
    } else {
        console.error("El botón con ID 'finalizar-compra' no existe en el DOM.");
    }
});
