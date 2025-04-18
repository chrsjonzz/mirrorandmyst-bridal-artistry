import styles from '../styles/ShiningStar.module.css';

export default function ShiningStar() {
  return (
    <span className={styles.star}>
      <svg width="13" height="13" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#glow)">
          <path d="M9 2 L10.2 7.2 L15 9 L10.2 10.8 L9 16 L7.8 10.8 L3 9 L7.8 7.2 Z" fill="#fff8d6"/>
        </g>
        <defs>
          <filter id="glow" x="-5" y="-5" width="28" height="28" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>
    </span>
  );
}
