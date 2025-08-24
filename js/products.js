document.getElementById("logOutBtn").addEventListener("click", () => {
    alert("Sesión cerrada correctamente");
    localStorage.removeItem("usuario"); location.reload();

});
