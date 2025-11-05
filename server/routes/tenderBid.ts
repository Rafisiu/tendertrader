import express from 'express';
import { 
  createTenderController, getAllTendersController, getTenderByIdController,
  createVendorController, getAllVendorsController, updateVendorEmpanelmentController,
  createBidController, getBidsForTenderController, getBidsByVendorController, selectWinningBidController
} from '../controllers/tenderBidController';
import { authenticate, requireAdmin, requireVendor } from '../middleware/auth';

const router = express.Router();

// Tenders routes
router.get('/tenders', authenticate, getAllTendersController);
router.get('/tenders/:id', authenticate, getTenderByIdController);
router.post('/tenders', authenticate, requireAdmin, createTenderController); // Only admin can create

// Vendors routes
router.get('/vendors', authenticate, requireAdmin, getAllVendorsController);
router.post('/vendors', authenticate, requireAdmin, createVendorController); // Only admin can create
router.patch('/vendors/:vendorId/empanel', authenticate, requireAdmin, updateVendorEmpanelmentController); // Only admin can update

// Bids routes
router.get('/bids/vendor', authenticate, requireVendor, getBidsByVendorController); // For vendor to see their bids
router.get('/bids/tender/:tenderId', authenticate, requireAdmin, getBidsForTenderController); // For admin to see bids for a tender
router.post('/bids', authenticate, requireVendor, createBidController); // For vendor to create bid
router.post('/bids/:bidId/select', authenticate, requireAdmin, selectWinningBidController); // For admin to select winning bid

export default router;