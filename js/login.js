document.getElementById("loginForm").addEventListener("submit", async e => {
  e.preventDefault();

  const nombre = document.getElementById("usuario").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nombre, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Usuario o contraseña incorrectos");
      return;
    }

    // Guardar token y usuario
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

    console.log("Respuesta del servidor:", data);
    console.log("Redirigiendo...");

    window.location.href = "index.html";

  } catch (error) {
    console.error("Error en login:", error);
    alert("No se pudo conectar con el servidor");
  }
});