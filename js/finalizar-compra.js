document.addEventListener("DOMContentLoaded", () => {
    const contenedorResumen = document.getElementById("finalizar-compra");
    const seccionEnvio = document.getElementById("tipo-de-envio");
    const seccionPago = document.getElementById("forma-de-pago");
    const checkboxesEnvio = seccionEnvio ? seccionEnvio.querySelectorAll('input[type="checkbox"]') : [];
    const checkboxesPago = seccionPago ? seccionPago.querySelectorAll('input[type="checkbox"]') : [];
    const botonPagar = document.getElementById("finalizar-compra-boton");
    const botonCancelar = document.getElementById("cancelar-compra-boton");

   // Variables traidas del localStorage
   let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
   let cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};
   let porcentajeEnvio = 0;


// Funciones
 
    // ¿A que no adivinas qué hace esto? :D
   function mostrarListaProductos(){
    let html = "<h4>Productos en el carrito:</h4><ul>";
    carrito.forEach(prod => {
        const cantidad = cantidades[prod.id] || 1;
        const subtotalProd = prod.cost * cantidad;
        html += `<li>${prod.name} - Cantidad: ${cantidad} - Subtotal: ${prod.currency} ${subtotalProd.toLocaleString()}</li>`;
   });
    html += "</ul>";
    return html;
    }

   // Calcula el subtotal, obviamente
   function calcularSubtotal() {
       let subtotal = 0;
       carrito.forEach(prod => {
           subtotal += prod.cost * (cantidades[prod.id] || 1);
       });
       return subtotal;
   }

   // Hace... pues eso, actualizar los costos
   function actualizarCostos() {
       const subtotal = calcularSubtotal();
       const costoEnvio = subtotal * porcentajeEnvio;
       const costoTotal = subtotal + costoEnvio;

       contenedorResumen.innerHTML = `
         ${mostrarListaProductos()}
         <hr>
         <p><strong>Subtotal:</strong> ${carrito[0].currency} ${subtotal.toLocaleString()}</p>
         <p><strong>Envío (${(porcentajeEnvio * 100).toFixed(0)}%):</strong> ${carrito[0].currency} ${costoEnvio.toLocaleString()}</p>
         <p><strong>Total a pagar:</strong> ${carrito[0].currency} ${costoTotal.toLocaleString()}</p>
       `;
   }


// Validaciones

// Asegurar selección única en checkboxes de envío
checkboxesPago.forEach(check => {
    check.addEventListener("change", () => {
        checkboxesPago.forEach(cb => {
            if (cb !== check) cb.checked = false;
        });
    });
});

// Validar formulario antes de finalizar compra
function validarFormulario(){
    const camposTexto = document.querySelectorAll("#direccion-calle, #direccion-numero, #direccion-esquina");
    const seleccionarLocalidad = document.getElementById("localidades");
    
    // Validar campos de texto
    for (let campo of camposTexto) {
        if (campo.value.trim() === "") {
            alert(`Por favor, completa el campo "${campo.previousElementSibling.textContent}".`);
            campo.focus();
            return false;
        }
    }
    // Validar selección de localidad
    if (!seleccionarLocalidad || seleccionarLocalidad.value === "--Seleccionar--") {
        alert("Por favor, selecciona una localidad.");
        seleccionarLocalidad.focus();
        return false;
    }
    // Validar selección de envío y pago
    const envioSeleccionado = Array.from(checkboxesEnvio).some(cb => cb.checked);
    if (!envioSeleccionado) {
        alert("Por favor, selecciona un tipo de envío.");
        return false;
    }

    const pagoSeleccionado = Array.from(checkboxesPago).some(cb => cb.checked);
    if (!pagoSeleccionado) {
        alert("Por favor, selecciona una forma de pago.");
        return false;
    }

    return true;
}



// Eventos

checkboxesEnvio.forEach(check => {
    check.addEventListener("change", () => {
        checkboxesEnvio.forEach(cb => {
            if (cb !== check) cb.checked = false;
        });

        if (check.id === "standard" && check.checked) {
            porcentajeEnvio = 0.05;
        } else if (check.id === "express" && check.checked) {
            porcentajeEnvio = 0.07;
        } else if (check.id === "premium" && check.checked) {
            porcentajeEnvio = 0.15;
        } else {
            porcentajeEnvio = 0;
        }

        actualizarCostos();
    });
});

if (botonPagar){
    botonPagar.addEventListener("click", () => {
        if (!validarFormulario()) return;
        alert("¡Gracias por su compra! Su pedido ha sido procesado.");
        localStorage.removeItem("carrito");
        localStorage.removeItem("cantidades");
        window.location = "products.html";
    });
}

if (botonCancelar){
    botonCancelar.addEventListener("click", () => {
        if (confirm("¿Está seguro que desea cancelar la compra? Se vaciará el carrito.")) {
            localStorage.removeItem("carrito");
            localStorage.removeItem("cantidades");
            window.location = "products.html";
        }
    });
}

// Esto para que se cargue todo bien al inicio
actualizarCostos();
});

// Este código fue hecho por Axel a las 4 AM mientras se tomaba una taza 500ml de café (dos cucharadas soperas de café instantáneo en agua caliente y 4 de azucar) y escuchaba música de vocaloid.