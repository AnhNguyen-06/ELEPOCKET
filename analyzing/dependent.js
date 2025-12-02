document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const sliders = document.querySelectorAll(".range-input");

  submitBtn.addEventListener("click", () => {
    // 1. Lấy dữ liệu đầu vào
    const income = Number(document.querySelector("#q1 + p + .slider-container input").value);

    const needs =
      Number(document.querySelector("#q2 + p + .slider-container input").value) +
      Number(document.querySelector("#q3 + p + .slider-container input").value) +
      Number(document.querySelector("#q4 + p + .slider-container input").value);

    const wants =
      Number(document.querySelector("#q5 + p + .slider-container input").value) +
      Number(document.querySelector("#q6 + p + .slider-container input").value) +
      Number(document.querySelector("#q7 + p + .slider-container input").value);

       // Tiết kiệm + đầu tư (câu 8–9)
    let savings = 0;
    
    if (income <= 0) {
      alert("Vui lòng nhập số tiền trợ cấp/thu nhập hợp lệ (lớn hơn 0).");
      return;
    }

    let resultType = "";
    let resultDesc = "";

    // 2. LOGIC TỰ ĐỘNG BALANCE
    const sumOfNandW = needs + wants;
    const remainingInfo = income - sumOfNandW;

    // Trường hợp 1: Hết sạch tiền hoặc âm tiền
    if (remainingInfo < 0) {
      resultType = "Thiếu hụt ngân sách";
      resultDesc = "Tổng chi tiêu của bạn đã vượt quá số tiền trợ cấp/thu nhập! Với sinh viên/người phụ thuộc, điều này rất rủi ro vì bạn không có nguồn thu nhập chủ động để bù đắp. Hãy cắt giảm ngay các khoản trà sữa, mua sắm.";
      
      alert(
        `💰 Kết quả phân tích của bạn:\n\n` +
        `Thu nhập/Trợ cấp: ${income.toLocaleString("vi-VN")} VND\n\n` +
        `Nhu cầu thiết yếu: ${needs.toLocaleString("vi-VN")} VND\n` +
        `Nhu cầu mong muốn: ${wants.toLocaleString("vi-VN")} VND\n` +
        `→ Tổng chi tiêu (${sumOfNandW.toLocaleString("vi-VN")} VND) vượt quá thu nhập!\n\n` +
        `📊 Phân loại: ${resultType}\n\n${resultDesc}`
      );
      return;
    }

    savings = remainingInfo;

    // 3. Tính tỷ lệ phần trăm
    const percentNeeds = (needs / income) * 100;
    const percentWants = (wants / income) * 100;
    const percentSavings = (savings / income) * 100;

    // 4. PHÂN LOẠI (Benchmark: 60 Needs / 30 Wants / 10 Savings)
    
    // Nhóm 1: Rất khó khăn (Needs chiếm gần hết tiền)
    // Với sinh viên, Needs 60-70% là bình thường. Nhưng nếu > 85% là cực căng thẳng.
    if (percentNeeds >= 85) {
      resultType = "Rất chật vật (Struggling)";
      resultDesc = "Bạn đang ở trạng thái sinh tồn. Gần như toàn bộ tiền trợ cấp (>85%) chỉ đủ để ăn uống và đi lại. Bạn hầu như không còn tiền cho giải trí hay tiết kiệm. Hãy xem xét xin thêm hỗ trợ hoặc tìm việc làm thêm nếu có thể.";
    } 
    // Nhóm 2: Tiết kiệm giỏi (Savings gấp đôi chuẩn 10%)
    else if (percentSavings >= 20) {
      resultType = "Tiết kiệm giỏi (Good Saver)";
      resultDesc = "Rất ấn tượng! Dù nguồn tiền có hạn, bạn vẫn để dành được >= 20%. Đây là thói quen tuyệt vời. Số tiền tuy có thể chưa lớn nhưng kỹ năng quản lý tài chính này sẽ giúp bạn rất nhiều khi ra trường.";
    } 
    // Nhóm 3: Tiêu hoang (Wants quá cao)
    // Benchmark Wants là 30%. Nếu lên 50% là tiêu hoang.
    else if (percentWants >= 50 || percentSavings < 2) {
      resultType = "Tiêu hoang (Overspending)";
      resultDesc = "Bạn đang dành quá nửa số tiền trợ cấp cho vui chơi/mua sắm, hoặc số dư cuối tháng gần như bằng 0. Hãy nhớ mục tiêu chính bây giờ là học tập, hãy tiết chế các khoản chi không cần thiết.";
    } 
    // Nhóm 4: Hơi thiếu tiết kiệm (Dưới chuẩn 10%)
    else if (percentSavings < 5) {
      resultType = "Cần tiết kiệm hơn";
      resultDesc = "Bạn chi tiêu vẫn trong tầm kiểm soát, nhưng mức tiết kiệm hơi thấp (<5%). Hãy cố gắng trích ra ít nhất 10% (dù chỉ là vài chục nghìn) mỗi khi nhận tiền để rèn luyện thói quen 'trả cho mình trước'.";
    } 
    // Nhóm 5: Hợp lý (Quanh mốc 60/30/10)
    else {
      resultType = "Hợp lý (Balanced)";
      resultDesc = "Bạn quản lý tiền trợ cấp rất tốt. Tỷ lệ phân bổ tiền cho ăn uống (Needs ~60%), vui chơi (Wants ~30%) và để dành (Savings ~10%) là rất chuẩn mực cho cuộc sống sinh viên/người phụ thuộc.";
    }

    // 5. Hiển thị & Lưu & Chuyển trang
    alert(
    `💰 Kết quả phân tích (Phụ thuộc):\n\n` +
    `Thu nhập: ${income.toLocaleString("vi-VN")} VND\n\n` +
    `Nhu cầu thiết yếu: ${percentNeeds.toFixed(1)}%  →  ${needs.toLocaleString("vi-VN")} VND\n` +
    `Nhu cầu mong muốn: ${percentWants.toFixed(1)}%  →  ${wants.toLocaleString("vi-VN")} VND\n` +
    `Tiết kiệm: ${percentSavings.toFixed(1)}%  →  ${savings.toLocaleString("vi-VN")} VND\n\n` +
    `📊 Phân loại: ${resultType}\n\n${resultDesc}`
    );

    sessionStorage.setItem("resultData", JSON.stringify({
      income, needs, wants, savings, resultType, resultDesc
    }));

    window.location.href = "results/result-dependent.html";
  });
});