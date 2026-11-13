import React, { useEffect, useRef } from "react";

export const InteractiveBackground: React.FC = () => {
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
      console.warn("WebGL not supported for global Antigravity background");
      return;
    }

    // Enable high-fidelity alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Vertex Shader: Google Antigravity simulation mathematics
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

        // Exact multi-tier smoothstep formula from Google Antigravity
        float noise0 = snoise(vec3(aPosition * 0.4 + vec2(18.4924, 72.9744), time * 0.5));
        float dist1 = distance(aPosition + (noise0 * 0.012), uRingPos);

        float t = smoothstep(uRingRadius - (uRingWidth * 2.0), uRingRadius, dist) 
                - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
        float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.2), uRingRadius, dist) 
                 - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
        float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

        t = pow(max(0.0, t), 2.0);
        t2 = pow(max(0.0, t2), 3.0);

        t += t2 * 3.2;
        t += t3 * 0.4;
        t += snoise(vec3(aPosition * 26.0 + vec2(11.49, 12.97), time * 0.5)) * t3 * 0.45;

        float nS = snoise(vec3(aPosition * 2.2 + vec2(18.49, 72.97), time * 0.5));
        t += pow(max(0.0, (nS + 1.5) * 0.5), 2.0) * 0.55;

        // Multi-scale noise displacement
        float noise1 = snoise(vec3(aPosition * 3.5 + vec2(88.494, 32.4397), time * 0.35));
        float noise2 = snoise(vec3(aPosition * 3.5 + vec2(50.904, 120.947), time * 0.35));
        float noise3 = snoise(vec3(aPosition * 18.0 + vec2(18.49, 72.97), time * 0.5));
        float noise4 = snoise(vec3(aPosition * 18.0 + vec2(50.90, 120.95), time * 0.5));

        vec2 disp = vec2(noise1, noise2) * 0.034 + vec2(noise3, noise4) * 0.007;

        // Fluid organic ripple
        disp.x += sin((aPosition.x * 16.0) + (time * 3.2)) * 0.016 * clamp(dist, 0.0, 1.0);
        disp.y += cos((aPosition.y * 16.0) + (time * 2.8)) * 0.016 * clamp(dist, 0.0, 1.0);

        // Antigravity ring deflection
        vec2 currPos = aPosition + disp;
        currPos -= (uRingPos - currPos) * pow(max(0.0, t2), 0.75) * uRingDisplacement;

        vScale = clamp(t, 0.25, 2.6);

        // Rotational angle tangential to ring with simplex flutter
        float noiseAngle = snoise(vec3(aPosition * 8.0 + vec2(18.49, 72.97), time * 0.7));
        vAngle = atan(aPosition.y - uRingPos.y, aPosition.x - uRingPos.x) + (noiseAngle * 0.35);

        // Color noise index
        float nc = snoise(vec3(aPosition * 1.8 + vec2(74.664, 91.556), time * 0.4));
        vNoiseColor = (nc + 1.0) * 0.5;

        // Truly isotropic portrait and landscape mapping
        float aspect = uResolution.x / uResolution.y;
        vec2 clipPos;
        if (aspect >= 1.0) {
          clipPos = vec2(currPos.x / aspect, currPos.y);
        } else {
          clipPos = vec2(currPos.x, currPos.y * aspect);
        }

        gl_Position = vec4(clipPos, 0.0, 1.0);

        // Point size tuned for crisp, radiant micro-pills across high-DPI mobile & desktop
        gl_PointSize = clamp((vScale * 9.5) * (uPixelRatio * 0.5) * uParticleScale, 2.0, 22.0);
      }
    `;

    // Fragment Shader: Google Antigravity rounded pill rasterizer
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

      // Signed distance function for rounded box / capsule pill
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

        // Antigravity pill shape: rounded box with smooth anti-aliased edge
        float d = sdRoundBox(uv, vec2(0.38, 0.17), vec4(0.17));
        float pillAlpha = smoothstep(0.05, -0.05, d);

        // 3-stop rich Google spectrum blending
        float h = 0.5;
        float progress = smoothstep(0.0, 0.85, pow(vNoiseColor, 1.8));
        vec3 col = mix(
          mix(uColor1, uColor2, clamp(progress / h, 0.0, 1.0)),
          mix(uColor2, uColor3, clamp((progress - h) / (1.0 - h), 0.0, 1.0)),
          step(h, progress)
        );

        float a = uAlpha * pillAlpha * smoothstep(0.12, 0.38, vScale);
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

    // Google Antigravity authentic vibrant spectral colors:
    // Color 1: #2c64ed (Electric Royal Blue)
    // Color 2: #f84242 (Vibrant Coral Red)
    // Color 3: #ffcf03 (Radiant Amber Gold)
    gl.uniform3f(uColor1Loc, 0.17, 0.39, 0.93);
    gl.uniform3f(uColor2Loc, 0.97, 0.26, 0.26);
    gl.uniform3f(uColor3Loc, 1.0, 0.81, 0.01);
    gl.uniform1f(uAlphaLoc, 0.94);

    // Authentic Antigravity ring proportions (clear, grand, centered)
    gl.uniform1f(uRingRadiusLoc, 0.35);
    gl.uniform1f(uRingWidthLoc, 0.014);
    gl.uniform1f(uRingWidth2Loc, 0.115);
    gl.uniform1f(uRingDisplacementLoc, 0.58);
    gl.uniform1f(uParticleScaleLoc, 0.88);

    // Generate 5,200 uniformly distributed particles
    const count = 5200;
    const posArray = new Float32Array(count * 2);
    const seedArray = new Float32Array(count * 4);

    let initialAspect = window.innerWidth / Math.max(window.innerHeight, 1);
    if (!Number.isFinite(initialAspect) || initialAspect <= 0) initialAspect = 1.77;

    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i * goldenRatio;
      const r = Math.sqrt((i + 0.5) / count) * 1.18;
      const jitterX = (Math.random() - 0.5) * 0.035;
      const jitterY = (Math.random() - 0.5) * 0.035;

      posArray[i * 2 + 0] = r * Math.cos(theta) * initialAspect + jitterX;
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

    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(uPixelRatioLoc, dpr);
      gl.uniform1f(uParticleScaleLoc, isMobile ? 0.72 : 0.88);
      gl.uniform1f(uRingRadiusLoc, isMobile ? 0.38 : 0.35);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse & Touch tracking with isotropic normalization
    const mouse = {
      targetX: 0.0,
      targetY: 0.0,
      currentX: 0.0,
      currentY: 0.0,
      isActive: false,
    };

    const updateCoords = (clientX: number, clientY: number) => {
      const aspect = window.innerWidth / Math.max(window.innerHeight, 1);
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -((clientY / window.innerHeight) * 2 - 1);

      if (aspect >= 1.0) {
        mouse.targetX = normX * aspect * 0.7;
        mouse.targetY = normY * 0.7;
      } else {
        mouse.targetX = normX * 0.7;
        mouse.targetY = (normY / aspect) * 0.7;
      }
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

    // Smooth 60fps render loop with natural idle drift
    let animId: number;
    const startTime = performance.now();

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;

      // Natural gravitational idle sway
      const idleTime = elapsed * 0.6;
      const currentAspect = window.innerWidth / Math.max(window.innerHeight, 1);
      const idleX = (Math.sin(idleTime * 0.75) * 0.28 + Math.sin(idleTime * 1.35) * 0.12) * currentAspect * 0.45;
      const idleY = Math.cos(idleTime * 0.8) * 0.2 + Math.cos(idleTime * 1.5) * 0.08;

      const destX = mouse.isActive ? mouse.targetX : idleX;
      const destY = mouse.isActive ? mouse.targetY : idleY;

      mouse.currentX += (destX - mouse.currentX) * 0.045;
      mouse.currentY += (destY - mouse.currentY) * 0.045;

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
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ touchAction: "none" }}
      />
      {/* Subtle atmospheric radial spotlight matching Google Antigravity */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_65%_at_50%_40%,rgba(15,23,42,0)_0%,rgba(9,9,11,0.55)_65%,rgba(9,9,11,0.92)_100%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52rem] h-[52rem] bg-gradient-to-tr from-blue-600/12 via-orange-500/12 to-amber-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
    </div>
  );
};

export default InteractiveBackground;
