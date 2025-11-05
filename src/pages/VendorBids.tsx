import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface Bid {
  id: number;
  tender_id: number;
  vendor_id: number;
  bid_amount: number;
  bid_description: string;
  submission_date: string;
  status: string;
  selected_by: number | null;
  selection_date: string | null;
  created_at: string;
  updated_at: string;
  tender_title: string;
}

const VendorBids: React.FC = () => {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBids();
  }, []);

  const fetchBids = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getVendorBids();
      setBids(response.bids);
    } catch (error) {
      console.error('Error fetching bids:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch your bids',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is vendor
  if (user?.role !== 'vendor' && user?.role !== 'seller') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only vendors can view their bids.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">You don't have permission to access this page.</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => window.location.href = '/'}
              >
                Go to Dashboard
              </Button>
            </CardFooter>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>My Bids</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading your bids...</p>
              ) : bids.length > 0 ? (
                <div className="space-y-4">
                  {bids.map(bid => (
                    <div key={bid.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold">{bid.tender_title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{bid.bid_description}</p>
                          <p className="text-sm mt-2">
                            <span className="font-medium">Bid Amount:</span> ${bid.bid_amount.toFixed(2)}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Submitted:</span> {new Date(bid.submission_date).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge 
                            className={`mb-2 ${
                              bid.status === 'selected' 
                                ? 'bg-green-500 hover:bg-green-600' 
                                : bid.status === 'rejected'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-yellow-500 hover:bg-yellow-600'
                            }`}
                          >
                            {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                          </Badge>
                          {bid.selection_date && (
                            <p className="text-xs text-muted-foreground">
                              Selected: {new Date(bid.selection_date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You haven't placed any bids yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorBids;