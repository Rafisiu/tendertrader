import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret-key';

/**
 * Generate a JWT token
 * @param payload Data to include in the token
 * @param expiresIn Token expiration time
 * @returns Generated JWT token
 */
export const generateToken = (payload: any, expiresIn: string = '24h'): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify a JWT token
 * @param token JWT token to verify
 * @returns Decoded token payload or null if invalid
 */
export const verifyToken = (token: string): any | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as any;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
};