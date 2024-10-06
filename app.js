const express = require('express');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();

//Middleware
app.use(express.json());

//connect to DB
connectDB();

//Test route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

//Routes
app.use('/auth', authRoutes);

//SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Started on PORT:', PORT);
});
