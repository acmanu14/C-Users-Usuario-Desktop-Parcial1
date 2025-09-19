const express = require("express");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const { generateToken, authMiddleware } = require("./token");

const app = express();
app.use(bodyParser.json());


let users = [];   
let movies = [];  
//Registramos usuario
app.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ msg: "Faltan campos" });
  }

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ msg: "Usuario ya existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ username, passwordHash, role });

  res.json({ msg: "Usuario registrado con éxito" });
});

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ msg: "Usuario no encontrado" });
  }

  const validPass = await bcrypt.compare(password, user.passwordHash);
  if (!validPass) {
    return res.status(401).json({ msg: "Contraseña incorrecta" });
  }

  const token = generateToken(user);
  res.json({ msg: "Login exitoso", token });
});

// Pelicula, solo admin
app.post("/movies", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "No autorizado: solo Admin puede crear películas" });
  }

  const { title, director, year, producer, price } = req.body;

  if (!title || !director || !year || !producer || !price) {
    return res.status(400).json({ msg: "Faltan campos" });
  }

  movies.push({ title, director, year, producer, price });
  res.json({ msg: "Película creada con éxito" });
});

// Consultar peliculas
app.get("/movies", authMiddleware, (req, res) => {
  res.json({ msg: "Lista de películas", movies });
});


app.get("/movies/filter", authMiddleware, (req, res) => {
  const { year, price } = req.query;

  if (!year || !price) {
    return res.status(400).json({ msg: "Debes ingresar parámetros 'year' y 'price'" });
  }

  const yearNum = parseInt(year);
  const priceNum = parseFloat(price);

  const filtered = movies.filter(m => m.year > yearNum && m.price <= priceNum);

  if (filtered.length === 0) {
    return res.json({ msg: "No hay películas que cumplan los criterios" });
  }

  res.json({ msg: "Películas filtradas", movies: filtered });
});

//Servidor
app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});

  



