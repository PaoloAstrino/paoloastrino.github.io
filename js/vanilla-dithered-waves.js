/**
 * Vanilla JavaScript Dithered Waves Animation
 * Based on the React Dither component
 */

class VanillaDitheredWaves {
  constructor(containerId, options = {}) {
    console.log("VanillaDitheredWaves: Initializing...");

    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error("VanillaDitheredWaves: Container not found:", containerId);
      return;
    }

    // Default options matching React component
    this.options = {
      waveColor: options.waveColor || [0.5, 0.5, 0.5],
      waveSpeed: options.waveSpeed || 0.05,
      waveFrequency: options.waveFrequency || 3,
      waveAmplitude: options.waveAmplitude || 0.3,
      mouseInteraction: options.mouseInteraction !== false,
      ...options,
    };

    console.log("VanillaDitheredWaves: Options:", this.options);

    this.canvas = null;
    this.gl = null;
    this.program = null;
    this.uniforms = {};
    this.time = 0;
    this.mouse = { x: 0, y: 0 };
    this.animationId = null;

    this.init();
  }

  init() {
    console.log("VanillaDitheredWaves: Starting initialization...");

    // Create canvas
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.display = "block";
    this.container.appendChild(this.canvas);

    console.log("VanillaDitheredWaves: Canvas created and added to container");

    // Get WebGL context
    this.gl =
      this.canvas.getContext("webgl2") || this.canvas.getContext("webgl");
    if (!this.gl) {
      console.error("VanillaDitheredWaves: WebGL not supported");
      return;
    }

    console.log("VanillaDitheredWaves: WebGL context created");

    // Set up shaders and program
    this.setupShaders();
    this.setupGeometry();
    this.setupEventListeners();
    this.resize();
    this.animate();

    console.log("VanillaDitheredWaves: Initialization complete");
  }

  setupShaders() {
    console.log("VanillaDitheredWaves: Setting up shaders...");

    const vertexShaderSource = `
            attribute vec2 position;
            varying vec2 vUv;
            
            void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

    const fragmentShaderSource = `
            precision highp float;
            
            varying vec2 vUv;
            uniform float time;
            uniform vec2 resolution;
            uniform vec2 mouse;
            uniform vec3 waveColor;
            uniform float waveSpeed;
            uniform float waveFrequency;
            uniform float waveAmplitude;
            
            // Dithering pattern
            float dither4x4(vec2 position, float brightness) {
                int x = int(mod(position.x, 4.0));
                int y = int(mod(position.y, 4.0));
                int index = x + y * 4;
                float threshold = 0.0;
                
                if (index == 0) threshold = 1.0 / 17.0;
                else if (index == 1) threshold = 9.0 / 17.0;
                else if (index == 2) threshold = 3.0 / 17.0;
                else if (index == 3) threshold = 11.0 / 17.0;
                else if (index == 4) threshold = 13.0 / 17.0;
                else if (index == 5) threshold = 5.0 / 17.0;
                else if (index == 6) threshold = 15.0 / 17.0;
                else if (index == 7) threshold = 7.0 / 17.0;
                else if (index == 8) threshold = 4.0 / 17.0;
                else if (index == 9) threshold = 12.0 / 17.0;
                else if (index == 10) threshold = 2.0 / 17.0;
                else if (index == 11) threshold = 10.0 / 17.0;
                else if (index == 12) threshold = 16.0 / 17.0;
                else if (index == 13) threshold = 8.0 / 17.0;
                else if (index == 14) threshold = 14.0 / 17.0;
                else if (index == 15) threshold = 6.0 / 17.0;
                
                return brightness > threshold ? 1.0 : 0.0;
            }
            
            void main() {
                vec2 uv = vUv;
                vec2 coord = uv * resolution;
                
                // Calculate wave pattern
                float wave1 = sin(uv.x * waveFrequency * 6.28 + time * waveSpeed * 2.0) * waveAmplitude;
                float wave2 = sin(uv.y * waveFrequency * 4.0 + time * waveSpeed * 1.5) * waveAmplitude * 0.7;
                float wave3 = sin((uv.x + uv.y) * waveFrequency * 3.0 + time * waveSpeed) * waveAmplitude * 0.5;
                
                // Mouse interaction
                vec2 mousePos = mouse / resolution;
                float mouseDistance = length(uv - mousePos);
                float mouseEffect = 1.0 + sin(mouseDistance * 10.0 - time * waveSpeed * 3.0) * 0.2 * exp(-mouseDistance * 2.0);
                
                // Combine waves
                float brightness = (wave1 + wave2 + wave3) * mouseEffect;
                brightness = (brightness + 1.0) * 0.5; // Normalize to 0-1
                
                // Apply dithering
                float dithered = dither4x4(coord, brightness);
                
                gl_FragColor = vec4(waveColor * dithered, 1.0);
            }
        `;

    // Create and compile shaders
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) {
      console.error("VanillaDitheredWaves: Failed to create shaders");
      return;
    }

    // Create program
    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error(
        "VanillaDitheredWaves: Program link error:",
        this.gl.getProgramInfoLog(this.program)
      );
      return;
    }

    // Get uniform locations
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, "time"),
      resolution: this.gl.getUniformLocation(this.program, "resolution"),
      mouse: this.gl.getUniformLocation(this.program, "mouse"),
      waveColor: this.gl.getUniformLocation(this.program, "waveColor"),
      waveSpeed: this.gl.getUniformLocation(this.program, "waveSpeed"),
      waveFrequency: this.gl.getUniformLocation(this.program, "waveFrequency"),
      waveAmplitude: this.gl.getUniformLocation(this.program, "waveAmplitude"),
    };

    console.log("VanillaDitheredWaves: Shaders compiled and program linked");
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error(
        "VanillaDitheredWaves: Shader compile error:",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  setupGeometry() {
    console.log("VanillaDitheredWaves: Setting up geometry...");

    // Create fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    const positionLocation = this.gl.getAttribLocation(
      this.program,
      "position"
    );
    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.vertexAttribPointer(
      positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );

    console.log("VanillaDitheredWaves: Geometry setup complete");
  }

  setupEventListeners() {
    console.log("VanillaDitheredWaves: Setting up event listeners...");

    // Resize handler
    window.addEventListener("resize", () => this.resize());

    // Mouse interaction
    if (this.options.mouseInteraction) {
      const updateMouse = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = rect.height - (e.clientY - rect.top); // Flip Y coordinate
      };

      this.container.addEventListener("mousemove", updateMouse);
      this.container.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (e.touches[0]) {
          updateMouse(e.touches[0]);
        }
      });
    }

    console.log("VanillaDitheredWaves: Event listeners setup complete");
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;

    this.canvas.width = rect.width * pixelRatio;
    this.canvas.height = rect.height * pixelRatio;

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    console.log(
      "VanillaDitheredWaves: Resized to",
      this.canvas.width,
      "x",
      this.canvas.height
    );
  }

  animate() {
    this.time += 0.016; // Approximate 60fps time step

    this.gl.useProgram(this.program);

    // Set uniforms
    this.gl.uniform1f(this.uniforms.time, this.time);
    this.gl.uniform2f(
      this.uniforms.resolution,
      this.canvas.width,
      this.canvas.height
    );
    this.gl.uniform2f(this.uniforms.mouse, this.mouse.x, this.mouse.y);
    this.gl.uniform3f(this.uniforms.waveColor, ...this.options.waveColor);
    this.gl.uniform1f(this.uniforms.waveSpeed, this.options.waveSpeed);
    this.gl.uniform1f(this.uniforms.waveFrequency, this.options.waveFrequency);
    this.gl.uniform1f(this.uniforms.waveAmplitude, this.options.waveAmplitude);

    // Clear and draw
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    console.log("VanillaDitheredWaves: Destroying...");

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }

    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
  }

  // Method to update options
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
    console.log("VanillaDitheredWaves: Options updated:", this.options);
  }
}

// Export for use
window.VanillaDitheredWaves = VanillaDitheredWaves;
