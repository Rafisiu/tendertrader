import pool from '../config/database';
import { hashPassword } from '../utils/auth';
import format from 'pg-format';

// Define the User interface
export interface User {
  id: number;
  email: string;
  password: string; // Hashed password
  name: string;
  role: 'buyer' | 'seller' | 'admin' | 'vendor'; // Added admin and vendor roles
  created_at: Date;
  updated_at: Date;
}

/**
 * Create a new user in the database
 * @param email User's email
 * @param password User's plain text password
 * @param name User's name
 * @param role User's role (admin, vendor, buyer, or seller)
 * @returns Created user object
 */
export const createUser = async (
  email: string, 
  password: string, 
  name: string, 
  role: 'buyer' | 'seller' | 'admin' | 'vendor'
): Promise<User> => {
  const hashedPassword = await hashPassword(password);
  
  const query = format(
    'INSERT INTO users (email, password, name, role) VALUES (%L, %L, %L, %L) RETURNING id, email, name, role, created_at, updated_at',
    email,
    hashedPassword,
    name,
    role
  );
  
  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Find a user by email
 * @param email User's email
 * @returns User object or null if not found
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const query = format('SELECT * FROM users WHERE email = %L', email);
  const result = await pool.query(query);
  
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Find a user by ID
 * @param id User's ID
 * @returns User object or null if not found
 */
export const findUserById = async (id: number): Promise<User | null> => {
  const query = format('SELECT * FROM users WHERE id = %L', id);
  const result = await pool.query(query);
  
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Check if a user has administrator role
 * @param id User's ID
 * @returns Boolean indicating if user is an administrator
 */
export const isUserAdmin = async (id: number): Promise<boolean> => {
  const user = await findUserById(id);
  return user?.role === 'admin';
};

/**
 * Update a user's role
 * @param id User's ID
 * @param role New role
 * @returns Updated user object
 */
export const updateUserRole = async (id: number, role: 'admin' | 'vendor' | 'buyer' | 'seller'): Promise<User> => {
  const query = format('UPDATE users SET role = %L, updated_at = NOW() WHERE id = %L RETURNING *', role, id);
  const result = await pool.query(query);
  return result.rows[0];
};