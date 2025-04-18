import { useEffect, useRef } from 'react';

function randomPetal(W, H) {
  const colors = ['#ffe4e1','#fffbe6','#fbe7ff','#ffd1dc','#fff0f5'];
  return {
    x: Math.random() * W,
    y: -40 - Math.random() * 60,
    r: 18 + Math.random() * 22,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * 2 * Math.PI,
    speed: 0.7 + Math.random() * 0.7,
    rotSpeed: (Math.random() - 0.5) * 0.02,
    alpha: 0.28 + Math.random() * 0.22,
    drift: (Math.random() - 0.5) * 0.6,
  };
}

export default function PetalOverlay({ enabled = true }) {
  const ref = useRef();
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let petals = [];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function drawPetal(p) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.r/2, -p.r/2, -p.r, p.r/2, 0, p.r);
      ctx.bezierCurveTo(p.r, p.r/2, p.r/2, -p.r/2, 0, 0);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 7;
      ctx.fill();
      ctx.restore();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (petals.length < 8) {
        petals.push(randomPetal(W, H));
      }
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        drawPetal(p);
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.rotSpeed;
        if (p.y > H + 60) {
          petals.splice(i, 1);
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
        zIndex: 2,
        mixBlendMode: 'soft-light',
      }}
    />
  );
}
