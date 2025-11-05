import express from 'express';
import cors from 'cors';
import pool from './config/database';
import authRoutes from './routes/auth';
import tenderBidRoutes from './routes/tenderBid';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '4000');

// Parse allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  process.env.FRONTEND_URL || 'http://localhost:4500',
  'http://192.168.100.115:4500',
  'https://vendor1.mpurwadi.site', // Add the domain
  'http://vendor1.mpurwadi.site',   // Also allow HTTP in case of redirects
  'https://vendors.mpurwadi.site',  // Add the other domain
  'http://vendors.mpurwadi.site'    // Also allow HTTP for this domain
];

// Middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', tenderBidRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'OK', message: 'Connected to PostgreSQL', data: result.rows });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
});

export default app;