import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ReviewList from './components/ReviewList';

function App(){
  const [user, setUser] = useState(null);

  useEffect(()=> {
    // If token exists but page refreshed, we don't have user info.
    // The Login response returns user; a simple approach is to store user in sessionStorage too.
    const stored = sessionStorage.getItem('user');
    if(stored){
      setUser(JSON.parse(stored));
    }
  }, []);

  function logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  }

  if(!sessionStorage.getItem('token') || !user){
    return <Login onLogin={(u) => { sessionStorage.setItem('user', JSON.stringify(u)); setUser(u); }} />;
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>App Reseñas</h2>
        <div>Hola, {user.name || user.email} <button onClick={logout}>Salir</button></div>
      </header>
      <main>
        <ReviewList />
      </main>
    </div>
  );
}

export default App;
