import React, { useState } from 'react';
import { login, register } from '../api';

export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [mode, setMode] = useState('login'); // or 'register'

  async function submit(e){
    e.preventDefault();
    setErr('');
    if(mode === 'login'){
      const data = await login(email, password);
      if(data.token){
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      } else {
        setErr(data.message || 'Error al iniciar sesión');
      }
    } else {
      const data = await register(email, password, name);
      if(data.user){
        // auto-login after register
        const loginRes = await login(email, password);
        if(loginRes.token){
          sessionStorage.setItem('token', loginRes.token);
          sessionStorage.setItem('user', JSON.stringify(loginRes.user));
          onLogin(loginRes.user);
        }
      } else {
        setErr(data.message || 'Error al registrar');
      }
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h3>{mode === 'login' ? 'Iniciar sesión' : 'Registrar'}</h3>
      {err && <div style={{ color: 'red' }}>{err}</div>}
      <form onSubmit={submit}>
        {mode === 'register' && (
          <div style={{ marginBottom: 8 }}>
            <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)} style={{ width: '100%', padding:8 }} required />
          </div>
        )}
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding:8 }} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width: '100%', padding:8 }} required />
        </div>
        <button style={{ padding: '8px 12px' }}>{mode === 'login' ? 'Entrar' : 'Registrar'}</button>
      </form>
      <div style={{ marginTop: 10 }}>
        {mode === 'login' ? (
          <small>¿No tienes cuenta? <button onClick={()=>setMode('register')}>Regístrate</button></small>
        ) : (
          <small>¿Ya tienes cuenta? <button onClick={()=>setMode('login')}>Ir a iniciar sesión</button></small>
        )}
      </div>
    </div>
  );
}
