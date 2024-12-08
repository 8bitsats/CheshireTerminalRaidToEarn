export interface WalletData {
  address: string;
  solBalance: number;
  grinBalance: number;
  usdValue: number;
}

export interface CheshireBalance {
  balance: number;
  loading: boolean;
  error: string | null;
}

export interface RaidStats {
  totalPoints: number;
  currentRank: number;
  estimatedReward: number;
  tweetsPosted: number;
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  time: string;
  icon: string;
}