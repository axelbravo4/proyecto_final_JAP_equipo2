document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
     if (usuario) {
        document.getElementById("nombre-usuario").textContent = usuario;
     }
    });