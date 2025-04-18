import styles from '../styles/CreativeFooter.module.css';

export default function CreativeFooter() {
  return (
    <footer className={styles.creativeFooter}>
      {/* Removed gardenWrap for a single, clean bottom */}
      <div className={styles.footerText}>
        <span>✨ Mirror & Myst Bridal Artistry ✨</span>
      </div>
    </footer>
  );
}
