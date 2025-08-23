document.getElementById("registroForm").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;
  const terminos = document.getElementById("terminos").checked;

  if (nombre === "" || apellido === "" || email === "" || password1 === "" || password2 === "") {
    showAlertError("Por favor completa todos los campos.");
    return;
}

if (password1 !== password2) {
    showAlertError("Las contraseñas no coinciden.");
    return;
}

if (!terminos) {
    showAlertError("Debes aceptar los términos y condiciones.");
    return;
}


  localStorage.setItem("usuario", nombre);
  localStorage.setItem("password1", password1);

  alert("Registro exitoso");
  window.location.href = "login.html";
});