import { useEffect } from 'react';

function spawnSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.style.position = 'fixed';
  sparkle.style.left = x - 10 + 'px';
  sparkle.style.top = y - 10 + 'px';
  sparkle.style.width = '22px';
  sparkle.style.height = '22px';
  sparkle.style.pointerEvents = 'none';
  sparkle.style.zIndex = 9999;
  sparkle.style.opacity = 1;
  sparkle.style.transition = 'opacity 0.7s cubic-bezier(.4,2,.7,1)';
  sparkle.style.filter = 'drop-shadow(0 0 8px #fffbe6) drop-shadow(0 0 16px #ffd700)';
  sparkle.innerHTML = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#glow)">
      <path d="M11 2l1.5 5.5L18 9l-5.5 1.5L11 18l-1.5-7.5L2 9l5.5-1.5L11 2z" fill="#fffbe6" stroke="#ffd700" stroke-width="1.2"/>
    </g>
    <defs>
      <filter id="glow" x="-6" y="-6" width="34" height="34" filterUnits="userSpaceOnUse">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  </svg>`;
  document.body.appendChild(sparkle);
  setTimeout(() => {
    sparkle.style.opacity = 0;
    setTimeout(() => sparkle.remove(), 700);
  }, 80);
}

export default function ClickSparkle({ enabled = true }) {
  if (!enabled) return null;
  useEffect(() => {
    function handleClick(e) {
      spawnSparkle(e.clientX, e.clientY);
    }
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);
  return null;
}
