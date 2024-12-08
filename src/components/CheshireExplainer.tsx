import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Shield, Twitter, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheshireExplainer = () => {
  const [showGrin, setShowGrin] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowGrin(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-6 space-y-8">
      {/* Animated Cheshire Cat SVG Header */}
      <div className="relative h-48 flex justify-center items-center mb-12">
        <svg className="absolute w-48 h-48" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="neonPurple" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 1 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Cheshire Cat Grin */}
          <path 
            d="M40,100 Q100,150 160,100 Q100,120 40,100"
            fill="none"
            stroke="url(#neonPurple)"
            strokeWidth="4"
            filter="url(#glow)"
            className={`transform transition-opacity duration-1000 ${showGrin ? 'opacity-100' : 'opacity-30'}`}
          />
          {/* Cat Eyes */}
          <circle cx="70" cy="70" r="10" fill="#10b981" filter="url(#glow)" className="animate-pulse"/>
          <circle cx="130" cy="70" r="10" fill="#10b981" filter="url(#glow)" className="animate-pulse"/>
        </svg>
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 animate-pulse">
          GRIN Raid Rewards
        </h1>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl font-bold mb-4 text-purple-400">
          Total Reward Pool: <span className="text-green-400">5 SOL</span>
        </p>
        <Link 
          to="/register" 
          className="inline-block px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Join Raid
        </Link>
      </div>

      {/* Key Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Shield,
            title: "Eligibility",
            value: "1 GRIN min",
            color: "purple"
          },
          {
            icon: Twitter,
            title: "Max Tweets",
            value: "5 per user",
            color: "green"
          },
          {
            icon: Award,
            title: "Rewards",
            value: "0.001-0.05 SOL",
            color: "purple"
          },
          {
            icon: Clock,
            title: "Duration",
            value: "24 hours",
            color: "green"
          }
        ].map((item, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <item.icon className={`h-12 w-12 ${item.color === 'purple' ? 'text-purple-400' : 'text-green-400'}`} />
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className={`text-lg ${item.color === 'purple' ? 'text-purple-400' : 'text-green-400'}`}>
                  {item.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Point System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-purple-400">Base Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "$grin cashtag", value: "1 point" },
              { label: "#grin hashtag", value: "1 point" },
              { label: "@cheshiregpt", value: "1 point" }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-white">{item.label}</span>
                <span className="text-green-400 font-bold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-purple-400">Engagement Rewards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Each Like", value: "0.1 points" },
              { label: "Each Retweet", value: "0.2 points" },
              { label: "Each Comment", value: "0.15 points" }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                <span className="text-white">{item.label}</span>
                <span className="text-green-400 font-bold">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Follower Multipliers */}
      <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-purple-400">Follower Multipliers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tier: "Base", multiplier: "1x", requirement: "Under 100" },
              { tier: "Mid", multiplier: "1.5x", requirement: "100+" },
              { tier: "Top", multiplier: "2x", requirement: "1000+" }
            ].map((tier, index) => (
              <div key={index} className="text-center p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-green-400 transition-all duration-300">
                <h4 className="font-bold text-white mb-2">{tier.tier} Tier</h4>
                <p className="text-2xl text-purple-400">{tier.multiplier}</p>
                <p className="text-green-400">{tier.requirement} followers</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Important Notes */}
      <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-purple-400">Important Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              "30 minute minimum between tweets",
              "Account age must be > 7 days",
              "No duplicate content allowed",
              "Rewards sent within 48h of raid end"
            ].map((note, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span className="text-white">{note}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheshireExplainer;