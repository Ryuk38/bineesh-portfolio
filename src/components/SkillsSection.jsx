import { useState } from 'react';
import { BrainCircuit, BarChart3, Code2, CloudCog, Database, Workflow } from 'lucide-react';

const SKILL_FILTERS = [
  { id: 'all', label: 'All', icon: BrainCircuit },
  { id: 'programming', label: 'Programming', icon: Code2 },
  { id: 'data', label: 'Data & Analytics', icon: BarChart3 },
  { id: 'ml', label: 'Machine Learning', icon: BrainCircuit },
  { id: 'databases', label: 'Databases', icon: Database },
  { id: 'process-mining', label: 'Process Mining', icon: Workflow },
  { id: 'devops', label: 'DevOps & Tools', icon: CloudCog },
];

const SKILL_CATEGORIES = [
  {
    id: 'programming',
    label: 'Programming & Query',
    icon: Code2,
    skills: ['Python', 'SQL', 'Java', 'C', 'HTML', 'CSS', 'JavaScript', 'PHP'],
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    icon: BarChart3,
    skills: ['Pandas', 'NumPy', 'PySpark', 'Excel', 'Power BI', 'Tableau', 'Qlik Sense', 'ETL'],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: BrainCircuit,
    skills: ['Scikit-learn', 'XGBoost', 'LightGBM', 'TF-IDF'],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: Database,
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Data Transformation', 'Database Query Optimization'],
  },
  {
    id: 'process-mining',
    label: 'Process Mining',
    icon: Workflow,
    skills: ['Celonis EMS'],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    icon: CloudCog,
    skills: ['Git', 'GitHub', 'Docker', 'Jenkins', 'CI/CD', 'Linux', 'Hadoop'],
  },
];

export default function SkillsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleCategories = SKILL_CATEGORIES.filter((category) => activeFilter === 'all' || category.id === activeFilter);

  return (
    <section id="skills" className="section skills-template">
      <div className="skills-template-header">
        <p className="skills-template-eyebrow">TOOLS FOR TURNING SIGNALS INTO SYSTEMS</p>
        <h2 className="section-heading">
          Technical <span className="text-gradient-shimmer">Skills</span>
        </h2>
        <p className="skills-template-subtitle">
          A practical toolkit across intelligent systems, analytics, product development, and cloud infrastructure.
        </p>
      </div>

      <div className="skills-filter-bar" role="tablist" aria-label="Filter skills">
        {SKILL_FILTERS.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`skills-filter-button${isActive ? ' active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>

      <div className="skills-template-grid">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          return (
            <article key={category.id} className="skill-showcase-card glass card-3d">
              <div className="skill-showcase-topline">
                <span className="skill-showcase-icon"><Icon size={20} /></span>
                <span className="skill-showcase-count">{category.skills.length} skills</span>
              </div>
              <h3>{category.label}</h3>
              <div className="skill-chip-list">
                {category.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}