import pg from 'pg';

const { Pool } = pg;

// PostgreSQL connection configuration
const pool = new Pool({
  host: '192.168.100.115',
  port: 5432, // Default PostgreSQL port
  user: 'postgres',
  password: '456456',
  database: 'tendertrader', // Default database name, can be changed as needed
  ssl: false, // Change to true if using SSL
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
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