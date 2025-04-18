import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>MirrorAndMyst (BRIDAL ARTISTRY)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Professional Makeup Artistry - Bridal, Glam, and Everyday Looks" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
