const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

//Middleware
app.use(express.json);

//connect to DB
connectDB;
