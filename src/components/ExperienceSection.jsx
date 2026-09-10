import { BriefcaseBusiness, CalendarDays, CircleCheck, MapPin } from 'lucide-react';

export default function ExperienceSection({ experience }) {
  return (
    <section id="experience" className="section experience-template">
      <div className="experience-template-header">
        <p className="experience-template-eyebrow">CAREER TIMELINE</p>
        <h2 className="section-heading experience-template-title">
          <span className="experience-title-work">Work </span>
          <span className="text-gradient-shimmer">Experience</span>
        </h2>
        <p className="experience-template-subtitle">
          A record of roles, responsibilities, and systems shaped through real-world work.
        </p>
      </div>

      <div className="experience-list">
        {experience.map((item) => (
          <article key={item.id || item.title} className="experience-card glass card-3d reveal-up">
            <div className="experience-card-header">
              <div className="experience-card-role">
                <h3 className="experience-title">{item.title}</h3>
                <div className="experience-company-row">
                  <BriefcaseBusiness size={16} aria-hidden="true" />
                  <span>{item.organization}</span>
                  <span className="experience-type">{item.type}</span>
                </div>
              </div>
              <div className="experience-meta">
                <div>
                  <CalendarDays size={16} aria-hidden="true" />
                  <span>{item.period}</span>
                </div>
                <div>
                  <MapPin size={16} aria-hidden="true" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="experience-responsibilities">
              <h4>MAIN RESPONSIBILITIES</h4>
              <ul>
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility}>
                    <CircleCheck size={17} aria-hidden="true" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="experience-divider" />

            <div className="experience-skills">
              <h4>SKILLS &amp; TECHNOLOGIES</h4>
              <div className="experience-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}