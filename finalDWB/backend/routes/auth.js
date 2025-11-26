const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// register
router.post('/register', async (req, res) => {
  try{
    const { email, password, name } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' });
    const existing = await User.findOne({ email });
    if(existing) return res.status(400).json({ message: 'Email ya registrado' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, name });
    res.status(201).json({ message: 'Usuario creado', user: { id: user._id, email: user.email, name: user.name } });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// login
router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email y contraseña requeridos' });
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok) return res.status(400).json({ message: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Error interno' });
  }
});

module.exports = router;
