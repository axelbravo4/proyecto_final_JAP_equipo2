document.addEventListener("DOMContentLoaded", () => {
  const contenedorProducto = document.getElementById("producto-info");
  const nombreProducto = localStorage.getItem("prodName");
  const catNombre = localStorage.getItem("catNombre");
  const botonCarrito = document.getElementById("carrito");

  if (!nombreProducto) {
      contenedorProducto.innerHTML = "<p>No se seleccionó ningún producto. Volvé al listado.</p>";
      return;
  }

  const catID = localStorage.getItem("catID");
  const endpoint = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

  fetch(endpoint)
      .then(res => res.json())
      .then(data => {
          const producto = data.products.find(p => p.name === nombreProducto);

          if (!producto) {
              contenedorProducto.innerHTML = "<p>No se encontró el producto.</p>";
              return;
          }

          contenedorProducto.innerHTML = `
              <h2>${producto.name}</h2>
              <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
              <p><strong>Descripción:</strong> ${producto.description}</p>
              <p><strong>Categoría:</strong> ${catNombre}</p>
              <p><strong>Precio:</strong> ${producto.currency} ${producto.cost}</p>
              <p><strong>Vendidos:</strong> ${producto.soldCount}</p>
         `;
      })
      .catch(err => {
          console.error("Error al cargar producto:", err);
          contenedorProducto.innerHTML = "<p>Error al cargar el producto</p>";
      });



  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  botonCarrito.addEventListener("click", () => {
      fetch(endpoint)
          .then(res => res.json())
          .then(data => {
              const producto = data.products.find(p => p.name === nombreProducto);
              if (!producto) return;

              if (!carrito.some(p => p.id === producto.id)) {
                  carrito.push(producto);
                  localStorage.setItem("carrito", JSON.stringify(carrito));
                  alert("Producto agregado al carrito");
              } else {
                  alert("El producto ya está en el carrito");
              }
          });
  });



  const contenedorRelacionados = document.getElementById("productos-relacionados");

  fetch(endpoint)
      .then(res => res.json())
      .then(data => {
          contenedorRelacionados.innerHTML = "";

          data.products.forEach(producto => {
              const div = document.createElement("div");
              div.classList.add("producto");

              div.innerHTML = `
                  <img src="${producto.image}" alt="${producto.name}" class="img-fluid">
                  <h3>${producto.name}</h3>
                  <p>${producto.description}</p>
              `;
              contenedorRelacionados.appendChild(div);
          });
      });
});



document.addEventListener("click", e => {
  const card = e.target.closest(".producto");
  if (!card) return;

  const nombre = card.querySelector("h3").textContent;

  localStorage.setItem("prodName", nombre);
  window.location = "product-info.html";
});



const productID = localStorage.getItem("prodID");
const contenedorComentarios = document.getElementById("calificaciones-y-comentarios");

const stars = document.querySelectorAll("#calificacion-interactiva i");
const btnEnviar = document.getElementById("enviar-comentario");
const inputComentario = document.getElementById("comentario-usuario");
const usuario = localStorage.getItem("usuario");

let puntuacionSeleccionada = 0;

/* Estrellas */
stars.forEach(star => {
  star.addEventListener("click", function () {
      puntuacionSeleccionada = parseInt(this.dataset.rating);
      stars.forEach(s => {
          const val = parseInt(s.dataset.rating);
          s.classList.toggle("active", val <= puntuacionSeleccionada);
      });
  });
});

/* Mostrar comentario guardado */
document.addEventListener("DOMContentLoaded", () => {
  const guardado = JSON.parse(localStorage.getItem(`comentarioProducto_${productID}`));
  if (guardado) {
      mostrarComentario(guardado.texto, guardado.puntuacion, guardado.fecha, guardado.usuario);
  }
});

/* Función mostrar comentario */
function mostrarComentario(texto, puntuacion, fecha, usuario) {
  const anterior = document.getElementById("comentario-guardado");
  if (anterior) anterior.remove();

  const div = document.createElement("div");
  div.id = "comentario-guardado";
  div.classList.add("comentario");

  let estrellasHTML = "";
  for (let i = 1; i <= 5; i++) {
      estrellasHTML += `<i class="fas fa-star ${i <= puntuacion ? "active" : ""}"></i>`;
  }

  div.innerHTML = `
      <p><strong>${usuario}</strong> — <em>${fecha}</em></p>
      <p>${estrellasHTML}</p>
      <p>${texto}</p>
  `;

  contenedorComentarios.appendChild(div);
}

/* Enviar comentario */
btnEnviar.addEventListener("click", () => {
  const texto = inputComentario.value.trim();
  const fecha = new Date().toLocaleDateString("es-ES");

  if (puntuacionSeleccionada === 0) {
      alert("Seleccioná una puntuación.");
      return;
  }

  if (!texto) {
      alert("Escribí un comentario.");
      return;
  }

  const comentario = {
      usuario,
      texto,
      puntuacion: puntuacionSeleccionada,
      fecha
  };

  localStorage.setItem(`comentarioProducto_${productID}`, JSON.stringify(comentario));
  mostrarComentario(texto, puntuacionSeleccionada, fecha, usuario);
  inputComentario.value = "";
});



const endpointComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

fetch(endpointComentarios)
  .then(res => res.json())
  .then(data => {
      data.forEach(com => {
          const div = document.createElement("div");
          div.classList.add("comentario");

          let estrellasHTML = "";
          for (let i = 1; i <= 5; i++) {
              estrellasHTML += `<i class="fas fa-star ${i <= com.score ? "active" : ""}"></i>`;
          }

          div.innerHTML = `
              <p><strong>${com.user}</strong> — <em>${com.dateTime}</em></p>
              <p>${estrellasHTML}</p>
              <p>${com.description}</p>
          `;

          contenedorComentarios.appendChild(div);
      });
  })
  .catch(err => console.error("Error cargando comentarios API:", err));




const toggle = document.getElementById("toggle");

if (toggle) {
  if (localStorage.getItem("modoOscuro") === "true") {
      document.body.classList.add("dark");
      toggle.checked = true;
  }

  toggle.addEventListener("change", function () {
      document.body.classList.toggle("dark", this.checked);
      localStorage.setItem("modoOscuro", this.checked);
  });
}


const btnCerrar = document.getElementById("boton-cerrar");
if (btnCerrar) {
  btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      alert("Sesión cerrada correctamente");
      location.reload();
  });
}

// Si lees esto, sos un capo. O una capa. O un capx.
// Acá no discriminamos.