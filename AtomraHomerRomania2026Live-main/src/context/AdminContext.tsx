/* eslint-disable react-refresh/only-export-components */
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

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
};

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminLoading, setAdminLoading] = useState<boolean>(true);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [sessionResolved, setSessionResolved] = useState<boolean>(false);

  const verifyAdminAccess = async (userId: string): Promise<boolean> => {
    const { data: adminUser, error } = await withTimeout(
      supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle(),
      8000,
      'Admin verification timed out. Please try again.'
    );

    if (error) {
      throw error;
    }

    return Boolean(adminUser);
  };

  // Check if user is admin on mount
  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await withTimeout(
          supabase.auth.getSession(),
          8000,
          'Session check timed out. Please refresh and try again.'
        );

        if (!isMounted) {
          return;
        }

        setAuthUserId(session?.user?.id ?? null);
      } catch (error) {
        console.error('Error checking admin status:', error);
        if (isMounted) {
          setAdminError(error instanceof Error ? error.message : 'Failed to initialize admin session');
          setAuthUserId(null);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) {
          setSessionResolved(true);
        }
      }
    };

    checkAdminStatus();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) {
          return;
        }

        setAdminError(null);
        setSessionResolved(true);
        setAuthUserId(session?.user?.id ?? null);

        if (!session?.user) {
          setIsAdmin(false);
          setAdminLoading(false);
        }
      }
    );

    // Cleanup subscription
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncAdminStatus = async () => {
      if (!sessionResolved) {
        return;
      }

      if (!authUserId) {
        setIsAdmin(false);
        setAdminLoading(false);
        return;
      }

      setAdminLoading(true);

      try {
        const hasAdminAccess = await verifyAdminAccess(authUserId);

        if (!isMounted) {
          return;
        }

        setIsAdmin(hasAdminAccess);

        if (!hasAdminAccess) {
          setAdminError('Unauthorized access. This account does not have admin privileges.');
        }
      } catch (error) {
        console.error('Error verifying admin access:', error);
        if (isMounted) {
          setIsAdmin(false);
          setAdminError(error instanceof Error ? error.message : 'Failed to verify admin access');
        }
      } finally {
        if (isMounted) {
          setAdminLoading(false);
        }
      }
    };

    void syncAdminStatus();

    return () => {
      isMounted = false;
    };
  }, [authUserId, sessionResolved]);

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setAdminLoading(true);
    setAdminError(null);
    
    try {
      // Sign in with Supabase Auth
      const { data, error } = await withTimeout(
        supabase.auth.signInWithPassword({
          email: email.trim(),
          password
        }),
        10000,
        'Login request timed out. Please try again.'
      );

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error('No user returned from login');
      }

      const hasAdminAccess = await verifyAdminAccess(data.user.id);

      if (!hasAdminAccess) {
        await supabase.auth.signOut();
        setAuthUserId(null);
        setIsAdmin(false);
        throw new Error('Unauthorized access. This account does not have admin privileges.');
      }

      setAuthUserId(data.user.id);
      setIsAdmin(true);
      return true;
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : 'Failed to login');
      return false;
    } finally {
      setAdminLoading(false);
    }
  };

  const logoutAdmin = async (): Promise<void> => {
    setAdminLoading(true);
    try {
      await supabase.auth.signOut();
      setAuthUserId(null);
      setIsAdmin(false);
      setAdminError(null);
      
      // Clear any cached data
      localStorage.removeItem('supabase.auth.token');
      
      // Force reload to clear any state
      window.location.href = '/';
    } catch (error) {
      setAdminError(error instanceof Error ? error.message : 'Failed to logout');
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
