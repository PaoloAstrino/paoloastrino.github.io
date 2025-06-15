/**
 * Magnet Lines Animation - Vanilla JavaScript
 * Compatible with magnet_lines.css
 * Creates an interactive grid of lines that follow the mouse cursor
 */

class MagnetLines {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) {
      console.error(`MagnetLines: Container "${containerSelector}" not found`);
      return;
    }

    // Default options
    this.options = {
      rows: 9,
      columns: 9,
      containerSize: "80vmin",
      lineColor: "#efefef",
      lineWidth: "0.8vmin",
      lineHeight: "8vmin",
      baseAngle: 90, // All bars start vertical
      className: "",
      ...options,
    };

    // Enforce square grid - always set columns to match rows
    if (options.columns && options.columns !== this.options.rows) {
      console.warn(
        "MagnetLines: columns value ignored - animation enforces square grid (columns = rows)"
      );
    }
    this.options.columns = this.options.rows;
    this.isInitialized = false;
    this.isActive = false; // Track if animation is active (stage 0 vs stage 1)
    this.activationStartTime = null; // Track when animation was first activated
    this.activationDuration = 1000; // 1 second smooth transition
    this.boundPointerMove = this.onPointerMove.bind(this);
    this.boundPointerEnter = this.onPointerEnter.bind(this);
    this.boundPointerLeave = this.onPointerLeave.bind(this);

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Set up container
    this.setupContainer();

    // Create spans
    this.createSpans(); // Add event listeners
    this.addEventListeners();

    // Keep bars in initial vertical position (stage 0 - inactive)
    // Don't call setInitialPosition() to preserve baseAngle

    this.isInitialized = true;
  }

  setupContainer() {
    // Add CSS custom properties
    this.container.style.setProperty("--columns", this.options.columns);
    this.container.style.setProperty("--rows", this.options.rows);

    // Add class
    this.container.className =
      `magnetLines-container ${this.options.className}`.trim();

    // Set container size
    this.container.style.width = this.options.containerSize;
    this.container.style.height = this.options.containerSize;
  }
  createSpans() {
    // Clear existing spans
    this.container.innerHTML = "";

    const total = this.options.rows * this.options.columns;

    for (let i = 0; i < total; i++) {
      const span = document.createElement("span");

      // ONLY set rotation - CSS handles ALL visual styling
      span.style.setProperty("--rotate", `${this.options.baseAngle}deg`);

      // No styling overrides - CSS controls everything
      this.container.appendChild(span);
    }
  }
  onPointerEnter(event) {
    // Activate animation when cursor first enters the container
    if (!this.isActive) {
      this.isActive = true;
      this.activationStartTime = performance.now(); // Record activation time for smooth delay
    }
  }

  onPointerLeave(event) {
    // Keep animation active even when cursor leaves
    // Animation stays in stage 1 until page reload
  }
  onPointerMove(event) {
    // Only respond to movement if animation is active (stage 1)
    if (!this.isActive) return;

    // Calculate smooth activation progress (0 to 1)
    const currentTime = performance.now();
    const timeSinceActivation = currentTime - this.activationStartTime;
    const activationProgress = Math.min(
      timeSinceActivation / this.activationDuration,
      1
    );

    // Smooth easing function for gradual activation
    const easedProgress = this.easeOutCubic(activationProgress);

    const items = this.container.querySelectorAll("span");

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      // Calculate distance from cursor to bar center for blue effect
      const distance = Math.sqrt(
        Math.pow(event.clientX - centerX, 2) +
          Math.pow(event.clientY - centerY, 2)
      );

      // Blue proximity effect
      const maxProximityDistance = 80; // Distance for blue effect
      const minProximityDistance = 5; // Minimum distance for full blue

      if (distance < maxProximityDistance) {
        // Calculate blue intensity (0 to 1) - closer = more blue
        let blueIntensity =
          1 -
          (distance - minProximityDistance) /
            (maxProximityDistance - minProximityDistance);
        blueIntensity = Math.max(0, Math.min(1, blueIntensity)); // Clamp between 0 and 1

        // IMMEDIATE transition when approaching (no delay)
        item.style.setProperty("transition", "none", "important");

        // Detect theme for proper color blending
        const isDarkTheme =
          document.documentElement.getAttribute("data-theme") === "dark" ||
          document.body.classList.contains("dark") ||
          document.documentElement.classList.contains("dark");

        let finalColor;
        if (isDarkTheme) {
          // Dark theme: blend blue with WHITE (distant = white, close = blue)
          const whiteAmount = (1 - blueIntensity) * 255;
          const blueR = Math.round(59 * blueIntensity + whiteAmount);
          const blueG = Math.round(130 * blueIntensity + whiteAmount);
          const blueB = Math.round(246 * blueIntensity + whiteAmount);
          finalColor = `rgba(${blueR}, ${blueG}, ${blueB}, 0.8)`;
        } else {
          // Light theme: blend blue with BLACK (distant = black, close = blue)
          const blueR = Math.round(59 * blueIntensity);
          const blueG = Math.round(130 * blueIntensity);
          const blueB = Math.round(246 * blueIntensity);
          finalColor = `rgba(${blueR}, ${blueG}, ${blueB}, 0.8)`;
        }

        const glowSize = Math.round(blueIntensity * 12);
        const glowOpacity = blueIntensity * 0.6;

        item.style.setProperty("background-color", finalColor, "important");
        item.style.setProperty(
          "box-shadow",
          `0 0 ${glowSize}px rgba(59, 130, 246, ${glowOpacity})`,
          "important"
        );
      } else {
        // Reset blue effect when far away
        item.style.removeProperty("background-color");
        item.style.removeProperty("box-shadow");
        item.style.removeProperty("transition");
      } // Rotation logic with smooth activation delay
      const b = event.clientX - centerX;
      const a = event.clientY - centerY;
      const c = Math.sqrt(a * a + b * b) || 1;
      const targetRotation =
        ((Math.acos(b / c) * 180) / Math.PI) *
        (event.clientY > centerY ? 1 : -1);

      // Calculate the shortest angle difference to avoid wrong direction rotation
      let angleDifference = targetRotation - this.options.baseAngle;

      // Normalize angle difference to [-180, 180] range for shortest path
      while (angleDifference > 180) angleDifference -= 360;
      while (angleDifference < -180) angleDifference += 360;

      // Smoothly interpolate using the shortest rotation path
      const currentRotation =
        this.options.baseAngle + angleDifference * easedProgress;

      item.style.setProperty("--rotate", `${currentRotation}deg`);
    });
  }

  // Smooth easing function for gradual activation
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  addEventListeners() {
    // Global movement listeners (but only respond when active)
    window.addEventListener("pointermove", this.boundPointerMove);
    window.addEventListener("mousemove", this.boundPointerMove);

    // Container-specific listeners for activation
    this.container.addEventListener("pointerenter", this.boundPointerEnter);
    this.container.addEventListener("mouseenter", this.boundPointerEnter);
    this.container.addEventListener("pointerleave", this.boundPointerLeave);
    this.container.addEventListener("mouseleave", this.boundPointerLeave);
  }

  setInitialPosition() {
    const items = this.container.querySelectorAll("span");

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      this.onPointerMove({ clientX: rect.x, clientY: rect.y });
    }
  }

  resetToBaseAngle() {
    const items = this.container.querySelectorAll("span");
    items.forEach((item) => {
      item.style.setProperty("--rotate", `${this.options.baseAngle}deg`);
    });
  }
  destroy() {
    if (!this.isInitialized) return;

    // Remove all event listeners
    window.removeEventListener("pointermove", this.boundPointerMove);
    window.removeEventListener("mousemove", this.boundPointerMove);
    this.container.removeEventListener("pointerenter", this.boundPointerEnter);
    this.container.removeEventListener("mouseenter", this.boundPointerEnter);
    this.container.removeEventListener("pointerleave", this.boundPointerLeave);
    this.container.removeEventListener("mouseleave", this.boundPointerLeave);
    this.container.innerHTML = "";
    this.isInitialized = false;
    this.isActive = false; // Reset to stage 0
    this.activationStartTime = null; // Reset activation timing
  }

  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    this.destroy();
    this.init();
  }
}

// Utility function to create magnet lines easily
function createMagnetLines(containerSelector, options = {}) {
  return new MagnetLines(containerSelector, options);
}

// Auto-initialize if container exists
document.addEventListener("DOMContentLoaded", () => {
  const defaultContainer = document.querySelector(".magnetLines-container");
  if (defaultContainer && !defaultContainer.dataset.magnetLinesInitialized) {
    defaultContainer.dataset.magnetLinesInitialized = "true";
    new MagnetLines(".magnetLines-container");
  }
});

// Export for use in other scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = { MagnetLines, createMagnetLines };
}

// Global access
window.MagnetLines = MagnetLines;
window.createMagnetLines = createMagnetLines;
