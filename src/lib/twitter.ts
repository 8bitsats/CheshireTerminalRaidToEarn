import axios from 'axios';
import { supabase } from './supabase';

const TWITTER_API_BASE = 'https://api.twitter.com/2';

interface TwitterError {
  message: string;
  code?: string;
  details?: unknown;
}

export const signInWithTwitter = async () => {
  try {
    console.log('Starting Twitter OAuth flow...');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: 'https://cheshraidtoearn.netlify.app',
        scopes: 'tweet.read tweet.write users.read offline.access',
      }
    });

    if (error) {
      console.error('Supabase OAuth error:', error);
      throw error;
    }

    console.log('OAuth response:', data);
    return data;
  } catch (err) {
    const error = err as TwitterError;
    console.error('Detailed Twitter sign-in error:', {
      error,
      message: error.message || 'Unknown error occurred',
      code: error.code,
      details: error.details
    });
    throw new Error(error.message || 'Failed to connect Twitter account');
  }
};

export const fetchGrinMentions = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
      console.error('No provider token found in session:', session);
      throw new Error('No Twitter access token found. Please connect your Twitter account.');
    }

    const response = await axios.get(
      `${TWITTER_API_BASE}/tweets/search/recent?query=$grin OR #grin OR @cheshiregpt`,
      {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    const error = err as TwitterError;
    console.error('Error fetching GRIN mentions:', error);
    throw new Error(error.message || 'Failed to fetch GRIN mentions');
  }
};

export const postTweet = async (content: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
      console.error('No provider token found in session:', session);
      throw new Error('No Twitter access token found. Please connect your Twitter account.');
    }

    const response = await axios.post(
      `${TWITTER_API_BASE}/tweets`,
      { text: content },
      {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    const error = err as TwitterError;
    console.error('Error posting tweet:', error);
    throw new Error(error.message || 'Failed to post tweet');
  }
};

export const getTwitterProfile = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
      console.error('No provider token found in session:', session);
      throw new Error('No Twitter access token found. Please connect your Twitter account.');
    }

    const response = await axios.get(
      `${TWITTER_API_BASE}/users/me`,
      {
        headers: {
          'Authorization': `Bearer ${session.provider_token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    const error = err as TwitterError;
    console.error('Error fetching Twitter profile:', error);
    throw new Error(error.message || 'Failed to fetch Twitter profile');
  }
};
