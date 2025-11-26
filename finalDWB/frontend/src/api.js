const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000';

function getToken(){
  return sessionStorage.getItem('token');
}

function authHeaders(json = true){
  const token = getToken();
  const headers = {};
  if(json) headers['Content-Type'] = 'application/json';
  if(token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
}

export async function login(email, password){
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function register(email, password, name){
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return res.json();
}

export async function getReviews(){
  const res = await fetch(`${API_BASE}/reviews`, { headers: authHeaders() });
  return res.json();
}

export async function createReview(data){
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateReview(id, data){
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteReview(id){
  const res = await fetch(`${API_BASE}/reviews/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return res.json();
}
