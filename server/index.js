import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import addressRoutes from './routes/addresses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/addresses', addressRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});