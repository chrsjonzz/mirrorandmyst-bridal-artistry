import { useEffect, useRef } from 'react';
import Image from 'next/image';

function HeartMask({ width, height, children }) {
  // SVG mask for heart shape
  return (
    <svg width={width} height={height} style={{position:'absolute',top:0,left:0}}>
      <defs>
        <clipPath id="heart-shape-clip">
          <path d="M50% 82% C20% 60%, 0% 35%, 25% 18% C40% 7%, 60% 7%, 75% 18% C100% 35%, 80% 60%, 50% 82% Z" fill="#fff" />
        </clipPath>
      </defs>
      <foreignObject x="0" y="0" width={width} height={height} clipPath="url(#heart-shape-clip)">
        <div style={{width:'100%',height:'100%',clipPath:'url(#heart-shape-clip)'}}>{children}</div>
      </foreignObject>
    </svg>
  );
}

export default function ParallaxWatermark({ shape }) {
  const ref = useRef();
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (ref.current) {
        ref.current.style.transform = `translate(-50%, -50%) rotate(0deg) skewY(0deg) scale(${1 + y/2600}) translateY(${y/13}px)`;
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const width = 520, height = 520;
  const watermarkContent = (
    <>
      <Image src="/logo.png" alt="Watermark" fill style={{objectFit:'contain'}} quality={100} />
      {/* Cross overlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '96%',
        height: '96%',
        pointerEvents: 'none',
        zIndex: 2,
        transform: 'translate(-50%, -50%)',
      }}>
        <div style={{position:'absolute',left:'50%',top:0,width:'6px',height:'100%',background:'linear-gradient(to bottom,rgba(255,255,255,0.18),rgba(255,255,255,0.08) 80%,rgba(255,255,255,0.22))',borderRadius:'3px',transform:'translateX(-50%)'}} />
        <div style={{position:'absolute',top:'50%',left:0,height:'6px',width:'100%',background:'linear-gradient(to right,rgba(255,255,255,0.18),rgba(255,255,255,0.08) 80%,rgba(255,255,255,0.22))',borderRadius:'3px',transform:'translateY(-50%)'}} />
      </div>
    </>
  );
  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width,
        height,
        opacity: 0.08,
        pointerEvents: 'none',
        zIndex: 1,
        filter: 'blur(0.6px) drop-shadow(0 0 16px #fff8) grayscale(0.13) contrast(1.15) brightness(1.13)',
        mixBlendMode: 'luminosity',
        transition: 'opacity 0.6s, filter 0.6s',
        animation: shape === 'heart' ? 'pump-heart 1.5s infinite cubic-bezier(.47,1.64,.41,.8)' : undefined,
      }}
    >
      {shape === 'heart' ? (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{position:'absolute',top:0,left:0}}>
          <defs>
            <clipPath id="heart-clip">
              {/* Polished, symmetric heart shape */}
              <path d={`M${width/2},${height*0.84} 
                C${width*0.13},${height*0.68} ${width*0.01},${height*0.38} ${width*0.24},${height*0.22}
                C${width*0.37},${height*0.08} ${width*0.63},${height*0.08} ${width*0.76},${height*0.22}
                C${width*0.99},${height*0.38} ${width*0.87},${height*0.68} ${width/2},${height*0.84}
              `} fill="#fff" />
            </clipPath>
          </defs>
          <foreignObject x="0" y="0" width={width} height={height} style={{clipPath:'url(#heart-clip)'}}>
            <div style={{width:'100%',height:'100%',clipPath:'url(#heart-clip)',position:'relative'}}>
              {watermarkContent}
            </div>
          </foreignObject>
        </svg>
      ) : watermarkContent}
      <style jsx>{`
        @keyframes pump-heart {
          0% { transform: scale(1) translate(-50%, -50%); }
          10% { transform: scale(1.012) translate(-50%, -50%); }
          20% { transform: scale(1.018) translate(-50%, -50%); }
          35% { transform: scale(1.012) translate(-50%, -50%); }
          50% { transform: scale(1.022) translate(-50%, -50%); }
          70% { transform: scale(1.01) translate(-50%, -50%); }
          100% { transform: scale(1) translate(-50%, -50%); }
        }
      `}</style>
    </div>
  );
}
