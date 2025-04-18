import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#181818" />
        <meta name="description" content="MirrorAndMyst (BRIDAL ARTISTRY) - Professional Makeup Artistry" />
        {/* Removed viewport meta tag as per Next.js best practices */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
