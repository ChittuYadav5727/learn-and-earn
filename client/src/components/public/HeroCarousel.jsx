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

  return (
    <section className={`hero-carousel accent-${activeSlide.accent}`}>
      <div className="hero-copy-panel">
        <p className="eyebrow">{activeSlide.eyebrow}</p>
        <h1>{activeSlide.title}</h1>
        <p className="hero-copy">{activeSlide.subtitle}</p>
        <div className="hero-actions">
          <Link className="primary-button" to={activeSlide.ctaHref}>
            {activeSlide.ctaLabel}
          </Link>
          <Link className="ghost-button" to="/login">
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

      <div className="hero-glass-panel">
        <div className="hero-panel-head">
          <span>Live momentum</span>
          <strong>Portfolio to payout</strong>
        </div>
        <div className="stats-row compact-stats">
          {stats.map((stat) => (
            <article key={stat.label} className="metric-card elevated">
              <span className="metric-label">{stat.label}</span>
              <strong className="metric-value">{stat.value}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
