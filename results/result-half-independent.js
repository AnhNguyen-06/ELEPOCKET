const data = JSON.parse(sessionStorage.getItem("resultData"));

if (!data) {
  document.body.innerHTML = "<h3>Không có dữ liệu để hiển thị</h3>";
} else {
  document.getElementById("resultType").textContent = `Bạn là người chi tiêu ${data.resultType}`;
  document.getElementById("resultDesc").textContent = data.resultDesc;

  document.getElementById("needs").textContent = `${data.needs.toLocaleString("vi-VN")}`;
  document.getElementById("wants").textContent = `${data.wants.toLocaleString("vi-VN")}`;
  document.getElementById("savings").textContent = `${data.savings.toLocaleString("vi-VN")}`;

  document.getElementById("needs").style.fontFamily = "'TikTok Sans', sans-serif";
  document.getElementById("wants").style.fontFamily = "'TikTok Sans', sans-serif";
  document.getElementById("savings").style.fontFamily = "'TikTok Sans', sans-serif";

  Chart.defaults.font.family = "'TikTok Sans', sans-serif";
  Chart.defaults.font.size = 16;
  Chart.defaults.color = "#082a44";

  const ctx = document.getElementById("spendingChart");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Nhu cầu", "Mong muốn", "Tiết kiệm"],
      datasets: [{
        data: [data.needs, data.wants, data.savings],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { 
            position: "bottom",
            labels: {
                font: {
                    family: "'TikTok Sans', sans-serif",
                    size: 16
                }
            } 
        },
        title: { 
            display: true, 
            text: "Phân bổ thu nhập",
            font: {
                family: "'TikTok Sans', sans-serif",
                size: 20
            }
        }
      }
    }
  });
}
