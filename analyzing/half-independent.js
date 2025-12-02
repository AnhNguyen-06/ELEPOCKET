document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const sliders = document.querySelectorAll(".range-input");

  submitBtn.addEventListener("click", () => {
    // 1. Lấy dữ liệu đầu vào
    const income = 
        Number(document.querySelector("#q1 + p + .slider-container input").value) +
        Number(document.querySelector("#q2 + p + .slider-container input").value);

    const needs =
        Number(document.querySelector("#q3 + p + .slider-container input").value) +
        Number(document.querySelector("#q4 + p + .slider-container input").value) +
        Number(document.querySelector("#q5 + p + .slider-container input").value);

    const wants =
        Number(document.querySelector("#q6 + p + .slider-container input").value) +
        Number(document.querySelector("#q7 + p + .slider-container input").value) +
        Number(document.querySelector("#q8 + p + .slider-container input").value);

       // Tiết kiệm + đầu tư (câu 8–9)
    let savings = 0;
    
    if (income <= 0) {
      alert("Vui lòng nhập thu nhập hợp lệ (lớn hơn 0).");
      return;
    }

    let resultType = "";
    let resultDesc = "";

    // 2. LOGIC TỰ ĐỘNG BALANCE
    const sumOfNandW = needs + wants;
    const remainingInfo = income - sumOfNandW;

    // Trường hợp 1: Chi tiêu lố thu nhập
    if (remainingInfo < 0) {
      resultType = "Overspending (Vượt thu nhập)";
      resultDesc = "Bạn đang chi tiêu vượt quá số tiền kiếm được! Mặc dù có thể bạn đang được gia đình hỗ trợ một phần (nhà ở), nhưng việc chi tiêu lố vào các khoản cá nhân là báo động đỏ. Hãy xem lại ngay các khoản mua sắm/vui chơi.";
      
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

    // Trường hợp 2: Balance tiền dư vào Savings
    savings = remainingInfo;

    // 3. Tính tỷ lệ phần trăm
    const percentNeeds = (needs / income) * 100;
    const percentWants = (wants / income) * 100;
    const percentSavings = (savings / income) * 100;

    // 4. PHÂN LOẠI (Benchmark: 40 Needs / 40 Wants / 20 Savings)
    
    // Nhóm 1: Áp lực tài chính (Needs cao bất thường so với nhóm này)
    // Vì không mất tiền nhà, nếu Needs > 60% là rất cao (Benchmark chỉ 40%)
    if (percentNeeds >= 65) {
      resultType = "Áp lực tài chính (Stressed)";
      resultDesc = "Cảnh báo: Chi phí thiết yếu của bạn đang chiếm quá cao (>65%) dù bạn đang có lợi thế (như sống cùng gia đình). Có thể bạn đang chi quá nhiều cho ăn uống sang trọng hoặc đi lại. Hãy rà soát lại để tận dụng lợi thế tiết kiệm giai đoạn này.";
    } 
    // Nhóm 2: Tiết kiệm (Savings vượt trội so với chuẩn 20%)
    else if (percentSavings >= 35) {
      resultType = "Tiết kiệm xuất sắc (High Saver)";
      resultDesc = "Tuyệt vời! Bạn đang tận dụng rất tốt giai đoạn 'Nửa độc lập' này để tích lũy. Với mức tiết kiệm >= 35% (cao hơn chuẩn 20%), bạn sẽ sớm có một khoản vốn lớn cho các mục tiêu tương lai (mua nhà riêng, khởi nghiệp...).";
    } 
    // Nhóm 3: Phung phí (Wants quá cao - Party too much)
    // Benchmark Wants là 40%, nếu lên 60% là quá đà
    else if (percentWants >= 60 || percentSavings < 5) {
      resultType = "Phung phí (Overspending)";
      resultDesc = "Bạn đang 'vung tay quá trán' cho các sở thích cá nhân. Việc không phải lo gánh nặng nhà cửa khiến bạn dễ dãi với ví tiền của mình (>60% cho hưởng thụ). Hãy cẩn thận, thói quen này sẽ rất khó bỏ khi bạn ra ở riêng.";
    } 
    // Nhóm 4: Hơi vượt mức (Savings dưới chuẩn 20%)
    else if (percentSavings < 15) {
      resultType = "Cần điều chỉnh (Under-saving)";
      resultDesc = "Mức tiết kiệm của bạn hơi thấp (<15%) so với tiềm năng. Ở giai đoạn này, bạn nên đặt mục tiêu tiết kiệm ít nhất 20% thu nhập vì gánh nặng chi phí chưa lớn. Hãy bớt một chút tiền tiêu vặt để bỏ ống heo nhé.";
    } 
    // Nhóm 5: Hợp lý (Quanh mốc 40/40/20)
    else {
      resultType = "Hợp lý (Balanced)";
      resultDesc = "Xin chúc mừng! Bạn có một cơ cấu chi tiêu rất thông minh cho giai đoạn bán độc lập. Bạn vừa tận hưởng tuổi trẻ (Wants ~40%) vừa đảm bảo tích lũy kỷ luật (Savings ~20%). Hãy duy trì thói quen này.";
    }

    // 5. Hiển thị & Lưu & Chuyển trang
    alert(
    `💰 Kết quả phân tích (Nửa độc lập):\n\n` +
    `Thu nhập: ${income.toLocaleString("vi-VN")} VND\n\n` +
    `Nhu cầu thiết yếu: ${percentNeeds.toFixed(1)}%  →  ${needs.toLocaleString("vi-VN")} VND\n` +
    `Nhu cầu mong muốn: ${percentWants.toFixed(1)}%  →  ${wants.toLocaleString("vi-VN")} VND\n` +
    `Tiết kiệm: ${percentSavings.toFixed(1)}%  →  ${savings.toLocaleString("vi-VN")} VND\n\n` +
    `📊 Phân loại: ${resultType}\n\n${resultDesc}`
    );

    sessionStorage.setItem("resultData", JSON.stringify({
      income, needs, wants, savings, resultType, resultDesc
    }));

    // Chuyển hướng về trang kết quả tương ứng
    window.location.href = "results/result-half-independent.html";
  });
});