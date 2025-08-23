document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

const  USER = localStorage.getItem("usuario");
const PASS = localStorage.getItem("password1");

const u = document.getElementById("usuario").value;
const p = document.getElementById("password").value;


  if (u === USER && p === PASS) {
    window.location.href = "products.html"; // pasa
  } else {
    alert("Usuario o contraseña incorrectos"); // no pasa
  }
});