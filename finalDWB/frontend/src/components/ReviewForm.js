import React, { useEffect, useState } from 'react';
import { createReview, updateReview } from '../api';

export default function ReviewForm({ onSaved, editing, onCancel }){
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(5);
  const [visitDate, setVisitDate] = useState('');
  const [observations, setObservations] = useState('');

  useEffect(()=> {
    if(editing){
      setRestaurantName(editing.restaurantName || '');
      setRating(editing.rating || 5);
      setVisitDate(editing.visitDate ? new Date(editing.visitDate).toISOString().slice(0,10) : '');
      setObservations(editing.observations || '');
    } else {
      setRestaurantName('');
      setRating(5);
      setVisitDate('');
      setObservations('');
    }
  }, [editing]);

  async function submit(e){
    e.preventDefault();
    const data = { restaurantName, rating: Number(rating), visitDate, observations };
    if(editing){
      await updateReview(editing._id, data);
      onCancel && onCancel();
    } else {
      await createReview(data);
    }
    onSaved && onSaved();
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 12, border: '1px solid #f3f3f3', padding: 10, borderRadius: 6 }}>
      <h4 style={{ marginTop: 0 }}>{editing ? 'Editar' : 'Crear'} reseña</h4>
      <div style={{ marginBottom: 6 }}>
        <input value={restaurantName} onChange={e=>setRestaurantName(e.target.value)} placeholder="Nombre restaurante" required style={{ width: '100%', padding:8 }} />
      </div>
      <div style={{ marginBottom: 6 }}>
        <input type="number" min="1" max="5" value={rating} onChange={e=>setRating(e.target.value)} required style={{ width: '100%', padding:8 }} />
      </div>
      <div style={{ marginBottom: 6 }}>
        <input type="date" value={visitDate} onChange={e=>setVisitDate(e.target.value)} required style={{ width: '100%', padding:8 }} />
      </div>
      <div style={{ marginBottom: 6 }}>
        <textarea value={observations} onChange={e=>setObservations(e.target.value)} placeholder="Observaciones" style={{ width: '100%', padding:8 }} />
      </div>
      <div>
        <button type="submit" style={{ marginRight: 8 }}>{editing ? 'Guardar' : 'Crear'}</button>
        {editing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
