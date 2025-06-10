/**
 * Vanilla JavaScript MagnetLines Animation
 * Based on the React MagnetLines component
 */

class MagnetLines {
  constructor(containerId, options = {}) {
    console.log("MagnetLines: Initializing...");

    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error("MagnetLines: Container not found:", containerId);
      return;
    }

    // Default options matching React component
    this.options = {
      rows: options.rows || 9,
      columns: options.columns || 9,
      containerSize: options.containerSize || "100%",
      lineColor: options.lineColor || "#efefef",
      lineWidth: options.lineWidth || "1vmin",
      lineHeight: options.lineHeight || "6vmin",
      baseAngle: options.baseAngle || -10,
      className: options.className || "",
      ...options,
    };

    console.log("MagnetLines: Options:", this.options);

    this.magnetContainer = null;
    this.items = [];
    this.boundPointerMove = this.onPointerMove.bind(this);

    this.init();
  }

  init() {
    console.log("MagnetLines: Starting initialization...");

    // Create the magnet lines container
    this.createContainer();
    this.createLines();
    this.setupEventListeners();
    this.initializePosition();

    console.log("MagnetLines: Initialization complete");
  }

  createContainer() {
    // Create the main container div
    this.magnetContainer = document.createElement("div");
    this.magnetContainer.className = `magnetLines-container ${this.options.className}`; // Set the grid styles
    this.magnetContainer.style.display = "grid";
    this.magnetContainer.style.gridTemplateColumns = `repeat(${this.options.columns}, 1fr)`;
    this.magnetContainer.style.gridTemplateRows = `repeat(${this.options.rows}, 1fr)`;
    this.magnetContainer.style.width = this.options.containerSize;
    this.magnetContainer.style.height = this.options.containerSize;
    this.magnetContainer.style.justifyItems = "center";
    this.magnetContainer.style.alignItems = "center";

    // Add loading class for fade-in animation
    this.magnetContainer.classList.add("loading"); // Add to the main container
    this.container.appendChild(this.magnetContainer);

    console.log("MagnetLines: Container created with styles:", {
      display: this.magnetContainer.style.display,
      gridTemplateColumns: this.magnetContainer.style.gridTemplateColumns,
      gridTemplateRows: this.magnetContainer.style.gridTemplateRows,
      width: this.magnetContainer.style.width,
      height: this.magnetContainer.style.height,
      containerRect: this.container.getBoundingClientRect(),
      magnetRect: this.magnetContainer.getBoundingClientRect(),
    });
  }

  createLines() {
    const total = this.options.rows * this.options.columns;

    for (let i = 0; i < total; i++) {
      const span = document.createElement("span"); // Set the CSS custom property for rotation
      span.style.setProperty("--rotate", `${this.options.baseAngle}deg`);
      span.style.setProperty("--line-index", i);

      // Set the line styles
      span.style.backgroundColor = this.options.lineColor;
      span.style.width = this.options.lineWidth;
      span.style.height = this.options.lineHeight;
      span.style.display = "block";
      span.style.transformOrigin = "center";
      span.style.willChange = "transform";
      span.style.transform = "rotate(var(--rotate))";

      this.magnetContainer.appendChild(span);
      this.items.push(span);
    }

    console.log("MagnetLines: Created", total, "lines with styles:", {
      backgroundColor: this.options.lineColor,
      width: this.options.lineWidth,
      height: this.options.lineHeight,
      firstItemRect: this.items[0]
        ? this.items[0].getBoundingClientRect()
        : null,
    });
  }

  setupEventListeners() {
    console.log("MagnetLines: Setting up event listeners...");

    // Add pointer move listener to window
    window.addEventListener("pointermove", this.boundPointerMove);

    console.log("MagnetLines: Event listeners setup complete");
  }

  onPointerMove(pointer) {
    this.items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      const b = pointer.x - centerX;
      const a = pointer.y - centerY;
      const c = Math.sqrt(a * a + b * b) || 1;
      const r =
        ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

      item.style.setProperty("--rotate", `${r}deg`);
    });
  }

  initializePosition() {
    // Initialize with middle position like in React component
    if (this.items.length) {
      const middleIndex = Math.floor(this.items.length / 2);
      const rect = this.items[middleIndex].getBoundingClientRect();
      this.onPointerMove({ x: rect.x, y: rect.y });
    }
  }

  destroy() {
    console.log("MagnetLines: Destroying...");

    // Remove event listeners
    window.removeEventListener("pointermove", this.boundPointerMove);

    // Remove DOM elements
    if (this.magnetContainer && this.magnetContainer.parentNode) {
      this.magnetContainer.parentNode.removeChild(this.magnetContainer);
    }

    // Clear references
    this.items = [];
    this.magnetContainer = null;
  }

  // Method to update options
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    console.log("MagnetLines: Options updated:", this.options);

    // Recreate with new options
    this.destroy();
    this.init();
  }
}

// Export for use
window.MagnetLines = MagnetLines;
