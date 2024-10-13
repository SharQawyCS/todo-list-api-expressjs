const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');

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
app.use('/tasks', taskRoutes);
app.use('/user', userRoutes);

//Global error handling middleware
app.use(errorHandler);

//SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server Started on PORT:', PORT);
});
