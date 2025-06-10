/**
 * Simple Canvas Test - Fallback animation
 */

function createSimpleAnimation() {
  console.log("Creating simple canvas test animation...");

  const container = document.getElementById("dithered-waves-container");
  if (!container) {
    console.error("Container not found for simple animation");
    return;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.borderRadius = "2rem 0 0 2rem";

  container.appendChild(canvas);

  let time = 0;
  function animate() {
    // Clear canvas with a visible background
    ctx.fillStyle = "rgba(80, 80, 80, 1)"; // Solid gray background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw simple moving waves
    ctx.strokeStyle = "rgba(200, 200, 200, 0.8)"; // Light gray waves
    ctx.lineWidth = 3;

    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 3) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + time + i * 0.8) * 80;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    time += 0.08; // Faster animation
    requestAnimationFrame(animate);
  }

  animate();
  console.log("Simple canvas animation started");
}

// Export for testing
window.createSimpleAnimation = createSimpleAnimation;
