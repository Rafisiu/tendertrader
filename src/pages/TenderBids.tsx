import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  vendor_company_name: string;
}

interface Opportunity {
  id: number;
  title: string;
  description: string;
  category: string;
  start_date: string;
  end_date: string;
  created_by: number;
  status: string;
  created_at: string;
  updated_at: string;
}

const OpportunityBids: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecting, setSelecting] = useState<number | null>(null);

  useEffect(() => {
    fetchOpportunityAndBids();
  }, [id]);

  const fetchOpportunityAndBids = async () => {
    try {
      setLoading(true);
      // Fetch opportunity details
      const opportunityResponse = await apiClient.getTenderById(Number(id));
      setOpportunity(opportunityResponse.tender);
      
      // Fetch bids for this opportunity
      const bidsResponse = await apiClient.getBidsForTender(Number(id));
      setBids(bidsResponse.bids);
    } catch (error) {
      console.error('Error fetching opportunity and bids:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch opportunity and bids',
        variant: 'destructive',
      });
      navigate('/admin/tenders');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBid = async (bidId: number) => {
    if (!window.confirm('Are you sure you want to select this bid as the winner?')) {
      return;
    }
    
    setSelecting(bidId);
    try {
      await apiClient.selectWinningBid(bidId);
      
      toast({
        title: 'Success',
        description: 'Winning bid selected successfully',
      });
      
      // Refresh the bids list
      fetchOpportunityAndBids();
    } catch (error) {
      console.error('Error selecting bid:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to select winning bid',
        variant: 'destructive',
      });
    } finally {
      setSelecting(null);
    }
  };

  // Check if user is admin
  if (user?.role !== 'admin') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only administrators can view and select bids.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">You don't have permission to access this page.</p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => navigate('/')}
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

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <p>Loading opportunity and bids...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <p>Opportunity not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Bids for: {opportunity.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-semibold">Opportunity Details</h3>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span> {opportunity.category}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full ${
                      opportunity.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : opportunity.status === 'closed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.status}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Start Date:</span> {new Date(opportunity.start_date).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">End Date:</span> {new Date(opportunity.end_date).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={() => navigate('/admin/tenders')}
              >
                Back to All Opportunities
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>All Bids</CardTitle>
            </CardHeader>
            <CardContent>
              {bids.length > 0 ? (
                <div className="space-y-4">
                  {bids
                    .sort((a, b) => a.bid_amount - b.bid_amount) // Sort by bid amount ascending
                    .map(bid => (
                      <div key={bid.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold">{bid.vendor_company_name}</h3>
                              <Badge 
                                className={
                                  bid.status === 'selected' 
                                    ? 'bg-green-500 hover:bg-green-600' 
                                    : bid.status === 'rejected'
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                }
                              >
                                {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-muted-foreground mt-1">{bid.bid_description}</p>
                            
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Bid Amount:</span> ${bid.bid_amount.toFixed(2)}
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span> {new Date(bid.submission_date).toLocaleString()}
                              </div>
                              {bid.selection_date && (
                                <div>
                                  <span className="font-medium">Selected:</span> {new Date(bid.selection_date).toLocaleString()}
                                </div>
                              )}
                              <div>
                                <span className="font-medium">Status:</span> {bid.status}
                              </div>
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            {bid.status !== 'selected' && opportunity.status === 'active' && (
                              <Button
                                onClick={() => handleSelectBid(bid.id)}
                                disabled={selecting === bid.id}
                              >
                                {selecting === bid.id ? 'Selecting...' : 'Select as Winner'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>No bids submitted for this opportunity yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OpportunityBids;