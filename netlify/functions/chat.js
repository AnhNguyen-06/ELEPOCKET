// netlify/functions/chat.js
exports.handler = async (event) => {
  // Xử lý CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  }

  // Chỉ chấp nhận POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Kiểm tra API Key
  if (!process.env.OPENAI_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  try {
    // Parse request body
    const { message } = JSON.parse(event.body);

    // Validate message
    if (!message || typeof message !== 'string' || !message.trim()) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Message is required and must be non-empty' })
      };
    }

    // Gọi OpenAI API
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `Bạn là ELEPOCKET Bot - một trợ lý tài chính chuyên biệt cho sinh viên Việt Nam. 
Bạn giúp sinh viên quản lý chi tiêu, tiết kiệm tiền, và hiểu về tài chính cá nhân.
Hãy trả lời bằng tiếng Việt, ngắn gọn (dưới 150 từ), thân thiện và hữu ích.
Nếu người dùng hỏi ngoài lĩnh vực tài chính, hãy nhẹ nhàng chuyển hướng về chủ đề tài chính.`
            },
            { role: 'user', content: message.trim() }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      }
    );

    // Kiểm tra response từ OpenAI
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ 
          error: errorData.error?.message || 'OpenAI API error' 
        })
      };
    }

    const data = await response.json();

    // Kiểm tra response structure
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Invalid response from OpenAI' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: data.choices[0].message.content
      })
    };

  } catch (error) {
    console.error('Function error:', error);

    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        error: error.message || 'Internal server error' 
      })
    };
  }
};