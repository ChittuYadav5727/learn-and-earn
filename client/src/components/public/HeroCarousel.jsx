import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSkeleton from '../common/LoadingSkeleton';

export default function HeroCarousel({ slides = [], stats = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [slides]);

  if (!slides.length) {
    return <LoadingSkeleton className="hero-skeleton" />;
  }

  const activeSlide = slides[activeIndex];
  const primaryStats = stats.slice(0, 2);
  const secondaryStats = stats.slice(2);

  return (
    <section className={`hero-carousel accent-${activeSlide.accent}`}>
      <div className="hero-storyboard">
        <div className="hero-copy-panel">
          <div className="hero-intro">
            <p className="eyebrow">{activeSlide.eyebrow}</p>
            <span className="hero-kicker">Built for learners, creators, and hiring teams</span>
          </div>
          <h1>{activeSlide.title}</h1>
          <p className="hero-copy">{activeSlide.subtitle}</p>
          <div className="hero-actions">
            <Link className="primary-button" to={activeSlide.ctaHref}>
              {activeSlide.ctaLabel}
            </Link>
            <Link className="ghost-button hero-secondary-cta" to="/login">
              Explore Platform
            </Link>
          </div>
          <div className="hero-controls">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                className={index === activeIndex ? 'hero-dot is-active' : 'hero-dot'}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="hero-rail">
          <article className="hero-rail-card hero-rail-primary">
            <span className="hero-rail-label">Execution engine</span>
            <strong>From first lesson to first payout</strong>
            <p>Structured tracks, verified task flows, and product-style dashboards that keep users moving.</p>
          </article>
          <article className="hero-rail-card">
            <span className="hero-rail-label">Why it converts</span>
            <p>Clear next actions, wallet visibility, and progress-backed momentum instead of static course listings.</p>
          </article>
        </div>
      </div>

      <div className="hero-command-panel">
        <div className="hero-panel-head">
          <div>
            <span>Live momentum</span>
            <strong>Portfolio to payout</strong>
          </div>
          <span className="hero-panel-chip">Realtime signal</span>
        </div>
        <div className="hero-stat-pair">
          {primaryStats.map((stat) => (
            <article key={stat.label} className="metric-card elevated">
              <span className="metric-label">{stat.label}</span>
              <strong className="metric-value">{stat.value}</strong>
            </article>
          ))}
        </div>
        <div className="hero-spotlight-card">
          <p className="eyebrow">Experience design</p>
          <h3>One platform, three conversion loops</h3>
          <div className="hero-spotlight-grid">
            <div>
              <strong>Learn</strong>
              <p>Guided tracks and visible progress</p>
            </div>
            <div>
              <strong>Earn</strong>
              <p>Tasks, rewards, and wallet trust signals</p>
            </div>
            <div>
              <strong>Hire</strong>
              <p>Provider-side proof of work and better filtering</p>
            </div>
          </div>
        </div>
        <div className="hero-stat-strip">
          {secondaryStats.map((stat) => (
            <div key={stat.label} className="hero-stat-strip-item">
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
