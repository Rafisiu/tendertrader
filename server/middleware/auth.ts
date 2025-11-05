import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { isUserAdmin } from '../models/User';

// Middleware to verify token and user role
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
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
};

// Middleware to ensure user is an administrator
export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;
  
  const isAdmin = await isUserAdmin(userId);
  if (!isAdmin) {
    return res.status(403).json({ error: 'Administrator access required' });
  }
  
  next();
};

// Middleware to ensure user is a vendor
export const requireVendor = async (req: Request, res: Response, next: NextFunction) => {
  const userId = (req as any).user.id;
  const user = await import('../models/User').then(m => m.findUserById(userId));
  
  if (!user || (user.role !== 'vendor' && user.role !== 'seller')) {
    return res.status(403).json({ error: 'Vendor access required' });
  }
  
  next();
};