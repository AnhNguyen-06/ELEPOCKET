document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(sessionStorage.getItem("resultData"));

  if (!data) {
    document.body.innerHTML = "<h3>Không có dữ liệu để hiển thị / No data available</h3>";
    return;
  }

  const typeEl = document.getElementById("resultType");
  const descEl = document.getElementById("resultDesc");

  // 1. Gán Key để lang.js xử lý dịch thuật
  typeEl.setAttribute("data-lang", data.resultType); 
  descEl.setAttribute("data-lang", data.resultDesc);

  // 2. Cập nhật các con số
  document.getElementById("needs").textContent = data.needs.toLocaleString("de-DE");
  document.getElementById("wants").textContent = data.wants.toLocaleString("de-DE");
  document.getElementById("savings").textContent = data.savings.toLocaleString("de-DE");

  // 3. Đọc ngôn ngữ và thực hiện dịch ngay lập tức
  const currentLang = localStorage.getItem('selectedLang') || 'vi';
  if (typeof changeLanguage === "function") {
      changeLanguage(currentLang);
  }

  // --- CẤU HÌNH BIỂU ĐỒ ---
  Chart.defaults.font.family = "'TikTok Sans', sans-serif";
  Chart.defaults.font.size = 16;
  Chart.defaults.color = "#082a44";

  const labels = currentLang === 'en' 
    ? ["Needs", "Wants", "Savings"] 
    : ["Nhu cầu", "Mong muốn", "Tiết kiệm"];

  const chartTitle = currentLang === 'en' 
    ? "Income Allocation" 
    : "Phân bổ thu nhập";

  const ctx = document.getElementById("spendingChart");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels, // Sử dụng biến labels để dịch nhãn biểu đồ
      datasets: [{
        data: [data.needs, data.wants, data.savings],
        backgroundColor: ["#187dc5", "#56a3d9", "#082a44"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { 
            display: true, 
            text: chartTitle,
            font: { size: 20 }
        }
      }
    }
  });
});