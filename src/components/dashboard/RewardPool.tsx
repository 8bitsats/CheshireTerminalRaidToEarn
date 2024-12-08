import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Coins, TrendingUp } from 'lucide-react';
import { useCheshireBalance } from '@/hooks/useCheshireBalance';
import { RAID_CONSTANTS } from '@/lib/constants';

const RewardPool: React.FC = () => {
  const { balance, loading, error } = useCheshireBalance();

  const calculatePercentageRemaining = (balance: number): number => {
    return (balance / RAID_CONSTANTS.REWARD_POOL) * 100;
  };

  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Coins className="h-5 w-5" /> Reward Pool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white">Available Rewards:</span>
            {loading ? (
              <span className="text-gray-400">Loading...</span>
            ) : error ? (
              <span className="text-red-400">Error loading balance</span>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-green-400 font-bold">{balance.toFixed(4)} SOL</span>
                <span className="text-sm text-gray-400">
                  {calculatePercentageRemaining(balance).toFixed(1)}% remaining
                </span>
              </div>
            )}
          </div>
          
          {!loading && !error && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculatePercentageRemaining(balance)}%` }}
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-400">
            <TrendingUp className="h-4 w-4 text-purple-400" />
            <span>Rewards are distributed based on engagement points and follower multipliers</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RewardPool;