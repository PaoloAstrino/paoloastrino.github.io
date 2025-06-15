/**
 * Magnet Lines Animation - Vanilla JavaScript
 * Compatible with magnet_lines.css
 * Creates an interactive grid of lines that follow the mouse cursor
 */

class MagnetLines {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);    if (!this.container) {
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
    this.boundPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    // Set up container
    this.setupContainer();

    // Create spans
    this.createSpans();

    // Add event listeners
    this.addEventListeners();

    // Initial positioning
    this.setInitialPosition();

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

  onPointerMove(event) {
    const items = this.container.querySelectorAll("span");

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      const b = event.clientX - centerX;
      const a = event.clientY - centerY;
      const c = Math.sqrt(a * a + b * b) || 1;
      const r =
        ((Math.acos(b / c) * 180) / Math.PI) *
        (event.clientY > centerY ? 1 : -1);

      item.style.setProperty("--rotate", `${r}deg`);
    });
  }

  addEventListeners() {
    window.addEventListener("pointermove", this.boundPointerMove);
    window.addEventListener("mousemove", this.boundPointerMove);
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

    window.removeEventListener("pointermove", this.boundPointerMove);
    window.removeEventListener("mousemove", this.boundPointerMove);

    this.container.innerHTML = "";
    this.isInitialized = false;
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
