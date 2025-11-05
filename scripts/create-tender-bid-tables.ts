import pool from '../server/config/database';

const createTenderBidTables = async () => {
  try {
    // Create vendors table (for vendor-specific data, separate from auth users)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS vendors (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        company_name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        is_empaneled BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create tenders table
      CREATE TABLE IF NOT EXISTS tenders (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        created_by INTEGER REFERENCES users(id), -- Administrator who created the tender
        status VARCHAR(20) DEFAULT 'active', -- active, closed, cancelled
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Create bids table
      CREATE TABLE IF NOT EXISTS bids (
        id SERIAL PRIMARY KEY,
        tender_id INTEGER REFERENCES tenders(id) ON DELETE CASCADE,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        bid_amount DECIMAL(12, 2) NOT NULL,
        bid_description TEXT,
        submission_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending', -- pending, selected, rejected
        selected_by INTEGER REFERENCES users(id), -- Administrator who selected the bid
        selection_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(tender_id, vendor_id) -- Each vendor can bid only once per tender
      );
      
      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_tenders_status ON tenders(status);
      CREATE INDEX IF NOT EXISTS idx_tenders_end_date ON tenders(end_date);
      CREATE INDEX IF NOT EXISTS idx_bids_tender_id ON bids(tender_id);
      CREATE INDEX IF NOT EXISTS idx_bids_vendor_id ON bids(vendor_id);
      CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
      CREATE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);
      CREATE INDEX IF NOT EXISTS idx_vendors_empaneled ON vendors(is_empaneled);
    `);
    
    console.log('Tender and bid tables created successfully');
  } catch (err) {
    console.error('Error creating tender and bid tables:', err);
  } finally {
    await pool.end();
  }
};

createTenderBidTables();