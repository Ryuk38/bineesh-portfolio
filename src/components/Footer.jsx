import { useEffect, useState } from 'react';
import { Mail, Github, Linkedin, ExternalLink, ArrowUpRight, ArrowUp } from 'lucide-react';

const FOOTER_ICON_MAP = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  'external-link': ExternalLink,
};

const FIELD_QUOTES = [
  'Good data turns questions into better decisions.',
  'Machine learning is where curiosity meets measurable impact.',
  'Build the model, understand the signal, improve the outcome.',
  'The best AI solutions stay useful, explainable, and human.',
  'From raw data to clear insight, every detail matters.',
];

export default function Footer({ footer, resumeUrl }) {
  const year = new Date().getFullYear();
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setQuoteIndex((currentIndex) => (currentIndex + 1) % FIELD_QUOTES.length);
    }, 5000);

    return () => window.clearInterval(rotation);
  }, []);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-topline">
              <div className="brand-logo">{footer.brand}</div>
            </div>
            <span className="footer-status"><span /> Available for opportunities</span>
            <div className="brand-title">{footer.name}</div>
            <div className="brand-sub">{footer.tagline}</div>
            <p className="footer-brand-copy">Designing thoughtful digital experiences with data, intelligence, and a human point of view.</p>
            <p className="footer-field-quote" aria-live="polite" key={quoteIndex}>
              “{FIELD_QUOTES[quoteIndex]}”
            </p>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {footer.quickLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('#') ? undefined : '_blank'}
                    rel={link.href.startsWith('#') ? undefined : 'noreferrer'}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="footer-link-arrow" size={14} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="contact-list">
              {footer.socialLinks.map((link) => {
                const IconComp = FOOTER_ICON_MAP[link.iconKey] || ExternalLink;
                return (
                  <li key={link.id}>
                    <a href={link.href} target="_blank" rel="noreferrer noopener" className="footer-social-link">
                      <IconComp className="contact-icon-inline" /> {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="footer-meta">
          <small>© {year} {footer.name}. All rights reserved.</small>
          <a className="footer-top-link" href="#home">
            Back to top <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
