import { useEffect, useRef } from 'react';

function randomSnowflake(W, H) {
  return {
    x: Math.random() * W,
    y: -10 - Math.random() * 40,
    r: 2 + Math.random() * 3,
    speed: 0.5 + Math.random() * 1.3,
    drift: (Math.random() - 0.5) * 0.6,
    alpha: 0.5 + Math.random() * 0.5,
  };
}

function drawSnowflake(ctx, s) {
  ctx.save();
  ctx.globalAlpha = s.alpha;
  ctx.beginPath();
  ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}

export default function Snowfall() {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let snowflakes = [];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (snowflakes.length < 40) {
        snowflakes.push(randomSnowflake(W, H));
      }
      for (let i = 0; i < snowflakes.length; i++) {
        const s = snowflakes[i];
        drawSnowflake(ctx, s);
        s.y += s.speed;
        s.x += s.drift;
        if (s.y > H + 10) {
          snowflakes.splice(i, 1);
          i--;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

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
