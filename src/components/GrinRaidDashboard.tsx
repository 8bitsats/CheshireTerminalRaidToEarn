import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import WalletStatus from './dashboard/WalletStatus';
import RaidStats from './dashboard/RaidStats';
import TweetComposer from './dashboard/TweetComposer';
import RecentActivity from './dashboard/RecentActivity';
import RewardPool from './dashboard/RewardPool';
import { useWalletData } from '@/hooks/useWalletData';
import { useRaidStats } from '@/hooks/useRaidStats';
import { postTweet } from '@/lib/twitter';

const GrinRaidDashboard = () => {
  const { connected } = useWallet();
  const { walletData, error: walletError } = useWalletData();
  const { stats, error: statsError } = useRaidStats();
  const [activities, setActivities] = useState([]);

  const handleTweetSubmit = async (content: string) => {
    if (!connected) {
      throw new Error('Please connect your wallet first');
    }

    try {
      await postTweet(content, 'YOUR_TWITTER_TOKEN');
      setActivities(prev => [{
        id: Date.now().toString(),
        type: 'tweet',
        description: 'Tweet posted successfully',
        time: new Date().toLocaleTimeString(),
        icon: 'Twitter'
      }, ...prev]);
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-white mb-4">Connect Wallet to View Dashboard</h1>
          <WalletMultiButton />
        </div>
      </div>
    );
  }

  if (walletError || statsError) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
          {walletError || statsError}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">GRIN Raid Dashboard</h1>
          <WalletMultiButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WalletStatus walletData={walletData} />
          <RaidStats stats={stats} />
          <RewardPool />
        </div>

        <TweetComposer onTweetSubmit={handleTweetSubmit} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default GrinRaidDashboard;