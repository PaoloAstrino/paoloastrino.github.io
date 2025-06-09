/**
 * Dithered Waves Animation - Three.js Implementation
 * Replaces the blue background section with animated dithered waves
 */

class DitheredWaves {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with id '${containerId}' not found`);
      return;
    }

    // Configuration options
    this.options = {
      waveSpeed: options.waveSpeed || 0.05,
      waveFrequency: options.waveFrequency || 3,
      waveAmplitude: options.waveAmplitude || 0.3,
      waveColor: options.waveColor || [0.3, 0.5, 0.8], // Blue-ish color
      colorNum: options.colorNum || 4,
      pixelSize: options.pixelSize || 2,
      disableAnimation: options.disableAnimation || false,
      enableMouseInteraction: options.enableMouseInteraction || true,
      mouseRadius: options.mouseRadius || 0.3
    };

    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    // Create scene, camera, renderer
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    });
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    // Create wave material
    this.createWaveMaterial();
    
    // Create geometry and mesh
    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(this.geometry, this.waveMaterial);
    this.scene.add(this.mesh);

    // Setup event listeners
    this.setupEventListeners();

    // Start animation
    this.animate();
  }

  createWaveMaterial() {
    const waveVertexShader = `
      precision highp float;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const waveFragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float waveSpeed;
      uniform float waveFrequency;
      uniform float waveAmplitude;
      uniform vec3 waveColor;
      uniform vec2 mousePos;
      uniform int enableMouseInteraction;
      uniform float mouseRadius;
      uniform float colorNum;
      uniform float pixelSize;
      varying vec2 vUv;

      // Perlin noise implementation
      vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec2 P) {
        vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
        vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
        Pi = mod289(Pi);
        vec4 ix = Pi.xzxz;
        vec4 iy = Pi.yyww;
        vec4 fx = Pf.xzxz;
        vec4 fy = Pf.yyww;
        vec4 i = permute(permute(ix) + iy);
        vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
        vec4 gy = abs(gx) - 0.5;
        vec4 tx = floor(gx + 0.5);
        gx = gx - tx;
        vec2 g00 = vec2(gx.x, gy.x);
        vec2 g10 = vec2(gx.y, gy.y);
        vec2 g01 = vec2(gx.z, gy.z);
        vec2 g11 = vec2(gx.w, gy.w);
        vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
        g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
        float n00 = dot(g00, vec2(fx.x, fy.x));
        float n10 = dot(g10, vec2(fx.y, fy.y));
        float n01 = dot(g01, vec2(fx.z, fy.z));
        float n11 = dot(g11, vec2(fx.w, fy.w));
        vec2 fade_xy = fade(Pf.xy);
        vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
        return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
      }

      const int OCTAVES = 6;
      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 1.0;
        float freq = waveFrequency;
        for (int i = 0; i < OCTAVES; i++) {
          value += amp * abs(cnoise(p));
          p *= freq;
          amp *= waveAmplitude;
        }
        return value;
      }

      float pattern(vec2 p) {
        vec2 p2 = p - time * waveSpeed;
        return fbm(p - fbm(p + fbm(p2)));
      }

      // Bayer matrix for dithering
      float getBayerValue(vec2 coord) {
        int x = int(mod(coord.x, 8.0));
        int y = int(mod(coord.y, 8.0));
        
        // 8x8 Bayer matrix
        int matrix[64] = int[64](
          0, 48, 12, 60,  3, 51, 15, 63,
          32,16, 44, 28, 35,19, 47, 31,
          8, 56,  4, 52, 11,59,  7, 55,
          40,24, 36, 20, 43,27, 39, 23,
          2, 50, 14, 62,  1,49, 13, 61,
          34,18, 46, 30, 33,17, 45, 29,
          10,58,  6, 54,  9,57,  5, 53,
          42,26, 38, 22, 41,25, 37, 21
        );
        
        return float(matrix[y * 8 + x]) / 64.0;
      }

      vec3 dither(vec2 uv, vec3 color) {
        vec2 scaledCoord = floor(uv * resolution / pixelSize);
        float threshold = getBayerValue(scaledCoord) - 0.25;
        float step = 1.0 / (colorNum - 1.0);
        color += threshold * step;
        float bias = 0.2;
        color = clamp(color - bias, 0.0, 1.0);
        return floor(color * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
      }

      void main() {
        vec2 uv = vUv - 0.5;
        uv.x *= resolution.x / resolution.y;
        
        float f = pattern(uv);
        
        // Mouse interaction
        if (enableMouseInteraction == 1) {
          vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
          mouseNDC.x *= resolution.x / resolution.y;
          float dist = length(uv - mouseNDC);
          float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
          f -= 0.5 * effect;
        }
        
        vec3 col = mix(vec3(0.0), waveColor, f);
        
        // Apply dithering
        col = dither(vUv, col);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    this.waveMaterial = new THREE.ShaderMaterial({
      vertexShader: waveVertexShader,
      fragmentShader: waveFragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        waveSpeed: { value: this.options.waveSpeed },
        waveFrequency: { value: this.options.waveFrequency },
        waveAmplitude: { value: this.options.waveAmplitude },
        waveColor: { value: new THREE.Vector3(...this.options.waveColor) },
        mousePos: { value: new THREE.Vector2(0, 0) },
        enableMouseInteraction: { value: this.options.enableMouseInteraction ? 1 : 0 },
        mouseRadius: { value: this.options.mouseRadius },
        colorNum: { value: this.options.colorNum },
        pixelSize: { value: this.options.pixelSize }
      }
    });
  }

  setupEventListeners() {
    // Mouse movement
    this.container.addEventListener('mousemove', (event) => {
      if (!this.options.enableMouseInteraction) return;
      
      const rect = this.container.getBoundingClientRect();
      const x = (event.clientX - rect.left) * window.devicePixelRatio;
      const y = (event.clientY - rect.top) * window.devicePixelRatio;
      
      this.mouse.x = x;
      this.mouse.y = y;
      
      this.waveMaterial.uniforms.mousePos.value.set(x, y);
    });

    // Window resize
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const width = this.container.offsetWidth;
    const height = this.container.offsetHeight;
    
    this.renderer.setSize(width, height);
    this.waveMaterial.uniforms.resolution.value.set(
      width * window.devicePixelRatio,
      height * window.devicePixelRatio
    );
  }

  animate() {
    if (!this.options.disableAnimation) {
      this.waveMaterial.uniforms.time.value = performance.now() * 0.001;
    }
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.animate());
  }

  // Method to update options dynamically
  updateOptions(newOptions) {
    Object.assign(this.options, newOptions);
    
    if (this.waveMaterial) {
      this.waveMaterial.uniforms.waveSpeed.value = this.options.waveSpeed;
      this.waveMaterial.uniforms.waveFrequency.value = this.options.waveFrequency;
      this.waveMaterial.uniforms.waveAmplitude.value = this.options.waveAmplitude;
      this.waveMaterial.uniforms.waveColor.value.set(...this.options.waveColor);
      this.waveMaterial.uniforms.enableMouseInteraction.value = this.options.enableMouseInteraction ? 1 : 0;
      this.waveMaterial.uniforms.mouseRadius.value = this.options.mouseRadius;
      this.waveMaterial.uniforms.colorNum.value = this.options.colorNum;
      this.waveMaterial.uniforms.pixelSize.value = this.options.pixelSize;
    }
  }

  // Cleanup method
  destroy() {
    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
    if (this.geometry) this.geometry.dispose();
    if (this.waveMaterial) this.waveMaterial.dispose();
  }
}

// Export for use
window.DitheredWaves = DitheredWaves;
