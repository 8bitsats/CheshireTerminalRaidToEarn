import axios from 'axios';

const OPENROUTER_API_KEY = "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";

export const generateTweet = async (prompt: string) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'anthropic/claude-2',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates engaging tweets about $GRIN token and @cheshiregpt.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating tweet:', error);
    throw error;
  }
};