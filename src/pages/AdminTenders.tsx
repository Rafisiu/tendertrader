import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';

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

const AdminOpportunities: React.FC = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getTenders();
      setOpportunities(response.tenders);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch opportunities',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
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
                Only administrators can manage opportunities.
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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <CardTitle>Manage Opportunities</CardTitle>
            <Button onClick={() => window.location.href = '/admin/tenders/create'}>
              Create New Opportunity
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              {loading ? (
                <p>Loading opportunities...</p>
              ) : opportunities.length > 0 ? (
                <div className="space-y-4">
                  {opportunities.map(opportunity => (
                    <div key={opportunity.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{opportunity.title}</h3>
                            <Badge 
                              className={
                                opportunity.status === 'active' 
                                  ? 'bg-green-500 hover:bg-green-600' 
                                  : opportunity.status === 'closed'
                                  ? 'bg-red-500 hover:bg-red-600'
                                  : 'bg-gray-500 hover:bg-gray-600'
                              }
                            >
                              {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{opportunity.description}</p>
                          
                          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Category:</span> {opportunity.category}
                            </div>
                            <div>
                              <span className="font-medium">Start Date:</span> {new Date(opportunity.start_date).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">End Date:</span> {new Date(opportunity.end_date).toLocaleDateString()}
                            </div>
                            <div>
                              <span className="font-medium">Created:</span> {new Date(opportunity.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 ml-4">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = `/admin/tenders/${opportunity.id}/bids`}
                          >
                            View Bids
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = `/tender/${opportunity.id}`}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No opportunities found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminOpportunities;