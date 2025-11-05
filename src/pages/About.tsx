
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Users, Globe, ShieldCheck, BarChart3, Search } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-background">
        {/* Hero Section */}
        <section className="bg-business-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">{t('pages.about.title')}</h1>
              <p className="text-xl mb-8 text-business-100">
                {t('pages.about.subtitle')}
              </p>
            </div>
          </div>
        </section>
        
        {/* Company Overview */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('pages.about.missionTitle')}</h2>
                <p className="text-lg mb-6 text-muted-foreground">
                  {t('pages.about.missionText')}
                </p>
                <p className="text-lg mb-6 text-muted-foreground">
                  {t('pages.about.overviewText')}
                </p>
                <p className="text-lg text-muted-foreground">
                  {t('pages.about.overviewText')}
                </p>
              </div>
              
              <div className="bg-muted/20 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6">{t('pages.about.whyChooseTitle')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-accent/10 rounded-full p-2">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t('pages.about.feature1Title')}</h4>
                      <p className="text-muted-foreground">{t('pages.about.feature1Desc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-accent/10 rounded-full p-2">
                      <Globe className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t('pages.about.feature2Title')}</h4>
                      <p className="text-muted-foreground">{t('pages.about.feature2Desc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-accent/10 rounded-full p-2">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t('pages.about.feature3Title')}</h4>
                      <p className="text-muted-foreground">{t('pages.about.feature3Desc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-accent/10 rounded-full p-2">
                      <BarChart3 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{t('pages.about.feature4Title')}</h4>
                      <p className="text-muted-foreground">{t('pages.about.feature4Desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('pages.about.approachTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('pages.about.approachText')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <div className="bg-business-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    <Search className="h-6 w-6 text-business-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t('common.tenderMarketplace')}</h3>
                  <p className="text-muted-foreground">
                    {t('common.tenderMarketplaceDesc')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-business-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-business-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t('common.qualityAudits')}</h3>
                  <p className="text-muted-foreground">
                    {t('common.qualityAuditsDesc')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="bg-business-100 rounded-full p-3 w-14 h-14 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-business-800" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t('common.supplierVerification')}</h3>
                  <p className="text-muted-foreground">
                    {t('common.supplierVerificationDesc')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section - Placeholder */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('pages.about.teamTitle')}</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('pages.about.teamText')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="bg-muted w-32 h-32 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold">Executive Name</h3>
                  <p className="text-muted-foreground mb-3">{t('common.positionTitle')}</p>
                  <p className="text-sm text-muted-foreground">
                    {t('common.briefBio')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-business-800 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">{t('pages.about.trustTitle')}</h2>
              <p className="text-business-100 mb-8">
                {t('pages.about.trustText')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/buyer">
                  <Button size="lg" className="bg-accent hover:bg-accent-600 text-white w-full sm:w-auto">
                    {t('common.startAsBuyer')}
                  </Button>
                </Link>
                <Link to="/seller">
                  <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-business-700 w-full sm:w-auto">
                    {t('common.startAsSupplier')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
