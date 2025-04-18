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

// Add: AI-powered response via /api/ai-chat (Groq)
async function getAIResponse(userText) {
  try {
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });
    const data = await res.json();
    if (data.reply) return { text: data.reply, source: 'MirrorAndMyst AI Assistant (Groq)' };
    if (data.error) return { text: 'Sorry, the AI could not answer your question. (' + (data.detail || data.error) + ')', source: 'MirrorAndMyst AI Assistant (Groq)' };
    return { text: 'Sorry, I could not find an answer. Please try rephrasing your question!', source: 'MirrorAndMyst AI Assistant (Groq)' };
  } catch (e) {
    return { text: 'Sorry, there was a problem connecting to the bridal assistant. Please try again later.', source: 'MirrorAndMyst AI Assistant (Groq)' };
  }
}

const sensitiveQuestions = [
  /how many (years|long).*industry/i,
  /your rating/i,
  /how many (awards|certificates)/i,
  /are you certified/i,
  /how long have you been/i,
  /how experienced are you/i,
  /what is your experience/i,
  /how many clients/i,
  /how many weddings/i,
  /how many year/i,
  /how many years/i,
  /what is you rating/i,
  /what's your rating/i,
  /what is your rating/i,
  /how many year are you/i,
  /how many year have you/i
];

function needsProfessionalRedirect(userInput) {
  return sensitiveQuestions.some(rx => rx.test(userInput));
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [fullSize, setFullSize] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: friendlyResponses[0], time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), source: null }
  ]);
  const [shownFollowUps, setShownFollowUps] = useState([]); // Track shown follow-ups
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && windowRef.current) {
      windowRef.current.focus();
    }
  }, [open, fullSize]);

  // Keyboard handler for Ctrl+A selection
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
      if (document.activeElement === windowRef.current) {
        e.preventDefault();
        if (messagesContainerRef.current) {
          // Select all text in the messages div
          const range = document.createRange();
          range.selectNodeContents(messagesContainerRef.current);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }
  };

  // --- UI Sections ---
  // Quick Actions (always visible)
  const quickActions = [
    { label: 'Book a Trial', action: () => handleQuickReply('Book a Trial') },
    { label: 'FAQs', action: () => handleQuickReply('FAQs') },
    { label: 'See Portfolio', action: () => handleQuickReply('See Portfolio') },
    { label: 'Contact Artist', action: () => handleQuickReply('Contact Artist') },
  ];

  // Updated: Use AI for open-ended user input
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages([...messages, userMsg]);
    setTyping(true);
    setInput('');

    // Check if the user's question is sensitive (robust: lowercased, trimmed)
    if (needsProfessionalRedirect(input.trim().toLowerCase())) {
      setMessages(msgs => [
        ...msgs,
        {
          from: 'bot',
          text: "As an AI assistant for MirrorAndMyst, I don't have personal experience, but our team has years of expertise in the bridal industry. For the most accurate information about our experience or ratings, please visit our About page or contact us directly!",
          source: null,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setTyping(false);
      setCanUndo(true);
      return;
    }

    // Only call AI if not a sensitive question
    const aiReplyObj = await getAIResponse(input);
    setMessages(msgs => [
      ...msgs,
      {
        from: 'bot',
        text: aiReplyObj.text,
        source: aiReplyObj.source,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }
    ]);
    setTyping(false);
    setCanUndo(true);
  };

  const handleQuickReply = (reply) => {
    const userMsg = { from: 'user', text: reply, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
    setMessages([...messages, userMsg]);
    setShownFollowUps(prev => [...prev, reply]);
    setTyping(true);
    setTimeout(() => {
      let botResponse;
      let source = null;
      if (reply === 'Contact Artist') {
        botResponse = contactArtistAnswer;
      } else if (reply === 'FAQs') {
        botResponse = faqAnswer;
      } else if (reply === 'See Portfolio') {
        botResponse = portfolioAnswer;
      } else if (reply === 'Book a Trial') {
        botResponse = bookTrialAnswer;
      } else {
        const qa = findBestQA(reply);
        if (qa) {
          botResponse = qa.answer;
          source = qa.source;
        } else {
          const proAnswer = getProBeautyAnswer(reply);
          botResponse = proAnswer;
        }
      }
      setMessages(msgs => [
        ...msgs,
        {
          from: 'bot',
          text: botResponse,
          source,
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }
      ]);
      setTyping(false);
      setCanUndo(true);
    }, 900);
  };

  const handleUndo = () => {
    setMessages([
      { from: 'bot', text: friendlyResponses[0], time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), source: null }
    ]);
    setShownFollowUps([]);
    setCanUndo(false);
  };

  return (
    <div className={styles.chatbot}>
      {open && fullSize && (
        <div className={styles.overlay + ' ' + styles.overlayActive} onClick={() => setFullSize(false)} />
      )}
      {open ? (
        <div
          ref={windowRef}
          className={fullSize ? styles.fullSizeWindow : styles.window}
          style={
            fullSize
              ? {
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '98vw',
                  height: '96vh',
                  maxWidth: 540,
                  maxHeight: '98vh',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: 2000
                }
              : { resize: 'both', overflow: 'auto', minWidth: 320, minHeight: 420 }
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* Header */}
          <div className={styles.header}>
            <Image src="/logo.png" alt="Chatbot Avatar" width={36} height={36} className={styles.headerAvatar} />
            <span style={{marginLeft: '0.5rem'}}>MirrorAndMyst Assistant</span>
            <span className={styles.headerButtons}>
              <button onClick={() => setFullSize(f => !f)} style={{marginRight: 8, background: 'none', border: 'none', fontSize: '1.1em', cursor: 'pointer'}} title={fullSize ? 'Restore size' : 'Full size'}>
                {fullSize ? '🗗' : '🗖'}
              </button>
              <span className={styles.close} onClick={() => setOpen(false)}>×</span>
            </span>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            {quickActions.map((qa, idx) => (
              <button key={idx} className={styles.quickActionBtn} onClick={qa.action}>{qa.label}</button>
            ))}
          </div>

          {/* Messages */}
          <div
            className={styles.messages}
            style={{minHeight: '160px', flex: 1, display: 'flex', flexDirection: 'column'}}
            ref={messagesContainerRef}
          >
            {messages.map((msg, idx) => (
              msg.from === 'bot' ? (
                <div key={idx} className={styles.botMsg}>
                  <Image src="/logo.png" alt="Bot Avatar" width={28} height={28} className={styles.botAvatar} />
                  <div>
                    <div style={{background: '#fff', color: '#ad8b4c', borderRadius: '1.1em', padding: '0.7em 1em', marginBottom: 2, boxShadow: '0 1px 4px #ad8b4c11'}}>{msg.text}</div>
                    <div style={{fontSize: '0.72em', color: '#bfa76a', marginLeft: 2}}>{msg.time}</div>
                    {msg.source && <div style={{fontSize: '0.7em', color: '#bfa76a', marginLeft: 2, marginTop: 2}}>Source: {msg.source}</div>}
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

          {/* Suggested/Follow-Up Questions */}
          {messages.length > 0 && getRelevantFollowUps(messages[messages.length-1].text, shownFollowUps).length > 0 && (
            <div className={styles.suggestedFollowUps}>
              <div style={{marginBottom: 4, color: '#bfa76a', fontSize: '0.83em'}}>You can also ask:</div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5em', justifyContent: 'center'}}>
                {getRelevantFollowUps(messages[messages.length-1].text, shownFollowUps).map((q, i) => (
                  <button key={i} className={styles.suggestedBtn} onClick={() => handleQuickReply(q)}>{q}</button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <form onSubmit={handleSend} className={styles.inputBar}>
            <textarea
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = (e.target.scrollHeight) + 'px';
              }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = (e.target.scrollHeight) + 'px';
              }}
              placeholder="Type your message..."
              className={styles.input}
              rows={1}
              style={{resize: 'none', overflow: 'hidden'}}
              required
            />
            <button type="submit" aria-label="Send">
              <span role="img" aria-label="Send">➤</span>
            </button>
          </form>

          {/* AI Disclaimer Note */}
          <div className={styles.aiDisclaimer} style={{fontSize: '0.8em', color: '#bfa76a', opacity: 0.8, padding: '0.5em 1em'}}>
            <span>Note: This assistant uses AI and may occasionally provide incorrect or outdated information. Please verify important details independently.</span>
          </div>
        </div>
      ) : (
        <button className={styles.fab} onClick={() => setOpen(true)}>
          <Image src="/logo.png" alt="Chatbot Bubble Logo" width={38} height={38} className={styles.fabLogo} />
        </button>
      )}
    </div>
  );
}
