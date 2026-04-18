import { useEffect, useState } from 'react';
import EmptyState from '../../../components/common/EmptyState';
import SectionCard from '../../../components/common/SectionCard';
import { providerService } from '../../../services/providerService';

export default function ViewApplicantsPage() {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  async function loadApplicants() {
    const response = await providerService.getApplicants();
    setItems(response);
  }

  useEffect(() => {
    loadApplicants().catch(() => setItems([]));
  }, []);

  async function handleDecision(id, status) {
    try {
      await providerService.updateApplicationStatus(id, status);
      setMessage(`Applicant ${status}.`);
      loadApplicants();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Could not update application.');
    }
  }

  return (
    <SectionCard title="View applicants" subtitle="Review applications and accept or reject candidates.">
      {message ? <p className="form-success">{message}</p> : null}
      {items.length === 0 ? (
        <EmptyState title="No applicants yet" description="Applications from learners will appear here." />
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Opportunity</th>
                <th>College</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.user?.name}</td>
                  <td>{item.opportunity?.title}</td>
                  <td>{item.user?.profile?.college || '-'}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="button-row">
                      <button className="primary-button" onClick={() => handleDecision(item._id, 'accepted')} type="button">
                        Accept
                      </button>
                      <button className="secondary-button" onClick={() => handleDecision(item._id, 'rejected')} type="button">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}
