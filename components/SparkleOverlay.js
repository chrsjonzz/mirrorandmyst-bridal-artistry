import { useEffect, useRef } from 'react';

export default function SparkleOverlay({ enabled = true }) {
  const ref = useRef();

  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let sparkles = [];
    const colors = ['#fffbe6', '#ffd700', '#ffe4e1', '#fbe7ff', '#ffecd2'];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function createSparkle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.7 + Math.random() * 1.7,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.4 + Math.random() * 0.5,
        dx: (Math.random() - 0.5) * 0.2,
        dy: -0.1 - Math.random() * 0.15,
        life: 0,
        maxLife: 120 + Math.random() * 60
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (sparkles.length < 30) {
        sparkles.push(createSparkle());
      }
      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        ctx.save();
        ctx.globalAlpha = s.alpha * (1 - s.life / s.maxLife);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.restore();
        s.x += s.dx;
        s.y += s.dy;
        s.life++;
        if (s.life > s.maxLife) {
          sparkles.splice(i, 1);
          i--;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 3,
        mixBlendMode: 'screen',
      }}
    />
  );
}
