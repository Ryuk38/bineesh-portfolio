"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FileText,
  BarChart,
  Users,
  Heart,
  Sun as SunIcon,
  BookOpen,
} from 'lucide-react';

import dynamic from 'next/dynamic';
import Navbar from '../src/components/Navbar';
import HeroSection from '../src/components/HeroSection';
import AboutSection from '../src/components/AboutSection';
import SkillsSection from '../src/components/SkillsSection';
import ExperienceSection from '../src/components/ExperienceSection';
import ProjectsSection from '../src/components/ProjectsSection';
import ContactSection from '../src/components/ContactSection';
import Footer from '../src/components/Footer';
import CustomCursor from '../src/components/CustomCursor';
import PortfolioSignals from '../src/components/PortfolioSignals';
import Chatbot from '../src/components/Chatbot';
import useScrollAnimations from '../src/hooks/useScrollAnimations';

const Scene3D = dynamic(() => import('../src/components/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="loader-container" style={{ position: 'fixed', zIndex: 5 }}>
      <div className="loader-spinner"></div>
    </div>
  )
});
import { createDefaultPortfolioContent } from '../src/data/portfolioContent';

/* ─── Icon registry ─── */
const ICON_MAP = {
  'file-text': FileText,
  'bar-chart': BarChart,
  users: Users,
  heart: Heart,
  sun: SunIcon,
  'book-open': BookOpen,
};

/* ─── Static Asset URLs ─── */
const heroImage = '/Assets/image.png';
const resumeUrl = '/Assets/Resume.pdf';

/* ─── Enrich projects with icon components ─── */
function enrichProjects(projects) {
  return projects.map((p) => ({
    ...p,
    icon: ICON_MAP[p.iconKey] || FileText,
  }));
}

/* ============================================================
   PORTFOLIO APP (PUBLIC CLIENT COMPONENT)
   ============================================================ */
export default function PortfolioApp({ initialContent }) {
  /* ── Content state ── */
  const defaults = createDefaultPortfolioContent({ heroImage, resumeUrl });

  // Merge loaded database content with default structure to prevent crashes on missing sections
  const mergedContent = initialContent && typeof initialContent === 'object' && initialContent.site && initialContent.hero
    ? {
        site: { ...defaults.site, ...initialContent.site },
        hero: { ...defaults.hero, ...initialContent.hero },
        about: { ...defaults.about, ...initialContent.about },
        experience: initialContent.experience || defaults.experience,
        projects: initialContent.projects || defaults.projects,
        contact: { ...defaults.contact, ...initialContent.contact },
        footer: { ...defaults.footer, ...initialContent.footer }
      }
    : defaults;

  const [content, setContent] = useState(mergedContent);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (event.data && event.data.type === 'PORTFOLIO_PREVIEW_UPDATE') {
        setContent(event.data.content);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  /* ── UI state ── */
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState('light');
  const [themeTransitioning, setThemeTransitioning] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollYRef = useRef(0);
  const scrollFrameRef = useRef(null);

  const mainRef = useRef(null);

  /* ── Scroll animations (GSAP) ── */
  useScrollAnimations();

  /* ── Scroll tracking ── */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (scrollFrameRef.current) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        const scrollingDown = currentScrollY > lastScrollYRef.current;
        setScrollY(currentScrollY);
        setNavHidden(currentScrollY > 100 && scrollingDown);
        if (currentScrollY <= 20) setNavHidden(false);
        lastScrollYRef.current = currentScrollY;

        const sections = document.querySelectorAll('section[id]');
        let current = 'home';
        for (const section of sections) {
          const top = section.offsetTop - 150;
          if (currentScrollY >= top) {
            current = section.getAttribute('id');
          }
        }
        setActiveSection((active) => active === current ? active : current);
        scrollFrameRef.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  /* ── Theme ── */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeTransitioning(true);
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    window.setTimeout(() => setThemeTransitioning(false), 900);
  }, []);

  /* ── Filters for active (non-soft-deleted) items ── */
  const activeStats = (content.hero.stats || []).filter(s => !s.deleted);
  const activeHighlights = (content.hero.highlights || [])
    .filter(h => typeof h === 'string' ? true : !h.deleted)
    .map(h => typeof h === 'string' ? h : h.text);

  const activeSkills = (content.about.skillBars || []).filter(s => !s.deleted);
  const activeEducation = (content.about.education || []).filter(e => !e.deleted);
  const activeCertifications = (content.about.certifications || [])
    .filter(c => !c.deleted)
    .map((c) => c.label);

  const activeProjects = enrichProjects((content.projects || []).filter(p => !p.deleted));
  const activeExperience = (content.experience || []).filter(item => !item.deleted);
  
  const activeContactLinks = (content.contact.links || []).filter(l => !l.deleted);
  
  const activeQuickLinks = (content.footer.quickLinks || []).filter(l => !l.deleted);
  const activeSocialLinks = (content.footer.socialLinks || []).filter(l => !l.deleted);

  /* ── Render ── */
  return (
    <>
      <CustomCursor />
      {themeTransitioning ? (
        <div className="meteor-transition" aria-hidden="true">
          <span className="meteor meteor-one" />
          <span className="meteor meteor-two" />
          <span className="meteor meteor-three" />
          <span className="meteor meteor-four" />
          <span className="meteor meteor-five" />
        </div>
      ) : null}
      {/* 3D background */}
      <Scene3D scrollY={scrollY} />
      <PortfolioSignals />
      <Chatbot content={content} />

      {/* Portfolio */}
      <div className={`app-container${navHidden ? ' nav-collapsed' : ''}`} ref={mainRef}>
        <Navbar
          activeSection={activeSection}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((o) => !o)}
          onCloseMenu={() => setMenuOpen(false)}
          hidden={navHidden}
          resumeUrl={content.hero.resumeUrl || resumeUrl}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="main-content">
          <HeroSection
            hero={{
              ...content.hero,
              highlights: activeHighlights,
              stats: activeStats
            }}
            resumeUrl={content.hero.resumeUrl || resumeUrl}
            heroImage={content.hero.image || heroImage}
          />
          <AboutSection
            about={{
              ...content.about,
              skillBars: activeSkills,
              education: activeEducation,
              certifications: (content.about.certifications || [])
                .filter(c => !c.deleted)
            }}
            skillBars={activeSkills}
            education={activeEducation}
            certifications={activeCertifications}
            heroImage={content.hero.image || heroImage}
          />
          <SkillsSection />
          <ExperienceSection experience={activeExperience} />
          <ProjectsSection projects={activeProjects} />
          <ContactSection 
            contact={{
              ...content.contact,
              links: activeContactLinks
            }} 
          />
          <Footer 
            footer={{
              ...content.footer,
              quickLinks: activeQuickLinks,
              socialLinks: activeSocialLinks
            }} 
            resumeUrl={content.hero.resumeUrl || resumeUrl} 
          />
        </main>
      </div>
    </>
  );
}
