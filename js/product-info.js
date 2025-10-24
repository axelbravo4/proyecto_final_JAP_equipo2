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

//Comentarios y calificaciones
const stars = document.querySelectorAll('#calificacion-interactiva i');
const btnEnviar = document.getElementById('enviar-comentario');
const inputComentario = document.getElementById('comentario-usuario');
const contenedor = document.getElementById('calificaciones-y-comentarios');
const usuario = localStorage.getItem('usuario');
const fecha = new Date().toLocaleDateString('es-ES');
let puntuacionSeleccionada = 0;

//Esto es para que las estrellas tenga guarden un valor
stars.forEach(star => {
  star.addEventListener('click', function() {
    puntuacionSeleccionada = parseInt(this.getAttribute('data-rating'));
    stars.forEach(s => {
      const valor = parseInt(s.getAttribute('data-rating'));
      s.classList.toggle('active', valor <= puntuacionSeleccionada);
    });
  });
});

//Para cargar un comentario si ya hay uno guardado, usa el productID para diferenciar, como está puesto en la constante de arriba
document.addEventListener('DOMContentLoaded', () => {
  const guardado = JSON.parse(localStorage.getItem(`comentarioProducto_${productID}`));
  if (guardado) {
    mostrarComentario(guardado.texto, guardado.puntuacion, guardado.fecha, guardado.usuario);
  }
});

//Función para mostrar el comentario y la calificación
function mostrarComentario(texto, puntuacion, fecha, usuario) {
// Si ya hay un div de comentario se elimina para evitar duplicados
  const anterior = document.getElementById('comentario-guardado');
  if (anterior) anterior.remove();

  //Acá se crea el div del comentario, esto es lo que se modifica en CSS
  const nuevoComentario = document.createElement('div');
  nuevoComentario.id = 'comentario-guardado';
  nuevoComentario.classList.add('comentario');
  
  //Esto para crear las estrellas en el comentario basado en la puntiación
  let estrellasHTML = '';
  for (let i = 1; i <= 5; i++) {
    estrellasHTML += `<i class="fas fa-star ${i <= puntuacion ? 'active' : ''}"></i>`;
  }

  //Acá se crea el HTML del comentario
  nuevoComentario.innerHTML = `
    <p><strong>${usuario}</strong> — <em>${fecha}</em></p>
    <p>${estrellasHTML}</p>
    <p>${texto}</p>
  `;

  contenedor.appendChild(nuevoComentario);
}

//Enviar comentario
btnEnviar.addEventListener('click', () => {
  const texto = inputComentario.value.trim();
  const usuario = localStorage.getItem('usuario');
  const fecha = new Date().toLocaleDateString('es-ES');
//Esto es por si no se selecciona una puntuación
  if (puntuacionSeleccionada === 0) {
    alert('Por favor, selecciona una calificación antes de enviar.');
    return;
  }
//Esto es por si no se escribe un comentario, hay que ser medio boludo para no escribir nada y querer enviar un comentario
  if (!texto) {
    alert('Escribe un comentario antes de enviar.');
    return;
  }


//Guarda en localStorage así se mantiene al recargar o volver entrar a la página
const comentario = {
  usuario,
  texto,
  puntuacion: puntuacionSeleccionada,
  fecha
};

  localStorage.setItem(`comentarioProducto_${productID}`, JSON.stringify(comentario));

  mostrarComentario(texto, puntuacionSeleccionada, fecha, usuario);

  //Limpiar input
  inputComentario.value = '';
});
//Hay que modificar el CSS para que se vea bien, ahora está más feo que pegarle a un padre


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

// Click en los productos relacionados
document.addEventListener("click", (event) => {
  const producto = event.target.closest('.producto'); 
  if (producto) {
    const nombreProducto = producto.querySelector('h3').textContent;
    const catNombre = localStorage.getItem("catNombre");
    localStorage.setItem("prodName", nombreProducto);
    localStorage.setItem("catNombre", catNombre);
    window.location = "product-info.html";
  }
});

const productID = localStorage.getItem("prodID");
const endpointComentarios = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

//Cargar comentarios de la API


fetch(endpointComentarios)
  .then(response => response.json())
  .then(data => {
    data.forEach(comentario => {
      const contenedorAPI = document.getElementById('calificaciones-y-comentarios');
        const nuevoComentarioAPI = document.createElement('div');
        nuevoComentarioAPI.id = 'comentario-api';
        nuevoComentarioAPI.classList.add('comentario');

        let estrellasHTML = '';
        for (let i = 1; i <= 5; i++) {
          estrellasHTML += `<i class="fas fa-star ${i <= comentario.score ? 'active' : ''}"></i>`;
        }

        nuevoComentarioAPI.innerHTML = `
        <p><strong>${comentario.user}</strong></p> - <em>${comentario.dateTime}</em></p>
        <p>${estrellasHTML}</p>
        <p>${comentario.description}</p>
      `;

      contenedorAPI.appendChild(nuevoComentarioAPI);
    });
  })

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

// Si lees esto, sos un capo. O una capa. O un capx.
// Acá no discriminamos.