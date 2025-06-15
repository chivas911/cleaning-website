const slider = document.getElementById("slider");
const afterImage = document.getElementById("afterImage");
const sliderHandle = document.getElementById("sliderHandle");
const leftArrow = sliderHandle.querySelector(".left-arrow");
const rightArrow = sliderHandle.querySelector(".right-arrow");

let dragging = false;

function setSlider(percent) {
  percent = Math.max(0, Math.min(100, percent));
  afterImage.style.width = percent + "%";
  sliderHandle.style.left = percent + "%";
}

sliderHandle.addEventListener("mousedown", (e) => {
  dragging = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mouseup", (e) => {
  dragging = false;
  document.body.style.cursor = "";
});

document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = slider.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let percent = (offsetX / rect.width) * 100;
  setSlider(percent);
});

slider.addEventListener("click", (e) => {
  // Only slide if not clicking handle (arrows/line)
  if (e.target === sliderHandle || sliderHandle.contains(e.target)) return;
  const rect = slider.getBoundingClientRect();
  let percent = ((e.clientX - rect.left) / rect.width) * 100;
  setSlider(percent);
});

leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  const current = parseFloat(afterImage.style.width) || 50;
  setSlider(current - 10);
});
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  const current = parseFloat(afterImage.style.width) || 50;
  setSlider(current + 10);
});

// Initialize in the center
setSlider(50);
