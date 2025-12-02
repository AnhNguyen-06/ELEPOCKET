document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const sliders = document.querySelectorAll(".range-input");

  // Khi bấm nút Submit
  submitBtn.addEventListener("click", () => {
    // Thu nhập (câu 1)
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

    // Tiết kiệm + đầu tư (câu 8–9)
    let savings =
      Number(document.querySelector("#q8 + p + .slider-container input").value) +
      Number(document.querySelector("#q9 + p + .slider-container input").value);

    if (income <= 0) {
      alert("Vui lòng nhập thu nhập hợp lệ (lớn hơn 0).");
      return;
    }


    let resultType = "";
    let resultDesc = "";

    // 2. LOGIC TỰ ĐỘNG BALANCE (QUAN TRỌNG)
    // Tính savings dựa trên phần còn lại của thu nhập
    const sumOfNandW = needs + wants;
    const remainingInfo = income - sumOfNandW;

    // Trường hợp 1: Chi tiêu (Needs + Wants) đã lố thu nhập -> Savings ÂM
    if (remainingInfo < 0) {
      resultType = "Overspending"; // Hoặc "Phung phí (Vượt thu nhập)"
      resultDesc = "Your type of spending is overspending! The result shows that your spending rates are much more significant than the saving ones, and they may surpass your amount of income. This is a warning sign for you to restructure your spending habits and focus on what is necessary for you to spend on.";
      
      // Hiển thị cảnh báo ngay lập tức và dừng lại
      alert(
        `💰 Kết quả phân tích của bạn:\n\n` +
        `Thu nhập: ${income.toLocaleString("vi-VN")} VND\n\n` +
        `Nhu cầu thiết yếu: ${needs.toLocaleString("vi-VN")} VND\n` +
        `Nhu cầu mong muốn: ${wants.toLocaleString("vi-VN")} VND\n` +
        `→ Tổng chi tiêu (${sumOfNandW.toLocaleString("vi-VN")} VND) vượt quá thu nhập!\n\n` +
        `📊 Phân loại: ${resultType}\n\n${resultDesc}`
      );
      return;
    } 
    
    // Trường hợp 2: Còn dư tiền (hoặc vừa đủ) -> Gán phần dư vào Savings
    savings = remainingInfo;

    // 3. Tính tỷ lệ phần trăm (Dựa trên savings đã balance)
    const percentNeeds = (needs / income) * 100;
    const percentWants = (wants / income) * 100;
    const percentSavings = (savings / income) * 100;

    // 4. PHÂN LOẠI MỚI (LOGIC HÌNH PHỄU - WATERFALL)
    // Đảm bảo bao quát hết các trường hợp
    
    // Nhóm 1: Áp lực tài chính (Needs quá cao)
    if (percentNeeds >= 75) {
      resultType = "Áp lực tài chính (Financially Stressed)";
      resultDesc = "Bạn đang ở trạng thái 'Sinh tồn'. Phần lớn thu nhập (trên 75%) đang phải chi trả cho các nhu cầu thiết yếu, khiến việc tiết kiệm hay hưởng thụ trở nên khó khăn. Hãy tìm cách tối ưu chi phí sinh hoạt hoặc gia tăng thu nhập.";
    } 
    // Nhóm 2: Tiết kiệm (Savings cao - Bao gồm case 33/33/33)
    else if (percentSavings >= 30) {
      resultType = "Tiết kiệm (Frugal / Saver)";
      resultDesc = "Tuyệt vời! Bạn thuộc nhóm tiết kiệm xuất sắc. Với tỷ lệ tiết kiệm trên 30%, bạn đang xây dựng nền tảng tài chính vững chắc. Dù bạn đang sống tối giản hay có thu nhập cao, hãy tiếp tục duy trì phong độ này để sớm đạt tự do tài chính.";
    } 
    // Nhóm 3: Phung phí (Wants quá cao hoặc Savings quá thấp)
    else if (percentWants >= 50 || percentSavings < 5) {
      resultType = "Phung phí (Overspending)";
      resultDesc = "Cảnh báo: Bạn đang dành quá nhiều tiền cho sở thích cá nhân hoặc để dành quá ít (dưới 5%). Điều này rất rủi ro nếu gặp biến cố bất ngờ. Hãy cân nhắc cắt giảm các khoản chi vui chơi giải trí.";
    } 
    // Nhóm 4: Hơi vượt mức (Tiết kiệm chưa đạt chuẩn an toàn)
    else if (percentSavings < 15) {
      resultType = "Hơi vượt mức (Moderately Overspending)";
      resultDesc = "Bạn chi tiêu hơi thoáng tay. Mức tiết kiệm hiện tại (dưới 15%) là chấp nhận được nhưng chưa tối ưu. Hãy cố gắng thắt chặt chi tiêu một chút để nâng mức tiết kiệm lên khoảng 20%.";
    } 
    // Nhóm 5: Hợp lý (Còn lại - Bao gồm case 50/30/20)
    else {
      resultType = "Hợp lý (Balanced)";
      resultDesc = "Xin chúc mừng! Bạn có cơ cấu tài chính cân bằng. Bạn tuân thủ tốt quy tắc 50/30/20, vừa đảm bảo nhu cầu cuộc sống, vừa có khoản hưởng thụ hợp lý mà vẫn tích lũy được cho tương lai.";
    }

    // 5. Hiển thị kết quả cuối cùng
    alert(
    `💰 Kết quả phân tích của bạn:\n\n` +
    `Thu nhập: ${income.toLocaleString("vi-VN")} VND\n\n` +
    `Nhu cầu thiết yếu: ${percentNeeds.toFixed(1)}%  →  ${needs.toLocaleString("vi-VN")} VND\n` +
    `Nhu cầu mong muốn: ${percentWants.toFixed(1)}%  →  ${wants.toLocaleString("vi-VN")} VND\n` +
    `Tiết kiệm & đầu tư: ${percentSavings.toFixed(1)}%  →  ${savings.toLocaleString("vi-VN")} VND\n\n` +
    `📊 Phân loại: ${resultType}\n\n${resultDesc}`
    );

    sessionStorage.setItem("resultData", JSON.stringify({
      income,
      needs,
      wants,
      savings,
      resultType,
      resultDesc
    }));

    window.location.href = "results/result-independent.html";
  });
});
