// Chatbot Main Logic
class ElepocketChatbot {
  constructor() {
    this.toggleBtn = document.getElementById('chatbotToggle');
    this.closeBtn = document.getElementById('chatbotClose');
    this.window = document.getElementById('chatbotWindow');
    this.messagesContainer = document.getElementById('chatbotMessages');
    this.input = document.getElementById('chatbotInput');
    this.sendBtn = document.getElementById('chatbotSend');
    
    // API Key được lưu trữ an toàn trên Netlify Environment Variables
    // Gọi Netlify Function để xử lý request
    this.OPENAI_ENDPOINT = '/.netlify/functions/chat';
    
    // System prompt cho AI
    this.SYSTEM_PROMPT = `Bạn là ELEPOCKET Bot - một trợ lý tài chính chuyên biệt cho sinh viên Việt Nam. 
Bạn giúp sinh viên quản lý chi tiêu, tiết kiệm tiền, và hiểu về tài chính cá nhân.
Hãy trả lời bằng tiếng Việt, ngắn gọn (dưới 150 từ), thân thiện và hữu ích.
Nếu người dùng hỏi ngoài lĩnh vực tài chính, hãy nhẹ nhàng chuyển hướng về chủ đề tài chính.`;
    
    this.initEventListeners();
  }
  
  initEventListeners() {
    // Toggle chatbot window
    this.toggleBtn.addEventListener('click', () => this.toggleWindow());
    this.closeBtn.addEventListener('click', () => this.closeWindow());
    
    // Send message
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }
  
  toggleWindow() {
    this.window.classList.toggle('show');
    this.toggleBtn.classList.toggle('active');
    
    if (this.window.classList.contains('show')) {
      this.input.focus();
    }
  }
  
  closeWindow() {
    this.window.classList.remove('show');
    this.toggleBtn.classList.remove('active');
  }
  
  addMessage(text, sender = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    
    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="chatbot-avatar"><img src="images/ava.png" alt="ELEPOCKET Bot"></div>
        <div class="chatbot-bubble">${this.formatMessage(text)}</div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="chatbot-bubble">${this.escapeHtml(text)}</div>
      `;
    }
    
    this.messagesContainer.appendChild(messageDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="chatbot-avatar"><img src="images/ava.png" alt="ELEPOCKET Bot"></div>
      <div class="chatbot-bubble chatbot-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    this.messagesContainer.appendChild(typingDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
  
  removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
  }
  
  async sendMessage() {
    const text = this.input.value.trim();
    
    if (!text) return;
    
    // Add user message
    this.addMessage(text, 'user');
    this.input.value = '';
    
    // Show typing indicator
    this.showTyping();
    
    try {
      // Step 1: Thử tìm FAQ
      const faqAnswer = searchFAQ(text);
      
      if (faqAnswer) {
        // Tìm thấy FAQ
        this.removeTyping();
        this.addMessage(faqAnswer, 'bot');
      } else {
        // Không tìm thấy FAQ - dùng AI
        await this.getAIResponse(text);
        this.removeTyping();
      }
    } catch (error) {
      this.removeTyping();
      this.addMessage(
        '❌ Xin lỗi, tôi gặp lỗi. Vui lòng thử lại sau hoặc liên hệ hỗ trợ. 📧',
        'bot'
      );
      console.error('Chatbot error:', error);
    }
  }
  
  async getAIResponse(userMessage) {
    try {
      // Gọi Netlify Function (API key được lưu trữ an toàn trên server)
      const response = await fetch(this.OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
      });

      // Kiểm tra response status
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      // Kiểm tra response có message không
      if (!data.message) {
        throw new Error('Invalid response from server');
      }

      this.removeTyping();
      this.addMessage(data.message, 'bot');
      
    } catch (error) {
      this.removeTyping();
      console.error('AI Response error:', error);
      
      this.addMessage(
        '💡 Xin lỗi, tôi không thể trả lời câu hỏi này. Hãy thử hỏi về quản lý chi tiêu, quiz, hoặc các tính năng của ELEPOCKET.',
        'bot'
      );
    }
  }
  
  formatMessage(text) {
    // Format markdown-like syntax
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }
  
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  }
}

// Initialize chatbot khi DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  new ElepocketChatbot();
});
