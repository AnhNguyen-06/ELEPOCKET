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
      
      sessionStorage.setItem("resultData", JSON.stringify({
        income, needs, wants, savings, resultType, resultDesc
      }));

      // Chuyển hướng về trang kết quả tương ứng
      window.location.href = "results/result-dependent.html";
    }

    savings = remainingInfo;

    // 3. Tính tỷ lệ phần trăm
    const percentNeeds = (needs / income) * 100;
    const percentWants = (wants / income) * 100;
    const percentSavings = (savings / income) * 100;

    // 4. PHÂN LOẠI (Benchmark: 60 Needs / 30 Wants / 10 Savings)
    
    // Nhóm 1: Ưu tiên chi tiêu thiết yếu
    if (percentNeeds >= 70) {
      resultType = "Ưu tiên chi tiêu thiết yếu";
      resultDesc = "Bạn là người có mức độ chi tiêu ƯU TIÊN CHI TIÊU THIẾT YẾU đó nha! Kết quả cho thấy bạn chi phần lớn ngân sách cho việc ăn uống, đi lại là hoàn toàn hợp lí trong giai đoạn này. Ưu tiên hàng đầu hiện tại là học tập và sức khỏe, nhưng bạn cũng có thể cải thiện thêm chi tiêu bằng cách  đầu tư cho bản thân và rèn luyện thói quen tiết kiệm hiệu quả hơn đó. Cố lên!";
    } 
    // Nhóm 2: Tiết kiệm
    else if (percentSavings >= 30 && percentWants <= 40) {
      resultType = "Tiết kiệm";
      resultDesc = "Bạn là một ngườI có mức độ chi tiêu TIẾT KIỆM đó nha! Dù cho còn phụ thuộc tài chính, nhưng tỉ lệ tiết kiệm ấn tượng cho thấy bạn biết phân bổ chi tiêu ổn áp đó chứ! Hãy tiếp tục phát huy, nhưng lâu lâu cũng phải  tự “thưởng” cho bản thân những trải nghiệm sống mới mẻ nữa nha!";
    } 
    // Nhóm 3: Hợp lý
    else if (10 <= percentSavings < 30 && 20 <= percentWants <= 50 && percentNeeds <= 60) {
      resultType = "Hợp lý";
      resultDesc = "Bạn là người có mức độ chi tiêu HỢP LÝ đó nha! Kết quả cho thấy tỉ lệ chi tiêu của bạn bám sát theo nguyên tắc tài chính hợp lí, giúp bạn có thể phân bổ tiền vào các khoản cần thiết, mong muốn và tiết kiệm một cách khôn ngoan. Hãy tiếp tục giữ thói quen chi tiêu này nhen, và rồi bạn sẽ tiến gần hơn đến sự ổn định tài chính lâu dài sớm thôi. Cố lên!";
    } 
    // Nhóm 4: Hơi phung phí
    else if (percentSavings >= 10 && 50 < percentWants <= 80 && percentNeeds < 70) {
      resultType = "Hơi phung phí";
      resultDesc = "Bạn là người có mức độ chi tiêu HƠI PHUNG PHÍ đó nha! Kết quả chỉ ra rằng dù bạn thường chi nhiều cho một số khoản không quá cần thiết, ngân sách của bạn vẫn đang trong tầm kiểm soát. Hãy thử điều chỉnh lại một chút để sau này chi tiêu hiệu quả hơn nhiều nha!";
    } 
    // Nhóm 5: Hợp lý (Quanh mốc 60/30/10)
    else {
      resultType = "Phung phí";
      resultDesc = "SOS!!! Bạn là người có mức độ chi tiêu PHUNG PHÍ đó nha! Kết quả chỉ ra rằng tỉ lệ chi tiêu của bạn đang lớn hơn nhiều so với tiết kiệm, và có thể vượt lố thu nhập luôn. Đây là một dấu hiệu cảnh báo cho bạn điều chỉnh lại thói quen chi tiêu của mình và tập trung vào điều thật sự cần thiết cho cuộc sống thôi nhé. Cố lên!";
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

    // Chuyển hướng về trang kết quả tương ứng
    window.location.href = "results/result-dependent.html";
  });
});