import { Request, Response } from 'express';
import { 
  createTender, getAllTenders, getTenderById, getTendersByStatus, updateTenderStatus,
  createVendor, getAllVendors, getVendorByUserId, updateVendorEmpanelment, getVendorById,
  createBid, checkVendorBidOnTender, getBidsForTender, getBidsByVendor, selectWinningBid, getBidById, getBidByTenderAndVendor
} from '../models/TenderBid';

// Opportunities Controller
export const createTenderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, category, start_date, end_date } = req.body;
    const adminUserId = (req as any).user.id; // From JWT token

    // Only administrators should be able to create opportunities
    // In a real system, you might have a specific admin role check here
    
    const opportunity = await createTender(title, description, category, new Date(start_date), new Date(end_date), adminUserId);
    res.status(201).json({ message: 'Opportunity created successfully', tender: opportunity });
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllTendersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const opportunities = await getAllTenders();
    res.json({ tenders: opportunities });
  } catch (error) {
    console.error('Error getting opportunities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTenderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const opportunity = await getTenderById(Number(id));
    
    if (!opportunity) {
      res.status(404).json({ error: 'Opportunity not found' });
      return;
    }
    
    res.json({ tender: opportunity });
  } catch (error) {
    console.error('Error getting opportunity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Vendors Controller
export const createVendorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, company_name, contact_person, phone, address } = req.body;

    const vendor = await createVendor(user_id, company_name, contact_person, phone, address);
    res.status(201).json({ message: 'Vendor created successfully', vendor });
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllVendorsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const vendors = await getAllVendors();
    res.json({ vendors });
  } catch (error) {
    console.error('Error getting vendors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateVendorEmpanelmentController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { vendorId } = req.params;
    const { is_empaneled } = req.body;

    const vendor = await updateVendorEmpanelment(Number(vendorId), is_empaneled);
    res.json({ message: `Vendor empanelment status updated to ${is_empaneled ? 'empaneled' : 'not empaneled'}`, vendor });
  } catch (error) {
    console.error('Error updating vendor empanelment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Bids Controller
export const createBidController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tender_id, bid_amount, bid_description } = req.body;
    const userId = (req as any).user.id; // From JWT token

    // Get vendor info for this user
    const vendor = await getVendorByUserId(userId);
    if (!vendor) {
      res.status(400).json({ error: 'User is not registered as a vendor' });
      return;
    }
    
    if (!vendor.is_empaneled) {
      res.status(403).json({ error: 'Vendor is not empaneled and cannot bid' });
      return;
    }

    // Check if vendor has already bid on this opportunity
    const hasBid = await checkVendorBidOnTender(Number(tender_id), vendor.id);
    if (hasBid) {
      res.status(400).json({ error: 'Vendor has already bid on this opportunity' });
      return;
    }

    const opportunity = await getTenderById(Number(tender_id));
    if (!opportunity) {
      res.status(404).json({ error: 'Opportunity not found' });
      return;
    }
    
    // Check if opportunity is still open
    if (opportunity.status !== 'active' || new Date() > new Date(opportunity.end_date)) {
      res.status(400).json({ error: 'Opportunity is not active or has ended' });
      return;
    }

    const bid = await createBid(Number(tender_id), vendor.id, Number(bid_amount), bid_description);
    res.status(201).json({ message: 'Bid created successfully', bid });
  } catch (error) {
    console.error('Error creating bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBidsForTenderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { tenderId } = req.params;
    
    const bids = await getBidsForTender(Number(tenderId));
    res.json({ bids });
  } catch (error) {
    console.error('Error getting bids for opportunity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getBidsByVendorController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id; // From JWT token

    // Get vendor info for this user
    const vendor = await getVendorByUserId(userId);
    if (!vendor) {
      res.status(400).json({ error: 'User is not registered as a vendor' });
      return;
    }
    
    const bids = await getBidsByVendor(vendor.id);
    res.json({ bids });
  } catch (error) {
    console.error('Error getting bids by vendor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const selectWinningBidController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bidId } = req.params;
    const adminUserId = (req as any).user.id; // From JWT token

    const bid = await selectWinningBid(Number(bidId), adminUserId);
    res.json({ message: 'Winning bid selected successfully', bid });
  } catch (error) {
    console.error('Error selecting winning bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};