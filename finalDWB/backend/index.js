require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connect } = require('./config/db');
const authRoutes = require('./routes/auth');
const reviewsRoutes = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/reviews', reviewsRoutes);

const PORT = process.env.PORT || 4000;

connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(err => console.error(err));
