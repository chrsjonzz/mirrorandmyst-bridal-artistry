import GalleryGrid from '../components/GalleryGrid';
import styles from '../styles/Gallery.module.css';

export default function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      <h1 className={styles.galleryTitle}>Gallery</h1>
      <GalleryGrid glossy ultraHQ />
    </div>
  );
}
