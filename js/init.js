(() => {
  const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const logged = !!localStorage.getItem("usuario");

  // Si NO hay sesión y NO estoy en login → ir a login
  if (!logged && here === "index.html") {
    location.replace("login.html");
    return;
  }
  // Si NO hay sesión y estoy en products → ir a login
  if (!logged && here === "products.html") {
    location.replace("login.html");
    return;
  }
  // Si SÍ hay sesión y estoy en login → ir a index
  if (logged && here === "login.html") {
    location.replace("index.html");
    return;
  }
})();

const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) return response.json();
      throw Error(response.statusText);
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
}

// 🔹 Mostrar contador del carrito en todas las páginas
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
  cartCountElem.classList.add("updated");
setTimeout(() => cartCountElem.classList.remove("updated"), 200);
});