const slider = document.getElementById("slider");
const afterImage = document.getElementById("afterImage");
const sliderLine = document.getElementById("sliderLine");

slider.addEventListener("mousemove", (e) => {
  const rect = slider.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let percent = offsetX / rect.width * 100;

  percent = Math.max(0, Math.min(100, percent));

  afterImage.style.width = percent + "%";
  sliderLine.style.left = percent + "%";
});
