import pool from '../server/config/database';

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'buyer',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
    
    -- Create an index on email for faster lookups
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
  `;
  
  try {
    await pool.query(query);
    console.log('Users table created successfully or already exists');
  } catch (err) {
    console.error('Error creating users table:', err);
  } finally {
    // Close the pool after creating the table
    await pool.end();
  }
};

createUsersTable();