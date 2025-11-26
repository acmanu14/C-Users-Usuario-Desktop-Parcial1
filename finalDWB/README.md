# Proyecto Reseñas - Full Stack

## Contenido
- backend/ : Node.js + Express + MongoDB (Mongoose)
- frontend/ : React (Create React App structure minimal)

## Instrucciones rápidas

### Backend
1. Copia `.env.example` a `.env` y completa `MONGODB_URI` y `JWT_SECRET`.
2. Instala dependencias:
   ```
   cd backend
   npm install
   ```
3. Inicia el servidor:
   ```
   npm run start
   ```
   o para desarrollo con nodemon:
   ```
   npm run dev
   ```

### Frontend
1. Copia `frontend/.env.example` a `frontend/.env` y ajusta `REACT_APP_API_BASE` si es necesario.
2. Instala dependencias:
   ```
   cd frontend
   npm install
   ```
3. Inicia la app:
   ```
   npm start
   ```

### Pruebas con curl
- Registrar:
  ```
  curl -X POST http://localhost:4000/auth/register -H "Content-Type: application/json" -d '{"email":"u@mail.com","password":"123456","name":"Manu"}'
  ```
- Login:
  ```
  curl -X POST http://localhost:4000/auth/login -H "Content-Type: application/json" -d '{"email":"u@mail.com","password":"123456"}'
  ```
- Crear reseña:
  ```
  curl -X POST http://localhost:4000/reviews -H "Authorization: Bearer TU_TOKEN" -H "Content-Type: application/json" -d '{"restaurantName":"MiResto","rating":5,"visitDate":"2025-11-20","observations":"Muy bueno"}'
  ```
- Listar reseñas (solo las del usuario autenticado):
  ```
  curl -H "Authorization: Bearer TU_TOKEN" http://localhost:4000/reviews
  ```

## Notas importantes
- **Los usuarios solo pueden ver/editar/eliminar sus propias reseñas**. El backend verifica `review.user === req.userId`.
