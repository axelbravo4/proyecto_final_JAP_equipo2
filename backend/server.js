const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const SECRET = "CLAVE_SUPER_SECRETA_CAMBIAR_EN_PRODUCCION";

// Middleware global
app.use(cors());
app.use(express.json());

// Directorio de datos
const DATA_DIR = path.join(__dirname, "data");
const USER_FILE = path.join(DATA_DIR, "user_profile.json");

// ---------- Funciones de utilidad ----------
function loadUsers() {
  if (!fs.existsSync(USER_FILE)) return [];
  return JSON.parse(fs.readFileSync(USER_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(USER_FILE, JSON.stringify(users, null, 2));
}

// ---------- Endpoint de verificación del servidor ----------
app.get("/ping", (req, res) => {
  res.json({ message: "Servidor OK" });
});

// ---------- Registro ----------
app.post("/register", (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const users = loadUsers();
    const exists = users.some(u => u.email === email);

    if (exists) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    const nuevoUsuario = { nombre, apellido, email, password, telefono };
    users.push(nuevoUsuario);
    saveUsers(users);

    res.json({ message: "Usuario registrado correctamente" });

  } catch (err) {
    console.error("Error en /register:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ---------- Login (con logs de depuración y comparación tolerante) ----------
app.post("/login", (req, res) => {
  try {
    console.log("POST /login recibido. Body:", req.body);

    const { nombre, password } = req.body || {};

    if (!nombre || !password) {
      console.log("Falta nombre o password en el body");
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    // Cargar usuarios
    const raw = fs.readFileSync(USER_FILE, "utf8");
    const users = JSON.parse(raw);
    console.log("Usuarios cargados:", users);

    // Comparación robusta: trim + lowercase para el nombre; password exacta
    const nombreNormalized = String(nombre).trim().toLowerCase();

    const user = users.find(u => {
      const uNombre = (u.nombre || "").toString().trim().toLowerCase();
      const uPass = (u.password || "").toString();
      return uNombre === nombreNormalized && uPass === password;
    });

    console.log("Usuario encontrado:", !!user);

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { email: user.email, nombre: user.nombre },
      SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      message: "Login exitoso",
      token,
      usuario: { nombre: user.nombre, apellido: user.apellido, email: user.email }
    });

  } catch (err) {
    console.error("Error en /login:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ---------- Verificación de token ----------
app.get("/verify", (req, res) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Token no enviado" });
    }

    const token = header.replace("Bearer ", "");

    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido o expirado" });
      }

      res.json({ message: "Token válido", usuario: decoded });
    });

  } catch (err) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ---------- Servir JSON estáticos (ejercicio punto 2) ----------
app.use("/cats", express.static(path.join(DATA_DIR, "cats")));
app.use("/cats_products", express.static(path.join(DATA_DIR, "cats_products")));
app.use("/products", express.static(path.join(DATA_DIR, "products")));
app.use("/products_comments", express.static(path.join(DATA_DIR, "products_comments")));
app.use("/product_info", express.static(path.join(DATA_DIR, "product_info")));
app.use("/sell", express.static(path.join(DATA_DIR, "sell")));
app.use("/cart", express.static(path.join(DATA_DIR, "cart")));
app.use("/user_cart", express.static(path.join(DATA_DIR, "user_cart")));

// ---------- Iniciar servidor ----------
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
