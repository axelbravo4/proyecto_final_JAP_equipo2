<<<<<<< Updated upstream
// Guardo de sesión global (agregado al inicio, único cambio necesario)
(() => {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const logged = !!localStorage.getItem("usuario");
=======
// -------- Verificar token con el servidor --------
async function validarToken() {
  const token = localStorage.getItem("token");
  if (!token) return false;
>>>>>>> Stashed changes

  try {
    const res = await fetch("http://localhost:3000/verify", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (!res.ok) return false;

    return true;
  } catch (e) {
    return false;
  }
}

// -------- Verificar conexión al backend --------
async function verificarServidor() {
  try {
    const resp = await fetch("http://localhost:3000/ping");
    if (!resp.ok) throw new Error();

  } catch (error) {
    console.error("Error de conexión con el servidor:", error);
    window.location.href = "error_conexion.html";
  }
}

// -------- Control de acceso según token --------
(async () => {
  const here = location.pathname.split("/").pop().toLowerCase() || "index.html";
  const logged = await validarToken();

  // Si NO está logueado y no está en login/register → mandar a login
  if (!logged && here !== "login.html" && here !== "register.html") {
    location.replace("login.html");
    return;
  }
<<<<<<< Updated upstream
  // Si NO hay sesión y estoy en products → no hacer nada
  if (!logged && here === "products.html") {
    location.replace("login.html");
    return;
  }

  // Si SÍ hay sesión y estoy en login → ir a index
  if (logged && here === "index.html") {
    location.replace("products.html");
=======

  // Si está logueado y entra a login → redirigir al index
  if (logged && here === "login.html") {
    location.replace("index.html");
>>>>>>> Stashed changes
    return;
  }
})();

<<<<<<< Updated upstream
// ----------------- Tu código original debajo -----------------
const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
=======
// -------- URLs del backend --------
const BASE_URL = "http://localhost:3000/";

const CATEGORIES_URL = BASE_URL + "cats/cat.json";
const PUBLISH_PRODUCT_URL = BASE_URL + "sell/publish.json";
const PRODUCTS_URL = BASE_URL + "cats_products/";
const PRODUCT_INFO_URL = BASE_URL + "products/";
const PRODUCT_INFO_COMMENTS_URL = BASE_URL + "products_comments/";
const CART_INFO_URL = BASE_URL + "user_cart/";
const CART_BUY_URL = BASE_URL + "cart/buy.json";
>>>>>>> Stashed changes
const EXT_TYPE = ".json";

// -------- Spinner --------
let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

// -------- Función de obtención de JSON --------
let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
<<<<<<< Updated upstream
}
=======
}

// -------- Contador del carrito --------
document.addEventListener("DOMContentLoaded", () => {
  const cartCountElem = document.getElementById("cart-count");
  if (!cartCountElem) return;

  function updateCartIconCount() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidades = JSON.parse(localStorage.getItem("cantidades")) || {};
    const totalItems = carrito.reduce((acc, prod) => acc + (cantidades[prod.id] || 1), 0);

    if (totalItems === 0) {
      cartCountElem.style.display = "none";
    } else {
      cartCountElem.style.display = "flex";
      cartCountElem.textContent = totalItems;
    }
  }

  updateCartIconCount();
  window.updateCartIconCount = updateCartIconCount;
});

// -------- Verificación del servidor --------
verificarServidor();
>>>>>>> Stashed changes
