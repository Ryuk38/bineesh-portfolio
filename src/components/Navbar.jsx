import { FileText, Home, Mail, Menu, User, Code2, X, Sun, Moon, BriefcaseBusiness, BrainCircuit } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: BrainCircuit },
  { id: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { id: 'projects', label: 'Projects', icon: Code2 },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function Navbar({
  activeSection,
  menuOpen,
  onToggleMenu,
  onToggleSidebar,
  onCloseSidebar,
  onCloseMenu,
  resumeUrl,
  theme,
  onToggleTheme,
  brand,
  hidden,
}) {
  return (
    <>
      <button
        type="button"
        className={`sidebar-reopen${hidden ? ' visible' : ''}`}
        onClick={onToggleSidebar}
        aria-label="Open sidebar navigation"
        title="Open navigation"
      >
        <Menu size={20} aria-hidden="true" />
      </button>
      <nav className={`navbar${hidden ? ' navbar-hidden' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <div className="navbar-pill" role="menubar" aria-label="Primary">
              <div className="navbar-brand-row">
                <a href="#home" className="navbar-brand" aria-label={`${brand || 'Bineesh'} home`}>
                <img className="navbar-brand-mark" src="/Assets/image.png" alt="Bineesh Mathew" />
                <span>
                  <strong>{brand || 'BINEESH'}</strong>
                  <small>AI / DATA / ML</small>
                </span>
                </a>
                <button type="button" className="sidebar-close" onClick={onCloseSidebar} aria-label="Close sidebar" title="Close sidebar">
                  <X size={17} aria-hidden="true" />
                </button>
              </div>
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`nav-pill-link${activeSection === id ? ' active' : ''}`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <Icon className="nav-pill-link__icon" aria-hidden="true" />
                {label}
              </a>
            ))}
            <a href={resumeUrl} target="_blank" rel="noreferrer" className="nav-pill-link nav-pill-action">
              <FileText className="nav-pill-link__icon" aria-hidden="true" />
              Resume
            </a>
          </div>

          <div className="navbar-actions">
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
              onClick={onToggleTheme}
              title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            >
              {theme === 'dark' ? <Sun style={{ width: 20, height: 20 }} /> : <Moon style={{ width: 20, height: 20 }} />}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              className="hamburger"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              onClick={onToggleMenu}
            >
              <Menu style={{ width: 24, height: 24 }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        onClick={onCloseMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-menu-header">
          <div className="navbar-logo">
            <span className="bracket">&lt;</span>MENU<span className="bracket">/&gt;</span>
          </div>
          <button type="button" className="close-btn" aria-label="Close menu" onClick={onCloseMenu}>
            <X style={{ width: 24, height: 24 }} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navItems.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={onCloseMenu}
              className={`mobile-nav-link${activeSection === id ? ' active' : ''}`}
            >
              <Icon />
              <span>{label}</span>
            </a>
          ))}
          <a href={resumeUrl} target="_blank" rel="noreferrer" onClick={onCloseMenu} className="mobile-nav-link">
            <FileText />
            <span>Resume</span>
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            © {new Date().getFullYear()} Bineesh Mathew
          </p>
        </div>
      </div>
    </>
  );
}
