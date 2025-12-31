document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector(".submit-btn");
  const form = document.querySelector("form");

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

    let resultTypeKey = "";
    let resultDescKey = "";

    // 4. PHÂN LOẠI MỚI (LOGIC HÌNH PHỄU - WATERFALL)
    // Đảm bảo bao quát hết các trường hợp
    
    // Nhóm 1: Thắt lưng buộc bụng (Needs quá cao)
    if (percentNeeds >= 75) {
      resultTypeKey = "inde-type-tight";
      resultDescKey = "inde-desc-tight";
    } 
    // Nhóm 2: Tiết kiệm (Savings cao - Bao gồm case 33/33/33)
    else if (percentSavings >= 30) {
      resultTypeKey = "inde-type-frugal";
      resultDescKey = "inde-desc-frugal";
    } 
    // Nhóm 3: Phung phí (Wants quá cao hoặc Savings quá thấp)
    else if (percentWants >= 50 || percentSavings < 5) {
      resultTypeKey = "inde-type-overspending";
      resultDescKey = "inde-desc-overspending";
    } 
    // Nhóm 4: Hơi phung phí (Tiết kiệm chưa đạt chuẩn an toàn)
    else if (percentSavings < 15) {
      resultTypeKey = "inde-type-moderately-overspending";
      resultDescKey = "inde-desc-moderately-overspending";
    } 
    // Nhóm 5: Hợp lý (Còn lại - Bao gồm case 50/30/20)
    else {
      resultTypeKey = "inde-type-balanced";
      resultDescKey = "inde-desc-balanced";
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
