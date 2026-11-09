import { useEffect, useRef } from "react";

export const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 220,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Grid configuration
    const cols = 38;
    const rows = 26;

    let frame = 0;

    const render = () => {
      frame++;
      
      // Easing mouse coordinates
      if (mouse.active) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x += (-1000 - mouse.x) * 0.08;
        mouse.y += (-1000 - mouse.y) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      // Camera parameters
      const pitch = 1.1; // tilt angle (about 63 degrees)
      const yaw = Math.sin(frame * 0.001) * 0.08; // slow horizontal sway
      
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);

      const cameraDist = 580;
      const focalLength = 650;
      const centerX = width / 2;
      const centerY = height / 2.3; // position grid slightly higher to fade into distance

      const spacingX = (width * 1.55) / cols;
      const spacingY = (height * 1.6) / rows;

      // 1. Calculate projected coordinates of all grid points
      const projectedPoints: { sx: number; sy: number; depth: number }[][] = [];

      for (let c = 0; c < cols; c++) {
        projectedPoints[c] = [];
        for (let r = 0; r < rows; r++) {
          const xLocal = (c - cols / 2) * spacingX;
          const yLocal = (r - rows / 2) * spacingY;

          // Procedural wave calculations
          const timeScale = frame * 0.015;
          const wave1 = Math.sin(c * 0.18 + timeScale) * 35;
          const wave2 = Math.cos(r * 0.18 + timeScale * 0.8) * 25;
          const wave3 = Math.sin((c + r) * 0.09 + timeScale * 1.2) * 15;
          let zLocal = wave1 + wave2 + wave3;

          // 3D coordinate transformation
          // Yaw rotation (around Y axis)
          let rx = xLocal * cosYaw + zLocal * sinYaw;
          let ry = yLocal;
          let rz = -xLocal * sinYaw + zLocal * cosYaw;

          // Pitch rotation (around X axis)
          let rx2 = rx;
          let ry2 = ry * cosPitch - rz * sinPitch;
          let rz2 = ry * sinPitch + rz * cosPitch;

          // Shift camera along Z-axis
          let rz3 = rz2 + cameraDist;
          let rx3 = rx2;
          let ry3 = ry2;

          // 3D Perspective Projection
          let sx = centerX + (rx3 * focalLength) / rz3;
          let sy = centerY + (ry3 * focalLength) / rz3;

          // 2. Mouse interactive deformation (Direct screen space + 3D height warp)
          if (mouse.x !== -1000 && mouse.active) {
            const dx = sx - mouse.x;
            const dy = sy - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              const pushForce = Math.pow(force, 1.8);
              
              // Push screen coordinates away elastically
              sx += (dx / dist) * pushForce * 40;
              sy += (dy / dist) * pushForce * 30;
            }
          }

          projectedPoints[c].push({
            sx,
            sy,
            depth: rz3,
          });
        }
      }

      // 3. Draw Connecting Grid Lines
      ctx.save();
      const minDepth = cameraDist - rows * spacingY * sinPitch * 0.5;
      const maxDepth = cameraDist + rows * spacingY * sinPitch * 0.5;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const curr = projectedPoints[c][r];

          // Draw connections to right and bottom neighbors
          const neighbors = [];
          if (c < cols - 1) neighbors.push(projectedPoints[c + 1][r]);
          if (r < rows - 1) neighbors.push(projectedPoints[c][r + 1]);

          neighbors.forEach((nb) => {
            // Compute average depth
            const avgDepth = (curr.depth + nb.depth) / 2;
            
            // Normalize depth to [0, 1] range for atmospheric haze
            const depthRatio = Math.max(0, Math.min(1, (avgDepth - minDepth) / (maxDepth - minDepth)));
            
            // Fade lines as they recede
            const opacity = Math.max(0.015, (1 - depthRatio) * 0.16);
            const lineWidth = Math.max(0.35, (1 - depthRatio) * 1.1);

            // Interpolate colors based on depth (Orange in foreground, Cyan in background)
            // Orange RGB: (249, 115, 22), Cyan RGB: (6, 182, 212)
            const rVal = Math.floor(249 + (6 - 249) * depthRatio);
            const gVal = Math.floor(115 + (182 - 115) * depthRatio);
            const bVal = Math.floor(22 + (212 - 22) * depthRatio);

            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${opacity})`;

            ctx.beginPath();
            ctx.moveTo(curr.sx, curr.sy);
            ctx.lineTo(nb.sx, nb.sy);
            ctx.stroke();
          });
        }
      }

      // 4. Draw Glow Nodes (faint glowing dots at key mesh intersections)
      for (let c = 0; c < cols; c += 2) {
        for (let r = 0; r < rows; r += 2) {
          const p = projectedPoints[c][r];
          const depthRatio = Math.max(0, Math.min(1, (p.depth - minDepth) / (maxDepth - minDepth)));
          
          const opacity = Math.max(0.02, (1 - depthRatio) * 0.35);
          const radius = Math.max(0.8, (1 - depthRatio) * 2.2);

          const rVal = Math.floor(249 + (6 - 249) * depthRatio);
          const gVal = Math.floor(115 + (182 - 115) * depthRatio);
          const bVal = Math.floor(22 + (212 - 22) * depthRatio);

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rVal}, ${gVal}, ${bVal}, ${opacity})`;
          ctx.fill();
        }
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none block h-full w-full bg-transparent"
      style={{ zIndex: 1 }}
    />
  );
};
