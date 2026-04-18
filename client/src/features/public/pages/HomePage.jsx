import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingSkeleton from '../../../components/common/LoadingSkeleton';
import ChatbotWidget from '../../../components/public/ChatbotWidget';
import HeroCarousel from '../../../components/public/HeroCarousel';
import SocialButtons from '../../../components/public/SocialButtons';
import VideoModal from '../../../components/public/VideoModal';
import { useToast } from '../../../hooks/useToast';
import { publicService } from '../../../services/publicService';

export default function HomePage() {
  const [content, setContent] = useState(null);
  const [videoModal, setVideoModal] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    publicService
      .getHome()
      .then(setContent)
      .catch(() => {
        showToast({
          title: 'Homepage data unavailable',
          description: 'Showing a graceful fallback while the API reconnects.',
          tone: 'error',
        });
        setContent({
          carousel: [],
          hero: {
            title: 'Learn skills. Earn outcomes.',
            subtitle: 'A structured platform for learners and verified providers.',
          },
          stats: [],
          highlights: [],
          featuredLearn: [],
          featuredEarn: [],
          videos: [],
          quickActions: [],
          testimonials: [],
          dashboardPreview: { insights: [] },
        });
      });
  }, [showToast]);

  if (!content) {
    return (
      <main className="public-main">
        <LoadingSkeleton className="hero-skeleton" />
        <div className="card-grid">
          <LoadingSkeleton className="card-skeleton" />
          <LoadingSkeleton className="card-skeleton" />
          <LoadingSkeleton className="card-skeleton" />
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="public-main">
        <HeroCarousel slides={content.carousel} stats={content.stats} />

        <section className="value-strip" id="platform">
          <article className="value-strip-card">
            <span className="eyebrow">Platform clarity</span>
            <strong>Learning, earning, and provider workflows separated cleanly.</strong>
          </article>
          <article className="value-strip-card">
            <span className="eyebrow">Retention loop</span>
            <strong>Progress, rewards, and next actions keep users engaged beyond signup.</strong>
          </article>
          <article className="value-strip-card">
            <span className="eyebrow">Trust layer</span>
            <strong>JWT auth, verified providers, and API-backed experiences ready for production.</strong>
          </article>
        </section>

        <section className="showcase-grid feature-showcase">
          <article className="surface-card insight-card">
            <p className="eyebrow">Product vision</p>
            <h2>{content.hero.title}</h2>
            <p>{content.hero.subtitle}</p>
            <ul className="feature-list">
              {content.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card dashboard-preview-card">
            <div className="section-heading compact-heading">
              <div>
                <p className="eyebrow">Dashboard preview</p>
                <h2>{content.dashboardPreview.streak}</h2>
              </div>
              <span className="progress-pill">{content.dashboardPreview.wallet}</span>
            </div>
            <div className="progress-meter">
              <span style={{ width: `${content.dashboardPreview.progress || 0}%` }} />
            </div>
            <div className="stats-row compact-stats dashboard-preview-metrics">
              <article className="metric-card elevated">
                <span className="metric-label">Points</span>
                <strong className="metric-value">{content.dashboardPreview.points}</strong>
              </article>
              <article className="metric-card elevated">
                <span className="metric-label">Progress</span>
                <strong className="metric-value">{content.dashboardPreview.progress}%</strong>
              </article>
            </div>
            <div className="stack-list">
              {content.dashboardPreview.insights.map((item) => (
                <div className="inline-note" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="section-block">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Learning and earning</p>
              <h2>Productized tracks with clearer decisions and better pacing</h2>
            </div>
            <SocialButtons title="Learn & Earn" />
          </div>

          <div className="split-grid">
            <article className="surface-card">
              <div className="section-heading compact-heading">
                <div>
                  <p className="eyebrow">Courses</p>
                  <h3>Skill tracks</h3>
                </div>
                <Link className="ghost-button small" to="/register">
                  Join as learner
                </Link>
              </div>
              <div className="card-grid">
                {content.featuredLearn.map((item) => (
                  <article className="content-card course-card premium-card" key={item.id}>
                    <div className="course-card-head">
                      <p className="eyebrow">{item.level}</p>
                      <span className="card-chip">{item.duration}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="progress-meter">
                      <span style={{ width: `${item.progress || 0}%` }} />
                    </div>
                    <div className="info-row">
                      <strong>{item.progress || 0}% complete</strong>
                      <span>Portfolio milestone path</span>
                    </div>
                  </article>
                ))}
              </div>
            </article>

            <article className="surface-card">
              <div className="section-heading compact-heading">
                <div>
                  <p className="eyebrow">Earn section</p>
                  <h3>Tasks and rewards</h3>
                </div>
                <Link className="ghost-button small" to="/register">
                  Unlock earnings
                </Link>
              </div>
              <div className="stack-list">
                {content.featuredEarn.map((item) => (
                  <article className="content-card earn-card premium-card" key={item.id}>
                    <div className="info-row earn-card-head">
                      <p className="eyebrow">{item.type}</p>
                      <span className="reward-pill">{item.reward}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="earn-card-footer">
                      <span>Verified payout path</span>
                      <strong>Fast-track visibility</strong>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="section-block" id="videos">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Video library</p>
              <h2>Guided walkthroughs for UX, growth loops, and hiring workflows</h2>
            </div>
          </div>
          <div className="card-grid video-grid">
            {content.videos.map((video) => (
              <button key={video.id} className="video-card" type="button" onClick={() => setVideoModal(video)}>
                <div className="video-thumb-wrap">
                  <img src={video.thumbnail} alt={video.title} loading="lazy" />
                  <span className="video-duration">{video.duration}</span>
                </div>
                <div className="video-copy">
                  <p className="eyebrow">{video.category}</p>
                  <h3>{video.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="section-block" id="community">
          <div className="showcase-grid">
            {content.testimonials.map((item) => (
              <article className="surface-card testimonial-card" key={item.name}>
                <p className="quote-mark">"</p>
                <p>{item.quote}</p>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </article>
            ))}
            <article className="surface-card community-card">
              <p className="eyebrow">Provider-ready experience</p>
              <h2>Built to look credible in a portfolio and behave credibly in production.</h2>
              <p>Clear IA, stronger CTA placement, calmer motion, better density, and backend-backed UX instead of placeholder polish.</p>
              <div className="hero-actions">
                <Link className="primary-button" to="/register">
                  Create account
                </Link>
                <Link className="secondary-button" to="/login">
                  Open workspace
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <VideoModal video={videoModal} onClose={() => setVideoModal(null)} />
      <ChatbotWidget quickActions={content.quickActions} />
    </>
  );
}
