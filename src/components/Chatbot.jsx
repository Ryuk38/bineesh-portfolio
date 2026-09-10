import { useState } from 'react';
import { Bot, ChevronDown, Send, Sparkles, User } from 'lucide-react';

const STARTER_PROMPTS = [
  'What projects has Bineesh built?',
  'What technologies does he use?',
  'How can I contact him?',
];

function buildContext(content) {
  return {
    profile: {
      name: content.site?.ownerName,
      role: content.site?.role,
      about: content.about?.bio,
      focus: content.about?.technicalFocus,
      location: content.about?.location,
      availability: content.about?.availability,
    },
    experience: (content.experience || []).map(({ title, organization, type, period, location, responsibilities }) => ({
      title,
      organization,
      type,
      period,
      location,
      responsibilities,
    })),
    projects: (content.projects || []).filter((project) => !project.deleted).map(({ title, description, tags, link }) => ({
      title,
      description,
      tags,
      link,
    })),
    skills: (content.about?.skillBars || []).filter((skill) => !skill.deleted).map(({ label }) => label),
    education: content.about?.education,
    certifications: (content.about?.certifications || []).filter((item) => !item.deleted).map(({ label }) => label),
  };
}

export default function Chatbot({ content }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'assistant', text: 'Hi, I’m Nova. Ask me about Bineesh’s work, skills, or projects.' },
  ]);

  const sendMessage = async (nextMessage = message) => {
    const cleanMessage = nextMessage.trim();
    if (!cleanMessage || isSending) return;

    setMessage('');
    setMessages((current) => [...current, { id: `${Date.now()}-user`, role: 'user', text: cleanMessage }]);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleanMessage, context: buildContext(content) }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Unable to get a response.');
      setMessages((current) => [...current, { id: `${Date.now()}-assistant`, role: 'assistant', text: payload.reply }]);
    } catch (error) {
      setMessages((current) => [...current, { id: `${Date.now()}-error`, role: 'assistant', error: true, text: error.message }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`chatbot${isOpen ? ' chatbot--open' : ''}`}>
      {isOpen ? (
        <section className="chatbot-panel" aria-label="Nova portfolio assistant">
          <header className="chatbot-header">
            <div className="chatbot-heading">
              <img className="chatbot-avatar" src="/Assets/nova-avatar.svg" alt="Nova AI avatar" />
              <span>
                <strong>Nova</strong>
                <small><span className="chatbot-online-dot" /> Portfolio intelligence</small>
              </span>
            </div>
            <button type="button" className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close Nova assistant">
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </header>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((item) => (
              <div key={item.id} className={`chatbot-message chatbot-message--${item.role}${item.error ? ' chatbot-message--error' : ''}`}>
                <span className="chatbot-message-icon" aria-hidden="true">{item.role === 'user' ? <User size={13} /> : <Sparkles size={13} />}</span>
                <p>{item.text}</p>
              </div>
            ))}
            {isSending ? <div className="chatbot-typing"><span /><span /><span /> Thinking</div> : null}
          </div>

          {messages.length === 1 ? (
            <div className="chatbot-prompts">
              {STARTER_PROMPTS.map((prompt) => <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>{prompt}</button>)}
            </div>
          ) : null}

          <form className="chatbot-composer" onSubmit={(event) => { event.preventDefault(); sendMessage(); }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask about the portfolio..." aria-label="Ask the portfolio assistant" />
            <button type="submit" disabled={isSending || !message.trim()} aria-label="Send message" title="Send message"><Send size={16} aria-hidden="true" /></button>
          </form>
        </section>
      ) : null}

      <button type="button" className="chatbot-launcher" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close Nova assistant' : 'Open Nova assistant'} aria-expanded={isOpen}>
        {isOpen ? <ChevronDown size={21} aria-hidden="true" /> : <Bot size={21} aria-hidden="true" />}
        <span>Ask Nova</span>
      </button>
    </div>
  );
}
