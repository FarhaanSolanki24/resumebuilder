const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Atlas Connection String
const MONGO_URI = 'mongodb+srv://Farhaan24:Farhaan24@cluster24.zjugazh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster24';

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB Atlas!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
