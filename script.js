const slider = document.getElementById("slider");
const afterImage = document.getElementById("afterImage");
const sliderHandle = document.getElementById("sliderHandle");
const leftArrow = sliderHandle.querySelector(".left-arrow");
const rightArrow = sliderHandle.querySelector(".right-arrow");

let dragging = false;

// Set slider position (percent: 0 to 100)
function setSlider(percent) {
  percent = Math.max(0, Math.min(100, percent));
  afterImage.style.width = percent + "%";
  sliderHandle.style.left = percent + "%";
}

// Handle dragging only on the handle
sliderHandle.addEventListener("mousedown", (e) => {
  dragging = true;
  document.body.style.cursor = "ew-resize";
});

document.addEventListener("mouseup", () => {
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

// Prevent drag from anywhere except the handle
slider.addEventListener("mousedown", (e) => {
  if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) return;
  dragging = true;
  document.body.style.cursor = "ew-resize";
});

// Arrow click events
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

// Prevent image dragging
document.querySelectorAll("img").forEach(img => {
  img.ondragstart = () => false;
});

// Initialize in the center
setSlider(50);

// Optional: Touch support for mobile
let lastTouch = null;
sliderHandle.addEventListener("touchstart", e => {
  lastTouch = e.touches[0].clientX;
  dragging = true;
});
document.addEventListener("touchmove", e => {
  if (!dragging) return;
  let clientX = e.touches[0].clientX;
  const rect = slider.getBoundingClientRect();
  let offsetX = clientX - rect.left;
  let percent = (offsetX / rect.width) * 100;
  setSlider(percent);
});
document.addEventListener("touchend", () => {
  dragging = false;
});
