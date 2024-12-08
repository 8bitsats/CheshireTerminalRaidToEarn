import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Twitter, Send } from 'lucide-react';
import { generateTweet } from '@/lib/openRouter';

interface TweetComposerProps {
  onTweetSubmit: (content: string) => Promise<void>;
}

const TweetComposer: React.FC<TweetComposerProps> = ({ onTweetSubmit }) => {
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTweet = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const generatedTweet = await generateTweet('Generate an engaging tweet about $GRIN token');
      setContent(generatedTweet);
    } catch (err) {
      setError('Failed to generate tweet. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      await onTweetSubmit(content);
      setContent('');
      setPreview(false);
    } catch (err) {
      setError('Failed to post tweet. Please try again.');
    }
  };

  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className="text-purple-400 flex items-center gap-2">
          <Twitter className="h-5 w-5" /> Tweet Composer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <textarea
            className="w-full h-32 bg-gray-900 text-white border border-gray-700 rounded-lg p-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            placeholder="Compose your tweet... Remember to include $grin #grin @cheshiregpt"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          {preview && (
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h4 className="text-white font-semibold mb-2">Preview:</h4>
              <p className="text-gray-400">{content}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setPreview(!preview)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isGenerating}
            >
              {preview ? 'Hide Preview' : 'Show Preview'}
            </button>
            <button
              onClick={handleGenerateTweet}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Tweet'}
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
              disabled={!content.trim() || isGenerating}
            >
              <Send className="h-4 w-4" /> Post Tweet
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TweetComposer;