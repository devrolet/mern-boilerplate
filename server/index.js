// Add Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const paymentRoutes = ('./routes/payment');

// Add Configuration Values
dotenv.config();
// Start Express.js
const app = express();
// Use Cors to prevent CORS errors, body-parser to parse Front-End data
app.use(cors());
app.use(bodyParser.json());

// Connect MongoDB DB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err = console.error(err));

app.use('/auth', authRoutes);
app.use('/payment', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));