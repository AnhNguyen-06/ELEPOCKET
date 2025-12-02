document.addEventListener("DOMContentLoaded", () => {
  // Nút chọn câu hỏi
  const buttons = document.querySelectorAll(".question-choice .grid button");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const num = btn.textContent.trim();
      const target = document.getElementById("q" + num);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  // Slider hiển thị giá trị
  const sliders = document.querySelectorAll(".slider-container");

  sliders.forEach(slider => {
    const input = slider.querySelector(".range-input");
    const valueDisplay = slider.querySelector(".range-value");

    if (input && valueDisplay) {
      const updateValue = () => {
        const val = Number(input.value).toLocaleString("vi-VN");
        valueDisplay.textContent = val;
      };
      input.addEventListener("input", updateValue);
      updateValue();
    }
  });
});
