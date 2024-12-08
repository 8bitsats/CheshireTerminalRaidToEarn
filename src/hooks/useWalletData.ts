import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getGrinBalance } from '@/lib/helius';

export const useWalletData = () => {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [walletData, setWalletData] = useState({
    address: '',
    solBalance: 0,
    grinBalance: 0,
    usdValue: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!publicKey) return;

      try {
        const [solBalance, grinBalance] = await Promise.all([
          connection.getBalance(publicKey),
          getGrinBalance(publicKey.toString())
        ]);

        const solInNative = solBalance / 1e9;
        const estimatedUsdValue = solInNative * 100; // Mock price calculation

        setWalletData({
          address: publicKey.toString(),
          solBalance: solInNative,
          grinBalance: grinBalance,
          usdValue: estimatedUsdValue
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch wallet data');
        console.error('Error fetching wallet data:', err);
      }
    };

    fetchWalletData();
    const interval = setInterval(fetchWalletData, 30000);
    return () => clearInterval(interval);
  }, [publicKey, connection]);

  return { walletData, error };
};