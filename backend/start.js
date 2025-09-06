const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const path = require('path');

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Static files (serve uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Router
const router = require('./rourter/router');
app.use('/', router);

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
