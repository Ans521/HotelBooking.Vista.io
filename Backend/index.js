const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const AuthRouter = require('./Routes/AuthRouter');
const cookieParser = require('cookie-parser');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173', // Adjust as needed for your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Serve static files
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes
app.use('/auth', AuthRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
