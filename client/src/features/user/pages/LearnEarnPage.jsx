import { useEffect, useState } from 'react';
import MetricCard from '../../../components/common/MetricCard';
import SectionCard from '../../../components/common/SectionCard';
import { useToast } from '../../../hooks/useToast';
import { userService } from '../../../services/userService';

export default function LearnEarnPage() {
  const [mode, setMode] = useState('learn');
  const [items, setItems] = useState([]);
  const [dashboard, setDashboard] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    userService.getDashboard().then(setDashboard).catch(() => {});
  }, []);

  useEffect(() => {
    userService.getLearnEarn(mode).then(setItems).catch(() => setItems([]));
  }, [mode]);

  async function switchMode(nextMode) {
    setMode(nextMode);
    try {
      await userService.updateMode(nextMode);
      showToast({
        title: `Switched to ${nextMode}`,
        description: nextMode === 'learn' ? 'Learning tracks are now prioritized.' : 'Earning opportunities are now prioritized.',
        tone: 'success',
      });
    } catch {
      showToast({
        title: 'Mode update failed',
        description: 'Please try again after the API reconnects.',
        tone: 'error',
      });
    }
  }

  return (
    <div className="page-stack">
      <section className="page-hero user-banner">
        <div>
          <p className="eyebrow">Learner dashboard</p>
          <h1>Choose your momentum</h1>
          <p>Switch between structured learning paths and practical earning opportunities.</p>
        </div>
        <div className="metrics-grid compact">
          <MetricCard label="Mode" value={dashboard?.summary?.selectedMode || mode} />
          <MetricCard label="Wallet" value={`INR ${dashboard?.summary?.walletBalance || 0}`} />
          <MetricCard label="Tasks" value={dashboard?.summary?.activeTasks || 0} />
          <MetricCard label="Streak" value={`${dashboard?.progress?.streakDays || 0} days`} />
        </div>
      </section>

      <section className="stats-row">
        <MetricCard label="Completion" value={`${dashboard?.progress?.completionRate || 0}%`} helper="Weekly learner momentum" />
        <MetricCard label="Points" value={dashboard?.rewards?.points || 0} helper={dashboard?.progress?.nextReward} />
        <MetricCard label="Total earned" value={`INR ${dashboard?.rewards?.earnings || 0}`} helper="Wallet-ready reward value" />
      </section>

      <SectionCard
        title="Learn or Earn"
        subtitle="Your user-side experience stays separate from provider workflows."
        actions={
          <div className="button-row">
            <button className={mode === 'learn' ? 'primary-button' : 'secondary-button'} onClick={() => switchMode('learn')} type="button">
              Learn
            </button>
            <button className={mode === 'earn' ? 'primary-button' : 'secondary-button'} onClick={() => switchMode('earn')} type="button">
              Earn
            </button>
          </div>
        }
      >
        <div className="card-grid">
          {items.map((item) => (
            <article className="content-card" key={item.id}>
              <p className="eyebrow">{mode === 'learn' ? item.level : item.type}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {mode === 'learn' ? (
                <>
                  <div className="progress-meter">
                    <span style={{ width: `${item.progress || 0}%` }} />
                  </div>
                  <div className="info-row">
                    <strong>{item.duration}</strong>
                    <span>{item.progress || 0}% complete</span>
                  </div>
                </>
              ) : (
                <strong>{item.reward}</strong>
              )}
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Rewards snapshot" subtitle="Recent momentum and incentives that keep the platform sticky.">
        <div className="option-grid">
          {(dashboard?.rewards?.badges || []).map((badge) => (
            <article className="option-card" key={badge}>
              <strong>{badge}</strong>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
