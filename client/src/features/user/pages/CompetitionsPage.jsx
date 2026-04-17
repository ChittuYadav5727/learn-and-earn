import { useEffect, useState } from 'react';
import EmptyState from '../../../components/common/EmptyState';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

export default function CompetitionsPage() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  function loadCompetitions() {
    userService.getCompetitions().then(setItems).catch(() => setItems([]));
  }

  useEffect(() => {
    loadCompetitions();
  }, []);

  async function handleJoin(id) {
    try {
      await userService.joinCompetition(id);
      setMessage('Competition joined successfully.');
      loadCompetitions();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to join competition.');
    }
  }

  return (
    <SectionCard title="Competitions" subtitle="Join challenges, contests, and hackathon-style events.">
      {message ? <p className="form-success">{message}</p> : null}
      {items.length === 0 ? (
        <EmptyState title="No active competitions" description="Add competition records in MongoDB or seed them for demos." />
      ) : (
        <div className="card-grid">
          {items.map((item) => (
            <article key={item._id} className="content-card">
              <p className="eyebrow">{item.theme || 'Open challenge'}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="info-row">
                <span>Reward: {item.reward}</span>
                <span>{new Date(item.registrationDeadline).toLocaleDateString()}</span>
              </div>
              <button className="primary-button" onClick={() => handleJoin(item._id)} type="button">
                Join competition
              </button>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
