import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

function SectionHeading({ children, className = '' }) {
  return <h2 className={`section-heading ${className}`}>{children}</h2>;
}

export default function ProjectsSection({ projects }) {
  const githubUrl = 'https://github.com/Ryuk38?tab=repositories';
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProject = projects[featuredIndex];
  const projectIndex = projects
    .map((project, index) => ({ project, index }))
    .filter(({ index }) => index !== featuredIndex);

  useEffect(() => {
    if (projects.length < 2 || isPaused) return undefined;

    const rotation = window.setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % projects.length);
    }, 5000);

    return () => window.clearInterval(rotation);
  }, [isPaused, projects.length]);

  const ProjectIcon = ({ project, size = 22 }) => {
    const Icon = project.icon;
    return <Icon size={size} aria-hidden="true" />;
  };

  return (
    <section id="projects" className="section projects-template">
      <div className="projects-template-background" aria-hidden="true">
        <div className="projects-orb projects-orb-left" />
        <div className="projects-orb projects-orb-right" />
      </div>

      <div className="projects-template-header">
        <SectionHeading className="projects-template-title">
          Featured <span className="text-gradient-shimmer">Projects</span>
        </SectionHeading>
        <p className="projects-template-subtitle">
          A curated selection of AI, data, and full-stack builds with real-world impact.
        </p>
      </div>

      <div className="projects-showcase">
        {featuredProject ? (
          <a
            key={featuredProject.id || featuredProject.title}
            href={featuredProject.link}
            target="_blank"
            rel="noreferrer"
            className={`project-featured accent-${featuredProject.accent} project-featured-enter`}
            onClick={(event) => {
              event.preventDefault();
              setSelectedProject(featuredProject);
              setIsPaused(true);
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            <div className="project-featured-watermark" aria-hidden="true" />
            <div className="project-featured-topline">
              <span>SELECTED BUILD</span>
              <ExternalLink size={18} />
            </div>
            <div className="project-featured-icon">
              <ProjectIcon project={featuredProject} size={28} />
            </div>
            <h3>{featuredProject.title}</h3>
            <p>{featuredProject.description}</p>
            <div className="project-index-tags">
              {featuredProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <span className="project-featured-cta">Open project <span aria-hidden="true">↗</span></span>
            <span className={`project-featured-progress${isPaused ? ' is-paused' : ''}`} aria-hidden="true" />
          </a>
        ) : null}

        <div className="project-index" aria-label="Other projects">
          <div className="project-index-heading">
            <span>PROJECT INDEX</span>
            <span>PROJECT COLLECTION</span>
          </div>
          {projectIndex.map(({ project }) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="project-index-row"
              onClick={(event) => {
                event.preventDefault();
                setSelectedProject(project);
                setIsPaused(true);
              }}
            >
              <span className="project-index-marker" aria-hidden="true" />
              <span className="project-index-icon"><ProjectIcon project={project} size={19} /></span>
              <span className="project-index-copy">
                <strong>{project.title}</strong>
                <small>{project.tags.join(' · ')}</small>
              </span>
              <ExternalLink size={16} className="project-index-arrow" />
            </a>
          ))}
        </div>

      </div>

      {selectedProject ? (
        <div className="project-detail-overlay" role="presentation" onClick={() => { setSelectedProject(null); setIsPaused(false); }}>
          <article className={`project-detail-tile accent-${selectedProject.accent}`} role="dialog" aria-modal="true" aria-labelledby="project-detail-title" onClick={(event) => event.stopPropagation()}>
            <div className="project-detail-heading">
              <div className="project-detail-icon"><ProjectIcon project={selectedProject} size={24} /></div>
              <div>
                <span className="project-detail-kicker">PROJECT DETAILS</span>
                <h3 id="project-detail-title">{selectedProject.title}</h3>
              </div>
              <button type="button" className="project-detail-close" onClick={() => { setSelectedProject(null); setIsPaused(false); }} aria-label="Close project details" title="Close project details">
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="project-detail-description">{selectedProject.description}</p>
            <div className="project-detail-tags">
              {selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="project-detail-actions">
              <a href={selectedProject.demo || selectedProject.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                <ExternalLink size={16} aria-hidden="true" />
                Demo
              </a>
              <a href={selectedProject.source || selectedProject.link} target="_blank" rel="noreferrer" className="btn btn-outline">
                <ExternalLink size={16} aria-hidden="true" />
                Project Link
              </a>
            </div>
          </article>
        </div>
      ) : null}

      <div className="projects-template-footer">
        <a href={githubUrl} target="_blank" rel="noreferrer" className="projects-template-linkout">
          See all projects on GitHub
        </a>
      </div>
    </section>
  );
}
