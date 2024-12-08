import { useState, useEffect } from 'react';
import { getCheshireBalance } from '@/lib/helius';
import { CheshireBalance } from '@/types/wallet';
import { WALLET_CONSTANTS } from '@/lib/constants';

export const useCheshireBalance = (): CheshireBalance => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const solBalance = await getCheshireBalance();
        setBalance(solBalance);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Cheshire wallet balance');
        console.error('Error fetching balance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, WALLET_CONSTANTS.UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { balance, loading, error };
};