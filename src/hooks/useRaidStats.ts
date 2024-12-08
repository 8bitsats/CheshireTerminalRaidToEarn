import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export const useRaidStats = () => {
  const { publicKey } = useWallet();
  const [stats, setStats] = useState({
    totalPoints: 0,
    currentRank: 0,
    estimatedReward: 0,
    tweetsPosted: 0,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaidStats = async () => {
      if (!publicKey) return;

      try {
        // Mock data for now - replace with actual API calls
        setStats({
          totalPoints: Math.floor(Math.random() * 1000),
          currentRank: Math.floor(Math.random() * 100) + 1,
          estimatedReward: parseFloat((Math.random() * 0.5).toFixed(3)),
          tweetsPosted: Math.floor(Math.random() * 5),
        });
        setError(null);
      } catch (err) {
        setError('Failed to fetch raid stats');
        console.error('Error fetching raid stats:', err);
      }
    };

    fetchRaidStats();
    const interval = setInterval(fetchRaidStats, 60000);
    return () => clearInterval(interval);
  }, [publicKey]);

  return { stats, error };
};