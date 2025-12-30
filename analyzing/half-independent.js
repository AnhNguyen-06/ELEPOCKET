document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const form = document.querySelector("form");

  submitBtn.addEventListener("click", (e) => {
    // 1. Lấy dữ liệu đầu vào
    e.preventDefault();

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

    // 4. PHÂN LOẠI (Benchmark: 40 Needs / 40 Wants / 20 Savings)
    
    // Nhóm 1: Áp lực tài chính (Needs cao bất thường so với nhóm này)
    // Vì không mất tiền nhà, nếu Needs > 60% là rất cao (Benchmark chỉ 40%)
    if (percentNeeds >= 65) {
      resultType = "Áp lực tài chính";
      resultDesc = "Cảnh báo: Chi phí thiết yếu của bạn đang chiếm quá cao (>65%) dù bạn đang có lợi thế (như sống cùng gia đình). Có thể bạn đang chi quá nhiều cho ăn uống sang trọng hoặc đi lại. Hãy rà soát lại để tận dụng lợi thế tiết kiệm giai đoạn này.";
    } 
    // Nhóm 2: Tiết kiệm (Savings vượt trội so với chuẩn 20%)
    else if (percentSavings >= 35) {
      resultType = "Tiết kiệm xuất sắc";
      resultDesc = "Tuyệt vời! Bạn đang tận dụng rất tốt giai đoạn 'Nửa độc lập' này để tích lũy. Với mức tiết kiệm >= 35% (cao hơn chuẩn 20%), bạn sẽ sớm có một khoản vốn lớn cho các mục tiêu tương lai (mua nhà riêng, khởi nghiệp...).";
    } 
    // Nhóm 3: Phung phí (Wants quá cao - Party too much)
    // Benchmark Wants là 40%, nếu lên 60% là quá đà
    else if (percentWants >= 60 || percentSavings < 5) {
      resultType = "Phung phí";
      resultDesc = "Bạn đang 'vung tay quá trán' cho các sở thích cá nhân. Việc không phải lo gánh nặng nhà cửa khiến bạn dễ dãi với ví tiền của mình (>60% cho hưởng thụ). Hãy cẩn thận, thói quen này sẽ rất khó bỏ khi bạn ra ở riêng.";
    } 
    // Nhóm 4: Hơi vượt mức (Savings dưới chuẩn 20%)
    else if (percentSavings < 15) {
      resultType = "Hơi phung phí";
      resultDesc = "Mức tiết kiệm của bạn hơi thấp (<15%) so với tiềm năng. Ở giai đoạn này, bạn nên đặt mục tiêu tiết kiệm ít nhất 20% thu nhập vì gánh nặng chi phí chưa lớn. Hãy bớt một chút tiền tiêu vặt để bỏ ống heo nhé.";
    } 
    // Nhóm 5: Hợp lý (Quanh mốc 40/40/20)
    else {
      resultType = "Hợp lý";
      resultDesc = "Xin chúc mừng! Bạn có một cơ cấu chi tiêu rất thông minh cho giai đoạn bán độc lập. Bạn vừa tận hưởng tuổi trẻ (Wants ~40%) vừa đảm bảo tích lũy kỷ luật (Savings ~20%). Hãy duy trì thói quen này.";
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
        const actionPath = form.getAttribute("action") || "results/result-half-independent.html";
        window.location.href = actionPath;
      })
      .catch((error) => {
        console.error("Lỗi gửi dữ liệu:", error);
        alert("Có lỗi xảy ra khi gửi dữ liệu, nhưng bạn vẫn sẽ xem được kết quả.");
        // Vẫn cho chuyển trang nếu lỗi gửi để người dùng xem được biểu đồ
        window.location.href = "results/result-half-independent.html";
      });
  });
});