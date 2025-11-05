import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const Dashboard: React.FC = () => {
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

  // Show different dashboard based on user role
  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendor' || user?.role === 'seller';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Active Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{opportunities.filter(t => t.status === 'active').length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Total Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">Loading...</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>My Bids</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">Loading...</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Opportunities List */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isAdmin ? 'All Opportunities' : 'Available Opportunities'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p>Loading opportunities...</p>
                  ) : (
                    <div className="space-y-4">
                      {opportunities.length > 0 ? (
                        opportunities.map(opportunity => (
                          <div key={opportunity.id} className="border p-4 rounded-lg">
                            <h3 className="font-bold">{opportunity.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{opportunity.description}</p>
                            <div className="flex justify-between items-center">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                opportunity.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : opportunity.status === 'closed'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {opportunity.status}
                              </span>
                              <span className="text-xs">
                                Ends: {new Date(opportunity.end_date).toLocaleDateString()}
                              </span>
                            </div>
                            {isVendor && opportunity.status === 'active' && (
                              <div className="mt-3">
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    // Navigate to bid form
                                    window.location.href = `/tender/${opportunity.id}`;
                                  }}
                                >
                                  Place Bid
                                </Button>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <p>No opportunities available.</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Role specific content */}
            <div>
              {isAdmin ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        className="w-full" 
                        onClick={() => window.location.href = '/admin/tenders/create'}
                      >
                        Create New Opportunity
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => window.location.href = '/admin/vendors'}
                      >
                        Manage Vendors
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => window.location.href = '/admin/tenders'}
                      >
                        View All Opportunities
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : isVendor ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Vendor Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => window.location.href = '/vendor/bids'}
                      >
                        View My Bids
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => window.location.href = '/vendor/profile'}
                      >
                        Vendor Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>User Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Please contact an administrator to be assigned vendor access.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;