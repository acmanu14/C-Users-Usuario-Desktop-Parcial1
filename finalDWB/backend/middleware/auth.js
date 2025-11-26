const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function(req, res, next){
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.status(401).json({ message: 'No token' });

  const token = authHeader.split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Token mal formado' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.id;
    next();
  } catch(err){
    return res.status(401).json({ message: 'Token inválido' });
  }
}
