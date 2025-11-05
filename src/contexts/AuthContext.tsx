
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

// Define the User type
interface User {
  id: number;
  email: string;
  name: string;
  role: 'buyer' | 'seller';
}

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string, userData: { 
    name: string;
    role: 'buyer' | 'seller';
  }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize the API client with any stored token
    apiClient.initializeToken();
    
    // Try to get user profile to verify token is still valid
    const verifyStoredSession = async () => {
      try {
        const profile = await apiClient.getProfile();
        setUser(profile.user);
      } catch (error) {
        // Token is invalid or expired, clear it
        apiClient.clearToken();
      } finally {
        setLoading(false);
      }
    };
    
    verifyStoredSession();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userData: { name: string; role: 'buyer' | 'seller' }
  ) => {
    try {
      setLoading(true);
      console.log('Signing up with:', { email, userData });
      
      const response = await apiClient.register({
        email,
        password,
        name: userData.name,
        role: userData.role,
      });
      
      setUser(response.user as User);
      
      toast({
        title: t('auth.accountCreated'),
        description: t('auth.welcomeMessage'),
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Signing in with:', email);
      
      const response = await apiClient.login({
        email,
        password,
      });
      
      setUser(response.user as User);
      
      toast({
        title: t('auth.signedInSuccessfully'),
        description: t('auth.welcomeMessage'),
      });
      
      navigate('/');
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await apiClient.logout();
      setUser(null);
      navigate('/auth');
      
      toast({
        title: t('auth.signedOut'),
        description: t('auth.signedOutDescription'),
      });
    } catch (error: any) {
      toast({
        title: t('auth.errorSigningOut'),
        description: error.message,
        variant: 'destructive',
      });
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
