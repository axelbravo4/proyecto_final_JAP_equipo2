document.addEventListener("DOMContentLoaded", () => {
const usuario = localStorage.getItem("usuario");
 if (usuario) {
    document.getElementById("nombre-usuario").textContent = usuario;
 }
});


 const btnCerrar = document.getElementById("boton-cerrar");
  if (btnCerrar) {
    btnCerrar.addEventListener("click", () => {
      localStorage.removeItem("usuario");
      alert("Sesión cerrada correctamente");
      location.reload(); 
   
    });
  }

