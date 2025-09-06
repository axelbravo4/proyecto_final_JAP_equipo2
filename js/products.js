/*Botón de cerrar sesión*/
const btnCerrar = document.getElementById("boton-cerrar");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      alert("Sesión cerrada correctamente");
      location.reload(); 
   
    });
  }

