const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/users', require('./server/routes/users')); 
app.use('/api/lists', require('./server/routes/lists')); 

app.use(express.static(path.join(__dirname, 'frontend')));

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose Connection Error:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose Disconnected. Retrying...');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
