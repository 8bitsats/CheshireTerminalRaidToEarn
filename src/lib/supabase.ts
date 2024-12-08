import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  wallet_address: string;
  username: string | null;
  created_at: string;
  last_login: string;
  raid_points: number;
  total_raids: number;
};

// Auth helper functions
export const signInWithWallet = async (walletAddress: string) => {
  const { data, error } = await supabase
    .from('users')
    .upsert({
      wallet_address: walletAddress,
      last_login: new Date().toISOString(),
    }, {
      onConflict: 'wallet_address'
    });

  if (error) throw error;
  return data;
};

export const getUserProfile = async (walletAddress: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('wallet_address', walletAddress)
    .single();

  if (error) throw error;
  return data as User;
};

export const updateUserRaidPoints = async (walletAddress: string, points: number) => {
  const { data, error } = await supabase
    .from('users')
    .update({
      raid_points: points,
      total_raids: supabase.rpc('increment_raids')
    })
    .eq('wallet_address', walletAddress)
    .select()
    .single();

  if (error) throw error;
  return data as User;
};
