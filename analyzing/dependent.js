document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.querySelector(".submit-btn");
    const form = document.querySelector("form");

  submitBtn.addEventListener("click", (e) => {
    // 1. Lấy dữ liệu đầu vào
    e.preventDefault();

    const income = Number(document.querySelector("#q1 + p + .slider-container input").value);
    const needs =
      Number(document.querySelector("#q2 + p + .slider-container input").value) +
      Number(document.querySelector("#q3 + p + .slider-container input").value) +
      Number(document.querySelector("#q4 + p + .slider-container input").value);

    const wants =
      Number(document.querySelector("#q5 + p + .slider-container input").value) +
      Number(document.querySelector("#q6 + p + .slider-container input").value) +
      Number(document.querySelector("#q7 + p + .slider-container input").value);
    
    if (income <= 0) {
      alert("Vui lòng nhập thu nhập hợp lệ (lớn hơn 0)");
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

    // 4. PHÂN LOẠI (Benchmark: 60 Needs / 30 Wants / 10 Savings)
    // Nhóm 1: Ưu tiên chi tiêu thiết yếu
    if (percentNeeds >= 70) {
      resultType = "Ưu tiên thiết yếu";
      resultDesc = "Bạn là người có mức độ chi tiêu ƯU TIÊN CHI TIÊU THIẾT YẾU đó nha! Kết quả cho thấy bạn chi phần lớn ngân sách cho việc ăn uống, đi lại là hoàn toàn hợp lí trong giai đoạn này. Ưu tiên hàng đầu hiện tại là học tập và sức khỏe, nhưng bạn cũng có thể cải thiện thêm chi tiêu bằng cách  đầu tư cho bản thân và rèn luyện thói quen tiết kiệm hiệu quả hơn đó. Cố lên!";
    } 
    // Nhóm 2: Tiết kiệm
    else if (percentSavings >= 30) {
      resultType = "Tiết kiệm";
      resultDesc = "Bạn là một ngườI có mức độ chi tiêu TIẾT KIỆM đó nha! Dù cho còn phụ thuộc tài chính, nhưng tỉ lệ tiết kiệm ấn tượng cho thấy bạn biết phân bổ chi tiêu ổn áp đó chứ! Hãy tiếp tục phát huy, nhưng lâu lâu cũng phải  tự “thưởng” cho bản thân những trải nghiệm sống mới mẻ nữa nha!";
    } 
    // Nhóm 3: Hợp lý
    else if (percentSavings >= 15 && percentWants <= 50) {
      resultType = "Hợp lý";
      resultDesc = "Bạn là người có mức độ chi tiêu HỢP LÝ đó nha! Kết quả cho thấy tỉ lệ chi tiêu của bạn bám sát theo nguyên tắc tài chính hợp lí, giúp bạn có thể phân bổ tiền vào các khoản cần thiết, mong muốn và tiết kiệm một cách khôn ngoan. Hãy tiếp tục giữ thói quen chi tiêu này nhen, và rồi bạn sẽ tiến gần hơn đến sự ổn định tài chính lâu dài sớm thôi. Cố lên!";
    } 
    // Nhóm 4: Hơi phung phí
    else if (percentSavings >= 5) {
      resultType = "Hơi phung phí";
      resultDesc = "Bạn là người có mức độ chi tiêu HƠI PHUNG PHÍ đó nha! Kết quả chỉ ra rằng dù bạn thường chi nhiều cho một số khoản không quá cần thiết, ngân sách của bạn vẫn đang trong tầm kiểm soát. Hãy thử điều chỉnh lại một chút để sau này chi tiêu hiệu quả hơn nhiều nha!";
    } 
    // Nhóm 5: Phung phí 
    else {
      resultType = "Phung phí";
      resultDesc = "Cảnh báo! Bạn là người có mức độ chi tiêu PHUNG PHÍ đó nha! Kết quả chỉ ra rằng tỉ lệ chi tiêu của bạn đang lớn hơn nhiều so với tiết kiệm, và có thể vượt lố thu nhập luôn. Đây là một dấu hiệu cảnh báo cho bạn điều chỉnh lại thói quen chi tiêu của mình và tập trung vào điều thật sự cần thiết cho cuộc sống thôi nhé. Cố lên!";
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
        const actionPath = form.getAttribute("action") || "results/result-dependent.html";
        window.location.href = actionPath;
      })
      .catch((error) => {
        console.error("Lỗi gửi dữ liệu:", error);
        alert("Có lỗi xảy ra khi gửi dữ liệu, nhưng bạn vẫn sẽ xem được kết quả.");
        // Vẫn cho chuyển trang nếu lỗi gửi để người dùng xem được biểu đồ
        window.location.href = "results/result-dependent.html";
      });
  });
});