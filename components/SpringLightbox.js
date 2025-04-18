import React from 'react';
import Lightbox from 'react-spring-lightbox';

export default function SpringLightbox({ images, currentIndex, onClose, onMovePrev, onMoveNext }) {
  return (
    <Lightbox
      images={images.map((src) => ({ src }))}
      isOpen={currentIndex !== null}
      currentIndex={currentIndex || 0}
      onPrev={onMovePrev}
      onNext={onMoveNext}
      onClose={onClose}
      /* You can customize animationDuration and other props here */
      pageTransitionConfig={{ from: { opacity: 0, transform: 'scale(0.96)' }, enter: { opacity: 1, transform: 'scale(1)' }, leave: { opacity: 0, transform: 'scale(0.96)' }, config: { mass: 1, tension: 320, friction: 32 } }}
      style={{ background: 'rgba(16,13,22,0.98)' }}
    />
  );
}
