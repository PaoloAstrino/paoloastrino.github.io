/**
 * Vanilla JavaScript Liquid Chrome Animation
 * Based on the React LiquidChrome component using OGL
 */

class LiquidChrome {
  constructor(containerId, options = {}) {
    console.log("LiquidChrome: Initializing...");

    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error("LiquidChrome: Container not found:", containerId);
      return;
    }

    // Default options matching React component
    this.options = {
      baseColor: options.baseColor || [0.1, 0.1, 0.1],
      speed: options.speed || 0.2,
      amplitude: options.amplitude || 0.3,
      frequencyX: options.frequencyX || 3,
      frequencyY: options.frequencyY || 3,
      interactive: options.interactive !== false,
      ...options,
    };

    console.log("LiquidChrome: Options:", this.options);

    this.renderer = null;
    this.gl = null;
    this.program = null;
    this.mesh = null;
    this.animationId = null;
    this.boundResize = this.resize.bind(this);
    this.boundMouseMove = this.handleMouseMove.bind(this);
    this.boundTouchMove = this.handleTouchMove.bind(this);

    this.init();
  }

  async init() {
    console.log("LiquidChrome: Starting initialization...");

    try {
      await this.loadOGL();
      this.createRenderer();
      this.createShaders();
      this.setupEventListeners();
      this.startAnimation();
      console.log("LiquidChrome: Initialization complete");
    } catch (error) {
      console.error("LiquidChrome: Initialization failed:", error);
    }
  }

  async loadOGL() {
    // Load OGL library from CDN
    if (typeof OGL === "undefined") {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/ogl@0.0.82/dist/ogl.umd.js";
        script.onload = () => {
          console.log("OGL library loaded successfully");
          resolve();
        };
        script.onerror = () => reject(new Error("Failed to load OGL library"));
        document.head.appendChild(script);
      });
    }
  }

  createRenderer() {
    const { Renderer } = OGL;
    this.renderer = new Renderer({ antialias: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(1, 1, 1, 1);

    this.container.appendChild(this.gl.canvas);
    this.resize();
  }

  createShaders() {
    const { Program, Mesh, Triangle } = OGL;

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uResolution;
      uniform vec3 uBaseColor;
      uniform float uAmplitude;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform vec2 uMouse;
      varying vec2 vUv;

      vec4 renderImage(vec2 uvCoord) {
          vec2 fragCoord = uvCoord * uResolution.xy;
          vec2 uv = (2.0 * fragCoord - uResolution.xy) / min(uResolution.x, uResolution.y);

          for (float i = 1.0; i < 10.0; i++){
              uv.x += uAmplitude / i * cos(i * uFrequencyX * uv.y + uTime + uMouse.x * 3.14159);
              uv.y += uAmplitude / i * cos(i * uFrequencyY * uv.x + uTime + uMouse.y * 3.14159);
          }

          vec2 diff = (uvCoord - uMouse);
          float dist = length(diff);
          float falloff = exp(-dist * 20.0);
          float ripple = sin(10.0 * dist - uTime * 2.0) * 0.03;
          uv += (diff / (dist + 0.0001)) * ripple * falloff;

          vec3 color = uBaseColor / abs(sin(uTime - uv.y - uv.x));
          return vec4(color, 1.0);
      }

      void main() {
          vec4 col = vec4(0.0);
          int samples = 0;
          for (int i = -1; i <= 1; i++){
              for (int j = -1; j <= 1; j++){
                  vec2 offset = vec2(float(i), float(j)) * (1.0 / min(uResolution.x, uResolution.y));
                  col += renderImage(vUv + offset);
                  samples++;
              }
          }
          gl_FragColor = col / float(samples);
      }
    `;

    const geometry = new Triangle(this.gl);
    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new Float32Array([
            this.gl.canvas.width,
            this.gl.canvas.height,
            this.gl.canvas.width / this.gl.canvas.height,
          ]),
        },
        uBaseColor: { value: new Float32Array(this.options.baseColor) },
        uAmplitude: { value: this.options.amplitude },
        uFrequencyX: { value: this.options.frequencyX },
        uFrequencyY: { value: this.options.frequencyY },
        uMouse: { value: new Float32Array([0, 0]) },
      },
    });
    this.mesh = new Mesh(this.gl, { geometry, program: this.program });
  }

  resize() {
    const scale = 1;
    this.renderer.setSize(
      this.container.offsetWidth * scale,
      this.container.offsetHeight * scale
    );

    if (this.program) {
      const resUniform = this.program.uniforms.uResolution.value;
      resUniform[0] = this.gl.canvas.width;
      resUniform[1] = this.gl.canvas.height;
      resUniform[2] = this.gl.canvas.width / this.gl.canvas.height;
    }
  }

  handleMouseMove(event) {
    if (!this.program) return;

    const rect = this.container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = 1 - (event.clientY - rect.top) / rect.height;
    const mouseUniform = this.program.uniforms.uMouse.value;
    mouseUniform[0] = x;
    mouseUniform[1] = y;
  }

  handleTouchMove(event) {
    if (!this.program || event.touches.length === 0) return;

    const touch = event.touches[0];
    const rect = this.container.getBoundingClientRect();
    const x = (touch.clientX - rect.left) / rect.width;
    const y = 1 - (touch.clientY - rect.top) / rect.height;
    const mouseUniform = this.program.uniforms.uMouse.value;
    mouseUniform[0] = x;
    mouseUniform[1] = y;
  }

  setupEventListeners() {
    window.addEventListener("resize", this.boundResize);

    if (this.options.interactive) {
      this.container.addEventListener("mousemove", this.boundMouseMove);
      this.container.addEventListener("touchmove", this.boundTouchMove);
    }
  }

  startAnimation() {
    const update = (t) => {
      this.animationId = requestAnimationFrame(update);
      if (this.program) {
        this.program.uniforms.uTime.value = t * 0.001 * this.options.speed;
        this.renderer.render({ scene: this.mesh });
      }
    };
    this.animationId = requestAnimationFrame(update);
  }

  destroy() {
    console.log("LiquidChrome: Destroying...");

    // Cancel animation
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    // Remove event listeners
    window.removeEventListener("resize", this.boundResize);
    if (this.options.interactive) {
      this.container.removeEventListener("mousemove", this.boundMouseMove);
      this.container.removeEventListener("touchmove", this.boundTouchMove);
    }

    // Remove DOM elements
    if (this.gl && this.gl.canvas && this.gl.canvas.parentElement) {
      this.gl.canvas.parentElement.removeChild(this.gl.canvas);
    }

    // Lose WebGL context
    if (this.gl) {
      const ext = this.gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    }

    // Clear references
    this.renderer = null;
    this.gl = null;
    this.program = null;
    this.mesh = null;
  }

  // Method to update options
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    console.log("LiquidChrome: Options updated:", this.options);

    // Recreate with new options
    this.destroy();
    this.init();
  }
}

// Export for use
window.LiquidChrome = LiquidChrome;
