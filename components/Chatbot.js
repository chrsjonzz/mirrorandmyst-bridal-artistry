import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chatbot.module.css';
import Image from 'next/image';
import { knowledgeBase } from '../data/knowledgeBase';

// General fallback wedding makeup tips (rotating, accurate)
const defaultWeddingTips = [
  "For a flawless bridal look: prep your skin with a hydrating primer, choose long-wear foundation, set with translucent powder, use waterproof mascara, and finish with a setting spray.",
  "Always do a trial before the big day! Test your full bridal look in similar lighting and take photos to check the finish.",
  "Choose makeup products that are waterproof and long-lasting, especially for emotional moments and dancing.",
  "Blend foundation down your neck and décolletage for a seamless, natural look in photos.",
  "Keep a touch-up kit with blotting papers, lipstick, and powder for quick fixes during your wedding.",
  "Highlight the high points of your face for a radiant glow, but avoid too much shimmer on oily skin.",
  "Use individual lashes for a soft, fluttery effect that looks beautiful in person and on camera."
];

// Pro-level beauty knowledge base
const beautyKnowledge = [
  {
    keywords: ['foundation', 'long-lasting', 'base'],
    answer: 'For all-day bridal wear, MAC Studio Fix Fluid and Estée Lauder Double Wear are industry favorites—both are sweat-proof, photo-friendly, and come in a wide shade range.'
  },
  {
    keywords: ['dewy', 'glow', 'glowing', 'radiant'],
    answer: 'Start with Charlotte Tilbury’s Hollywood Flawless Filter as a primer or mix-in. For setting, use a fine mist like MAC Fix+ and a touch of highlighter on cheekbones.'
  },
  {
    keywords: ['lipstick', 'indian bridal', 'red lip'],
    answer: 'MAC Ruby Woo, Huda Beauty Liquid Matte in “Famous”, and Bobbi Brown Luxe Lip Color in “Red Velvet” are all stunning and long-lasting for ceremonies and photos.'
  },
  {
    keywords: ['sensitive skin', 'gentle', 'allergy'],
    answer: 'Bobbi Brown and Estée Lauder are known for gentle, skin-friendly formulas. Always patch test, and consider mineral-based products for sensitive skin types.'
  },
  {
    keywords: ['makeup last', 'tears', 'dancing', 'sweat'],
    answer: 'Use a pro primer (like Smashbox Photo Finish), waterproof mascara (Huda Beauty Legit Lashes), and set everything with a setting spray (Urban Decay All Nighter or MAC Fix+).' 
  },
  {
    keywords: ['top brands', 'best brands', 'bridal brands'],
    answer: 'Top bridal beauty brands include MAC Cosmetics, Charlotte Tilbury, Estée Lauder, Huda Beauty, and Bobbi Brown. Each is trusted by professionals for flawless, long-lasting results.'
  },
  {
    keywords: ['mac', 'charlotte tilbury', 'estée lauder', 'huda beauty', 'bobbi brown'],
    answer: 'MAC is known for pro foundations and lipsticks; Charlotte Tilbury for glowing skin; Estée Lauder for classic elegance; Huda Beauty for bold glam; Bobbi Brown for natural radiance.'
  },
  {
    keywords: ['wedding makeup', 'wedding tip', 'bridal tip', 'makeup tip', 'makeup advice', 'bridal look', 'wedding look', 'bridal makeup'],
    answer: null // handled dynamically in getProBeautyAnswer
  },
  {
    keywords: ['lipstick', 'lip color', 'lip shade'],
    answer: 'For long-lasting lips, use a lip liner to outline and fill in, apply lipstick, blot, and reapply. MAC Ruby Woo and Huda Beauty Liquid Matte are great bridal choices.'
  },
  {
    keywords: ['eye makeup', 'eyeshadow', 'eyeliner', 'smokey eye'],
    answer: 'Prime your eyelids, use waterproof eyeliner, and blend eyeshadow well for a soft, romantic bridal look. Browns and golds flatter most skin tones.'
  },
  {
    keywords: ['blush', 'cheeks'],
    answer: 'Cream blush gives a natural flush and lasts longer. Smile and apply to the apples of your cheeks, blending upward.'
  },
  {
    keywords: ['highlighter', 'glow'],
    answer: 'Apply highlighter to the tops of cheekbones, bridge of nose, and cupid’s bow for a radiant finish. Choose a shade that complements your skin tone.'
  },
  {
    keywords: ['contour', 'sculpt'],
    answer: 'Contour under cheekbones, jawline, and sides of the nose for subtle definition. Blend well to avoid harsh lines.'
  },
  {
    keywords: ['setting spray', 'setting powder', 'makeup last'],
    answer: 'Set your makeup with a translucent powder and finish with a setting spray to lock in your look for hours.'
  }
];

const friendlyResponses = [
  "Hi there! How can I help you look your best today? 💄",
  "Welcome to MirrorAndMyst (BRIDAL ARTISTRY)! Need info about bridal packages or want to book a trial?",
  "I'm here to answer your beauty questions! 😊",
  "Looking for our latest gallery or trending looks? Just ask!"
];

const quickReplies = [
  'Book a Trial',
  'See Portfolio',
  'Contact Artist',
  'FAQs'
];

const contactArtistAnswer = `You can reach our lead artist, Princy Lydia, at:\n\n📞 Phone: 8217721670\n✉️ Email: princylydia88@gmail.com\n💬 WhatsApp: +918217721670`;
const faqAnswer = `FAQs:\n• What services do you offer?\n  - Bridal makeup, hairstyling, saree draping, pre-wedding skin rituals, and more.\n• How do I book a trial?\n  - Message us here or call/WhatsApp the number above.\n• Do you travel for weddings?\n  - Yes! We cover destination and local weddings.`;
const portfolioAnswer = `You can view our portfolio and gallery of bridal looks in the 'Gallery' section above or by clicking here: /#gallery`;
const bookTrialAnswer = `To book a bridal makeup trial, simply message us here, call 8217721670, or WhatsApp +918217721670. We'll help you schedule your session!`;

// Helper: Find best matching Q&A from knowledgeBase
function findBestQA(userText) {
  const text = userText.toLowerCase();
  // Exact match first
  let qa = knowledgeBase.find(q => q.question.toLowerCase() === text);
  if (qa) return qa;
  // Keyword/topic match next
  qa = knowledgeBase.find(q => text.includes(q.topic));
  if (qa) return qa;
  // Fallback: partial match in question
  qa = knowledgeBase.find(q => q.question.toLowerCase().includes(text));
  if (qa) return qa;
  // Fallback: first general Q&A
  return knowledgeBase[0];
}

// Update getProBeautyAnswer to use knowledgeBase
function getProBeautyAnswer(userText) {
  const qa = findBestQA(userText);
  return qa ? `${qa.answer}\n\n${qa.source}` : null;
}

// Improved dynamic follow-up logic: always shuffle and rotate suggestions, exclude previously shown
function getRelevantFollowUps(lastBotText, shownFollowUps) {
  const text = lastBotText.toLowerCase();
  let topic = null;
  if (/lip|lipstick|lips/.test(text)) topic = 'lips';
  else if (/eye|eyeshadow|eyeliner|lashes|mascara/.test(text)) topic = 'eyes';
  else if (/skin|foundation|primer|breakout|acne|exfoliate|heavy/.test(text)) topic = 'skin';
  else if (/hair|hairstyle|frizz|updo|shiny/.test(text)) topic = 'hair';
  else if (/book|trial|artist|contact|portfolio|travel/.test(text)) topic = 'booking';

  // Exclude previously shown follow-ups
  const shownSet = new Set(shownFollowUps);
  let topicQs = topic ? knowledgeBase.filter(q => q.topic === topic && q.question.toLowerCase() !== text && !shownSet.has(q.question)).map(q => q.question) : [];
  // Shuffle the topic questions
  for (let i = topicQs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [topicQs[i], topicQs[j]] = [topicQs[j], topicQs[i]];
  }
  // If not enough, fill with shuffled questions from other topics
  if (topicQs.length < 3) {
    let otherQs = knowledgeBase.filter(q => (!topic || q.topic !== topic) && !shownSet.has(q.question)).map(q => q.question);
    // Shuffle otherQs
    for (let i = otherQs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherQs[i], otherQs[j]] = [otherQs[j], otherQs[i]];
    }
    topicQs = topicQs.concat(otherQs.slice(0, 3 - topicQs.length));
  }
  return topicQs.slice(0, 3);
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: friendlyResponses[0], time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
  ]);
  const [shownFollowUps, setShownFollowUps] = useState([]); // Track shown follow-ups
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages([...messages, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const proAnswer = getProBeautyAnswer(input);
      setMessages(msgs => [
        ...msgs,
        {
          from: 'bot',
          text: proAnswer || defaultWeddingTips[Math.floor(Math.random()*defaultWeddingTips.length)],
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setTyping(false);
    }, 900);
    setInput('');
  };

  const handleQuickReply = (reply) => {
    const userMsg = { from: 'user', text: reply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages([...messages, userMsg]);
    setShownFollowUps(prev => [...prev, reply]);
    setTyping(true);
    setTimeout(() => {
      let botResponse;
      if (reply === 'Contact Artist') {
        botResponse = contactArtistAnswer;
      } else if (reply === 'FAQs') {
        botResponse = faqAnswer;
      } else if (reply === 'See Portfolio') {
        botResponse = portfolioAnswer;
      } else if (reply === 'Book a Trial') {
        botResponse = bookTrialAnswer;
      } else {
        const proAnswer = getProBeautyAnswer(reply);
        botResponse = proAnswer || defaultWeddingTips[Math.floor(Math.random()*defaultWeddingTips.length)];
      }
      setMessages(msgs => [
        ...msgs,
        {
          from: 'bot',
          text: botResponse,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setTyping(false);
    }, 900);
  };

  return (
    <div className={styles.chatbot}>
      {open ? (
        <div className={styles.window}>
          <div className={styles.header} onClick={() => setOpen(false)}>
            <Image src="/logo.png" alt="Chatbot Avatar" width={36} height={36} className={styles.headerAvatar} />
            <span style={{marginLeft: '0.5rem'}}>MirrorAndMyst Assistant</span>
            <span className={styles.close}>×</span>
          </div>
          <div className={styles.messages} style={{overflowY: 'auto', flex: 1, minHeight: 120}}>
            {messages.map((msg, idx) => (
              msg.from === 'bot' ? (
                <div key={idx} className={styles.botMsg}>
                  <Image src="/logo.png" alt="Bot Avatar" width={28} height={28} className={styles.botAvatar} />
                  <div>
                    <div style={{background: '#fff', color: '#ad8b4c', borderRadius: '1.1em', padding: '0.7em 1em', marginBottom: 2, boxShadow: '0 1px 4px #ad8b4c11'}}>{msg.text}</div>
                    <div style={{fontSize: '0.72em', color: '#bfa76a', marginLeft: 2}}>{msg.time}</div>
                    {/* Show follow-up suggestions only after the latest bot message */}
                    {idx === messages.length - 1 && (
                      <div style={{marginTop: 6, fontSize: '0.85em', color: '#bfa76a', opacity: 0.88, display: 'flex', flexWrap: 'wrap', gap: '0.5em'}}>
                        <span style={{fontWeight: 500, opacity: 0.7}}>You can also ask:</span>
                        {getRelevantFollowUps(msg.text, shownFollowUps).map((q, i) => (
                          <button key={i} style={{background: 'none', border: 'none', color: '#ad8b4c', fontSize: '0.92em', cursor: 'pointer', textDecoration: 'underline', opacity: 0.85, padding: 0, margin: 0}}
                            onClick={() => handleQuickReply(q)}>{q}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div key={idx} style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 2}}>
                  <div>
                    <div style={{background: '#bfa76a', color: '#fffbe6', borderRadius: '1.1em', padding: '0.7em 1em', marginBottom: 2, boxShadow: '0 1px 4px #ad8b4c22'}}>{msg.text}</div>
                    <div style={{fontSize: '0.72em', color: '#ad8b4c', textAlign: 'right'}}>{msg.time}</div>
                  </div>
                </div>
              )
            ))}
            {typing && (
              <div style={{color: '#bfa76a', fontStyle: 'italic', margin: '0.5em 0 0 2.2em'}}>MirrorAndMyst is typing…</div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.quickReplies}>
            {quickReplies.map((reply, idx) => (
              <button key={idx} onClick={() => handleQuickReply(reply)}>{reply}</button>
            ))}
          </div>
          <form className={styles.inputBar} onSubmit={handleSend} style={{display: 'flex', gap: 6}}>
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{flex: 1}}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button className={styles.fab} onClick={() => setOpen(true)}>
          <Image src="/logo.png" alt="Chatbot Bubble Logo" width={38} height={38} className={styles.fabLogo} />
        </button>
      )}
    </div>
  );
}
