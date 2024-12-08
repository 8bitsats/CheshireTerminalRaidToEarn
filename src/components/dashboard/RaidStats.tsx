import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

interface RaidStatsProps {
  stats: {
    totalPoints: number;
    currentRank: number;
    estimatedReward: number;
    tweetsPosted: number;
  };
}

const RaidStats: React.FC<RaidStatsProps> = ({ stats }) => {
  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Award className="h-5 w-5" /> Raid Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-white">
          <div className="flex justify-between">
            <span>Total Points:</span>
            <span className="text-purple-400">{stats.totalPoints}</span>
          </div>
          <div className="flex justify-between">
            <span>Current Rank:</span>
            <span className="text-purple-400">#{stats.currentRank}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Reward:</span>
            <span className="text-green-400">{stats.estimatedReward} SOL</span>
          </div>
          <div className="flex justify-between">
            <span>Tweets Posted:</span>
            <span className="text-purple-400">{stats.tweetsPosted}/5</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RaidStats;