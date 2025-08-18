// Función para mostrar el mensaje de ÉXITO
function showAlertSuccess() {
    const alert = document.getElementById("alert-success"); // Selecciona la alerta de éxito
    alert.classList.add("show"); // Agrega la clase 'show' para hacerla visible

    // Después de 3 segundos, la alerta desaparece automáticamente
    setTimeout(() => {
        alert.classList.remove("show");
    }, 3000);
}

// Función para mostrar el mensaje de ERROR
function showAlertError(mensaje) {
    const alert = document.getElementById("alert-danger"); // Selecciona la alerta de error
    const mensajeAlert = document.getElementById("alert-message");

    mensajeAlert.textContent = mensaje

    alert.classList.add("show"); // Agrega la clase 'show' para hacerla visible
    // Después de 3 segundos, la alerta desaparece automáticamente
    setTimeout(() => {
        alert.classList.remove("show");
    }, 3000);
}

// Capturamos el evento click del botón "Registrarme"
document.getElementById("regBtn").addEventListener("click", function () {

    // Obtenemos y limpiamos (trim) los valores de cada campo del formulario
    let nombre = document.getElementById("nombre").value.trim();
    let apellido = document.getElementById("apellido").value.trim();
    let email = document.getElementById("email").value.trim();
    let password1 = document.getElementById("password1").value.trim();
    let password2 = document.getElementById("password2").value.trim();
    let terminos = document.getElementById("terminos").checked; // Verifica si está marcado el checkbox

    // 1. Validación: Ningún campo puede estar vacío
    if (nombre === "" || apellido === "" || email === "" || password1 === "" || password2 === "") {
        showAlertError("Por favor completa todos los campos.");
        return; // Detiene la ejecución si falla
    }

    // 2. Validación: Contraseña mínima de 6 caracteres
    if (password1.length < 6) {
        showAlertError("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    // 3. Validación: Las contraseñas deben coincidir
    if (password1 !== password2) {
        showAlertError("Las contraseñas no coinciden.");
        return;
    }

    // 4. Validación: Debe aceptar los términos
    if (!terminos) {
        showAlertError("Debes aceptar los términos y condiciones.");
        return;
    }

    // Si pasa todas las validaciones, muestra el mensaje de éxito
    showAlertSuccess();
});