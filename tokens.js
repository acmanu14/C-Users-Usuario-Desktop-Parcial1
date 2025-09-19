const jwt = require("jsonwebtoken");

const SECRET_KEY = "clave_secreta_123"; 

// Generar un token con payload (datos del usuario)
function generateToken(user) {
  return jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

// Middleware para validar el token
function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ msg: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Guardamos los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
}

module.exports = { generateToken, authMiddleware };

  