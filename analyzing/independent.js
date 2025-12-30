document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const form = document.querySelector("form");

  // Khi bấm nút Submit
  submitBtn.addEventListener("click", (e) => {
    // Thu nhập (câu 1)
    e.preventDefault();

    const income = Number(document.querySelector("#q1 + p + .slider-container input").value);
    // Các chi tiêu NEEDS (câu 2–4)
    const needs =
      Number(document.querySelector("#q2 + p + .slider-container input").value) +
      Number(document.querySelector("#q3 + p + .slider-container input").value) +
      Number(document.querySelector("#q4 + p + .slider-container input").value);

    // Các chi tiêu WANTS (câu 5–7)
    const wants =
      Number(document.querySelector("#q5 + p + .slider-container input").value) +
      Number(document.querySelector("#q6 + p + .slider-container input").value) +
      Number(document.querySelector("#q7 + p + .slider-container input").value);

    if (income <= 0) {
      alert("Vui lòng nhập thu nhập hợp lệ (lớn hơn 0).");
      return;
    }

    // 2. Logic tính toán tự cân bằng
    let savings = 0;
    const sumOfNandW = needs + wants;
    if (income > sumOfNandW) {
      savings = income - sumOfNandW;
    } else {
      savings = 0;
    }

    // 3. Tính tỷ lệ phần trăm
    const percentNeeds = (needs / income) * 100;
    const percentWants = (wants / income) * 100;
    const percentSavings = (savings / income) * 100;

    let resultType = "";
    let resultDesc = "";

    // 4. PHÂN LOẠI MỚI (LOGIC HÌNH PHỄU - WATERFALL)
    // Đảm bảo bao quát hết các trường hợp
    
    // Nhóm 1: Áp lực tài chính (Needs quá cao)
    if (percentNeeds >= 75) {
      resultType = "Áp lực tài chính";
      resultDesc = "Bạn đang ở trạng thái 'Sinh tồn'. Phần lớn thu nhập (trên 75%) đang phải chi trả cho các nhu cầu thiết yếu, khiến việc tiết kiệm hay hưởng thụ trở nên khó khăn. Hãy tìm cách tối ưu chi phí sinh hoạt hoặc gia tăng thu nhập.";
    } 
    // Nhóm 2: Tiết kiệm (Savings cao - Bao gồm case 33/33/33)
    else if (percentSavings >= 30) {
      resultType = "Tiết kiệm";
      resultDesc = "Tuyệt vời! Bạn thuộc nhóm tiết kiệm xuất sắc. Với tỷ lệ tiết kiệm trên 30%, bạn đang xây dựng nền tảng tài chính vững chắc. Dù bạn đang sống tối giản hay có thu nhập cao, hãy tiếp tục duy trì phong độ này để sớm đạt tự do tài chính.";
    } 
    // Nhóm 3: Phung phí (Wants quá cao hoặc Savings quá thấp)
    else if (percentWants >= 50 || percentSavings < 5) {
      resultType = "Phung phí";
      resultDesc = "Cảnh báo: Bạn đang dành quá nhiều tiền cho sở thích cá nhân hoặc để dành quá ít (dưới 5%). Điều này rất rủi ro nếu gặp biến cố bất ngờ. Hãy cân nhắc cắt giảm các khoản chi vui chơi giải trí.";
    } 
    // Nhóm 4: Hơi vượt mức (Tiết kiệm chưa đạt chuẩn an toàn)
    else if (percentSavings < 15) {
      resultType = "Hơi phung phí";
      resultDesc = "Bạn chi tiêu hơi thoáng tay. Mức tiết kiệm hiện tại (dưới 15%) là chấp nhận được nhưng chưa tối ưu. Hãy cố gắng thắt chặt chi tiêu một chút để nâng mức tiết kiệm lên khoảng 20%.";
    } 
    // Nhóm 5: Hợp lý (Còn lại - Bao gồm case 50/30/20)
    else {
      resultType = "Hợp lý";
      resultDesc = "Xin chúc mừng! Bạn có cơ cấu tài chính cân bằng. Bạn tuân thủ tốt quy tắc 50/30/20, vừa đảm bảo nhu cầu cuộc sống, vừa có khoản hưởng thụ hợp lý mà vẫn tích lũy được cho tương lai.";
    }

    // 4. CHUẨN BỊ DỮ LIỆU GỬI ĐI
    const formData = new FormData(form);
    // Thêm các kết quả tính toán vào form để Netlify lưu lại luôn
    formData.append("result-type", resultType);
    formData.append("final-savings", savings);

    // 5. GỬI DỮ LIỆU NGẦM VỀ NETLIFY (AJAX)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        // 6. LƯU VÀO BỘ NHỚ TẠM ĐỂ VẼ BIỂU ĐỒ Ở TRANG SAU
        const resultData = {
          needs,
          wants,
          savings,
          resultType,
          resultDesc
        };
        sessionStorage.setItem("resultData", JSON.stringify(resultData));

        // 7. CHUYỂN HƯỚNG SANG TRANG KẾT QUẢ
        const actionPath = form.getAttribute("action") || "results/result-independent.html";
        window.location.href = actionPath;
      })
      .catch((error) => {
        console.error("Lỗi gửi dữ liệu:", error);
        alert("Có lỗi xảy ra khi gửi dữ liệu, nhưng bạn vẫn sẽ xem được kết quả.");
        // Vẫn cho chuyển trang nếu lỗi gửi để người dùng xem được biểu đồ
        window.location.href = "results/result-independent.html";
      });
  });
});
