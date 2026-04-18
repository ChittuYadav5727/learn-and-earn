import { useEffect, useState } from 'react';
import EmptyState from '../../../components/common/EmptyState';
import SectionCard from '../../../components/common/SectionCard';
import { userService } from '../../../services/userService';

const filters = [
  { label: 'Internships', value: 'internship' },
  { label: 'Jobs', value: 'job' },
  { label: 'Freelance', value: 'freelance' },
];

export default function InternshipsPage() {
  const [type, setType] = useState('internship');
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    userService.getInternships(type).then(setItems).catch(() => setItems([]));
  }, [type]);

  async function handleApply(id) {
    try {
      await userService.applyOpportunity(id, { coverLetter: 'Interested in contributing through Learn & Earn.' });
      setMessage('Application submitted successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not submit application.');
    }
  }

  return (
    <SectionCard
      title="Internships, jobs, and projects"
      subtitle="Browse open opportunities published by verified providers."
      actions={
        <div className="button-row">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className={type === filter.value ? 'primary-button' : 'secondary-button'}
              onClick={() => setType(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      }
    >
      {message ? <p className="form-success">{message}</p> : null}
      {items.length === 0 ? (
        <EmptyState title="No openings yet" description="Once verified providers post roles, they will appear here." />
      ) : (
        <div className="card-grid">
          {items.map((item) => (
            <article key={item._id} className="content-card">
              <p className="eyebrow">{item.provider?.companyName}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="info-row">
                <span>{item.location}</span>
                <span>{item.stipend || 'Compensation shared on review'}</span>
              </div>
              <button className="primary-button" onClick={() => handleApply(item._id)} type="button">
                Apply now
              </button>
            </article>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
