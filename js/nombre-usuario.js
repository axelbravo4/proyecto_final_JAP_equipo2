document.addEventListener("DOMContentLoaded", () => {
    const usuarioTexto = localStorage.getItem("usuario");

    if (usuarioTexto) {
        const usuario = JSON.parse(usuarioTexto);    
        document.getElementById("nombre-usuario").textContent =
            usuario.nombre || "Usuario";
    }
});