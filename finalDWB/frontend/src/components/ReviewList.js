import React, { useEffect, useState } from 'react';
import { getReviews, deleteReview } from '../api';
import ReviewForm from './ReviewForm';

export default function ReviewList(){
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState(null);

  async function load(){
    const r = await getReviews();
    if(Array.isArray(r)) setReviews(r);
    else setReviews([]);
  }

  useEffect(()=>{ load(); }, []);

  async function handleDelete(id){
    if(!window.confirm('Eliminar reseña?')) return;
    await deleteReview(id);
    load();
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Mis reseñas</h3>
      <ReviewForm onSaved={load} editing={editing} onCancel={()=>setEditing(null)} />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {reviews.map(r => (
          <li key={r._id} style={{ border: '1px solid #eee', padding: 10, marginBottom: 8 }}>
            <strong>{r.restaurantName}</strong> — {r.rating}/5 — {new Date(r.visitDate).toLocaleDateString()}
            <div style={{ marginTop: 6 }}>{r.observations}</div>
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setEditing(r)} style={{ marginRight: 8 }}>Editar</button>
              <button onClick={() => handleDelete(r._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
