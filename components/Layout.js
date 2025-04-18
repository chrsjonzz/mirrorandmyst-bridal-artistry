import Chatbot from './Chatbot';
import dynamic from 'next/dynamic';
import CreativeFooter from './CreativeFooter';

const LeafOverlay = dynamic(() => import('./LeafOverlay'), { ssr: false });
const Snowfall = dynamic(() => import('./Snowfall'), { ssr: false });

export default function Layout({ children }) {
  return (
    <>
      <LeafOverlay season="spring" />
      <Snowfall />
      {children}
      <CreativeFooter />
      <Chatbot />
    </>
  );
}
