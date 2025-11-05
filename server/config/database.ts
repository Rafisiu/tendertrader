import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// PostgreSQL connection configuration for backend
const pool = new Pool({
  host: process.env.DB_HOST || '192.168.100.115',
  port: parseInt(process.env.DB_PORT || '5432'), // Default PostgreSQL port
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '456456',
  database: process.env.DB_NAME || 'tendertrader', // Database name
  ssl: process.env.DB_SSL === 'true', // Change to true if using SSL
  max: parseInt(process.env.DB_MAX || '20'), // Maximum number of clients in the pool
  idleTimeoutMillis: parseInt(process.env.DB_IDLE_TIMEOUT || '30000'), // Close idle clients after 30 seconds
  connectionTimeoutMillis: parseInt(process.env.DB_CONNECTION_TIMEOUT || '2000'), // Return an error after 2 seconds if connection could not be established
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('Successfully connected to PostgreSQL database');
  }
});

export default pool;