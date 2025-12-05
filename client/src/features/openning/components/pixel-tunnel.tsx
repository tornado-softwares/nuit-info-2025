import { useEffect, useRef } from "react";

const PALETTE = [
  { r: 0, g: 120, b: 215 },   // Accent Blue
  { r: 66, g: 156, b: 227 },  // Light Blue
  { r: 0, g: 90, b: 158 },    // Dark Blue
  { r: 0, g: 30, b: 80 },     // Navy
  { r: 16, g: 16, b: 16 },    // Blackish
];

const PIXEL_SCALE = 8;

export function PixelTunnel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 1;
    let height = 1;

    const resize = () => {
      width = Math.max(1, Math.ceil(window.innerWidth / PIXEL_SCALE));
      height = Math.max(1, Math.ceil(window.innerHeight / PIXEL_SCALE));
      canvas.width = width;
      canvas.height = height;
    };

    const animate = () => {
      timeRef.current += 0.05;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      const cx = width / 2;
      const cy = height / 2;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = (x - cx) / cy;
          const dy = (y - cy) / cy;

          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 0.05) distance = 0.05;

          const angle = Math.atan2(dy, dx);
          const depth = 1.0 / distance + timeRef.current;
          const twist = angle * 2.0;
          const patternValue = depth + twist;

          let colorIndex = Math.floor(patternValue * 2.0) % PALETTE.length;
          if (colorIndex < 0) colorIndex += PALETTE.length;
          const color = PALETTE[colorIndex];

          const index = (y * width + x) * 4;
          data[index] = color.r;
          data[index + 1] = color.g;
          data[index + 2] = color.b;
          data[index + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
