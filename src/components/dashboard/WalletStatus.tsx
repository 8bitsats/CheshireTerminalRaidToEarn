import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

interface WalletStatusProps {
  walletData: {
    address: string;
    solBalance: number;
    grinBalance: number;
    usdValue: number;
  };
}

const WalletStatus: React.FC<WalletStatusProps> = ({ walletData }) => {
  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Wallet className="h-5 w-5" /> Wallet Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-white">
          <div className="flex justify-between">
            <span>Address:</span>
            <span className="text-purple-400">
              {walletData.address.slice(0, 6)}...{walletData.address.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span>SOL Balance:</span>
            <span className="text-green-400">{walletData.solBalance} SOL</span>
          </div>
          <div className="flex justify-between">
            <span>GRIN Balance:</span>
            <span className="text-green-400">{walletData.grinBalance} GRIN</span>
          </div>
          <div className="flex justify-between">
            <span>USD Value:</span>
            <span className="text-green-400">${walletData.usdValue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletStatus;