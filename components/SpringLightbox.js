import React from 'react';
import Lightbox from 'react-spring-lightbox';

export default function SpringLightbox({ images, currentIndex, onClose, onMovePrev, onMoveNext }) {
  return (
    <>
      <Lightbox
        images={images.map((src) => ({ src }))}
        isOpen={currentIndex !== null}
        currentIndex={currentIndex || 0}
        onPrev={onMovePrev}
        onNext={onMoveNext}
        onClose={onClose}
        pageTransitionConfig={{ from: { opacity: 0, transform: 'scale(0.96)' }, enter: { opacity: 1, transform: 'scale(1)' }, leave: { opacity: 0, transform: 'scale(0.96)' }, config: { mass: 1, tension: 320, friction: 32 } }}
        style={{ background: 'rgba(16,13,22,0.98)' }}
      />
      {currentIndex !== null && (
        <button
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 18,
            right: 18,
            zIndex: 10001,
            background: 'rgba(24, 20, 30, 0.75)',
            color: '#fffbe6',
            border: 'none',
            borderRadius: '50%',
            width: 48,
            height: 48,
            fontSize: 32,
            boxShadow: '0 2px 12px #000a',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
            outline: 'none',
          }}
          aria-label="Close lightbox"
        >
          ×
        </button>
      )}
    </>
  );
}
