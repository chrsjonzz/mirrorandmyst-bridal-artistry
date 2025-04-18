import axios from 'axios';

export default async function handler(req, res) {
  console.log('AI Chat API hit:', req.method, req.body);
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    console.log('Sending request to Groq API...');
    const groqRes = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192', // Updated to supported model
        messages: [
          {
            role: 'system',
            content:
              'You are a friendly, knowledgeable bridal consultant for MirrorAndMyst. Answer all questions about bridal makeup, beauty, and wedding preparation with warmth and expertise.',
          },
          { role: 'user', content: message },
        ],
        max_tokens: 256,
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Groq API response:', groqRes.data);
    const aiReply = groqRes.data.choices[0].message.content;
    res.status(200).json({ reply: aiReply });
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get AI response', detail: error.message });
  }
}
