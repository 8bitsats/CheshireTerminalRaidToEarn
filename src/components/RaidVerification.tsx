import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Twitter, Check } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const RaidVerification = () => {
  const { connected, publicKey } = useWallet();
  const [verificationStatus, setVerificationStatus] = useState({
    wallet: false,
    twitter: false,
    holdings: false,
    human: false
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      setVerificationStatus(prev => ({ ...prev, wallet: true }));
    }
  }, [connected]);

  const verifyTwitter = async () => {
    try {
      setError(null);
      // Twitter verification logic here
      setVerificationStatus(prev => ({ ...prev, twitter: true }));
    } catch (err) {
      setError('Failed to verify Twitter account');
    }
  };

  const verifyHoldings = async () => {
    try {
      setError(null);
      // Holdings verification logic here
      setVerificationStatus(prev => ({ ...prev, holdings: true }));
    } catch (err) {
      setError('Failed to verify holdings');
    }
  };

  const completeHumanVerification = async () => {
    try {
      setError(null);
      // Human verification logic here
      setVerificationStatus(prev => ({ ...prev, human: true }));
    } catch (err) {
      setError('Failed to complete human verification');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">GRIN Raid Verification</h1>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Verification Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {/* Wallet Connection */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Connect Wallet</h3>
                    <p className="text-sm text-gray-400">Connect your Solana wallet</p>
                  </div>
                </div>
                {!connected ? (
                  <WalletMultiButton />
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>

              {/* Twitter Verification */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Twitter className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Verify Twitter</h3>
                    <p className="text-sm text-gray-400">Connect your Twitter account</p>
                  </div>
                </div>
                {!verificationStatus.twitter ? (
                  <button
                    onClick={verifyTwitter}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    disabled={!connected}
                  >
                    Verify
                  </button>
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>

              {/* Holdings Verification */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Verify Holdings</h3>
                    <p className="text-sm text-gray-400">Check GRIN token balance</p>
                  </div>
                </div>
                {!verificationStatus.holdings ? (
                  <button
                    onClick={verifyHoldings}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    disabled={!connected}
                  >
                    Verify
                  </button>
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>

              {/* Human Verification */}
              <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Human Verification</h3>
                    <p className="text-sm text-gray-400">Complete captcha verification</p>
                  </div>
                </div>
                {!verificationStatus.human ? (
                  <button
                    onClick={completeHumanVerification}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    disabled={!connected || !verificationStatus.twitter || !verificationStatus.holdings}
                  >
                    Verify
                  </button>
                ) : (
                  <Check className="h-5 w-5 text-green-400" />
                )}
              </div>
            </div>

            {Object.values(verificationStatus).every(status => status) && (
              <div className="mt-6 p-4 bg-green-900/20 border border-green-500 rounded-lg">
                <h3 className="text-green-400 font-semibold">Verification Complete!</h3>
                <p className="text-gray-400">You can now participate in the GRIN raid.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RaidVerification;