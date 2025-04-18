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
          style={{fontFamily: 'Pacifico, cursive'}}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            // Remove any previous animation classes
            for (let i = 1; i <= 7; i++) el.classList.remove(styles[`headerLogo-spin${i}`]);
            // Pick random animation
            const idx = Math.floor(Math.random() * 7) + 1;
            el.classList.add(styles[`headerLogo-spin${idx}`]);
            // Remove the animation class after animation ends so it can be retriggered
            const removeAnim = () => {
              el.classList.remove(styles[`headerLogo-spin${idx}`]);
              el.removeEventListener('animationend', removeAnim);
            };
            el.addEventListener('animationend', removeAnim);
          }}
        >
          MirrorAndMyst (BRIDAL ARTISTRY)
        </h1>
        <p className={styles.tagline + ' ' + styles.hqText}>Mirror And Myst Bridal Artistry</p>
        <nav className={styles.nav}>
          <Link href="#about">About</Link>
          <Link href="#services">Services</Link>
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
        {['about','services','gallery','signature','engagement','contact'].map((id, idx, arr) => (
          <>
            {id === 'services' && (
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
    about: 'About Us',
    services: 'Services Offered',
    gallery: 'Our Gallery',
    signature: 'Signature Services for Women',
    engagement: 'Engagement',
    contact: 'Contact Us',
  };
  const sectionContent = {
    about: <p>At MirrorAndMyst (BRIDAL ARTISTRY), we celebrate femininity, beauty, and individuality. Our mission is to empower every client to feel stunning and confident, whether it's their wedding day or a casual outing. Specializing in beauty care, hairstyling, and bridal makeup, we ensure every look is a perfect blend of elegance and creativity.</p>,
    services: <ul><li><b>Bridal Makeup:</b> Traditional, Contemporary Glam, Destination Wedding Packages</li><li><b>Hairstyling:</b> Braids, Updos, Curls, Saree Draping</li><li><b>Everyday Glow:</b> Day-to-Night, Office-Ready, Natural Glam</li></ul>,
    gallery: <><p>Feature: <b>Bride of the Month</b> | Trending Looks: Glass Skin, Dewy Glow, Bold Smokey Eye</p><GalleryGrid glossy ultraHQ /></>,
    signature: <ul><li>Customized Bridal Packages (makeup, hairstyling, saree draping)</li><li>Luxury Pre-Wedding Skin Rituals</li><li>Personalized Consultation & Trials</li></ul>,
    engagement: <ul><li>Free bridal trials for the first 5 bookings every month</li><li>Engagement & Pre-Wedding Photoshoot Looks</li></ul>,
    contact: (
      <div style={{textAlign:'center', fontSize:'1.1rem'}}>
        <div style={{marginBottom:'0.8em'}}>
          <b>Contact:</b> Princy Lydia
        </div>
        <div style={{marginBottom:'0.8em'}}>
          <b>Phone:</b> <a href={`tel:${CONTACT_PHONE_INTL}`} style={{color:'var(--brand-gold)', textDecoration:'none'}}>{CONTACT_PHONE}</a>
        </div>
        <div style={{marginBottom:'0.8em'}}>
          <b>Email:</b> <a href={`mailto:${CONTACT_EMAIL}`} style={{color:'var(--brand-gold)', textDecoration:'none'}}>{CONTACT_EMAIL}</a>
        </div>
        <div>
          <a href={`https://wa.me/${CONTACT_PHONE_INTL.replace('+','')}`} target="_blank" rel="noopener" style={{color:'var(--brand-blush)', fontWeight:'bold', textDecoration:'none', border:'1.5px solid var(--brand-gold)', borderRadius:'2em', padding:'0.32em 1.2em', background:'linear-gradient(90deg,#fffbe6 0%, #ffe3ec 100%)', boxShadow:'0 2px 18px #bfa76a44', transition:'all 0.25s'}} onMouseOver={e=>e.currentTarget.style.background='linear-gradient(90deg,#ffe3ec 0%, #fffbe6 100%)'} onMouseOut={e=>e.currentTarget.style.background='linear-gradient(90deg,#fffbe6 0%, #ffe3ec 100%)'}>
            WhatsApp Admin
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
      <svg className="sectionThemedUnderline" viewBox="0 0 90 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 8 Q45 0 85 8" stroke="url(#goldLine)" strokeWidth="3" fill="none"/>
        <defs>
          <linearGradient id="goldLine" x1="0" y1="6" x2="90" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffe3ec"/>
            <stop offset="0.5" stopColor="#bfa76a"/>
            <stop offset="1" stopColor="#fffbe6"/>
          </linearGradient>
        </defs>
      </svg>
      {sectionContent[id]}
    </section>
  );
}

import dynamic from 'next/dynamic';
const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });
