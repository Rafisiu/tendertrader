import express from 'express';
import { register, login, profile } from '../controllers/authController';
import { verifyToken } from '../utils/jwt';

const router = express.Router();

// Registration route
router.post('/register', register);

// Login route
router.post('/login', login);

// Profile route (protected)
router.get('/profile', (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  
  (req as any).user = decoded;
  next();
}, profile);

export default router;