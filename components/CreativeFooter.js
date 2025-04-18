import styles from '../styles/CreativeFooter.module.css';

export default function CreativeFooter() {
  return (
    <footer className={styles.creativeFooter}>
      <div className={styles.gardenWrap}>
        <div className={styles.gardenFlowers}>
          <span className={styles.flower1}></span>
          <span className={styles.flower2}></span>
          <span className={styles.flower3}></span>
          <span className={styles.flower4}></span>
          <span className={styles.flower5}></span>
        </div>
        <div className={styles.gardenGrass}></div>
        <div className={styles.gardenSparkles}>
          {[...Array(12)].map((_, i) => <span key={i} className={styles.sparkle}></span>)}
        </div>
      </div>
      <div className={styles.footerText}>
        <span>✨ Mirror & Myst Bridal Artistry ✨</span>
      </div>
    </footer>
  );
}
