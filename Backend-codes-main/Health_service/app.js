import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import serviceRoutes from './ Routes/Rotue.js';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', serviceRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
