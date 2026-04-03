import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  joinDate: string;
  totalSpent: number;
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  orders: Order[];
}

export interface Order {
  id: string;
  order_number: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  pointsEarned: number;
  trackingNumber?: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'UPDATE_PROFILE'; payload: Partial<User> }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_POINTS'; payload: number };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    
    case 'ADD_ORDER':
      if (!state.user) return state;
      
      const newOrder = action.payload;
      const pointsEarned = Math.floor(newOrder.total); // 1 point per 1 Lei spent
      
      const updatedUser = {
        ...state.user,
        orders: [newOrder, ...state.user.orders],
        totalSpent: state.user.totalSpent + newOrder.total,
        points: state.user.points + pointsEarned
      };
      
      // Update tier based on total spent
      if (updatedUser.totalSpent >= 2000) {
        updatedUser.tier = 'Platinum';
      } else if (updatedUser.totalSpent >= 1000) {
        updatedUser.tier = 'Gold';
      } else if (updatedUser.totalSpent >= 500) {
        updatedUser.tier = 'Silver';
      } else {
        updatedUser.tier = 'Bronze';
      }
      
      return {
        ...state,
        user: updatedUser
      };
    
    case 'UPDATE_POINTS':
      return {
        ...state,
        user: state.user ? { ...state.user, points: state.user.points + action.payload } : null
      };
    
    default:
      return state;
  }
};

interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addOrder: (order: Order) => void;
  updatePoints: (points: number) => void;
  getTierBenefits: (tier: string) => TierBenefits;
  getPointsToNextTier: () => number;
  refreshSession: () => Promise<void>;
  fetchUserOrders: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  resendConfirmation: (email: string) => Promise<{ error: Error | null }>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

interface TierBenefits {
  name: string;
  pointsMultiplier: number;
  freeShippingThreshold: number;
  exclusiveOffers: boolean;
  birthdayBonus: number;
  earlyAccess: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: false
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('atomra_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        localStorage.removeItem('atomra_user');
      }
    }
    
    // Check Supabase session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        // Session exists but we might not have loaded the user yet
        // This is just to keep the session alive
        console.log("Supabase session exists");
      }
    };
    
    checkSession();
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('atomra_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('atomra_user');
    }
  }, [state.user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Try to login with Supabase first
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (authError) {
        console.log("Supabase auth error:", authError);
        // Fall back to mock login
      } else if (authData.user) {
        console.log("Supabase auth successful");
        
        // Try to get user profile from Supabase
        const { data: profileData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user.id)
          .single();
        
        if (!profileError && profileData) {
          // Get user orders from Supabase
          const { data: ordersData, error: ordersError } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_email', email)
            .order('created_at', { ascending: false });
          
          // Format orders for our state
          const formattedOrders: Order[] = ordersError ? [] : (ordersData || []).map((order: any) => ({
            id: order.id,
            order_number: order.order_number,
            date: order.created_at,
            status: order.order_status,
            items: order.items || [],
            subtotal: order.subtotal,
            shipping: order.shipping_cost,
            total: order.total_amount,
            pointsEarned: Math.floor(order.total_amount), // 1 point per 1 Lei
            trackingNumber: order.tracking_number
          }));
          
          // Calculate total spent and points from orders
          const totalSpent = formattedOrders.reduce((sum, order) => sum + order.total, 0);
          const points = formattedOrders.reduce((sum, order) => sum + order.pointsEarned, 0);
          
          // Determine tier based on total spent
          let tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze';
          if (totalSpent >= 2000) tier = 'Platinum';
          else if (totalSpent >= 1000) tier = 'Gold';
          else if (totalSpent >= 500) tier = 'Silver';
          
          // Create user object from profile data
          const user: User = {
            id: profileData.id,
            email: profileData.email,
            firstName: profileData.first_name || '',
            lastName: profileData.last_name || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            city: profileData.city || '',
            postalCode: profileData.postal_code || '',
            joinDate: profileData.created_at,
            totalSpent,
            points,
            tier,
            orders: formattedOrders
          };
          
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          return true;
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (mock database)
      const users = JSON.parse(localStorage.getItem('atomra_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Try to register with Supabase first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone
          }
        }
      });
      
      if (authError) {
        console.log("Supabase registration error:", authError);
        // Fall back to mock registration
      } else if (authData.user) {
        console.log("Supabase registration successful");
        
        // Create user profile in Supabase
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            email: userData.email,
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone
          });
        
        if (!profileError) {
          // Create user object for our state
          const user: User = {
            id: authData.user.id,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone,
            joinDate: new Date().toISOString(),
            totalSpent: 0,
            points: 100, // Welcome bonus
            tier: 'Bronze',
            orders: []
          };
          
          dispatch({ type: 'REGISTER_SUCCESS', payload: user });
          return true;
        }
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('atomra_users') || '[]');
      const existingUser = users.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        joinDate: new Date().toISOString(),
        totalSpent: 0,
        points: 100, // Welcome bonus
        tier: 'Bronze',
        orders: []
      };
      
      // Save to mock database
      const userWithPassword = { ...newUser, password: userData.password };
      users.push(userWithPassword);
      localStorage.setItem('atomra_users', JSON.stringify(users));
      
      dispatch({ type: 'REGISTER_SUCCESS', payload: newUser });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = async () => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out from Supabase:", error);
    }
    
    // Clear local state regardless of Supabase result
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = (data: Partial<User>) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: data });
    
    // If we have a Supabase user, update their profile
    if (state.user?.id) {
      try {
        supabase
          .from('users')
          .update({
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
            address: data.address,
            city: data.city,
            postal_code: data.postalCode
          })
          .eq('id', state.user.id)
          .then(({ error }) => {
            if (error) console.error("Error updating Supabase profile:", error);
          });
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const addOrder = async (order: Order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
    
    // If we have a Supabase user, update their points
    if (state.user?.id) {
      try {
        // Calculate points earned (1 point per 1 Lei)
        const pointsEarned = Math.floor(order.total);
        
        // Update user's points in Supabase
        await supabase
          .from('users')
          .update({
            points: (state.user.points + pointsEarned)
          })
          .eq('id', state.user.id);
      } catch (error) {
        console.error("Error updating points in Supabase:", error);
      }
    }
  };

  const updatePoints = (points: number) => {
    dispatch({ type: 'UPDATE_POINTS', payload: points });
    
    // If we have a Supabase user, update their points
    if (state.user?.id) {
      try {
        supabase
          .from('users')
          .update({
            points: (state.user?.points || 0) + points
          })
          .eq('id', state.user.id)
          .then(({ error }) => {
            if (error) console.error("Error updating Supabase points:", error);
          });
      } catch (error) {
        console.error("Error updating points:", error);
      }
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.error("Session refresh error:", error);
        // If refresh fails, sign out to clear any invalid tokens
        await supabase.auth.signOut();
        dispatch({ type: 'LOGOUT' });
      } else if (data.session) {
        console.log("Session refreshed successfully");
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };
  
  const fetchUserOrders = async () => {
    if (!state.user?.email) return;
    
    try {
      // Get user orders from Supabase
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', state.user.email)
        .order('created_at', { ascending: false });
      
      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        return;
      }
      
      // Format orders for our state
      const formattedOrders: Order[] = (ordersData || []).map((order: any) => ({
        id: order.id,
        order_number: order.order_number,
        date: order.created_at,
        status: order.order_status,
        items: order.items || [],
        subtotal: order.subtotal,
        shipping: order.shipping_cost,
        total: order.total_amount,
        pointsEarned: Math.floor(order.total_amount), // 1 point per 1 Lei
        trackingNumber: order.tracking_number
      }));
      
      // Calculate total spent and points from orders
      const totalSpent = formattedOrders.reduce((sum, order) => sum + order.total, 0);
      const points = formattedOrders.reduce((sum, order) => sum + order.pointsEarned, 0) + 100; // Include welcome bonus
      
      // Determine tier based on total spent
      let tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' = 'Bronze';
      if (totalSpent >= 2000) tier = 'Platinum';
      else if (totalSpent >= 1000) tier = 'Gold';
      else if (totalSpent >= 500) tier = 'Silver';
      
      // Update user with orders and calculated values
      dispatch({ 
        type: 'UPDATE_PROFILE', 
        payload: { 
          orders: formattedOrders,
          totalSpent,
          points,
          tier
        } 
      });
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  };

  const getTierBenefits = (tier: string): TierBenefits => {
    const benefits = {
      Bronze: {
        name: 'Bronze',
        pointsMultiplier: 1,
        freeShippingThreshold: 149,
        exclusiveOffers: false,
        birthdayBonus: 50,
        earlyAccess: false
      },
      Silver: {
        name: 'Silver',
        pointsMultiplier: 1.25,
        freeShippingThreshold: 99,
        exclusiveOffers: true,
        birthdayBonus: 100,
        earlyAccess: false
      },
      Gold: {
        name: 'Gold',
        pointsMultiplier: 1.5,
        freeShippingThreshold: 49,
        exclusiveOffers: true,
        birthdayBonus: 150,
        earlyAccess: true
      },
      Platinum: {
        name: 'Platinum',
        pointsMultiplier: 2,
        freeShippingThreshold: 0,
        exclusiveOffers: true,
        birthdayBonus: 200,
        earlyAccess: true
      }
    };
    
    return benefits[tier as keyof typeof benefits] || benefits.Bronze;
  };

  const getPointsToNextTier = (): number => {
    if (!state.user) return 0;
    
    const spentThresholds = {
      Bronze: 500,
      Silver: 1000,
      Gold: 2000,
      Platinum: Infinity
    };
    
    const currentTier = state.user.tier;
    const nextThreshold = spentThresholds[currentTier as keyof typeof spentThresholds];
    
    if (nextThreshold === Infinity) return 0;
    
    return Math.max(0, nextThreshold - state.user.totalSpent);
  };

  // New direct Supabase auth methods
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch({ type: 'LOGOUT' });
  };

  const resendConfirmation = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      });
      
      return { error };
    } catch (err) {
      return { error: err as Error };
    }
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
    updateProfile,
    addOrder,
    updatePoints,
    getTierBenefits,
    getPointsToNextTier,
    refreshSession,
    fetchUserOrders,
    signIn,
    signUp,
    signOut,
    resendConfirmation
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};