export default function PortfolioSignals() {
  return (
    <div className="portfolio-signals" aria-hidden="true">
      <svg viewBox="0 0 560 360" role="presentation">
        <defs>
          <linearGradient id="signal-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6366f1" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        <g className="signal-wave">
          <path d="M54 326L128 294L190 310L254 258L322 278L388 218L454 238L520 184" />
          <circle cx="520" cy="184" r="5" />
        </g>
      </svg>
    </div>
  );
}