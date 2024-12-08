import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { supabase, User, signInWithWallet, getUserProfile } from '../lib/supabase';
import { signInWithTwitter, getTwitterProfile } from '../lib/twitter';

export const useSupabaseAuth = () => {
  const { publicKey, connected } = useWallet();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [twitterConnected, setTwitterConnected] = useState(false);

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

          // Check if Twitter is connected
          const { data: { session } } = await supabase.auth.getSession();
          setTwitterConnected(!!session?.provider_token);
        } catch (error) {
          console.error('Error authenticating:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setTwitterConnected(false);
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
        setTwitterConnected(false);
      } else if (event === 'SIGNED_IN' && session?.provider_token) {
        setTwitterConnected(true);
        
        // Update user's Twitter info if available
        try {
          const twitterProfile = await getTwitterProfile();
          if (twitterProfile && user) {
            await supabase
              .from('users')
              .update({
                twitter_handle: twitterProfile.data.username
              })
              .eq('wallet_address', user.wallet_address);
            
            // Refresh user profile
            const updatedProfile = await getUserProfile(user.wallet_address);
            setUser(updatedProfile);
          }
        } catch (error) {
          console.error('Error updating Twitter profile:', error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const connectTwitter = async () => {
    if (!user) {
      throw new Error('Please connect your wallet first');
    }
    return signInWithTwitter();
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    twitterConnected,
    connectTwitter,
  };
};
