const slider      = document.getElementById("slider");
const afterImage  = document.getElementById("afterImage");
const handle      = document.getElementById("sliderHandle");
const leftArrow   = handle.querySelector(".left");
const rightArrow  = handle.querySelector(".right");

let dragging = false;

// Update slider position [0–100]
function updateSlider(pct) {
  pct = Math.max(0, Math.min(100, pct));
  afterImage.style.width = pct + "%";
  handle.style.left      = pct + "%";
}

// Start centered
updateSlider(50);

// Handle drag start
handle.addEventListener("mousedown", () => {
  dragging = true;
  document.body.style.cursor = "ew-resize";
});

// Handle drag end
document.addEventListener("mouseup", () => {
  dragging = false;
  document.body.style.cursor = "";
});

// Drag move
document.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const rect = slider.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const pct = (offsetX / rect.width) * 100;
  updateSlider(pct);
});

// Arrow clicks
leftArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  const current = parseFloat(afterImage.style.width) || 50;
  updateSlider(current - 10);
});
rightArrow.addEventListener("click", (e) => {
  e.stopPropagation();
  const current = parseFloat(afterImage.style.width) || 50;
  updateSlider(current + 10);
});

// Touch support (optional)
handle.addEventListener("touchstart", () => dragging = true);
document.addEventListener("touchend", () => dragging = false);
document.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  const touch = e.touches[0];
  const rect = slider.getBoundingClientRect();
  const pct = ((touch.clientX - rect.left) / rect.width) * 100;
  updateSlider(pct);
});

// Prevent image dragging
document.querySelectorAll("img").forEach(img => {
  img.ondragstart = () => false;
});
