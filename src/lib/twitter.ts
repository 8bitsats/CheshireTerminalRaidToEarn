import axios from 'axios';
import { supabase } from './supabase';

const TWITTER_API_BASE = 'https://api.twitter.com/2';

export const signInWithTwitter = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: 'https://cheshraidtoearn.netlify.app',
        scopes: 'tweet.read tweet.write users.read'
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing in with Twitter:', error);
    throw error;
  }
};

export const fetchGrinMentions = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
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
  } catch (error) {
    console.error('Error fetching GRIN mentions:', error);
    throw error;
  }
};

export const postTweet = async (content: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
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
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error;
  }
};

export const getTwitterProfile = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.provider_token) {
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
  } catch (error) {
    console.error('Error fetching Twitter profile:', error);
    throw error;
  }
};
