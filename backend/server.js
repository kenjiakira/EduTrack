require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/database');  // Fix the path here
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
