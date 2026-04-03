import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAdmin: boolean;
  adminLoading: boolean;
  adminError: string | null;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminLoading, setAdminLoading] = useState<boolean>(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  // Check if user is admin on mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: userRoles, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          if (error) {
            console.error('Error checking admin status:', error);
            return;
          }
          
          setIsAdmin(!!userRoles);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Check if the signed-in user is an admin
          const { data: userRoles, error } = await supabase
            .from('admin_users')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
            
          if (error) {
            console.error('Error checking admin status on auth change:', error);
            setIsAdmin(false);
            return;
          }
          
          setIsAdmin(!!userRoles);
        } else if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setAdminLoading(true);
    setAdminError(null);
    
    try {
      // Sign in with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('No user returned from login');
      }

      // Check if user is in admin_users table
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', data.user.id)
        .single();

      if (adminError || !adminUser) {
        // Sign out if not an admin
        await supabase.auth.signOut();
        throw new Error('Unauthorized access. This account does not have admin privileges.');
      }

      setIsAdmin(true);
      return true;
    } catch (error: any) {
      setAdminError(error.message || 'Failed to login');
      return false;
    } finally {
      setAdminLoading(false);
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    setAdminLoading(true);
    try {
      await supabase.auth.signOut();
      setIsAdmin(false);
      
      // Clear any cached data
      localStorage.removeItem('supabase.auth.token');
      
      // Force reload to clear any state
      window.location.href = '/';
    } catch (error: any) {
      setAdminError(error.message || 'Failed to logout');
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        adminLoading,
        adminError,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};