import { useState } from 'react';
import styles from '../styles/Gallery.module.css';
import PropTypes from 'prop-types';

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
          <div key={src} className={styles.masonryItem} onClick={() => { openLightbox(idx); setTimeout(() => {
            const elem = document.querySelector('.'+styles.lightboxContent);
            if (elem && elem.requestFullscreen) elem.requestFullscreen();
          }, 10); }}>
            <div className={styles.mediaWrapper}>
              {isImage(src) ? (
                <img src={src} alt={`Gallery image ${idx+1}`} className={glossy ? styles.glossy : ''} loading="lazy" />
              ) : isVideo(src) ? (
                <video src={src} className={styles.videoThumb} preload="metadata" muted playsInline />
              ) : null}
              <div className={styles.logoMark}><img src="/logo.png" alt="MirrorAndMyst Logo" /></div>
            </div>
          </div>
        ))}
      </div>
      {lightboxIdx !== null && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div
            className={styles.lightboxContent}
            onClick={e => e.stopPropagation()}
            onDoubleClick={e => {
              e.stopPropagation();
              const elem = e.currentTarget.querySelector('.'+styles.lightboxImg);
              if (elem && elem.requestFullscreen) elem.requestFullscreen();
            }}
          >
            <button className={styles.lightboxNav} onClick={()=>goto(-1)}>&lt;</button>
            {isImage(galleryMedia[lightboxIdx]) ? (
              <img src={galleryMedia[lightboxIdx]} alt="Fullscreen" className={styles.lightboxImg} />
            ) : isVideo(galleryMedia[lightboxIdx]) ? (
              <video src={galleryMedia[lightboxIdx]} controls autoPlay className={styles.lightboxImg} />
            ) : null}
            <img src="/logo.png" alt="Logo" className={styles.lightboxLogo} />
            <button className={styles.lightboxNav} onClick={()=>goto(1)}>&gt;</button>
            <button className={styles.lightboxClose} onClick={closeLightbox}>×</button>
            <button
              className={styles.lightboxFullscreen}
              title="Go Fullscreen"
              onClick={e => {
                e.stopPropagation();
                const elem = e.currentTarget.parentElement.querySelector('.'+styles.lightboxImg);
                if (elem && elem.requestFullscreen) elem.requestFullscreen();
              }}
            >⛶</button>
          </div>
        </div>
      )}
    </>
  );
}

GalleryGrid.propTypes = {
  glossy: PropTypes.bool,
  ultraHQ: PropTypes.bool,
  media: PropTypes.array
};
