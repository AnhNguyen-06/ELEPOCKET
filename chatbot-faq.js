// FAQ Database cho ELEPOCKET Chatbot
const faqDatabase = [
  {
    id: 1,
    keywords: ["quiz", "test", "kiểm tra", "làm quiz", "quick test"],
    answer: "🎯 ELEPOCKET có 3 loại quiz để phân loại tài chính của bạn:\n\n1. **Dependent** - Nếu bạn nhận trợ cấp từ gia đình\n2. **Half-Independent** - Nếu bạn vừa nhận trợ cấp vừa kiếm thêm\n3. **Independent** - Nếu bạn tự kiếm thu nhập\n\nHãy vào **Quick Test** để bắt đầu! 👉 https://elepocket.netlify.app/quicktest.html"
  },
  {
    id: 2,
    keywords: ["chi tiêu", "spending", "chi phí", "quản lý"],
    answer: "💰 Để quản lý chi tiêu hiệu quả, hãy tuân theo quy tắc **60/30/10**:\n\n- **60%** cho nhu cầu thiết yếu (ăn, nhà, đi lại)\n- **30%** cho những thứ muốn có (giải trí, mua sắm)\n- **10%** để tiết kiệm cho tương lai\n\nQuiz của chúng tôi sẽ giúp bạn tối ưu tỷ lệ này!"
  },
  {
    id: 3,
    keywords: ["tiết kiệm", "tiết kiếm", "save", "savings", "lưu tiền"],
    answer: "🏦 Mẹo tiết kiệm cho sinh viên:\n\n✅ Mở tài khoản tiết kiệm riêng\n✅ Tự động chuyển 10% thu nhập\n✅ Ghi chép chi tiêu hàng ngày\n✅ Đặt mục tiêu tiết kiệm (du lịch, máy tính, v.v.)\n✅ Tránh chi tiêu va liều (impulse spending)\n\nHãy bắt đầu nhỏ - mỗi ngàn đếng cũng có giá trị!"
  },
  {
    id: 4,
    keywords: ["kiếm tiền", "earn", "thu nhập", "làm việc", "part-time"],
    answer: "💼 Cách kiếm tiền cho sinh viên:\n\n📱 Online:\n- Freelance (Fiverr, Upwork, Freelancer)\n- Làm tutor online\n- Bán hàng online (Shopee, Tiktok Shop)\n- Viết bài, review sản phẩm\n\n🏢 Offline:\n- Part-time tại quán café, cửa hàng\n- Gia sư dạy kèm\n- Làm thêm tại công ty\n\nChọn công việc phù hợp với thời gian học của bạn!"
  },
  {
    id: 5,
    keywords: ["signup", "đăng ký", "tài khoản", "account"],
    answer: "📝 Hiện tại ELEPOCKET chưa có hệ thống đăng ký tài khoản.\n\nNhưng bạn có thể:\n✅ Làm quiz không cần đăng ký\n✅ Xem kết quả ngay lập tức\n✅ Đọc các bài blog về quản lý tài chính\n\nHãy bắt đầu với **Quick Test** ngay bây giờ! 🚀"
  },
  {
    id: 6,
    keywords: ["phân loại", "loại", "category", "persona", "type"],
    answer: "🎭 ELEPOCKET phân loại bạn vào 3 loại tài chính:\n\n1. **Frugal** (Tiết kiệm) - Chi ít, tiết kiệm nhiều\n2. **Balanced** (Cân bằng) - Chi hợp lý, tiết kiệm vừa phải\n3. **Overspending** (Chi vượt) - Chi nhiều, tiết kiệm ít\n\nMỗi loại sẽ nhận lời khuyên riêng! 💡"
  },
  {
    id: 7,
    keywords: ["blog", "bài viết", "article", "tin tức"],
    answer: "📖 Khám phá blog ELEPOCKET để:\n\n✨ Học mẹo quản lý tài chính\n✨ Hiểu kỹ năng kiếm tiền\n✨ Biết cách tiết kiệm smart\n✨ Các bài phân tích chi tiêu\n\nHãy vào **Blog** để đọc các bài viết hay! 📚"
  },
  {
    id: 8,
    keywords: ["về chúng tôi", "about", "team", "creator", "tác giả"],
    answer: "👤 ELEPOCKET được điều hành và phát triển bởi **Nguyen Van Quang Anh** - Technical Co-founder & **Tran Nguyen Bao Tran** - Product Research Co-founder \n\nMục tiêu: Giúp sinh viên Việt Nam quản lý tài chính tốt hơn! 💪\n\nHãy xem thêm tại **About us** 👉 https://elepocket.netlify.app/aboutus.html"
  },
  {
    id: 9,
    keywords: ["dependent", "phụ thuộc", "trợ cấp", "gia đình"],
    answer: "👨‍👩‍👧 **Dependent** (Phụ thuộc):\n\nBạn nhận trợ cấp từ gia đình mỗi tháng.\n\n💡 Mẹo:\n✅ Lập kế hoạch chi tiêu hàng tháng\n✅ Tiết kiệm phần thừa\n✅ Học cách kiếm thêm thu nhập\n✅ Chuẩn bị độc lập tài chính\n\nQuiz sẽ giúp bạn tối ưu hóa chi tiêu phụ thuộc!"
  },
  {
    id: 10,
    keywords: ["independent", "độc lập", "tự kiếm", "kinh doanh"],
    answer: "🦅 **Independent** (Độc lập):\n\nBạn tự kiếm thu nhập từ công việc, kinh doanh, hoặc đầu tư.\n\n💡 Mẹo:\n✅ Quản lý thu nhập không ổn định\n✅ Tạo quỹ dự phòng (3-6 tháng)\n✅ Đa dạng hóa gười thu nhập\n✅ Kế hoạch tài chính dài hạn\n\nHãy làm quiz để nhận lời khuyên riêng!"
  },
  {
    id: 11,
    keywords: ["half independent", "bán độc lập", "vừa vừa"],
    answer: "⚖️ **Half-Independent** (Bán độc lập):\n\nBạn vừa nhận trợ cấp vừa tự kiếm thêm thu nhập.\n\n💡 Mẹo:\n✅ Cân bằng học tập vs làm việc\n✅ Quản lý 2 nguồn thu nhập\n✅ Trao cơ hội phát triển kỹ năng\n✅ Giảm áp lực từ gia đình\n\nQuiz sẽ gợi ý cách tối ưu!"
  },
  {
    id: 12,
    keywords: ["lỗi", "bug", "không hoạt động", "issue", "problem"],
    answer: "🐛 Nếu bạn gặp lỗi:\n\n📧 Vui lòng liên hệ: **elepocketvn@gmail.com**\n\nHãy mô tả:\n✅ Bạn đang làm gì khi gặp lỗi\n✅ Thông báo lỗi (nếu có)\n✅ Browser bạn dùng\n\nChúng tôi sẽ giúp bạn sesap chóng! 🚀"
  },
  {
    id: 13,
    keywords: ["elepocket", "website", "web"],
    answer: "ELEPOCKET là một dự án website được thành lập bởi nhóm học sinh, sinh viên Việt Nam nhằm hỗ trợ các bạn học sinh trong việc quản lý chi tiêu và hiểu hơn về thói quen tài chính của bản thân. Qua bài kiểm tra nhanh, học sinh có thể khám phá mức độ chi tiêu của mình và nhận được lời khuyên hữu ích, giúp họ cải thiện và tối ưu hóa thói quen tiêu dùng. Ngoài ra, chúng tôi còn phát triển những sản phẩm độc đáo nhằm nâng cao tinh thần tiết kiệm và thói quen chi tiêu lành mạnh, hiệu quả hơn ở người trẻ ngày nay.",
  },
  {
    id: 14,
    keywords: ["liên lạc","contact", "liên hệ"],
    answer: "Bạn có thể liên hệ với chúng tôi qua mail: **elepocketvn@gmail.com**; hoặc qua số điện thoại của chúng tôi: **090 450 1805** (B.Tran) | **070 568 2288** (Q.Anh) nhé!"
  }
];

// Hàm tìm kiếm FAQ
function searchFAQ(userInput) {
  const lowerInput = userInput.toLowerCase().trim();
  
  // Tìm FAQ có keyword matching
  for (let item of faqDatabase) {
    for (let keyword of item.keywords) {
      if (lowerInput.includes(keyword.toLowerCase())) {
        return item.answer;
      }
    }
  }
  
  // Không tìm thấy - return null để fallback sang AI
  return null;
}
