require('dotenv').config();
const express = require('express');
// app variable to configure the server
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Connect to MongoDB
// We put the connection string in the .env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
// Log errors and open connection
db.on('error', (error) => console.error('Error connecting to MongoDB:', error));
db.once('open', () => console.log('Connected to MongoDB'));


app.use(express.json());
// Import routes
const usersRouter = require('./routes/users');

// Enable CORS for all routes
app.use(cors());

app.use('/login', usersRouter);
// Start server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
}); 

module.exports = app;