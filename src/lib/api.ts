// API client for backend communication
const API_BASE_URL = typeof window !== 'undefined' && 
  (window.location.hostname === 'vendor1.mpurwadi.site' || window.location.hostname === 'vendors.mpurwadi.site')
  ? `https://${window.location.hostname}/api`  // Use the current domain
  : 'http://192.168.100.115:4000/api';  // Fallback to IP-based address

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: 'buyer' | 'seller' | 'vendor';
}

interface AuthResponse {
  message: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: 'buyer' | 'seller' | 'vendor' | 'admin';
  };
  token: string;
}

interface UserProfile {
  user: {
    id: number;
    email: string;
    name: string;
    role: 'buyer' | 'seller' | 'vendor' | 'admin';
    created_at: string;
  };
}

// Store the authentication token
let authToken: string | null = null;

// Set up request interceptors to include auth token
const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }
  
  return headers;
};

export const apiClient = {
  // Set the auth token
  setToken(token: string) {
    authToken = token;
    // Store in localStorage for persistence
    localStorage.setItem('authToken', token);
  },
  
  // Get the auth token from localStorage on initialization
  initializeToken() {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      authToken = storedToken;
    }
  },
  
  // Remove the auth token
  clearToken() {
    authToken = null;
    localStorage.removeItem('authToken');
  },
  
  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Registration failed');
    }
    
    const result = await response.json();
    
    // Store the token for future requests
    if (result.token) {
      this.setToken(result.token);
    }
    
    return result;
  },
  
  // Login user
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Login failed');
    }
    
    const result = await response.json();
    
    // Store the token for future requests
    if (result.token) {
      this.setToken(result.token);
    }
    
    return result;
  },
  
  // Get user profile
  async getProfile(): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        // Clear invalid token
        this.clearToken();
      }
      const error = await response.text();
      throw new Error(error || 'Failed to get profile');
    }
    
    return await response.json();
  },
  
  // Logout
  async logout(): Promise<void> {
    this.clearToken();
  },
  
  // Tenders API
  async getTenders() {
    const response = await fetch(`${API_BASE_URL}/tenders`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to get opportunities');
    }
    
    return await response.json();
  },
  
  async createTender(tenderData: { title: string; description: string; category: string; start_date: string; end_date: string }) {
    const response = await fetch(`${API_BASE_URL}/tenders`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(tenderData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to create opportunity');
    }
    
    return await response.json();
  },
  
  async getTenderById(id: number) {
    const response = await fetch(`${API_BASE_URL}/tenders/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to get opportunity');
    }
    
    return await response.json();
  },
  
  // Vendors API
  async getVendors() {
    const response = await fetch(`${API_BASE_URL}/vendors`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to get vendors');
    }
    
    return await response.json();
  },
  
  async createVendor(vendorData: { user_id: number; company_name: string; contact_person?: string; phone?: string; address?: string }) {
    const response = await fetch(`${API_BASE_URL}/vendors`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(vendorData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to create vendor');
    }
    
    return await response.json();
  },
  
  async updateVendorEmpanelment(vendorId: number, is_empaneled: boolean) {
    const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}/empanel`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ is_empaneled }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to update vendor empanelment');
    }
    
    return await response.json();
  },
  
  // Bids API
  async getBidsForTender(tenderId: number) {
    const response = await fetch(`${API_BASE_URL}/bids/tender/${tenderId}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to get bids for tender');
    }
    
    return await response.json();
  },
  
  async getVendorBids() {
    const response = await fetch(`${API_BASE_URL}/bids/vendor`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to get vendor bids');
    }
    
    return await response.json();
  },
  
  async createBid(bidData: { tender_id: number; bid_amount: number; bid_description: string }) {
    const response = await fetch(`${API_BASE_URL}/bids`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bidData),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to create bid');
    }
    
    return await response.json();
  },
  
  async selectWinningBid(bidId: number) {
    const response = await fetch(`${API_BASE_URL}/bids/${bidId}/select`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Failed to select winning bid');
    }
    
    return await response.json();
  },
};