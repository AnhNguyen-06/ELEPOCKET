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

    let resultTypeKey = "";
    let resultDescKey = "";

    // 4. PHÂN LOẠI (Benchmark: 40 Needs / 40 Wants / 20 Savings)
    
    // Nhóm 1: Tiết kiệm (Dựa trên S > 40 hoặc S > 35%)
    if (percentSavings >= 35) {
        resultTypeKey = "half-type-frugal";
        resultDescKey = "half-desc-frugal";
    } 
    // Nhóm 2: Phung phí (Theo ảnh: W > 90% hoặc W > 60% ở nhóm này là rất cao)
    else if (percentWants >= 60 || percentSavings < 5) {
        resultTypeKey = "half-type-overspending";
        resultDescKey = "half-desc-overspending";
    } 
    // Nhóm 3: Thắt lưng buộc bụng (Needs chiếm quá 65% dù có hỗ trợ)
    else if (percentNeeds >= 65) {
        resultTypeKey = "half-type-tight"; // Bạn cần thêm key này vào lang.js
        resultDescKey = "half-desc-tight";
    }
    // Nhóm 4: Hơi phung phí (Theo ảnh: W > 50% và tiết kiệm < 10%)
    else if (percentWants > 50 || percentSavings < 15) {
        resultTypeKey = "half-type-moderately-overspending";
        resultDescKey = "half-desc-moderately-overspending";
    } 
    // Nhóm 5: Hợp lý (Quanh mốc 40/40/20 hoặc 33/33/33)
    else {
        resultTypeKey = "half-type-balanced";
        resultDescKey = "half-desc-balanced";
    }

    // 4. CHUẨN BỊ DỮ LIỆU GỬI ĐI
    const formData = new FormData(form);
    // Thêm các kết quả tính toán vào form để Netlify lưu lại luôn
    formData.append("result-type", resultTypeKey);
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
          resultType: resultTypeKey,
          resultDesc: resultDescKey,
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