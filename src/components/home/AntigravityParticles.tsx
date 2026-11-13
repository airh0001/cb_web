import React, { useEffect, useRef } from "react";

interface AntigravityParticlesProps {
  className?: string;
  particleCount?: number;
  interactive?: boolean;
  theme?: "google" | "cyber";
}

export const AntigravityParticles: React.FC<AntigravityParticlesProps> = ({
  className = "",
  particleCount = 4200,
  interactive = true,
  theme = "google",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      depth: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.warn("WebGL not supported for Antigravity particles");
      return;
    }

    // Enable additive & smooth alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Vertex Shader matching Google Antigravity simulation
    const vsSource = `
      precision highp float;

      attribute vec2 aPosition;
      attribute vec4 aSeed;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uRingPos;
      uniform float uRingRadius;
      uniform float uRingWidth;
      uniform float uRingWidth2;
      uniform float uRingDisplacement;
      uniform float uParticleScale;
      uniform float uPixelRatio;

      varying vec2 vLocalPos;
      varying float vScale;
      varying float vNoiseColor;
      varying float vAngle;

      // Ian McEwan, Ashima Arts - Simplex 3D Noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 1.0/7.0;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vLocalPos = aPosition;

        float time = uTime * 0.42;
        float dist = distance(aPosition, uRingPos);

        // Multi-tier smoothstep ring displacement exactly as in Google Antigravity
        float noise0 = snoise(vec3(aPosition * 0.35 + vec2(18.4924, 72.9744), time * 0.5));
        float dist1 = distance(aPosition + (noise0 * 0.012), uRingPos);

        float t = smoothstep(uRingRadius - (uRingWidth * 2.0), uRingRadius, dist) 
                - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
        float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.2), uRingRadius, dist) 
                 - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
        float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

        t = pow(max(0.0, t), 2.0);
        t2 = pow(max(0.0, t2), 3.0);

        t += t2 * 3.2;
        t += t3 * 0.38;
        t += snoise(vec3(aPosition * 24.0 + vec2(11.49, 12.97), time * 0.5)) * t3 * 0.45;

        float nS = snoise(vec3(aPosition * 2.2 + vec2(18.49, 72.97), time * 0.5));
        t += pow(max(0.0, (nS + 1.5) * 0.5), 2.0) * 0.55;

        // Multi-scale noise fields
        float noise1 = snoise(vec3(aPosition * 3.5 + vec2(88.494, 32.4397), time * 0.35));
        float noise2 = snoise(vec3(aPosition * 3.5 + vec2(50.904, 120.947), time * 0.35));
        float noise3 = snoise(vec3(aPosition * 18.0 + vec2(18.49, 72.97), time * 0.5));
        float noise4 = snoise(vec3(aPosition * 18.0 + vec2(50.90, 120.95), time * 0.5));

        vec2 disp = vec2(noise1, noise2) * 0.038 + vec2(noise3, noise4) * 0.007;

        // Fluid organic ripple wave
        disp.x += sin((aPosition.x * 16.0) + (time * 3.5)) * 0.018 * clamp(dist, 0.0, 1.0);
        disp.y += cos((aPosition.y * 16.0) + (time * 3.0)) * 0.018 * clamp(dist, 0.0, 1.0);

        // Antigravity ring deflection
        vec2 currPos = aPosition + disp;
        currPos -= (uRingPos - currPos) * pow(max(0.0, t2), 0.75) * uRingDisplacement;

        vScale = clamp(t, 0.25, 2.8);

        // Fluid rotation angle with subtle noise flutter
        float noiseAngle = snoise(vec3(aPosition * 8.0 + vec2(18.49, 72.97), time * 0.7));
        vAngle = atan(aPosition.y - uRingPos.y, aPosition.x - uRingPos.x) + (noiseAngle * 0.35);

        // 3D Simplex color mapping
        float nc = snoise(vec3(aPosition * 1.8 + vec2(74.664, 91.556), time * 0.4));
        vNoiseColor = (nc + 1.0) * 0.5;

        // Aspect ratio correction
        float aspect = uResolution.x / uResolution.y;
        vec2 screenPos = currPos;
        screenPos.x /= aspect;

        gl_Position = vec4(screenPos, 0.0, 1.0);
        gl_PointSize = clamp((vScale * 14.5) * (uPixelRatio * 0.5) * uParticleScale, 2.0, 46.0);
      }
    `;

    // Fragment Shader
    const fsSource = `
      precision highp float;

      varying vec2 vLocalPos;
      varying float vScale;
      varying float vNoiseColor;
      varying float vAngle;

      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      uniform float uAlpha;

      // Signed distance function for rounded capsule / pill
      float sdRoundBox(in vec2 p, in vec2 b, in vec4 r) {
        r.xy = (p.x > 0.0) ? r.xy : r.zw;
        r.x  = (p.y > 0.0) ? r.x  : r.y;
        vec2 q = abs(p) - b + r.x;
        return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
      }

      vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        return mat2(c, s, -s, c) * v;
      }

      void main() {
        vec2 uv = gl_PointCoord.xy - vec2(0.5);
        uv.y *= -1.0;
        uv = rotate(uv, -vAngle);

        // Antigravity pill shape: rounded box
        float d = sdRoundBox(uv, vec2(0.38, 0.16), vec4(0.16));
        float pillAlpha = smoothstep(0.04, -0.04, d);

        // Three-stop gradient interpolation
        float h = 0.5;
        float progress = smoothstep(0.0, 0.85, pow(vNoiseColor, 1.8));
        vec3 col = mix(
          mix(uColor1, uColor2, clamp(progress / h, 0.0, 1.0)),
          mix(uColor2, uColor3, clamp((progress - h) / (1.0 - h), 0.0, 1.0)),
          step(h, progress)
        );

        float a = uAlpha * pillAlpha * smoothstep(0.12, 0.35, vScale);
        if (a < 0.01) {
          discard;
        }

        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Locations
    const aPositionLoc = gl.getAttribLocation(program, "aPosition");
    const aSeedLoc = gl.getAttribLocation(program, "aSeed");

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uRingPosLoc = gl.getUniformLocation(program, "uRingPos");
    const uRingRadiusLoc = gl.getUniformLocation(program, "uRingRadius");
    const uRingWidthLoc = gl.getUniformLocation(program, "uRingWidth");
    const uRingWidth2Loc = gl.getUniformLocation(program, "uRingWidth2");
    const uRingDisplacementLoc = gl.getUniformLocation(program, "uRingDisplacement");
    const uParticleScaleLoc = gl.getUniformLocation(program, "uParticleScale");
    const uPixelRatioLoc = gl.getUniformLocation(program, "uPixelRatio");
    const uColor1Loc = gl.getUniformLocation(program, "uColor1");
    const uColor2Loc = gl.getUniformLocation(program, "uColor2");
    const uColor3Loc = gl.getUniformLocation(program, "uColor3");
    const uAlphaLoc = gl.getUniformLocation(program, "uAlpha");

    // Color definitions
    // Google Antigravity Palette: #2c64ed (Royal Blue), #f84242 (Coral Red), #ffcf03 (Amber Yellow)
    // Cyber Palette: #38bdf8 (Sky Cyan), #f97316 (Neon Orange), #a855f7 (Purple Glow)
    const isCyber = theme === "cyber";
    const c1 = isCyber ? [0.22, 0.74, 0.97] : [0.17, 0.39, 0.93];
    const c2 = isCyber ? [0.98, 0.45, 0.09] : [0.97, 0.26, 0.26];
    const c3 = isCyber ? [0.66, 0.33, 0.97] : [1.0, 0.81, 0.01];

    gl.uniform3f(uColor1Loc, c1[0], c1[1], c1[2]);
    gl.uniform3f(uColor2Loc, c2[0], c2[1], c2[2]);
    gl.uniform3f(uColor3Loc, c3[0], c3[1], c3[2]);
    gl.uniform1f(uAlphaLoc, 0.95);
    gl.uniform1f(uRingRadiusLoc, 0.37);
    gl.uniform1f(uRingWidthLoc, 0.016);
    gl.uniform1f(uRingWidth2Loc, 0.125);
    gl.uniform1f(uRingDisplacementLoc, 0.65);
    gl.uniform1f(uParticleScaleLoc, 1.08);

    // Distribution
    const count = particleCount;
    const posArray = new Float32Array(count * 2);
    const seedArray = new Float32Array(count * 4);

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i * goldenRatio;
      const r = Math.sqrt((i + 0.5) / count) * 0.92;
      const jitterX = (Math.random() - 0.5) * 0.035;
      const jitterY = (Math.random() - 0.5) * 0.035;

      posArray[i * 2 + 0] = r * Math.cos(theta) + jitterX;
      posArray[i * 2 + 1] = r * Math.sin(theta) + jitterY;

      seedArray[i * 4 + 0] = Math.random();
      seedArray[i * 4 + 1] = Math.random();
      seedArray[i * 4 + 2] = Math.random();
      seedArray[i * 4 + 3] = Math.random();
    }

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, posArray, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const seedBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, seedArray, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(aSeedLoc);
    gl.vertexAttribPointer(aSeedLoc, 4, gl.FLOAT, false, 0, 0);

    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 300);
      height = Math.max(rect.height, 300);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uPixelRatioLoc, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse & Touch Physics
    const mouse = {
      targetX: 0.0,
      targetY: 0.0,
      currentX: 0.0,
      currentY: 0.0,
      isActive: false,
    };

    const updateCoords = (clientX: number, clientY: number) => {
      if (!interactive || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      const aspect = rect.width / rect.height;
      mouse.targetX = x * aspect * 0.45;
      mouse.targetY = y * 0.45;
      mouse.isActive = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchend", handleMouseLeave);

    // Render loop
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Organic idle drift when pointer is idle
      const idleTime = elapsed * 0.7;
      const idleX = Math.sin(idleTime * 0.8) * 0.16 + Math.sin(idleTime * 1.5) * 0.08;
      const idleY = Math.cos(idleTime * 0.9) * 0.12 + Math.cos(idleTime * 1.8) * 0.05;

      const destX = mouse.isActive ? mouse.targetX : idleX;
      const destY = mouse.isActive ? mouse.targetY : idleY;

      // Spring lerp
      mouse.currentX += (destX - mouse.currentX) * 0.042;
      mouse.currentY += (destY - mouse.currentY) * 0.042;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uRingPosLoc, mouse.currentX, mouse.currentY);

      gl.drawArrays(gl.POINTS, 0, count);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchend", handleMouseLeave);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(seedBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [particleCount, interactive, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ touchAction: "none" }}
    />
  );
};

export default AntigravityParticles;
