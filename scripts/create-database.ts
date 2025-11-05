import { Client } from 'pg';

const client = new Client({
  host: '192.168.100.115',
  port: 5432,
  user: 'postgres',
  password: '456456',
  database: 'postgres', // Connect to default postgres database to create new database
});

const createDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL server');
    
    // Create the database if it doesn't exist
    await client.query(`
      SELECT 'CREATE DATABASE tendertrader' 
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'tendertrader')
    `);
    
    const result = await client.query(`
      SELECT 1 FROM pg_database WHERE datname = 'tendertrader'
    `);
    
    if (result.rows.length === 0) {
      // Database doesn't exist, create it
      await client.query('CREATE DATABASE tendertrader');
      console.log('Database "tendertrader" created successfully');
    } else {
      console.log('Database "tendertrader" already exists');
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
};

createDatabase();