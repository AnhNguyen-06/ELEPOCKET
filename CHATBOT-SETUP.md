# 🤖 Hướng Dẫn Xây Dựng Chatbot Mix cho ELEPOCKET

## 📋 Tổng Quan
Bạn vừa tạo một chatbot **Mix FAQ + AI** cho ELEPOCKET với các tính năng:
- ✅ FAQ Database (12 câu hỏi thường gặp)
- ✅ Giao diện đẹp (floating button)
- ✅ AI Fallback (khi không tìm thấy FAQ)
- ✅ Đa ngôn ngữ hỗ trợ (Tiếng Việt)

---

## 🗂️ Các File Đã Tạo

```
chatbot-faq.js          ← FAQ Database (12 câu hỏi)
chatbot-style.css       ← Giao diện CSS
chatbot-main.js         ← Logic chính (FAQ + AI)
chatbot-widget.html     ← HTML widget (không cần dùng, đã merge vào index.html)
```

---

## ⚙️ Cấu Hình OpenAI API (Để sử dụng AI)

### Bước 1: Lấy API Key
1. Truy cập: https://platform.openai.com/api-keys
2. Đăng nhập với tài khoản OpenAI
3. Tạo API Key mới
4. Copy API Key

### Bước 2: Thêm API Key vào Chatbot
Mở file `chatbot-main.js` và tìm dòng:
```javascript
this.OPENAI_API_KEY = 'sk-your-api-key-here';
```

Thay thế bằng:
```javascript
this.OPENAI_API_KEY = 'sk-YOUR-ACTUAL-API-KEY-HERE';
```

⚠️ **Lưu ý:** Không commit API Key lên GitHub (Bảo mật)

---

## 🧪 Kiểm Tra Chatbot

### Phương pháp 1: Dùng Live Server
1. Mở VS Code
2. Nhấp chuột phải vào `index.html`
3. Chọn "Open with Live Server"
4. Nhìn góc phải dưới trang web, click vào nút 💬

### Phương pháp 2: Dùng Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🎯 Cách Hoạt Động

```
User hỏi: "Làm sao để tiết kiệm tiền?"
    ↓
Kiểm tra FAQ database
    ↓
TÌM THẤY → Trả lời FAQ ngay lập tức ⚡
KHÔNG TÌM → Gửi lên OpenAI API → Trả lời AI 🤖
```

---

## 📝 Thêm Câu Hỏi FAQ Mới

Mở file `chatbot-faq.js` và thêm vào mảng `faqDatabase`:

```javascript
{
  id: 13,
  keywords: ["từ khóa 1", "từ khóa 2", "từ khóa 3"],
  answer: "Câu trả lời chi tiết của bạn"
},
```

**Ví dụ:**
```javascript
{
  id: 13,
  keywords: ["chứng chỉ", "certificate", "học thêm"],
  answer: "📚 Các khóa học bổ ích:\n\n✅ Udemy - Quản lý tài chính\n✅ Coursera - Personal Finance\n✅ Khan Academy - Money Skills"
},
```

---

## 🌍 Hỗ Trợ Nhiều Ngôn Ngữ

Hiện tại chatbot hỗ trợ **Tiếng Việt** mặc định. Để thêm Tiếng Anh:

### Bước 1: Tạo FAQ tiếng Anh
Tạo file mới: `chatbot-faq-en.js` với nội dung tương tự

### Bước 2: Thêm vào chatbot-main.js
```javascript
// Thêm sau line: this.SYSTEM_PROMPT = ...
this.currentLanguage = 'vi'; // 'vi' hoặc 'en'
```

Sau đó linh hoạt chuyển đổi FAQ theo ngôn ngữ.

---

## 🚀 Tối Ưu Hóa

### 1. Tốc độ
- FAQ được load từ local → Nhanh ⚡
- AI chỉ gọi khi cần → Tiết kiệm

### 2. Chi Phí
- Mỗi AI request = $0.0002 ~ $0.002 (rẻ)
- 1000 requests ~ $0.20 - $2.00/tháng
- Ước tính: 600 visits/tháng → ~100-200 AI requests → ~$0.20-$0.40/tháng

### 3. Trải Nghiệm
- FAQ response: < 100ms
- AI response: 1-3s
- Typing animation giúp user chờ đợi

---

## 🐛 Xử Lý Lỗi Thường Gặp

### Chatbot không hiển thị
**Giải pháp:**
- Kiểm tra console (F12 → Console)
- Đảm bảo tất cả file script được load

### AI không hoạt động
**Giải pháp:**
- Kiểm tra API Key có đúng không
- Kiểm tra tài khoản OpenAI có đủ credit không
- Mở console xem error message

### Chatbot chậm
**Giải pháp:**
- Tăng FAQ database (giảm AI calls)
- Kiểm tra kết nối internet
- Kiểm tra server OpenAI status

---

## 📊 Theo Dõi Hiệu Suất

Thêm tracking vào `chatbot-main.js`:

```javascript
// Sau khi addMessage
console.log('Chat:', {
  message: text,
  type: faqAnswer ? 'FAQ' : 'AI',
  timestamp: new Date()
});
```

Sau đó import vào Google Analytics để theo dõi.

---

## 🎓 Bước Tiếp Theo

1. **Phát triển**: Thêm 20+ FAQ nữa
2. **Tích hợp**: Kết nối database để lưu lịch chat
3. **Cá nhân hóa**: Dùng kết quả quiz để trả lời khác nhau
4. **Analytics**: Theo dõi câu hỏi phổ biến
5. **Mobile**: Tối ưu giao diện mobile

---

## 💬 Liên Hệ Hỗ Trợ

- 📧 Email: elepocketvn@gmail.com
- 💬 Issues: GitHub Issues
- 🤝 Github: [ELEPOCKET Repo]

---

**Happy Coding! 🚀**
