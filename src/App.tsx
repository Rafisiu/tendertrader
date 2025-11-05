
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import CategoryPage from '@/pages/CategoryPage';
import Tenders from '@/pages/Tenders';
import TenderDetails from '@/pages/TenderDetails';
import Suppliers from '@/pages/Suppliers';
import SupplierDetails from '@/pages/SupplierDetails';
import ProductDetails from '@/pages/ProductDetails';
import BuyerPortal from '@/pages/BuyerPortal';
import SellerPortal from '@/pages/SellerPortal';
import About from '@/pages/About';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Dashboard from '@/pages/Dashboard';
import CreateOpportunity from '@/pages/CreateTender';
import PlaceBid from '@/pages/PlaceBid';
import VendorBids from '@/pages/VendorBids';
import AdminOpportunities from '@/pages/AdminTenders';
import OpportunityBids from '@/pages/TenderBids';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

function App() {
  return (
    <Router>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<CategoryPage />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/tenders/:id" element={<TenderDetails />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/suppliers/:id" element={<SupplierDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />

              {/* Protected general routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/vendor/bids" element={<VendorBids />} />
              </Route>

              {/* Protected routes for buyers */}
              <Route element={<ProtectedRoute requiredRole="buyer" />}>
                <Route path="/buyer-portal" element={<BuyerPortal />} />
                <Route path="/buyer-portal/*" element={<BuyerPortal />} />
              </Route>

              {/* Protected routes for sellers (which also act as vendors in our system) */}
              <Route element={<ProtectedRoute requiredRole="seller" />}>
                <Route path="/seller-portal" element={<SellerPortal />} />
                <Route path="/seller-portal/*" element={<SellerPortal />} />
                {/* Vendor specific routes */}
                <Route path="/tender/:id" element={<PlaceBid />} />
              </Route>

              {/* Protected routes for administrators */}
              <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin/tenders" element={<AdminOpportunities />} />
                <Route path="/admin/tenders/create" element={<CreateOpportunity />} />
                <Route path="/admin/tenders/:id/bids" element={<OpportunityBids />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </Router>
  );
}

export default App;
