import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase, User, signInWithWallet, getUserProfile } from '../lib/supabase';

export const useSupabaseAuth = () => {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      if (connected && publicKey) {
        try {
          setLoading(true);
          // Sign in or create user with wallet address
          await signInWithWallet(publicKey.toString());
          
          // Get user profile
          const profile = await getUserProfile(publicKey.toString());
          setUser(profile);
        } catch (error) {
          console.error('Error authenticating:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    handleAuth();
  }, [connected, publicKey]);

  // Subscribe to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};
