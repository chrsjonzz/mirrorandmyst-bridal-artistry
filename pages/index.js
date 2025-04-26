import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import SparkleOverlay from '../components/SparkleOverlay';
import PetalOverlay from '../components/PetalOverlay';
import ParallaxWatermark from '../components/ParallaxWatermark';
import ClickSparkle from '../components/ClickSparkle';
import LeafOverlay from '../components/LeafOverlay';
import ShiningStar from '../components/ShiningStar';
import GalleryGrid from '../components/GalleryGrid';
import HeroLogo from '../components/HeroLogo';
import { useState, useEffect, useRef } from 'react';

const bgImages = [
  '/gallery1.jpg',
  '/gallery2.jpg',
  '/gallery3.jpg',
];

// --- Contact Info: change here for easy updates ---
const CONTACT_OWNER = 'Princy Lydia';
const CONTACT_PHONE = '8217721670';
const CONTACT_PHONE_INTL = '+918217721670';
const CONTACT_EMAIL = 'princylydia88@gmail.com';

export default function Home() {
  const [season] = useState('spring');
  return (
    <div className={styles.container}>
      <ClickSparkle />
      <SparkleOverlay />
      <PetalOverlay />
      <LeafOverlay season={season} />
      <div className={styles.bgSlider}>
        {bgImages.map((img, i) => (
          <Image
            key={img}
            src={img}
            alt={`Bridal look ${i+1}`}
            fill
            className={styles.bgImg}
            style={{animationDelay: `${i * 4}s`}}
            quality={90}
            priority={i === 0}
          />
        ))}
      </div>
      <Head>
        <title>MirrorAndMyst (BRIDAL ARTISTRY)</title>
      </Head>
      <header className={styles.header} style={{scrollMarginTop: 0}}>
        {/* Angelic floating feathers */}
        <span className={styles.headerFeather}>
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 46C22 36 42 26 46 8" stroke="#fffbe6" strokeWidth="3" strokeLinecap="round"/>
            <path d="M8 46C18 38 34 32 46 8" stroke="#ffd700" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 46C16 40 28 34 46 8" stroke="#fbe7ff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <span className={styles.headerFeather2}>
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 32C15 25 29 19 32 6" stroke="#fffbe6" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M6 32C12 27 23 22 32 6" stroke="#ffd700" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </span>
        <div style={{position:'relative', display:'inline-block'}}>
          <Image src="/logo.png" alt="MirrorAndMyst Logo" width={120} height={120} priority quality={100} className={styles.headerLogo} />
          <span style={{position:'absolute', top:'32px', left:'50%', transform:'translateX(-50%)', zIndex:3, pointerEvents:'none'}}>
            <ShiningStar />
          </span>
        </div>
        <h1
          className={`${styles.title} ${styles.hqText} ${styles.headerLogoAnim} ${styles.shimmer}`}
          style={{fontFamily: "'Playfair Display', serif", lineHeight: 1.08}}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            for (let i = 1; i <= 7; i++) el.classList.remove(styles[`headerLogo-spin${i}`]);
            const idx = Math.floor(Math.random() * 7) + 1;
            el.classList.add(styles[`headerLogo-spin${idx}`]);
            const removeAnim = () => {
              el.classList.remove(styles[`headerLogo-spin${idx}`]);
              el.removeEventListener('animationend', removeAnim);
            };
            el.addEventListener('animationend', removeAnim);
          }}
        >
          MirrorAndMyst<br/>
          <span style={{fontSize: '0.72em', verticalAlign: 'middle', letterSpacing: '0.11em', color: '#bfa76a', fontWeight: 500}}>(BRIDAL ARTISTRY)</span>
        </h1>
        <p className={styles.tagline + ' ' + styles.hqText + ' taglineSlay'}>Styled to Slay. <span style={{whiteSpace: 'nowrap'}}>Designed to Stay.</span></p>
        <nav className={styles.nav}>
          <Link href="#about">About</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#signature">Signature</Link>
          <Link href="#engagement">Engagement</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <HeroLogo />
      </div>
      <main>
        {['about','gallery','signature','engagement','contact'].map((id, idx, arr) => (
          <>
            {id === 'signature' && (
              <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'flex-end', position:'relative', minHeight:0, margin:'-18px 0 0 0', pointerEvents:'none', zIndex:2}}>
                <div style={{position:'relative', top:'-36px'}}>
                  <ParallaxWatermark shape="heart" />
                </div>
              </div>
            )}
            <SectionAnimated key={id} id={id} idx={idx} styles={styles} />
          </>
        ))}
      </main>
      <div className={styles.sectionDivider} style={{width:'100%', margin:'2rem 0', display:'flex', justifyContent:'center'}}>
        <svg className={styles.sectionDividerSvg} viewBox="0 0 1440 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 18C120 36 360 36 720 18C1080 0 1320 0 1440 18V36H0V18Z" fill="url(#blushGoldDivider)"/>
          <defs>
            <linearGradient id="blushGoldDivider" x1="0" y1="18" x2="1440" y2="18" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffe3ec"/>
              <stop offset="0.35" stopColor="#fbe7ff"/>
              <stop offset="0.65" stopColor="#bfa76a"/>
              <stop offset="1" stopColor="#fffbe6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <footer className={styles.footer}>
        <span className={styles.footerBlessing}>IN THE NAME OF THE FATHER, SON, HOLY-SPIRIT</span>
        <span> 2025 MirrorAndMyst (BRIDAL ARTISTRY)</span>
        {/* Logo Seal */}
        <Image src="/logo.png" alt="MirrorAndMyst Seal" width={80} height={80} quality={100} className="logoSeal" />
      </footer>
      <Chatbot />
      {/* Golden blush-gold gradient bar (bottom accent, no circles) */}
      <svg width="100%" height="28" viewBox="0 0 1440 28" fill="none" style={{ margin: '2rem 0 0 0', zIndex: 1, display: 'block' }}>
        <defs>
          <linearGradient id="blushGoldBar" x1="0" y1="14" x2="1440" y2="14" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe3ec" />
            <stop offset="0.33" stopColor="#fffbe6" />
            <stop offset="0.66" stopColor="#bfa76a" />
            <stop offset="1" stopColor="#fffbe6" />
          </linearGradient>
        </defs>
        <rect x="0" y="8" width="1440" height="16" rx="8" fill="url(#blushGoldBar)" />
      </svg>
    </div>
  );
}

// SectionAnimated: animated entrance and shimmer header
function SectionAnimated({ id, idx, styles }) {
  const [visible, setVisible] = useState(false);
  const sectionTitles = {
    about: (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', margin:'0 auto'}}>
        <span className="sectionScript" style={{display:'block', textAlign:'center', lineHeight:1}} id={id+"-title"}>About Us</span>
        <SectionFlowerUnderline targetId={id+"-title"} />
      </div>
    ),
    gallery: (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', margin:'0 auto'}}>
        <span className="sectionScript" style={{display:'block', textAlign:'center', lineHeight:1}} id={id+"-title"}>Our Gallery</span>
        <SectionFlowerUnderline targetId={id+"-title"} />
      </div>
    ),
    signature: (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', margin:'0 auto'}}>
        <span className="sectionScript" style={{display:'block', textAlign:'center', lineHeight:1}} id={id+"-title"}>Bridal Package</span>
        <SectionFlowerUnderline targetId={id+"-title"} />
      </div>
    ),
    engagement: (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', margin:'0 auto'}}>
        <span className="sectionScript" style={{display:'block', textAlign:'center', lineHeight:1}} id={id+"-title"}>Engagement</span>
        <SectionFlowerUnderline targetId={id+"-title"} />
      </div>
    ),
    contact: (
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'fit-content', margin:'0 auto'}}>
        <span className="sectionScript" style={{display:'block', textAlign:'center', lineHeight:1}} id={id+"-title"}>Contact Us</span>
        <SectionFlowerUnderline targetId={id+"-title"} />
      </div>
    ),
  };
  const sectionContent = {
    about: <p className="subjectBodyFont">At MirrorAndMyst (BRIDAL ARTISTRY), we celebrate femininity, beauty, and individuality. Our mission is to empower every client to feel stunning and confident, whether it's their wedding day or a casual outing. Specializing in beauty care, hairstyling, and bridal makeup, we ensure every look is a perfect blend of elegance and creativity.</p>,
    gallery: <div className="subjectBodyFont"><p>Feature: <b>Bride of the Month</b> | Trending Looks: Glass Skin, Dewy Glow, Bold Smokey Eye</p><GalleryGrid glossy ultraHQ /></div>,
    signature: (
      <ul className="subjectBodyFont signatureList" style={{ lineHeight: '1.85', fontSize: '1.11rem', paddingLeft: '1.1em', marginBottom: 0 }}>
        <li className="signatureMainCat">Personalized Consultation & Trials</li>
        <li className="signatureMainCat">Traditional</li>
        <li className="signatureMainCat">HD or Air Brush make-up</li>
        <li className="signatureMainCat">Hairstyling</li>
        <li className="signatureMainCat">Draping (Saree/Dupatta)</li>
      </ul>
    ),
    engagement: (
      <>
        <ul className="subjectBodyFont signatureList" style={{ lineHeight: '1.85', fontSize: '1.11rem', paddingLeft: '1.1em', marginBottom: 0 }}>
          <li className="signatureMainCat">Full-Face Makeup</li>
          <li className="signatureMainCat">Hairstyling</li>
          <li className="signatureMainCat">Outfit Styling/Draping</li>
          <li className="signatureMainCat">Lashes</li>
        </ul>
        <div style={{marginTop: '1.2em', textAlign: 'center'}}>
          <span className="sectionScript" style={{fontSize: '1.22em', color: '#6e3b6e', fontWeight: 700, letterSpacing: '0.04em', display: 'inline-block', marginBottom: '0.35em'}}>Party/Guest Makeup</span>
        </div>
      </>
    ),
    contact: (
      <div className="subjectBodyFont" style={{ textAlign: 'center', fontSize: '1.1rem' }}>
        <div style={{ marginBottom: '0.8em' }}>
          <b>Contact:</b> Princy Lydia
        </div>
        <div style={{ marginBottom: '0.8em' }}>
          <b>Phone:</b> <a href={`tel:${CONTACT_PHONE_INTL}`} style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}>{CONTACT_PHONE}</a>
        </div>
        <div style={{ marginBottom: '0.8em' }}>
          <b>Email:</b> <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}>{CONTACT_EMAIL}</a>
        </div>
        <div>
          <a
            href={`https://wa.me/${CONTACT_PHONE_INTL.replace('+', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--brand-gold)', textDecoration: 'none' }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    const section = document.getElementById(id);
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [id]);

  return (
    <section
      id={id}
      className={`${styles.section} ${styles.hqText} ${styles.sectionAnimated} ${visible ? styles.visible : ''} sectionThemed`}
    >
      <span className={styles.sectionThemedTitle}>{sectionTitles[id]}</span>
      {sectionContent[id]}
    </section>
  );
}

// Add flowering underline SVG as a React component
function SectionFlowerUnderline({ targetId }) {
  // Optionally, you could use targetId to measure width and adjust SVG, but for now, center and size visually
  return (
    <svg style={{display:'block', margin:'-0.35em auto 0.25em auto', filter:'drop-shadow(0 2px 12px #bfa76a88)', width:'90%', maxWidth: '340px', minWidth: '120px'}} height="30" viewBox="0 0 140 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 22 Q70 3 125 22" stroke="url(#goldLine)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Left flower */}
      <g>
        <ellipse cx="15" cy="22" rx="4.2" ry="3.2" fill="url(#petalGradient)"/>
        <ellipse cx="12" cy="19" rx="1.6" ry="2.8" fill="url(#petalGradient)" transform="rotate(-18 12 19)"/>
        <ellipse cx="18" cy="19" rx="1.6" ry="2.8" fill="url(#petalGradient)" transform="rotate(18 18 19)"/>
        <circle cx="15" cy="22" r="1.3" fill="#fffbe6"/>
      </g>
      {/* Right flower */}
      <g>
        <ellipse cx="125" cy="22" rx="4.2" ry="3.2" fill="url(#petalGradient)"/>
        <ellipse cx="122" cy="19" rx="1.6" ry="2.8" fill="url(#petalGradient)" transform="rotate(-18 122 19)"/>
        <ellipse cx="128" cy="19" rx="1.6" ry="2.8" fill="url(#petalGradient)" transform="rotate(18 128 19)"/>
        <circle cx="125" cy="22" r="1.3" fill="#fffbe6"/>
      </g>
      <defs>
        <linearGradient id="goldLine" x1="0" y1="15" x2="140" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fffbe6"/>
          <stop offset="0.25" stopColor="#ffe3ec"/>
          <stop offset="0.5" stopColor="#bfa76a"/>
          <stop offset="0.75" stopColor="#ffe3ec"/>
          <stop offset="1" stopColor="#fffbe6"/>
        </linearGradient>
        <linearGradient id="petalGradient" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop stopColor="#ffe3ec"/>
          <stop offset="1" stopColor="#bfa76a"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

import dynamic from 'next/dynamic';
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });
