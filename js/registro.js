document.getElementById("registroForm").addEventListener("submit", async e => {
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

<<<<<<< Updated upstream

  localStorage.setItem("usuario", nombre);
  localStorage.setItem("password1", password1);
=======
//Enviar datos al backend
>>>>>>> Stashed changes

try{
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre,
      apellido,
      email,
      password: password1,
      telefono
    })
  });

  const data = await response.json();
  if (!response.ok) {
    showAlertError(data.message || "Error en el registro.");
    return;
  }
  alert("Registro exitoso");
  window.location.href = "login.html";
} catch(err){
  console.error("Error en la solicitud de registro:");

}
});
  


  