document.getElementById("registroForm").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const password1 = document.getElementById("password1").value;
  const password2 = document.getElementById("password2").value;
  const terminos = document.getElementById("terminos").checked;
  const telefono = document.getElementById("telefono").value;

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
  localStorage.setItem("apellido", apellido);
  localStorage.setItem("email", email);
  localStorage.setItem("password1", password1);
  localStorage.setItem("telefono", telefono);

  alert("Registro exitoso");
  window.location.href = "login.html";
});