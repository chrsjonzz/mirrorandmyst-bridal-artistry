import { useEffect, useRef } from 'react';

const LEAF_SHAPES = [
  // Classic fig/oval
  (ctx, r) => { ctx.moveTo(0, 0); ctx.bezierCurveTo(-r/2, -r/2, -r, r/2, 0, r); ctx.bezierCurveTo(r, r/2, r/2, -r/2, 0, 0); },
  // Maple-like (autumn)
  (ctx, r) => { ctx.moveTo(0, 0); ctx.lineTo(-r/2, r/3); ctx.lineTo(-r/3, r); ctx.lineTo(0, r*0.7); ctx.lineTo(r/3, r); ctx.lineTo(r/2, r/3); ctx.lineTo(0, 0); },
  // Spring bud/tear
  (ctx, r) => { ctx.moveTo(0, 0); ctx.quadraticCurveTo(-r/2, r*0.7, 0, r); ctx.quadraticCurveTo(r/2, r*0.7, 0, 0); },
];

const SPRING_COLORS = ['#b6d67b','#8fc866','#d1e6a5','#c3e6b2','#a5c97b','#e5ffd6','#c1ffb0'];
const AUTUMN_COLORS = ['#ffb347','#ff7f50','#ff9966','#d2691e','#c97b63','#e5c07b','#ffe4b5'];

function randomLeaf(W, H, season) {
  const shape = Math.floor(Math.random() * LEAF_SHAPES.length);
  const color = (season === 'autumn' ? AUTUMN_COLORS : SPRING_COLORS)[Math.floor(Math.random() * (season === 'autumn' ? AUTUMN_COLORS.length : SPRING_COLORS.length))];
  const angle = Math.random() * 2 * Math.PI;
  return {
    x: Math.random() * W,
    y: -40 - Math.random() * 60,
    r: 16 + Math.random() * 22,
    color,
    angle,
    shape,
    speed: 0.7 + Math.random() * 1.1,
    rotSpeed: (Math.random() - 0.5) * 0.025,
    alpha: 0.38 + Math.random() * 0.51,
    drift: (Math.random() - 0.5) * 0.7,
  };
}

function drawLeaf(ctx, l) {
  ctx.save();
  ctx.globalAlpha = l.alpha;
  ctx.translate(l.x, l.y);
  ctx.rotate(l.angle);
  ctx.beginPath();
  LEAF_SHAPES[l.shape](ctx, l.r);
  ctx.closePath();
  ctx.fillStyle = l.color;
  ctx.shadowColor = l.color;
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
}

export default function LeafOverlay({ season = 'spring', enabled = true }) {
  const ref = useRef();
  useEffect(() => {
    if (!enabled) return;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let leaves = [];
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (leaves.length < 4) {
        leaves.push(randomLeaf(W, H, season));
      }
      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        drawLeaf(ctx, l);
        l.y += l.speed;
        l.x += l.drift;
        l.angle += l.rotSpeed;
        if (l.y > H + 60) {
          leaves.splice(i, 1);
          i--;
        }
      }
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
  }, [season, enabled]);

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
