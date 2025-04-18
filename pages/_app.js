import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MirrorAndMyst (BRIDAL ARTISTRY)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="description" content="Professional Makeup Artistry - Bridal, Glam, and Everyday Looks" />
        {/* SEO: Open Graph & Twitter Cards */}
        <meta property="og:title" content="MirrorAndMyst (BRIDAL ARTISTRY)" />
        <meta property="og:description" content="Professional Makeup Artistry - Bridal, Glam, and Everyday Looks" />
        <meta property="og:image" content="/cover.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mirrorandmyst-bridal-artistry.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MirrorAndMyst (BRIDAL ARTISTRY)" />
        <meta name="twitter:description" content="Professional Makeup Artistry - Bridal, Glam, and Everyday Looks" />
        <meta name="twitter:image" content="/cover.jpg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}
