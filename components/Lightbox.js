import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export default function GalleryLightbox({
  images, currentIndex, onClose, onMovePrev, onMoveNext
}) {
  return (
    <Lightbox
      mainSrc={images[currentIndex]}
      nextSrc={images[(currentIndex + 1) % images.length]}
      prevSrc={images[(currentIndex + images.length - 1) % images.length]}
      onCloseRequest={onClose}
      onMovePrevRequest={onMovePrev}
      onMoveNextRequest={onMoveNext}
      enableZoom={true}
      imagePadding={40}
      animationDuration={320}
    />
  );
}
