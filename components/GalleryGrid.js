import { useState } from 'react';
import styles from '../styles/Gallery.module.css';
import PropTypes from 'prop-types';
import Image from 'next/image';
import SpringLightbox from './SpringLightbox';

const images = [
  '/gallary/img (1).JPG',
  '/gallary/img (2).JPG',
  '/gallary/img (3).JPG',
  '/gallary/img (4).JPG',
  '/gallary/img (5).JPG',
  '/gallary/img (6).JPG',
  '/gallary/img (7).JPG',
  '/gallary/img (8).JPG',
  '/gallary/img (9).JPG',
  '/gallary/img (10).JPG',
  '/gallary/img (11).JPG',
  '/gallary/img (12).JPG',
  '/gallary/img (13).JPG',
  '/gallary/img (14).JPG',
];

const isImage = (src) => /\.(jpg|jpeg|png|webp|gif)$/i.test(src);
const isVideo = (src) => /\.(mp4|webm|ogg)$/i.test(src);

export default function GalleryGrid({ glossy, ultraHQ, media }) {
  const galleryMedia = media && media.length ? media : images;
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const goto = (dir) => setLightboxIdx(i => {
    if (i === null) return null;
    const len = galleryMedia.length;
    return (i + dir + len) % len;
  });

  return (
    <>
      <div className={styles.masonryGrid}>
        {galleryMedia.map((src, idx) => (
          <div key={src} className={styles.masonryItem} onClick={() => {
            openLightbox(idx);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
          }}>
            <div className={styles.mediaWrapper}>
              {isImage(src) ? (
                <Image
                  src={src.replace('.JPG', '.webp').replace('.jpg', '.webp')}
                  alt={`Gallery image ${idx+1}`}
                  width={800}
                  height={1200}
                  quality={90}
                  style={{
                    borderRadius: '1.2rem',
                    boxShadow: '0 8px 36px #000b, 0 2px 10px #fffbe6cc',
                    background: '#18141d',
                    objectFit: 'cover',
                  }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={idx < 3}
                />
              ) : isVideo(src) ? (
                <video src={src} className={styles.videoThumb} preload="metadata" muted playsInline />
              ) : null}
              <div className={styles.logoMark}><Image src="/logo.png" alt="MirrorAndMyst Logo" width={120} height={40} /></div>
            </div>
          </div>
        ))}
      </div>
      {lightboxIdx !== null && (
        <SpringLightbox
          images={galleryMedia.map(src => src.replace('.JPG', '.webp').replace('.jpg', '.webp'))}
          currentIndex={lightboxIdx}
          onClose={() => { closeLightbox(); document.body.style.overflow = ''; }}
          onMovePrev={() => goto(-1)}
          onMoveNext={() => goto(1)}
        />
      )}
    </>
  );
}

GalleryGrid.propTypes = {
  glossy: PropTypes.bool,
  ultraHQ: PropTypes.bool,
  media: PropTypes.array
};
