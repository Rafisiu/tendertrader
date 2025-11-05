import pool from '../config/database';
import format from 'pg-format';

// Define interfaces for our entities
export interface Opportunity {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: Date;
  end_date: Date;
  created_by: number; // user_id of the administrator
  status: 'active' | 'closed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface Bid {
  id: number;
  tender_id: number; // This refers to the opportunity but the database column is still named tender_id
  vendor_id: number;
  bid_amount: number;
  bid_description: string;
  submission_date: Date;
  status: 'pending' | 'selected' | 'rejected';
  selected_by: number | null; // user_id of the administrator who selected
  selection_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface Vendor {
  id: number;
  user_id: number;
  company_name: string;
  contact_person: string | null;
  phone: string | null;
  address: string | null;
  registration_date: Date;
  is_empaneled: boolean;
  created_at: Date;
  updated_at: Date;
}

/**
 * Create a new opportunity
 */
export const createOpportunity = async (
  title: string,
  description: string,
  category: string,
  start_date: Date,
  end_date: Date,
  created_by: number
): Promise<Opportunity> => {
  const query = format(
    `INSERT INTO tenders (title, description, category, start_date, end_date, created_by) 
     VALUES (%L, %L, %L, %L, %L, %L) 
     RETURNING *`,
    title, description, category, start_date, end_date, created_by
  );

  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Get all opportunities
 */
export const getAllOpportunities = async (): Promise<Opportunity[]> => {
  const result = await pool.query('SELECT * FROM tenders ORDER BY created_at DESC');
  return result.rows;
};

/**
 * Get a specific opportunity by ID
 */
export const getOpportunityById = async (id: number): Promise<Opportunity | null> => {
  const result = await pool.query('SELECT * FROM tenders WHERE id = $1', [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Get opportunities by status
 */
export const getOpportunitiesByStatus = async (status: string): Promise<Opportunity[]> => {
  const result = await pool.query('SELECT * FROM tenders WHERE status = $1 ORDER BY created_at DESC', [status]);
  return result.rows;
};

/**
 * Update opportunity status
 */
export const updateOpportunityStatus = async (id: number, status: 'active' | 'closed' | 'cancelled'): Promise<Opportunity> => {
  const query = format(
    'UPDATE tenders SET status = %L, updated_at = NOW() WHERE id = %L RETURNING *',
    status, id
  );
  
  const result = await pool.query(query);
  return result.rows[0];
};

// Aliases to maintain backward compatibility with existing code
export const createTender = createOpportunity;
export const getAllTenders = getAllOpportunities;
export const getTenderById = getOpportunityById;
export const getTendersByStatus = getOpportunitiesByStatus;
export const updateTenderStatus = updateOpportunityStatus;

/**
 * Create a new vendor
 */
export const createVendor = async (
  user_id: number,
  company_name: string,
  contact_person?: string,
  phone?: string,
  address?: string
): Promise<Vendor> => {
  const query = format(
    `INSERT INTO vendors (user_id, company_name, contact_person, phone, address) 
     VALUES (%L, %L, %L, %L, %L) 
     RETURNING *`,
    user_id, company_name, contact_person || null, phone || null, address || null
  );

  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Get vendor by user ID
 */
export const getVendorByUserId = async (user_id: number): Promise<Vendor | null> => {
  const result = await pool.query('SELECT * FROM vendors WHERE user_id = $1', [user_id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Get vendor by vendor ID
 */
export const getVendorById = async (id: number): Promise<Vendor | null> => {
  const result = await pool.query('SELECT * FROM vendors WHERE id = $1', [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Get all vendors
 */
export const getAllVendors = async (): Promise<Vendor[]> => {
  const result = await pool.query('SELECT * FROM vendors ORDER BY created_at DESC');
  return result.rows;
};

/**
 * Update vendor empanelment status
 */
export const updateVendorEmpanelment = async (id: number, is_empaneled: boolean): Promise<Vendor> => {
  const query = format(
    'UPDATE vendors SET is_empaneled = %L, updated_at = NOW() WHERE id = %L RETURNING *',
    is_empaneled, id
  );
  
  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Create a new bid
 */
export const createBid = async (
  tender_id: number,  // This refers to opportunity_id but using the database column name
  vendor_id: number,
  bid_amount: number,
  bid_description: string
): Promise<Bid> => {
  const query = format(
    `INSERT INTO bids (tender_id, vendor_id, bid_amount, bid_description) 
     VALUES (%L, %L, %L, %L) 
     RETURNING *`,
    tender_id, vendor_id, bid_amount, bid_description
  );

  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Check if vendor has already bid on an opportunity
 */
export const checkVendorBidOnTender = async (tender_id: number, vendor_id: number): Promise<boolean> => {
  const result = await pool.query(
    'SELECT 1 FROM bids WHERE tender_id = $1 AND vendor_id = $2 LIMIT 1',
    [tender_id, vendor_id]
  );
  return result.rows.length > 0;
};

/**
 * Get all bids for a specific opportunity
 */
export const getBidsForTender = async (tender_id: number): Promise<Bid[]> => {
  const result = await pool.query(
    `SELECT b.*, v.company_name as vendor_company_name 
     FROM bids b
     JOIN vendors v ON b.vendor_id = v.id
     WHERE b.tender_id = $1 
     ORDER BY b.bid_amount ASC`, // Order by bid amount for easy comparison
    [tender_id]
  );
  return result.rows;
};

/**
 * Get all bids by a specific vendor
 */
export const getBidsByVendor = async (vendor_id: number): Promise<Bid[]> => {
  const result = await pool.query(
    `SELECT b.*, t.title as tender_title 
     FROM bids b
     JOIN tenders t ON b.tender_id = t.id
     WHERE b.vendor_id = $1 
     ORDER BY b.created_at DESC`,
    [vendor_id]
  );
  return result.rows;
};

/**
 * Select a bid as the winning bid
 */
export const selectWinningBid = async (bid_id: number, selected_by: number): Promise<Bid> => {
  // First, reject all other bids for the same opportunity
  const bid = await getBidById(bid_id);
  if (!bid) throw new Error('Bid not found');
  
  await pool.query(
    'UPDATE bids SET status = $1 WHERE tender_id = $2 AND id != $3',
    ['rejected', bid.tender_id, bid_id]
  );
  
  // Then select the winning bid
  const query = format(
    `UPDATE bids SET status = %L, selected_by = %L, selection_date = NOW(), updated_at = NOW() 
     WHERE id = %L RETURNING *`,
    'selected', selected_by, bid_id
  );
  
  const result = await pool.query(query);
  return result.rows[0];
};

/**
 * Get a specific bid by ID
 */
export const getBidById = async (id: number): Promise<Bid | null> => {
  const result = await pool.query('SELECT * FROM bids WHERE id = $1', [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

/**
 * Get bid by opportunity and vendor IDs (to check if a vendor has already bid)
 */
export const getBidByTenderAndVendor = async (tender_id: number, vendor_id: number): Promise<Bid | null> => {
  const result = await pool.query(
    'SELECT * FROM bids WHERE tender_id = $1 AND vendor_id = $2',
    [tender_id, vendor_id]
  );
  return result.rows.length > 0 ? result.rows[0] : null;
};