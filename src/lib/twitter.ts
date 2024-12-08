import axios from 'axios';

const TWITTER_API_BASE = 'https://api.twitter.com/2';
const TWITTER_BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAPQyxAEAAAAAGvF7FOmIBXKgCOOXh9guMAHdQOc%3D488j1KwV4qFQgRkDNhmCBmY9OXbfbGLjByU37gqttsUT5di1WX";

export const fetchGrinMentions = async () => {
  try {
    const response = await axios.get(
      `${TWITTER_API_BASE}/tweets/search/recent?query=$grin OR #grin OR @cheshiregpt`,
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GRIN mentions:', error);
    throw error;
  }
};

export const postTweet = async (content: string, token: string) => {
  try {
    const response = await axios.post(
      `${TWITTER_API_BASE}/tweets`,
      { text: content },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error;
  }
};