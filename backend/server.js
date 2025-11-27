const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const port = 3000;

app.use(cors());

const DATA_DIR = path.join(__dirname, "data");

// Rutas que sirven los archivos JSON directamente
app.use("/cats", express.static(path.join(DATA_DIR, "cats")));
app.use("/cats_products", express.static(path.join(DATA_DIR, "cats_products")));
app.use("/products", express.static(path.join(DATA_DIR, "products")));
app.use("/products_comments", express.static(path.join(DATA_DIR, "products_comments")));
app.use("/product_info", express.static(path.join(DATA_DIR, "product_info")));
app.use("/sell", express.static(path.join(DATA_DIR, "sell")));
app.use("/cart", express.static(path.join(DATA_DIR, "cart")));
app.use("/user_cart", express.static(path.join(DATA_DIR, "user_cart")));

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor backend corriendo en http://localhost:3000");
});
