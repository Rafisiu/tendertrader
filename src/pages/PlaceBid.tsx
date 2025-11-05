import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

interface Tender {
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

const PlaceBid: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [tender, setTender] = useState<Tender | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [bidDescription, setBidDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTender();
  }, [id]);

  const fetchTender = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getTenderById(Number(id));
      setTender(response.tender);
    } catch (error) {
      console.error('Error fetching tender:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tender details',
        variant: 'destructive',
      });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await apiClient.createBid({
        tender_id: Number(id),
        bid_amount: parseFloat(bidAmount),
        bid_description: bidDescription
      });
      
      toast({
        title: 'Success',
        description: 'Bid placed successfully',
      });
      
      navigate('/vendor/bids');
    } catch (error) {
      console.error('Error placing bid:', error);
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to place bid',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Check if user is vendor and tender exists
  if (user?.role !== 'vendor' && user?.role !== 'seller') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                Only vendors can place bids.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">You don't have permission to place bids.</p>
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
          <p>Loading tender details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tender) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <p>Tender not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Place Bid for: {tender.title}</CardTitle>
              <CardDescription>
                Submit your bid for this opportunity
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold">Opportunity Details</h3>
                  <p className="text-sm text-muted-foreground">{tender.description}</p>
                  <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Category:</span> {tender.category}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> 
                      <span className={`ml-2 px-2 py-1 rounded-full ${
                        tender.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {tender.status}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Start Date:</span> {new Date(tender.start_date).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span> {new Date(tender.end_date).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bidAmount">Bid Amount (in $)</Label>
                  <Input 
                    id="bidAmount"
                    type="number" 
                    step="0.01"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid amount"
                    min="0"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bidDescription">Bid Description</Label>
                  <Textarea 
                    id="bidDescription"
                    value={bidDescription}
                    onChange={(e) => setBidDescription(e.target.value)}
                    placeholder="Describe your bid proposal"
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={submitting || tender.status !== 'active'}
                >
                  {submitting ? 'Submitting...' : 'Place Bid'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlaceBid;