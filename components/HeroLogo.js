import Image from 'next/image';
import styles from '../styles/HeroLogo.module.css';

export default function HeroLogo() {
  return (
    <div className={styles.heroLogoWrap}>
      <div className={styles.floralFrame}>
        {/* Lively, organic curved branch with animated leaves */}
        <svg className={styles.floralLeft} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 90 Q60 30 110 20" stroke="url(#leafGold)" strokeWidth="3" fill="none"/>
          {/* Animated leaves along the path */}
          <g className={styles.animatedLeaf}>
            <ellipse cx="35" cy="65" rx="7" ry="18" fill="url(#leafGradient)"/>
            <ellipse cx="60" cy="50" rx="6" ry="15" fill="url(#leafGradient)"/>
            <ellipse cx="85" cy="35" rx="5" ry="12" fill="url(#leafGradient)"/>
          </g>
          <defs>
            <linearGradient id="leafGold" x1="0" y1="0" x2="120" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffe3ec"/>
              <stop offset="0.7" stopColor="#bfa76a"/>
              <stop offset="1" stopColor="#fffbe6"/>
            </linearGradient>
            <linearGradient id="leafGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
              <stop stopColor="#fffbe6"/>
              <stop offset="0.7" stopColor="#bfa76a"/>
              <stop offset="1" stopColor="#ffe3ec"/>
            </linearGradient>
          </defs>
        </svg>
        {/* Right floral accent */}
        <svg className={styles.floralRight} viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 80 Q30 40 50 10" stroke="url(#goldFloral)" strokeWidth="2.5" fill="none"/>
          <ellipse cx="50" cy="10" rx="6" ry="9" fill="url(#goldFloral)" opacity="0.16"/>
        </svg>
      </div>
      <div className={styles.palmWrap}>
        {/* Enhanced SVG Palm Leaf with gold gradient and more detail */}
        <svg className={styles.palmLeaf} viewBox="0 0 340 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="palmGold" x1="0" y1="60" x2="340" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffe3ec"/>
              <stop offset="0.5" stopColor="#bfa76a"/>
              <stop offset="1" stopColor="#fffbe6"/>
            </linearGradient>
          </defs>
          <path d="M30 90 C80 30 200 30 310 90" stroke="url(#palmGold)" strokeWidth="4" fill="none"/>
          <path d="M60 70 Q80 60 90 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M80 60 Q100 50 110 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M100 50 Q120 40 130 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M120 45 Q140 35 150 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M140 40 Q160 30 170 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M160 35 Q180 25 190 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M180 30 Q200 20 210 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M200 35 Q220 25 230 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          <path d="M220 45 Q240 35 250 80" stroke="url(#palmGold)" strokeWidth="2" fill="none"/>
          {/* Decorative sparkles */}
          <circle cx="85" cy="60" r="2.5" fill="#fffbe6" opacity="0.85" />
          <circle cx="175" cy="35" r="1.7" fill="#fffbe6" opacity="0.7" />
          <circle cx="220" cy="40" r="2.2" fill="#ffe3ec" opacity="0.7" />
        </svg>
        {/* Sparkle accent */}
        <svg className={styles.palmAccent} viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#glow)">
            <path d="M19 0 L21 15 L38 19 L21 23 L19 38 L17 23 L0 19 L17 15 Z" fill="#fffbe6"/>
          </g>
          <defs>
            <filter id="glow" x="-10" y="-10" width="58" height="58" filterUnits="userSpaceOnUse">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
      <div className={styles.textWrap}>
        <span className={styles.brandMain} style={{fontFamily: 'Amsterdam, A Quiet Sleep, cursive', fontSize: '3.2rem', letterSpacing: '0.02em'}}>
          MirrorAndMyst
        </span>
        <svg className={styles.brandUnderline} viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10 Q60 0 115 10" stroke="url(#goldLine)" strokeWidth="3" fill="none"/>
          <defs>
            <linearGradient id="goldLine" x1="0" y1="8" x2="120" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffe3ec"/>
              <stop offset="0.5" stopColor="#bfa76a"/>
              <stop offset="1" stopColor="#fffbe6"/>
            </linearGradient>
          </defs>
        </svg>
        <span className={styles.brandSub}>Bridal Artistry</span>
      </div>
    </div>
  );
}
