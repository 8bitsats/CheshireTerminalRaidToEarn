import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Shield, Twitter, Wallet, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { supabase } from '../lib/supabase';
import { useCheshireBalance } from '../hooks/useCheshireBalance';

const RaidRegistration = () => {
  const { connected, publicKey } = useWallet();
  const { user, loading: authLoading, twitterConnected, connectTwitter } = useSupabaseAuth();
  const { balance: grinBalance, loading: balanceLoading } = useCheshireBalance();
  
  const [step, setStep] = useState(1);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      setStep(2);
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (grinBalance >= 1) {
      setStep(3);
    }
  }, [grinBalance]);

  useEffect(() => {
    if (twitterConnected) {
      setStep(3);
    }
  }, [twitterConnected]);

  const handleTwitterConnect = async () => {
    try {
      setError(null);
      await connectTwitter();
    } catch (err) {
      setError('Failed to connect Twitter account');
      console.error('Failed to connect Twitter:', err);
    }
  };

  const register = async () => {
    if (!publicKey || !user) return;

    try {
      setError(null);
      
      // Update user record with raid registration
      const { error: updateError } = await supabase
        .from('users')
        .update({
          is_raid_registered: true,
          raid_registration_date: new Date().toISOString()
        })
        .eq('wallet_address', publicKey.toString());

      if (updateError) throw updateError;

      setIsRegistered(true);
      setStep(4);
    } catch (err) {
      setError('Failed to complete registration');
      console.error('Failed to register:', err);
    }
  };

  if (authLoading || balanceLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-purple-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 mb-4">
            GRIN Raid Registration
          </h1>
          <p className="text-gray-400">Complete verification to participate in the raid</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Progress Steps */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { num: 1, title: "Connect Wallet" },
            { num: 2, title: "Verify Holdings" },
            { num: 3, title: "Link Twitter" },
            { num: 4, title: "Complete" }
          ].map((s) => (
            <div
              key={s.num}
              className={`flex flex-col items-center ${
                step >= s.num ? 'text-purple-400' : 'text-gray-600'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step >= s.num ? 'bg-purple-400 text-gray-900' : 'bg-gray-800'
                }`}
              >
                {step > s.num ? <Check size={16} /> : s.num}
              </div>
              <span className="text-sm text-center">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Wallet Connection */}
          <Card className={`bg-gray-800 border-gray-700 ${step === 1 ? 'border-purple-500' : ''}`}>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Wallet className="h-5 w-5" /> Connect Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!connected ? (
                <WalletMultiButton className="w-full" />
              ) : (
                <div className="flex items-center justify-between text-white">
                  <span>{publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-4)}</span>
                  <Check className="text-green-400" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* GRIN Balance */}
          <Card className={`bg-gray-800 border-gray-700 ${step === 2 ? 'border-purple-500' : ''}`}>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Shield className="h-5 w-5" /> GRIN Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {connected && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-white">
                    <span>Current Balance:</span>
                    <span className="text-green-400 font-bold">{grinBalance} GRIN</span>
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>Required Balance:</span>
                    <span>1 GRIN</span>
                  </div>
                  {grinBalance >= 1 ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <Check size={16} />
                      <span>Eligible for raid</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle size={16} />
                      <span>Insufficient balance</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Twitter Connection */}
          <Card className={`bg-gray-800 border-gray-700 ${step === 3 ? 'border-purple-500' : ''}`}>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Twitter className="h-5 w-5" /> Connect Twitter
              </CardTitle>
            </CardHeader>
            <CardContent>
              {connected && grinBalance >= 1 && !twitterConnected ? (
                <button
                  onClick={handleTwitterConnect}
                  className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                >
                  Connect Twitter Account
                </button>
              ) : twitterConnected ? (
                <div className="flex items-center justify-between text-white">
                  <span>{user?.twitter_handle}</span>
                  <Check className="text-green-400" />
                </div>
              ) : null}
            </CardContent>
          </Card>

          {/* Registration */}
          <Card className={`bg-gray-800 border-gray-700 ${step === 4 ? 'border-purple-500' : ''}`}>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <ArrowRight className="h-5 w-5" /> Complete Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {connected && grinBalance >= 1 && twitterConnected && !isRegistered ? (
                <button
                  onClick={register}
                  className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Register for Raid
                </button>
              ) : isRegistered ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400">
                    <Check size={16} />
                    <span>Successfully registered!</span>
                  </div>
                  <div className="text-white">
                    <h4 className="font-semibold mb-2">Next Steps:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-400">
                      <li>Tweet using $grin and #grin</li>
                      <li>Mention @cheshiregpt</li>
                      <li>Engage with community tweets</li>
                      <li>Track your rewards on the dashboard</li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RaidRegistration;
