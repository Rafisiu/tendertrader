
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users away from the auth page
  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">{t('pages.auth.welcomeTitle')}</h1>
            <p className="mt-2 text-muted-foreground">
              {t('pages.auth.welcomeDescription')}
            </p>
          </div>
          
          <AuthForm />
          
          <div className="mt-8">
            <Card className="p-4 text-sm text-center bg-primary/5 border-primary/20">
              <p>{t('pages.auth.systemMessage')}</p>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
