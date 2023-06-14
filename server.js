const express = require('express');
const mongoose = require('mongoose');
const formidable = require('express-formidable')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formidable());

app.use('/auth', authRoutes);
app.use('/products', authMiddleware, productRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/chatbot', authMiddleware, chatRoutes);
app.use('/categories', authMiddleware, require('./routes/categoryRoutes'));
app.use('/characters', authMiddleware, require('./routes/characterRoutes'));


mongoose.set('strictQuery', false)
// Connect to MongoDB
mongoose
    .connect('mongodb://localhost:27017/nodeAPI', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App is running on ${process.env.PORT} port`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    });